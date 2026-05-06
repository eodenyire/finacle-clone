export interface TransactionLeg {
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
}

export interface Transaction {
  id: string;
  batchId: string;
  type: string;
  date: string;
  legs: TransactionLeg[];
  status: string;
  origin?: 'CRM' | 'TELLER' | 'SYSTEM' | 'EXTERNAL';
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch('/api/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

export async function createTransaction(txn: Omit<Transaction, 'id' | 'status'>): Promise<Transaction> {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(txn),
  });
  if (!response.ok) {
    throw new Error('Failed to create transaction');
  }
  return response.json();
}

export interface RateCode {
  id: string;
  code: string;
  desc: string;
  fixed: string;
  var: string;
  buy: string;
  sell: string;
  mid: string;
  verify?: string;
}

export async function fetchRateCodes(): Promise<RateCode[]> {
  const response = await fetch('/api/rate-codes');
  if (!response.ok) {
    throw new Error('Failed to fetch rate codes');
  }
  return response.json();
}

export async function updateRateCode(code: string, data: Partial<RateCode>): Promise<RateCode> {
  const response = await fetch(`/api/rate-codes/${code}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update rate code');
  }
  return response.json();
}

export async function reverseTransaction(id: string, data: { reason: string, reasonCode: string, supervisorId: string }): Promise<{ success: boolean, original: Transaction, contra: Transaction }> {
  const response = await fetch(`/api/transactions/${id}/reverse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to reverse transaction');
  }
  return response.json();
}
