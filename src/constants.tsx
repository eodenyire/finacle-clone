import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowRightLeft, 
  Settings, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Database,
  ArrowUpRight,
  Globe,
  TrendingDown,
  Search,
  ChevronDown,
  LayoutDashboard,
  Package
} from 'lucide-react';
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  path?: string;
  shortcut?: string;
}

export const MENU_DATA: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Branch Dashboard',
    icon: <LayoutDashboard size={18} />,
    path: '/'
  },
  {
    id: 'crm',
    label: 'Enterprise CRM',
    icon: <Users size={18} />,
    children: [
      { id: 'cust-search', label: 'Entity Search', shortcut: 'CUS' },
      { id: 'cif-retail-sqde', label: 'CIF Retail > New Entity > Customer SQDE', shortcut: 'SQDE' },
      { id: 'cif-corporate', label: 'Corporate CIF', shortcut: 'CCIF' },
      { id: 'crm-origination', label: 'Origination & Sales', shortcut: 'CORS' },
      { id: 'crm-marketing', label: 'Marketing Campaigns', shortcut: 'MKT' },
      { id: 'crm-service', label: 'Service Requests', shortcut: 'SR' },
      { id: 'chq-issue', label: 'Cheque Book Issue', shortcut: 'HICHBA' },
      { id: 'bal-cert', label: 'Balance Confirmation Cert', shortcut: 'HGCHRG' },
      { id: 'crm-360', label: 'Customer 360 View', shortcut: 'C360' }
    ]
  },
  {
    id: 'product-factory',
    label: 'Product Factory',
    icon: <BarChart3 size={18} />,
    children: [
      { id: 'prod-consumer', label: 'Consumer Banking', shortcut: 'PCONS' },
      { id: 'prod-wealth', label: 'Wealth Management', shortcut: 'PWLTH' },
      { id: 'prod-corporate', label: 'Corporate Banking', shortcut: 'PCORP' },
      { id: 'prod-trade', label: 'Trade Finance', shortcut: 'PTRAD' },
      { id: 'prod-islamic', label: 'Islamic Banking', shortcut: 'PISLM' }
    ]
  },
  {
    id: 'func-services',
    label: 'Functional Services',
    icon: <Settings size={18} />,
    children: [
      { id: 'svc-standing', label: 'Standing Orders', shortcut: 'HSO' },
      { id: 'svc-sweeps', label: 'Sweeps & Pooling', shortcut: 'HSW' },
      { id: 'svc-payments', label: 'Payment Systems', shortcut: 'HPAY' },
      { id: 'svc-limits', label: 'Limits & Collaterals', shortcut: 'HLMT' },
      { id: 'svc-clearing', label: 'Inward Clearing', shortcut: 'ICTM' }
    ]
  },
  {
    id: 'accounting',
    label: 'Accounting Backbone',
    icon: <ArrowRightLeft size={18} />,
    children: [
      { id: 'acc-gl', label: 'General Ledger Inquiry', shortcut: 'HGL' },
      { id: 'gl-code-maint', label: 'Reference Code Maintenance', shortcut: 'HRRCDM' },
      { id: 'gl-subhead-maint', label: 'Create GL Sub Head', shortcut: 'HGLSHM' },
      { id: 'gl-replicate', label: 'Replicate GL Sub Head', shortcut: 'HGLSHR' },
      { id: 'gl-product-link', label: 'Link GL to Product', shortcut: 'HGSPM' },
      { id: 'gl-txn-inquiry', label: 'GL Transaction Inquiry', shortcut: 'HIOGLT' },
      { id: 'acc-mcy', label: 'Multi-Currency Ops', shortcut: 'HMCY' },
      { id: 'rate-code-maint', label: 'Rate Code Maintenance', shortcut: 'HMNTRTM' },
      { id: 'rate-seq-maint', label: 'Rate Code Sequence Maint', shortcut: 'HMNTRTSQ' },
      { id: 'country-curr-maint', label: 'Country Currency Maintenance', shortcut: 'HCNCM' },
      { id: 'home-rate-list', label: 'Home Currency Rate List', shortcut: 'HMNTRTLH' },
      { id: 'rate-history-inq', label: 'Rate History Inquiry', shortcut: 'HRTHQRY' },
      { id: 'print-rate-list', label: 'Print Rate List', shortcut: 'HPRRTL' },
      { id: 'rate-concession', label: 'Rate Concession Maintenance', shortcut: 'HCLERPM' },
      { id: 'txn-post', label: 'Transaction Manager', shortcut: 'HTM' },
      { id: 'txn-cash-dep', label: 'Cash Deposit', shortcut: 'HCASHDEP' },
      { id: 'txn-cash-wd', label: 'Cash Payment', shortcut: 'HCASHWD' },
      { id: 'txn-transfer', label: 'Transfer Transaction', shortcut: 'HXFER' },
      { id: 'txn-reversal', label: 'Transaction Reversal', shortcut: 'HCRT' },
      { id: 'txn-inquiry-id', label: 'Inquiry a Transaction', shortcut: 'HTI' },
      { id: 'txn-inquiry-fin', label: 'Financial Txn Inquiry', shortcut: 'HFTI' },
      { id: 'txn-report', label: 'Transaction Report', shortcut: 'HFTR' },
      { id: 'txn-id-report', label: 'Txn ID Report', shortcut: 'GTID' },
      { id: 'txn-verify', label: 'Verify/Authorize', shortcut: 'TV' }
    ]
  },
  {
    id: 'customer-accounts',
    label: 'Customer Accounts',
    icon: <CreditCard size={18} />,
    children: [
      { id: 'acc-open-sb', label: 'Open Savings Account', shortcut: 'HOAACSB' },
      { id: 'acc-lien', label: 'Lien Maintenance', shortcut: 'HALM' },
      { id: 'acc-chq-issue', label: 'Issue Cheque Book', shortcut: 'HICHB' },
      { id: 'acc-freeze', label: 'Freeze Account', shortcut: 'HAFSM' },
      { id: 'acc-modify', label: 'Modify Account', shortcut: 'HACM' },
      { id: 'acc-charges', label: 'Collect/Reverse Charges', shortcut: 'HGCHRG' },
      { id: 'acc-interest', label: 'Change Interest Rate', shortcut: 'HINTTM' },
      { id: 'acc-bal-inq', label: 'Account Balance Inquiry', shortcut: 'HACCBALI' },
      { id: 'acc-chq-inq', label: 'Cheque Book Inquiry', shortcut: 'HCHBI' },
      { id: 'acc-joint-inq', label: 'Joint Holder Inquiry', shortcut: 'HJHOLDER' },
      { id: 'acc-ledger-inq', label: 'Account Ledger Inquiry', shortcut: 'HACLI' }
    ]
  },
  {
    id: 'interest-mgt',
    label: 'Interest & Profit Management',
    icon: <BarChart3 size={18} />,
    children: [
      { id: 'int-table-maint', label: 'Interest Table Maintenance', shortcut: 'HICTM' },
      { id: 'int-slab-maint', label: 'Base Interest Slab Maint', shortcut: 'HBIVSM' },
      { id: 'int-acct-rate', label: 'Account Interest Rate Maint', shortcut: 'HINTTM' },
      { id: 'int-details-inq', label: 'Interest Details Inquiry', shortcut: 'HAITINQ' },
      { id: 'int-booking', label: 'Interest Booking', shortcut: 'HACBOOK' },
      { id: 'int-application', label: 'Interest Application', shortcut: 'HACINT' },
      { id: 'int-adj-maint', label: 'Interest Adjustment Maint', shortcut: 'HIARM' },
      { id: 'int-calc-report', label: 'Interest Calculation Report', shortcut: 'HAINTRPT' },
      { id: 'int-customer-report', label: 'Customer Interest Report', shortcut: 'HCUIR' },
      { id: 'int-change-advise', label: 'Interest Change Advise', shortcut: 'HINTADV' }
    ]
  },
  {
    id: 'term-deposits',
    label: 'Term Deposit Management',
    icon: <Database size={18} />,
    children: [
      { id: 'td-opening', label: 'Term Deposit Account Opening', shortcut: 'HOAACTD' },
      { id: 'td-print-receipt', label: 'Print TD Receipt', shortcut: 'HDRP' },
      { id: 'td-modification', label: 'Term Deposit Modification', shortcut: 'HACMTD' },
      { id: 'td-closure', label: 'Term Deposit Closure', shortcut: 'HCAACTD' },
      { id: 'td-renewal', label: 'Term Deposit Renewal', shortcut: 'HDTREN' },
      { id: 'td-acct-inquiry', label: 'TD Account Inquiry', shortcut: 'HACTID' },
      { id: 'td-cust-inquiry', label: 'Customer TD Inquiry', shortcut: 'HCUTD' },
      { id: 'td-maturity-inquiry', label: 'TD Maturity Inquiry', shortcut: 'HCUTDMAT' },
      { id: 'td-renewal-history', label: 'TD Renewal History', shortcut: 'HRELACI' },
      { id: 'td-opening-closure-rpt', label: 'FD Opening/Closure Report', shortcut: 'HFDOCD' },
      { id: 'td-general-rpt', label: 'General Deposit Details Rpt', shortcut: 'HGDET' },
      { id: 'td-maturity-dist-rpt', label: 'Maturity Distribution Rpt', shortcut: 'HMDD' },
      { id: 'td-scheme-dist-rpt', label: 'Scheme Distribution Rpt', shortcut: 'HSDD' },
      { id: 'td-rate-dist-rpt', label: 'Rate Distribution Rpt', shortcut: 'HRDD' }
    ]
  },
  {
    id: 'top-up-deposits',
    label: 'Top Up Deposit Management',
    icon: <ArrowUpRight size={18} />,
    children: [
      { id: 'tu-opening', label: 'Top Up Account Opening', shortcut: 'HOAACTU' },
      { id: 'tu-modification', label: 'Pre-Verify Modification', shortcut: 'HOAACMTU' },
      { id: 'tu-verification', label: 'Account Verification', shortcut: 'HOAACVTU' },
      { id: 'tu-maint', label: 'Maintenance (Renewal/Closure)', shortcut: 'HACMFTU' },
      { id: 'tu-deposit-maint', label: 'Top Up / Adhoc Deposit', shortcut: 'HTUTM' },
      { id: 'tu-installment-inq', label: 'Installment Inquiry', shortcut: 'HTUINST' },
      { id: 'tu-acct-inquiry', label: 'Top Up Account Inquiry', shortcut: 'HACITD' },
      { id: 'tu-statement', label: 'Generate A/C Statement', shortcut: 'HPSP' }
    ]
  },
  {
    id: 'overdraft-mgt',
    label: 'Overdraft Management',
    icon: <TrendingDown size={18} />,
    children: [
      { id: 'od-opening', label: 'Overdraft Account Opening', shortcut: 'HOAACOD' },
      { id: 'od-verification', label: 'Account Verification', shortcut: 'HOAACVOD' },
      { id: 'od-modification', label: 'Account Modification', shortcut: 'HACM' },
      { id: 'od-limit-maint', label: 'Sanction Limit Maint', shortcut: 'HACLHM' }
    ]
  },
  {
    id: 'swift-mgt',
    label: 'SWIFT Payment Systems',
    icon: <Globe size={18} />,
    children: [
      { id: 'swift-transfer', label: 'SWIFT Payment Transfer', shortcut: 'HPORDM' },
      { id: 'swift-inquiry', label: 'Message Inquiry', shortcut: 'HSMI' },
      { id: 'swift-modification', label: 'Modify SWIFT Messages', shortcut: 'HSMM' },
      { id: 'swift-verification', label: 'Verify SWIFT Messages', shortcut: 'HSMV' },
      { id: 'swift-generate', label: 'Generate SWIFT Messages', shortcut: 'HSMG' },
      { id: 'swift-advice', label: 'Generate SWIFT Advice', shortcut: 'HSAG' },
      { id: 'swift-inward-upload', label: 'Inward Message Upload', shortcut: 'HUPLPMSG' },
      { id: 'swift-outward-upload', label: 'Outward Message Upload', shortcut: 'HPSTTUM' },
      { id: 'swift-reports', label: 'Monitoring Reports', shortcut: 'HPOMR' }
    ]
  },
  {
    id: 'rtgs-mgt',
    label: 'RTGS Payment Systems',
    icon: <ArrowRightLeft size={18} />,
    children: [
      { id: 'rtgs-msg-gen', label: 'Generate RTGS Messages', shortcut: 'HPORDM' },
      { id: 'rtgs-suspense', label: 'Inward Suspense Processing', shortcut: 'HRISP' },
      { id: 'rtgs-inquiry', label: 'Message Inquiry (In/Out)', shortcut: 'HSMI' },
      { id: 'rtgs-reports', label: 'RTGS Payment Reports', shortcut: 'HPOMR' }
    ]
  },
  {
    id: 'compliance-mgt',
    label: 'Tax & Compliance',
    icon: <ShieldCheck size={18} />,
    children: [
      { id: 'tax-tds-refund', label: 'TDS Refund Maintenance', shortcut: 'HRFTDS' },
      { id: 'tax-withholding-remit', label: 'Remit Withholding Tax', shortcut: 'RMWTAX' },
      { id: 'tax-remit-report', label: 'TDS Remittance Report', shortcut: 'HRMTDS' },
      { id: 'tax-withholding-refund', label: 'Refund Withholding Tax', shortcut: 'RFWTAX' },
      { id: 'tax-details-inq', label: 'Inquire & Print Tax Details', shortcut: 'HTDSIP' },
      { id: 'tax-projection', label: 'Tax Projection Inquiry', shortcut: 'HTDSPROJ' }
    ]
  },
  {
    id: 'inventory-mgt',
    label: 'Inventory Management',
    icon: <Package size={18} />,
    children: [
      { id: 'inv-auth', label: 'Authoriser Management', shortcut: 'HIMAUM' },
      { id: 'inv-move', label: 'Movement between Locations', shortcut: 'HIMC' },
      { id: 'inv-split', label: 'Split and Inquiry', shortcut: 'HISAI' },
      { id: 'inv-merge', label: 'Merge Option', shortcut: 'HIMAI' },
      { id: 'inv-inq', label: 'Inventory Inquiry', shortcut: 'HIIA' },
      { id: 'inv-move-rep', label: 'Movement Report', shortcut: 'HIMR' },
      { id: 'inv-status-rep', label: 'Status Report', shortcut: 'HISR' }
    ]
  },
  {
    id: 'remittance',
    label: 'Remittance & Payments',
    icon: <ArrowRightLeft size={18} />,
    children: [
      { id: 'rem-payment-order', label: 'Payment Order Maintenance', shortcut: 'HPORDM' },
      { id: 'rem-inward', label: 'Inward Remittance Maintenance', shortcut: 'HIRM' }
    ]
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: <ShieldCheck size={18} />,
    children: [
      { id: 'inf-audit', label: 'Audit Log & Reporting' },
      { id: 'inf-access', label: 'Access Control' },
      { id: 'inf-workflow', label: 'Workflows (BPEL)' },
      { id: 'inf-scheduler', label: 'Job Scheduler' }
    ]
  },
  {
    id: 'reusable-components',
    label: 'Business Logic Library',
    icon: <BarChart3 size={18} />,
    children: [
      { id: 'res-interest', label: 'Interest & Tax Engine' },
      { id: 'res-rates', label: 'Exchange Rates Master' },
      { id: 'res-fees', label: 'Fees & Charges' },
      { id: 'sig-inquiry', label: 'Signature Verification (SVS)', shortcut: 'SVS' }
    ]
  }
];
