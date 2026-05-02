import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  X, 
  Search, 
  RefreshCcw, 
  Save, 
  Printer, 
  ChevronRight, 
  Info,
  Calendar,
  FileText,
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  AlertOctagon,
  Download,
  Building2
} from 'lucide-react';

type TaxMode = 
  | 'TDS_REFUND' 
  | 'WHT_REMIT' 
  | 'REMIT_REPORT' 
  | 'WHT_REFUND' 
  | 'DETAILS_INQ' 
  | 'PROJECTION';

interface TaxManagerProps {
  mode: TaxMode;
}

export default function TaxManager({ mode }: TaxManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'TDS_REFUND': return 'TDS Refund Maintenance [HRFTDS]';
      case 'WHT_REMIT': return 'Remitting Withholding Tax [RMWTAX]';
      case 'REMIT_REPORT': return 'Generate Remittance Report [HRMTDS]';
      case 'WHT_REFUND': return 'Refund of Withholding Tax [RFWTAX]';
      case 'DETAILS_INQ': return 'Inquire & Print Tax Details [HTDSIP]';
      case 'PROJECTION': return 'Inquire Tax Projection [HTDSPROJ]';
      default: return 'Tax & Compliance Management';
    }
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 900);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfdfe] font-sans selection:bg-rose-100 italic">
      {/* Header */}
      <div className="bg-[#0f172a] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10 backdrop-blur-md">
              <ShieldCheck size={24} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.2em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1 opacity-80">Fiscal Compliance & Revenue Integrity Framework</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="hidden md:flex flex-col items-end border-r border-slate-700 pr-6 mr-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Reg: IRS_FATCA_CRS</span>
              <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">Reporting Node: active</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-slate-800 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Search / Criteria */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] opacity-40"></div>
           
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Tax Entity Type</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-700 outline-none focus:border-emerald-500 appearance-none shadow-sm cursor-pointer">
                       <option>IND - INDIVIDUAL</option>
                       <option>CORP - CORPORATE</option>
                       <option>EXMT - EXEMPT ENTITY</option>
                    </select>
                 </div>

                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Tax ID / PAN / Registration No</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="e.g. ABCDE1234F" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-emerald-500 font-mono shadow-inner italic uppercase" 
                       />
                       <button 
                         onClick={handleAction}
                         className="h-[64px] px-10 bg-[#0f172a] text-emerald-400 rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl active:scale-95 border border-emerald-500/20"
                       >
                          {isProcessing ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} />}
                          {isProcessing ? 'SCANNING...' : 'EXECUTE LOOKUP'}
                       </button>
                    </div>
                 </div>

                 {(mode === 'WHT_REMIT' || mode === 'TDS_REFUND') && (
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Transaction Amount</label>
                       <div className="relative">
                          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">USD</span>
                          <input type="text" placeholder="0.00" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-20 pr-8 py-5 text-sm font-black text-emerald-600 font-mono outline-none focus:border-emerald-500 italic shadow-inner" />
                       </div>
                    </div>
                 )}

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Assessment Year</label>
                    <input type="text" placeholder="2026-27" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-700 outline-none focus:border-emerald-500 italic shadow-sm" />
                 </div>
              </div>
           </div>
        </div>

        {/* Dynamic Display Area */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
             
             {/* Summary Panel */}
             <div className="lg:col-span-3 bg-white rounded-[3rem] p-12 border-2 border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                   <div className="space-y-10">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">Cumulative Tax Withheld</p>
                         <h2 className="text-5xl font-black italic tracking-tighter text-[#0f172a]">USD 8,443.50</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Current Slab</span>
                            <span className="text-xl font-black italic text-emerald-600">30% COR</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Proj. Year End</span>
                            <span className="text-xl font-black italic">USD 14,200</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Cert Status</span>
                            <span className="text-xl font-black italic uppercase text-indigo-600">ISSUED</span>
                         </div>
                      </div>

                      <div className="pt-10 border-t border-slate-100 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20 active:scale-95 italic">
                            <Save size={16} /> Update Ledger
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-slate-200">
                            <Printer size={16} /> Print Tax Form
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border-2 border-indigo-100">
                            <Download size={16} /> Report.PDF
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-80 space-y-6">
                      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 bg-emerald-500 opacity-5"></div>
                         <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic border-b border-white/5 pb-3">Validation Matrix</h4>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase">
                               <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> RESIDENCY_VER</span>
                               <span className="text-emerald-400">PASSED</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase">
                               <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-400" /> TREATY_BEN</span>
                               <span className="text-emerald-400">APPLIED</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-black uppercase text-amber-400 italic">
                               <span className="flex items-center gap-2"><AlertOctagon size={12} /> THRESHOLD</span>
                               <span>NEAR_LIMIT</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex gap-4 items-start">
                         <Building2 className="text-emerald-600 shrink-0" size={24} />
                         <div>
                            <h5 className="text-[9px] font-black text-emerald-900 uppercase italic">Remittance Channel</h5>
                            <p className="text-[9px] font-bold text-emerald-700/60 uppercase leading-tight tracking-tight italic">
                               DIRECT_SYNC with Central Revenue Gateway [NODE_772]
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Sidebar Actions */}
             <div className="space-y-8">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-xl">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Compliance Timeline</h3>
                   <div className="space-y-4">
                      {[
                        { ev: 'WHT Posting', date: 'APR 2026', amt: '1,200.00' },
                        { ev: 'TDS Refund', date: 'MAR 2026', amt: '450.00' },
                        { ev: 'Remittance', date: 'FEB 2026', amt: '8,000.00' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 italic transition-colors hover:bg-emerald-50/50 group cursor-default">
                           <div>
                              <p className="text-[10px] font-black text-slate-800 uppercase leading-none mb-1">{item.ev}</p>
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{item.date}</span>
                           </div>
                           <span className="text-[10px] font-black font-mono text-slate-900">{item.amt}</span>
                        </div>
                      ))}
                      <button className="w-full mt-4 py-3 text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] italic flex items-center justify-center gap-2 hover:gap-4 transition-all">
                         Project Data <BarChart3 size={14} />
                      </button>
                   </div>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Persistence Bar */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.2em] italic">
         <div className="flex gap-10">
            <span className="flex items-center gap-2"><DollarSign size={12} /> Currency: USD</span>
            <span className="flex items-center gap-2"><Calendar size={12} /> Cycle: FY_26_Q1</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-emerald-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div> REGULATORY_SYNC: LIVE</span>
            <span className="text-slate-200">|</span>
            <span>SOL: 5001</span>
            <span className="text-slate-200">|</span>
            <span>OPR: TX_9921</span>
         </span>
      </div>
    </div>
  );
}
