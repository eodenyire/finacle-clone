import React from 'react';
import { 
  Percent, 
  RefreshCcw, 
  Building2, 
  Tag, 
  PackageSearch, 
  Calculator,
  ArrowRightLeft,
  ChevronRight,
  Lock,
  Zap
} from 'lucide-react';

export default function ReusableComponents() {
  const reusableTools = [
    { name: 'Interest & Tax Engine', icon: <Percent size={20} />, status: 'GLOBAL', complexity: 'HIGH', desc: 'Centralized calculation logic for scheme-based interest accruals.' },
    { name: 'Exchange Rates Oracle', icon: <RefreshCcw size={20} />, status: 'LIVE', complexity: 'MID', desc: 'Market data feed synchronization for cross-border transactions.' },
    { name: 'Bank Management', icon: <Building2 size={20} />, status: 'BRANCH', complexity: 'MID', desc: 'Hierarchy and organizational parameterization console.' },
    { name: 'Fees & Charges Master', icon: <Tag size={20} />, status: 'POLICY', complexity: 'HIGH', desc: 'Multi-tiered pricing and service charge configuration.' },
    { name: 'Inventory & Collateral', icon: <PackageSearch size={20} />, status: 'TRACKING', complexity: 'LOW', desc: 'Audit tracking for physical and derivative assets.' },
    { name: 'Signature Verification', icon: <Lock size={20} />, status: 'SECURE', complexity: 'MID', desc: 'OCR-powered identity validation against master database.' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] p-8 overflow-y-auto selection:bg-blue-100">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
           <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Zap size={20} />
           </div>
           <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Reusable Business Components</h1>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Parameterization Library // Logic Distribution Layer</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {reusableTools.map((tool, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
             <div className="absolute top-0 right-0 p-3 text-slate-50 group-hover:text-blue-50 transition-colors">
               <Calculator size={80} />
             </div>
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="text-[8px] font-black px-2 py-0.5 rounded border border-slate-100 uppercase tracking-widest text-slate-400">
                    {tool.status}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase italic mb-2">{tool.name}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 italic">{tool.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">Complexity</span>
                      <span className="text-[10px] font-black text-slate-700 tracking-tighter uppercase italic">{tool.complexity} RESOURCE</span>
                   </div>
                   <button className="flex items-center gap-1.5 text-blue-600 text-[9px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                     Configure <ChevronRight size={14} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-32 -mt-32"></div>
        <div className="shrink-0 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
           <ArrowRightLeft size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h4 className="text-xl font-black italic tracking-tighter mb-2 uppercase">Channel Rules Integration</h4>
           <p className="text-xs text-blue-100 opacity-60 font-medium leading-relaxed max-w-xl italic">
             Centralized logic that governs product behavior across ATM, Mobile, and Web channels. Ensure consistency of pricing and limit enforcement across the entire digital landscape.
           </p>
        </div>
        <button className="px-10 py-3 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all shadow-xl shadow-white/5 active:scale-95">
           Sync Channel Oracles
        </button>
      </div>
    </div>
  );
}
