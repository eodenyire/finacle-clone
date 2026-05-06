import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "database" for transactions
  let transactions: any[] = [
    {
      id: "TXN-10001",
      batchId: "B-99012",
      type: "JOURNAL TRANSFER (T/T)",
      date: "2026-05-06",
      legs: [
        { id: "1", accountNo: "123456789", type: "DEBIT", amount: "500.00", currency: "USD", particulars: "Transfer to Savings" },
        { id: "2", accountNo: "987654321", type: "CREDIT", amount: "500.00", currency: "USD", particulars: "Credit from Main A/c" }
      ],
      status: "POSTED",
      origin: "TELLER"
    },
    {
      id: "TXN-10002",
      batchId: "B-99012",
      type: "CASH DEPOSIT",
      date: "2026-05-06",
      legs: [
        { id: "1", accountNo: "11001-VAL", type: "DEBIT", amount: "100.00", currency: "USD", particulars: "Cash Deposit" },
        { id: "2", accountNo: "554433221", type: "CREDIT", amount: "100.00", currency: "USD", particulars: "Cash Deposit into A/c" }
      ],
      status: "POSTED",
      origin: "TELLER"
    }
  ];

  // In-memory "database" for rate codes
  let rateCodes: any[] = [
    { id: '1', code: 'BASE_RATE', desc: 'Standard Base Exchange Rate', fixed: 'USD', var: 'INR', buy: '0.0500', sell: '0.0500', mid: '0.0000', verify: '0.1000' },
    { id: '2', code: 'CORP_RATE', desc: 'Corporate Exclusive FX Rate', fixed: 'USD', var: 'EUR', buy: '0.0200', sell: '0.0200', mid: '0.0000', verify: '0.0400' },
    { id: '3', code: 'RETAIL_01', desc: 'Retail Branch Counter Rate', fixed: 'GBP', var: 'USD', buy: '0.1000', sell: '0.1000', mid: '0.0000', verify: '0.2000' },
  ];

  // API Routes
  app.get("/api/rate-codes", (req, res) => {
    res.json(rateCodes);
  });

  app.put("/api/rate-codes/:code", (req, res) => {
    const { code } = req.params;
    const index = rateCodes.findIndex(rc => rc.code === code);
    if (index !== -1) {
      rateCodes[index] = { ...rateCodes[index], ...req.body };
      res.json(rateCodes[index]);
    } else {
      res.status(404).json({ error: "Rate code not found" });
    }
  });

  app.post("/api/transactions/:id/reverse", (req, res) => {
    const { id } = req.params;
    const { reason, reasonCode, supervisorId } = req.body;
    
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      if (transactions[index].status === 'REVERSED') {
        return res.status(400).json({ error: "Transaction already reversed" });
      }
      
      transactions[index].status = 'REVERSED';
      
      // Create contra entry
      const original = transactions[index];
      const contraTxn = {
        ...original,
        id: `REV-${original.id}`,
        type: `REVERSAL - ${original.type}`,
        date: new Date().toISOString().split('T')[0],
        status: 'POSTED',
        origin: 'SYSTEM',
        particulars: `REVERSAL OF ${original.id} - ${reason}`,
        legs: original.legs.map(leg => ({
          ...leg,
          id: `CON-${leg.id}`,
          type: leg.type === 'DEBIT' ? 'CREDIT' : 'DEBIT' // Flip types for contra
        }))
      };
      
      transactions.push(contraTxn);
      res.json({ success: true, original: transactions[index], contra: contraTxn });
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  });

  app.get("/api/transactions", (req, res) => {
    res.json(transactions);
  });

  app.post("/api/transactions", (req, res) => {
    const newTxn = {
      ...req.body,
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      status: req.body.status || "POSTED",
      origin: req.body.origin || "TELLER"
    };
    transactions.push(newTxn);
    res.status(201).json(newTxn);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
