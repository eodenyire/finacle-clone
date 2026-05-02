import React from 'react';
import { X } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function CustomerDetailsInquiry() {
  const data = {
    cifId: '027981377',
    accountNumber: '348234617',
    aadhaar: 'NOT AVAILABLE',
    mobile: '0701000282',
    pan: 'ABCDE1234N',
    pmjby: 'NOT REGISTERED',
    pmsby: 'NOT REGISTERED'
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none">
      {/* Header Banner */}
      <div className="bg-[#b0c4de] px-2 py-0.5 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366]">
        <div className="flex items-center">
           <Logo variant="stacked" className="scale-75 origin-left" />
        </div>
        <div className="flex items-center gap-4">
          <span>09 June, 2017 | User SUNNYDAYALK | 50001805 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-1.5 h-4 text-[9px] hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div className="px-2 py-0.5 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black tracking-tight">Custom Menu for Inquiry of Customer Details</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      {/* Readonly Info Row */}
      <div className="p-3 bg-[#fbfbfb] border-b border-slate-100 grid grid-cols-2 text-[11px]">
        <div className="flex gap-4">
          <span className="font-bold text-slate-700">CIF ID</span>
          <span className="text-slate-900 font-mono font-bold tracking-widest">{data.cifId}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-bold text-slate-700">Account Number</span>
          <span className="text-slate-900 font-mono font-bold tracking-widest">{data.accountNumber}</span>
        </div>
      </div>

      {/* Results Box */}
      <div className="p-4">
        <div className="border border-slate-400 p-8 shadow-[inset_0_0_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-2 max-w-2xl">
            {[
              { label: 'AADHAAR Card', value: data.aadhaar },
              { label: 'Mobile Number', value: data.mobile },
              { label: 'PAN Card', value: data.pan },
              { label: 'PMJBY', value: data.pmjby },
              { label: 'PMSBY', value: data.pmsby },
            ].map(item => (
              <div key={item.label} className="flex items-center">
                <label className="w-48 text-[11px] font-bold text-[#003366] uppercase tracking-tight">{item.label}</label>
                <div className="flex-1 h-6 border border-slate-300 bg-white px-2 flex items-center shadow-inner">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-6 px-4 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm">
          OK
        </button>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
