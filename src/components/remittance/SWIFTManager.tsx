import React, { useState } from 'react';
import { 
  Globe, 
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
  Building2,
  Lock,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  ArrowRight,
  MapPin,
  Clock,
  History,
  FileSearch
} from 'lucide-react';

type SWIFTMode = 
  | 'TRANSFER' 
  | 'INQUIRY' 
  | 'MOD' 
  | 'VERIFY' 
  | 'GENERATE' 
  | 'ADVICE' 
  | 'INWARD_UPLOAD' 
  | 'OUTWARD_UPLOAD' 
  | 'REPORTS';

interface SWIFTManagerProps {
  mode: SWIFTMode;
}

export default function SWIFTManager({ mode }: SWIFTManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bicCode, setBicCode] = useState('BKIDINBBXXX');

  const getTitle = () => {
    switch (mode) {
      case 'TRANSFER': return 'SWIFT Payment Transfer [HPORDM]';
      case 'INQUIRY': return 'SWIFT Message Inquiry [HSMI]';
      case 'MOD': return 'Modify SWIFT Messages [HSMM]';
      case 'VERIFY': return 'Verify SWIFT Messages [HSMV]';
      case 'GENERATE': return 'Generate SWIFT Messages [HSMG]';
      case 'ADVICE': return 'Generate SWIFT Advice [HSAG]';
      case 'INWARD_UPLOAD': return 'Inward Message Upload & Process [HUPLPMSG]';
      case 'OUTWARD_UPLOAD': return 'Outward Message Upload [HPSTTUM]';
      case 'REPORTS': return 'Payment Order Monitoring Reports [HPOMR]';
      default: return 'SWIFT Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 1200);
  };

  const bicBreakdown = {
    bank: bicCode.substring(0, 4),
    country: bicCode.substring(4, 6),
    location: bicCode.substring(6, 8),
    branch: bicCode.length > 8 ? bicCode.substring(8, 11) : 'XXX (Primary)'
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans italic selection:bg-indigo-100">
      {/* Header */}
      <div className="bg-[#1e1b4b] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-indigo-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-300 border border-white/10 backdrop-blur-md shadow-xl">
              <Globe size={24} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.25em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1 opacity-80 italic">Global Interbank Financial Telecommunication Gateway</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="hidden md:flex flex-col items-end border-r border-indigo-800 pr-6 mr-6">
              <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest italic tracking-tighter">BIC Status: Registered</span>
              <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-tighter">Alliance Access: Online</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-slate-800 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Entry Panel */}
        <div className="bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Receiver BIC (8/11 Chars)</label>
                    <div className="relative">
                       <input 
                         type="text" 
                         value={bicCode}
                         onChange={(e) => setBicCode(e.target.value.toUpperCase())}
                         placeholder="e.g. BKIDINBB" 
                         className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 font-mono shadow-inner italic uppercase" 
                       />
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                          <div className={`w-2 h-2 rounded-full ${bicCode.length === 8 || bicCode.length === 11 ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Message Reference / Ack ID</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. SW-99182772" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 font-mono shadow-inner italic uppercase" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[68px] px-12 bg-[#1e1b4b] text-white rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.25em] hover:bg-slate-900 transition-all shadow-2xl active:scale-95 group border border-indigo-700/30"
                       >
                          {isProcessing ? <RefreshCcw size={20} className="animate-spin text-indigo-400" /> : <FileSearch size={20} className="group-hover:scale-110 transition-transform" />}
                          {isProcessing ? 'ROUTING...' : 'PARSING MSG'}
                       </button>
                    </div>
                 </div>

                 <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 border-dashed">
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic block">Bank Code</span>
                       <span className="text-xs font-black text-indigo-900 uppercase font-mono">{bicBreakdown.bank}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic block">Country</span>
                       <span className="text-xs font-black text-indigo-900 uppercase font-mono">{bicBreakdown.country}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic block">Location</span>
                       <span className="text-xs font-black text-indigo-900 uppercase font-mono">{bicBreakdown.location}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic block">Branch</span>
                       <span className="text-xs font-black text-indigo-900 uppercase font-mono">{bicBreakdown.branch}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Detailed Lifecycle Area */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             
             {/* Message Payload Area */}
             <div className="lg:col-span-3 bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                   <div className="space-y-12">
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-indigo-600 rounded-full text-[8px] font-black uppercase tracking-widest italic">Type: MT103</span>
                            <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-[8px] font-black uppercase tracking-widest italic">Status: ACK_SUCCESS</span>
                         </div>
                         <h2 className="text-5xl font-black italic tracking-tighter shadow-sm mb-2">USD 140,000.00</h2>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">Instruction Settlement Value</p>
                      </div>

                      <div className="grid grid-cols-2 gap-12">
                         <div className="space-y-4">
                            <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Ordering Customer</p>
                               <span className="text-[11px] font-bold italic block">JS_HOLDINGS_ASIA_PTE</span>
                               <span className="text-[10px] font-black font-mono text-indigo-400">A/C: 9918272661</span>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Beneficiary Institution</p>
                               <span className="text-[11px] font-bold italic block">BANK_OF_LONDON_MAIN</span>
                               <span className="text-[10px] font-black font-mono text-indigo-400">BIC: BOLOUK2L</span>
                            </div>
                         </div>
                      </div>

                      <div className="pt-10 border-t border-white/5 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 italic">
                            <ShieldCheck size={18} /> Authorize MT
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-[#0f172a] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-white/10 group/p">
                            <Printer size={18} className="group-hover/p:scale-110 transition-transform" /> Print SWIFT Advice
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-80 bg-white/5 rounded-[2.5rem] p-8 border border-white/10 backdrop-blur-md space-y-8">
                      <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-widest italic border-b border-white/5 pb-3">Validation Pulse</h4>
                      <div className="space-y-4">
                         {[
                           { tag: 'KYC_AML', stat: 'CLEARED' },
                           { tag: 'LIQUIDITY', stat: 'RESERVED' },
                           { tag: 'SANCTIONS', stat: 'HIT_NONE' },
                           { tag: 'DUP_CHECK', stat: 'UNIQUE' },
                         ].map((v, i) => (
                           <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/50 transition-all">
                              <span className="text-[9px] font-black text-slate-400 uppercase italic leading-none">{v.tag}</span>
                              <span className="text-[10px] font-black text-emerald-400 flex items-center gap-2">
                                 <CheckCircle2 size={12} /> {v.stat}
                              </span>
                           </div>
                         ))}
                      </div>
                      <div className="p-4 bg-indigo-500/10 rounded-2xl flex items-center gap-4 text-indigo-300 border border-indigo-500/20">
                         <Info size={18} className="shrink-0" />
                         <p className="text-[9px] font-bold uppercase leading-tight italic tracking-tight translate-y-0.5">Payment subject to intermediary routing fees of USD 25.00</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Actions Area */}
             <div className="space-y-8 self-start">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-xl">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                      <History size={14} /> Msg Timeline
                   </h3>
                   <div className="space-y-3">
                      {[
                        { op: 'GEN_MT103', date: '19:30', user: 'OPR_01' },
                        { op: 'MOD_TAG32A', date: '19:32', user: 'OPR_02' },
                        { op: 'VERIFY_V1', date: '19:45', user: 'SUP_05' },
                      ].map((t, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50/50 transition-all cursor-default">
                           <div>
                              <p className="text-[10px] font-black text-slate-800 italic uppercase leading-none mb-1">{t.op}</p>
                              <span className="text-[8px] font-bold text-slate-400 uppercase">{t.user}</span>
                           </div>
                           <span className="text-[8px] font-black text-slate-500 tracking-widest">{t.date}</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-6 py-4 bg-slate-100 rounded-2xl text-[9px] font-black text-slate-500 uppercase tracking-widest italic hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                      Message Log <FileText size={14} />
                   </button>
                </div>

                <div className="p-8 bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] space-y-4 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/20 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
                   <AlertTriangle className="text-amber-600 relative z-10" size={24} />
                   <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest italic relative z-10">Verification Pending</h4>
                   <p className="text-[9px] font-bold text-amber-800/60 uppercase italic leading-tight tracking-tight relative z-10">Message modified through [HSMM] requires dual authorization [HSMV] before transmission to network gateway.</p>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Terminal Persistence */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.25em] italic uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> PKI_ENCRYPTED_TUNNEL</span>
            <span className="flex items-center gap-2"><Building2 size={12} /> BIC: FINAC_CORE_M01</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-indigo-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div> SAG_SENDER_ACTIVE</span>
            <span className="text-slate-200 px-2">|</span>
            <span>OPR: JS_9921_ASIA</span>
         </span>
      </div>
    </div>
  );
}
