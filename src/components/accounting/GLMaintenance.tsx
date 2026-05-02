import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Database, 
  Layers, 
  Copy, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Save,
  Trash2
} from 'lucide-react';

interface GLMaintenanceProps {
  mode: 'GL_CODE' | 'SUB_HEAD' | 'REPLICATE';
}

const MOCK_GL_DATA = [
  { code: '10', name: 'Liability', type: 'LIABILITY' },
  { code: '20', name: 'Asset', type: 'ASSET' },
];

const MOCK_SUBHEAD_DATA = [
  { code: '10100', name: 'SB General', parentGL: '10' },
  { code: '10110', name: 'SB Staff', parentGL: '10' },
  { code: '10200', name: 'Current Account General', parentGL: '10' },
  { code: '10210', name: 'Current Account Corporate', parentGL: '10' },
  { code: '10300', name: 'Fixed Deposits', parentGL: '10' },
  { code: '10310', name: 'Cumulative Deposits', parentGL: '10' },
  { code: '20100', name: 'Overdraft Account', parentGL: '20' },
  { code: '20110', name: 'Term Loan Housing Loan', parentGL: '20' },
];

export default function GLMaintenance({ mode }: GLMaintenanceProps) {
  const [formData, setFormData] = useState({
    function: 'Add',
    glCode: '',
    glName: '',
    glType: 'Liability',
    subHeadCode: '',
    subHeadName: '',
    parentGL: '',
    currency: 'INR',
    solId: '5001'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const getTitle = () => {
    switch (mode) {
      case 'GL_CODE': return 'General Ledger Code Maintenance [HRRCDM]';
      case 'SUB_HEAD': return 'GL Sub Head Maintenance [HGLSHM]';
      case 'REPLICATE': return 'Replicate GL Sub Head [HGLSHR]';
    }
  };

  const getHeaderIcon = () => {
    switch (mode) {
      case 'GL_CODE': return <Database size={18} />;
      case 'SUB_HEAD': return <Layers size={18} />;
      case 'REPLICATE': return <Copy size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans overflow-y-auto selection:bg-blue-100">
      {/* Header Banner */}
      <div className="bg-[#003366] px-6 py-4 flex justify-between items-center shadow-xl z-20">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-200">
              {getHeaderIcon()}
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.15em] italic">
                 {getTitle()}
              </h1>
              <p className="text-[9px] font-bold text-blue-300 uppercase tracking-widest opacity-80">
                 Accounting Backbone Engine — SOL: 5001 (Main Branch)
              </p>
           </div>
        </div>
        <div className="flex gap-2">
           <button className="w-8 h-8 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center text-white transition-all">
              <X size={16} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="p-6 lg:p-10 space-y-8">
        {/* Main Form Area */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
           {/* Success Toast */}
           <div className={`absolute top-0 left-0 w-full h-1 bg-emerald-500 transition-all duration-500 ${isSuccess ? 'scale-x-100' : 'scale-x-0'}`}></div>

           <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Plus size={14} className="text-blue-600" /> Maintenance Details
              </span>
              <div className="flex items-center gap-4">
                 <HelpCircle size={16} className="text-slate-400" />
              </div>
           </div>

           <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-5xl mx-auto">
                 {/* Function Select */}
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Function Code</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all">
                       <option>Add</option>
                       <option>Modify</option>
                       <option>Inquire</option>
                       <option>Verify</option>
                    </select>
                 </div>

                 {mode === 'GL_CODE' ? (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Code *</label>
                        <input type="text" placeholder="e.g. 10" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Description</label>
                        <input type="text" placeholder="e.g. Liabilities" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Type</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600">
                           <option>Liability</option>
                           <option>Asset</option>
                           <option>Income</option>
                           <option>Expense</option>
                        </select>
                     </div>
                   </>
                 ) : mode === 'SUB_HEAD' ? (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Parent GL Code</label>
                        <div className="flex gap-2">
                           <input type="text" placeholder="Search GL..." className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                           <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"><Search size={16} /></button>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Head Code *</label>
                        <input type="text" placeholder="e.g. 10100" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Head Name</label>
                        <input type="text" placeholder="e.g. Savings Bank General" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Currency</label>
                        <input type="text" defaultValue="INR" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none" disabled />
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Source SOL ID</label>
                        <input type="text" defaultValue="5001" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none" disabled />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target SOL ID Range</label>
                        <div className="flex items-center gap-2">
                           <input type="text" placeholder="From" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                           <ArrowRight size={14} className="text-slate-300" />
                           <input type="text" placeholder="To" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                        </div>
                     </div>
                     <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Select Sub-Heads to Replicate</label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
                           {MOCK_SUBHEAD_DATA.map(sh => (
                             <label key={sh.code} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-all cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                                <div className="flex flex-col">
                                   <span className="text-[10px] font-black text-slate-800">{sh.name}</span>
                                   <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Code: {sh.code}</span>
                                </div>
                             </label>
                           ))}
                        </div>
                     </div>
                   </>
                 )}
              </div>
           </div>

           <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
              <button className="px-6 py-2.5 bg-white border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                 <Trash2 size={14} /> Clear
              </button>
              <button 
                 onClick={handleAction}
                 className="px-8 py-2.5 bg-[#003366] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#002244] shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2 active:scale-95"
              >
                 <Save size={14} /> Commit Changes
              </button>
           </div>
        </div>

        {/* Existing Records Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
           <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest italic">Reference Ledger Table</h3>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-full">Systems Online</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-black uppercase rounded-full">SOL 5001 Data</span>
                 </div>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">GL Type</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">GL Code</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Account Name</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Sub-Head Code</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {[
                         { t: 'LIABILITY', c: '10', n: 'SB General', sh: '10100', s: 'Active' },
                         { t: 'LIABILITY', c: '10', n: 'SB Staff', sh: '10110', s: 'Active' },
                         { t: 'LIABILITY', c: '10', n: 'Current Account General', sh: '10200', s: 'Active' },
                         { t: 'ASSET', c: '20', n: 'Overdraft Account', sh: '20100', s: 'Active' },
                         { t: 'ASSET', c: '20', n: 'Term Loan Housing Loan', sh: '20110', s: 'Active' },
                       ].map((row, idx) => (
                         <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                           <td className="px-6 py-4">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded ${row.t === 'LIABILITY' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                                 {row.t}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-[11px] font-mono font-black text-slate-700">{row.c}</td>
                           <td className="px-6 py-4 text-[10px] font-black text-slate-800 uppercase italic tracking-tight">{row.n}</td>
                           <td className="px-6 py-4 text-[11px] font-mono font-black text-blue-600">{row.sh}</td>
                           <td className="px-6 py-4 text-right">
                              <CheckCircle2 size={14} className="text-emerald-500 inline-block" />
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="flex justify-center gap-8 opacity-40 py-4">
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
              <ShieldAlert size={14} /> Audit Trail Enabled
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
              <CheckCircle2 size={14} /> Real-time Validation
           </div>
        </div>
      </div>

      <div className={`fixed bottom-8 right-8 animate-in slide-in-from-right-10 duration-500 ${isSuccess ? 'block' : 'hidden'}`}>
         <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500">
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">General Ledger Synchronized</span>
         </div>
      </div>
    </div>
  );
}
