/**
 * TypeScript Data Feed Script
 * 
 * To run this script:
 * npx tsx scripts/feed_transactions.ts
 */

const API_URL = "http://localhost:3000/api/transactions";

async function feedData(count = 5) {
  console.log(`Starting TS data feed of ${count} transactions to ${API_URL}...`);
  
  let successCount = 0;
  
  for (let i = 0; i < count; i++) {
    const amount = (Math.random() * 5000 + 50).toFixed(2);
    const txnType = ["CASH DEPOSIT", "CASH PAYMENT", "JOURNAL TRANSFER (T/T)"][Math.floor(Math.random() * 3)];
    
    const data = {
      batchId: `B-${Math.floor(Math.random() * 90000 + 10000)}`,
      type: txnType,
      origin: "SYSTEM",
      legs: [
        {
          id: "1",
          accountNo: Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
          type: "DEBIT",
          amount: amount,
          currency: "USD",
          particulars: `System Feed - ${txnType}`
        },
        {
          id: "2",
          accountNo: Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
          type: "CREDIT",
          amount: amount,
          currency: "USD",
          particulars: `System Feed - Balancing`
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result: any = await response.json();
        console.log(`[SUCCESS] Transaction ${i + 1} created: ${result.id}`);
        successCount++;
      } else {
        const errorText = await response.text();
        console.error(`[ERROR] Transaction ${i + 1} failed: ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      console.error(`[CRITICAL] Error during request: ${error.message}`);
      console.log("Make sure the development server is running.");
      break;
    }
  }
  
  console.log(`\nFeed complete. ${successCount}/${count} transactions successfully processed.`);
}

// Execute the feed
feedData(10).catch(console.error);
