import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  UserPlus, 
  Lock, 
  BookOpen, 
  Edit3, 
  DollarSign, 
  Percent, 
  Info, 
  Users, 
  ArrowRight,
  Shield,
  Clock,
  Printer,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type MaintenanceType = 
  | 'OPEN' 
  | 'LIEN' 
  | 'CHEQUE_ISSUE' 
  | 'FREEZE' 
  | 'MODIFY' 
  | 'CHARGES' 
  | 'INTEREST' 
  | 'BAL_INQ' 
  | 'CHQ_INQ' 
  | 'JOINT_INQ' 
  | 'LEDGER_INQ';

interface AccountMaintenanceProps {
  initialType?: MaintenanceType;
  initialMode?: 'ADD' | 'MODIFY' | 'VERIFY' | 'INQUIRY';
}

const AccountMaintenance: React.FC<AccountMaintenanceProps> = ({ 
  initialType = 'OPEN', 
  initialMode = 'ADD' 
}) => {
  const [type, setType] = useState<MaintenanceType>(initialType);
  const [mode, setMode] = useState<'ADD' | 'MODIFY' | 'VERIFY' | 'INQUIRY'>(initialMode);
  const [accountNo, setAccountNo] = useState('');
  const [step, setStep] = useState<'CRITERIA' | 'DETAILS' | 'SUCCESS'>('CRITERIA');
  const [loading, setLoading] = useState(false);

  const TYPE_CONFIG: Record<MaintenanceType, { label: string; icon: any; shortcut: string }> = {
    OPEN: { label: 'Savings Account Opening', icon: <UserPlus />, shortcut: 'HOAACSB' },
    LIEN: { label: 'Lien Maintenance', icon: <Lock />, shortcut: 'HALM' },
    CHEQUE_ISSUE: { label: 'Cheque Book Issue', icon: <BookOpen />, shortcut: 'HICHB' },
    FREEZE: { label: 'Account Freeze/Unfreeze', icon: <Shield />, shortcut: 'HAFSM' },
    MODIFY: { label: 'Account Modification', icon: <Edit3 />, shortcut: 'HACM' },
    CHARGES: { label: 'Charges Maintenance', icon: <DollarSign />, shortcut: 'HGCHRG' },
    INTEREST: { label: 'Interest Rate Maintenance', icon: <Percent />, shortcut: 'HINTTM' },
    BAL_INQ: { label: 'Account Balance Inquiry', icon: <Info />, shortcut: 'HACCBALI' },
    CHQ_INQ: { label: 'Cheque Book Inquiry', icon: <BookOpen />, shortcut: 'HCHBI' },
    JOINT_INQ: { label: 'Joint Holder Inquiry', icon: <Users />, shortcut: 'HJHOLDER' },
    LEDGER_INQ: { label: 'Account Ledger Inquiry', icon: <ArrowRight />, shortcut: 'HACLI' }
  };

  const handleGo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('DETAILS');
    }, 800);
  };

  const handleCommit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('SUCCESS');
    }, 1200);
  };

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-emerald-600" />
      </div>
      <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-2">Transaction Committed</h3>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Ref: AC-{Math.floor(Math.random() * 9999999)} | SOL 001</p>
      <div className="flex gap-4">
        <button 
          onClick={() => {
            setStep('CRITERIA');
            setAccountNo('');
          }}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-xl hover:bg-slate-800 transition-all"
        >
          New Transaction
        </button>
        <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
          <Printer size={14} /> Print Advice
        </button>
      </div>
    </div>
  );

  const renderCriteria = () => (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-white p-8 rounded-2xl border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                 {React.cloneElement(TYPE_CONFIG[type].icon, { size: 28 })}
              </div>
              <div>
                 <h2 className="text-2xl font-black italic tracking-tighter text-slate-800 uppercase">{TYPE_CONFIG[type].label}</h2>
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Shortcut: {TYPE_CONFIG[type].shortcut}</span>
              </div>
           </div>
           <div className="flex bg-slate-100 p-1 rounded-lg">
              {['ADD', 'MODIFY', 'VERIFY', 'INQUIRY'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded transition-all ${mode === m ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {m}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                 Account Number / ID
              </label>
              <div className="relative group">
                 <input 
                   type="text" 
                   value={accountNo}
                   onChange={(e) => setAccountNo(e.target.value)}
                   placeholder="Enter ID..."
                   className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all uppercase"
                 />
                 <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              </div>
           </div>
           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                 SOL ID
              </label>
              <input 
                type="text" 
                defaultValue="001"
                className="w-full bg-slate-100 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-400 outline-none"
                readOnly
              />
           </div>
        </div>

        <div className="mt-10 flex justify-end">
           <button 
             onClick={handleGo}
             className="px-10 py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
           >
             {loading ? 'Processing...' : 'Proceed to Maintenance'}
             <ChevronRight size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
         {[
           { label: 'Pending Authorizations', count: 12, color: 'orange' },
           { label: 'Modified Today', count: 45, color: 'blue' },
           { label: 'Rejected Entries', count: 2, color: 'red' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col gap-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className={`text-2xl font-black italic text-${stat.color}-600 font-mono tracking-tighter`}>{stat.count.toString().padStart(2, '0')}</span>
           </div>
         ))}
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-2xl border-4 border-slate-900 overflow-hidden">
         <div className="bg-slate-900 p-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/20">
                  {React.cloneElement(TYPE_CONFIG[type].icon, { size: 32 })}
               </div>
               <div>
                  <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">{TYPE_CONFIG[type].label}</h2>
                  <div className="flex gap-3 mt-1">
                     <span className="text-[9px] font-black bg-indigo-500 text-white px-3 py-0.5 rounded-full uppercase tracking-widest">MODE: {mode}</span>
                     <span className="text-[9px] font-black bg-white/10 text-slate-400 px-3 py-0.5 rounded-full uppercase tracking-widest">ID: {accountNo || 'NEW_ENTRY'}</span>
                  </div>
               </div>
            </div>
            <button onClick={() => setStep('CRITERIA')} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
               <X size={20} />
            </button>
         </div>

         <div className="p-10">
            <div className="grid grid-cols-3 gap-10">
               {/* Primary Section */}
               <div className="col-span-2 space-y-8">
                  <div className="bg-slate-50/50 p-8 rounded-2xl border-2 border-slate-100">
                     <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <Info size={12} /> Primary Information Header
                     </h4>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Name / Title</label>
                           <input type="text" defaultValue="ALEXANDER STERLING" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer ID (CIF)</label>
                           <input type="text" defaultValue="CIF-900827" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-mono font-black text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Scheme Code</label>
                           <select className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all">
                              <option>SBBASIC - SAVINGS BASIC</option>
                              <option>SBPREM - SAVINGS PREMIUM</option>
                              <option>SBSTAFF - STAFF SAVINGS</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Currency Code</label>
                           <input type="text" defaultValue="USD" className="bg-slate-100 border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-400 outline-none" readOnly />
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50/50 p-8 rounded-2xl border-2 border-slate-100">
                     <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        {type === 'LIEN' ? <Lock size={12} /> : type === 'FREEZE' ? <Shield size={12} /> : <Edit3 size={12} />} 
                        Specific Maintenance Attributes
                     </h4>
                     
                     {type === 'LIEN' ? (
                       <div className="grid grid-cols-2 gap-6">
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lien Amount</label>
                            <input type="text" placeholder="0.00" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-mono font-black text-indigo-600 outline-none focus:border-indigo-500 transition-all" />
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expiry Date</label>
                            <input type="date" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                         </div>
                         <div className="col-span-full flex flex-col gap-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lien Reason</label>
                            <textarea placeholder="Specify legal or internal reason for lien..." className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 h-24 transition-all"></textarea>
                         </div>
                       </div>
                     ) : type === 'FREEZE' ? (
                       <div className="grid grid-cols-2 gap-6">
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Freeze Code</label>
                            <select className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all">
                               <option>D - DEBITS ONLY</option>
                               <option>C - CREDITS ONLY</option>
                               <option>T - TOTAL FREEZE</option>
                            </select>
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Legal Authority ID</label>
                            <input type="text" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                         </div>
                       </div>
                     ) : (
                       <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col gap-1.5">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secondary Stat-Code</label>
                             <input type="text" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Document Ref</label>
                             <input type="text" className="bg-white border-2 border-slate-100 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 transition-all" />
                          </div>
                       </div>
                     )}
                  </div>
               </div>

               {/* Sidebar Meta */}
               <div className="flex flex-col gap-6">
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                     <h5 className="text-[9px] font-black text-indigo-900 uppercase tracking-widest mb-4">Account Snapshot</h5>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                           <span className="text-[9px] font-bold text-indigo-400 uppercase">Available</span>
                           <span className="text-sm font-black text-indigo-900 font-mono italic">$450,230.00</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                           <span className="text-[9px] font-bold text-indigo-400 uppercase">Status</span>
                           <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded uppercase">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[9px] font-bold text-indigo-400 uppercase">Linked Cards</span>
                           <span className="text-[9px] font-black text-indigo-900 uppercase">02 ISSUED</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                     <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Audit Trace</h5>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-700">Account Created</p>
                              <span className="text-[8px] font-medium text-slate-400 uppercase">12-MAY-2021 | USER_MGT_01</span>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-700">Limit Updated</p>
                              <span className="text-[8px] font-medium text-slate-400 uppercase">14-JUN-2023 | SYS_HLMT</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-50 p-10 flex justify-between items-center border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400">
               <AlertCircle size={14} />
               <span className="text-[9px] font-bold uppercase tracking-widest underline decoration-dotted underline-offset-4 cursor-help">Policy Check Passed (AML Level 1)</span>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setStep('CRITERIA')} className="px-8 py-3 bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">Cancel</button>
               <button 
                 onClick={handleCommit}
                 className="px-16 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
               >
                 {loading ? 'Committing...' : 'Commit Transaction'}
                 <Shield size={14} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 flex flex-col gap-8 custom-scrollbar">
      <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[9px] font-black rounded-full uppercase tracking-tighter italic border border-indigo-200">SOL: 001 - METROPOLITAN</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> {new Date().toLocaleDateString('en-GB').toUpperCase()}</span>
           </div>
           <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">Account Maintenance <span className="text-indigo-600">Engine</span></h1>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Direct Core Interaction Interface (DCII/FNC)</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block">Transaction Status</span>
              <span className="text-sm font-black text-emerald-600 tracking-tighter uppercase italic">Ready to Commit</span>
           </div>
           <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield size={24} />
           </div>
        </div>
      </header>

      {step === 'CRITERIA' ? renderCriteria() : step === 'DETAILS' ? renderDetails() : renderSuccess()}
    </div>
  );
};

export default AccountMaintenance;
