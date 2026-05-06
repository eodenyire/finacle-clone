import React, { useState } from 'react';
import { 
  Banknote, 
  ArrowLeftRight, 
  X, 
  Search, 
  RefreshCcw, 
  ShieldCheck, 
  Save, 
  Printer, 
  ChevronRight, 
  Info,
  Calendar,
  CreditCard,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  History,
  FileSearch,
  Repeat,
  Coins,
  ShieldAlert
} from 'lucide-react';

export type TxnMode = 
  | 'CASH_DEP' 
  | 'CASH_WD' 
  | 'TRANSFER' 
  | 'MAINTENANCE' 
  | 'REVERSAL' 
  | 'INQUIRY' 
  | 'FIND_INQUIRY' 
  | 'REPORT' 
  | 'ID_REPORT';

interface TransactionManagerProps {
  mode: TxnMode;
}

export default function TransactionManager({ mode }: TransactionManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  const [txnData, setTxnData] = useState({
    accountId: '',
    amount: '',
    currency: 'USD',
    remarks: '',
    txnId: '',
    valueDate: getTodayStr()
  });

  const getTitle = () => {
    switch (mode) {
      case 'CASH_DEP': return 'Cash Deposit Transaction [HCASHDEP]';
      case 'CASH_WD': return 'Cash Withdrawal Transaction [HCASHWD]';
      case 'TRANSFER': return 'Account Transfer [HXFER]';
      case 'MAINTENANCE': return 'Transaction Maintenance [HTM]';
      case 'REVERSAL': return 'Transaction Reversal [HCRT]';
      case 'INQUIRY': return 'Transaction Inquiry [HTI]';
      case 'FIND_INQUIRY': return 'identifying Financial Txn [HFTI]';
      case 'REPORT': return 'Transaction Report Gen [HFTR]';
      case 'ID_REPORT': return 'Transaction ID Report [GTID]';
      default: return 'Transaction Management';
    }
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans selection:bg-emerald-100 italic">
      {/* Header */}
      <div className="bg-[#064e3b] px-10 py-6 flex justify-between items-center shadow-2xl border-b border-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-300 border border-white/10 backdrop-blur-md">
              <Banknote size={24} strokeWidth={2.5} />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase tracking-[0.25em] leading-tight">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1 opacity-80 italic">Real-Time Core Ledger Transaction Engine</p>
           </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="hidden md:flex flex-col items-end border-r border-emerald-800 pr-6 mr-6">
              <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest leading-none">Status: Ledger Link Active</span>
              <span className="text-[8px] font-bold text-emerald-500 uppercase mt-1">Node: TXN_GATEWAY_01</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-emerald-800 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Main Entry Terminal */}
        <div className="bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
           
           <div className="relative space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Account / Ledger ID</label>
                    <div className="relative">
                       <input 
                         type="text" 
                         placeholder="ID-99281726" 
                         className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-emerald-600 font-mono shadow-inner italic uppercase" 
                       />
                       <CreditCard size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Transaction Amount</label>
                    <div className="relative">
                       <input 
                         type="number" 
                         placeholder="0.00" 
                         className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-emerald-700 outline-none focus:border-emerald-600 font-mono shadow-sm italic" 
                       />
                       <Coins size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Value Date</label>
                    <div className="relative">
                       <input 
                         type="date" 
                         value={txnData.valueDate}
                         onChange={(e) => setTxnData({ ...txnData, valueDate: e.target.value })}
                         className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-emerald-600 font-mono shadow-inner italic" 
                       />
                       <Calendar size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Currency ISO</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-emerald-600 appearance-none cursor-pointer italic">
                       <option>USD - US Dollar</option>
                       <option>EUR - Euro</option>
                       <option>GBP - British Pound</option>
                       <option>INR - Indian Rupee</option>
                    </select>
                 </div>

                 {(mode === 'REVERSAL' || mode === 'INQUIRY' || mode === 'MAINTENANCE') && (
                    <div className="space-y-4 lg:col-span-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Financial Transaction Reference (FTID)</label>
                       <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="FT100293881172" 
                            className="flex-1 bg-white border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-indigo-900 outline-none focus:border-emerald-600 font-mono italic uppercase" 
                          />
                          <button 
                            onClick={handleProcess}
                            className={`h-[68px] px-12 rounded-[1.5rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 group ${
                              mode === 'REVERSAL' ? 'bg-rose-900 hover:bg-rose-950' : 'bg-slate-900 hover:bg-black'
                            } text-white`}
                          >
                             {isProcessing ? <RefreshCcw size={20} className="animate-spin" /> : mode === 'REVERSAL' ? <ShieldAlert size={20} /> : <FileSearch size={20} />}
                             {isProcessing ? 'SCANNING...' : mode === 'REVERSAL' ? 'ABORT & REVERSE' : 'IDENTIFY DATA'}
                          </button>
                       </div>
                    </div>
                 )}

                 {(mode === 'CASH_DEP' || mode === 'CASH_WD' || mode === 'TRANSFER') && (
                    <div className="lg:col-span-3 pt-6 flex justify-end">
                       <button 
                         onClick={handleProcess}
                         className="h-[68px] px-16 bg-emerald-800 text-white rounded-[2rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-900 transition-all shadow-2xl active:scale-95 group"
                       >
                          {isProcessing ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} />}
                          {isProcessing ? 'COMMITING TO LEDGER...' : 'EXECUTE TRANSACTION'}
                       </button>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Workflow Confirmation / Results Area */}
        {showConfirmation && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
             
             {/* Primary Advice / Receipt */}
             <div className="lg:col-span-3 bg-white rounded-[4rem] p-12 border-2 border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                   <div className="space-y-12">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
                            <CheckCircle2 size={32} />
                         </div>
                         <div>
                            <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">TXN_S_991827</h2>
                            <p className="text-[11px] font-black tracking-[0.3em] text-emerald-600 uppercase mt-2">Core Ledger Confirmation Advice</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Auth Status</span>
                            <span className="text-xl font-black italic text-emerald-600 uppercase">Success</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">A/c Balance</span>
                            <span className="text-xl font-black italic text-slate-800">$ 4,210.00</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Voucher No</span>
                            <span className="text-xl font-black italic text-slate-800 underline">V_9918</span>
                         </div>
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Server Time</span>
                            <span className="text-xl font-black italic text-slate-500 uppercase">17:02:44</span>
                         </div>
                      </div>

                      <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-6">
                         <button className="flex items-center gap-3 px-8 py-4 bg-emerald-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:bg-black active:scale-95 italic">
                            <Printer size={18} /> Print Teller Advice
                         </button>
                         <button className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic hover:bg-slate-200">
                            <Save size={18} /> Export as ISO8583
                         </button>
                      </div>
                   </div>

                   <div className="w-full md:w-80 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 shadow-inner italic">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-3">Vault Allocation</h4>
                      <div className="space-y-5">
                         {[
                           { lbl: 'Denom_20', qty: '10' },
                           { lbl: 'Denom_50', qty: '05' },
                           { lbl: 'Denom_100', qty: '20' },
                         ].map((d, i) => (
                           <div key={i} className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                              <span className="text-[9px] font-black text-slate-500 uppercase">{d.lbl}</span>
                              <span className="text-[11px] font-black italic text-emerald-700">x{d.qty}</span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-8 p-4 bg-emerald-100 rounded-2xl flex items-center justify-center gap-4 text-emerald-900 border border-emerald-200">
                         <ShieldCheck size={20} className="shrink-0" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Sig Verified</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Side Insights */}
             <div className="space-y-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                   <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 italic">Recent Node Pulse</h3>
                   <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-default italic">
                           <div>
                              <p className="text-[10px] font-black leading-none mb-1">FTID_99210{i}</p>
                              <span className="text-[8px] font-bold text-slate-500 uppercase">17:00:22</span>
                           </div>
                           <span className="text-[8px] font-black text-emerald-400">SYNC</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-6 py-3 text-[9px] font-black text-emerald-400 tracking-[0.2em] uppercase italic flex items-center justify-center gap-2">
                      Full History <History size={14} />
                   </button>
                </div>

                <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] space-y-4 shadow-sm shadow-emerald-900/10">
                   <AlertCircle className="text-emerald-700" size={24} />
                   <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest italic">Compliance Notice</h4>
                   <p className="text-[9px] font-bold text-emerald-800/60 uppercase leading-tight italic tracking-tight underline cursor-pointer hover:text-emerald-900 transition-colors">Anti-Money Laundering (AML) threshold checks cleared for this operation volume.</p>
                </div>
             </div>

          </div>
        )}

      </div>

      {/* Persistence Strip */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.25em] italic uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> PKI_256_ACTIVE</span>
            <span className="flex items-center gap-2"><ArrowLeftRight size={12} /> SYNC: GLOBAL_CORE</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-emerald-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></div> TRANSACTION_HUB_ONLINE</span>
            <span className="text-slate-200 px-3">|</span>
            <span>OPR: JS_9921</span>
            <span className="text-slate-200 px-3">|</span>
            <span>SOL: 5001</span>
         </span>
      </div>
    </div>
  );
}
