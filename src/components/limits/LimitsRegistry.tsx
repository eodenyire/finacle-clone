import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Settings, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Activity,
  Layers,
  Cpu,
  ChevronRight
} from 'lucide-react';

interface LimitPolicy {
  id: string;
  name: string;
  type: 'USER' | 'BATCH' | 'TRANSACTION' | 'ORACLE';
  value: number;
  currency: string;
  scope: string;
  status: 'ENFORCED' | 'MONITOR' | 'DISABLED';
}

export default function LimitsRegistry() {
  const [policies] = useState<LimitPolicy[]>([
    { id: 'LP-001', name: 'Standard Teller Single Entry', type: 'TRANSACTION', value: 100000, currency: 'USD', scope: 'BRANCH_WIDE', status: 'ENFORCED' },
    { id: 'LP-102', name: 'Supervisor Daily Authorization Cap', type: 'USER', value: 5000000, currency: 'USD', scope: 'ROLE_BASED', status: 'ENFORCED' },
    { id: 'LP-331', name: 'Auto-Clearing Batch Threshold', type: 'BATCH', value: 2000000, currency: 'USD', scope: 'SYSTEM', status: 'MONITOR' },
    { id: 'LP-900', name: 'High-Value Sweep Reservation', type: 'ORACLE', value: 10000000, currency: 'USD', scope: 'GLOBAL', status: 'ENFORCED' },
  ]);

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col gap-8 overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-end bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900 rounded-lg text-white">
               <Shield size={20} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Functional Services / Global Limits</h1>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Parameterization & Policy Enforcement Engine</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-900/20">
            <Plus size={16} />
            Define Policy
          </button>
        </div>
      </header>

      {/* Stats and System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Enforcement', val: '84', icon: <Lock className="text-emerald-500" />, sub: 'Policies Active' },
          { label: 'Violations (24h)', val: '12', icon: <AlertCircle className="text-amber-500" />, sub: 'Blocked Attempts' },
          { label: 'Engine Latency', val: '0.4ms', icon: <Activity className="text-blue-500" />, sub: 'Validator Performance' },
          { label: 'System Oracle', val: 'SYNCHED', icon: <Cpu className="text-slate-500" />, sub: 'Master Sync Node 01' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-1 items-center md:items-start">
             <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
             </div>
             <span className="text-2xl font-mono font-black text-slate-800 italic">{stat.val}</span>
             <span className="text-[9px] text-slate-400 font-bold uppercase">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-8 items-start">
         <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                 <Layers size={14} className="text-blue-600" />
                 Active Parameters Registry
              </h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"><Settings size={14} /></button>
              </div>
            </div>
            
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Policy Identifier</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Enforcement Value</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Scope</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Control</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-[11px] font-black text-slate-800">{policy.name}</span>
                         <span className="text-[9px] text-slate-400 font-mono font-bold">{policy.id} // {policy.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-black text-blue-600 font-mono italic">{policy.currency} {policy.value.toLocaleString()}</span>
                         <div className="w-1.5 h-1.5 bg-blue-100 rounded-full"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[9px] font-black px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 uppercase">{policy.scope}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <CheckCircle2 size={12} className={policy.status === 'ENFORCED' ? 'text-emerald-500' : 'text-slate-300'} />
                          <span className={`text-[10px] font-black tracking-tighter uppercase italic ${policy.status === 'ENFORCED' ? 'text-emerald-600' : 'text-slate-400'}`}>
                             {policy.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <button className="text-[9px] font-black text-slate-300 group-hover:text-blue-900 transition-all uppercase tracking-widest flex items-center gap-1.5">
                          View Ruleset <ChevronRight size={12} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>

         <aside className="w-80 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-16 -mt-16"></div>
               <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity size={14} />
                  Real-time Violation Feed
               </h3>
               <div className="space-y-4">
                  {[
                    { timestamp: '17:12:04', user: 'TELLER_1', msg: 'Single Entry Limit Exceeded ($145K > $100K)', type: 'BLOCK' },
                    { timestamp: '16:55:21', user: 'BATCH_PROC', msg: 'Daily Mass Clearing Utilization > 80%', type: 'WARN' },
                  ].map((v, i) => (
                    <div key={i} className="flex gap-3 items-start border-l-2 border-blue-500/30 pl-3">
                       <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 font-mono">{v.timestamp} // {v.user}</span>
                          <span className="text-[10px] font-black text-blue-100 leading-tight italic">{v.msg}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Collateral Monitoring</h4>
               <p className="text-xs text-slate-600 font-bold italic leading-relaxed">
                  LTV (Loan-to-Value) thresholds for Trade Finance instruments are currently operating on MAY-2024 exchange rate Oracles.
               </p>
               <button className="mt-4 w-full py-2 bg-slate-50 text-[10px] font-black text-slate-600 rounded-lg border border-slate-100 hover:bg-slate-100 transition-all uppercase tracking-widest">
                  Update Risk Oracle
               </button>
            </div>
         </aside>
      </div>
    </div>
  );
}
