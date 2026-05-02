import React, { useState } from 'react';
import { Search, HelpCircle, X, ChevronRight, Filter } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function ChequeStatusInquiry() {
  const [formData, setFormData] = useState({
    acId: '',
    chqType: 'Normal',
    chqAlpha: '',
    fromChqNo: '',
    toChqNo: '',
    status: 'All'
  });

  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGo = () => {
    // Mock results
    setResults([
      { chqNo: '123451', alpha: 'AA', status: 'Used', date: '12-05-2015', amt: '1,200.00', payee: 'Self' },
      { chqNo: '123452', alpha: 'AA', status: 'Used', date: '15-05-2015', amt: '5,000.00', payee: 'John Doe' },
      { chqNo: '123453', alpha: 'AA', status: 'Unused', date: '-', amt: '-', payee: '-' },
      { chqNo: '123454', alpha: 'AA', status: 'Stopped', date: '20-05-2015', amt: '-', payee: '-' },
      { chqNo: '123455', alpha: 'AA', status: 'Unused', date: '-', amt: '-', payee: '-' },
    ]);
    setShowResults(true);
  };

  const renderField = (label: string, field: string, type: 'text' | 'select' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="w-36 text-[10px] font-bold text-[#003366]">{label}</label>
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
          <span>22 June, 2015 | User SUGUNADG | 50000300</span>
        </div>
      </div>

      <div className="px-2 py-0.5 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-sm font-bold text-black tracking-tight">Cheque Status Inquiry</h1>
        <button className="w-5 h-5 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center text-red-600 border border-red-200">
           <X size={12} strokeWidth={3} />
        </button>
      </div>

      <div className="p-3">
        {!showResults ? (
          <div className="border border-slate-400 pb-4 bg-white relative">
            <div className="absolute top-1 right-2 flex items-center gap-1 cursor-pointer">
               <HelpCircle size={16} className="text-blue-500 fill-blue-50" />
            </div>

            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
              <div className="flex flex-col">
                {renderField('Account ID *', 'acId', 'text', true)}
                {renderField('Cheque Type', 'chqType', 'select', false, ['Normal', 'Multi-city', 'Gift Cheque'])}
                {renderField('Cheque Alpha', 'chqAlpha')}
              </div>
              <div className="flex flex-col">
                {renderField('From Cheque No.', 'fromChqNo')}
                {renderField('To Cheque No.', 'toChqNo')}
                {renderField('Status', 'status', 'select', false, ['All', 'Used', 'Unused', 'Stopped', 'Destroyed', 'Dishonoured'])}
              </div>
            </div>

            <div className="px-4 pb-2">
               <button 
                onClick={handleGo}
                className="px-6 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm transition-all"
              >
                Go
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
             {/* Account Info Bar */}
             <div className="bg-[#f8fafc] border border-slate-300 p-2 flex justify-between items-center">
                <div className="flex gap-6 text-[10px]">
                   <div className="flex flex-col">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Account ID</span>
                      <span className="font-mono text-blue-900 font-bold">{formData.acId || '1000592837'}</span>
                   </div>
                   <div className="flex flex-col border-l border-slate-200 pl-4">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Name</span>
                      <span className="font-bold text-slate-800">MR. ADARSH KUMAR</span>
                   </div>
                   <div className="flex flex-col border-l border-slate-200 pl-4">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Status</span>
                      <span className="text-green-700 font-bold">Active</span>
                   </div>
                </div>
                <button 
                  onClick={() => setShowResults(false)}
                  className="px-3 h-5 bg-white border border-slate-300 text-[9px] font-bold text-blue-800 hover:bg-slate-50"
                >
                  New Search
                </button>
             </div>

             <div className="border border-slate-300">
                <div className="bg-slate-100 h-6 flex items-center px-2 border-b border-slate-300 justify-between">
                   <span className="text-[10px] font-bold text-[#003366]">Cheque Details Range: {formData.fromChqNo} - {formData.toChqNo}</span>
                   <div className="flex items-center gap-1">
                      <Filter size={10} className="text-slate-400" />
                      <span className="text-[9px] text-slate-500 font-bold">Filter Applied: {formData.status}</span>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-[10px] border-collapse">
                      <thead>
                         <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-300">
                            <th className="px-3 py-1.5 text-left border-r border-slate-200">Cheque No.</th>
                            <th className="px-3 py-1.5 text-left border-r border-slate-200">Alpha</th>
                            <th className="px-3 py-1.5 text-left border-r border-slate-200">Status</th>
                            <th className="px-3 py-1.5 text-left border-r border-slate-200">Payment Date</th>
                            <th className="px-3 py-1.5 text-right border-r border-slate-200">Amount</th>
                            <th className="px-3 py-1.5 text-left">Payee Details</th>
                         </tr>
                      </thead>
                      <tbody>
                         {results.map((res, i) => (
                            <tr key={i} className="border-b border-slate-200 hover:bg-blue-50/50 group transition-colors">
                               <td className="px-3 py-1 font-mono text-blue-900 group-hover:underline cursor-pointer">{res.chqNo}</td>
                               <td className="px-3 py-1 font-mono">{res.alpha}</td>
                               <td className="px-3 py-1">
                                  <span className={`px-1.5 py-0.5 rounded-[2px] font-bold text-[9px] ${
                                    res.status === 'Used' ? 'bg-blue-100 text-blue-700' :
                                    res.status === 'Unused' ? 'bg-green-100 text-green-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {res.status}
                                  </span>
                               </td>
                               <td className="px-3 py-1 font-mono">{res.date}</td>
                               <td className="px-3 py-1 text-right font-mono font-bold text-slate-700">{res.amt}</td>
                               <td className="px-3 py-1 text-slate-500 italic uppercase text-[9px]">{res.payee}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Ready</span>
      </div>
    </div>
  );
}
