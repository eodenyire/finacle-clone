import React, { useState } from 'react';
import { 
  TrendingDown, 
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
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  Lock,
  ChevronDown,
  History,
  FileSearch
} from 'lucide-react';

type ODMode = 'OPENING' | 'VERIFY' | 'MOD' | 'LIMIT';

interface OverdraftManagerProps {
  mode: ODMode;
}

export default function OverdraftManager({ mode }: OverdraftManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [functionCode, setFunctionCode] = useState('O');

  const getTitle = () => {
    switch (mode) {
      case 'OPENING': return 'Overdraft Account Opening [HOAACOD]';
      case 'VERIFY': return 'Overdraft Account Verification [HOAACVOD]';
      case 'MOD': return 'Overdraft Account Modification [HACM]';
      case 'LIMIT': return 'Sanction Limit Maintenance [HACLHM]';
      default: return 'Overdraft Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 1100);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans italic selection:bg-slate-200">
      {/* Header Banner */}
      <div className="bg-[#1e293b] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 border border-white/10 backdrop-blur-md">
              <TrendingDown size={24} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.2em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-80 italic">Flexible Liquidity & Credit Facility Management</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <button className="w-10 h-10 bg-white/5 hover:bg-slate-800 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Input Parameters */}
        <div className="bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative group overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -mr-24 -mt-24 opacity-60"></div>
           
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Function</label>
                    <select 
                      value={functionCode}
                      onChange={(e) => setFunctionCode(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-slate-800 appearance-none cursor-pointer italic"
                    >
                       <option value="O">O - OPEN / ADD</option>
                       <option value="M">M - MODIFY</option>
                       <option value="V">V - VERIFY</option>
                       <option value="I">I - INQUIRE</option>
                    </select>
                 </div>

                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Account ID / OD Limit Key</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. OD-99281726" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-slate-900 font-mono shadow-inner italic uppercase" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[68px] px-12 bg-slate-900 text-white rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.25em] hover:bg-black transition-all shadow-xl active:scale-95 group"
                       >
                          {isProcessing ? <RefreshCcw size={20} className="animate-spin" /> : <FileSearch size={20} className="group-hover:scale-110 transition-transform" />}
                          {isProcessing ? 'SCANNING...' : 'FETCH LEDGER'}
                       </button>
                    </div>
                 </div>

                 {mode === 'LIMIT' && (
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">New Sanction Limit</label>
                       <div className="relative">
                          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">USD</span>
                          <input type="text" placeholder="50,000.00" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-20 pr-8 py-5 text-sm font-black text-emerald-600 font-mono outline-none focus:border-slate-800 italic" />
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Dynamic Data Display */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
             
             {/* Account Details Panel */}
             <div className="lg:col-span-3 bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-500 opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                   <div className="space-y-12">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-slate-300 border border-white/10 shadow-lg">
                            <BarChart2 size={32} />
                         </div>
                         <div>
                            <h2 className="text-5xl font-black italic tracking-tighter text-white mb-1">USD 42,500.00</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Total Sanctioned Facility</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest italic">OD Interest</span>
                            <span className="text-xl font-black italic text-emerald-400">12.50% P.A.</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest italic">Available</span>
                            <span className="text-xl font-black italic">USD 8,440</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest italic">Expiry Date</span>
                            <span className="text-xl font-black italic text-rose-400 uppercase">31-DEC-26</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest italic">A/c Status</span>
                            <span className="text-xl font-black italic uppercase text-indigo-400">OPN_ACTIVE</span>
                         </div>
                      </div>

                      <div className="pt-10 border-t border-white/5 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 italic">
                            <Save size={16} /> Update Account
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-white/10">
                            <Printer size={16} /> Limit Advice
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-80 bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-md space-y-8 self-center">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-white/5 pb-3">Facility Compliance</h4>
                      <div className="space-y-4">
                         {[
                           { tag: 'SECURITY_VAL', stat: 'OK' },
                           { tag: 'LTV_RATIO', stat: '65%' },
                           { tag: 'CIBIL_SCORE', stat: '812' },
                         ].map((v, i) => (
                           <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                              <span className="text-[9px] font-black text-slate-400 uppercase italic leading-none">{v.tag}</span>
                              <span className="text-[10px] font-black text-emerald-400 flex items-center gap-2">
                                 <CheckCircle2 size={12} /> {v.stat}
                              </span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Widgets */}
             <div className="space-y-8">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                      <History size={14} /> Limit Maintenance
                   </h3>
                   <div className="space-y-4 relative z-10">
                      {[
                        { op: 'Inc Sanction', date: 'JAN 2026', val: '42,500' },
                        { op: 'Establish OD', date: 'DEC 2025', val: '30,000' },
                      ].map((h, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all cursor-default italic">
                           <div className="flex justify-between mb-1">
                              <span className="text-[10px] font-black text-slate-800 uppercase leading-none">{h.op}</span>
                              <span className="text-[8px] font-bold text-slate-400">{h.date}</span>
                           </div>
                           <p className="text-[11px] font-black text-slate-900 font-mono">USD {h.val}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] flex gap-4 items-start shadow-sm shadow-indigo-900/5">
                   <AlertCircle className="text-indigo-600 shrink-0" size={24} />
                   <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-indigo-900 uppercase italic leading-none">Security Notice</h4>
                      <p className="text-[9px] font-bold text-indigo-800/60 uppercase leading-tight italic tracking-tight">
                         Limit expirations within 30 days trigger automatic lending freeze across linked accounts.
                      </p>
                   </div>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Control Strip */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.25em] italic uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> SECURE_LEDGER_SYNC: ACTIVE</span>
            <span className="flex items-center gap-2"><CreditCard size={12} /> OD_PROD_CAT_05</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-slate-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div> AUTH_SOL_5001</span>
            <span className="text-slate-200 px-2">|</span>
            <span>OPR: OD_M_99182</span>
         </span>
      </div>
    </div>
  );
}
