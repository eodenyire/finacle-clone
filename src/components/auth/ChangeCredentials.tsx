import React, { useState } from 'react';
import { HelpCircle, X, ShieldCheck } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function ChangeCredentials({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    changeType: 'Password',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4 backdrop-blur-[1px]">
      <div className="bg-[#f0ece9] border-2 border-slate-500 shadow-[4px_4px_10px_rgba(0,0,0,0.4)] w-full max-w-[500px] flex flex-col font-sans select-none animate-in fade-in zoom-in duration-150">
        {/* Title Bar */}
        <div className="bg-[#000080] text-white h-7 flex items-center justify-between px-2 cursor-move group">
           <div className="flex items-center gap-2 text-white">
              <Logo variant="tiny" />
              <span className="text-xs font-bold">SSO Change Credentials page -- Webpage Dialog</span>
           </div>
           <button 
             onClick={onClose}
             className="w-5 h-5 bg-[#d4d0c8] hover:bg-red-500 hover:text-white border border-slate-700 text-black flex items-center justify-center transition-colors"
           >
              <X size={14} strokeWidth={3} />
           </button>
        </div>

        {/* Logo Section */}
        <div className="bg-white p-3 border-b border-slate-400 flex justify-between items-center">
           <Logo variant="stacked" />
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-[#003366] uppercase">Government of India</span>
              <span className="text-[8px] font-bold text-red-600 uppercase">Department of Posts</span>
           </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-[#f0ece9]">
           <div className="flex justify-between items-center border-b border-slate-300 pb-1 mb-4">
              <h1 className="text-xs font-bold text-blue-900 border-b-2 border-blue-900">Change Credentials</h1>
              <div className="flex items-center gap-1 cursor-pointer hover:underline text-[10px] font-bold text-slate-600">
                 <span>Help</span>
                 <HelpCircle size={14} className="text-blue-500 fill-blue-50" />
              </div>
           </div>

           <div className="bg-white border border-slate-400 p-6 shadow-inner">
              <div className="flex items-center gap-4 mb-4">
                 <label className="w-24 text-[11px] font-bold text-[#003366]">Change <span className="text-red-600 font-bold">*</span></label>
                 <select 
                    className="flex-1 h-5 border border-slate-400 text-[11px] px-1 bg-white outline-none"
                    value={formData.changeType}
                    onChange={(e) => setFormData({...formData, changeType: e.target.value})}
                 >
                    <option>Password</option>
                    <option>Transaction Password</option>
                    <option>Email ID</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-4">
                    <label className="w-24 text-[11px] font-bold text-[#003366]">Current {formData.changeType}</label>
                    <input type="password" title="password" className="flex-1 h-5 border border-slate-400 px-1 outline-none font-mono text-[10px]" />
                 </div>
                 <div className="flex items-center gap-4">
                    <label className="w-24 text-[11px] font-bold text-[#003366]">New {formData.changeType}</label>
                    <input type="password" title="password" className="flex-1 h-5 border border-slate-400 px-1 outline-none font-mono text-[10px]" />
                 </div>
                 <div className="flex items-center gap-4">
                    <label className="w-24 text-[11px] font-bold text-[#003366]">Confirm {formData.changeType}</label>
                    <input type="password" title="password" className="flex-1 h-5 border border-slate-400 px-1 outline-none font-mono text-[10px]" />
                 </div>
              </div>
           </div>

           <div className="mt-6 flex gap-2">
              <button className="px-5 h-6 bg-[#d4d0c8] border-2 border-slate-200 border-r-slate-600 border-b-slate-600 text-[11px] font-bold text-[#003366] active:border-slate-500 active:translate-y-[1px]">Go</button>
              <button className="px-5 h-6 bg-[#d4d0c8] border-2 border-slate-200 border-r-slate-600 border-b-slate-600 text-[11px] font-bold text-[#003366] active:border-slate-500 active:translate-y-[1px]">Clear</button>
           </div>
        </div>

        <div className="bg-[#d4d0c8] h-1 border-t border-slate-400 mt-2"></div>
      </div>
    </div>
  );
}
