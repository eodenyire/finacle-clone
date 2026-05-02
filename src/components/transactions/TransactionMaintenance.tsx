import React, { useState } from 'react';
import { Search, Calendar, User, HelpCircle, Grid, X } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function TransactionMaintenance() {
  const [formData, setFormData] = useState({
    function: 'A',
    solId: '60001700',
    txnType: 'C/NR - Cash/Normal Receipt',
    txnId: '',
    txnDate: '01-04-2014',
    functionType: 'Cash Deposit',
    accountId: '0000045182',
    accountName: 'K.PARAMASIVAM',
    amount: '',
    currency: 'INR',
    particulars: 'BY CASH DEPOSIT',
    valueDate: '01-04-2014',
    remarks: '',
    mode: 'Payment Slip', // Cheque, Withdrawal Slip, Payment Slip
    chequeNo: '',
    chequeDate: '',
    partitionId: '',
    option: 'SELECT'
  });

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="bg-[#b0c4de] px-2 py-0.5 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366]">
        <div className="flex items-center gap-1">
           <Logo variant="stacked" className="scale-75 origin-left" />
        </div>
        <div className="flex items-center gap-4">
          <span>01 April, 2014 | User BALA_CUST | 60001700 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-1.5 h-4 text-[9px] hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div className="px-2 py-0.5 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black tracking-tight">Transactions Maintenance</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      {/* Metadata Section */}
      <div className="p-2 grid grid-cols-3 gap-y-1 text-[11px] border-b border-slate-100 bg-[#fbfbfb]">
        <div className="flex">
          <span className="w-24 font-bold text-slate-700">Function</span>
          <span className="text-blue-700 font-mono">{formData.function}</span>
        </div>
        <div className="flex">
          <span className="w-24 font-bold text-slate-700">Initiating SOL ID</span>
          <span className="text-slate-900 font-mono">{formData.solId}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-bold text-slate-700">Transaction Type/Subtype</span>
          <span className="text-slate-900 font-mono font-bold">{formData.txnType}</span>
        </div>
        <div className="flex">
          <span className="w-24 font-bold text-slate-700">Transaction ID</span>
          <span className="text-slate-400 italic">Auto-generated</span>
        </div>
        <div className="flex">
          <span className="w-24 font-bold text-slate-700">Transaction Date</span>
          <span className="text-slate-900 font-mono">{formData.txnDate}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-bold text-slate-700">Function Type</span>
          <span className="text-slate-900 font-mono font-bold">{formData.functionType}</span>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="p-3">
        <div className="border border-slate-400 pb-2 bg-white relative">
          <div className="bg-[#f0f4f8] px-2 py-0.5 border-b border-slate-300 text-[10px] font-black text-blue-900">
             Transaction Status: <span className="text-emerald-700 uppercase">ENTERED</span>
          </div>

          <div className="absolute top-1 right-2 flex items-center gap-1 cursor-pointer">
             <span className="text-[9px] font-bold text-slate-500">Help</span>
             <HelpCircle size={12} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3">
             {/* Account Field */}
             <div className="flex items-center">
                <label className="w-32 text-[10px] font-bold text-slate-700">A/c. ID <span className="text-red-500 font-black">*</span></label>
                <div className="flex-1 flex items-center gap-1.5">
                   <input type="text" value={formData.accountId} className="w-48 h-5 border border-slate-300 bg-[#eef3f7] px-1 text-[11px] font-mono outline-none" />
                   <div className="flex items-center gap-1">
                      <Search size={14} className="text-blue-600 cursor-pointer" />
                      <Grid size={14} className="text-slate-400 cursor-pointer" />
                      <User size={14} className="text-red-500 cursor-pointer" />
                   </div>
                   <span className="text-[10px] text-slate-400 font-mono ml-2">{formData.currency}</span>
                   <span className="text-[10px] text-slate-300/40 ml-1">60000601</span>
                   <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase truncate">{formData.accountName}</span>
                </div>
             </div>

             {/* Particulars Field */}
             <div className="flex items-center">
                <label className="w-32 text-[10px] font-bold text-slate-700">Transaction Particulars</label>
                <input type="text" className="flex-1 h-5 border border-slate-300 text-[11px] px-1 outline-none uppercase font-mono bg-white" placeholder="BY CASH DEPOSIT" />
             </div>

             {/* Amount Field */}
             <div className="flex items-center">
                <label className="w-32 text-[10px] font-bold text-slate-700">Amt <span className="text-red-500 font-black">*</span></label>
                <div className="flex items-center gap-1">
                   <input type="text" className="w-48 h-5 border border-slate-300 px-1 text-[11px] font-mono outline-none bg-white font-bold" />
                   <span className="text-[10px] text-slate-400 font-mono px-1">INR</span>
                </div>
             </div>

             {/* Remarks Field */}
             <div className="flex items-center">
                <label className="w-32 text-[10px] font-bold text-slate-700">Remarks</label>
                <input type="text" className="flex-1 h-5 border border-slate-300 text-[11px] px-1 outline-none bg-white" />
             </div>

             {/* Value Date Field */}
             <div className="flex items-center">
                <label className="w-32 text-[10px] font-bold text-slate-700">Value Date <span className="text-red-500 font-black">*</span></label>
                <div className="flex items-center gap-1">
                   <input type="text" defaultValue="01-04-2014" className="w-48 h-5 border border-slate-300 px-1 text-[11px] font-mono outline-none bg-white" />
                   <button className="w-5 h-5 bg-slate-100 border border-slate-300 flex items-center justify-center hover:bg-white active:bg-slate-200">
                      <Calendar size={12} className="text-blue-500" />
                   </button>
                </div>
             </div>
          </div>

          {/* Cheque / Slip Section */}
          <div className="mt-2 border-t border-slate-200 relative pt-3 pb-2">
             <div className="absolute top-[-9px] left-4 bg-white px-2">
                <span className="text-[10px] font-black text-blue-700 uppercase">Cheque</span>
             </div>
             
             <div className="px-4 flex flex-col gap-3">
                <div className="flex items-center gap-6">
                   <label className="w-28 text-[10px] font-bold text-slate-700">Mode of Transaction</label>
                   <div className="flex items-center gap-4">
                      {['Cheque', 'Withdrawal Slip', 'Payment Slip'].map(mode => (
                        <label key={mode} className="flex items-center gap-1 cursor-pointer">
                           <input 
                             type="radio" 
                             name="mode" 
                             checked={formData.mode === mode} 
                             onChange={() => setFormData({...formData, mode})}
                             className="w-3 h-3 text-blue-600 focus:ring-0" 
                           />
                           <span className="text-[10px] text-slate-600 font-medium">{mode}</span>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="flex items-center">
                      <label className="w-28 text-[10px] font-bold text-slate-700">Cheque Date</label>
                      <div className="flex items-center gap-1">
                         <input type="text" className="w-48 h-5 border border-slate-300 px-1 text-[11px] font-mono outline-none" />
                         <button className="w-5 h-5 bg-slate-100 border border-slate-300 flex items-center justify-center">
                            <Calendar size={12} className="text-slate-400" />
                         </button>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4 border-b border-slate-100 pb-3 mb-1">
                   <div className="flex items-center">
                      <label className="w-28 text-[10px] font-bold text-slate-700">Cheque No.</label>
                      <div className="flex items-center gap-1">
                         <input type="text" className="w-32 h-5 border border-slate-300 px-1 text-[11px] font-mono outline-none" />
                         <input type="text" className="w-32 h-5 border border-slate-300 px-1 text-[11px] font-mono outline-none ml-1 bg-slate-50" disabled />
                      </div>
                   </div>
                </div>

                {/* Account Details / Balance Row */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-8 text-[10px] py-1">
                   <div className="flex items-center gap-2">
                       <span className="font-bold text-slate-700">Option</span>
                       <div className="flex items-center">
                          <select className="h-5 w-48 border border-slate-300 bg-white px-1 outline-none">
                             <option>SELECT</option>
                             <option>PRINT SLIP</option>
                             <option>VIEW SIGNATURE</option>
                          </select>
                          <button className="h-5 px-3 bg-slate-100 border border-slate-300 border-l-0 hover:bg-white active:bg-slate-200 font-bold text-slate-700">Go</button>
                       </div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                       <span className="font-bold text-slate-700">Partitioning A/C ID</span>
                       <input type="text" className="h-5 w-48 border border-slate-300 px-1" />
                   </div>

                   <div className="flex items-center gap-10 w-full mt-1 px-1 py-1.5 bg-slate-50/50 border-y border-slate-100">
                      <div className="flex items-baseline gap-2">
                         <span className="font-bold text-slate-400 uppercase text-[9px]">A/c Status</span>
                         <span className="font-black text-emerald-600">ACTIVE</span>
                         <span className="text-slate-300 font-mono italic ml-4">017</span>
                      </div>
                      
                      <div className="flex-1 flex justify-center gap-12">
                         <div className="flex items-center gap-6">
                            <span className="font-bold text-[#003366]">Available Balance</span>
                            <div className="flex items-center border border-orange-400 bg-white px-2 py-0.5 shadow-sm">
                               <span className="text-orange-600 font-mono font-bold mr-3 text-[9px]">INR</span>
                               <span className="text-orange-600 font-mono font-black text-base">148001.80</span>
                            </div>
                            <span className="font-bold text-[#003366]">Cr.</span>
                         </div>

                         <div className="flex items-center gap-6">
                            <span className="font-bold text-slate-700">Effective Available Balance</span>
                            <div className="flex items-center text-slate-600 font-mono font-bold">
                               <span className="mr-3 text-[9px]">INR</span>
                               <span className="text-sm">148001.80</span>
                            </div>
                            <span className="font-bold text-slate-700">Cr.</span>
                         </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                         <span className="font-bold text-slate-400 uppercase text-[9px]">Pan Number</span>
                         <span className="text-slate-300 italic font-mono">-</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {['Validate', 'Post', 'Cancel'].map(btn => (
            <button 
              key={btn}
              className={`
                px-5 h-6 text-[11px] font-bold shadow-sm transition-all border
                ${btn === 'Post' ? 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700' : 'bg-slate-100 border-slate-400 text-[#003366] hover:bg-white active:bg-slate-200'}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold relative overflow-hidden group">
        <span className="relative z-10">Done</span>
        {/* Background PT Logo as seen in screenshot */}
        <div className="absolute right-[-10px] bottom-[-20px] text-blue-900/10 font-bold italic text-8xl pointer-events-none select-none tracking-tighter">pt</div>
      </div>
    </div>
  );
}
