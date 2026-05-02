import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, X, ArrowUpDown, ArrowUp, ArrowDown, Filter, Printer, Download, ChevronRight } from 'lucide-react';

interface DSAListing {
  id: string;
  name: string;
  scheme: string;
  userGrade: string;
  licenseNo: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  branch: string;
  cif: string;
}

const MOCK_DSA_DATA: DSAListing[] = [
  { id: 'DSA001', name: 'Alexander Sterling', scheme: 'SBBASIC', userGrade: 'A', licenseNo: 'LIC-2024-001', status: 'Active', branch: 'Hyderabad Main', cif: 'CIF-990827' },
  { id: 'DSA002', name: 'Beatrice Vance', scheme: 'SBPREM', userGrade: 'B', licenseNo: 'LIC-2024-002', status: 'Active', branch: 'Secundrabad HO', cif: 'CIF-550213' },
  { id: 'DSA003', name: 'Charles Xavier', scheme: 'SBBASIC', userGrade: 'A', licenseNo: 'LIC-2024-003', status: 'Inactive', branch: 'Banjara Hills', cif: 'CIF-110992' },
  { id: 'DSA004', name: 'Diana Prince', scheme: 'SBPREM', userGrade: 'A+', licenseNo: 'LIC-2024-004', status: 'Active', branch: 'Jubilee Hills', cif: 'CIF-887722' },
  { id: 'DSA005', name: 'Ethan Hunt', scheme: 'SBSTAFF', userGrade: 'C', licenseNo: 'LIC-2024-005', status: 'Suspended', branch: 'Gachibowli', cif: 'CIF-334455' },
  { id: 'DSA006', name: 'Fiona Gallagher', scheme: 'SBBASIC', userGrade: 'B', licenseNo: 'LIC-2024-006', status: 'Active', branch: 'Kukatpally', cif: 'CIF-221144' },
];

export default function DSAInquiry() {
  const [formData, setFormData] = useState({
    function: 'SELECT',
    solId: '50000300',
    solName: 'SECUNDRABAD HO',
    licenseNo: '',
    ccy: '',
    schemeFrom: '',
    schemeTo: '',
    dsaFrom: '',
    dsaTo: '',
    parentFrom: '',
    parentTo: '',
    userGradeFrom: '',
    userGradeTo: '',
    cifFrom: '',
    cifTo: '',
    acFrom: '',
    acTo: '',
    dsaLevelFrom: '',
    dsaLevelTo: '',
    consolidatedIdFrom: '',
    consolidatedIdTo: '',
    freeCode1: '',
    freeCode2: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof DSAListing; direction: 'asc' | 'desc' } | null>(null);
  const [gridFilter, setGridFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredAndSortedData = useMemo(() => {
    let result = [...MOCK_DSA_DATA];

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Search Filter
    if (gridFilter) {
      const lowerFilter = gridFilter.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerFilter) || 
        item.id.toLowerCase().includes(lowerFilter) ||
        item.branch.toLowerCase().includes(lowerFilter)
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
  }, [sortConfig, gridFilter, statusFilter]);

  const requestSort = (key: keyof DSAListing) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof DSAListing) => {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={12} className="text-blue-600" /> : <ArrowDown size={12} className="text-blue-600" />;
  };

  const renderField = (label: string, field: string, type: 'text' | 'select' = 'text', hasSearch = false, options: string[] = []) => (
    <div className="flex items-center gap-2 mb-1">
      <label className="w-40 text-[10px] font-bold text-[#003366]">
        {label} {label.includes('*') && <span className="text-red-600 font-black">*</span>}
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
          <div className="flex-1 flex flex-col">
            <div className="flex gap-1 items-center">
              <input 
                type="text" 
                className="flex-1 h-5 border border-slate-400 text-[10px] px-1 outline-none font-mono focus:border-blue-500"
                value={(formData as any)[field]}
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              />
              {hasSearch && (
                <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                  <Search size={12} className="text-blue-500" />
                </button>
              )}
              {(field === 'acFrom' || field === 'acTo') && (
                 <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center">
                    <div className="w-3 h-3 border border-red-500"></div>
                 </button>
              )}
            </div>
            {field === 'solId' && (
              <span className="text-[9px] text-slate-400 font-bold ml-1 uppercase">{formData.solName}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans select-none overflow-y-auto">
      {/* Page Title */}
      <div className="px-4 py-2 bg-[#003366] flex justify-between items-center shadow-md">
        <h1 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
          <ChevronRight size={14} className="text-blue-300" />
          DSA Inquiry and Printing [HTI]
        </h1>
        <button className="w-6 h-6 bg-red-500/20 hover:bg-red-500 rounded flex items-center justify-center text-white transition-colors">
           <X size={14} strokeWidth={3} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Criteria Card */}
        <div className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
             <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Selection Criteria</span>
             <div className="flex items-center gap-2 cursor-pointer">
                <HelpCircle size={14} className="text-blue-500" />
             </div>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-1">
            <div className="flex flex-col">
              {renderField('Function *', 'function', 'select', false, ['SELECT', 'Inquiry', 'Print'])}
              {renderField('SOL ID *', 'solId', 'text', true)}
              {renderField('Scheme Code From', 'schemeFrom', 'text', true)}
              {renderField('DSA ID From', 'dsaFrom', 'text', true)}
              {renderField('DSA Parent ID From', 'parentFrom', 'text', true)}
              {renderField('DSA User Grade From', 'userGradeFrom', 'text', true)}
              <div className="h-2"></div>
              {renderField('CIF ID From', 'cifFrom', 'text', true)}
              {renderField('CIF ID To', 'cifTo', 'text', true)}
              {renderField('A/c. ID From', 'acFrom', 'text', true)}
              {renderField('A/c. ID To', 'acTo', 'text', true)}
            </div>

            <div className="flex flex-col">
              {renderField('License No.', 'licenseNo')}
              {renderField('CCY', 'ccy', 'text', true)}
              {renderField('Scheme Code To', 'schemeTo', 'text', true)}
              {renderField('DSA ID To', 'dsaTo', 'text', true)}
              {renderField('DSA Parent ID To', 'parentTo', 'text', true)}
              {renderField('DSA User Grade To', 'userGradeTo', 'text', true)}
              <div className="h-2"></div>
              {renderField('DSA Level From', 'dsaLevelFrom', 'text', true)}
              {renderField('DSA Level To', 'dsaLevelTo', 'text', true)}
              {renderField('Consolidated DSA ID From', 'consolidatedIdFrom', 'text', true)}
              {renderField('Consolidated DSA ID To', 'consolidatedIdTo', 'text', true)}
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-end gap-3">
             <button 
               onClick={() => setShowResults(true)}
               className="px-6 py-2 bg-[#003366] text-white text-[10px] font-black uppercase tracking-widest rounded hover:bg-[#002244] transition-all shadow-lg shadow-blue-900/10"
             >
                Generate Report
             </button>
             <button 
               onClick={() => setShowResults(false)}
               className="px-6 py-2 bg-white border border-slate-300 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded hover:bg-slate-50"
             >
                Clear
             </button>
          </div>
        </div>

        {/* Results Data Grid */}
        {showResults && (
          <div className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="bg-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <Search size={16} />
                   </div>
                   <div>
                      <h3 className="text-sm font-black uppercase tracking-tight italic">Inquiry Result Set</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{filteredAndSortedData.length} Records found matching criteria</p>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search result grid..."
                        value={gridFilter}
                        onChange={(e) => setGridFilter(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md py-1.5 pl-8 pr-3 text-[10px] text-white placeholder-slate-400 outline-none focus:border-blue-500 w-64"
                      />
                      <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   </div>
                   
                   <select 
                     value={statusFilter}
                     onChange={(e) => setStatusFilter(e.target.value)}
                     className="bg-slate-700 border border-slate-600 rounded-md py-1.5 px-3 text-[10px] text-white outline-none focus:border-blue-500"
                   >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active Only</option>
                      <option value="Inactive">Inactive Only</option>
                      <option value="Suspended">Suspended Only</option>
                   </select>

                   <div className="flex border border-slate-600 rounded-md overflow-hidden">
                      <button className="p-1.5 bg-slate-700 hover:bg-slate-600 border-r border-slate-600 text-blue-400 transition-colors">
                        <Printer size={14} />
                      </button>
                      <button className="p-1.5 bg-slate-700 hover:bg-slate-600 text-blue-400 transition-colors">
                        <Download size={14} />
                      </button>
                   </div>
                </div>
             </div>

             <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 border-b-2 border-slate-200">
                      <tr>
                         {[
                           { key: 'id', label: 'DSA ID', width: 'w-24' },
                           { key: 'name', label: 'Agency Name', width: '' },
                           { key: 'scheme', label: 'Scheme', width: 'w-32' },
                           { key: 'licenseNo', label: 'License No.', width: 'w-40' },
                           { key: 'branch', label: 'Home Branch', width: 'w-48' },
                           { key: 'status', label: 'Status', width: 'w-24' }
                         ].map((col) => (
                           <th 
                             key={col.key}
                             onClick={() => requestSort(col.key as keyof DSAListing)}
                             className={`${col.width} px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors`}
                           >
                              <div className="flex items-center gap-2">
                                 {col.label}
                                 {getSortIcon(col.key as keyof DSAListing)}
                              </div>
                           </th>
                         ))}
                         <th className="w-16 px-4 py-3"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredAndSortedData.map((row) => (
                        <tr key={row.id} className="hover:bg-blue-50/50 transition-all group">
                           <td className="px-4 py-3 text-[11px] font-mono font-black text-blue-600">{row.id}</td>
                           <td className="px-4 py-3">
                              <div className="flex flex-col">
                                 <span className="text-[11px] font-black text-slate-800">{row.name}</span>
                                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">CIF: {row.cif}</span>
                              </div>
                           </td>
                           <td className="px-4 py-3 text-[10px] font-bold text-slate-600">{row.scheme}</td>
                           <td className="px-4 py-3 text-[10px] font-mono text-slate-500">{row.licenseNo}</td>
                           <td className="px-4 py-3 text-[10px] font-medium text-slate-600">{row.branch}</td>
                           <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                                row.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                 {row.status}
                              </span>
                           </td>
                           <td className="px-4 py-3 text-right">
                              <button className="p-1 text-slate-300 hover:text-blue-600 transition-colors">
                                 <ChevronRight size={16} />
                              </button>
                           </td>
                        </tr>
                      ))}
                      {filteredAndSortedData.length === 0 && (
                        <tr>
                           <td colSpan={7} className="px-4 py-20 text-center">
                              <div className="flex flex-col items-center gap-3">
                                 <Search size={40} className="text-slate-200" />
                                 <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">No matching records found in SOL context</p>
                              </div>
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>

             <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Showing {filteredAndSortedData.length} of {MOCK_DSA_DATA.length} entries</span>
                <div className="flex gap-1">
                   <button className="px-2 py-1 bg-white border border-slate-300 text-[9px] font-black text-slate-400 rounded cursor-not-allowed">First</button>
                   <button className="px-2 py-1 bg-white border border-slate-300 text-[9px] font-black text-slate-400 rounded cursor-not-allowed">Previous</button>
                   <button className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded active">1</button>
                   <button className="px-2 py-1 bg-white border border-slate-300 text-[9px] font-black text-slate-600 rounded hover:bg-slate-50">Next</button>
                   <button className="px-2 py-1 bg-white border border-slate-300 text-[9px] font-black text-slate-600 rounded hover:bg-slate-50">Last</button>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto h-6 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-black uppercase tracking-widest">
        <span>Ready | User: SYS_ADM_01 | Environment: Production</span>
      </div>
    </div>
  );
}

