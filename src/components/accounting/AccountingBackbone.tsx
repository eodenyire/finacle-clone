import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Globe, 
  ArrowRightLeft, 
  BarChart, 
  History, 
  ShieldCheck, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function AccountingBackbone() {
  const [activeLedger, setActiveLedger] = useState<'GL' | 'MCY'>('GL');

  const glAccounts = [
    { code: '1000100', name: 'Cash in Vault - USD', balance: '$45,200,900', status: 'SYNCHED', branch: 'MAIN-01' },
    { code: '2001040', name: 'Inter-Bank Settlement A/c', balance: '$12,400,000', status: 'SYNCHED', branch: 'GLOBAL' },
    { code: '3005088', name: 'Interest Payable - Retail', balance: '$2,100,450', status: 'PENDING', branch: 'MAIN-01' },
    { code: '5002011', name: 'Suspense A/c - Clearing', balance: '$145,000', status: 'RECONCILING', branch: 'REG-02' },
  ];

  const exchangeRates = [
    { pair: 'USD/EUR', rate: '0.9234', trend: '+0.02%', oracle: 'REUTERS-MID', status: 'LIVE' },
    { pair: 'USD/GBP', rate: '0.7851', trend: '-0.15%', oracle: 'BLOOMBERG', status: 'LIVE' },
    { pair: 'USD/JPY', rate: '154.22', trend: '+0.44%', oracle: 'BANK-INTERNAL', status: 'STALE' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden">
      <header className="bg-slate-900 p-8 text-white">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <BookOpen className="text-blue-400" size={24} />
               <h1 className="text-2xl font-black italic tracking-tighter uppercase">Accounting Backbone</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Institutional Ledger & Multi-Currency Engine</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveLedger('GL')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeLedger === 'GL' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              General Ledger
            </button>
            <button 
              onClick={() => setActiveLedger('MCY')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeLedger === 'MCY' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Multi-Currency
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeLedger === 'GL' ? (
            <motion.div 
              key="gl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Total Assets', val: '$512.4M', color: 'blue' },
                   { label: 'Total Liabilities', val: '$440.1M', color: 'slate' },
                   { label: 'Net Equity', val: '$72.3M', color: 'emerald' },
                 ].map((card, i) => (
                   <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{card.label}</span>
                      <span className="text-2xl font-mono font-black text-slate-800 italic">{card.val}</span>
                   </div>
                 ))}
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <History size={14} className="text-blue-600" />
                    Trial Balance Inquiry
                  </h3>
                  <button className="px-4 py-1.5 bg-slate-50 border border-slate-200 text-[9px] font-black uppercase rounded hover:bg-slate-100 transition-all">Print EOD Journal</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">GL Code</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Description</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Effective Balance</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {glAccounts.map((acc, i) => (
                      <tr key={i} className="border-t border-slate-50 hover:bg-blue-50/30">
                        <td className="px-6 py-4 font-mono font-bold text-blue-600 underline cursor-pointer">{acc.code}</td>
                        <td className="px-6 py-4 font-black text-slate-700">{acc.name}</td>
                        <td className="px-6 py-4 font-mono font-bold">{acc.balance}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                            acc.status === 'SYNCHED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {acc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
               key="mcy"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Globe size={14} className="text-blue-600" />
                       Oracle Exchange Rates
                    </h3>
                    <div className="p-1 px-3 bg-red-100 text-red-600 text-[8px] font-black rounded-full animate-pulse">LIVE FEED ACTIVE</div>
                  </div>
                  <div className="space-y-4">
                    {exchangeRates.map((rate, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm font-mono font-black text-xs">{rate.pair}</div>
                          <div>
                            <span className="block text-[14px] font-mono font-black text-slate-800">{rate.rate}</span>
                            <span className={`text-[9px] font-black ${rate.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{rate.trend}</span>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="block text-[8px] text-slate-400 font-black uppercase tracking-tight">{rate.oracle}</span>
                           <span className={`text-[9px] font-black ${rate.status === 'LIVE' ? 'text-emerald-500' : 'text-amber-500'}`}>{rate.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 blur-3xl -mb-24 -mr-24"></div>
                    <ArrowRightLeft className="text-blue-100/30 mb-4" size={40} />
                    <h4 className="text-xl font-black italic tracking-tighter mb-2">Currency Revaluation Engine</h4>
                    <p className="text-[11px] text-blue-100 font-medium leading-relaxed mb-6 opacity-80 italic">
                      Automated mark-to-market processing for foreign currency denominated assets. Current system deviation tolerance: 0.05%.
                    </p>
                    <button className="w-full py-3 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all">Manual Synchronization</button>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                     <AlertCircle className="text-amber-500 shrink-0" size={24} />
                     <p className="text-[10px] text-slate-500 font-bold leading-tight italic">
                       JPY position exceeds variance threshold. Treasury intervention suggested before EOD settlement.
                     </p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
