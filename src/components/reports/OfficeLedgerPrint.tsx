import React, { useState, useMemo } from 'react';
import { Search, Calendar, HelpCircle, Grid, Filter, ArrowUpDown, ArrowUp, ArrowDown, ChevronRight, Download, Printer, FileText, X } from 'lucide-react';

interface LedgerEntry {
  acNo: string;
  acName: string;
  balance: number;
  currency: string;
  status: 'Open' | 'Closed';
  lastTranDate: string;
  glCode: string;
}

const MOCK_LEDGER_DATA: LedgerEntry[] = [
  { acNo: '58501C5637N', acName: 'BO CASH NEW ACCOUNT', balance: 1250450.75, currency: 'INR', status: 'Open', lastTranDate: '12-11-2018', glCode: '58501' },
  { acNo: '58501C5638N', acName: 'REMITTANCE SUSPENSE', balance: -45000.00, currency: 'INR', status: 'Open', lastTranDate: '10-11-2018', glCode: '58501' },
  { acNo: '58502D9910A', acName: 'INTEREST PAYABLE SAVINGS', balance: 890200.50, currency: 'INR', status: 'Open', lastTranDate: '13-11-2018', glCode: '58502' },
  { acNo: '58501X2201Z', acName: 'CLEARING SETTLEMENT A/C', balance: 0.00, currency: 'INR', status: 'Closed', lastTranDate: '01-11-2018', glCode: '58501' },
  { acNo: '58505M4432P', acName: 'MISC EXPENDITURE OFFICE', balance: 12400.25, currency: 'INR', status: 'Open', lastTranDate: '09-11-2018', glCode: '58505' },
  { acNo: '58501T8877Q', acName: 'TAX DEDUCTION SOURCE', balance: 345000.00, currency: 'INR', status: 'Open', lastTranDate: '13-11-2018', glCode: '58501' },
];

export default function OfficeLedgerPrint() {
  const [formData, setFormData] = useState({
    reportTo: 'PM',
    solId: '5001',
    glSubheadCode: '',
    fromAcRange: '58501C5637N',
    toAcRange: '58501C5637N',
    openClosed: 'Both', // Open A/c. Only, Closed A/c. Only, Both
    ccy: '',
    periodFrom: '',
    periodTo: '13-11-2018',
    acLabel: ''
  });

  const [showGrid, setShowGrid] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof LedgerEntry; direction: 'asc' | 'desc' } | null>(null);
  const [gridFilter, setGridFilter] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let result = [...MOCK_LEDGER_DATA];

    // Status Filter based on form selection
    if (formData.openClosed === 'Open A/c. Only') {
      result = result.filter(item => item.status === 'Open');
    } else if (formData.openClosed === 'Closed A/c. Only') {
      result = result.filter(item => item.status === 'Closed');
    }

    // Grid Search Filter
    if (gridFilter) {
      const lowerFilter = gridFilter.toLowerCase();
      result = result.filter(item => 
        item.acName.toLowerCase().includes(lowerFilter) || 
        item.acNo.toLowerCase().includes(lowerFilter)
      );
    }

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [sortConfig, gridFilter, formData.openClosed]);

  const requestSort = (key: keyof LedgerEntry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof LedgerEntry) => {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={12} className="text-blue-600" /> : <ArrowDown size={12} className="text-blue-600" />;
  };

  const renderField = (label: string, field: string, type: 'text' | 'radio' | 'date' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="w-48 text-[10px] font-bold text-[#003366]">
        {label} {label.includes('*') && <span className="text-red-600 font-black">*</span>}
      </label>
      <div className="flex-1 flex gap-1 items-center">
        {type === 'radio' ? (
          <div className="flex flex-col gap-1">
             {options.map(opt => (
               <label key={opt} className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio" 
                    name={field} 
                    checked={(formData as any)[field] === opt}
                    onChange={() => setFormData({...formData, [field]: opt})}
                    className="w-3 h-3 text-blue-600"
                  />
                  <span className="text-[10px] text-slate-600 font-medium">{opt}</span>
               </label>
             ))}
          </div>
        ) : (
          <div className="flex-1 flex gap-1 items-center">
            <input 
              type="text" 
              className={`flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono focus:border-blue-500 ${(label.includes('Range') || label === 'Report To') ? 'bg-slate-50' : 'bg-white'}`}
              value={(formData as any)[field]}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            />
            {hasSearch && (
               <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200 shadow-sm">
                  <Search size={12} className="text-blue-500" />
               </button>
            )}
            {label.includes('Range') && (
               <>
                 <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200 shadow-sm">
                    <Grid size={12} className="text-blue-500" />
                 </button>
                 <span className="text-[9px] text-slate-400 font-mono ml-1 uppercase">INR</span>
                 <span className="text-[9px] text-slate-300 font-bold ml-2 uppercase truncate max-w-[100px]">BO CASH NEW</span>
               </>
            )}
            {type === 'date' && (
              <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200 shadow-sm">
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
      {/* Header Banner - Office Style */}
      <div className="bg-[#b0c4de] px-4 py-1 border-b border-slate-400 flex justify-between items-center text-[10px] font-bold text-[#003366] shadow-sm">
         <span className="flex items-center gap-2">
            <FileText size={14} /> Universal Banking Solution from Infosys
         </span>
         <div className="flex items-center gap-4">
            <span className="tracking-tight italic opacity-80">13 November, 2018 | User 10... | ... | Menu Shortcut:</span>
            <div className="flex items-center gap-1">
               <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono text-[9px]" defaultValue="HACLP" />
               <button className="bg-[#d4d0c8] border border-slate-400 px-2 h-4 text-[9px] font-black hover:bg-white active:bg-slate-200 transition-colors">Go</button>
            </div>
         </div>
      </div>

      <div className="px-4 py-3 bg-white border-b border-slate-200 flex justify-between items-center">
        <div>
           <h1 className="text-base font-black text-slate-900 tracking-tight uppercase italic">Office A/c. Ledgers Print <span className="text-blue-600">[HACLP]</span></h1>
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Report Generation and Ledger Inquiry Interface</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
              <Download size={18} />
           </button>
           <button className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
              <X size={18} />
           </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 gap-6">
        <div className="border border-slate-300 rounded-xl bg-white relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Help Icon */}
          <div className="absolute top-3 right-4 flex items-center gap-2 cursor-pointer z-10">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactive Audit</span>
             <HelpCircle size={16} className="text-blue-500 fill-blue-50" />
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 relative z-10">
            <div className="flex flex-col">
              {renderField('Report To *', 'reportTo')}
              {renderField('General Ledger Subhead Code', 'glSubheadCode', 'text', true)}
              <div className="h-4"></div>
              {renderField('From A/c. Range', 'fromAcRange', 'text', true)}
              {renderField('To A/c. Range', 'toAcRange', 'text', true)}
              {renderField('Open/Closed A/c.', 'openClosed', 'radio', false, ['Open A/c. Only', 'Closed A/c. Only', 'Both'])}
              <div className="h-4"></div>
              {renderField('Period From', 'periodFrom', 'date')}
              {renderField('A/c. Label', 'acLabel', 'text', true)}
            </div>

            <div className="flex flex-col">
              {renderField('SOL ID *', 'solId', 'text', true)}
              <div className="h-20"></div>
              {renderField('CCY', 'ccy', 'text', true)}
              <div className="h-8"></div>
              {renderField('Period To', 'periodTo', 'date')}
            </div>
          </div>
          
          <div className="bg-slate-50 px-6 py-4 flex gap-3 border-t border-slate-200">
             <button 
               onClick={() => setShowGrid(true)}
               className="px-8 py-2 bg-[#003366] text-white text-[11px] font-black uppercase tracking-widest rounded hover:bg-[#002244] shadow-lg shadow-blue-900/10 transition-all flex items-center gap-2"
             >
                <Search size={14} /> Fetch Ledgers
             </button>
             <button className="px-6 py-2 bg-white border border-slate-300 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded hover:bg-slate-50 transition-all">Submit to Print</button>
             <button className="px-6 py-2 bg-white border border-slate-300 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded hover:bg-slate-50 transition-all">Validate Fields</button>
             <button 
               onClick={() => { setShowGrid(false); setFormData({...formData, glSubheadCode: ''}); }}
               className="px-6 py-2 bg-white border border-slate-300 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded hover:bg-slate-50 transition-all ml-auto"
             >
                Reset Clear
             </button>
          </div>

          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
             <span className="text-[12rem] font-black italic tracking-tighter text-blue-900 rotate-[-15deg]">CoreOne</span>
          </div>
        </div>

        {/* Improved Ledger Data Grid */}
        {showGrid && (
          <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-slate-900 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Grid size={20} />
                   </div>
                   <div>
                      <h3 className="text-base font-black uppercase tracking-tight italic">Office Ledger Result Set</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{filteredAndSortedData.length} Accounts mapped to SOL 5001</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search ledger grid..."
                        value={gridFilter}
                        onChange={(e) => setGridFilter(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-[11px] text-white placeholder-slate-500 outline-none focus:border-blue-500 w-72 transition-all"
                      />
                      <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                   </div>
                   
                   <div className="flex gap-1">
                      <button className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 hover:bg-slate-700 border border-slate-700">
                         <Printer size={16} />
                      </button>
                      <button className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 hover:bg-slate-700 border border-slate-700">
                         <Download size={16} />
                      </button>
                   </div>
                </div>
             </div>

             <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 border-b-2 border-slate-200">
                      <tr>
                         {[
                           { key: 'acNo', label: 'Account Number', width: 'w-48' },
                           { key: 'acName', label: 'Account Title', width: '' },
                           { key: 'glCode', label: 'GL Subhead', width: 'w-32' },
                           { key: 'balance', label: 'Ledger Balance', width: 'w-48' },
                           { key: 'status', label: 'Status', width: 'w-24' },
                           { key: 'lastTranDate', label: 'Last Transaction', width: 'w-40' }
                         ].map((col) => (
                           <th 
                             key={col.key}
                             onClick={() => requestSort(col.key as keyof LedgerEntry)}
                             className={`${col.width} px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer hover:bg-slate-100 transition-colors`}
                           >
                              <div className="flex items-center gap-2">
                                 {col.label}
                                 {getSortIcon(col.key as keyof LedgerEntry)}
                              </div>
                           </th>
                         ))}
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredAndSortedData.map((row) => (
                        <tr key={row.acNo} className="hover:bg-blue-50/50 transition-all group cursor-pointer">
                           <td className="px-6 py-4 text-[11px] font-mono font-black text-blue-700">{row.acNo}</td>
                           <td className="px-6 py-4 text-[11px] font-black text-slate-800 uppercase tracking-tight">{row.acName}</td>
                           <td className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{row.glCode}</td>
                           <td className={`px-6 py-4 text-[12px] font-mono font-black text-right pr-12 ${row.balance < 0 ? 'text-red-500' : 'text-slate-900 text-semibold'}`}>
                              {row.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              <span className="ml-2 text-[9px] text-slate-400">{row.balance < 0 ? 'DR' : 'CR'}</span>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                row.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                 {row.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-[10px] font-medium text-slate-500 italic">{row.lastTranDate}</td>
                        </tr>
                      ))}
                      {filteredAndSortedData.length === 0 && (
                        <tr>
                           <td colSpan={6} className="px-6 py-32 text-center">
                              <div className="flex flex-col items-center gap-4">
                                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                    <Search size={32} />
                                 </div>
                                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">No matching ledger accounts found in selected range</p>
                              </div>
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>

             <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <FileText size={12} /> Total Records: {filteredAndSortedData.length}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Net Value: {filteredAndSortedData.reduce((acc, curr) => acc + curr.balance, 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                </div>
                <div className="flex gap-1.5">
                   <button className="px-3 py-1.5 bg-white border border-slate-300 text-[10px] font-black text-slate-400 rounded-md cursor-not-allowed">First</button>
                   <button className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-md active shadow-lg shadow-blue-600/20">1</button>
                   <button className="px-3 py-1.5 bg-white border border-slate-300 text-[10px] font-black text-slate-600 rounded-md hover:bg-slate-50">Last</button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Footer System Status Bar */}
      <div className="mt-auto h-6 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-black uppercase tracking-widest shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex-1 flex items-center gap-6">
           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Line Secure</span>
           <span className="text-slate-500">Node: HUB_PROD_14</span>
           <span className="text-slate-500">Commit: AUTO</span>
        </div>
        <div className="flex items-center gap-4">
           <span>CAPS</span>
           <span>NUM</span>
           <span>SCRL</span>
        </div>
      </div>
    </div>
  );
}

