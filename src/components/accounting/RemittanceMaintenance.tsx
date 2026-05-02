import React, { useState } from 'react';
import { 
  Send, 
  ArrowDownLeft, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Building2, 
  User, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  Info,
  DollarSign,
  Search,
  Save,
  Printer
} from 'lucide-react';

interface RemittanceMaintenanceProps {
  mode: 'PAYMENT_ORDER' | 'INWARD';
}

export default function RemittanceMaintenance({ mode }: RemittanceMaintenanceProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const getTitle = () => mode === 'PAYMENT_ORDER' ? 'Payment Order Maintenance [HPORDM]' : 'Inward Remittance Maintenance [HIRM]';
  const getSubTitle = () => mode === 'PAYMENT_ORDER' ? 'Outbound instrument lifecycle management' : 'Inbound fund settlement and indexing';

  return (
    <div className="flex flex-col h-full bg-[#f4f7f9] font-sans selection:bg-blue-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-[#003366] px-8 py-6 flex justify-between items-center shadow-lg border-b border-blue-400/20 relative z-10">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-200 border border-white/10 backdrop-blur-sm">
              {mode === 'PAYMENT_ORDER' ? <Send size={24} /> : <ArrowDownLeft size={24} />}
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.15em] italic leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest flex items-center gap-2 mt-1">
                 <ShieldCheck size={12} className="text-emerald-400" />
                 {getSubTitle()}
              </p>
           </div>
        </div>
        <button className="w-10 h-10 bg-red-500/20 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all border border-red-500/20">
           <X size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Main Entry Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
           <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <DollarSign size={14} className="text-blue-600" /> Remittance Instruction
              </span>
              <div className="flex gap-4">
                 <HelpCircle size={16} className="text-slate-400" />
              </div>
           </div>

           <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Function Control */}
                 <div className="space-y-2 lg:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Function</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer">
                       <option>M - Maintain</option>
                       <option>A - Add</option>
                       <option>V - Verify</option>
                       <option>I - Inquire</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Instrument Number</label>
                    <div className="flex gap-2">
                       <input type="text" placeholder="e.g. PO-88271" className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono shadow-inner" />
                       <button className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <Search size={20} />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Value Date</label>
                    <input type="date" className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                 </div>

                 {/* Divider */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-3 border-t-2 border-slate-50 my-2"></div>

                 {/* Beneficiary Details */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Beneficiary Name</label>
                    <input type="text" placeholder="Full Legal Name" className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black uppercase text-slate-700 outline-none focus:border-blue-500" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Remittance Amount</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">INR</span>
                       <input type="text" placeholder="0.00" className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-black text-blue-600 outline-none focus:border-blue-500 font-mono" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Remitter Account (Debit)</label>
                    <input type="text" placeholder="A/c ID" className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black font-mono text-slate-700 outline-none focus:border-blue-500 shadow-inner" />
                 </div>

                 {mode === 'INWARD' && (
                   <>
                     <div className="space-y-2 lg:col-span-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Originating Bank / SWIFT Address</label>
                        <input type="text" placeholder="e.g. BARCINBBXXX" className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black font-mono text-slate-700 outline-none focus:border-blue-500" />
                     </div>
                   </>
                 )}
              </div>
           </div>

           <div className="bg-slate-50 px-12 py-6 border-t border-slate-200 flex justify-end gap-4 items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-auto italic">
                 Audit Ref: SYSL_AUTO_{new Date().getTime().toString().slice(-6)}
              </span>
              <button 
                onClick={() => {}}
                className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all font-mono"
              >
                 Reset
              </button>
              <button 
                onClick={handleProcess}
                disabled={isProcessing}
                className={`px-12 py-3 bg-[#003366] text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-2xl hover:bg-[#002244] shadow-2xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3 ${isProcessing ? 'opacity-50' : ''}`}
              >
                 {isProcessing ? <RefreshCcw size={14} className="animate-spin text-blue-300" /> : <Save size={14} />}
                 {isProcessing ? 'Orchestrating Ledger...' : 'Commit Transaction'}
              </button>
           </div>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] -mr-8 -mt-8"></div>
              <div className="relative">
                 <h4 className="text-sm font-black uppercase tracking-tight italic mb-4">Regulatory Compliance Handshake</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-blue-200" />
                       <span className="text-[10px] font-bold uppercase opacity-80">AML Screening Triggered</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-blue-200" />
                       <span className="text-[10px] font-bold uppercase opacity-80">FEMA Reporting Ready</span>
                    </div>
                 </div>
                 <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                       <ShieldCheck size={20} />
                    </div>
                    <p className="text-[9px] font-bold leading-relaxed opacity-60 uppercase italic">
                       All high-value remittances are subject to secondary solar approval according to branch limits policy.
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-white border-2 border-slate-200 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/40">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Recent Remittance Log</h4>
              <div className="space-y-3">
                 {[
                   { id: 'RM-90012', amt: 'INR 45,000.00', status: 'Settled', type: 'PO' },
                   { id: 'RM-90082', amt: 'INR 1,20,000.00', status: 'Pending', type: 'INW' },
                   { id: 'RM-90095', amt: 'INR 5,000.00', status: 'Settled', type: 'PO' },
                 ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-300 transition-all cursor-default">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${log.type === 'PO' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                             {log.type}
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-800 font-mono leading-none mb-1">{log.id}</p>
                             <span className="text-[9px] font-bold text-slate-400 uppercase">{log.amt}</span>
                          </div>
                       </div>
                       <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${log.status === 'Settled' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {log.status}
                       </span>
                    </div>
                 ))}
                 <button className="w-full py-3 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
                    View Full Audit History <ChevronRight size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Success Notification */}
      <div className={`fixed bottom-12 right-12 animate-in slide-in-from-right-12 duration-500 ${isSuccess ? 'block' : 'hidden'}`}>
         <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl border border-slate-700 flex items-center gap-6 max-w-sm">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
               <Printer size={24} />
            </div>
            <div>
               <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Transaction Orchestrated</h5>
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed mt-1 uppercase italic">Instruction indexed. Instrument ready for secure printing.</p>
            </div>
            <button onClick={() => setIsSuccess(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
               <X size={16} />
            </button>
         </div>
      </div>

      <div className="mt-auto h-8 bg-white border-t border-slate-200 flex items-center px-8 text-[9px] text-slate-400 font-black uppercase tracking-widest italic space-x-12">
         <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> SOL 5001 - Active</span>
         <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Ledger Synchronized</span>
         <span className="flex-1 text-right">Unified Remittance Engine v12.4.0</span>
      </div>
    </div>
  );
}

const RefreshCcw = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21v-5h5" />
  </svg>
);
