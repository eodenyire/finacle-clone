import React, { useState } from 'react';
import { Search, Calendar, HelpCircle, X } from 'lucide-react';

export default function FinancialTransactionsInquiry() {
  const [formData, setFormData] = useState({
    solSetId: '53200100',
    acSolId: '',
    acId: '',
    txnId: '',
    refNo: '',
    txnType: 'Select',
    partTxnType: 'All', // Credit, Debit, All
    instrumentNo: '',
    instrumentType: '',
    amtLow: '5,000.00',
    amtHigh: '',
    startDate: '01-10-2016',
    endDate: '15-10-2016',
    reportCode: '',
    entryUserId: '',
    postUserId: '',
    deliveryChannel: '',
    glSubheadCode: '30001',
    ccyCode: '',
    txnStatus: 'Select',
    acStatus: 'Select',
    acLabel: '',
    additionalCriteria: false,
    filtrationCriteria: ['All', 'All', 'All']
  });

  const renderField = (label: string, field: string, type: 'text' | 'select' | 'radio' | 'date' = 'text', options: any[] = [], icon?: React.ReactNode) => (
    <div className="flex items-center gap-2 mb-1">
      <label className="w-40 text-[10px] font-bold text-[#003366]">
        {label} {label.includes('*') && <span className="text-red-600 font-black">*</span>}
      </label>
      <div className="flex-1 flex gap-1 items-center">
        {type === 'select' ? (
          <select 
            className="w-full h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none"
            value={(formData as any)[field]}
            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
          >
            {options.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        ) : type === 'radio' ? (
          <div className="flex items-center gap-3">
             {options.map(opt => (
               <label key={opt} className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio" 
                    name={field} 
                    checked={(formData as any)[field] === opt}
                    onChange={() => setFormData({...formData, [field]: opt})}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-[10px] text-slate-600">{opt}</span>
               </label>
             ))}
          </div>
        ) : (
          <div className="flex-1 flex gap-1 items-center">
            <input 
              type="text" 
              className={`flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono ${label.includes('Set ID') || label.includes('GL') ? 'border-red-500' : ''}`}
              value={(formData as any)[field]}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            />
            {icon ? icon : (label.includes('ID') || label.includes('A/c') || label.includes('Code') || label.includes('Ref')) && (
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
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Page Title */}
      <div className="px-2 py-0.5 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black tracking-tight">Financial Transactions Inquiry and Report</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200 shadow-sm">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      <div className="p-3">
        <div className="border border-slate-400 pb-4 bg-white relative">
          <div className="absolute top-1 right-2 flex items-center gap-1 cursor-pointer">
             <span className="text-[9px] font-bold text-slate-500">Help</span>
             <HelpCircle size={12} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div className="flex flex-col">
              {renderField('SOL Set ID *', 'solSetId')}
              {renderField('A/c. ID', 'acId', 'text', [], (
                <div className="flex gap-1">
                   <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center"><Search size={12} className="text-blue-500" /></button>
                   <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center"><div className="w-3 h-3 bg-red-500 rounded-sm"></div></button>
                </div>
              ))}
              {renderField('Transaction ID', 'txnId')}
              {renderField('Transaction Type', 'txnType', 'select', ['Select', 'C/NR', 'C/NP', 'L/NR'])}
              {renderField('Instrument No.', 'instrumentNo')}
              {renderField('Transaction Amt. (Low)', 'amtLow')}
              {renderField('Start Date', 'startDate', 'date')}
              {renderField('Report Code', 'reportCode')}
              {renderField('Post User ID', 'postUserId')}
              {renderField('General Ledger Subhead Code', 'glSubheadCode')}
              
              <div className="h-6"></div>
              
              {renderField('Transaction Status', 'txnStatus', 'select', ['Select', 'Entered', 'Posted', 'Verified'])}
              {renderField('A/c. Label', 'acLabel')}
              {renderField('Filtration Criteria', 'filt1', 'select', ['All', 'None'])}
              <div className="flex justify-end gap-2 pr-0 mt-1">
                 <select className="w-[185px] h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none"><option>All</option></select>
              </div>
              <div className="flex justify-end gap-2 pr-0 mt-1">
                 <select className="w-[185px] h-5 border border-slate-400 text-[10px] px-1 bg-white outline-none"><option>All</option></select>
              </div>
            </div>

            <div className="flex flex-col">
              {renderField('A/c. SOL ID', 'acSolId')}
              <div className="h-6"></div>
              {renderField('Ref. No.', 'refNo')}
              {renderField('Part Transaction Type', 'partTxnType', 'radio', ['Credit', 'Debit', 'All'])}
              {renderField('Instrument Type', 'instrumentType')}
              {renderField('Transaction Amt. (High)', 'amtHigh')}
              {renderField('End Date', 'endDate', 'date')}
              {renderField('Entry User ID', 'entryUserId')}
              {renderField('Delivery Channel', 'deliveryChannel')}
              {renderField('CCY Code', 'ccyCode')}

              <div className="h-6"></div>

              {renderField('A/c. Status', 'acStatus', 'select', ['Select', 'Active', 'Dormant', 'Closed'])}
              <div className="flex items-center gap-2 mb-1 h-5">
                 <label className="w-40 text-[10px] font-bold text-[#003366]">Additional Criteria Indicator</label>
                 <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 text-blue-600 rounded-sm" />
                    <span className="text-[10px] text-slate-600">Deposit Details</span>
                 </label>
              </div>
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
