import requests
import json
import random
from datetime import datetime

# The API URL of the running application
# In development, it's typically http://localhost:3000
API_URL = "http://localhost:3000/api/transactions"

def create_random_transaction():
    """Generates a random transaction payload matching the system schema."""
    batch_id = f"B-{random.randint(10000, 99999)}"
    # common types in the system
    txn_type = random.choice(["CASH DEPOSIT", "CASH PAYMENT", "JOURNAL TRANSFER (T/T)", "HXFER"])
    
    amount = f"{random.uniform(50, 5000):.2f}"
    
    legs = [
        {
            "id": "1",
            "accountNo": f"{random.randint(100000000, 999999999)}",
            "type": "DEBIT",
            "amount": amount,
            "currency": "USD",
            "particulars": f"External Feed - {txn_type}"
        },
        {
            "id": "2",
            "accountNo": f"{random.randint(100000000, 999999999)}",
            "type": "CREDIT",
            "amount": amount,
            "currency": "USD",
            "particulars": f"External Feed - Contra"
        }
    ]
    
    payload = {
        "batchId": batch_id,
        "type": txn_type,
        "legs": legs,
        "origin": "EXTERNAL", # Mark as external origin
        "date": datetime.now().strftime("%Y-%m-%d")
    }
    
    return payload

def feed_data(count=5):
    """Feeds N random transactions into the system."""
    print(f"Starting data feed of {count} transactions to {API_URL}...")
    
    success_count = 0
    for i in range(count):
        data = create_random_transaction()
        try:
            response = requests.post(API_URL, json=data)
            if response.status_code == 201:
                txn_id = response.json().get('id')
                print(f"[SUCCESS] Transaction {i+1} created: {txn_id}")
                success_count += 1
            else:
                print(f"[ERROR] Transaction {i+1} failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"[CRITICAL] Error during request: {e}")
            print("Make sure the development server is running.")
            break
            
    print(f"\nFeed complete. {success_count}/{count} transactions successfully processed.")

if __name__ == "__main__":
    # You can change the count here or take it as a command line argument
    feed_data(10)
