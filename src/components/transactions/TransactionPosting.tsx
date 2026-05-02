import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRightLeft, 
  Plus, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Calculator,
  Search,
  Settings,
  FileText
} from 'lucide-react';

interface TransactionLeg {
  id: string;
  accountNo: string;
  type: 'DEBIT' | 'CREDIT';
  amount: string;
  currency: string;
  cashCurrency?: string;
  cashAmount?: string;
  exchangeRate?: string;
  particulars: string;
  instrumentNo?: string;
  instrumentDate?: string;
  signatureVerified?: boolean;
  denominations?: Denomination[];
}

interface Denomination {
  unit: number;
  count: string;
}

const MOCK_FX_RATES: Record<string, number> = {
  'USD-EUR': 0.92,
  'EUR-USD': 1.09,
  'USD-GBP': 0.79,
  'GBP-USD': 1.27,
  'USD-NGN': 1450,
  'NGN-USD': 0.00069,
  'EUR-GBP': 0.86,
  'GBP-EUR': 1.16,
  'EUR-NGN': 1575,
  'NGN-EUR': 0.00063,
  'GBP-NGN': 1835,
  'NGN-GBP': 0.00054
};

interface TransactionPostingProps {
  defaultType?: string;
  mode?: 'ENTRY' | 'VERIFY';
}

export default function TransactionPosting({ defaultType, mode }: TransactionPostingProps) {
  const [txnMode, setTxnMode] = useState<'ENTRY' | 'LIST'>(mode === 'VERIFY' ? 'LIST' : 'ENTRY');
  const [entryType, setEntryType] = useState(defaultType || 'JOURNAL TRANSFER (T/T)');
  const [transferMode, setTransferMode] = useState<'CUSTOMER_INDUCED' | 'BANK_INDUCED'>('CUSTOMER_INDUCED');
  const [postingStep, setPostingStep] = useState<'DETAILS' | 'REVIEW' | 'SUCCESS'>('DETAILS');
  const [txnOperation, setTxnOperation] = useState<'POST' | 'INQUIRY' | 'REVERSAL' | 'FIN_INQUIRY'>('POST');

  const [activeDenomLeg, setActiveDenomLeg] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [jumpCommand, setJumpCommand] = useState('');
  const [searchTxnId, setSearchTxnId] = useState('');
  const [inquiryResult, setInquiryResult] = useState<any | null>(null);

  const COMMAND_MAP: Record<string, { type: string, op: 'POST' | 'INQUIRY' | 'REVERSAL' | 'FIN_INQUIRY' }> = {
    'HTM': { type: 'JOURNAL TRANSFER (T/T)', op: 'POST' },
    'HCASHDEP': { type: 'CASH DEPOSIT', op: 'POST' },
    'HCASHWD': { type: 'CASH PAYMENT', op: 'POST' },
    'HXFER': { type: 'TRANSFER', op: 'POST' },
    'HCRT': { type: 'REVERSAL', op: 'REVERSAL' },
    'HTI': { type: 'INQUIRY', op: 'INQUIRY' },
    'HFTI': { type: 'FINANCIAL INQUIRY', op: 'FIN_INQUIRY' }
  };

  const handleJump = () => {
    const cmd = jumpCommand.toUpperCase().trim();
    if (COMMAND_MAP[cmd]) {
      const target = COMMAND_MAP[cmd];
      if (target.op === 'POST') setEntryType(target.type);
      setTxnOperation(target.op);
      setJumpCommand('');
    } else {
      alert(`Command ${cmd} not recognized in current SOL context.`);
      setJumpCommand('');
    }
  };

  React.useEffect(() => {
    if (entryType === 'CASH DEPOSIT') {
       // Pre-populate with typical Cash-in-Vault GL for Debit if empty
       setLegs(prev => prev.map((leg, i) => {
         if (i === 0 && !leg.accountNo) return { ...leg, accountNo: '11001-VAL', particulars: 'CASH DEPOSIT BY CUSTOMER' };
         if (i === 1 && !leg.particulars) return { ...leg, particulars: 'CREDIT BY CASH' };
         return leg;
       }));
    } else if (entryType === 'CASH PAYMENT') {
       setLegs(prev => prev.map((leg, i) => {
         if (i === 0 && !leg.particulars) return { ...leg, particulars: 'DEBIT FOR CASH WITHDRAWAL' };
         if (i === 1 && !leg.accountNo) return { ...leg, accountNo: '11001-VAL', particulars: 'CASH PAYMENT TO CUSTOMER' };
         return leg;
       }));
    }
  }, [entryType]);

  const [batches, setBatches] = useState([
    { id: 'B-99012', entries: 4, amount: 57045.50, status: 'OPEN' as const },
    { id: 'B-99015', entries: 12, amount: 124100.00, status: 'OPEN' as const },
    { id: 'B-98821', entries: 1, amount: 1200.00, status: 'SUSPENDED' as const },
  ]);
  const [activeBatchId, setActiveBatchId] = useState('B-99012');
  const activeBatch = batches.find(b => b.id === activeBatchId) || batches[0];

  const handleCreateBatch = () => {
    const newId = `B-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBatch = { id: newId, entries: 0, amount: 0, status: 'OPEN' as const };
    setBatches([newBatch, ...batches]);
    setActiveBatchId(newId);
    setIsChangingBatch(false);
  };

  const handleUpdateBatchTotal = (amount: number) => {
    setBatches(curr => curr.map(b => 
      b.id === activeBatchId 
        ? { ...b, entries: b.entries + 1, amount: b.amount + amount }
        : b
    ));
  };
  const [isChangingBatch, setIsChangingBatch] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const [legs, setLegs] = useState<TransactionLeg[]>([
    { id: '1', accountNo: '', type: 'DEBIT', amount: '', currency: 'USD', cashCurrency: 'USD', cashAmount: '', exchangeRate: '1.00', particulars: '', instrumentNo: '', instrumentDate: '', signatureVerified: false, denominations: [{ unit: 100, count: '' }, { unit: 50, count: '' }, { unit: 20, count: '' }, { unit: 10, count: '' }, { unit: 5, count: '' }, { unit: 1, count: '' }] },
    { id: '2', accountNo: '', type: 'CREDIT', amount: '', currency: 'USD', cashCurrency: 'USD', cashAmount: '', exchangeRate: '1.00', particulars: '', instrumentNo: '', instrumentDate: '', signatureVerified: false, denominations: [{ unit: 100, count: '' }, { unit: 50, count: '' }, { unit: 20, count: '' }, { unit: 10, count: '' }, { unit: 5, count: '' }, { unit: 1, count: '' }] }
  ]);

  const [txnDate, setTxnDate] = useState(new Date().toISOString().split('T')[0]);
  const todayStr = new Date().toISOString().split('T')[0];
  const isDateInPast = txnDate < todayStr;
  const isDateInFuture = txnDate > todayStr;
  const isDateInvalid = isDateInPast || isDateInFuture;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  // Transaction Limits Configuration
  const [LIMITS, setLIMITS] = useState({
    SINGLE_TXN: 100000,
    USER_DAILY: 500000,
    BATCH_TOTAL: 2000000
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const [userDailyUtilization, setUserDailyUtilization] = useState(145000); // Mock data
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const addLeg = () => {
    setLegs([...legs, { 
      id: Date.now().toString(), 
      accountNo: '', 
      type: legs.length % 2 === 0 ? 'DEBIT' : 'CREDIT', 
      amount: '', 
      currency: 'USD', 
      cashCurrency: 'USD',
      cashAmount: '',
      exchangeRate: '1.00',
      particulars: '',
      denominations: [
        { unit: 100, count: '' },
        { unit: 50, count: '' },
        { unit: 20, count: '' },
        { unit: 10, count: '' },
        { unit: 5, count: '' },
        { unit: 1, count: '' },
      ]
    }]);
  };

  const removeLeg = (id: string) => {
    if (legs.length > 2) {
      setLegs(legs.filter(l => l.id !== id));
    }
  };

  const updateLeg = (id: string, field: keyof TransactionLeg, value: string) => {
    if (field === 'amount') {
      setDismissedAlerts(new Set()); // Reset dismissals on any amount change
    }
    
    setLegs(prevLegs => prevLegs.map(l => {
      if (l.id !== id) return l;
      
      let val: any = value;
      if (field === 'signatureVerified') val = value === 'true';
      
      const updated = { ...l, [field]: val };

      // HCASHDEP / HCASHWD Cross-Currency Logic
      if (entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') {
        const sourceCcy = field === 'cashCurrency' || (field === 'currency' && l.cashCurrency === undefined) ? value : (l.cashCurrency || 'USD');
        const targetCcy = field === 'currency' ? value : (l.currency || 'USD');
        
        if (sourceCcy !== targetCcy) {
          const pairDirect = `${sourceCcy}-${targetCcy}`;
          const pairReverse = `${targetCcy}-${sourceCcy}`;
          
          if (field === 'cashAmount' || field === 'cashCurrency' || field === 'currency') {
            const rate = MOCK_FX_RATES[pairDirect] || 1.0;
            const sourceAmt = field === 'cashAmount' ? value : (l.cashAmount || '0');
            updated.exchangeRate = rate.toString();
            updated.amount = (parseFloat(sourceAmt) * rate).toFixed(2);
          } else if (field === 'amount') {
            const rate = MOCK_FX_RATES[pairReverse] || 1.0;
            updated.exchangeRate = (1 / rate).toFixed(4);
            updated.cashAmount = (parseFloat(value) * rate).toFixed(2);
          }
        } else {
          updated.exchangeRate = '1.00';
          if (field === 'cashAmount') updated.amount = value;
          if (field === 'amount') updated.cashAmount = value;
        }
      }
      
      return updated;
    }));
  };

  const totalDebit = legs.filter(l => l.type === 'DEBIT').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const totalCredit = legs.filter(l => l.type === 'CREDIT').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  // Tiered Limit Logic
  const getViolationLevel = (current: number, max: number) => {
    if (current > max) return 'CRITICAL';
    if (current > max * 0.8) return 'WARNING';
    return 'NONE';
  };

  const singleTxnViolation = getViolationLevel(totalDebit, LIMITS.SINGLE_TXN);
  const userDailyViolation = getViolationLevel(userDailyUtilization + totalDebit, LIMITS.USER_DAILY);
  const batchLimitViolation = getViolationLevel(activeBatch.amount + totalDebit, LIMITS.BATCH_TOTAL);

  const activeAlerts = [
    { id: 'SINGLE', level: singleTxnViolation, label: 'Single Transaction Limit', val: totalDebit, max: LIMITS.SINGLE_TXN },
    { id: 'DAILY', level: userDailyViolation, label: 'User Daily Limit', val: userDailyUtilization + totalDebit, max: LIMITS.USER_DAILY },
    { id: 'BATCH', level: batchLimitViolation, label: 'Batch Total Capacity', val: activeBatch.amount + totalDebit, max: LIMITS.BATCH_TOTAL },
  ].filter(a => a.level !== 'NONE' && !dismissedAlerts.has(a.id));

  const hasCriticalViolation = singleTxnViolation === 'CRITICAL' || userDailyViolation === 'CRITICAL' || batchLimitViolation === 'CRITICAL';

  const resetForm = () => {
    setLegs([
      { id: '1', accountNo: '', type: 'DEBIT', amount: '', currency: 'USD', cashCurrency: 'USD', cashAmount: '', exchangeRate: '1.00', particulars: '', instrumentNo: '', instrumentDate: '', signatureVerified: false, denominations: [{ unit: 100, count: '' }, { unit: 50, count: '' }, { unit: 20, count: '' }, { unit: 10, count: '' }, { unit: 5, count: '' }, { unit: 1, count: '' }] },
      { id: '2', accountNo: '', type: 'CREDIT', amount: '', currency: 'USD', cashCurrency: 'USD', cashAmount: '', exchangeRate: '1.00', particulars: '', instrumentNo: '', instrumentDate: '', signatureVerified: false, denominations: [{ unit: 100, count: '' }, { unit: 50, count: '' }, { unit: 20, count: '' }, { unit: 10, count: '' }, { unit: 5, count: '' }, { unit: 1, count: '' }] }
    ]);
    setTxnDate(new Date().toISOString().split('T')[0]);
    setPostingStep('DETAILS');
  };

  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-6">
      {/* Shortcut Jump bar */}
      <div className="flex gap-4 items-center bg-slate-900 p-2 rounded-xl border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-2 px-3 border-r border-slate-700">
           <Settings size={14} className="text-blue-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menu Jump</span>
        </div>
        <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide py-1">
          {['HTM', 'HCASHDEP', 'HCASHWD', 'HXFER', 'HCRT', 'HTI', 'HFTI'].map(cmd => (
            <button 
              key={cmd}
              onClick={() => {
                const target = COMMAND_MAP[cmd];
                if (target.op === 'POST') setEntryType(target.type);
                setTxnOperation(target.op);
              }}
              className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                (txnOperation === COMMAND_MAP[cmd].op && (entryType === COMMAND_MAP[cmd].type || txnOperation !== 'POST'))
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cmd}
            </button>
          ))}
        </div>
        <div className="relative flex items-center pr-2">
           <input 
             type="text" 
             value={jumpCommand}
             onChange={(e) => setJumpCommand(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleJump()}
             placeholder="ENTER COMMAND..."
             className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-[10px] font-mono font-black text-blue-400 outline-none w-40 focus:border-blue-500 transition-all uppercase"
           />
           <button onClick={handleJump} className="absolute right-3 text-slate-500 hover:text-blue-400">
              <ChevronRight size={14} />
           </button>
        </div>
      </div>

      <header className="flex justify-between items-end bg-white p-6 rounded border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Transaction Maintenance (TM)</h2>
          <p className="text-slate-500 text-[10px] mt-1 font-mono font-bold uppercase tracking-widest bg-slate-100 w-fit px-1.5 py-0.5 rounded">FIN-TXN-POST-v4.0</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setTxnMode('LIST')}
            className={`px-4 py-2 text-[11px] font-bold rounded uppercase tracking-widest transition-all ${txnMode === 'LIST' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Worklist
          </button>
          <button 
            onClick={() => {
              setTxnMode('ENTRY');
              resetForm();
            }}
            className={`px-4 py-2 text-[11px] font-bold rounded uppercase tracking-widest transition-all ${txnMode === 'ENTRY' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            New Posting
          </button>
        </div>
      </header>

      {/* Persistent Batch Summary Bar */}
      <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all">
        <div 
          className="p-3 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-blue-50/50 transition-colors"
          onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-full transition-colors ${activeBatch.status === 'OPEN' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              <CheckCircle2 size={14} className={activeBatch.status === 'OPEN' ? 'animate-pulse' : ''} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                Active Batch Summary
                <span className={`text-[8px] px-1.5 py-0.5 rounded ${activeBatch.status === 'OPEN' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  {activeBatch.status}
                </span>
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Click to {isSummaryExpanded ? 'collapse' : 'expand'} batch details</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {!isSummaryExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none mb-0.5">Batch ID</span>
                  <span className="text-[11px] text-slate-800 font-mono font-black">{activeBatch.id}</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none mb-0.5">Entries</span>
                  <span className="text-[11px] text-slate-800 font-mono font-black">{activeBatch.entries.toString().padStart(2, '0')}</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none mb-0.5">Total</span>
                  <span className="text-[11px] text-blue-600 font-mono font-black">USD {activeBatch.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </motion.div>
            )}
            <ChevronRight size={16} className={`text-slate-400 transition-transform duration-300 ${isSummaryExpanded ? 'rotate-90' : ''}`} />
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isSummaryExpanded ? 'auto' : 0, opacity: isSummaryExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="p-6 bg-blue-900 border-t border-slate-200 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-400"></div>
            
            <div className="flex gap-16 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest leading-none">Batch Reference</span>
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsChangingBatch(!isChangingBatch);
                    }}
                    className="flex items-center gap-2 text-2xl font-black text-white font-mono tracking-tighter hover:text-blue-200 transition-colors"
                  >
                    {activeBatch.id}
                    <ChevronRight size={16} className={`text-blue-400 transition-transform ${isChangingBatch ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isChangingBatch && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 shadow-2xl z-50 rounded overflow-hidden">
                      <div className="p-2 border-b border-slate-100 bg-slate-50 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Select Active Batch</div>
                      <div className="max-h-48 overflow-y-auto">
                        {batches.map(batch => (
                          <div 
                            key={batch.id} 
                            className={`p-3 flex justify-between items-center hover:bg-blue-50 cursor-pointer border-b border-slate-50 ${activeBatch.id === batch.id ? 'bg-blue-50' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveBatchId(batch.id);
                              setIsChangingBatch(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-slate-700 font-mono">{batch.id}</span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{batch.entries} entries | USD {batch.amount.toLocaleString()}</span>
                            </div>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${batch.status === 'OPEN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{batch.status}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 bg-slate-50 border-t border-slate-100">
                        <button 
                          onClick={handleCreateBatch}
                          className="w-full py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Plus size={12} />
                          Open New Batch (F12)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest leading-none">Total Entries</span>
                <span className="text-2xl font-black text-white font-mono tracking-tighter">{activeBatch.entries.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest leading-none">Aggregated Batch Total</span>
                <span className="text-2xl font-black text-blue-100 font-mono tracking-tighter italic">USD {activeBatch.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3 relative z-10">
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-blue-950/40 rounded border border-blue-800/50 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Ledger Context</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-blue-300 font-bold uppercase opacity-80 leading-none mb-1">Value Date</span>
                <span className="text-[11px] text-white font-mono font-bold tracking-widest italic">{formatDate(txnDate)}</span>
              </div>
            </div>
            
            <div className="absolute -right-4 -bottom-6 text-white/5 font-black text-8xl italic pointer-events-none select-none">BATCH</div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        {postingStep === 'DETAILS' && (
          <div className="flex gap-2 p-4 bg-blue-50 border border-blue-200 rounded text-[10px] items-center text-blue-800">
             <AlertCircle size={14} />
             <span className="font-bold uppercase tracking-widest">
               Shortcut Detected: {entryType === 'CASH DEPOSIT' ? 'HCASHDEP - CASH DEPOSIT' : entryType === 'CASH PAYMENT' ? 'HCASHWD - CASH WITHDRAWAL' : entryType === 'TRANSFER' ? 'HXFER - TRANSFER' : 'HTM - TRANSACTION MANAGER'}
             </span>
          </div>
        )}

        {txnMode === 'ENTRY' && (
          <motion.div
            key="entry-workflow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Step Progress Tracker */}
            <div className="flex justify-center mb-2">
              <div className="flex items-center gap-12 bg-white px-8 py-3 rounded-full border border-slate-200 shadow-sm">
                {[
                  { id: 'DETAILS', label: '1. Entry', icon: <Plus size={14} /> },
                  { id: 'REVIEW', label: '2. Review', icon: <Search size={14} /> },
                  { id: 'SUCCESS', label: '3. Success', icon: <CheckCircle2 size={14} /> },
                ].map((step, idx, arr) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center gap-3 relative">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 ring-4 ${
                        postingStep === step.id 
                          ? 'bg-blue-600 text-white ring-blue-100' 
                          : arr.findIndex(s => s.id === postingStep) > idx
                            ? 'bg-emerald-500 text-white ring-emerald-50'
                            : 'bg-slate-200 text-slate-500 ring-transparent'
                      }`}>
                        {arr.findIndex(s => s.id === postingStep) > idx ? <CheckCircle2 size={14} /> : step.icon}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        postingStep === step.id ? 'text-blue-600' : 'text-slate-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className={`h-[2px] w-12 rounded-full transition-colors duration-500 ${
                        arr.findIndex(s => s.id === postingStep) > idx ? 'bg-emerald-500' : 'bg-slate-100'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {postingStep === 'DETAILS' && (
                <motion.div
                  key="step-details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <ArrowRightLeft size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">General Transaction Header</span>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 bg-white">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Entry Type</label>
                  <select 
                    value={entryType}
                    onChange={(e) => setEntryType(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="JOURNAL TRANSFER (T/T)">JOURNAL TRANSFER (T/T)</option>
                    <option value="CLEARING (C/L)">CLEARING (C/L)</option>
                    <option value="CASH DEPOSIT">CASH DEPOSIT (C/D)</option>
                    <option value="CASH PAYMENT">CASH PAYMENT (C/P)</option>
                    <option value="TRANSFER">INTER-BANK TRANSFER (HXFER)</option>
                  </select>
                </div>
                {entryType === 'TRANSFER' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Transfer Mode</label>
                    <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200">
                      <button 
                        onClick={() => setTransferMode('CUSTOMER_INDUCED')}
                        className={`flex-1 py-1 text-[9px] font-black uppercase rounded ${transferMode === 'CUSTOMER_INDUCED' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400'}`}
                      >
                        Customer
                      </button>
                      <button 
                        onClick={() => setTransferMode('BANK_INDUCED')}
                        className={`flex-1 py-1 text-[9px] font-black uppercase rounded ${transferMode === 'BANK_INDUCED' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400'}`}
                      >
                        Bank
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Value Date</label>
                   <input 
                    type="date" 
                    value={txnDate}
                    onChange={(e) => setTxnDate(e.target.value)}
                    className={`bg-slate-50 border rounded px-2 py-1 text-xs font-mono focus:ring-1 focus:ring-blue-500 outline-none ${isDateInvalid ? 'border-red-500 text-red-600 bg-red-50' : 'border-slate-200'}`} 
                  />
                  {isDateInvalid && (
                    <span className="text-[8px] text-red-500 font-bold uppercase">
                      {isDateInPast ? 'Back-dating not allowed' : 'Future-dating not allowed'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ref Number</label>
                  <input type="text" placeholder="TXN-XXXX-XXXX" className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-mono focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Transaction Description</label>
                  <input type="text" placeholder="Generic Transfer Posting" className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-medium focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                {entryType === 'TRANSFER' && (
                  <div className="col-span-full mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-lg flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2">
                       <ArrowRightLeft size={16} className="text-blue-600" />
                       <h4 className="text-[10px] font-black uppercase text-blue-900 tracking-widest">HXFER Component Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Transfer Mode Selection</label>
                        <div className="flex bg-white p-0.5 rounded border border-slate-200">
                          <button 
                            onClick={() => setTransferMode('CUSTOMER_INDUCED')}
                            className={`flex-1 py-1 text-[9px] font-black uppercase rounded transition-all ${transferMode === 'CUSTOMER_INDUCED' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}
                          >
                            Customer Induced
                          </button>
                          <button 
                            onClick={() => setTransferMode('BANK_INDUCED')}
                            className={`flex-1 py-1 text-[9px] font-black uppercase rounded transition-all ${transferMode === 'BANK_INDUCED' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}
                          >
                            Bank Induced
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instrument / Ref Type</label>
                        <select className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500">
                           <option>INTERNAL TRANSFER</option>
                           <option>RTGS / NEFT</option>
                           <option>SWIFT REMITTANCE</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Charges Code</label>
                        <select className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500">
                           <option>NO CHARGES (INTERNAL)</option>
                           <option>STANDARD COMMISSION</option>
                           <option>CONCESSIONAL RATE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Limits Information Bar */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between overflow-x-auto min-w-0">
                <div className="flex gap-12 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded flex items-center justify-center ${singleTxnViolation === 'CRITICAL' ? 'bg-red-100 text-red-600' : singleTxnViolation === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        <AlertCircle size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Single Entry Limit</span>
                        <span className={`text-[11px] font-black font-mono ${singleTxnViolation === 'CRITICAL' ? 'text-red-600' : singleTxnViolation === 'WARNING' ? 'text-amber-600' : 'text-slate-700'}`}>
                          USD {LIMITS.SINGLE_TXN.toLocaleString()}
                        </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded flex items-center justify-center ${userDailyViolation === 'CRITICAL' ? 'bg-red-100 text-red-600' : userDailyViolation === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        <Calculator size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Daily User Limit</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-black font-mono ${userDailyViolation === 'CRITICAL' ? 'text-red-600' : userDailyViolation === 'WARNING' ? 'text-amber-600' : 'text-slate-700'}`}>
                            USD {LIMITS.USER_DAILY.toLocaleString()}
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${userDailyViolation === 'CRITICAL' ? 'bg-red-500' : userDailyViolation === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(100, (userDailyUtilization + totalDebit) / LIMITS.USER_DAILY * 100)}%` }}
                            />
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded flex items-center justify-center ${batchLimitViolation === 'CRITICAL' ? 'bg-red-100 text-red-600' : batchLimitViolation === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-amber-100 text-amber-600'}`}>
                        <Save size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Batch Limit Capacity</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-black font-mono ${batchLimitViolation === 'CRITICAL' ? 'text-red-600' : batchLimitViolation === 'WARNING' ? 'text-amber-600' : 'text-slate-700'}`}>
                            USD {LIMITS.BATCH_TOTAL.toLocaleString()}
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${batchLimitViolation === 'CRITICAL' ? 'bg-red-500' : batchLimitViolation === 'WARNING' ? 'bg-amber-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, (activeBatch.amount + totalDebit) / LIMITS.BATCH_TOTAL * 100)}%` }}
                            />
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative">
                  <button 
                    onClick={() => setIsConfigOpen(!isConfigOpen)}
                    className={`p-2 rounded transition-colors ${isConfigOpen ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-200'}`}
                  >
                    <Settings size={14} className={isConfigOpen ? 'animate-pulse' : ''} />
                  </button>

                  <AnimatePresence>
                    {isConfigOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute bottom-full right-0 mb-4 w-72 bg-white rounded border border-slate-200 shadow-2xl z-[100] overflow-hidden"
                      >
                        <div className="p-3 bg-slate-800 text-white flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest">Override Thresholds</span>
                          <button onClick={() => setIsConfigOpen(false)} className="opacity-60 hover:opacity-100">
                             <Plus size={14} className="rotate-45" />
                          </button>
                        </div>
                        <div className="p-4 space-y-4">
                          {[
                            { key: 'SINGLE_TXN', label: 'Single Entry' },
                            { key: 'USER_DAILY', label: 'Daily User' },
                            { key: 'BATCH_TOTAL', label: 'Batch Total' },
                          ].map(lim => (
                            <div key={lim.key} className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{lim.label} Threshold (USD)</label>
                              <input 
                                type="number"
                                value={LIMITS[lim.key as keyof typeof LIMITS]}
                                onChange={(e) => setLIMITS(prev => ({ ...prev, [lim.key]: parseFloat(e.target.value) || 0 }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-mono font-black text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                          ))}
                          <div className="pt-2">
                             <p className="text-[8px] text-slate-400 leading-relaxed italic">
                               * Adjusting these values will affect real-time validation for all active posting workflows. Critical violations will block ledger commitment.
                             </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dynamic Alerts Container */}
              <AnimatePresence>
                {activeAlerts.length > 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-2 bg-slate-50 border-t border-slate-100 flex flex-col gap-2"
                  >
                    {activeAlerts.map(alert => (
                      <motion.div 
                        key={alert.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`flex items-center justify-between px-3 py-2 rounded border-l-4 shadow-sm ${
                          alert.level === 'CRITICAL' 
                            ? 'bg-red-50/50 border-red-500 text-red-800' 
                            : 'bg-amber-50/50 border-amber-500 text-amber-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {alert.level === 'CRITICAL' ? <AlertCircle size={14} /> : <Calculator size={14} />}
                          <span className="text-[10px] font-black uppercase tracking-tight">
                            {alert.level}: {alert.label} - {Math.round((alert.val / alert.max) * 100)}% Used
                          </span>
                        </div>
                        <button 
                          onClick={() => setDismissedAlerts(prev => new Set(prev).add(alert.id))}
                          className="hover:bg-black/5 p-1 rounded transition-colors"
                        >
                          <Plus size={12} className="rotate-45" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calculator size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Transaction Set (Legs)</span>
                </div>
                <button 
                  onClick={addLeg}
                  className="px-3 py-1 bg-white border border-slate-200 text-[9px] font-black hover:bg-slate-50 transition-all uppercase tracking-widest rounded flex items-center gap-1"
                >
                  <Plus size={12} />
                  Add Leg
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="finacle-grid">
                  <thead>
                    <tr>
                      <th className="w-12 text-center">#</th>
                      <th className="w-48">Account No</th>
                      <th className="w-32">Dr/Cr</th>
                      {entryType === 'CASH PAYMENT' && (
                        <th className="w-48">Instrument Details (Cheque)</th>
                      )}
                      {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                        <>
                          <th className="w-24">Cash CCY</th>
                          <th className="w-32 text-right">Cash Amt</th>
                        </>
                      )}
                      <th className="w-40 text-right">Amount</th>
                      <th>Particulars / Remarks</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {legs.map((leg, index) => (
                      <tr key={leg.id} className="group transition-colors">
                        <td className="text-center font-mono font-bold text-slate-400">{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-2">
                             <input 
                                type="text" 
                                value={leg.accountNo}
                                onChange={(e) => updateLeg(leg.id, 'accountNo', e.target.value)}
                                placeholder="000101XXX"
                                className="w-full bg-transparent outline-none font-mono font-bold text-blue-600 focus:bg-yellow-50"
                             />
                             <Search size={12} className="text-slate-300 cursor-pointer hover:text-blue-500" />
                          </div>
                        </td>
                        <td>
                          <select 
                            value={leg.type}
                            onChange={(e) => updateLeg(leg.id, 'type', e.target.value as any)}
                            className={`w-full bg-transparent outline-none font-black text-[10px] tracking-widest ${leg.type === 'DEBIT' ? 'text-red-600' : 'text-emerald-600'}`}
                          >
                            <option value="DEBIT">D - DEBIT</option>
                            <option value="CREDIT">C - CREDIT</option>
                          </select>
                        </td>
                        {entryType === 'CASH PAYMENT' && (
                          <td>
                            <div className="flex flex-col gap-1 pr-4">
                               <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-black text-slate-400 uppercase w-10">Num:</span>
                                  <input 
                                    type="text" 
                                    value={leg.instrumentNo || ''}
                                    onChange={(e) => updateLeg(leg.id, 'instrumentNo', e.target.value)}
                                    placeholder="CHEQUE #"
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold"
                                  />
                               </div>
                               <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-black text-slate-400 uppercase w-10">Sign:</span>
                                  <button 
                                    onClick={() => updateLeg(leg.id, 'signatureVerified', (!leg.signatureVerified).toString())}
                                    className={`flex-1 py-0.5 text-[8px] font-black uppercase rounded border transition-all ${leg.signatureVerified ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                                  >
                                    {leg.signatureVerified ? 'Verified' : 'Verify Sign'}
                                  </button>
                               </div>
                            </div>
                          </td>
                        )}
                        {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                          <>
                            <td>
                              <select 
                                value={leg.cashCurrency}
                                onChange={(e) => updateLeg(leg.id, 'cashCurrency', e.target.value)}
                                className="w-full bg-transparent outline-none font-mono font-bold text-xs text-slate-600"
                              >
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                                <option>NGN</option>
                              </select>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  value={leg.cashAmount}
                                  onChange={(e) => updateLeg(leg.id, 'cashAmount', e.target.value)}
                                  placeholder="0.00"
                                  className="text-right w-full bg-transparent outline-none font-mono font-black text-blue-600 focus:bg-yellow-50"
                                />
                                <button 
                                  onClick={() => setActiveDenomLeg(leg.id)}
                                  className="p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                                  title="Enter Denominations"
                                >
                                  <Calculator size={14} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                        <td>
                          <div className="flex items-center justify-end gap-2">
                            <select 
                                value={leg.currency}
                                onChange={(e) => updateLeg(leg.id, 'currency', e.target.value)}
                                className="text-[9px] font-bold text-slate-400 bg-transparent outline-none appearance-none"
                            >
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                                <option>NGN</option>
                            </select>
                            <input 
                              type="text" 
                              value={leg.amount}
                              onChange={(e) => updateLeg(leg.id, 'amount', e.target.value)}
                              placeholder="0.00"
                              className="text-right bg-transparent outline-none font-mono font-black text-slate-900 w-24 focus:bg-yellow-50"
                            />
                          </div>
                          {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && leg.cashCurrency !== leg.currency && (
                             <div className="text-[8px] text-right font-bold text-blue-500 uppercase tracking-tighter mt-0.5">
                                RATE ({leg.cashCurrency}/{leg.currency}): {leg.exchangeRate || '1.00'}
                             </div>
                          )}
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={leg.particulars}
                            onChange={(e) => updateLeg(leg.id, 'particulars', e.target.value)}
                            placeholder="Narration..."
                            className="w-full bg-transparent outline-none font-medium text-slate-500 italic text-[10px]"
                          />
                        </td>
                        <td className="text-center">
                          <button 
                            onClick={() => removeLeg(leg.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total Debit</span>
                    <span className="text-sm font-mono font-black text-red-600">USD {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total Credit</span>
                    <span className="text-sm font-mono font-black text-emerald-600">USD {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${isBalanced ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700 animate-pulse'}`}>
                      {isBalanced ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {isBalanced ? 'MATCHED' : 'UNBALANCED'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={resetForm}
                    className="px-6 py-2 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Reset Form
                  </button>
                  <button 
                    disabled={!isBalanced || legs.some(l => !l.accountNo || !l.amount) || hasCriticalViolation || isDateInvalid}
                    onClick={() => setPostingStep('REVIEW')}
                    className="px-10 py-2.5 bg-blue-600 shadow-lg shadow-blue-500/20 text-white text-[10px] font-black rounded hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest flex items-center gap-2.5 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                  >
                    {isDateInvalid ? 'Invalid Date' : hasCriticalViolation ? 'Limit Exceeded' : 'Review Posting'}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {postingStep === 'REVIEW' && (
          <motion.div
            key="step-review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-900 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded text-blue-400">
                    <Search size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white font-black text-sm uppercase tracking-widest">Transaction Summary Review</h3>
                    <p className="text-blue-400 text-[9px] font-bold uppercase tracking-tight">Please verify ledger entries before terminal commitment</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-[10px] font-bold text-blue-100 font-mono tracking-widest italic">
                  REF: TXN-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Header Info Review */}
                <div className="grid grid-cols-4 gap-12 pb-8 border-b border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Entry Type</span>
                    <span className="text-xs font-black text-slate-700">JOURNAL TRANSFER (T/T)</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Value Date</span>
                    <span className="text-xs font-black text-slate-700 font-mono">{formatDate(txnDate)}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Narration</span>
                    <span className="text-xs font-medium text-slate-500 italic">Generic automated posting of ledger transfer.</span>
                  </div>
                </div>

                {/* Table Review */}
                <div className="rounded border border-slate-100 overflow-hidden shadow-sm">
                   {/* Receipt Preview Trigger */}
                   {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                     <div className="bg-blue-50/50 p-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <FileText size={18} className="text-blue-600" />
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-blue-900 tracking-widest">Normal Receipt Generation</span>
                              <span className="text-[9px] font-bold text-slate-400 italic">System has generated a draft receipt for this transaction</span>
                           </div>
                        </div>
                        <button 
                           onClick={() => setShowReceipt(true)}
                           className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded hover:bg-blue-700 transition-all flex items-center gap-2"
                        >
                           <Search size={12} />
                           View Draft Receipt
                        </button>
                     </div>
                   )}
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Leg Type</th>
                        <th className="px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Account Details</th>
                        {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                          <th className="px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Cash Detail</th>
                        )}
                        <th className="px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Debit (USD)</th>
                        <th className="px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Credit (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {legs.map((leg, i) => (
                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                          <td className="px-4 py-3">
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                              leg.type === 'DEBIT' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}>
                              {leg.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-mono font-black text-slate-700">{leg.accountNo}</span>
                              <span className="text-[9px] text-slate-400 font-medium italic">{leg.particulars || 'No Remarks'}</span>
                              {entryType === 'CASH PAYMENT' && leg.instrumentNo && (
                                <div className="mt-1 flex items-center gap-2">
                                  <span className="text-[8px] font-black bg-slate-100 px-1 py-0.5 rounded text-slate-500 uppercase">CHQ: {leg.instrumentNo}</span>
                                  {leg.signatureVerified && (
                                    <span className="text-[8px] font-black bg-emerald-100 px-1 py-0.5 rounded text-emerald-600 uppercase">SIGN VERIFIED</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                            <td className="px-4 py-3 text-right">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-blue-600 font-mono">
                                  {leg.cashAmount} {leg.cashCurrency}
                                </span>
                                {leg.cashCurrency !== leg.currency && (
                                  <span className="text-[8px] font-bold text-slate-400 uppercase">Rate: {leg.exchangeRate}</span>
                                )}
                              </div>
                            </td>
                          )}
                          <td className="px-4 py-3 text-right text-xs font-mono font-bold text-red-600">
                            {leg.type === 'DEBIT' ? Number(leg.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '-'}
                          </td>
                          <td className="px-4 py-3 text-right text-xs font-mono font-bold text-emerald-600">
                            {leg.type === 'CREDIT' ? Number(leg.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-mono">
                      <tr>
                        <td colSpan={(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') ? 3 : 2} className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Trial Balance</td>
                        <td className="px-4 py-3 text-right text-xs font-black text-red-600">
                          {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-black text-emerald-600">
                          {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <button 
                  onClick={() => setPostingStep('DETAILS')}
                  className="px-6 py-2.5 text-[10px] font-black text-slate-500 hover:text-slate-700 uppercase tracking-widest flex items-center gap-2 group"
                >
                  <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Modify Entry
                </button>
                <button 
                  onClick={() => {
                    handleUpdateBatchTotal(totalDebit);
                    setUserDailyUtilization(curr => curr + totalDebit);
                    setPostingStep('SUCCESS');
                  }}
                  className="px-10 py-3 bg-blue-600 shadow-xl shadow-blue-600/20 text-white text-[10px] font-black rounded hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest flex items-center gap-2.5"
                >
                  <CheckCircle2 size={16} />
                  Confirm & Commit to Ledger
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {postingStep === 'SUCCESS' && (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded border border-slate-200 shadow-2xl overflow-hidden py-16 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2">Transaction Posted Successfully</h2>
            <p className="text-slate-400 text-xs font-medium max-w-xs mx-auto mb-8">
              The ledger has been updated and the batch running totals have been synchronized with the central node.
            </p>
            
            <div className="flex gap-4 p-4 bg-slate-50 rounded border border-slate-100 mb-8 font-mono">
               <div className="flex flex-col px-4 border-r border-slate-200">
                  <span className="text-[8px] text-slate-400 font-bold uppercase mb-1">Tran ID</span>
                  <span className="text-sm font-black text-blue-600">60129982</span>
               </div>
               <div className="flex flex-col px-4">
                  <span className="text-[8px] text-slate-400 font-bold uppercase mb-1">Value Date</span>
                  <span className="text-sm font-black text-slate-700">{formatDate(txnDate)}</span>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setTxnMode('LIST')}
                className="px-8 py-3 text-[10px] font-black text-slate-500 hover:text-slate-700 uppercase tracking-widest"
              >
                View Worklist
              </button>
              {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && (
                <button 
                  className="px-8 py-3 bg-white border border-slate-200 text-slate-700 text-[10px] font-black rounded hover:bg-slate-50 uppercase tracking-widest flex items-center gap-2"
                  onClick={() => alert('Printing Receipt...')}
                >
                  <Save size={14} />
                  Print Receipt
                </button>
              )}
              <button 
                onClick={resetForm}
                className="px-10 py-3 bg-slate-900 shadow-xl shadow-slate-900/20 text-white text-[10px] font-black rounded hover:bg-black transition-all active:scale-95 uppercase tracking-widest"
              >
                New Entry (F2)
              </button>
            </div>
          </motion.div>
        )}
            </AnimatePresence>
          </motion.div>
        )}

        {txnMode === 'LIST' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Pending Authorization Worklist</span>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-bold text-slate-400 uppercase">Active Filter:</span>
                   <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-black rounded border border-blue-100">{activeBatch.id} Group</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="text" placeholder="Search Worklist..." className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] outline-none w-48 focus:ring-1 focus:ring-blue-500" />
                <button className="px-3 py-1 bg-white border border-slate-200 text-[9px] font-black text-slate-600 rounded hover:bg-slate-50 uppercase tracking-widest">
                  View All Batches
                </button>
              </div>
            </div>
            <table className="finacle-grid">
              <thead>
                <tr>
                  <th>Post Date</th>
                  <th>Batch ID</th>
                  <th>TXN REF</th>
                  <th>Value Date</th>
                  <th>Amount (Agg)</th>
                  <th>Entered By</th>
                  <th>Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '24-MAY-2024', batch: activeBatch.id, ref: 'TX-9021-001', valueDate: '24-MAY-2024', amount: '45,000.00', user: 'JD_001', status: 'PENDING VERIFY' },
                  { date: '24-MAY-2024', batch: activeBatch.id, ref: 'TX-9021-002', valueDate: '24-MAY-2024', amount: '12,045.50', user: 'JD_001', status: 'IN PROGRESS' },
                  { date: '24-MAY-2024', batch: activeBatch.id, ref: 'TX-9500-112', valueDate: '24-MAY-2024', amount: '124,100.00', user: 'JD_001', status: 'FAILED' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-100">
                    <td className="font-mono text-slate-500">{item.date}</td>
                    <td>
                      <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-1.5 py-0.5 border border-blue-200 rounded-[1px]">{item.batch}</span>
                    </td>
                    <td className="font-mono text-blue-600 font-bold">{item.ref}</td>
                    <td className="font-mono text-slate-500 tracking-tighter italic">{item.valueDate}</td>
                    <td className="text-right font-mono font-bold text-slate-900 pr-6">{item.amount}</td>
                    <td className="font-bold text-slate-400 text-[10px] tracking-widest">{item.user}</td>
                    <td>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[8px] font-black tracking-widest border border-amber-200 shadow-sm">
                        {item.status}
                      </span>
                    </td>
                    <td>
                       <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                Showing {activeBatch.entries} items awaiting terminal commitment in Batch {activeBatch.id}.
              </div>
              <button className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded hover:bg-black transition-all">
                Authorize Entire Batch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry / Reversal / Financial Inquiry Modules */}
      {(txnOperation === 'INQUIRY' || txnOperation === 'REVERSAL' || txnOperation === 'FIN_INQUIRY') && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 text-white p-8 rounded-xl border-4 border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 border-2 border-blue-400/30 shrink-0">
                {txnOperation === 'INQUIRY' ? <Search size={32} /> : txnOperation === 'REVERSAL' ? <ArrowRightLeft size={32} /> : <Calculator size={32} />}
              </div>
              
              <div className="flex-1">
                 <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-1">{txnOperation.replace('_', ' ')}</h3>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-blue-500/20">
                      Shortcut: {txnOperation === 'REVERSAL' ? 'HCRT' : txnOperation === 'INQUIRY' ? 'HTI' : 'HFTI'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                      SOL 600017 | USER AUTHENTICATED
                    </span>
                 </div>
              </div>

              <div className="flex gap-3 bg-slate-800/80 p-2 rounded-xl border border-slate-700 backdrop-blur-md">
                 <div className="flex flex-col gap-1.5 px-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic flex items-center gap-1">
                      <Search size={10} /> Enter Master Ref
                    </label>
                    <input 
                      type="text" 
                      value={searchTxnId}
                      onChange={(e) => setSearchTxnId(e.target.value)}
                      placeholder="TXN-990-21..."
                      className="bg-slate-950 border border-slate-600 rounded-lg px-4 py-2.5 text-xs font-mono font-black text-blue-400 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-600/10 transition-all uppercase w-48"
                    />
                 </div>
                 <button 
                    onClick={() => setInquiryResult({ 
                      id: searchTxnId || 'S998273', 
                      date: '24-MAY-2024', 
                      amount: 45000.00, 
                      ccy: 'USD', 
                      status: 'POSTED', 
                      sol: '600017',
                      desc: 'SAVINGS DEPOSIT AT COUNTER'
                    })}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
                 >
                    Search Transaction
                 </button>
              </div>
            </div>

            {txnOperation === 'FIN_INQUIRY' && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 relative z-10 animate-in fade-in zoom-in-95">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase">Currency</span>
                    <select className="bg-slate-900 border border-slate-700 rounded p-1.5 text-[10px] font-bold text-slate-300 outline-none">
                       <option>ALL CURRENCIES</option>
                       <option>USD - US DOLLAR</option>
                       <option>GBP - BRITISH POUND</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase">Post Status</span>
                    <select className="bg-slate-900 border border-slate-700 rounded p-1.5 text-[10px] font-bold text-slate-300 outline-none">
                       <option>COMMITTED</option>
                       <option>PENDING APPROVAL</option>
                       <option>REVERSED</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase">Value Date Range</span>
                    <input type="date" className="bg-slate-900 border border-slate-700 rounded p-1.5 text-[10px] font-bold text-slate-300 outline-none" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase">Operator</span>
                    <input type="text" placeholder="ALL USERS" className="bg-slate-900 border border-slate-700 rounded p-1.5 text-[10px] font-bold text-slate-300 outline-none" />
                 </div>
              </div>
            )}
          </div>

          {inquiryResult && (
            <div className="bg-white border-4 border-slate-900 rounded-xl overflow-hidden shadow-[32px_32px_0px_0px_rgba(15,23,42,0.05)] animate-in fade-in slide-in-from-top-8 duration-500">
               <div className="bg-[#003366] p-6 flex justify-between items-center">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.3em] mb-1">Transaction Inquiry Results</span>
                     <h4 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-3">
                        MASTER TRACER: {inquiryResult.id}
                        <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                           {inquiryResult.status}
                        </span>
                     </h4>
                  </div>
                  <div className="text-right flex flex-col gap-1">
                     <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Entry Date</span>
                     <span className="text-lg font-black text-white font-mono">{inquiryResult.date}</span>
                  </div>
               </div>

               <div className="p-10">
                  <div className="grid grid-cols-3 gap-12 mb-10">
                     <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Transaction Description</span>
                        <p className="text-xs font-black text-slate-700 italic underline decoration-slate-200 decoration-2 underline-offset-4">{inquiryResult.desc}</p>
                     </div>
                     <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Authorization Details</span>
                        <p className="text-xs font-black text-slate-700">BM_ALEX_SMT8 | SOL: {inquiryResult.sol}</p>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Verified: 24-MAY-2024 16:45:12</span>
                     </div>
                     <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-end">
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Total Impact</span>
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black text-blue-800">{inquiryResult.ccy}</span>
                           <span className="text-2xl font-black text-blue-600 font-mono italic">
                             {inquiryResult.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="rounded-xl border-2 border-slate-100 overflow-hidden mb-10">
                     <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50">
                           <tr className="border-b-2 border-slate-100">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12">#</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">GL / Account</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Particulars</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Debit</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Credit</th>
                           </tr>
                        </thead>
                        <tbody className="text-xs font-bold text-slate-600">
                           <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-mono text-slate-300">01</td>
                              <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-800 font-mono">11001-VAL</span>
                                    <span className="text-[8px] uppercase tracking-widest text-slate-400">Cash in Vault SOL</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 italic font-medium">CASH DEPOSIT ADVICE REF {inquiryResult.id}</td>
                              <td className="px-6 py-4 text-right font-mono text-slate-900">{inquiryResult.amount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right font-mono text-slate-300">-</td>
                           </tr>
                           <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-mono text-slate-300">02</td>
                              <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-800 font-mono">0099283741</span>
                                    <span className="text-[8px] uppercase tracking-widest text-slate-400">Savings Account (Internal)</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 italic font-medium">CREDIT BY CASH - COUNTER TRANSACTION</td>
                              <td className="px-6 py-4 text-right font-mono text-slate-300">-</td>
                              <td className="px-6 py-4 text-right font-mono text-slate-900">{inquiryResult.amount.toLocaleString()}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  {txnOperation === 'REVERSAL' && (
                    <div className="bg-red-50 p-8 rounded-2xl border-2 border-red-100 animate-in zoom-in-95 duration-500">
                       <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                             <AlertCircle size={28} />
                          </div>
                          <div>
                             <h5 className="text-lg font-black text-red-900 uppercase italic tracking-tighter">Initiate Reversal Sequence</h5>
                             <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">This action is permanent and audited in the Core Tracers.</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div className="flex flex-col gap-2">
                             <label className="text-[10px] font-black text-red-700 uppercase tracking-widest pl-1 italic">Reversal Reason Code</label>
                             <select className="bg-white border-2 border-red-200 rounded-xl px-4 py-3 text-xs font-black text-slate-800 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-600/5 transition-all">
                                <option>INCORRECT ACCOUNT POSTING</option>
                                <option>FRAUDULENT INSTRUMENT DETECTED</option>
                                <option>DUPLICATE TRANSACTION</option>
                                <option>CUSTOMER REQUESTED CANCELLATION</option>
                             </select>
                          </div>
                          <div className="flex flex-col gap-2">
                             <label className="text-[10px] font-black text-red-700 uppercase tracking-widest pl-1 italic">Supervisor Auth PIN</label>
                             <input 
                               type="password" 
                               placeholder="ENTER SECURE TOKEN"
                               className="bg-white border-2 border-red-200 rounded-xl px-4 py-3 text-xs font-mono font-black tracking-[1em] text-slate-800 outline-none focus:border-red-500 transition-all placeholder:tracking-normal"
                             />
                          </div>
                          <div className="col-span-full flex flex-col gap-2">
                             <label className="text-[10px] font-black text-red-700 uppercase tracking-widest pl-1 italic">Audit Justification Remarks</label>
                             <textarea 
                                placeholder="State findings for reversal context..."
                                className="bg-white border-2 border-red-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-red-500 h-24 transition-all"
                             ></textarea>
                          </div>
                       </div>

                       <div className="flex justify-end pt-4 border-t border-red-200/50">
                          <button 
                             onClick={() => {
                                alert('REVERSAL COMMITTED: R-' + inquiryResult.id + '-REV');
                                setInquiryResult(null);
                                setSearchTxnId('');
                             }}
                             className="bg-red-600 text-white px-16 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/40 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                          >
                             Commit Global Reversal
                             <ArrowRightLeft size={16} />
                          </button>
                       </div>
                    </div>
                  )}

                  {txnOperation === 'INQUIRY' && (
                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
                       <button className="px-8 py-3 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all">
                          Export Log (PDF)
                       </button>
                       <button className="px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all">
                          Print Internal Copy
                       </button>
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showReceipt && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[300] flex items-center justify-center p-8"
          >
             <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg shadow-2xl relative"
             >
                <div className="bg-slate-900 p-2 flex justify-end">
                   <button onClick={() => setShowReceipt(false)} className="text-white hover:text-red-400 transition-colors">
                      <Plus size={20} className="rotate-45" />
                   </button>
                </div>
                
                <div className="p-12 font-mono flex flex-col gap-8 text-slate-800">
                   <div className="text-center space-y-1">
                      <h4 className="text-lg font-black tracking-tighter uppercase italic">Finacle Bank Ltd</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        {entryType === 'CASH PAYMENT' ? 'Withdrawal Payment Advice' : 'Official Transaction Receipt'}
                      </p>
                      <p className="text-[8px] font-bold text-slate-300">SOL ID: 600017 | USER: JD_001</p>
                   </div>

                   <div className="h-[1px] bg-slate-100 w-full dashed border-b border-dashed"></div>

                   <div className="grid grid-cols-2 gap-y-4 text-[10px]">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[8px] text-slate-400 font-black uppercase">Transaction Type</span>
                         <span className="font-black uppercase">{entryType}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 text-right">
                         <span className="text-[8px] text-slate-400 font-black uppercase">Date & Time</span>
                         <span className="font-black">24-MAY-2024 | 14:22:01</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[8px] text-slate-400 font-black uppercase">Account Number</span>
                         <span className="font-black underline decoration-slate-200">{legs[1]?.accountNo || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 text-right">
                         <span className="text-[8px] text-slate-400 font-black uppercase">Batch Reference</span>
                         <span className="font-black">{activeBatch.id}</span>
                      </div>
                      {entryType === 'CASH PAYMENT' && legs[0]?.instrumentNo && (
                        <div className="flex flex-col gap-0.5 mt-2 col-span-2">
                           <span className="text-[8px] text-slate-400 font-black uppercase">Instrument Detail</span>
                           <span className="font-black">CHEQUE NO: {legs[0].instrumentNo} | SIGNATURE {legs[0].signatureVerified ? 'VERIFIED' : 'PENDING'}</span>
                        </div>
                      )}
                   </div>

                   <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 flex flex-col items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {entryType === 'CASH PAYMENT' ? 'Total Amount Paid' : 'Net Deposited Amount'}
                      </span>
                      <div className="flex items-center gap-2">
                         <span className="text-2xl font-black italic tracking-tighter">{legs[0]?.currency || 'USD'}</span>
                         <span className={`text-4xl font-black tracking-tighter ${entryType === 'CASH PAYMENT' ? 'text-red-600' : 'text-blue-600'}`}>
                           {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                         </span>
                      </div>
                      {(entryType === 'CASH DEPOSIT' || entryType === 'CASH PAYMENT') && legs[0]?.cashCurrency !== legs[0]?.currency && (
                        <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                          {entryType === 'CASH PAYMENT' ? 'Payable as physical ' : 'Calculated from physical '} 
                          {legs[entryType === 'CASH PAYMENT' ? 1 : 0]?.cashAmount} {legs[entryType === 'CASH PAYMENT' ? 1 : 0]?.cashCurrency}
                        </div>
                      )}
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between text-[9px] border-b border-slate-50 pb-2 italic">
                         <span className="text-slate-400">Particulars:</span>
                         <span className="font-bold text-slate-600">{legs[1]?.particulars || 'No Remarks Provided'}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-black uppercase">
                         <span className="text-slate-400">Authorization:</span>
                         <span>SYSTEM GENERATED</span>
                      </div>
                   </div>

                   <div className="mt-12 flex flex-col items-center gap-4">
                      <div className="w-full flex justify-between gap-12 px-4">
                         <div className="flex-1 border-t border-slate-300 pt-1 text-center">
                            <span className="text-[8px] font-black uppercase text-slate-400">Cashier Signature</span>
                         </div>
                         <div className="flex-1 border-t border-slate-300 pt-1 text-center">
                            <span className="text-[8px] font-black uppercase text-slate-400">Customer Signature</span>
                         </div>
                      </div>
                      <p className="text-[7px] text-slate-300 font-medium uppercase tracking-[0.2em] italic">Electronic Receipt - No stamp required</p>
                   </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between gap-4">
                   <button 
                      onClick={() => setShowReceipt(false)}
                      className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100"
                   >
                      Exit Preview
                   </button>
                   <button 
                      className="flex-1 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                      onClick={() => alert('Sending to SOL printer: P-TR-001')}
                   >
                      Print Terminal Copy
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDenomLeg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
            >
              <div className="bg-[#003366] text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Calculator size={20} />
                  <h3 className="text-sm font-black italic tracking-tighter uppercase">Cash Denomination Table</h3>
                </div>
                <button onClick={() => setActiveDenomLeg(null)} className="opacity-60 hover:opacity-100 p-1">
                   <Plus size={20} className="rotate-45" />
                </button>
              </div>

              <div className="p-6">
                 <div className="flex justify-between items-center mb-6 py-2 px-4 bg-slate-50 border border-slate-100 rounded">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Leg Target</span>
                    <span className="text-sm font-mono font-black text-blue-900 italic">
                      USD {legs.find(l => l.id === activeDenomLeg)?.cashAmount || '0.00'}
                    </span>
                 </div>

                 <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 pb-2 border-b border-slate-100 mb-2">
                       <span className="text-[9px] font-black text-slate-400 uppercase">Note / Unit</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase text-center">Count</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase text-right">Value</span>
                    </div>

                    {(legs.find(l => l.id === activeDenomLeg)?.denominations || []).map((denom, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-4 items-center">
                        <div className="flex items-center gap-2">
                           <span className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-600 font-mono">
                             {denom.unit}
                           </span>
                        </div>
                        <input 
                           type="text" 
                           value={denom.count}
                           onChange={(e) => {
                             const newLegs = legs.map(l => {
                               if (l.id !== activeDenomLeg) return l;
                               const newDenoms = [...(l.denominations || [])];
                               newDenoms[idx] = { ...denom, count: e.target.value };
                               
                               // Calculate total cash amount from denoms
                               const total = newDenoms.reduce((acc, curr) => {
                                 return acc + (curr.unit * (parseInt(curr.count) || 0));
                               }, 0);
                               
                               return { ...l, denominations: newDenoms, cashAmount: total.toFixed(2) };
                             });
                             setLegs(newLegs);

                             // Also update the main amount logic if currencies differ
                             const leg = newLegs.find(l => l.id === activeDenomLeg);
                             if (leg) updateLeg(leg.id, 'cashAmount', leg.cashAmount || '0.00');
                           }}
                           placeholder="0"
                           className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-center font-mono font-bold text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-right font-mono font-black text-slate-700 text-xs">
                           {(denom.unit * (parseInt(denom.count) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                 </div>

                 <div className="mt-8 pt-4 border-t-2 border-slate-100 flex justify-between items-center">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Physical Value</span>
                       <span className="text-xl font-mono font-black text-blue-600">
                         USD {(legs.find(l => l.id === activeDenomLeg)?.denominations || []).reduce((acc, curr) => acc + (curr.unit * (parseInt(curr.count) || 0)), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                       </span>
                    </div>
                    <button 
                       onClick={() => setActiveDenomLeg(null)}
                       className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
                    >
                       Confirm Data
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
