import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Database, 
  Layers, 
  Copy, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Save,
  Trash2,
  Trash
} from 'lucide-react';

interface GLMaintenanceProps {
  mode: 'GL_CODE' | 'SUB_HEAD' | 'REPLICATE';
}

const MOCK_GL_DATA = [
  { code: '10', name: 'Liability', type: 'LIABILITY' },
  { code: '20', name: 'Asset', type: 'ASSET' },
  { code: '30', name: 'Income', type: 'INCOME' },
  { code: '40', name: 'Expense', type: 'EXPENSE' },
];

const MOCK_SUBHEAD_DATA = [
  { code: '10100', name: 'SB General', parentGL: '10' },
  { code: '10110', name: 'SB Staff', parentGL: '10' },
  { code: '10200', name: 'Current Account General', parentGL: '10' },
  { code: '10210', name: 'Current Account Corporate', parentGL: '10' },
  { code: '10300', name: 'Fixed Deposits', parentGL: '10' },
  { code: '10310', name: 'Cumulative Deposits', parentGL: '10' },
  { code: '20100', name: 'Overdraft Account', parentGL: '20' },
  { code: '20110', name: 'Term Loan Housing Loan', parentGL: '20' },
];

export default function GLMaintenance({ mode: propMode }: GLMaintenanceProps) {
  const [activeMode, setActiveMode] = useState<'GL_CODE' | 'SUB_HEAD' | 'REPLICATE'>(propMode);

  useEffect(() => {
    setActiveMode(propMode);
  }, [propMode]);

  const [formData, setFormData] = useState({
    function: 'Add',
    glCode: '',
    glName: '',
    glType: 'Liability',
    subHeadCode: '',
    subHeadName: '',
    parentGL: '',
    currency: 'INR',
    solId: '5001'
  });

  const [glCodes, setGlCodes] = useState(MOCK_GL_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const [subHeads, setSubHeads] = useState([
    { type: 'LIABILITY', code: '10', name: 'SB General', shCode: '10100', status: 'Active' },
    { type: 'LIABILITY', code: '10', name: 'SB Staff', shCode: '10110', status: 'Active' },
    { type: 'LIABILITY', code: '10', name: 'Current Account General', shCode: '10200', status: 'Active' },
    { type: 'ASSET', code: '20', name: 'Overdraft Account', shCode: '20100', status: 'Active' },
    { type: 'ASSET', code: '20', name: 'Term Loan Housing Loan', shCode: '20110', status: 'Active' },
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const filteredGLCodes = glCodes.filter(gl => 
    gl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gl.code.includes(searchTerm) ||
    gl.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubHeads = subHeads.filter(sh => 
    sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sh.shCode.includes(searchTerm) ||
    sh.code.includes(searchTerm) ||
    sh.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = () => {
    if (formData.function === 'Add' || (activeMode === 'REPLICATE' && formData.function === 'Add')) {
      if (activeMode === 'SUB_HEAD' ) {
        if (!formData.subHeadCode || !formData.parentGL || !formData.subHeadName) {
           alert('Please fill all required fields');
           return;
        }

        if (subHeads.some(s => s.shCode === formData.subHeadCode)) {
          alert(`Sub Head Code ${formData.subHeadCode} already exists.`);
          return;
        }

        const parentGL = glCodes.find(gl => gl.code === formData.parentGL);
        const newSH = {
          type: (parentGL?.type || 'LIABILITY') as any,
          code: formData.parentGL,
          name: formData.subHeadName,
          shCode: formData.subHeadCode,
          status: 'Active'
        };
        setSubHeads([newSH, ...subHeads]);
    } else if (activeMode === 'GL_CODE' || activeMode === 'REPLICATE') {
       if (!formData.glCode.trim() || !formData.glName.trim() || !formData.glType) {
          alert('All fields marked with * are required. Please provide GL Code, Description, and GL Type.');
          return;
       }
       
       if (formData.glCode.length < 2 || formData.glCode.length > 10) {
          alert('GL Code must be between 2 and 10 characters.');
          return;
       }

       const alphanumericRegex = /^[a-z0-9]+$/i;
       if (!alphanumericRegex.test(formData.glCode.trim())) {
          alert('GL Code must be alphanumeric (no spaces or special characters).');
          return;
       }

       if (glCodes.some(g => g.code === formData.glCode.trim())) {
          alert(`GL Code ${formData.glCode.trim()} already exists. Please use a unique code.`);
          return;
       }

       const newGL = {
         code: formData.glCode.trim(),
         name: formData.glName.trim(),
         type: formData.glType.toUpperCase()
       };
       setGlCodes(prev => [...prev, newGL]);
    }
    } else if (formData.function === 'Modify') {
      if (activeMode === 'GL_CODE') {
        setGlCodes(glCodes.map(gl => gl.code === formData.glCode ? { ...gl, name: formData.glName, type: formData.glType.toUpperCase() } : gl));
      } else if (activeMode === 'SUB_HEAD') {
        const parentGL = glCodes.find(gl => gl.code === formData.parentGL);
        setSubHeads(subHeads.map(sh => 
          sh.shCode === formData.subHeadCode 
            ? { ...sh, name: formData.subHeadName, code: formData.parentGL, type: (parentGL?.type || 'LIABILITY') as any } 
            : sh
        ));
      }
    } else if (formData.function === 'Delete') {
       if (activeMode === 'GL_CODE') {
          if (!glCodes.some(g => g.code === formData.glCode)) {
             alert('GL Code record not found for deletion.');
             return;
          }
          if (confirm(`Are you sure you want to permanently delete GL Code: ${formData.glCode}?`)) {
             setGlCodes(prev => prev.filter(g => g.code !== formData.glCode));
          } else {
             return;
          }
       } else if (activeMode === 'SUB_HEAD') {
          if (!subHeads.some(s => s.shCode === formData.subHeadCode)) {
             alert('Sub Head record not found for deletion.');
             return;
          }
          if (confirm(`Are you sure you want to permanently delete Sub Head: ${formData.subHeadCode}?`)) {
             setSubHeads(prev => prev.filter(s => s.shCode !== formData.subHeadCode));
          } else {
             return;
          }
       }
    }
    
    // Reset form for non-inquiry/verify/delete functions if it was an Add/Modify
    if (formData.function === 'Add' || formData.function === 'Modify') {
      setFormData({
        ...formData,
        subHeadCode: '',
        subHeadName: '',
        parentGL: '',
        glCode: '',
        glName: ''
      });
    }

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const getTitle = () => {
    switch (activeMode) {
      case 'GL_CODE': return 'General Ledger Code Maintenance [HRRCDM]';
      case 'SUB_HEAD': return 'GL Sub Head Maintenance [HGLSHM]';
      case 'REPLICATE': return 'Replicate GL Sub Head [HGLSHR]';
    }
  };

  const getHeaderIcon = () => {
    switch (activeMode) {
      case 'GL_CODE': return <Database size={18} />;
      case 'SUB_HEAD': return <Layers size={18} />;
      case 'REPLICATE': return <Copy size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans overflow-y-auto selection:bg-blue-100">
      {/* Header Banner */}
      <div className="bg-[#003366] px-6 py-4 flex justify-between items-center shadow-xl z-20">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-200">
              {getHeaderIcon()}
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.15em] italic">
                 {getTitle()}
              </h1>
              <p className="text-[9px] font-bold text-blue-300 uppercase tracking-widest opacity-80">
                 Accounting Backbone Engine — SOL: 5001 (Main Branch)
              </p>
           </div>
        </div>
        <div className="flex gap-2">
           <button className="w-8 h-8 bg-white/10 hover:bg-red-500 rounded-lg flex items-center justify-center text-white transition-all">
              <X size={16} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="p-6 lg:p-10 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm max-w-fit">
           {[
             { id: 'GL_CODE', label: 'GL Maintenance', icon: <Database size={14} /> },
             { id: 'SUB_HEAD', label: 'Sub Head Maintenance', icon: <Layers size={14} /> },
             { id: 'REPLICATE', label: 'Replication Desk', icon: <Copy size={14} /> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveMode(tab.id as any)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === tab.id ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </div>

        {/* Main Form Area */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
           {/* Success Toast */}
           <div className={`absolute top-0 left-0 w-full h-1 bg-emerald-500 transition-all duration-500 ${isSuccess ? 'scale-x-100' : 'scale-x-0'}`}></div>

           <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Plus size={14} className="text-blue-600" /> Maintenance Details
              </span>
              <div className="flex items-center gap-4">
                 <HelpCircle size={16} className="text-slate-400" />
              </div>
           </div>

           <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-5xl mx-auto">
                 {/* Function Select */}
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Function Code</label>
                    <select 
                      value={formData.function}
                      onChange={(e) => setFormData({...formData, function: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                       <option value="Add">Add</option>
                       <option value="Modify">Modify</option>
                       <option value="Inquire">Inquire</option>
                       <option value="Verify">Verify</option>
                       <option value="Delete">Delete</option>
                    </select>
                 </div>

                 {activeMode === 'GL_CODE' ? (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Code *</label>
                        <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={formData.glCode}
                              onChange={(e) => setFormData({...formData, glCode: e.target.value})}
                              placeholder="e.g. 10" 
                              disabled={formData.function === 'Modify' && !!formData.glCode && glCodes.some(g => g.code === formData.glCode)}
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono disabled:bg-slate-50" 
                            />
                            {formData.function !== 'Add' && (
                              <button 
                                onClick={() => {
                                   let found = glCodes.find(g => g.code === formData.glCode);
                                   if (!found && formData.glName) {
                                      found = glCodes.find(g => g.name.toLowerCase().includes(formData.glName.toLowerCase()));
                                   }

                                   if (found) {
                                      setFormData({
                                         ...formData,
                                         glCode: found.code,
                                         glName: found.name,
                                         glType: found.type.charAt(0) + found.type.slice(1).toLowerCase()
                                      });
                                   } else {
                                      alert('GL record not found with provided Code or Description');
                                   }
                                }}
                                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                              >
                                <Search size={16} />
                              </button>
                            )}
                         </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Description *</label>
                        <input 
                           type="text" 
                           value={formData.glName}
                           onChange={(e) => setFormData({...formData, glName: e.target.value})}
                           placeholder="e.g. Liabilities" 
                           disabled={formData.function === 'Verify' || formData.function === 'Delete' || formData.function === 'Inquire'}
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50" 
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Type *</label>
                        <select 
                           value={formData.glType}
                           onChange={(e) => setFormData({...formData, glType: e.target.value})}
                           disabled={formData.function === 'Inquire' || formData.function === 'Verify' || formData.function === 'Delete'}
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
                        >
                            <option value="Liability">Liability</option>
                            <option value="Asset">Asset</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                     </div>
                   </>
                 ) : activeMode === 'SUB_HEAD' ? (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Parent GL Code</label>
                        <select 
                          value={formData.parentGL}
                          onChange={(e) => setFormData({...formData, parentGL: e.target.value})}
                          disabled={formData.function === 'Inquire' || formData.function === 'Verify' || formData.function === 'Delete'}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 appearance-none disabled:bg-slate-50 disabled:text-slate-400"
                        >
                           <option value="">Select Parent GL...</option>
                           {glCodes.map(gl => (
                             <option key={gl.code} value={gl.code}>{gl.code} - {gl.name}</option>
                           ))}
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Head Code *</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={formData.subHeadCode}
                            onChange={(e) => setFormData({...formData, subHeadCode: e.target.value})}
                            placeholder="e.g. 10100" 
                            disabled={formData.function === 'Modify' || formData.function === 'Inquire' || formData.function === 'Verify'}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono disabled:bg-slate-50 disabled:text-slate-400" 
                          />
                          {(formData.function === 'Modify' || formData.function === 'Inquire' || formData.function === 'Delete') && (
                            <button 
                              onClick={() => {
                                 const found = subHeads.find(s => s.shCode === formData.subHeadCode);
                                 if (found) {
                                    setFormData({
                                       ...formData,
                                       subHeadName: found.name,
                                       parentGL: found.code
                                    });
                                 } else {
                                    alert('Sub Head record not found');
                                 }
                              }}
                              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                            >
                              <Search size={16} />
                            </button>
                          )}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sub Head Name / Description</label>
                        <input 
                          type="text" 
                          value={formData.subHeadName}
                          onChange={(e) => setFormData({...formData, subHeadName: e.target.value})}
                          placeholder="e.g. Savings Bank General" 
                          disabled={formData.function === 'Inquire' || formData.function === 'Verify' || formData.function === 'Delete'}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-400" 
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Currency</label>
                        <input type="text" defaultValue="INR" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none" disabled />
                     </div>
                   </>
                 ) : activeMode === 'REPLICATE' ? (
                   <>
                     <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Select GL Code to Duplicate</label>
                        <div className="flex gap-2">
                           <select 
                              onChange={(e) => {
                                 const found = glCodes.find(g => g.code === e.target.value);
                                 if (found) {
                                    setFormData({
                                       ...formData,
                                       function: 'Add',
                                       glCode: '', 
                                       glName: found.name + ' (Copy)',
                                       glType: found.type.charAt(0) + found.type.slice(1).toLowerCase()
                                    });
                                 }
                              }}
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-sm"
                           >
                              <option value="">Select Existing GL Code...</option>
                              {glCodes.map(gl => (
                                 <option key={gl.code} value={gl.code}>{gl.code} - {gl.name} ({gl.type})</option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">New GL Code *</label>
                        <input 
                           type="text" 
                           value={formData.glCode}
                           onChange={(e) => setFormData({...formData, glCode: e.target.value})}
                           placeholder="e.g. 11" 
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" 
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Description</label>
                        <input 
                           type="text" 
                           value={formData.glName}
                           onChange={(e) => setFormData({...formData, glName: e.target.value})}
                           placeholder="e.g. New Business Liabilities" 
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600" 
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">GL Type *</label>
                        <select 
                           value={formData.glType}
                           onChange={(e) => setFormData({...formData, glType: e.target.value})}
                           className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600"
                        >
                           <option value="Liability">Liability</option>
                           <option value="Asset">Asset</option>
                           <option value="Income">Income</option>
                           <option value="Expense">Expense</option>
                        </select>
                     </div>
                     <div className="mt-8 border-t border-slate-100 pt-8 md:col-span-2">
                        <div className="bg-blue-50 p-6 rounded-2xl flex items-center gap-4 border border-blue-100">
                           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                              <Plus size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.1em] mb-0.5">Quick Replication Tip</p>
                              <p className="text-[10px] font-bold text-blue-700 leading-relaxed opacity-80">
                                 Selecting a source GL Code will clone its classification parameters. Ensure the new GL Code follows your branch's chart of accounts policy.
                               </p>
                           </div>
                        </div>
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Source SOL ID</label>
                        <input type="text" defaultValue="5001" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none" disabled />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target SOL ID Range</label>
                        <div className="flex items-center gap-2">
                           <input type="text" placeholder="From" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                           <ArrowRight size={14} className="text-slate-300" />
                           <input type="text" placeholder="To" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 font-mono" />
                        </div>
                     </div>
                     <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Select Sub-Heads to Replicate</label>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
                           {MOCK_SUBHEAD_DATA.map(sh => (
                             <label key={sh.code} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-all cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                                <div className="flex flex-col">
                                   <span className="text-[10px] font-black text-slate-800">{sh.name}</span>
                                   <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Code: {sh.code}</span>
                                </div>
                             </label>
                           ))}
                        </div>
                     </div>
                   </>
                 )}
              </div>
           </div>

           <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
              <button 
                 onClick={() => {
                    setFormData({
                       ...formData,
                       glCode: '',
                       glName: '',
                       subHeadCode: '',
                       subHeadName: '',
                       parentGL: ''
                    });
                 }}
                 className="px-6 py-2.5 bg-white border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                 <Trash2 size={14} /> Clear
              </button>
              <button 
                 onClick={handleAction}
                 className="px-8 py-2.5 bg-[#003366] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#002244] shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2 active:scale-95"
              >
                 <Save size={14} /> Commit Changes
              </button>
           </div>
        </div>

        {/* Existing Records Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
           <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex flex-col gap-0.5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest italic">Reference Ledger Table</h3>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                       Showing {activeMode === 'GL_CODE' ? filteredGLCodes.length : filteredSubHeads.length} records {searchTerm && `matching "${searchTerm}"`}
                    </p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="relative group">
                       <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search GL, Name or Type..." 
                          className="bg-white border border-slate-200 rounded-full pl-8 pr-12 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-600 w-64 shadow-sm group-hover:border-blue-300 transition-all font-mono"
                       />
                       <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       {searchTerm && (
                          <button 
                             onClick={() => setSearchTerm('')}
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                             <X size={12} />
                          </button>
                       )}
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-full">Systems Online</span>
                       <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-black uppercase rounded-full">SOL 5001 Data</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                             {activeMode === 'GL_CODE' ? 'Category' : 'GL Type'}
                          </th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                             {activeMode === 'GL_CODE' ? 'Code' : 'GL Code'}
                          </th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Account Name / Description</th>
                          {activeMode !== 'GL_CODE' && (
                             <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Sub-Head Code</th>
                          )}
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {activeMode === 'GL_CODE' ? (
                         filteredGLCodes.length > 0 ? (
                            filteredGLCodes.map((row, idx) => (
                               <tr 
                                 key={idx} 
                                 className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       function: formData.function === 'Add' ? 'Inquire' : formData.function,
                                       glCode: row.code,
                                       glName: row.name,
                                       glType: row.type.charAt(0) + row.type.slice(1).toLowerCase()
                                    });
                                 }}
                               >
                                 <td className="px-6 py-4 border-l-4 border-transparent group-hover:border-blue-400 transition-all">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${row.type === 'LIABILITY' || row.type === 'INCOME' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                                       {row.type}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-[11px] font-mono font-black text-slate-700">{row.code}</td>
                                 <td className="px-6 py-4 text-[10px] font-black text-slate-800 uppercase italic tracking-tight">{row.name}</td>
                                 <td className="px-6 py-4 text-right">
                                    <CheckCircle2 size={14} className="text-emerald-500 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                                 </td>
                               </tr>
                            ))
                         ) : (
                            <tr>
                               <td colSpan={5} className="px-6 py-12 text-center">
                                  <div className="flex flex-col items-center gap-2 opacity-30">
                                     <Search size={24} />
                                     <p className="text-[10px] font-black uppercase tracking-widest">No matching GL Codes found</p>
                                  </div>
                               </td>
                            </tr>
                         )
                       ) : (
                         filteredSubHeads.length > 0 ? (
                           filteredSubHeads.map((row, idx) => (
                               <tr 
                                 key={idx} 
                                 className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       function: formData.function === 'Add' ? 'Inquire' : formData.function,
                                       subHeadCode: row.shCode,
                                       subHeadName: row.name,
                                       parentGL: row.code
                                    });
                                 }}
                               >
                                 <td className="px-6 py-4 border-l-4 border-transparent group-hover:border-blue-400 transition-all">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${row.type === 'LIABILITY' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                                       {row.type}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-[11px] font-mono font-black text-slate-700">{row.code}</td>
                                 <td className="px-6 py-4 text-[10px] font-black text-slate-800 uppercase italic tracking-tight">{row.name}</td>
                                 <td className="px-6 py-4 text-[11px] font-mono font-black text-blue-600">{row.shCode}</td>
                                 <td className="px-6 py-4 text-right">
                                    <CheckCircle2 size={14} className="text-emerald-500 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                                 </td>
                               </tr>
                            ))
                         ) : (
                            <tr>
                               <td colSpan={6} className="px-6 py-12 text-center">
                                  <div className="flex flex-col items-center gap-2 opacity-30">
                                     <Search size={24} />
                                     <p className="text-[10px] font-black uppercase tracking-widest">No matching Sub Heads found</p>
                                  </div>
                               </td>
                            </tr>
                         )
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="flex justify-center gap-8 opacity-40 py-4">
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
              <ShieldAlert size={14} /> Audit Trail Enabled
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
              <CheckCircle2 size={14} /> Real-time Validation
           </div>
        </div>
      </div>

      <div className={`fixed bottom-8 right-8 animate-in slide-in-from-right-10 duration-500 ${isSuccess ? 'block' : 'hidden'}`}>
         <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500">
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">General Ledger Synchronized</span>
         </div>
      </div>
    </div>
  );
}
