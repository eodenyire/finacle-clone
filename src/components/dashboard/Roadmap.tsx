import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Settings, 
  Shield, 
  BookOpen, 
  Users, 
  ArrowRightLeft,
  Activity,
  Layers
} from 'lucide-react';

interface ModuleStatus {
  category: string;
  items: {
    id: string;
    label: string;
    status: 'DONE' | 'WIP' | 'TODO';
    shortcut?: string;
  }[];
}

const ROADMAP_DATA: ModuleStatus[] = [
  {
    category: 'Enterprise CRM',
    items: [
      { id: '1', label: 'Origination & Sales', status: 'DONE' },
      { id: '2', label: 'Marketing Campaigns', status: 'DONE' },
      { id: '3', label: '360 Degree View', status: 'DONE', shortcut: 'CUS' },
      { id: '4', label: 'Customer Information File', status: 'DONE', shortcut: 'ICD' },
    ]
  },
  {
    category: 'Product Factory',
    items: [
      { id: '5', label: 'Consumer Banking', status: 'DONE' },
      { id: '6', label: 'Wealth Management', status: 'DONE' },
      { id: '7', label: 'Corporate Banking', status: 'DONE' },
      { id: '8', label: 'Trade Finance', status: 'DONE' },
      { id: '9', label: 'Islamic Banking', status: 'DONE' },
    ]
  },
  {
    category: 'Functional Services',
    items: [
      { id: '10', label: 'Standing Orders', status: 'TODO' },
      { id: '11', label: 'Sweeps / Pooling', status: 'WIP' },
      { id: '12', label: 'Limits & Collaterals', status: 'DONE', shortcut: 'HLMT' },
      { id: '13', label: 'Clearing & Settlement', status: 'DONE', shortcut: 'ICTM' },
    ]
  },
  {
    category: 'Accounting & Transactions',
    items: [
      { id: '14', label: 'General Ledger', status: 'DONE', shortcut: 'HGL' },
      { id: '15', label: 'Multi-Currency', status: 'DONE', shortcut: 'HMCY' },
      { id: '16', label: 'Transaction Manager (HTM)', status: 'DONE', shortcut: 'HTM' },
      { id: '21', label: 'Cash Deposit (HCASHDEP)', status: 'DONE', shortcut: 'HCASHDEP' },
      { id: '22', label: 'Cash Payment (HCASHWD)', status: 'DONE', shortcut: 'HCASHWD' },
      { id: '23', label: 'Transfer (HXFER)', status: 'DONE', shortcut: 'HXFER' },
      { id: '24', label: 'Reversal (HCRT)', status: 'DONE', shortcut: 'HCRT' },
      { id: '25', label: 'Txn Inquiry (HTI/HFTI)', status: 'DONE', shortcut: 'HFTI' },
    ]
  },
  {
    category: 'Infrastructure',
    items: [
      { id: '17', label: 'Audit & Reporting', status: 'DONE' },
      { id: '18', label: 'Access Control', status: 'DONE' },
      { id: '19', label: 'Workflows (BPEL)', status: 'DONE' },
      { id: '20', label: 'Job Scheduler', status: 'WIP' },
    ]
  }
];

export default function Roadmap() {
  return (
    <div className="flex flex-col h-full bg-[#f4f7fa] p-10 overflow-y-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic mb-2">Development Roadmap</h1>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Module Implementation Status // Architectural Compliance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROADMAP_DATA.map((mod, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
               <h3 className="text-xs font-black uppercase tracking-widest italic">{mod.category}</h3>
               <Layers size={14} className="text-blue-400" />
            </div>
            <div className="flex-1 p-6 space-y-4">
               {mod.items.map((item) => (
                 <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                       {item.status === 'DONE' ? (
                         <CheckCircle2 size={16} className="text-emerald-500" />
                       ) : item.status === 'WIP' ? (
                         <Clock size={16} className="text-blue-500 animate-pulse" />
                       ) : (
                         <Circle size={16} className="text-slate-200" />
                       )}
                       <div>
                          <span className={`text-xs font-bold ${item.status === 'TODO' ? 'text-slate-400' : 'text-slate-700'}`}>
                            {item.label}
                          </span>
                          {item.shortcut && (
                            <span className="ml-2 text-[8px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase font-mono">
                               {item.shortcut}
                            </span>
                          )}
                       </div>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      item.status === 'DONE' ? 'bg-emerald-50 text-emerald-600' : 
                      item.status === 'WIP' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        ))}
        
        {/* Summary Card */}
        <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16"></div>
           <div>
              <Activity className="mb-4 text-blue-100" size={32} />
              <h4 className="text-xl font-black italic tracking-tighter mb-2">Completion Metrics</h4>
              <p className="text-[11px] text-blue-100 opacity-80 leading-relaxed font-medium italic">
                Overall system architectural compliance: 82%. Core banking backbone is fully functional.
              </p>
           </div>
           
           <div className="mt-8 space-y-4">
              <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                 />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-center">82% SYSTEM READY</p>
           </div>
        </div>
      </div>
    </div>
  );
}
