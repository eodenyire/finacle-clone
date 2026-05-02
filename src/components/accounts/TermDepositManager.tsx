import React, { useState } from 'react';
import { 
  Database, 
  HelpCircle, 
  X, 
  Search, 
  RefreshCcw, 
  ShieldCheck, 
  Save, 
  Printer, 
  ChevronRight, 
  Info,
  Calendar,
  FileText,
  CreditCard,
  User,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  BarChart,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type TDMode = 
  | 'OPENING' 
  | 'PRINT' 
  | 'MOD' 
  | 'CLOSURE' 
  | 'RENEWAL' 
  | 'ACCT_INQ' 
  | 'CUST_INQ' 
  | 'MAT_INQ' 
  | 'REN_HIST' 
  | 'REPORT_OPEN_CLOSE'
  | 'REPORT_GEN'
  | 'REPORT_MAT_DIST'
  | 'REPORT_SCHEME_DIST'
  | 'REPORT_RATE_DIST';

interface TermDepositManagerProps {
  mode: TDMode;
}

export default function TermDepositManager({ mode }: TermDepositManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'OPENING': return 'Term Deposit Account Opening [HOAACTD]';
      case 'PRINT': return 'Print Term Deposit Receipt [HDRP]';
      case 'MOD': return 'Term Deposit Modification [HACMTD]';
      case 'CLOSURE': return 'Term Deposit Closure [HCAACTD]';
      case 'RENEWAL': return 'Term Deposit Renewal [HDTREN]';
      case 'ACCT_INQ': return 'Term Deposit Account Inquiry [HACTID]';
      case 'CUST_INQ': return 'Customer Term Deposit Inquiry [HCUTD]';
      case 'MAT_INQ': return 'TD Maturity Inquiry [HCUTDMAT]';
      case 'REN_HIST': return 'TD Renewal History Inquiry [HRELACI]';
      case 'REPORT_OPEN_CLOSE': return 'FD Opening/Closure Details Report [HFDOCD]';
      case 'REPORT_GEN': return 'General Deposit Details Report [HGDET]';
      case 'REPORT_MAT_DIST': return 'Maturity Wise Distribution Report [HMDD]';
      case 'REPORT_SCHEME_DIST': return 'Scheme Wise Distribution Report [HSDD]';
      case 'REPORT_RATE_DIST': return 'Rate Wise Distribution Report [HRDD]';
      default: return 'Term Deposit Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 1200);
  };

  const isReportMode = mode.startsWith('REPORT');

  return (
    <div className="flex flex-col h-full bg-[#fcfdfe] font-sans selection:bg-rose-100 italic">
      {/* Header Banner */}
      <div className="bg-[#450a0a] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-rose-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-rose-300 border border-white/10 backdrop-blur-md">
              {isReportMode ? <PieChart size={24} /> : <Database size={24} />}
           </div>
           <div>
              <h1 className="text-lg font-black text-rose-50 uppercase tracking-[0.15em] leading-tight shadow-sm">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1 italic opacity-80">Orchestrating long-term liquidity instruments</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="hidden md:flex flex-col items-end border-r border-rose-800 pr-6 mr-6">
              <span className="text-[10px] font-black text-rose-200 uppercase tracking-widest italic">SOL: 5001 - MAIN</span>
              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Vault Sync: Active</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-rose-600 rounded-xl flex items-center justify-center text-white transition-all shadow-xl hover:scale-110 active:scale-95">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Input Parameters Card */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl shadow-rose-900/5 p-10 lg:p-14 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] opacity-40"></div>
           
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 {/* Function Select */}
                 {!isReportMode && (
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Function</label>
                      <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-700 outline-none focus:border-rose-500 appearance-none shadow-sm cursor-pointer">
                         <option>O - OPEN / ADD</option>
                         <option>M - MODIFY</option>
                         <option>V - VERIFY</option>
                         <option>I - INQUIRE</option>
                         <option>C - CLOSE</option>
                         <option>R - RENEW</option>
                      </select>
                   </div>
                 )}

                 {/* Account ID / CIF / Receipt No */}
                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">
                       {mode === 'CUST_INQ' ? 'Customer ID (CIF)' : 'Account / Receipt / Instrument ID'}
                    </label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. 50010992771" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-rose-500 font-mono shadow-inner italic" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[64px] px-8 bg-rose-900 text-white rounded-[1.5rem] flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-rose-800 transition-all hover:shadow-xl active:scale-95"
                       >
                          {isProcessing ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} />}
                          {isProcessing ? 'Simulating...' : isReportMode ? 'Generate' : 'Fetch'}
                       </button>
                    </div>
                 </div>

                 {/* Mode-Specific Fields */}
                 {mode === 'OPENING' && (
                   <>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Scheme Code</label>
                        <select className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-800 outline-none">
                           <option>TD001 - REGULAR TD</option>
                           <option>TD005 - TAX SAVER</option>
                           <option>TD010 - SENIOR CITIZEN</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Deposit Amount</label>
                        <div className="relative">
                           <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">USD</span>
                           <input type="text" placeholder="5,000.00" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-20 pr-8 py-5 text-sm font-black text-rose-600 font-mono outline-none focus:border-rose-500 shadow-inner italic" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Tenure (Months)</label>
                        <input type="number" defaultValue={12} className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 font-mono outline-none focus:border-rose-500 shadow-inner italic" />
                     </div>
                   </>
                 )}

                 {isReportMode && (
                   <>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">From Date</label>
                        <input type="date" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-800 outline-none shadow-sm italic" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">To Date</label>
                        <input type="date" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-800 outline-none shadow-sm italic" />
                     </div>
                   </>
                 )}
              </div>
           </div>
        </div>

        {/* Results Area */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
             
             {/* Snapshot Card */}
             <div className="lg:col-span-2 bg-[#1e1b4b] rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-rose-500 opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start gap-10">
                   <div className="space-y-8">
                      <div>
                         <h2 className="text-4xl font-black italic tracking-tighter mb-2">USD 12,450.00</h2>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400">Current Maturity Value</p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                         <div>
                            <span className="text-[9px] font-bold text-rose-300 uppercase block mb-1">Interest Rate</span>
                            <span className="text-xl font-black italic">6.25% P.A.</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-bold text-rose-300 uppercase block mb-1">Maturity Date</span>
                            <span className="text-xl font-black italic uppercase">12-SEP-2027</span>
                         </div>
                      </div>
                      <div className="pt-8 border-t border-white/10 flex gap-6">
                         <button className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-indigo-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-white/10">
                            <Printer size={16} /> Print Advice
                         </button>
                         <button className="flex items-center gap-3 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic shadow-xl shadow-rose-900/40">
                            <Download size={16} /> Statement
                         </button>
                      </div>
                   </div>
                   <div className="w-full md:w-auto p-8 rounded-[2.5rem] bg-indigo-950/50 border border-white/10 backdrop-blur-sm space-y-4">
                      <div className="flex items-center justify-between gap-10 border-b border-white/5 pb-3">
                         <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest italic leading-none">A/c Status</span>
                         <span className="text-[10px] font-black text-rose-50 uppercase flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-emerald-400" /> ACTIVE_MOD
                         </span>
                      </div>
                      <div className="flex items-center justify-between gap-10 border-b border-white/5 pb-3">
                         <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest italic leading-none">Tax Status</span>
                         <span className="text-[10px] font-black text-rose-50 uppercase">EXEMPTED</span>
                      </div>
                      <div className="flex items-center justify-between gap-10">
                         <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest italic leading-none">Auto-Renew</span>
                         <span className="text-[10px] font-black text-rose-50 uppercase">ENABLED</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Insights */}
             <div className="space-y-8">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl self-start group hover:border-rose-200 transition-all duration-500">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Recent Audit Pulse</h3>
                   <div className="space-y-4">
                      {[
                        { event: 'Interest Accrued', date: '01-MAY', amt: '+12.50' },
                        { event: 'Tax Deduction', date: '01-MAY', amt: '-1.25' },
                        { event: 'Rollover Index', date: '15-APR', amt: 'SUCCESS' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-rose-50/50 transition-colors">
                           <div>
                              <p className="text-[10px] font-black text-slate-800 italic uppercase leading-none mb-1">{item.event}</p>
                              <span className="text-[8px] font-bold text-slate-400 uppercase italic">{item.date}</span>
                           </div>
                           <span className={`text-[10px] font-black font-mono italic ${item.amt.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>{item.amt}</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-6 py-3 text-[9px] font-black text-rose-600 uppercase tracking-[0.2em] italic flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                      View Full History <ChevronRight size={14} />
                   </button>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex gap-4 items-start shadow-sm shadow-rose-900/5">
                   <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                   <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-rose-900 uppercase italic">Compliance Guard</h4>
                      <p className="text-[10px] font-bold text-rose-800/60 uppercase italic leading-tight tracking-tight">
                         Early withdrawal before 12 months attracts a 1.00% penalty on principal.
                      </p>
                   </div>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Control Strip */}
      <div className="bg-slate-950 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.2em] italic border-t border-white/5">
         <div className="flex gap-10">
            <span className="flex items-center gap-2"><Lock size={12} className="text-rose-500" /> SECURE_LEDGER_CHANNEL: ACTIVE</span>
            <span className="flex items-center gap-2"><Clock size={12} className="text-slate-500" /> LAST_SYNC: 19:33:04</span>
         </div>
         <span className="text-slate-600">Unified TD Engine v.12.0.4-DIST</span>
      </div>
    </div>
  );
}
