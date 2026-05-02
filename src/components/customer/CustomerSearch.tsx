import React, { useState } from 'react';
import { Search, Filter, Plus, Shield, ArrowRight } from 'lucide-react';
import { useBanking } from '@/src/context/BankingContext';
import { Customer } from '@/src/store/types';

export default function CustomerSearch() {
  const { searchCustomers } = useBanking();
  const [searchType, setSearchType] = useState<'CIF' | 'NAME' | 'TIN' | 'ACC'>('CIF');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<Customer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    setResults(searchCustomers(searchValue, searchType));
  };

  const handleClear = () => {
    setSearchValue('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-6">
      <header className="flex justify-between items-end bg-white p-6 rounded border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Entity Inquiry & Maintenance</h2>
          <p className="text-slate-500 text-[10px] mt-1 font-mono font-bold uppercase tracking-widest bg-slate-100 w-fit px-1.5 py-0.5 rounded">FIN-CUS-SRCH-v2.1</p>
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'cif-retail-sqde' }))}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[11px] font-bold rounded shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest"
        >
          <Plus size={14} />
          Create New Entity
        </button>
      </header>

      <div className="bg-white rounded-lg border border-bank-border shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-bank-border flex items-center gap-4">
          <Shield size={16} className="text-bank-accent" />
          <span className="text-xs font-bold uppercase tracking-tight">Search Parameters [Mandatory]</span>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Search By</label>
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-bank-accent outline-none"
            >
              <option value="CIF">CIF ID (Customer Information File)</option>
              <option value="NAME">Legal Name / Trade Name</option>
              <option value="TIN">Tax Identification Number</option>
              <option value="ACC">Linked Account Number</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Value</label>
            <div className="relative">
              <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={searchType === 'CIF' ? 'e.g. 99018273' : 'Enter value...'}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-bank-accent outline-none font-mono"
              />
              <div className="absolute right-3 inset-y-0 flex items-center text-slate-400">
                <Search size={14} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entity Classification</label>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 rounded border border-slate-200 text-xs font-bold bg-white hover:bg-slate-50">RETAIL</button>
              <button className="flex-1 px-3 py-2 rounded border border-slate-200 text-xs font-bold bg-white hover:bg-slate-50">CORPORATE</button>
              <button className="flex-1 px-3 py-2 rounded border border-slate-200 text-xs font-bold bg-white hover:bg-slate-50 underline text-bank-accent decoration-2 underline-offset-4">ALL</button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-bank-border flex justify-end gap-3">
          <button onClick={handleClear} className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-bank-text-primary uppercase">Clear Form</button>
          <button onClick={handleSearch} className="px-8 py-2 bg-bank-sidebar text-white text-xs font-bold rounded shadow hover:bg-bank-active transition-all uppercase tracking-widest flex items-center gap-2">
            Process Inquiry
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0">
          <div className="p-4 bg-slate-50 border-b border-bank-border flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-tight">
              Search Results [{results.length} Record{results.length !== 1 ? 's' : ''} Found]
            </span>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Grid Controls</span>
            </div>
          </div>
          
          {results.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-xs font-bold uppercase tracking-widest">No records matched the search criteria</p>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <table className="finacle-grid">
                <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                  <tr>
                    <th>CIF ID</th>
                    <th>Full Name / Trade Entity</th>
                    <th>Entity Type</th>
                    <th>Status</th>
                    <th>Primary Contact</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600">
                  {results.map((cust) => (
                    <tr 
                      key={cust.cifId} 
                      className="hover:bg-slate-50 border-b border-slate-100 transition-colors group cursor-pointer"
                      onClick={() => window.dispatchEvent(new CustomEvent('nav-to-customer', { detail: {
                        id: cust.cifId,
                        name: cust.fullName,
                        type: cust.type,
                        status: cust.status,
                        phone: cust.mobile || '—',
                      }}))}
                    >
                      <td className="font-mono text-blue-600 font-bold group-hover:underline">{cust.cifId}</td>
                      <td className="font-bold text-slate-700 uppercase">{cust.fullName}</td>
                      <td className="text-[10px] font-bold text-slate-400 tracking-widest">{cust.type}</td>
                      <td>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest ${cust.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="font-mono font-medium text-slate-500">{cust.mobile || '—'}</td>
                      <td>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-tight">
            <div>Showing {results.length} of {results.length} records matched</div>
            <div className="flex gap-4 items-center">
              <span className="opacity-50">Page 1 of 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
