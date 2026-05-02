import React, { useState } from 'react';
import { 
  Percent, 
  HelpCircle, 
  X, 
  Search, 
  RefreshCcw, 
  ShieldCheck, 
  Save, 
  Printer, 
  Database,
  History,
  Lock,
  ChevronRight,
  Info,
  Calendar,
  Table as TableIcon,
  Layers,
  FileText,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

type InterestMode = 
  | 'TABLE_MAINT' 
  | 'SLAB_MAINT' 
  | 'ACCT_RATE' 
  | 'DETAILS_INQ' 
  | 'BOOKING' 
  | 'APPLICATION' 
  | 'ADJ_MAINT' 
  | 'CALC_REPORT' 
  | 'CUST_REPORT' 
  | 'ADV_ADVISE';

interface InterestManagerProps {
  mode: InterestMode;
}

export default function InterestManager({ mode }: InterestManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'TABLE_MAINT': return 'Interest Table Code Maintenance [HICTM]';
      case 'SLAB_MAINT': return 'Base Interest Version Slab Maintenance [HBIVSM]';
      case 'ACCT_RATE': return 'Account Interest Rate Maintenance [HINTTM]';
      case 'DETAILS_INQ': return 'Interest Details Inquiry [HAITINQ]';
      case 'BOOKING': return 'Interest Booking Operations [HACBOOK]';
      case 'APPLICATION': return 'Interest Application Processing [HACINT]';
      case 'ADJ_MAINT': return 'Interest Adjustment Maintenance [HIARM]';
      case 'CALC_REPORT': return 'Interest Calculation Report [HAINTRPT]';
      case 'CUST_REPORT': return 'Customer Interest Summary Report [HCUIR]';
      case 'ADV_ADVISE': return 'Interest Change Advice Generation [HINTADV]';
      default: return 'Interest Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 1000);
  };

  const renderMaintenanceFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl">
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Entity / Account ID</label>
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. 50010928" className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500 font-mono shadow-inner" />
          <button className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
            <Search size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Interest Table Code</label>
        <input type="text" placeholder="e.g. SAV_IND_PRM" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500 font-mono uppercase" />
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Effective Date</label>
        <div className="relative">
          <input type="date" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500" />
        </div>
      </div>
    </div>
  );

  const renderOperationsFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl">
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Process Period</label>
        <div className="flex items-center gap-4">
          <input type="month" className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500" />
          <span className="text-[10px] font-black text-slate-300">TO</span>
          <input type="month" className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Execution Mode</label>
        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500 appearance-none">
          <option>SIMULATION - NO ACCOUNT IMPACT</option>
          <option>PRODUCTION - LEDGER POSTING</option>
          <option>ADJUSTMENT - DELTA CALCULATION</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans italic selection:bg-indigo-100">
      {/* Header Banner */}
      <div className="bg-[#1e1b4b] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-indigo-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-300 border border-white/10 backdrop-blur-md">
              <Percent size={24} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.2em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Interest accrual, application & compliance engine</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Core Engine v24.11</span>
              <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-tighter">Status: Synchronized</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Function Chooser */}
        <div className="flex gap-4 p-2 bg-slate-200/50 rounded-2xl w-max">
           <button className="px-6 py-2 bg-white rounded-xl text-[10px] font-black text-indigo-900 uppercase tracking-widest shadow-sm">Maker Mode</button>
           <button className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-900 transition-colors">Checker (Authorise)</button>
        </div>

        {/* Dynamic Entry Form */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           {['TABLE_MAINT', 'SLAB_MAINT', 'ACCT_RATE', 'ADJ_MAINT'].includes(mode) ? renderMaintenanceFields() : renderOperationsFields()}
        </div>

        {/* Execution Block */}
        <div className="bg-slate-950 rounded-[2.5rem] p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden group">
           <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
           <div className="relative space-y-3 text-center lg:text-left">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Orchestrate Interest Life-cycle</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest max-w-xl leading-relaxed">
                 By committing this process, you are triggering the high-performance accrual engine. Ensure all previous slab modifications are verified.
              </p>
           </div>
           <button 
             onClick={handleAction}
             disabled={isProcessing}
             className={`relative z-10 px-16 py-6 bg-white text-[#1e1b4b] rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center gap-4 ${isProcessing ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
           >
              {isProcessing ? <RefreshCcw size={20} className="animate-spin" /> : <ShieldCheck size={20} className="text-indigo-600" />}
              {isProcessing ? 'Processing Calcs...' : 'Commit Instruction'}
           </button>
        </div>

        {/* Results / Audit Area */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="lg:col-span-2 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden self-start">
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Process Audit Trace</span>
                   <Printer size={16} className="text-slate-300" />
                </div>
                <div className="p-8 space-y-4">
                   {[
                     { msg: 'Auth token validated (maker_id: 991823)', status: 'OK' },
                     { msg: 'Retrieved account ledger snapshots for period', status: 'OK' },
                     { msg: 'Computed accrual differential: 1,442.20 USD', status: 'OK' },
                     { msg: 'Pending authorization for production commit', status: 'WAIT' },
                   ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                         <span className="text-[10px] font-black text-slate-600 uppercase font-mono">{log.msg}</span>
                         <span className={`text-[9px] font-black px-3 py-1 rounded-full ${log.status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {log.status}
                         </span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="space-y-8">
                <div className="bg-indigo-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] group-hover:scale-110 transition-transform"></div>
                   <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Simulation Summary</h4>
                   <div className="space-y-4">
                      <div>
                         <span className="text-[9px] font-bold text-indigo-300 uppercase block mb-1">Total Impacted A/Cs</span>
                         <span className="text-3xl font-black italic tracking-tighter">4,281</span>
                      </div>
                      <div>
                         <span className="text-[9px] font-bold text-indigo-300 uppercase block mb-1">Projected Accrual</span>
                         <span className="text-2xl font-black italic tracking-tighter text-emerald-400">$2.44M</span>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-xl flex gap-5 items-start">
                   <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                   <div className="space-y-2">
                      <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Regulation Guard</h5>
                      <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                         Rate changes exceeding 200bps volatility trigger automated central bank reporting [FORM_R4].
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-auto h-10 bg-white border-t border-slate-200 px-10 flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
         <div className="flex gap-12">
            <span>Branch: 5001</span>
            <span>Cluster: ASIA_NORTH</span>
            <span>Accrual Cycle: MONTHLY_Q1</span>
         </div>
         <div className="flex items-center gap-4">
            <Lock size={12} className="text-emerald-500" />
            <span>Encrypted Session: AES_256_GCM</span>
         </div>
      </div>
    </div>
  );
}
