import React, { useState } from 'react';
import { 
  Link2, 
  Search, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Package, 
  Layers, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  Settings2,
  Info,
  Plus
} from 'lucide-react';

export default function GLProductLinking() {
  const [isLinked, setIsLinked] = useState(false);

  const handleLink = () => {
    setIsLinked(true);
    setTimeout(() => setIsLinked(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f7f9] font-sans selection:bg-blue-100">
      {/* Header Banner */}
      <div className="bg-[#003366] px-8 py-6 flex justify-between items-center shadow-lg border-b border-blue-400/20 relative z-10">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-200 border border-white/10 backdrop-blur-sm">
              <Link2 size={24} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.15em] italic leading-tight">
                 GL Product Parametrization <span className="text-blue-400">[HGSPM]</span>
              </h1>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest flex items-center gap-2 mt-1">
                 <Settings2 size={12} className="text-emerald-400" />
                 Relational Schema Mapper — v8.1 (Proprietary)
              </p>
           </div>
        </div>
        <button className="w-10 h-10 bg-red-500/20 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-all border border-red-500/20">
           <X size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="p-8 lg:p-16 max-w-6xl mx-auto w-full">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Source Selection - Account Product */}
            <div className="space-y-6">
               <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 hover:border-blue-400 transition-all duration-500 relative group">
                  <div className="absolute top-8 right-8 text-slate-100 group-hover:text-blue-50 transition-colors">
                     <Package size={80} strokeWidth={1} />
                  </div>
                  
                  <div className="relative">
                     <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                        Step 01 — Target Product
                     </div>
                     <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-8">Savings Product Selection</h3>
                     
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Product Classification</label>
                           <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                              <option>Savings Bank Accounts (SB)</option>
                              <option>Current Accounts (CA)</option>
                              <option>Fixed Deposits (FD)</option>
                              <option>Loan Products (LP)</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Account Product Code</label>
                           <div className="flex gap-3">
                              <input type="text" placeholder="Search Code..." className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono shadow-inner" />
                              <button className="w-14 h-14 bg-[#003366] rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                                 <Search size={20} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 items-start">
                  <Info className="text-amber-500 shrink-0" size={20} />
                  <p className="text-[10px] font-bold text-amber-800 leading-relaxed italic">
                     Product-to-GL linkage is immutable once transactions are posted. Verify the Sub-head alignment with the Sol Internal Scheme before committing.
                  </p>
               </div>
            </div>

            {/* Destination Selection - GL Subhead */}
            <div className="space-y-6 flex flex-col justify-center">
               <div className="flex justify-center py-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-600/30 animate-bounce">
                     <ArrowRight size={32} />
                  </div>
               </div>

               <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 hover:border-emerald-400 transition-all duration-500 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-50"></div>
                  
                  <div className="relative">
                     <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                        Step 02 — Mapping Backbone
                     </div>
                     <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-8">GL Sub-head Mapping</h3>
                     
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Parent General Ledger</label>
                           <input type="text" value="10 — LIABILITIES" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-400 outline-none" disabled />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">GL Sub-head Identity</label>
                           <div className="flex gap-3">
                              <input type="text" placeholder="e.g. 10100" className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-emerald-500 font-mono shadow-inner italic" />
                              <button className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all">
                                 <Plus size={24} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                  onClick={handleLink}
                  className="w-full py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-black shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95"
               >
                  Sync Schema Identity
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
         </div>

         {/* Linkage History / Current Mappings */}
         <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
               Live Mapping Registry <div className="flex-1 h-px bg-slate-200"></div>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { p: 'SB-GEN-01', n: 'Savings Gen Public', gl: '10100' },
                 { p: 'SB-STAFF', n: 'Internal Staff SB', gl: '10110' },
                 { p: 'FD-RETAIL', n: 'Retail Fixed Dep', gl: '10300' },
               ].map((map, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all cursor-default">
                     <div>
                        <p className="text-[10px] font-black text-slate-800 uppercase italic mb-1">{map.n}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-bold text-slate-400 font-mono">{map.p}</span>
                           <ArrowRight size={10} className="text-slate-300" />
                           <span className="text-[9px] font-black text-blue-600 font-mono">{map.gl}</span>
                        </div>
                     </div>
                     <CheckCircle2 size={24} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 animate-in zoom-in duration-500 ${isLinked ? 'block' : 'hidden'}`}>
         <div className="bg-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border-2 border-emerald-400">
            <ShieldCheck size={24} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Product Schema Synchronized</span>
         </div>
      </div>

      <div className="mt-auto h-8 bg-slate-900 border-t border-slate-700 flex items-center px-8 text-[9px] text-slate-400 font-black uppercase tracking-widest space-x-8">
         <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Schema Engine Active</span>
         <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> SOL 5001 Online</span>
         <span className="flex-1 text-right italic">Last Param Update: 02-MAY-2026 18:54:08</span>
      </div>
    </div>
  );
}
