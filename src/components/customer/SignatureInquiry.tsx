import React, { useState } from 'react';
import { Search, Calendar, HelpCircle, X } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function SignatureInquiry() {
  const [formData, setFormData] = useState({
    acType: 'N-Normal A/c.',
    cifId: '',
    bankCode: '',
    imageAccessCode: '',
    keyword: '',
    sigEffectiveFrom: '',
    txnSubType: '---Select---',
    txnType: '---Select---',
    acId: '',
    employeeId: '',
    solId: '50000300',
    sigPowerNo: '',
    sigGroupName: '',
    sigExpiresOn: '',
    txnTypeIndicator: '---Select---',
    txnAmt: ''
  });

  const renderField = (label: string, field: string, type: 'text' | 'select' | 'date' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="w-40 text-[10px] font-bold text-[#003366]">{label}</label>
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
          <input 
            type="text" 
            className="flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono focus:border-blue-500"
            value={(formData as any)[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
          />
        )}
        {hasSearch && (
          <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
            <Search size={12} className="text-blue-500" />
          </button>
        )}
        {type === 'date' && (
          <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
            <Calendar size={12} className="text-blue-500" />
          </button>
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
          <span>22 June, 2015 | User SUGUNADG | 50000300 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-1.5 h-4 text-[9px] hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div className="px-2 py-0.5 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black tracking-tight">Inquire on Signatures</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      <div className="p-3">
        <div className="border border-slate-400 pb-4 bg-white relative">
          <div className="absolute top-1 right-2 flex items-center gap-1 cursor-pointer">
             <HelpCircle size={16} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="flex flex-col">
              {renderField('A/c. Type', 'acType', 'select', false, ['N-Normal A/c.', 'C-Current A/c.', 'S-Savings A/c.'])}
              {renderField('CIF ID', 'cifId', 'text', true)}
              {renderField('Bank Code', 'bankCode')}
              {renderField('Image Access Code', 'imageAccessCode', 'text', true)}
              {renderField('Keyword', 'keyword')}
              {renderField('Signature Effective From', 'sigEffectiveFrom', 'date')}
              {renderField('Transaction Sub Type', 'txnSubType', 'select', false, ['---Select---', 'Cash', 'Transfer'])}
              {renderField('Transaction Type', 'txnType', 'select', false, ['---Select---', 'Normal', 'Special'])}
            </div>

            <div className="flex flex-col">
              {renderField('A/c. ID', 'acId', 'text', true)}
              {renderField('Employee ID', 'employeeId', 'text', true)}
              {renderField('SOL ID', 'solId', 'text', true)}
              {renderField('Signature Power No.', 'sigPowerNo')}
              {renderField('Signature Group Name', 'sigGroupName', 'text', true)}
              {renderField('Signature Expires On', 'sigExpiresOn', 'date')}
              {renderField('Transaction Type Indicator', 'txnTypeIndicator', 'select', false, ['---Select---', 'Debit', 'Credit'])}
              {renderField('Transaction Amt.', 'txnAmt')}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
           <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200">Go</button>
           <button className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200">Clear</button>
        </div>
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
