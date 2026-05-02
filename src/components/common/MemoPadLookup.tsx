import React, { useState } from 'react';
import { Search, Calendar, HelpCircle, ChevronRight } from 'lucide-react';

export default function MemoPadLookup() {
  const [formData, setFormData] = useState({
    function: '',
    memoPadId: '',
    intent: 'Select',
    security: 'Select',
    keyword: '',
    solId: '50001805',
    accountId: '',
    cifId: '',
    auditRefNo: '',
    txnId: '',
    txnSrlNo: '',
    fromDate: '',
    toDate: '',
    standingInstNo: '',
    employeeId: '',
    signingPowerNo: '',
    class: '',
    type: ''
  });

  const renderField = (label: string, field: string, type: 'text' | 'select' | 'date' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="w-40 text-[10px] font-bold text-[#003366]">{label}</label>
      <div className="flex-1 flex gap-1 items-center">
        {type === 'select' ? (
          <select 
            className="w-full h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none"
            value={(formData as any)[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
          >
            {options.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type="text" 
            className="flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono"
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
            <Calendar size={12} className="text-[#003366]" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Page Header */}
      <div className="px-2 py-1 bg-white border-b border-slate-300">
        <h1 className="text-sm font-bold text-[#003366] px-1">Memo Pad Lookup</h1>
      </div>

      <div className="p-3">
        <div className="border border-[#80a4c1] relative bg-[#f8f9fb]">
          {/* Section: Filtration Criteria */}
          <div className="bg-[#e7eff7] border-b border-[#80a4c1] px-2 py-1 flex justify-between items-center">
            <span className="text-[11px] font-black text-[#003366]">Filtration Criteria</span>
            <div className="flex items-center gap-1 cursor-pointer">
               <span className="text-[10px] font-bold text-[#003366]">Help</span>
               <HelpCircle size={14} className="text-blue-500 fill-blue-50" />
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="flex flex-col">
              {renderField('Memo Pad Function', 'function', 'text', true)}
              {renderField('Memo Pad Intent', 'intent', 'select', false, ['Select', 'Instruction', 'Caution', 'Info'])}
              {renderField('Keyword', 'keyword')}
              <div className="h-4"></div>
              {renderField('A/c. ID', 'accountId', 'text', true)}
              {renderField('CIF ID', 'cifId', 'text', true)}
              {renderField('Audit Ref. No.', 'auditRefNo')}
              {renderField('Transaction ID', 'txnId')}
              {renderField('Due/From Transaction Date', 'fromDate', 'date')}
              {renderField('Standing Instructions Srl. No.', 'standingInstNo')}
              {renderField('Signing Power No.', 'signingPowerNo')}
            </div>

            <div className="flex flex-col">
              {renderField('Memo Pad ID', 'memoPadId', 'text', true)}
              {renderField('Memo Pad Security', 'security', 'select', false, ['Select', 'Public', 'Private', 'Restricted'])}
              {renderField('SOL ID', 'solId', 'text', true)}
              <div className="h-4"></div>
              <div className="h-4"></div>
              <div className="h-4"></div>
              <div className="h-4"></div>
              {renderField('Transaction Srl. No.', 'txnSrlNo')}
              {renderField('Due/To Transaction Date', 'toDate', 'date')}
              {renderField('Employee ID', 'employeeId', 'text', true)}
            </div>
          </div>

          {/* Section: Inventory Details */}
          <div className="bg-[#e7eff7] border-y border-[#80a4c1] px-2 py-1">
            <span className="text-[11px] font-black text-[#003366]">Inventory Details</span>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="flex flex-col">
              {renderField('Class', 'class', 'text', true)}
            </div>
            <div className="flex flex-col">
              {renderField('Type', 'type', 'text', true)}
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="px-3 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm transition-all min-w-[36px]">
            Go
          </button>
          <button className="px-3 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm transition-all">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
