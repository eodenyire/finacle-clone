/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from '@/src/components/layout/Sidebar';
import TopBar from '@/src/components/layout/TopBar';
import Dashboard from '@/src/components/dashboard/Dashboard';
import CustomerSearch from '@/src/components/customer/CustomerSearch';
import CustomerDetail from '@/src/components/customer/CustomerDetail';
import Login from '@/src/components/auth/Login';
import TransactionPosting from '@/src/components/transactions/TransactionPosting';
import ProductFactory from '@/src/components/product/ProductFactory';
import CustomerCRM from '@/src/components/customer/CustomerCRM';
import LimitsRegistry from '@/src/components/limits/LimitsRegistry';
import AccountingBackbone from '@/src/components/accounting/AccountingBackbone';
import InfrastructureSystem from '@/src/components/infrastructure/InfrastructureSystem';
import ReusableComponents from '@/src/components/services/ReusableComponents';
import Roadmap from '@/src/components/dashboard/Roadmap';
import TransactionMaintenance from '@/src/components/transactions/TransactionMaintenance';
import TransactionReversal from '@/src/components/transactions/TransactionReversal';
import { MENU_DATA } from '@/src/constants';
import { Activity } from 'lucide-react';
import FinancialTransactionsInquiry from '@/src/components/transactions/FinancialTransactionsInquiry';
import OfficeLedgerPrint from '@/src/components/reports/OfficeLedgerPrint';
import ClearingMaintenance from '@/src/components/transactions/ClearingMaintenance';
import MemoPadLookup from '@/src/components/common/MemoPadLookup';
import CustomerDetailsInquiry from '@/src/components/customer/CustomerDetailsInquiry';
import SignatureInquiry from '@/src/components/customer/SignatureInquiry';
import ChequeStatusInquiry from '@/src/components/accounts/ChequeStatusInquiry';
import MISTDAccountOpening from '@/src/components/accounts/MISTDAccountOpening';
import AccountMaintenance from '@/src/components/accounts/AccountMaintenance';
import InventoryManagement from '@/src/components/accounting/InventoryManagement';
import LoginInfo from '@/src/components/auth/LoginInfo';
import DSAInquiry from '@/src/components/reports/DSAInquiry';
import InterestAdjustmentRegister from '@/src/components/transactions/InterestAdjustmentRegister';
import CIFCreation from '@/src/components/customer/CIFCreation';
import AccountClosureMaintenance from '@/src/components/accounts/AccountClosureMaintenance';
import ChequeBookIssue from '@/src/components/accounts/ChequeBookIssue';
import BalanceConfirmationCert from '@/src/components/accounts/BalanceConfirmationCert';
import GLMaintenance from '@/src/components/accounting/GLMaintenance';
import GLProductLinking from '@/src/components/accounting/GLProductLinking';
import GLTransactionInquiry from '@/src/components/accounting/GLTransactionInquiry';
import RemittanceMaintenance from '@/src/components/accounting/RemittanceMaintenance';
import RateMaintenance from '@/src/components/accounting/RateMaintenance';
import InterestManager from '@/src/components/interest/InterestManager';
import TermDepositManager from '@/src/components/accounts/TermDepositManager';
import TopUpDepositManager from '@/src/components/accounts/TopUpDepositManager';
import TaxManager from '@/src/components/compliance/TaxManager';
import OverdraftManager from '@/src/components/accounts/OverdraftManager';
import RTGSManager from '@/src/components/remittance/RTGSManager';
import SWIFTManager from '@/src/components/remittance/SWIFTManager';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutInfo, setShowShortcutInfo] = useState(false);

  useEffect(() => {
    const handleNav = (e: any) => {
      const cust = e.detail;
      setSelectedCustomer({
        ...cust,
        joinDate: '12-MAY-2021',
        taxId: cust.id + 'P',
        email: cust.name.toLowerCase().replace(/ /g, '.') + '@finmail.net',
        address: '42 Central Plaza, West End, Sector-B, Metropolitan City, 400101',
        accounts: [
          { id: '1002394857', type: 'Savings Account', balance: '245,600.00', ccy: 'USD', status: 'ACTIVE' },
          { id: '2004958172', type: 'Current Account', balance: '12,045.50', ccy: 'USD', status: 'ACTIVE' },
          { id: 'TD-901827', type: 'Term Deposit', balance: '1,000,000.00', ccy: 'USD', status: 'VERIFY' },
        ]
      });
      setActiveMenuId('cust-detail');
    };

    window.addEventListener('nav-to-customer', handleNav);
    return () => window.removeEventListener('nav-to-customer', handleNav);
  }, []);

  // Handle Finacle Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Example: Press Escape to focus search
      if (e.key === 'Escape') {
        const searchInput = document.getElementById('finacle-search');
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={() => {
          setIsAuthenticated(true);
          setActiveMenuId('login-info');
        }} 
      />
    );
  }

  const handleShortcutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toUpperCase().trim();
    
    // Find menu item by shortcut
    let foundId = '';
    MENU_DATA.forEach(menu => {
      if (menu.shortcut === query) foundId = menu.id;
      menu.children?.forEach(child => {
        if (child.shortcut === query) foundId = child.id;
      });
    });

    if (foundId) {
      setActiveMenuId(foundId);
      setSearchQuery('');
    } else if (query === 'ROADMAP' || query === 'MAP') {
      setActiveMenuId('roadmap');
      setSearchQuery('');
    }
  };

  const renderContent = () => {
    switch (activeMenuId) {
      case 'dashboard':
        return <Dashboard />;
      case 'crm-360':
      case 'cust-detail':
        return <CustomerCRM />;
      case 'cif-retail-sqde':
        return <CIFCreation initialType="RETAIL" />;
      case 'cif-corporate':
        return <CIFCreation initialType="CORPORATE" />;
      case 'cust-search':
        return <CustomerSearch />;
      case 'prod-consumer':
      case 'prod-wealth':
      case 'prod-corporate':
      case 'prod-trade':
      case 'prod-islamic':
        return <ProductFactory />;
      case 'svc-limits':
        return <LimitsRegistry />;
      case 'acc-gl':
      case 'gl-txn-inquiry':
        return <GLTransactionInquiry />;
      case 'gl-code-maint':
        return <GLMaintenance mode="GL_CODE" />;
      case 'gl-subhead-maint':
        return <GLMaintenance mode="SUB_HEAD" />;
      case 'gl-replicate':
        return <GLMaintenance mode="REPLICATE" />;
      case 'gl-product-link':
        return <GLProductLinking />;
      case 'rem-payment-order':
        return <RemittanceMaintenance mode="PAYMENT_ORDER" />;
      case 'rem-inward':
        return <RemittanceMaintenance mode="INWARD" />;
      case 'rate-code-maint':
        return <RateMaintenance mode="RATE_CODE" />;
      case 'rate-seq-maint':
        return <RateMaintenance mode="RATE_SEQ" />;
      case 'country-curr-maint':
        return <RateMaintenance mode="COUNTRY_CURR" />;
      case 'home-rate-list':
        return <RateMaintenance mode="HOME_LIST" />;
      case 'rate-history-inq':
        return <RateMaintenance mode="HISTORY" />;
      case 'print-rate-list':
        return <RateMaintenance mode="HISTORY" />; // Reusing history for now as a placeholder for print list view
      case 'rate-concession':
        return <RateMaintenance mode="CONCESSION" />;
      case 'acc-mcy':
      case 'accounting':
        return <AccountingBackbone />;
      case 'txn-post':
        return <TransactionPosting />;
      case 'txn-cash-dep':
        return <TransactionPosting defaultType="CASH DEPOSIT" />;
      case 'txn-cash-wd':
        return <TransactionPosting defaultType="CASH PAYMENT" />;
      case 'txn-transfer':
        return <TransactionPosting defaultType="TRANSFER" />;
      case 'txn-verify':
        return <TransactionPosting mode="VERIFY" />;
      case 'txn-inquiry-id':
      case 'txn-inquiry-fin':
      case 'txn-inquiry':
        return <FinancialTransactionsInquiry />;
      case 'txn-reversal':
        return <TransactionReversal />;
      case 'txn-report':
      case 'txn-id-report':
        return <OfficeLedgerPrint />;
      case 'infrastructure':
      case 'inf-audit':
      case 'inf-access':
      case 'inf-workflow':
      case 'inf-scheduler':
        return <InfrastructureSystem />;
      case 'reusable-components':
        return <ReusableComponents />;
      case 'roadmap':
        return <Roadmap />;
      case 'txn-clearing':
        return <ClearingMaintenance />;
      case 'txn-memo':
        return <MemoPadLookup />;
      case 'cust-inquiry':
        return <CustomerDetailsInquiry />;
      case 'sig-inquiry':
        return <SignatureInquiry />;
      case 'txn-dsa':
        return <DSAInquiry />;
      case 'rep-office-ledger':
        return <OfficeLedgerPrint />;
      case 'txn-int-adj':
        return <InterestAdjustmentRegister />;
      case 'acc-closure':
        return <AccountClosureMaintenance />;
      case 'chq-issue':
      case 'acc-chq-issue':
        return <ChequeBookIssue />;
      case 'bal-cert':
        return <BalanceConfirmationCert />;
      case 'acc-chq':
        return <ChequeStatusInquiry />;
      case 'acc-mis-td':
        return <MISTDAccountOpening />;
      case 'acc-open-sb':
        return <AccountMaintenance initialType="OPEN" initialMode="ADD" />;
      case 'acc-lien':
        return <AccountMaintenance initialType="LIEN" initialMode="MODIFY" />;
      case 'acc-freeze':
        return <AccountMaintenance initialType="FREEZE" initialMode="MODIFY" />;
      case 'acc-modify':
        return <AccountMaintenance initialType="MODIFY" initialMode="MODIFY" />;
      case 'acc-charges':
        return <AccountMaintenance initialType="CHARGES" initialMode="ADD" />;
      case 'acc-interest':
      case 'int-acct-rate':
        return <InterestManager mode="ACCT_RATE" />;
      case 'int-table-maint':
        return <InterestManager mode="TABLE_MAINT" />;
      case 'int-slab-maint':
        return <InterestManager mode="SLAB_MAINT" />;
      case 'int-details-inq':
        return <InterestManager mode="DETAILS_INQ" />;
      case 'int-booking':
        return <InterestManager mode="BOOKING" />;
      case 'int-application':
        return <InterestManager mode="APPLICATION" />;
      case 'int-adj-maint':
        return <InterestManager mode="ADJ_MAINT" />;
      case 'int-calc-report':
        return <InterestManager mode="CALC_REPORT" />;
      case 'int-customer-report':
        return <InterestManager mode="CUST_REPORT" />;
      case 'int-change-advise':
        return <InterestManager mode="ADV_ADVISE" />;
      case 'td-opening':
        return <TermDepositManager mode="OPENING" />;
      case 'td-print-receipt':
        return <TermDepositManager mode="PRINT" />;
      case 'td-modification':
        return <TermDepositManager mode="MOD" />;
      case 'td-closure':
        return <TermDepositManager mode="CLOSURE" />;
      case 'td-renewal':
        return <TermDepositManager mode="RENEWAL" />;
      case 'td-acct-inquiry':
        return <TermDepositManager mode="ACCT_INQ" />;
      case 'td-cust-inquiry':
        return <TermDepositManager mode="CUST_INQ" />;
      case 'td-maturity-inquiry':
        return <TermDepositManager mode="MAT_INQ" />;
      case 'td-renewal-history':
        return <TermDepositManager mode="REN_HIST" />;
      case 'td-opening-closure-rpt':
        return <TermDepositManager mode="REPORT_OPEN_CLOSE" />;
      case 'td-general-rpt':
        return <TermDepositManager mode="REPORT_GEN" />;
      case 'td-maturity-dist-rpt':
        return <TermDepositManager mode="REPORT_MAT_DIST" />;
      case 'td-scheme-dist-rpt':
        return <TermDepositManager mode="REPORT_SCHEME_DIST" />;
      case 'td-rate-dist-rpt':
        return <TermDepositManager mode="REPORT_RATE_DIST" />;
      case 'tu-opening':
        return <TopUpDepositManager mode="OPENING" />;
      case 'tu-modification':
        return <TopUpDepositManager mode="MOD" />;
      case 'tu-verification':
        return <TopUpDepositManager mode="VERIFY" />;
      case 'tu-maint':
        return <TopUpDepositManager mode="MAINT" />;
      case 'tu-deposit-maint':
        return <TopUpDepositManager mode="TXN_MAINT" />;
      case 'tu-installment-inq':
        return <TopUpDepositManager mode="INST_INQ" />;
      case 'tu-acct-inquiry':
        return <TopUpDepositManager mode="ACCT_INQ" />;
      case 'tu-statement':
        return <TopUpDepositManager mode="STATEMENT" />;
      case 'od-opening':
        return <OverdraftManager mode="OPENING" />;
      case 'od-verification':
        return <OverdraftManager mode="VERIFY" />;
      case 'od-modification':
        return <OverdraftManager mode="MOD" />;
      case 'od-limit-maint':
        return <OverdraftManager mode="LIMIT" />;
      case 'tax-tds-refund':
        return <TaxManager mode="TDS_REFUND" />;
      case 'tax-withholding-remit':
        return <TaxManager mode="WHT_REMIT" />;
      case 'tax-remit-report':
        return <TaxManager mode="REMIT_REPORT" />;
      case 'tax-withholding-refund':
        return <TaxManager mode="WHT_REFUND" />;
      case 'tax-details-inq':
        return <TaxManager mode="DETAILS_INQ" />;
      case 'tax-projection':
        return <TaxManager mode="PROJECTION" />;
      case 'rtgs-msg-gen':
        return <RTGSManager mode="MSG_GEN" />;
      case 'rtgs-suspense':
        return <RTGSManager mode="SUSPENSE" />;
      case 'rtgs-inquiry':
        return <RTGSManager mode="INQUIRY" />;
      case 'rtgs-reports':
        return <RTGSManager mode="REPORTS" />;
      case 'swift-transfer':
        return <SWIFTManager mode="TRANSFER" />;
      case 'swift-inquiry':
        return <SWIFTManager mode="INQUIRY" />;
      case 'swift-modification':
        return <SWIFTManager mode="MOD" />;
      case 'swift-verification':
        return <SWIFTManager mode="VERIFY" />;
      case 'swift-generate':
        return <SWIFTManager mode="GENERATE" />;
      case 'swift-advice':
        return <SWIFTManager mode="ADVICE" />;
      case 'swift-inward-upload':
        return <SWIFTManager mode="INWARD_UPLOAD" />;
      case 'swift-outward-upload':
        return <SWIFTManager mode="OUTWARD_UPLOAD" />;
      case 'swift-reports':
        return <SWIFTManager mode="REPORTS" />;
      case 'acc-bal-inq':
        return <AccountMaintenance initialType="BAL_INQ" initialMode="INQUIRY" />;
      case 'acc-chq-inq':
        return <AccountMaintenance initialType="CHQ_INQ" initialMode="INQUIRY" />;
      case 'acc-joint-inq':
        return <AccountMaintenance initialType="JOINT_INQ" initialMode="INQUIRY" />;
      case 'acc-ledger-inq':
        return <AccountMaintenance initialType="LEDGER_INQ" initialMode="INQUIRY" />;
      case 'inv-auth':
        return <InventoryManagement initialOp="AUTH" />;
      case 'inv-move':
        return <InventoryManagement initialOp="MOVE" />;
      case 'inv-split':
        return <InventoryManagement initialOp="SPLIT" />;
      case 'inv-merge':
        return <InventoryManagement initialOp="MERGE" />;
      case 'inv-inq':
        return <InventoryManagement initialOp="INQUIRY" />;
      case 'inv-move-rep':
        return <InventoryManagement initialOp="MOVE_REP" />;
      case 'inv-status-rep':
        return <InventoryManagement initialOp="STATUS_REP" />;
      case 'login-info':
        return <LoginInfo onContinue={() => setActiveMenuId('dashboard')} />;
      case 'cust-detail':
        return selectedCustomer ? (
          <CustomerDetail 
            customer={selectedCustomer} 
            onBack={() => setActiveMenuId('cust-search')} 
          />
        ) : null;
      default:
        return (
          <div className="h-full flex items-center justify-center bg-slate-50/50">
            <div className="text-center p-12 bg-white rounded-xl border border-bank-border shadow-2xl max-w-lg">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-slate-400 font-bold text-2xl">?</span>
              </div>
              <h3 className="text-lg font-bold text-bank-text-primary mb-2 italic">Module Under Development</h3>
              <p className="text-sm text-bank-text-secondary leading-relaxed mb-6">
                The requested menu module <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-bank-accent">[{activeMenuId.toUpperCase()}]</code> is currently isolated for core maintenance during this development sprint. 
              </p>
              <button 
                onClick={() => setActiveMenuId('dashboard')}
                className="px-6 py-2 bg-bank-sidebar text-white text-xs font-bold rounded shadow-lg hover:bg-bank-active transition-all uppercase tracking-widest"
              >
                Return to Operational Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      id="app-container"
      className="flex flex-col h-screen w-screen overflow-hidden bg-[#efefef] font-sans selection:bg-blue-100 selection:text-blue-900"
    >
      <header className="h-14 bg-[#f8f9fa] border-b border-[#80a4c1] flex items-center px-6 gap-6 shadow-sm z-30 shrink-0">
        <div className="flex items-center gap-2 mr-8">
           <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-600/20">F</div>
           <span className="text-sm font-black tracking-tighter text-slate-800 uppercase italic">Finacle <span className="text-blue-600">Core</span></span>
        </div>

        <form onSubmit={handleShortcutSubmit} className="flex-1 max-w-sm relative group">
          <input 
            id="finacle-search"
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Menu Shortcut (e.g. TM, CUS, MAP)"
            className="w-full bg-white border border-[#b8c5d0] rounded px-3 py-1.5 text-xs font-mono font-bold uppercase text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 uppercase pointer-events-none group-focus-within:opacity-0 transition-opacity">
            ESC TO FOCUS
          </div>
        </form>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Security Sol</span>
             <span className="text-[10px] font-black text-emerald-600 uppercase italic">001 // SECURE</span>
          </div>
          <div className="h-8 w-px bg-slate-300 mx-1"></div>
          <button 
            onClick={() => setActiveMenuId('roadmap')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-[10px] font-black uppercase transition-all shadow-sm ${activeMenuId === 'roadmap' ? 'bg-blue-600 text-white shadow-blue-500/50' : 'bg-white border border-[#b8c5d0] text-slate-600 hover:bg-slate-50'}`}
          >
            <Activity size={14} />
            System Roadmap
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeId={activeMenuId} 
          onSelect={setActiveMenuId} 
        />

        <main className="flex-1 overflow-hidden relative flex flex-col bg-white border-l border-[#80a4c1] shadow-[inset_1px_0_4px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none"></div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenuId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold tracking-tight shrink-0 gap-8 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
            <span>SOL: 001 | CT_ADMIN</span>
            <span className="border-l border-slate-400/30 pl-4">IP: 10.224.1.42</span>
            <span className="border-l border-slate-400/30 pl-4 uppercase">SERVER: FIN-CORE-PRD-01</span>
            <span className="ml-auto text-blue-900 uppercase tracking-widest bg-white/30 px-2 rounded-sm border border-white/50">
              F1: Help | F3: Back | F4: View | F10: Commit
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
