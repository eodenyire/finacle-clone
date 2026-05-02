import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  X, 
  Calendar, 
  ArrowRightLeft, 
  Filter, 
  Printer, 
  Download, 
  RefreshCcw,
  Database,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Info
} from 'lucide-react';

const MOCK_GL_TXNS = [
  { id: 'TXN-99082', date: '22-JUN-2015', type: 'Credit', amt: '150,000.00', ref: 'SB-GEN-DEP', desc: 'GL Internal Transfer SB-GEN' },
  { id: 'TXN-99083', date: '22-JUN-2015', type: 'Debit', amt: '25,000.00', ref: 'GL-CHRG-REV', desc: 'Charge Reversal Adj' },
  { id: 'TXN-99084', date: '21-JUN-2015', type: 'Credit', amt: '4,500.00', ref: 'SB-STAFF-INT', desc: 'Staff Interest Accrual' },
  { id: 'TXN-99085', date: '20-JUN-2015', type: 'Debit', amt: '200,000.00', ref: 'LMT-COLL-ADJ', desc: 'Collateral Release Posting' },
];

export default function GLTransactionInquiry() {
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleInquiry = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans selection:bg-blue-100">
      {/* Header Banner */}
      <div className="bg-[#003366] px-6 py-4 flex justify-between items-center shadow-lg border-b border-blue-900">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-200 backdrop-blur-sm">
              <ArrowRightLeft size={20} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">GL Transaction Ledger Inquiry <span className="text-blue-400">[HIOGLT]</span></h1>
              <p className="text-[9px] font-bold text-blue-300 uppercase tracking-widest leading-none mt-1">Real-time Accounting Ledger Access Layer</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4 text-[9px] text-blue-100 font-bold uppercase tracking-tight">
              <span>Branch: 5001</span>
              <span>Node: PRD_TXN_01</span>
           </div>
           <button className="w-8 h-8 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center text-white transition-all">
              <X size={16} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Search Criteria Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 relative">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Filter size={14} className="text-blue-600" /> Search Parameters
             </span>
             <div className="flex gap-4">
                <HelpCircle size={16} className="text-slate-400" />
             </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Sub-Head Code</label>
               <input type="text" placeholder="10100" className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-600 font-mono shadow-inner" />
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Value Date Range</label>
               <div className="flex items-center gap-2">
                  <input type="text" placeholder="From" className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-600 font-mono" />
                  <Calendar size={14} className="text-slate-300" />
                  <input type="text" placeholder="To" className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-600 font-mono" />
               </div>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Currency</label>
               <select className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:border-blue-600">
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
               </select>
            </div>
            <div className="space-y-1 flex items-end">
               <button 
                  onClick={handleInquiry}
                  className="w-full py-3 bg-[#003366] text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-xl hover:bg-[#002244] shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                  {isSearching ? <RefreshCcw size={16} className="animate-spin" /> : <Search size={16} />}
                  {isSearching ? 'Fetching...' : 'Inquire'}
               </button>
            </div>
          </div>
        </div>

        {/* Results View */}
        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                {/* Stats Summary Bar */}
                <div className="bg-slate-900 p-6 flex flex-wrap gap-12 text-white">
                   <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-widest mb-1">Total Credits</span>
                      <span className="text-lg font-black text-emerald-400 font-mono tracking-tighter italic">1,604,500.00</span>
                      <div className="h-1 w-12 bg-emerald-400/20 rounded mt-2"></div>
                   </div>
                   <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-widest mb-1">Total Debits</span>
                      <span className="text-lg font-black text-rose-400 font-mono tracking-tighter italic">225,000.00</span>
                      <div className="h-1 w-12 bg-rose-400/20 rounded mt-2"></div>
                   </div>
                   <div className="ml-auto flex gap-3 self-center">
                      <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10 group">
                         <Printer size={18} className="text-blue-200 group-hover:scale-110 transition-transform" />
                      </button>
                      <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10 group">
                         <Download size={18} className="text-blue-200 group-hover:scale-110 transition-transform" />
                      </button>
                   </div>
                </div>

                {/* Main Table */}
                <div className="p-2">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Txn Identity</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Value Date</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Category</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount (INR)</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Ref / Narration</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Dr/Cr</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50 italic">
                            {MOCK_GL_TXNS.map((txn, i) => (
                               <tr key={i} className="group hover:bg-blue-50/50 transition-all cursor-pointer">
                                  <td className="px-8 py-6">
                                     <span className="text-[11px] font-mono font-black text-slate-800">{txn.id}</span>
                                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">SEQ: {1000 + i}</span>
                                  </td>
                                  <td className="px-8 py-6 text-[10px] font-black text-slate-600">{txn.date}</td>
                                  <td className="px-8 py-6">
                                     <span className="text-[9px] font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200 uppercase">General</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className={`text-[13px] font-mono font-black ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>{txn.amt}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{txn.desc}</p>
                                     <p className="text-[9px] font-bold text-slate-400 mt-1">{txn.ref}</p>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                     {txn.type === 'Credit' ? (
                                       <div className="flex items-center justify-end gap-2 text-emerald-600 font-black text-[10px]">
                                          CR <ArrowUpRight size={14} strokeWidth={3} />
                                       </div>
                                     ) : (
                                       <div className="flex items-center justify-end gap-2 text-rose-600 font-black text-[10px]">
                                          DR <ArrowDownLeft size={14} strokeWidth={3} />
                                       </div>
                                     )}
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Table Footer */}
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <span>Showing 04 of 244 Identity Records</span>
                   <div className="flex gap-4">
                      <button className="hover:text-blue-600 transition-colors">First</button>
                      <button className="hover:text-blue-600 transition-colors">Previous</button>
                      <span className="text-slate-800">01 / 61</span>
                      <button className="hover:text-blue-600 transition-colors flex items-center gap-1">Next <ChevronRight size={12} /></button>
                      <button className="hover:text-blue-600 transition-colors">Last</button>
                   </div>
                </div>
             </div>

             <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4 items-start">
                   <Info className="text-blue-500 shrink-0" size={20} />
                   <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest italic">Ledger Snapshot Integrity</h4>
                      <p className="text-[10px] font-bold text-blue-700 leading-relaxed opacity-80">
                         All transactions displayed have been verified against the consensus core ledger. Unposted or pending transactions are excluded from this view. Use HTM for real-time unverified monitoring.
                      </p>
                   </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-3xl flex flex-col justify-center items-center text-center group transition-all hover:bg-black">
                   <Database className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                   <h5 className="text-[10px] font-black text-white uppercase italic tracking-widest">Reconcile Vault</h5>
                   <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Manual node trigger</p>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto h-8 bg-white border-t border-slate-200 flex items-center px-8 text-[9px] text-slate-400 font-bold">
        <span className="animate-pulse">●</span> <span className="ml-2 uppercase tracking-widest">System Latency: 42ms | Cluster: ASIA_04 | SOL: 5001</span>
      </div>
    </div>
  );
}
