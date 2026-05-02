import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Workflow, 
  Activity, 
  Database, 
  Cpu, 
  Settings, 
  ChevronRight,
  UserCheck,
  Zap,
  Terminal,
  FileCode
} from 'lucide-react';

export default function InfrastructureSystem() {
  const kernelNodes = [
    { id: 'NODE-01', type: 'Database Access (DBA)', status: 'HEALTHY', load: '12%', role: 'PRIMARY' },
    { id: 'NODE-02', type: 'Workflow Engine (BPEL)', status: 'HEALTHY', load: '45%', role: 'SECONDARY' },
    { id: 'NODE-03', type: 'Oracle Middleware', status: 'WARNING', load: '89%', role: 'REPLICA' },
    { id: 'NODE-04', type: 'SSO & Access Control', status: 'HEALTHY', load: '08%', role: 'GLOBAL' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300">
      <header className="p-8 border-b border-slate-800 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-blue-500" size={24} />
            <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">Infrastructure Management</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">System Kernel / SOA Layer / Access Control</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase">Core Online // 99.99% Uptime</span>
           </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* System Nodes */}
         <div className="lg:col-span-2 space-y-8">
            <div>
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Terminal size={14} />
                  Cluster Health Registry
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kernelNodes.map(node => (
                    <div key={node.id} className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl hover:border-blue-500/50 transition-all group cursor-pointer">
                       <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-900 transition-colors">
                             <Database size={18} className="text-slate-400 group-hover:text-blue-400" />
                          </div>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                            node.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-400/20' : 'text-amber-400 border-amber-400/20'
                          }`}>
                            {node.status}
                          </span>
                       </div>
                       <h4 className="text-xs font-black text-white uppercase mb-1">{node.type}</h4>
                       <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 mb-4">
                          <span>{node.id}</span>
                          <span>LOAD: {node.load}</span>
                       </div>
                       <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: node.load }} className="h-full bg-blue-500" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Workflow size={14} className="text-blue-500" />
                     Workflow (BPEL) Orchestration
                   </h3>
                   <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:underline">Monitor Sequences</button>
                </div>
                <div className="space-y-4 relative">
                   <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800"></div>
                   {[
                     { id: 'WF-109', name: 'Retail Loan Approval Loop', status: 'In-Flight', step: 'Credit Evaluation (Node 4)' },
                     { id: 'WF-332', name: 'HNW Onboarding Sequence', status: 'Paused', step: 'Compliance Verification (Manual)' },
                   ].map((wf, i) => (
                     <div key={i} className="relative pl-14 flex flex-col gap-1">
                        <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-slate-900 border border-blue-500/50 flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-[10px] font-black text-white italic group cursor-pointer hover:text-blue-400 transition-colors uppercase tracking-tight">{wf.name}</span>
                        <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-tight">
                           <span>{wf.id}</span>
                           <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                           <span className="text-blue-400">{wf.status}</span>
                           <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                           <span>{wf.step}</span>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
         </div>

         {/* Access Control / Security */}
         <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden group">
               <Shield className="text-blue-500/30 mb-6 group-hover:scale-110 transition-transform" size={48} />
               <h3 className="text-lg font-black text-white italic tracking-tighter uppercase mb-2">Identity Governance</h3>
               <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                 Multi-level security enforcement active. All operation trails are being hashed and recorded to the Oracle Audit Vault.
               </p>
               <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Access Control List</span>
                     <ChevronRight size={14} className="text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Role Entitlements</span>
                     <ChevronRight size={14} className="text-slate-500" />
                  </button>
               </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-6 text-white text-center flex flex-col items-center shadow-xl shadow-blue-600/20">
               <Zap className="mb-3" size={24} />
               <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">System Accelerator</span>
               <span className="text-2xl font-black italic tracking-tighter my-1">FINACLE STUDIO</span>
               <p className="text-[10px] opacity-60 font-medium leading-tight">Low-code configuration console for custom process extensions.</p>
               <button className="mt-4 px-8 py-2 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-all">Launch Studio</button>
            </div>
         </div>
      </div>
    </div>
  );
}
