import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Settings, 
  Search, 
  Filter, 
  ChevronRight, 
  Package, 
  Globe, 
  Briefcase, 
  User, 
  Shield, 
  AlertCircle 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Consumer' | 'Corporate' | 'Wealth' | 'Trade' | 'Islamic';
  type: string;
  status: 'ACTIVE' | 'DRAFT' | 'SUSPENDED';
  currency: string[];
  interestRate?: string;
  minBalance?: string;
  lastModified: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 'PRD-SAV-01', name: 'Elite Savings Plus', category: 'Consumer', type: 'Savings Account', status: 'ACTIVE', currency: ['USD', 'EUR'], interestRate: '3.5%', minBalance: '500', lastModified: '24-APR-2024' },
  { id: 'PRD-LON-02', name: 'Retail Home Loan', category: 'Consumer', type: 'Term Loan', status: 'ACTIVE', currency: ['USD'], interestRate: '6.2%', lastModified: '12-MAY-2024' },
  { id: 'PRD-CORP-01', name: 'SME Overdraft Facility', category: 'Corporate', type: 'Current Account', status: 'ACTIVE', currency: ['USD', 'GBP'], minBalance: '5000', lastModified: '02-MAY-2024' },
  { id: 'PRD-WLT-05', name: 'Global Equities Fund', category: 'Wealth', type: 'Mutual Fund', status: 'ACTIVE', currency: ['USD'], lastModified: '15-MAY-2024' },
  { id: 'PRD-TRD-03', name: 'Documentary Credits Ex', category: 'Trade', type: 'Letter of Credit', status: 'DRAFT', currency: ['USD', 'JPY'], lastModified: '28-MAY-2024' },
];

export default function ProductFactory() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddingNode, setIsAddingNode] = useState(false);

  const filteredProducts = selectedCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'ALL', label: 'All Products', icon: <Package size={16} /> },
    { id: 'Consumer', label: 'Consumer Banking', icon: <User size={16} /> },
    { id: 'Corporate', label: 'Corporate Banking', icon: <Briefcase size={16} /> },
    { id: 'Wealth', label: 'Wealth Management', icon: <Globe size={16} /> },
    { id: 'Trade', label: 'Trade Finance', icon: <Shield size={16} /> },
    { id: 'Islamic', label: 'Islamic Banking', icon: <AlertCircle size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-6 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded text-white italic font-serif">PF</div>
              PRODUCT FACTORY
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
              Configuration Layer / Centralized Product Governance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search definitions (Ctrl+K)" 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button className="p-2 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors">
              <Settings size={18} />
            </button>
            <button 
              onClick={() => setIsAddingNode(true)}
              className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              New Product
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full p-6 gap-6">
        {/* Sidebar categories */}
        <aside className="w-64 flex flex-col gap-2 shrink-0">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Service Segments</span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              {cat.icon}
              {cat.label}
              {selectedCategory === cat.id && <ChevronRight className="ml-auto" size={12} />}
            </button>
          ))}
          
          <div className="mt-6 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
             <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">Summary</h4>
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Active Schemes</span>
                  <span className="font-mono font-bold text-slate-800">42</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">In Sandbox</span>
                  <span className="font-mono font-bold text-amber-600">08</span>
                </div>
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
                  Showing {filteredProducts.length} Product Definitions
                </span>
             </div>
             <div className="flex gap-1">
                <button className="p-1 px-2 text-[10px] font-black uppercase text-slate-400 bg-white border border-slate-200 rounded">Table</button>
                <button className="p-1 px-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 rounded">Grid</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <Briefcase size={20} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                      product.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-black text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{product.type}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Currency</span>
                      <span className="text-[10px] font-mono font-bold text-slate-700">{product.currency.join(' / ')}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Rate</span>
                      <span className="text-[10px] font-mono font-bold text-blue-600">{product.interestRate || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 italic">
                    <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tight">ID: {product.id}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{product.lastModified}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modal Mock */}
      <AnimatePresence>
        {isAddingNode && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-lg font-black uppercase tracking-widest italic">Define New Product Scheme</h2>
                    <p className="text-[10px] text-slate-400 font-bold">SCHEME CODE: SCH-NEW-001</p>
                 </div>
                 <button onClick={() => setIsAddingNode(false)} className="opacity-60 hover:opacity-100 transition-opacity">
                    <Plus size={24} className="rotate-45" />
                 </button>
              </div>
              <div className="p-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Product Category</label>
                          <select className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none">
                             <option>Consumer Banking</option>
                             <option>Corporate Banking</option>
                             <option>Wealth Management</option>
                          </select>
                       </div>
                       <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Scheme Name</label>
                          <input type="text" placeholder="e.g. Premium High-Yield Savings" className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Currency Set</label>
                          <div className="flex gap-2">
                             {['USD', 'EUR', 'GBP', 'JPY'].map(ccy => (
                               <label key={ccy} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all">
                                  <input type="checkbox" className="w-3 h-3 accent-blue-600" />
                                  <span className="text-[10px] font-black font-mono">{ccy}</span>
                               </label>
                             ))}
                          </div>
                       </div>
                       <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase">Interest Variance (%)</label>
                          <input type="number" step="0.01" placeholder="3.50" className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono outline-none" />
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 items-start">
                    <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={16} />
                    <div>
                       <p className="text-[11px] text-blue-900 font-bold leading-relaxed italic">
                         Product configurations are versioned. Saving this schema will populate the scheme master in the next EOD (End of Day) processing cycle.
                       </p>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                 <button onClick={() => setIsAddingNode(false)} className="px-6 py-2.5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors">Cancel Definition</button>
                 <button className="px-10 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">Commit Product</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
