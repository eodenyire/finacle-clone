import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AppStore,
  Customer,
  Account,
  Transaction,
  ChequeBook,
  CustomerType,
  AccountType,
  TxnType,
} from '../store/types';
import {
  loadStore,
  saveStore,
  nextCifId,
  nextAccountId,
  nextTxnId,
} from '../store/bankingStore';

// ---------------------------------------------------------------------------
// Types for operation inputs
// ---------------------------------------------------------------------------

export interface CreateCustomerInput {
  type: CustomerType;
  // Retail
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  idType?: string;
  idNumber?: string;
  // Corporate
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
}

export interface CreateAccountInput {
  cifId: string;
  type: AccountType;
  currency: string;
  schemeName: string;
  schemeCode: string;
  interestRate?: number;
  // TD
  tenor?: number;
  tenorUnit?: 'DAYS' | 'MONTHS' | 'YEARS';
  renewalInstruction?: 'RENEW' | 'CREDIT_TO_ACCOUNT' | 'PAY_OUT';
  initialDeposit?: number;
  // OD
  sanctionLimit?: number;
}

export interface PostTransactionInput {
  batchId: string;
  type: TxnType;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  currency: string;
  particulars: string;
  instrumentNo?: string;
}

// ---------------------------------------------------------------------------
// Context value shape
// ---------------------------------------------------------------------------

interface BankingContextValue {
  store: AppStore;
  // Customer operations
  createCustomer: (input: CreateCustomerInput) => Customer;
  searchCustomers: (query: string, searchBy: 'CIF' | 'NAME' | 'TIN' | 'ACC') => Customer[];
  getCustomer: (cifId: string) => Customer | undefined;
  // Account operations
  createAccount: (input: CreateAccountInput) => Account;
  getAccount: (accountId: string) => Account | undefined;
  getAccountsByCif: (cifId: string) => Account[];
  updateAccountStatus: (accountId: string, status: Account['status']) => void;
  // Transaction operations
  postTransaction: (input: PostTransactionInput) => Transaction;
  getTransactions: (options?: {
    accountId?: string;
    cifId?: string;
    dateFrom?: string;
    dateTo?: string;
    txnId?: string;
  }) => Transaction[];
  reverseTransaction: (txnId: string, reason: string) => void;
  // Cheque book
  issueChequeBook: (accountId: string, cifId: string, leaves: number) => ChequeBook;
  getChequeBooks: (accountId: string) => ChequeBook[];
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const BankingContext = createContext<BankingContextValue | null>(null);

export function useBanking(): BankingContextValue {
  const ctx = useContext(BankingContext);
  if (!ctx) throw new Error('useBanking must be used within BankingProvider');
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function BankingProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<AppStore>(() => loadStore());

  const persist = useCallback((updater: (prev: AppStore) => AppStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  }, []);

  // -------------------------------------------------------------------------
  // Customer operations
  // -------------------------------------------------------------------------

  const createCustomer = useCallback(
    (input: CreateCustomerInput): Customer => {
      const cifId = nextCifId(store);
      const fullName =
        input.type === 'CORPORATE'
          ? (input.entityName || '').toUpperCase()
          : [input.firstName, input.middleName, input.lastName]
              .filter(Boolean)
              .join(' ')
              .toUpperCase();

      const customer: Customer = {
        cifId,
        type: input.type,
        status: 'ACTIVE',
        fullName,
        ...input,
        createdAt: new Date().toISOString(),
        createdBy: 'TELLER01',
        branchCode: 'HQ001',
      };

      persist((prev) => ({
        ...prev,
        customers: [...prev.customers, customer],
      }));

      return customer;
    },
    [store, persist]
  );

  const searchCustomers = useCallback(
    (query: string, searchBy: 'CIF' | 'NAME' | 'TIN' | 'ACC'): Customer[] => {
      const q = query.trim().toUpperCase();
      if (!q) return store.customers;

      return store.customers.filter((c) => {
        switch (searchBy) {
          case 'CIF':
            return c.cifId.includes(q);
          case 'NAME':
            return c.fullName.includes(q);
          case 'TIN':
            return (c.idNumber || '').toUpperCase().includes(q);
          case 'ACC': {
            const accs = store.accounts.filter((a) => a.cifId === c.cifId);
            return accs.some((a) => a.id.includes(q));
          }
          default:
            return false;
        }
      });
    },
    [store]
  );

  const getCustomer = useCallback(
    (cifId: string) => store.customers.find((c) => c.cifId === cifId),
    [store]
  );

  // -------------------------------------------------------------------------
  // Account operations
  // -------------------------------------------------------------------------

  const createAccount = useCallback(
    (input: CreateAccountInput): Account => {
      const isTermDeposit = input.type === 'TERM_DEPOSIT' || input.type === 'TOP_UP_DEPOSIT';
      const prefix = isTermDeposit ? 'TD' : undefined;
      const id = nextAccountId(store, prefix);

      let maturityDate: string | undefined;
      let maturityAmount: number | undefined;
      if (isTermDeposit && input.tenor && input.tenorUnit) {
        const d = new Date();
        if (input.tenorUnit === 'MONTHS') d.setMonth(d.getMonth() + input.tenor);
        else if (input.tenorUnit === 'YEARS') d.setFullYear(d.getFullYear() + input.tenor);
        else d.setDate(d.getDate() + input.tenor);
        maturityDate = d.toISOString().split('T')[0];
        const rate = input.interestRate || 0;
        const deposit = input.initialDeposit || 0;
        maturityAmount = deposit * (1 + rate / 100);
      }

      const account: Account = {
        id,
        cifId: input.cifId,
        type: input.type,
        currency: input.currency,
        balance: input.initialDeposit || 0,
        status: 'ACTIVE',
        openedDate: new Date().toISOString().split('T')[0],
        schemeName: input.schemeName,
        schemeCode: input.schemeCode,
        interestRate: input.interestRate || 0,
        maturityDate,
        tenor: input.tenor,
        tenorUnit: input.tenorUnit,
        maturityAmount,
        renewalInstruction: input.renewalInstruction,
        sanctionLimit: input.sanctionLimit,
        createdAt: new Date().toISOString(),
        branchCode: 'HQ001',
      };

      persist((prev) => ({
        ...prev,
        accounts: [...prev.accounts, account],
      }));

      return account;
    },
    [store, persist]
  );

  const getAccount = useCallback(
    (accountId: string) => store.accounts.find((a) => a.id === accountId),
    [store]
  );

  const getAccountsByCif = useCallback(
    (cifId: string) => store.accounts.filter((a) => a.cifId === cifId),
    [store]
  );

  const updateAccountStatus = useCallback(
    (accountId: string, status: Account['status']) => {
      persist((prev) => ({
        ...prev,
        accounts: prev.accounts.map((a) =>
          a.id === accountId ? { ...a, status } : a
        ),
      }));
    },
    [persist]
  );

  // -------------------------------------------------------------------------
  // Transaction operations
  // -------------------------------------------------------------------------

  const postTransaction = useCallback(
    (input: PostTransactionInput): Transaction => {
      const id = nextTxnId(store);
      const txn: Transaction = {
        id,
        batchId: input.batchId,
        date: new Date().toISOString().split('T')[0],
        type: input.type,
        debitAccountId: input.debitAccountId,
        creditAccountId: input.creditAccountId,
        amount: input.amount,
        currency: input.currency,
        particulars: input.particulars,
        instrumentNo: input.instrumentNo,
        status: 'POSTED',
        postedBy: 'TELLER01',
        branchCode: 'HQ001',
        createdAt: new Date().toISOString(),
      };

      persist((prev) => {
        // Update balances for real accounts (ignore GL-like IDs that don't exist in accounts)
        const updatedAccounts = prev.accounts.map((acc) => {
          if (acc.id === input.debitAccountId) {
            return { ...acc, balance: acc.balance - input.amount };
          }
          if (acc.id === input.creditAccountId) {
            return { ...acc, balance: acc.balance + input.amount };
          }
          return acc;
        });

        return {
          ...prev,
          accounts: updatedAccounts,
          transactions: [...prev.transactions, txn],
        };
      });

      return txn;
    },
    [store, persist]
  );

  const getTransactions = useCallback(
    (options?: {
      accountId?: string;
      cifId?: string;
      dateFrom?: string;
      dateTo?: string;
      txnId?: string;
    }): Transaction[] => {
      let txns = store.transactions;

      if (options?.txnId) {
        return txns.filter((t) => t.id.includes(options.txnId!.toUpperCase()));
      }

      if (options?.accountId) {
        const accId = options.accountId;
        txns = txns.filter(
          (t) => t.debitAccountId === accId || t.creditAccountId === accId
        );
      }

      if (options?.cifId) {
        const accounts = store.accounts
          .filter((a) => a.cifId === options.cifId)
          .map((a) => a.id);
        txns = txns.filter(
          (t) =>
            accounts.includes(t.debitAccountId) ||
            accounts.includes(t.creditAccountId)
        );
      }

      if (options?.dateFrom) {
        txns = txns.filter((t) => t.date >= options.dateFrom!);
      }

      if (options?.dateTo) {
        txns = txns.filter((t) => t.date <= options.dateTo!);
      }

      return txns.slice().reverse();
    },
    [store]
  );

  const reverseTransaction = useCallback(
    (txnId: string, reason: string) => {
      const original = store.transactions.find((t) => t.id === txnId);
      if (!original || original.status === 'REVERSED') return;

      const reversalId = nextTxnId(store);
      const reversal: Transaction = {
        ...original,
        id: reversalId,
        type: 'REVERSAL',
        // swap debit/credit
        debitAccountId: original.creditAccountId,
        creditAccountId: original.debitAccountId,
        particulars: `REVERSAL OF ${original.id} - ${reason}`,
        status: 'POSTED',
        reversedBy: 'TELLER01',
        reversalReason: reason,
        createdAt: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
      };

      persist((prev) => {
        const updatedAccounts = prev.accounts.map((acc) => {
          if (acc.id === reversal.debitAccountId) {
            return { ...acc, balance: acc.balance - reversal.amount };
          }
          if (acc.id === reversal.creditAccountId) {
            return { ...acc, balance: acc.balance + reversal.amount };
          }
          return acc;
        });

        return {
          ...prev,
          accounts: updatedAccounts,
          transactions: [
            ...prev.transactions.map((t) =>
              t.id === txnId ? { ...t, status: 'REVERSED' as const } : t
            ),
            reversal,
          ],
        };
      });
    },
    [store, persist]
  );

  // -------------------------------------------------------------------------
  // Cheque book operations
  // -------------------------------------------------------------------------

  const issueChequeBook = useCallback(
    (accountId: string, cifId: string, leaves: number): ChequeBook => {
      const existing = store.chequeBooks.filter((c) => c.accountId === accountId);
      const baseStart = 100001 + existing.length * 50;
      const start = String(baseStart).padStart(6, '0');
      const end = String(baseStart + leaves - 1).padStart(6, '0');
      const bookId = `CHQ-${accountId.slice(-6)}-${String(existing.length + 1).padStart(3, '0')}`;

      const book: ChequeBook = {
        id: bookId,
        accountId,
        cifId,
        startChequeNo: start,
        endChequeNo: end,
        leaves,
        issuedDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE',
        usedLeaves: 0,
      };

      persist((prev) => ({
        ...prev,
        chequeBooks: [...prev.chequeBooks, book],
      }));

      return book;
    },
    [store, persist]
  );

  const getChequeBooks = useCallback(
    (accountId: string) => store.chequeBooks.filter((c) => c.accountId === accountId),
    [store]
  );

  // -------------------------------------------------------------------------
  // Context value
  // -------------------------------------------------------------------------

  const value: BankingContextValue = {
    store,
    createCustomer,
    searchCustomers,
    getCustomer,
    createAccount,
    getAccount,
    getAccountsByCif,
    updateAccountStatus,
    postTransaction,
    getTransactions,
    reverseTransaction,
    issueChequeBook,
    getChequeBooks,
  };

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
}
