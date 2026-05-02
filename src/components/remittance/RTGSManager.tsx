import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
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
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  History,
  Lock,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Download,
  Database
} from 'lucide-react';

type RTGSMode = 'MSG_GEN' | 'SUSPENSE' | 'INQUIRY' | 'REPORTS';

interface RTGSManagerProps {
  mode: RTGSMode;
}

export default function RTGSManager({ mode }: RTGSManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [msgType, setMsgType] = useState('R41');

  const getTitle = () => {
    switch (mode) {
      case 'MSG_GEN': return 'Generate RTGS Messages [HPORDM]';
      case 'SUSPENSE': return 'Inward Suspense Processing [HRISP]';
      case 'INQUIRY': return 'RTGS Message Inquiry [HSMI]';
      case 'REPORTS': return 'RTGS Payment Reports [HPOMR]';
      default: return 'RTGS Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowDetails(true);
    }, 1100);
  };

  const messageTypes = [
    { id: 'R42', label: 'Interbank Request (Outward)', type: 'Interbank' },
    { id: 'R41', label: 'Customer Request (Outward)', type: 'Customer' },
    { id: 'R10', label: 'Own Account Outward', type: 'Bank' },
    { id: 'R40', label: 'Own Account Transfer Response (Inward)', type: 'Bank' },
    { id: 'R90', label: 'PI Response (Inward)', type: 'System' },
    { id: 'R09', label: 'Sender Settlement Notification (Inward)', type: 'Settlement' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans italic selection:bg-blue-100">
      {/* Header */}
      <div className="bg-[#0f172a] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 backdrop-blur-md shadow-lg">
              <ArrowRightLeft size={24} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.2em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1 opacity-80 italic">Real Time Gross Settlement & Liquidity Routing Engine</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="hidden md:flex flex-col items-end border-r border-slate-700 pr-6 mr-6">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Node: RTGS_CORE_02</span>
              <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">Network: Connected</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all shadow-xl hover:scale-105">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Control Card */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Message Identifier</label>
                    <select 
                      value={msgType}
                      onChange={(e) => setMsgType(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-blue-500 transition-all cursor-pointer italic"
                    >
                       {messageTypes.map(m => (
                         <option key={m.id} value={m.id}>{m.id} - {m.label}</option>
                       ))}
                    </select>
                 </div>

                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Transaction Reference / UTR Number</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. S12345678" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-blue-500 font-mono shadow-inner italic uppercase" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[66px] px-12 bg-[#0f172a] text-white rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl active:scale-95 group border-2 border-blue-500/20"
                       >
                          {isProcessing ? <RefreshCcw size={18} className="animate-spin text-blue-400" /> : <Database size={18} className="group-hover:text-blue-500" />}
                          {isProcessing ? 'SYNCHRONIZING...' : 'INQUIRE DATA'}
                       </button>
                    </div>
                 </div>

                 {mode === 'MSG_GEN' && (
                   <>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Debit Account</label>
                        <input type="text" placeholder="100293881" className="w-full border-b-2 border-slate-100 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-500 bg-transparent" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Credit Account</label>
                        <input type="text" placeholder="992817261" className="w-full border-b-2 border-slate-100 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-500 bg-transparent" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Value Amount (Settlement)</label>
                        <input type="text" placeholder="0.00" className="w-full border-b-2 border-slate-100 py-3 text-xs font-black text-blue-600 outline-none focus:border-blue-500 bg-transparent font-mono" />
                     </div>
                   </>
                 )}
              </div>
           </div>
        </div>

        {/* Dynamic Detail Sections */}
        {showDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
             
             {/* Main Ledger Detail */}
             <div className="lg:col-span-3 bg-white rounded-[3.5rem] p-12 border-2 border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                   <div className="space-y-12">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                            <Activity size={32} />
                         </div>
                         <div>
                            <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 leading-none">R41_UT_992817</h2>
                            <p className="text-[11px] font-black tracking-[0.3em] text-blue-500 uppercase mt-2">Active Message Lifecycle Detail</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Status</span>
                            <span className="text-xl font-black italic text-emerald-600">CONFIRMED</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Originator</span>
                            <span className="text-xl font-black italic">BNK_5001</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Settlement</span>
                            <span className="text-xl font-black italic">NET_SETTLE</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Latency</span>
                            <span className="text-xl font-black italic">0.42ms</span>
                         </div>
                      </div>

                      <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-4 bg-[#0f172a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:bg-slate-800 active:scale-95 italic">
                            <Save size={16} /> Update Status
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic hover:bg-slate-200">
                            <Printer size={16} /> Print Advice
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-blue-50 text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-blue-100 hover:bg-blue-100">
                            <Download size={16} /> RTGS_SCHEMA.JSON
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-80 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-6 border-b border-slate-200 pb-3">Security Auth Layer</h4>
                      <div className="space-y-5">
                         {[
                           { lbl: 'Maker_Sig', val: 'JS_9921', ok: true },
                           { lbl: 'Checker_Sig', val: 'AS_2210', ok: true },
                           { lbl: 'Auth_Route', val: 'CLR_GATE', ok: true },
                           { lbl: 'MD5_Hash', val: 'V_VALID', ok: true },
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.lbl}</span>
                              <span className="text-[10px] font-black text-slate-900 uppercase flex items-center gap-2">
                                 {item.ok && <CheckCircle2 size={12} className="text-emerald-500" />} {item.val}
                              </span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-8 p-4 bg-blue-600 rounded-2xl flex items-center gap-4 text-white hover:bg-blue-700 transition-colors cursor-pointer group/btn">
                         <ShieldCheck size={20} className="group-hover/btn:scale-110 transition-transform" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Re-Authorise</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Pulse Area */}
             <div className="space-y-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                   <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 italic">RTGS Pulse Hub</h3>
                   <div className="space-y-4">
                      {[
                        { pair: 'R10/OUT', time: '19:42', status: 'COMPLETE' },
                        { pair: 'R41/IN', time: '19:43', status: 'PENDING' },
                        { pair: 'R42/OUT', time: '19:45', status: 'SENT' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                           <div className="flex items-center gap-3">
                              <MessageSquare size={14} className="text-blue-400 opacity-60" />
                              <div>
                                 <p className="text-[10px] font-black italic leading-none mb-1">{item.pair}</p>
                                 <span className="text-[8px] font-bold text-slate-500 italic">{item.time} GST</span>
                              </div>
                           </div>
                           <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                             item.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400' : 
                             item.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                           }`}>{item.status}</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-6 py-3 text-[9px] font-black text-blue-400 tracking-[0.2em] uppercase italic group-hover:gap-4 transition-all flex items-center justify-center gap-2">
                      Full History <ChevronRight size={14} />
                   </button>
                </div>

                <div className="p-8 bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] space-y-4 shadow-sm">
                   <AlertTriangle className="text-blue-600" size={24} />
                   <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest italic">Inward Suspense Notice</h4>
                   <p className="text-[9px] font-bold text-blue-800/60 uppercase leading-none italic tracking-tight">Manual intervention [HRISP] required for 3 messages with unmatched ledger pointers.</p>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.2em] italic uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> AES_RSA_SYNC_LIVE</span>
            <span className="flex items-center gap-2"><Building2 size={12} /> HOST_CORE_02</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-blue-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> RTGS_NET_SECURE</span>
            <span className="text-slate-200">|</span>
            <span>SOL: 5001</span>
            <span className="text-slate-200">|</span>
            <span>OPR: AS_9921</span>
         </span>
      </div>
    </div>
  );
}
