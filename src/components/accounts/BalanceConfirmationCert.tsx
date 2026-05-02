import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  HelpCircle, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Printer, 
  Download,
  ShieldCheck,
  RefreshCcw,
  AlertCircle,
  Currency,
  DollarSign
} from 'lucide-react';

export default function BalanceConfirmationCert() {
  const [acctNo, setAcctNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    if (!acctNo) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsGenerated(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fbfe] font-sans italic">
      {/* Header */}
      <div className="bg-[#002b5c] px-8 py-5 flex justify-between items-center shadow-xl border-b border-[#001f42]">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-300 backdrop-blur-md border border-white/10">
              <FileText size={20} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.2em]">Balance Confirmation Maintenance <span className="text-blue-400 font-mono">[HGCHRG]</span></h1>
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-1 opacity-70">Event-Based Charge Orchestration & Certification</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-blue-900/40 rounded-xl border border-blue-800/50 flex items-center gap-2">
              <Clock size={12} className="text-blue-400" />
              <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest italic">VAL-DATE: 02-MAY-2026</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all shadow-inner">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 p-8 lg:p-12 overflow-y-auto space-y-8">
        
        {/* Main Interface */}
        <div className="max-w-5xl mx-auto space-y-8">
           
           <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
              
              <div className="relative space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sol ID / Branch</label>
                       <input type="text" value="5001 - MAIN BRANCH" readOnly className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-500 outline-none uppercase" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Request Category</label>
                       <select className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-800 outline-none focus:border-blue-500 appearance-none">
                          <option>CERT - Balance Confirmation Certificate</option>
                          <option>STMT - Historical Ledger Statement</option>
                          <option>INTC - Interest Accrual Certificate</option>
                          <option>TAX - TDS / Tax Summary</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Account Identifier</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         value={acctNo}
                         onChange={(e) => setAcctNo(e.target.value)}
                         placeholder="A/C No (12-Digit)" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-blue-500 font-mono shadow-inner" 
                       />
                       <button className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                          <Search size={24} />
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-100">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Charge Code</label>
                       <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-black text-slate-600 uppercase">
                          EBC-CERT-IND
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Service Fee</label>
                       <div className="px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs font-black text-blue-700 font-mono">
                          INR 150.00
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">GST (18%)</label>
                       <div className="px-6 py-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs font-black text-emerald-700 font-mono">
                          INR 27.00
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex justify-between items-center bg-slate-900 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative space-y-2">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Execute Certification</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-400" />
                    Debit transaction will be posted to source ledger
                 </p>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={loading || isGenerated}
                className={`relative z-10 px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] transition-all flex items-center gap-4 ${
                  isGenerated ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-blue-50'
                } ${loading ? 'opacity-50' : 'active:scale-95 shadow-2xl shadow-black'}`}
              >
                 {loading ? <RefreshCcw size={18} className="animate-spin" /> : isGenerated ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
                 {loading ? 'Posting Charges...' : isGenerated ? 'Charges Collected' : 'Commit & Print'}
              </button>
           </div>

           {isGenerated && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex items-start gap-6 border-l-8 border-l-blue-600 shadow-xl">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <Download size={28} />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase italic">Digital Certificate Ready</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                         Secure PDF generated with digital signature. Ready for transmission to registered email.
                      </p>
                      <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-4 flex items-center gap-2 hover:translate-x-2 transition-transform">
                         Download Document <ArrowRight size={12} />
                      </button>
                   </div>
                </div>
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex items-start gap-6 border-l-8 border-l-emerald-600 shadow-xl">
                   <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <Printer size={28} />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase italic">Print Queue Status</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-tight">
                         Sent to High-Security printer [PTR_RECP_02]. Please collect from counter.
                      </p>
                      <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase rounded-full w-max">
                         <Lock size={10} /> Authenticated
                      </div>
                   </div>
                </div>
             </div>
           )}

        </div>
      </div>

      <div className="bg-white border-t border-slate-200 px-8 py-3 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
         <div className="flex gap-10">
            <span className="flex items-center gap-2"><DollarSign size={12} /> Charge Bucket: ACCOUNT_SERVICING</span>
            <span className="flex items-center gap-2"><Currency size={12} /> Limit Consumption: 0.00%</span>
         </div>
         <div className="flex items-center gap-2">
            <AlertCircle size={12} className="text-amber-500" />
            Post-verification required for waivers {'>'} INR 1,000
         </div>
      </div>
    </div>
  );
}
