import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  X, 
  Search, 
  Fingerprint, 
  Printer, 
  AlertCircle,
  FileText,
  CreditCard,
  User,
  ShieldCheck,
  RefreshCcw,
  Plus
} from 'lucide-react';

export default function ChequeBookIssue() {
  const [acctNo, setAcctNo] = useState('');
  const [step, setStep] = useState<'IDLE' | 'FETCHED' | 'PROCESS'>('IDLE');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFetch = () => {
     if (!acctNo) return;
     setIsVerifying(true);
     setTimeout(() => {
        setIsVerifying(false);
        setStep('FETCHED');
     }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfdfe] font-sans selection:bg-indigo-100 italic">
      {/* Header */}
      <div className="bg-slate-950 px-8 py-5 flex justify-between items-center border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <BookOpen size={20} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.25em]">Cheque Book Issuance Maintenance <span className="text-indigo-400 font-mono">[HICHBA]</span></h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Instrument Inventory Control & Dispatch</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vault Online</span>
           </div>
           <button className="w-10 h-10 hover:bg-red-500/20 text-slate-500 hover:text-red-500 transition-all rounded-xl flex items-center justify-center border border-transparent hover:border-red-500/20">
              <X size={20} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8">
        
        {/* Account Search */}
        <div className="max-w-4xl mx-auto">
           <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden">
              <div className="p-8 lg:p-12 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Number (Debit Source)</label>
                       <div className="relative group">
                          <input 
                            type="text" 
                            value={acctNo}
                            onChange={(e) => setAcctNo(e.target.value)}
                            placeholder="e.g. 500109928172" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono" 
                          />
                          <Fingerprint className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                       </div>
                    </div>
                    <button 
                      onClick={handleFetch}
                      className="h-[60px] bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
                    >
                      {isVerifying ? <RefreshCcw size={18} className="animate-spin text-indigo-400" /> : <Search size={18} />}
                      {isVerifying ? 'Validating Signature...' : 'Fetch Account Data'}
                    </button>
                 </div>

                 {step === 'FETCHED' && (
                   <div className="animate-in slide-in-from-top-4 duration-500 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 border border-slate-100">
                            <User size={20} />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Customer Name</p>
                            <p className="text-xs font-black text-slate-800 uppercase italic">Vikram Malhotra</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 border border-slate-100">
                            <CreditCard size={20} />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Scheme Code</p>
                            <p className="text-xs font-black text-slate-800 uppercase italic">SBGEN - Savings Gen</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-400 border border-slate-100">
                            <ShieldCheck size={20} />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">A/c Status</p>
                            <p className="text-xs font-black text-emerald-600 uppercase italic">Authenticated</p>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {step === 'FETCHED' && (
           <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl p-8 lg:p-12">
                 <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <FileText size={14} /> Issuance Parameters
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Type of Cheque Book</label>
                       <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500">
                          <option>Normal - 25 Leaves</option>
                          <option>Express - 10 Leaves</option>
                          <option>Premium - 50 Leaves</option>
                          <option>Institutional - 100 Leaves</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Begin Cheque Alpha</label>
                       <input type="text" placeholder="e.g. AB" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500 uppercase font-mono" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Starting Number</label>
                       <input type="text" placeholder="000001" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-indigo-500 font-mono shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Collect Charges?</label>
                       <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                             <input type="radio" name="charges" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                             <span className="text-[10px] font-black text-slate-600 uppercase">Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                             <input type="radio" name="charges" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                             <span className="text-[10px] font-black text-slate-600 uppercase">No (Waiver)</span>
                          </label>
                       </div>
                    </div>
                 </div>
                 
                 <div className="mt-12 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex gap-4 items-start">
                    <AlertCircle className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                       <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Inventory Conflict Warning</h4>
                       <p className="text-[10px] font-bold text-amber-800/70 mt-1 leading-relaxed uppercase tracking-tight">
                          Issuing this document will mark current inventory as 'COMMITTED'. Verification by a Grade-II officer is required for final leaf activation.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="flex justify-end gap-4">
                 <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Clear Form</button>
                 <button className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center gap-3">
                    <Plus size={16} /> Finalize Issuance
                 </button>
              </div>
           </div>
        )}
      </div>

      <div className="bg-slate-900 py-3 px-8 flex justify-between items-center">
         <div className="flex gap-8">
            <div className="flex items-center gap-2">
               <HelpCircle size={14} className="text-indigo-400" />
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">F1: Signature Help</span>
            </div>
            <div className="flex items-center gap-2">
               <Printer size={14} className="text-slate-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">F6: Print Advise</span>
            </div>
         </div>
         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            System Time: {new Date().toLocaleTimeString()}
         </span>
      </div>
    </div>
  );
}
