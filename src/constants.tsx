import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowRightLeft, 
  Settings, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
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
      { id: 'crm-origination', label: 'Origination & Sales', shortcut: 'CORS' },
      { id: 'crm-marketing', label: 'Marketing Campaigns', shortcut: 'MKT' },
      { id: 'crm-service', label: 'Service Requests', shortcut: 'SR' },
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
      { id: 'acc-gl', label: 'General Ledger', shortcut: 'HGL' },
      { id: 'acc-mcy', label: 'Multi-Currency Ops', shortcut: 'HMCY' },
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
      { id: 'res-sig', label: 'Signature Verification' }
    ]
  }
];
