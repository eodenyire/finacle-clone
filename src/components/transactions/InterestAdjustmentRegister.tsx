import React, { useState } from 'react';
import { HelpCircle, X, Plus, Trash2, Calendar } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function InterestAdjustmentRegister() {
  const [formData, setFormData] = useState({
    function: 'M',
    acId: '0163090591',
    solId: '56000100',
    acSolId: '60001700',
    ccy: 'INR',
    adjAmtCcy: 'INR',
    type: 'ACCNT'
  });

  const [entries, setEntries] = useState([
    { adjAmt: '43.00', drCr: 'Debit', runInd: 'C', applicableFrom: '', remarks: 'DAILY_FACTOR_INT_CORRECTION', sm: 'M', appStat: 'N', txnDate: '', txnId: '' }
  ]);

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="bg-[#b0c4de] px-2 py-0.5 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366]">
        <div className="flex items-center">
           <Logo variant="stacked" className="scale-75 origin-left" />
        </div>
        <div className="flex items-center gap-4">
          <span>01 January, 2015 | User LITEADMIN | 60001700 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-1.5 h-4 hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      <div className="px-2 py-1 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black px-1 uppercase tracking-tight">Interest Adjustment Register Maintenance</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      {/* Form Metadata */}
      <div className="p-4 grid grid-cols-2 gap-4 text-[11px] bg-[#fdfdfd]">
         <div className="flex flex-col gap-1.5">
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">Function</span>
               <span className="flex-1 font-mono">{formData.function}</span>
            </div>
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">A/c./Bill/Disbursement ID</span>
               <span className="flex-1 font-mono">{formData.acId}</span>
            </div>
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">SOL ID</span>
               <span className="flex-1 font-mono">{formData.solId}</span>
            </div>
         </div>

         <div className="flex flex-col gap-1.5">
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">A/c./Bill/Disbursement</span>
               <span className="flex-1 font-mono">A <span className="ml-8 text-slate-400 uppercase">{formData.type}</span></span>
            </div>
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">CCY</span>
               <span className="flex-1 font-mono">{formData.ccy}</span>
            </div>
            <div className="flex bg-neutral-50 p-1">
               <span className="w-40 font-bold text-[#003366]">Adjust Amt. CCY</span>
               <span className="flex-1 font-mono">{formData.adjAmtCcy}</span>
            </div>
         </div>
      </div>

      {/* Grid Section */}
      <div className="p-2">
         <div className="border border-slate-300">
            <div className="bg-[#e7eff7] h-6 flex items-center justify-between px-2 border-b border-slate-300">
               <button className="flex items-center gap-1 px-3 h-5 bg-white border border-slate-300 text-[10px] font-bold text-blue-800 hover:bg-slate-50">
                  <Plus size={10} /> Add
               </button>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-900">
                     <HelpCircle size={12} className="text-blue-500 fill-white" />
                     <span>Records 1 to {entries.length} of {entries.length}</span>
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-[10px] border-collapse min-w-[1000px]">
                  <thead>
                     <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-300">
                        <th className="px-2 py-1 text-left border-r border-slate-200">Adjusted Amt.</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Debit/Credit Interest</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Run Indicator</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Applicable From Date</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Remarks</th>
                        <th className="px-1 py-1 text-center border-r border-slate-200">S/M</th>
                        <th className="px-1 py-1 text-center border-r border-slate-200">App Stat</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Transaction Date</th>
                        <th className="px-2 py-1 text-left border-r border-slate-200">Transaction ID</th>
                        <th className="px-1 py-1 text-center">Del.</th>
                     </tr>
                  </thead>
                  <tbody>
                     {entries.map((item, i) => (
                        <tr key={i} className="border-b border-slate-200 hover:bg-blue-50/30">
                           <td className="p-1 border-r border-slate-200">
                              <input type="text" value={item.adjAmt} className="w-full h-5 border border-slate-300 px-1 outline-none font-mono" readOnly />
                           </td>
                           <td className="p-1 border-r border-slate-200">
                              <select className="w-full h-5 border border-slate-300 px-1 outline-none bg-white">
                                 <option>Debit</option>
                                 <option>Credit</option>
                              </select>
                           </td>
                           <td className="p-1 border-r border-slate-200">
                              <select className="w-full h-5 border border-slate-300 px-1 outline-none bg-white">
                                 <option>Credit</option>
                                 <option>Normal</option>
                              </select>
                           </td>
                           <td className="p-1 border-r border-slate-200">
                              <input type="text" className="w-full h-5 border border-slate-300 px-1 outline-none" />
                           </td>
                           <td className="p-1 border-r border-slate-200">
                              <input type="text" value={item.remarks} className="w-full h-5 border border-slate-300 px-1 outline-none uppercase font-mono italic text-[9px]" readOnly />
                           </td>
                           <td className="p-1 border-r border-slate-200 text-center font-bold text-blue-900">{item.sm}</td>
                           <td className="p-1 border-r border-slate-200 text-center font-bold text-blue-900">{item.appStat}</td>
                           <td className="p-1 border-r border-slate-200"></td>
                           <td className="p-1 border-r border-slate-200"></td>
                           <td className="p-1 text-center">
                              <input type="checkbox" className="w-3 h-3 text-red-600 rounded-sm" />
                           </td>
                        </tr>
                     ))}
                     {/* Data Entry Row as seen in UI */}
                     <tr className="bg-slate-50/50">
                        <td className="p-1 border-r border-slate-200">
                           <input type="text" className="w-full h-5 border border-slate-300 px-1 outline-none bg-white" placeholder="0.00" />
                        </td>
                        <td className="p-1 border-r border-slate-200">
                           <select className="w-full h-5 border border-slate-300 px-1 outline-none bg-white">
                              <option>Debit</option>
                              <option>Credit</option>
                           </select>
                        </td>
                        <td className="p-1 border-r border-slate-200">
                           <select className="w-full h-5 border border-slate-300 px-1 outline-none bg-white">
                              <option>Credit</option>
                           </select>
                        </td>
                        <td className="p-1 border-r border-slate-200 flex items-center gap-1">
                           <input type="text" className="flex-1 h-5 border border-slate-300 px-1 outline-none bg-white" />
                           <Calendar size={12} className="text-blue-500" />
                        </td>
                        <td className="p-1 border-r border-slate-200">
                           <input type="text" className="w-full h-5 border border-slate-300 px-1 outline-none bg-white" />
                        </td>
                        <td colSpan={5} className="bg-slate-200 h-5"></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-2">
         <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm">Submit</button>
         <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm">Cancel</button>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
