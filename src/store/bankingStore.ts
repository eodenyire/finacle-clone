import { AppStore } from './types';

const STORE_KEY = 'finacle_banking_store_v1';

const SEED: AppStore = {
  customers: [
    {
      cifId: '99018273',
      type: 'RETAIL',
      status: 'ACTIVE',
      title: 'Ms',
      firstName: 'ADITI',
      middleName: 'RAO',
      lastName: 'HYDARI',
      fullName: 'ADITI RAO HYDARI',
      gender: 'Female',
      dob: '1990-03-15',
      nationality: 'Indian',
      idType: 'PASSPORT',
      idNumber: 'P-8723611',
      mobile: '+91 99283-0012',
      email: 'aditi.rao@finmail.net',
      address: '42 Central Plaza, West End, Mumbai, 400101',
      city: 'Mumbai',
      createdAt: '2021-05-12T10:00:00Z',
      createdBy: 'SYSTEM',
      branchCode: 'MUM001',
    },
    {
      cifId: '99018442',
      type: 'RETAIL',
      status: 'ACTIVE',
      title: 'Mr',
      firstName: 'LIAM',
      lastName: 'NEESON',
      fullName: 'LIAM NEESON',
      gender: 'Male',
      dob: '1982-07-07',
      nationality: 'British',
      idType: 'PASSPORT',
      idNumber: 'UK-4421009',
      mobile: '+44 20-7946-0128',
      email: 'liam.neeson@finmail.net',
      address: '10 Downing St, London, SW1A 2AA',
      city: 'London',
      createdAt: '2020-11-03T09:00:00Z',
      createdBy: 'SYSTEM',
      branchCode: 'LON001',
    },
    {
      cifId: '11029384',
      type: 'CORPORATE',
      status: 'ACTIVE',
      fullName: 'AURELIUS CONSTRUCTIONS LTD',
      entityName: 'AURELIUS CONSTRUCTIONS LTD',
      registrationNo: 'IT-REG-00239841',
      constitutionType: 'Public Limited',
      industry: 'Construction',
      dateOfInc: '2005-04-20',
      mobile: '+39 06-1234-5678',
      email: 'finance@aurelius.it',
      address: 'Via dei Fori Imperiali 12, Rome, 00187',
      city: 'Rome',
      createdAt: '2019-08-15T08:30:00Z',
      createdBy: 'SYSTEM',
      branchCode: 'ROM001',
    },
    {
      cifId: '88273645',
      type: 'RETAIL',
      status: 'INACTIVE',
      title: 'Mr',
      firstName: 'MARCUS',
      lastName: 'AURELIUS',
      fullName: 'MARCUS AURELIUS',
      gender: 'Male',
      dob: '1975-01-18',
      nationality: 'Italian',
      idType: 'GOVT ISSUED ID',
      idNumber: 'IT-9876001',
      mobile: '+39 06-9876-5432',
      email: 'marcus.aurelius@finmail.net',
      address: 'Via Appia Antica 7, Rome, 00178',
      city: 'Rome',
      createdAt: '2018-03-10T11:00:00Z',
      createdBy: 'SYSTEM',
      branchCode: 'ROM001',
    },
  ],
  accounts: [
    {
      id: '1002394857',
      cifId: '99018273',
      type: 'SAVINGS',
      currency: 'USD',
      balance: 245600.0,
      status: 'ACTIVE',
      openedDate: '2021-05-12',
      schemeName: 'SAVINGS BASIC',
      schemeCode: 'SBBASIC',
      interestRate: 3.5,
      createdAt: '2021-05-12T10:00:00Z',
      branchCode: 'MUM001',
    },
    {
      id: '2004958172',
      cifId: '99018273',
      type: 'CURRENT',
      currency: 'USD',
      balance: 12045.5,
      status: 'ACTIVE',
      openedDate: '2021-05-12',
      schemeName: 'CURRENT BASIC',
      schemeCode: 'CABSC',
      interestRate: 0.0,
      createdAt: '2021-05-12T10:05:00Z',
      branchCode: 'MUM001',
    },
    {
      id: 'TD-901827',
      cifId: '99018273',
      type: 'TERM_DEPOSIT',
      currency: 'USD',
      balance: 1000000.0,
      status: 'ACTIVE',
      openedDate: '2023-01-10',
      schemeName: 'TD 1 YEAR',
      schemeCode: 'TD1YR',
      interestRate: 7.25,
      maturityDate: '2024-01-10',
      tenor: 12,
      tenorUnit: 'MONTHS',
      maturityAmount: 1072500.0,
      renewalInstruction: 'RENEW',
      createdAt: '2023-01-10T09:00:00Z',
      branchCode: 'MUM001',
    },
    {
      id: '3009283746',
      cifId: '99018442',
      type: 'SAVINGS',
      currency: 'GBP',
      balance: 87650.0,
      status: 'ACTIVE',
      openedDate: '2020-11-03',
      schemeName: 'SAVINGS PREMIUM',
      schemeCode: 'SBPREM',
      interestRate: 4.0,
      createdAt: '2020-11-03T09:00:00Z',
      branchCode: 'LON001',
    },
    {
      id: '4019283746',
      cifId: '11029384',
      type: 'CURRENT',
      currency: 'EUR',
      balance: 528900.0,
      status: 'ACTIVE',
      openedDate: '2019-08-15',
      schemeName: 'CORPORATE CURRENT',
      schemeCode: 'CCORP',
      interestRate: 0.0,
      createdAt: '2019-08-15T08:30:00Z',
      branchCode: 'ROM001',
    },
  ],
  transactions: [
    {
      id: 'TXN-10012024-001',
      batchId: 'B-99012',
      date: '2024-01-10',
      type: 'CASH_DEPOSIT',
      debitAccountId: '11001-VAL',
      creditAccountId: '1002394857',
      amount: 50000.0,
      currency: 'USD',
      particulars: 'CASH DEPOSIT BY CUSTOMER',
      status: 'POSTED',
      postedBy: 'TELLER01',
      branchCode: 'MUM001',
      createdAt: '2024-01-10T10:23:00Z',
    },
    {
      id: 'TXN-10012024-002',
      batchId: 'B-99012',
      date: '2024-01-10',
      type: 'TRANSFER',
      debitAccountId: '1002394857',
      creditAccountId: '2004958172',
      amount: 5000.0,
      currency: 'USD',
      particulars: 'INTERNAL TRANSFER',
      status: 'POSTED',
      postedBy: 'TELLER01',
      branchCode: 'MUM001',
      createdAt: '2024-01-10T11:45:00Z',
    },
    {
      id: 'TXN-11012024-001',
      batchId: 'B-99015',
      date: '2024-01-11',
      type: 'CASH_PAYMENT',
      debitAccountId: '1002394857',
      creditAccountId: '11001-VAL',
      amount: 2500.0,
      currency: 'USD',
      particulars: 'CASH WITHDRAWAL',
      status: 'POSTED',
      postedBy: 'TELLER02',
      branchCode: 'MUM001',
      createdAt: '2024-01-11T09:15:00Z',
    },
    {
      id: 'TXN-11012024-002',
      batchId: 'B-99015',
      date: '2024-01-11',
      type: 'INTEREST',
      debitAccountId: 'INT-EXP-GL',
      creditAccountId: '1002394857',
      amount: 712.5,
      currency: 'USD',
      particulars: 'QUARTERLY INTEREST CREDIT',
      status: 'POSTED',
      postedBy: 'SYSTEM',
      branchCode: 'MUM001',
      createdAt: '2024-01-11T00:01:00Z',
    },
  ],
  chequeBooks: [
    {
      id: 'CHQ-MUM-10023',
      accountId: '1002394857',
      cifId: '99018273',
      startChequeNo: '100001',
      endChequeNo: '100025',
      leaves: 25,
      issuedDate: '2021-06-01',
      status: 'ACTIVE',
      usedLeaves: 3,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export function loadStore(): AppStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      return JSON.parse(raw) as AppStore;
    }
  } catch {
    // fall through to seed
  }
  return JSON.parse(JSON.stringify(SEED));
}

export function saveStore(store: AppStore): void {
  localStorage.setItem(
    STORE_KEY,
    JSON.stringify({ ...store, lastUpdated: new Date().toISOString() })
  );
}

export function resetStore(): void {
  localStorage.removeItem(STORE_KEY);
}

/** Generate a sequential numeric CIF ID */
export function nextCifId(store: AppStore): string {
  const numericIds = store.customers
    .map((c) => parseInt(c.cifId, 10))
    .filter((n) => !isNaN(n));
  const max = numericIds.length > 0 ? Math.max(...numericIds) : 10000000;
  return String(max + 1);
}

/** Generate a sequential numeric account ID */
export function nextAccountId(store: AppStore, prefix = ''): string {
  if (prefix) {
    const existing = store.accounts
      .filter((a) => a.id.startsWith(prefix + '-'))
      .map((a) => parseInt(a.id.replace(prefix + '-', ''), 10))
      .filter((n) => !isNaN(n));
    const max = existing.length > 0 ? Math.max(...existing) : 900000;
    return `${prefix}-${max + 1}`;
  }
  const numericIds = store.accounts
    .map((a) => parseInt(a.id, 10))
    .filter((n) => !isNaN(n));
  const max = numericIds.length > 0 ? Math.max(...numericIds) : 1000000000;
  return String(max + 1);
}

/** Generate a transaction ID */
export function nextTxnId(store: AppStore): string {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const todayTxns = store.transactions.filter((t) => t.id.includes(today));
  const seq = String(todayTxns.length + 1).padStart(3, '0');
  return `TXN-${today}-${seq}`;
}
