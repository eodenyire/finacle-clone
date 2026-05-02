import React, { useState } from 'react';
import { Search, HelpCircle, X } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function MISTDAccountOpening() {
  const [formData, setFormData] = useState({
    functionCode: 'O-Open',
    solId: '40000100',
    ccy: 'INR',
    cifId: '303771024',
    schemeCode: 'MISN1',
    productGroup: 'MIS'
  });

  const renderField = (label: string, field: string, type: 'text' | 'select' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-2">
      <label className="w-32 text-[10px] font-bold text-[#003366]">
        {label} {label.includes('*') || ['CIF ID', 'Scheme Code', 'Product group', 'SOL ID', 'CCY'].includes(label) ? <span className="text-red-600 font-black">*</span> : null}
      </label>
      <div className="flex-1 flex gap-1 items-center">
        {type === 'select' ? (
          <select 
            className="w-full h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none focus:border-blue-500"
            value={(formData as any)[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
          >
            {options.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        ) : (
          <div className="flex-1 flex gap-1 items-center">
            <input 
              type="text" 
              className="flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono focus:border-blue-500 bg-white"
              value={(formData as any)[field]}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            />
            {hasSearch && (
              <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                <Search size={12} className="text-blue-500" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-[#b0c4de] px-2 py-0.5 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366]">
        <div className="flex items-center">
           <Logo variant="stacked" className="scale-75 origin-left" />
        </div>
        <div className="flex items-center gap-4">
          <span>09 June, 2017 | User SSBOTERAR | 40000100 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-1.5 h-4 text-[9px] hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Error Message Box (from screenshot) */}
        <div className="mb-4 bg-blue-50 border border-blue-200 p-2 flex gap-3 items-start shadow-sm">
           <div className="w-5 h-5 bg-orange-400 rounded-sm flex items-center justify-center text-white font-black text-xs">!</div>
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-red-600">Error Message(s):</span>
              <span className="text-[10px] font-mono text-red-500 tracking-tight">E5815 - The customer record is not entered through the HCCFM menu option.</span>
           </div>
        </div>

        <div className="px-2 py-1 bg-white">
           <h2 className="text-xs font-bold text-black border-l-4 border-blue-600 pl-2">Monthly Income Scheme / Term Deposit account opening</h2>
        </div>

        <div className="mt-2 border border-slate-400 bg-white relative p-6">
          <div className="absolute top-1 right-2 cursor-pointer">
             <HelpCircle size={14} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
            <div className="flex flex-col">
              {renderField('Function Code', 'functionCode', 'select', false, ['O-Open', 'V-Verify', 'M-Modify'])}
              {renderField('SOL ID', 'solId', 'text', true)}
              {renderField('CCY', 'ccy', 'text', true)}
            </div>

            <div className="flex flex-col">
              {renderField('CIF ID', 'cifId', 'text', true)}
              {renderField('Scheme Code', 'schemeCode', 'text', true)}
              {renderField('Product group', 'productGroup', 'select', false, ['MIS', 'TD', 'RD'])}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
           <button className="px-6 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200">Go</button>
           <button className="px-6 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200">Clear</button>
        </div>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
