// Core banking entity types

export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'DORMANT' | 'BLOCKED';
export type CustomerType = 'RETAIL' | 'CORPORATE';
export type AccountType = 'SAVINGS' | 'CURRENT' | 'TERM_DEPOSIT' | 'TOP_UP_DEPOSIT' | 'OVERDRAFT';
export type AccountStatus = 'ACTIVE' | 'DORMANT' | 'FROZEN' | 'CLOSED' | 'PENDING_VERIFICATION';
export type TxnType =
  | 'CASH_DEPOSIT'
  | 'CASH_PAYMENT'
  | 'TRANSFER'
  | 'JOURNAL'
  | 'INTEREST'
  | 'CHARGES'
  | 'REVERSAL'
  | 'TDS'
  | 'TD_BOOKING'
  | 'TD_RENEWAL'
  | 'TD_CLOSURE';
export type TxnStatus = 'POSTED' | 'PENDING_VERIFICATION' | 'REVERSED' | 'FAILED';

export interface Customer {
  cifId: string;
  type: CustomerType;
  status: CustomerStatus;
  // Retail fields
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  fullName: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  idType?: string;
  idNumber?: string;
  // Corporate fields
  entityName?: string;
  registrationNo?: string;
  constitutionType?: string;
  industry?: string;
  dateOfInc?: string;
  // Contact
  mobile?: string;
  email?: string;
  address?: string;
  city?: string;
  // Meta
  createdAt: string;
  createdBy: string;
  branchCode: string;
}

export interface Account {
  id: string;
  cifId: string;
  type: AccountType;
  currency: string;
  balance: number;
  status: AccountStatus;
  openedDate: string;
  schemeName: string;
  schemeCode: string;
  interestRate: number;
  // Term deposit specific
  maturityDate?: string;
  tenor?: number;
  tenorUnit?: 'DAYS' | 'MONTHS' | 'YEARS';
  maturityAmount?: number;
  renewalInstruction?: 'RENEW' | 'CREDIT_TO_ACCOUNT' | 'PAY_OUT';
  // Overdraft specific
  sanctionLimit?: number;
  // Meta
  createdAt: string;
  branchCode: string;
}

export interface Transaction {
  id: string;
  batchId: string;
  date: string;
  type: TxnType;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  currency: string;
  particulars: string;
  instrumentNo?: string;
  status: TxnStatus;
  reversedBy?: string;
  reversalReason?: string;
  postedBy: string;
  branchCode: string;
  createdAt: string;
}

export interface ChequeBook {
  id: string;
  accountId: string;
  cifId: string;
  startChequeNo: string;
  endChequeNo: string;
  leaves: number;
  issuedDate: string;
  status: 'ACTIVE' | 'EXHAUSTED' | 'BLOCKED';
  usedLeaves: number;
}

export interface AppStore {
  customers: Customer[];
  accounts: Account[];
  transactions: Transaction[];
  chequeBooks: ChequeBook[];
  lastUpdated: string;
}
