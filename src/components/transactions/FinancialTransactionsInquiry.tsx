import React, { useState, useEffect } from 'react';
import { Search, Calendar, HelpCircle, X, Filter, Download, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchTransactions, Transaction } from '../../services/api';

export default function FinancialTransactionsInquiry() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [originFilter, setOriginFilter] = useState('ALL');

  const handleClearFilters = () => {
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setOriginFilter('ALL');
    setFilteredTransactions(allTransactions);
  };

  const applyFilters = (type: string, status: string, origin: string) => {
    let filtered = [...allTransactions];

    if (type !== 'ALL') {
      filtered = filtered.filter(t => {
        const mainType = t.type.toUpperCase();
        const hasLegType = t.legs.some(l => l.type === type);
        
        if (type === 'DEBIT' || type === 'CREDIT') return hasLegType;
        if (type === 'TRANSFER') return mainType.includes('TRANSFER');
        if (type === 'CASH DEPOSIT') return mainType.includes('DEPOSIT');
        if (type === 'CASH PAYMENT') return mainType.includes('PAYMENT') || mainType.includes('WITHDRAWAL');
        return true;
      });
    }

    if (status !== 'ALL') {
      filtered = filtered.filter(t => t.status.toUpperCase() === status);
    }

    if (origin !== 'ALL') {
      filtered = filtered.filter(t => t.origin === origin);
    }

    setFilteredTransactions(filtered);
  };

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
           <button 
             onClick={async () => {
               setLoading(true);
               try {
                 const data = await fetchTransactions();
                 
                 // Apply form-based filtering
                 let results = [...data];
                 if (formData.txnId) {
                   results = results.filter(t => t.id.toLowerCase().includes(formData.txnId.toLowerCase()));
                 }
                 if (formData.acId) {
                   results = results.filter(t => t.legs.some(l => l.accountNo.includes(formData.acId)));
                 }
                 
                 setAllTransactions(data); // Keep full set for secondary filters
                 setFilteredTransactions(results);
                 setShowResults(true);
               } catch (err) {
                 console.error(err);
               } finally {
                 setLoading(false);
               }
             }}
             disabled={loading}
             className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 flex items-center gap-2"
           >
             {loading ? 'Processing...' : 'Go'}
           </button>
           <button 
             onClick={() => {
               setFormData({
                 solSetId: '53200100',
                 acSolId: '',
                 acId: '',
                 txnId: '',
                 refNo: '',
                 txnType: 'Select',
                 partTxnType: 'All',
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
               } as any);
               setShowResults(false);
               handleClearFilters();
             }}
             className="px-5 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200"
           >
             Clear
           </button>
        </div>

        {showResults && (
          <div className="mt-6 border border-slate-300">
            <div className="bg-slate-100 px-3 py-2 border-b border-slate-300 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Inquiry Results</span>
                <div className="flex items-center gap-2 bg-white border border-slate-300 px-2 py-0.5 rounded">
                  <Filter size={10} className="text-slate-400" />
                  <span className="text-[9px] font-bold text-slate-500 mr-1">TYPE:</span>
                  <select 
                    className="text-[9px] font-black text-blue-900 outline-none bg-transparent"
                    value={typeFilter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTypeFilter(val);
                      applyFilters(val, statusFilter, originFilter);
                    }}
                  >
                    <option value="ALL">ALL TYPES</option>
                    <option value="DEBIT">DEBIT ONLY</option>
                    <option value="CREDIT">CREDIT ONLY</option>
                    <option value="TRANSFER">TRANSFERS</option>
                    <option value="CASH DEPOSIT">CASH DEPOSITS</option>
                    <option value="CASH PAYMENT">CASH PAYMENTS</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-white border border-slate-300 px-2 py-0.5 rounded">
                  <span className="text-[9px] font-bold text-slate-500 mr-1">STATUS:</span>
                  <select 
                    className="text-[9px] font-black text-blue-900 outline-none bg-transparent"
                    value={statusFilter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStatusFilter(val);
                      applyFilters(typeFilter, val, originFilter);
                    }}
                  >
                    <option value="ALL">ALL STATUS</option>
                    <option value="POSTED">POSTED</option>
                    <option value="REVERSED">REVERSED</option>
                    <option value="ACTIVE">ACTIVE</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-white border border-slate-300 px-2 py-0.5 rounded">
                  <span className="text-[9px] font-bold text-slate-500 mr-1">ORIGIN:</span>
                  <select 
                    className="text-[9px] font-black text-blue-900 outline-none bg-transparent"
                    value={originFilter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setOriginFilter(val);
                      applyFilters(typeFilter, statusFilter, val);
                    }}
                  >
                    <option value="ALL">ALL ORIGINS</option>
                    <option value="TELLER">TELLER</option>
                    <option value="CRM">CRM</option>
                    <option value="SYSTEM">SYSTEM</option>
                    <option value="EXTERNAL">EXTERNAL</option>
                  </select>
                </div>

                <button 
                  onClick={handleClearFilters}
                  className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-[9px] font-black text-slate-600 rounded flex items-center gap-1 transition-colors"
                >
                  <X size={10} />
                  CLEAR FILTERS
                </button>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-1 hover:bg-slate-200 rounded"><Download size={12} className="text-slate-600" /></button>
                 <button className="p-1 hover:bg-slate-200 rounded"><Printer size={12} className="text-slate-600" /></button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="sticky top-0 bg-white border-b border-slate-300 shadow-sm z-10">
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                    <th className="px-3 py-2 border-r border-slate-200">Date</th>
                    <th className="px-3 py-2 border-r border-slate-200 text-center">Batch ID</th>
                    <th className="px-3 py-2 border-r border-slate-200">Tran ID</th>
                    <th className="px-3 py-2 border-r border-slate-200">Origin</th>
                    <th className="px-3 py-2 border-r border-slate-200">Type</th>
                    <th className="px-3 py-2 border-r border-slate-200">A/c No</th>
                    <th className="px-3 py-2 border-r border-slate-200 text-center">Dr/Cr</th>
                    <th className="px-3 py-2 border-r border-slate-200 text-right">Amount</th>
                    <th className="px-3 py-2 border-r border-slate-200">Particulars</th>
                    <th className="px-3 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] font-mono">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-slate-400 italic">No transactions match selected criteria</td>
                    </tr>
                  ) : filteredTransactions.map((txn) => (
                    txn.legs.map((leg, idx) => (
                      <tr key={`${txn.id}-${idx}`} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors group">
                        <td className="px-3 py-1.5 border-r border-slate-100 text-slate-500 whitespace-nowrap">{txn.date}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 text-center text-blue-900 font-bold">{txn.batchId}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 text-blue-600 font-bold">{txn.id}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 font-black text-[8px] text-slate-400 text-center">{txn.origin || 'TELLER'}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 text-slate-600 font-black text-[8px] tracking-tight uppercase">{txn.type}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 font-bold text-slate-800">{leg.accountNo}</td>
                        <td className="px-3 py-1.5 border-r border-slate-100 text-center">
                          <span className={`px-1 rounded-[1px] font-black text-[8px] ${leg.type === 'DEBIT' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                            {leg.type}
                          </span>
                        </td>
                        <td className={`px-3 py-1.5 border-r border-slate-100 text-right font-bold ${leg.type === 'DEBIT' ? 'text-red-700' : 'text-emerald-700'}`}>
                          {parseFloat(leg.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-1.5 border-r border-slate-100 text-slate-500 truncate max-w-[200px]">{leg.particulars}</td>
                        <td className="px-3 py-1.5 text-center">
                          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-black uppercase">
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-300 flex justify-between items-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {filteredTransactions.reduce((acc, t) => acc + t.legs.length, 0)} line entries
               </span>
               <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-[9px] font-bold text-slate-300 hover:text-blue-600 transition-colors uppercase disabled:opacity-30" disabled><ChevronLeft size={10} /> Prev</button>
                  <div className="flex gap-1">
                    <span className="w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-[9px] font-black rounded-sm shadow-sm">1</span>
                  </div>
                  <button className="flex items-center gap-1 text-[9px] font-bold text-slate-300 hover:text-blue-600 transition-colors uppercase disabled:opacity-30" disabled>Next <ChevronRight size={10} /></button>
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
