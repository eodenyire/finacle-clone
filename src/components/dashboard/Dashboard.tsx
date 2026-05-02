import React from 'react';
import { 
  Users, 
  Package, 
  Settings, 
  Database, 
  Shield, 
  TrendingUp, 
  Activity,
  ArrowRightLeft
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Customer Base', val: '14,204', sub: '+124 this week', icon: <Users size={20} />, color: 'blue' },
    { label: 'Active Schemes', val: '42', sub: 'Product Factory', icon: <Package size={20} />, color: 'emerald' },
    { label: 'System Load', val: '14%', sub: 'Healthy', icon: <Activity size={20} />, color: 'slate' },
    { label: 'GL Balance', val: '$512.4M', sub: 'Total Assets', icon: <Database size={20} />, color: 'blue' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f7fa] p-8 overflow-y-auto selection:bg-blue-100">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic mb-1">Operational Command</h1>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Finacle Core Banking System // Unified Control Plane</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start">
               <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                 {stat.icon}
               </div>
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-2 py-0.5 border border-slate-100 rounded">Live</span>
             </div>
             <div>
                <span className="text-2xl font-mono font-black text-slate-800">{stat.val}</span>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
             </div>
             <p className="text-[10px] text-slate-500 font-bold italic mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Functional Architecture Status */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <Settings size={16} className="text-blue-600" />
                 Functional Health Monitor
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 {[
                   { label: 'Accounting Backbone', status: 'SYNCHED', load: 12, icon: <ArrowRightLeft size={16} /> },
                   { label: 'Security & SSO', status: 'ACTIVE', load: 4, icon: <Shield size={16} /> },
                   { label: 'Enterprise CRM Sync', status: 'PENDING', load: 45, icon: <Users size={16} /> },
                   { label: 'Report Generation', status: 'IDLE', load: 0, icon: <TrendingUp size={16} /> },
                 ].map((mod, i) => (
                   <div key={i} className="flex flex-col gap-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500">{mod.icon}</span>
                            {mod.label}
                         </div>
                         <span className={mod.status === 'SYNCHED' || mod.status === 'ACTIVE' ? 'text-emerald-500' : 'text-amber-500'}>
                           {mod.status}
                         </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${mod.load || 5}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-6 italic">System Message of the Day (MOTD)</h3>
              <p className="text-sm font-black italic leading-relaxed text-blue-50/80 mb-6 max-w-lg">
                "Product Factory updates for Islamic Banking modules have been versioned under PRD-ISL-2024. Please ensure all regional oracles are synched before the EOD processing begins at 20:00 server time."
              </p>
              <div className="flex gap-4">
                 <button className="px-6 py-2 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all">Review Patch Notes</button>
                 <button className="px-6 py-2 bg-white/10 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all italic">Dismiss</button>
              </div>
           </div>
        </div>

        {/* Quick Links / Infrastructure */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Infrastructure Status</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Oracle DB Core', status: 'Online', latency: '0.2ms' },
                   { label: 'UNIX OS Kernel', status: 'Stable', latency: '99d uptime' },
                   { label: 'Java/JVM Nodes', status: 'Active', latency: '4 nodes' },
                 ].map((node, i) => (
                   <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                         <span className="block text-[11px] font-black text-slate-700 italic">{node.label}</span>
                         <span className="text-[9px] text-emerald-500 font-bold uppercase">{node.status}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{node.latency}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-white to-blue-50/30 p-6 rounded-3xl border border-blue-100 shadow-sm">
             <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <ArrowRightLeft size={20} />
             </div>
             <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">EOD Processing</h4>
             <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-4 italic">
               Final ledger commitment pending. Estimated EOD start: 20:00:00 (Local Time).
             </p>
             <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-1/4"></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
