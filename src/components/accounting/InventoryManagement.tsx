import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  ArrowRightLeft, 
  Split, 
  Combine, 
  Search, 
  FileText, 
  ShieldCheck, 
  Box,
  Truck,
  Database,
  ChevronRight,
  Printer,
  CheckCircle2,
  X,
  Plus,
  BarChart3,
  MapPin
} from 'lucide-react';

type InventoryOp = 
  | 'AUTH' 
  | 'MOVE' 
  | 'SPLIT' 
  | 'MERGE' 
  | 'INQUIRY' 
  | 'MOVE_REP' 
  | 'STATUS_REP';

interface InventoryManagementProps {
  initialOp?: InventoryOp;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ initialOp = 'INQUIRY' }) => {
  const [op, setOp] = useState<InventoryOp>(initialOp);
  const [step, setStep] = useState<'CRITERIA' | 'DETAILS' | 'SUCCESS'>('CRITERIA');
  const [loading, setLoading] = useState(false);
  const [invClass, setInvClass] = useState('CHQ');

  const CONFIG: Record<InventoryOp, { label: string; icon: any; shortcut: string }> = {
    AUTH: { label: 'Authoriser Management', icon: <ShieldCheck />, shortcut: 'HIMAUM' },
    MOVE: { label: 'Inventory Movement', icon: <Truck />, shortcut: 'HIMC' },
    SPLIT: { label: 'Inventory Split', icon: <Split />, shortcut: 'HISAI' },
    MERGE: { label: 'Inventory Merge', icon: <Combine />, shortcut: 'HIMAI' },
    INQUIRY: { label: 'Inventory Inquiry', icon: <Search />, shortcut: 'HIIA' },
    MOVE_REP: { label: 'Movement Report', icon: <FileText />, shortcut: 'HIMR' },
    STATUS_REP: { label: 'Status Report', icon: <BarChart3 />, shortcut: 'HISR' }
  };

  const handleGo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('DETAILS');
    }, 600);
  };

  const handleCommit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('SUCCESS');
    }, 1000);
  };

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center py-24 animate-in fade-in zoom-in-95">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 border-4 border-emerald-50">
        <CheckCircle2 size={48} className="text-emerald-600" />
      </div>
      <h3 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">Inventory Updated</h3>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Trace Reference: INV-MT-{Math.floor(Math.random() * 888888)}</p>
      <div className="flex gap-4">
        <button onClick={() => setStep('CRITERIA')} className="px-12 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl hover:bg-slate-800 transition-all">New Entry</button>
        <button className="px-12 py-4 bg-white border-2 border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
          <Printer size={16} /> Print Registry
        </button>
      </div>
    </div>
  );

  const renderCriteria = () => (
    <div className="max-w-4xl mx-auto flex flex-col gap-10">
      <div className="bg-slate-900 text-white p-10 rounded-3xl border-4 border-slate-800 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
         
         <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 border-2 border-blue-400/40">
               {React.cloneElement(CONFIG[op].icon, { size: 32 })}
            </div>
            <div>
               <h2 className="text-3xl font-black italic tracking-tighter uppercase">{CONFIG[op].label}</h2>
               <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
                     Command: {CONFIG[op].shortcut}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global SOL 001 | Vault Control</span>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Inventory Class</label>
               <select 
                 value={invClass}
                 onChange={(e) => setInvClass(e.target.value)}
                 className="bg-slate-950 border-2 border-slate-700 rounded-xl px-4 py-3.5 text-xs font-black text-blue-400 outline-none focus:border-blue-500 transition-all"
               >
                  <option value="CHQ">CHQ - CHEQUE BOOK INVENTORY</option>
                  <option value="DBC">DBC - DEBIT CARD STOCK</option>
                  <option value="DRF">DRF - DEMAND DRAFT LEAVES</option>
                  <option value="SCR">SCR - FIXED DEPOSIT SCRIPTS</option>
               </select>
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 italic">Sub-Type Code</label>
               <input 
                 type="text" 
                 placeholder="S-100..."
                 className="bg-slate-950 border-2 border-slate-700 rounded-xl px-4 py-3.5 text-xs font-mono font-black text-blue-400 outline-none focus:border-blue-500 transition-all uppercase placeholder:text-slate-800"
               />
            </div>
         </div>

         <div className="mt-12 flex justify-end relative z-10">
            <button 
               onClick={handleGo}
               className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
            >
               {loading ? 'Validating Unit...' : 'Initiate Sequence'}
               <ChevronRight size={18} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
         {[
           { label: 'Current Vault Stock', value: '45,200 Units', icon: <Database /> },
           { label: 'In-Transit Items', value: '1,500 Units', icon: <Truck /> },
           { label: 'Last Audit Date', value: '28-APR-2024', icon: <FileText /> }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col gap-4 group hover:border-blue-200 transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                 {React.cloneElement(stat.icon as any, { size: 20 })}
              </div>
              <div>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{stat.label}</span>
                 <span className="text-lg font-black text-slate-800 italic tracking-tighter uppercase">{stat.value}</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
       <div className="bg-white rounded-3xl border-4 border-slate-900 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 p-10 flex justify-between items-center text-white">
             <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl border-2 border-blue-400/30">
                   {React.cloneElement(CONFIG[op].icon, { size: 36 })}
                </div>
                <div>
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase">{CONFIG[op].label}</h2>
                   <div className="flex gap-4 mt-2">
                      <span className="text-[10px] font-black bg-white/10 px-4 py-1 rounded-full uppercase tracking-widest border border-white/10 uppercase">Class: {invClass}</span>
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                         <MapPin size={12} /> CURRENT LOCATION: MAIN VAULT [MV]
                      </span>
                   </div>
                </div>
             </div>
             <button onClick={() => setStep('CRITERIA')} className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                <X size={24} />
             </button>
          </div>

          <div className="p-12">
             <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2 space-y-10">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Starting Number</label>
                         <input type="text" placeholder="SER-000001" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all uppercase" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Quantity / Count</label>
                         <input type="number" placeholder="1000" className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all" />
                      </div>
                   </div>

                   {op === 'MOVE' && (
                     <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100 animate-in zoom-in-95">
                        <div className="flex items-center gap-4 mb-8">
                           <Truck className="text-blue-600" size={24} />
                           <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest italic">Routing Configuration</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="flex flex-col gap-2">
                              <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Target Location ID</label>
                              <select className="bg-white border-2 border-blue-200 rounded-xl px-4 py-3 text-xs font-black text-slate-800 outline-none">
                                 <option>SOL-002-BRANCH_SECONDARY</option>
                                 <option>VAULT-OFF-ONSITE_ATM</option>
                                 <option>AGENCY_HUB_NORTH</option>
                              </select>
                           </div>
                           <div className="flex flex-col gap-2">
                              <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Movement Ref</label>
                              <input type="text" placeholder="MOV-998..." className="bg-white border-2 border-blue-200 rounded-xl px-4 py-3 text-xs font-mono font-black text-slate-800 outline-none" />
                           </div>
                        </div>
                     </div>
                   )}

                   {(op === 'SPLIT' || op === 'MERGE') && (
                     <div className="bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-100 animate-in zoom-in-95">
                        <div className="flex items-center gap-4 mb-8">
                           <Combine className="text-indigo-600" size={24} />
                           <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest italic">{op} Parameters</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="flex flex-col gap-2">
                              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Sub-Batch Size</label>
                              <input type="number" defaultValue="100" className="bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-xs font-black text-slate-800 outline-none" />
                           </div>
                           <div className="flex flex-col gap-2">
                              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Destination ID</label>
                              <input type="text" placeholder="TARGET-INV..." className="bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-xs font-mono font-black text-slate-800 outline-none" />
                           </div>
                        </div>
                     </div>
                   )}

                   {op === 'AUTH' && (
                     <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 space-y-6">
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="text-slate-800" size={20} />
                           <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest italic underline decoration-slate-300 decoration-2 underline-offset-4">Authoriser Matrix</h4>
                        </div>
                        <div className="space-y-4">
                           {['USER_OPS_AUDIT_01', 'USER_SEC_CHIEF', 'SOL_MGR_001'].map((u, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                                <div className="flex items-center gap-4">
                                   <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-black text-[10px]">{i+1}</div>
                                   <span className="text-xs font-black text-slate-700">{u}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                   {i === 0 ? 'Authorized' : 'Pending Action'}
                                </span>
                             </div>
                           ))}
                        </div>
                        <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                           <Plus size={14} /> Add Additional Signatory
                        </button>
                     </div>
                   )}
                </div>

                <div className="space-y-8">
                   <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-4 italic">Inventory Summary</span>
                      <div className="space-y-6">
                         <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Total Impact</span>
                            <div className="flex items-end gap-2">
                               <span className="text-3xl font-black italic tracking-tighter">4,500</span>
                               <span className="text-[10px] font-black text-blue-500 mb-1.5 uppercase">UNITS</span>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Cost Center</span>
                               <span className="text-[11px] font-black uppercase">SOL-001</span>
                            </div>
                            <div>
                               <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Book Value</span>
                               <span className="text-[11px] font-black uppercase">$0.00 (NOM)</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white p-8 rounded-3xl border-2 border-slate-100">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Recent Log Traces</h5>
                      <div className="space-y-6">
                         {[
                           { t: 'STOCK_IN', v: '+5,000', d: '22-APR' },
                           { t: 'STOCK_MOVE', v: '-200', d: '24-APR' },
                           { t: 'DEBIT_ISSUE', v: '-1,200', d: '25-APR' }
                         ].map((log, i) => (
                           <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black text-slate-800 uppercase">{log.t}</span>
                                 <span className="text-[8px] font-bold text-slate-400">{log.d} | REF: {Math.floor(Math.random() * 999)}</span>
                              </div>
                              <span className={`text-xs font-black font-mono ${log.v.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{log.v}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-slate-50 p-12 border-t border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 border border-slate-200">
                   <Box size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ledger Balance Impact</p>
                   <p className="text-[11px] font-bold text-slate-800 uppercase">Non-Financial Control (NFC) Enabled</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button onClick={() => setStep('CRITERIA')} className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">Abort Op</button>
                <button 
                  onClick={handleCommit}
                  className="px-16 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                >
                  {loading ? 'Finalising Trace...' : 'Commit Inventory Change'}
                  <ArrowRightLeft size={16} />
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="p-8 h-full bg-slate-50 overflow-y-auto custom-scrollbar flex flex-col gap-10">
      <header className="bg-white p-10 rounded-3xl border-2 border-slate-100 shadow-sm flex justify-between items-end relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-all duration-700"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
               <span className="px-4 py-1.5 bg-blue-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-xl shadow-blue-900/20">VAULT CONTROL SYSTEM</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Truck size={12} /> TRACER STATUS: SECURE LOGIN
               </span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Inventory <span className="text-blue-600 underline underline-offset-8 decoration-4 decoration-blue-100">Management</span> Central</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-3">High-Volume Security Instrument Control Interface (HVSICI)</p>
         </div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="text-right">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Batch Ref</span>
               <span className="text-xl font-black text-slate-900 font-mono italic">INV_B_8829</span>
            </div>
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-2xl">
               <Package size={32} />
            </div>
         </div>
      </header>

      {step === 'CRITERIA' ? renderCriteria() : step === 'DETAILS' ? renderDetails() : renderSuccess()}
    </div>
  );
};

export default InventoryManagement;
