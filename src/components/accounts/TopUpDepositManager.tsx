import React, { useState } from 'react';
import { 
  ArrowUpRight, 
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
  Plus,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  History
} from 'lucide-react';

type TUMode = 
  | 'OPENING' 
  | 'MOD' 
  | 'VERIFY' 
  | 'MAINT' 
  | 'TXN_MAINT' 
  | 'INST_INQ' 
  | 'ACCT_INQ' 
  | 'STATEMENT';

interface TopUpDepositManagerProps {
  mode: TUMode;
}

export default function TopUpDepositManager({ mode }: TopUpDepositManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFlow, setShowFlow] = useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'OPENING': return 'Top-Up Deposit Account Opening [HOAACTU]';
      case 'MOD': return 'Modify Top-Up Account (Pre-Verify) [HOAACMTU]';
      case 'VERIFY': return 'Top-Up Account Verification [HOAACVTU]';
      case 'MAINT': return 'Top-Up Maintenance (Ren/Cls) [HACMFTU]';
      case 'TXN_MAINT': return 'Top-Up Deposit Transaction Maint [HTUTM]';
      case 'INST_INQ': return 'Top-Up Installment Inquiry [HTUINST]';
      case 'ACCT_INQ': return 'Top-Up Account Inquiry [HACITD]';
      case 'STATEMENT': return 'Account Statement Generation [HPSP]';
      default: return 'Top-Up Deposit Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowFlow(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fbfcfd] font-sans selection:bg-orange-100 italic">
      {/* Header */}
      <div className="bg-[#431407] px-10 py-5 flex justify-between items-center shadow-2xl border-b border-orange-950">
        <div className="flex items-center gap-5">
           <div className="w-11 h-11 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/30 backdrop-blur-md">
              <ArrowUpRight size={22} strokeWidth={3} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.25em] leading-none mb-1 shadow-sm">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest opacity-80">Incremental Wealth Accumulation Architecture</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-orange-300 uppercase tracking-widest">Master Ledger Sync</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Entry Parameters Card */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -mr-24 -mt-24 opacity-60"></div>
           
           <div className="relative space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Function</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-700 outline-none focus:border-orange-500 appearance-none shadow-sm cursor-pointer">
                       <option>M - MAINTAIN</option>
                       <option>A - ADD TOP-UP</option>
                       <option>V - VERIFY</option>
                       <option>I - INQUIRE</option>
                       <option>D - ADHOC DEPOSIT</option>
                    </select>
                 </div>

                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Account / CIF Identifier</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. TU-99281726" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-orange-500 font-mono shadow-inner italic" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[64px] px-10 bg-[#431407] text-white rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-950 transition-all shadow-xl active:scale-95 group"
                       >
                          {isProcessing ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} className="group-hover:scale-125 transition-transform" />}
                          {isProcessing ? 'CALCULATING...' : 'FETCH DATA'}
                       </button>
                    </div>
                 </div>

                 {mode === 'TXN_MAINT' && (
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Adhoc Amount</label>
                       <div className="relative">
                          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">USD</span>
                          <input type="text" placeholder="500.00" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-20 pr-8 py-5 text-sm font-black text-orange-600 font-mono outline-none focus:border-orange-500 italic" />
                       </div>
                    </div>
                 )}

                 {mode === 'OPENING' && (
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Installment Freq</label>
                       <select className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-800 outline-none">
                          <option>M - MONTHLY</option>
                          <option>Q - QUARTERLY</option>
                          <option>H - HALFY YEARLY</option>
                       </select>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Dynamic Workflow Area */}
        {showFlow && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
             
             {/* Account Summary Panel */}
             <div className="lg:col-span-3 bg-[#111827] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                   <div className="space-y-10">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-400 border border-white/5">
                            <TrendingUp size={28} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-1">Growth Projection</p>
                            <h2 className="text-4xl font-black italic tracking-tighter">USD 45,990.22</h2>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest">Base Rate</span>
                            <span className="text-xl font-black italic">5.85%</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest">Step-up Bonus</span>
                            <span className="text-xl font-black italic text-orange-400">+0.25%</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-widest">Total Deposits</span>
                            <span className="text-xl font-black italic">12 / 60</span>
                         </div>
                      </div>

                      <div className="pt-10 border-t border-white/5 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                            <Save size={16} /> Update Ledger
                         </button>
                         <button className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-white/5">
                            <Printer size={16} /> Print Advice
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-72 bg-white/5 rounded-3xl p-8 border border-white/5 backdrop-blur-md space-y-6">
                      <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic border-b border-white/5 pb-3">Instruction Status</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-70">
                            <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> KYC_CHECK</span>
                            <span className="text-emerald-400">PASSED</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-70">
                            <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> SI_AUTOPAY</span>
                            <span className="text-emerald-400">READY</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-70 italic">
                            <span className="flex items-center gap-2"><AlertTriangle size={12} className="text-amber-400" /> LIMIT_LVL</span>
                            <span className="text-amber-400 text-[8px]">SUPV_REQ</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Utilities */}
             <div className="space-y-8">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-xl">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                      <History size={14} /> Renewal History
                   </h3>
                   <div className="space-y-3">
                      {[
                        { yr: '2025', rate: '6.10%', status: 'Rolled' },
                        { yr: '2024', rate: '5.90%', status: 'Matured' },
                        { yr: '2023', rate: '5.75%', status: 'Matured' },
                      ].map((h, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center hover:bg-orange-50/50 transition-colors cursor-default border border-slate-100">
                           <div>
                              <span className="text-[10px] font-black text-slate-800 italic">{h.yr} TERM</span>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Rate Index: {h.rate}</p>
                           </div>
                           <span className="text-[8px] font-black px-2 py-0.5 bg-slate-200 text-slate-600 rounded uppercase">{h.status}</span>
                        </div>
                      ))}
                      <button className="w-full mt-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest italic transition-all">Full Renewal Log</button>
                   </div>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Persistence Ledger */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.2em] italic">
         <div className="flex gap-10">
            <span className="flex items-center gap-2"><FileSpreadsheet size={12} /> Ledger: TU_PROD_B3</span>
            <span className="flex items-center gap-2"><Lock size={12} /> Encryption: SHA-512</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-orange-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> STANDING_INSTR_ACTIVE</span>
            <span className="text-slate-300">|</span>
            <span>OPR: JS_9921</span>
         </span>
      </div>
    </div>
  );
}

const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
