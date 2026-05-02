import React, { useState } from 'react';
import { Search, Calendar, User, HelpCircle, X } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function AccountClosureMaintenance() {
  const [formData, setFormData] = useState({
    function: 'Z-Close',
    product: 'NSC', // NSC or KVP
    code: '',
    registrationNo: '008437089',
    acId: '',
    certificateNo: '',
    closureValueDate: '13-03-2014',
    cifId: '006474161',
    solId: '25000100',
    ccy: 'INR'
  });

  const renderField = (label: string, field: string, type: 'text' | 'select' | 'radio' | 'date' = 'text', options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="w-32 text-[10px] font-bold text-[#003366]">
        {label} {label.includes('*') || ['Code', 'Type', 'Closure Value Date'].includes(label) ? <span className="text-red-600 font-black">*</span> : null}
      </label>
      <div className="flex-1 flex gap-1 items-center">
        {type === 'select' ? (
          <select 
            className="flex-1 h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none focus:border-blue-500"
            value={(formData as any)[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
          >
             <option>Z-Close</option>
             <option>V-Verify</option>
          </select>
        ) : type === 'radio' ? (
          <div className="flex items-center gap-4">
             {options.map(opt => (
               <label key={opt} className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio" 
                    name={field} 
                    checked={(formData as any)[field] === opt}
                    onChange={() => setFormData({...formData, [field]: opt})}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-[10px] text-slate-600 font-bold uppercase">{opt}</span>
               </label>
             ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-1">
             <input 
                type="text" 
                className="flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono focus:border-blue-500"
                value={(formData as any)[field]}
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
             />
             {['registrationNo', 'acId', 'certificateNo', 'cifId'].includes(field) && (
               <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white">
                  <Search size={12} className="text-blue-500" />
               </button>
             )}
             {field === 'acId' && (
                <User size={14} className="text-red-500 cursor-pointer" />
             )}
             {type === 'date' && (
               <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white">
                  <Calendar size={12} className="text-blue-500" />
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="bg-[#b0c4de] px-2 py-0.5 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366]">
        <div className="flex items-center gap-1">
           <Logo variant="stacked" className="scale-75 origin-left" />
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center bg-[#f0f4f8] border border-blue-200 px-2 rounded-sm shadow-sm">
             <span className="text-[9px] text-[#003366] font-black mr-2 uppercase">Menu Shortcut</span>
             <input type="text" className="w-16 h-3.5 bg-transparent border-none outline-none font-mono text-[10px] text-blue-900" />
             <button className="bg-blue-600 text-white px-1 text-[8px] h-3 ml-1 rounded-[1px] font-black">Go</button>
           </div>
           <span className="ml-4">13 March, 2014 | User RAJPALSINGH | 25000100</span>
        </div>
      </div>

      <div className="px-2 py-1 bg-white border-b border-slate-200">
        <h1 className="text-sm font-bold text-black tracking-tight uppercase">Custom Menu for NSC/KVP account closure and closure verification</h1>
      </div>

      <div className="p-4">
        {/* Error Message Box (Simulating screenshot) */}
        <div className="mb-4 bg-blue-50 border border-blue-200 p-2 flex gap-3 items-start shadow-sm">
           <div className="w-5 h-5 bg-orange-400 rounded-sm flex items-center justify-center text-white font-black text-xs">!</div>
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-red-600">Error Message(s):</span>
              <span className="text-[10px] font-mono text-red-500 tracking-tight">CMSG000030 - No Records fetched</span>
           </div>
        </div>

        <div className="border border-slate-400 p-6 relative bg-white">
          <div className="absolute top-2 right-2 flex items-center gap-1 cursor-pointer">
             <HelpCircle size={14} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="flex flex-col">
              {renderField('Function', 'function', 'select')}
              {renderField('Code', 'code')}
              {renderField('Registration No.', 'registrationNo')}
              {renderField('A/c. ID', 'acId')}
              <div className="flex items-center gap-2 mb-1.5">
                  <label className="w-32 text-[10px] font-bold text-[#003366]">Certificate No.</label>
                  <div className="flex-1 flex gap-1">
                      <input type="text" className="w-16 h-5 border border-slate-400 px-1 font-mono text-[10px]" />
                      <input type="text" className="flex-1 h-5 border border-slate-400 px-1 font-mono text-[10px]" />
                      <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white"><Search size={12} className="text-blue-500" /></button>
                  </div>
              </div>
              {renderField('Closure Value Date', 'closureValueDate', 'date')}
            </div>

            <div className="flex flex-col">
              {renderField('Product', 'product', 'radio', ['NSC', 'KVP'])}
              <div className="flex items-center gap-2 mb-1.5">
                  <label className="w-32 text-[10px] font-bold text-[#003366]">Type <span className="text-red-500 font-black">*</span></label>
                  <div className="flex-1 h-5 border border-slate-400 bg-white"></div>
              </div>
              {renderField('CIF ID', 'cifId')}
              {renderField('SOL ID', 'solId')}
              <div className="flex items-center gap-2 mb-1.5 opacity-50">
                  <label className="w-32 text-[10px] font-bold text-[#003366]">CCY</label>
                  <input type="text" value="INR" className="w-16 h-5 border border-slate-300 px-1 bg-slate-100 font-mono text-[10px]" disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
           <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white">Go</button>
           <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white">Clear</button>
        </div>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
