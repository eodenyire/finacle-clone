import React from 'react';
import { Info, ShieldAlert, Monitor } from 'lucide-react';

export default function LoginInfo({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white font-sans select-none p-4">
      <div className="max-w-4xl mx-auto w-full">
        {/* Info Banner */}
        <div className="bg-white border border-slate-300 p-2 mb-4 flex items-center gap-3 shadow-sm rounded-sm">
           <Info size={18} className="text-blue-500" />
           <span className="text-[11px] font-bold text-slate-800">Your password will expire after 68 days</span>
        </div>

        {/* Previous Login Info Section */}
        <div className="border border-slate-300 rounded-sm overflow-hidden mb-6">
           <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-slate-300">
              <h2 className="text-[11px] font-bold text-blue-900 flex items-center gap-2">
                 <Monitor size={14} /> Last Successful Login Information
              </h2>
           </div>
           <div className="p-4 grid grid-cols-2 gap-4 bg-white text-[10px]">
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500 font-bold">Last login time</span>
                    <span className="font-mono text-slate-900">31-Mar-2016 10:38:08</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500 font-bold">Last logout time</span>
                    <span className="font-mono text-slate-900">31-Mar-2016 10:38:35</span>
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500 font-bold">Client machine</span>
                    <span className="font-mono text-slate-900 italic">172.18.132.140</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Failed Login Info Section */}
        <div className="border border-slate-300 rounded-sm overflow-hidden mb-6">
           <div className="bg-[#fdf2f2] px-4 py-1.5 border-b border-slate-300">
              <h2 className="text-[11px] font-bold text-red-900 flex items-center gap-2">
                 <ShieldAlert size={14} className="text-red-500" /> Last Failed Login Information
              </h2>
           </div>
           <div className="p-4 grid grid-cols-2 gap-4 bg-white text-[10px]">
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500 font-bold">Last login time</span>
                    <span className="font-mono text-slate-900">26-Mar-2016 12:35:14</span>
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500 font-bold">Client machine</span>
                    <span className="font-mono text-slate-900 italic">172.18.132.140</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Account Info Section */}
        <div className="border border-slate-300 rounded-sm overflow-hidden shadow-sm">
           <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-slate-300">
              <h2 className="text-[11px] font-bold text-blue-900">Account Information</h2>
           </div>
           <div className="p-4 bg-white text-[10px]">
              <div className="flex justify-between w-1/2 border-b border-slate-100 pb-1">
                 <span className="text-slate-500 font-bold">Account Expiry Date</span>
                 <span className="font-mono text-slate-900">11-07-2017</span>
              </div>
           </div>
        </div>

        <div className="mt-8 flex justify-center">
           <button 
             onClick={onContinue}
             className="px-10 h-7 bg-blue-600 text-white text-xs font-bold rounded shadow-md hover:bg-blue-700 active:translate-y-px transition-all"
           >
              Continue to Dashboard
           </button>
        </div>
      </div>
    </div>
  );
}
