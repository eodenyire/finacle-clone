import React, { useState } from 'react';
import { Search, Calendar, HelpCircle, X, ChevronRight, CheckCircle2, ShieldAlert, Zap, UserCheck, Eye, Download, Printer } from 'lucide-react';
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

  const [showResults, setShowResults] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGo = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowResults(true);
    }, 800);
  };

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
    <div className="flex flex-col h-full bg-[#f4f7f9] font-sans select-none overflow-y-auto">
      {/* Header Banner - Finacle SVS Style */}
      <div className="bg-[#003366] px-4 py-2 border-b border-slate-400 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
           <div className="bg-white p-1 rounded">
             <Logo variant="stacked" className="h-6 w-auto" />
           </div>
           <div className="h-6 w-px bg-blue-400/30"></div>
           <h1 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Signature Verification System <span className="text-blue-300">[SVS]</span></h1>
        </div>
        <div className="flex items-center gap-4 text-[9px] text-blue-100 font-bold">
          <span className="bg-blue-800/50 px-2 py-0.5 rounded border border-blue-700">SOL: 50000300</span>
          <span>User: SUGUNADG</span>
          <button className="w-6 h-6 bg-red-500/20 hover:bg-red-500 rounded flex items-center justify-center text-white transition-colors">
             <X size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Selection Criteria Card */}
        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
             <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight flex items-center gap-2">
                <Search size={14} className="text-blue-600" /> Image Access Criteria
             </span>
             <HelpCircle size={14} className="text-slate-400" />
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-1 relative group">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none z-0">
               <ShieldAlert size={200} className="text-blue-900" />
            </div>

            <div className="flex flex-col z-10">
              {renderField('A/c. Type', 'acType', 'select', false, ['N-Normal A/c.', 'C-Current A/c.', 'S-Savings A/c.'])}
              {renderField('CIF ID', 'cifId', 'text', true)}
              {renderField('Bank Code', 'bankCode')}
              {renderField('Image Access Code', 'imageAccessCode', 'text', true)}
              {renderField('Keyword', 'keyword')}
              {renderField('Signature Effective From', 'sigEffectiveFrom', 'date')}
              {renderField('Transaction Sub Type', 'txnSubType', 'select', false, ['---Select---', 'Cash', 'Transfer'])}
              {renderField('Transaction Type', 'txnType', 'select', false, ['---Select---', 'Normal', 'Special'])}
            </div>

            <div className="flex flex-col z-10">
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

          <div className="bg-slate-50 px-6 py-4 flex gap-3 border-t border-slate-200">
             <button 
               onClick={handleGo}
               className={`px-8 py-2 bg-[#003366] text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-[#002244] shadow-lg shadow-blue-900/10 transition-all flex items-center gap-2 ${isVerifying ? 'opacity-50' : ''}`}
               disabled={isVerifying}
             >
                {isVerifying ? <Zap size={14} className="animate-pulse" /> : <Eye size={14} />} 
                {isVerifying ? 'Scanning Vault...' : 'Fetch Signatures'}
             </button>
             <button 
               onClick={() => { setShowResults(false); setFormData({...formData, gifId: '', acId: ''}); }}
               className="px-6 py-2 bg-white border border-slate-300 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all font-mono"
             >
                Clear Form
             </button>
          </div>
        </div>

        {/* Results / SVS Application View */}
        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               {/* Primary Signature Display */}
               <div className="xl:col-span-2 bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                  <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                           <UserCheck size={20} />
                        </div>
                        <div>
                           <h2 className="text-sm font-black uppercase tracking-tight italic">Authenticated Signature Set</h2>
                           <p className="text-[9px] text-blue-200 font-bold uppercase tracking-widest">Linked to Account: {formData.acId || '50001009923'}</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"><Printer size={16} /></button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"><Download size={16} /></button>
                     </div>
                  </div>

                  <div className="flex-1 p-12 bg-[#fafbfc] flex items-center justify-center min-h-[400px] border-b border-slate-100 relative group">
                     {/* Mock Signature Image */}
                     <div className="relative">
                        <svg viewBox="0 0 400 200" className="w-[450px] h-auto text-blue-900 drop-shadow-xl" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                           <path d="M50 150 C 100 120, 150 180, 200 130 S 300 50, 350 100" />
                           <path d="M70 160 C 120 140, 170 190, 220 140 S 320 80, 370 120" opacity="0.3" strokeWidth="1" />
                           <path d="M40 100 L 80 100" opacity="0.4" />
                           <path d="M320 100 L 360 100" opacity="0.4" />
                        </svg>
                        <div className="absolute -top-10 -right-10 w-24 h-24 border-2 border-blue-600/20 rounded-full flex items-center justify-center animate-pulse">
                           <div className="w-16 h-16 border-2 border-blue-600/40 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="text-emerald-500" size={32} />
                           </div>
                        </div>
                     </div>

                     <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-300 uppercase italic tracking-widest select-none">
                        Digital Watermark: ENCRYPTED_VAULT_NODE_042
                     </div>
                  </div>

                  <div className="p-6 bg-slate-50 flex gap-6">
                     <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                           <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Signatory Name</span>
                           <span className="text-xs font-black text-slate-800 uppercase italic tracking-tight">ALEXANDER G. STERLING</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                           <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Signing Power</span>
                           <span className="text-xs font-black text-blue-600 uppercase italic tracking-tight">Sole Account Holder</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="px-6 py-3 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 active:scale-95">
                           <CheckCircle2 size={16} /> Mark as Verified
                        </button>
                     </div>
                  </div>
               </div>

               {/* Metadata & History Panel */}
               <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Account Integrity Assets</h3>
                     <div className="space-y-4">
                        {[
                          { l: 'Effective Date', v: '12-JAN-2022' },
                          { l: 'Expiry Date', v: 'No Expiry' },
                          { l: 'Last Verified', v: '04-MAY-2024' },
                          { l: 'Assigned SOL', v: '50000300' },
                          { l: 'Security Grade', v: 'PLATINUM' }
                        ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">{item.l}</span>
                              <span className="text-[10px] font-black text-slate-800 uppercase">{item.v}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Secondary Signatories</h3>
                     <div className="flex flex-col gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-blue-500 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-[10px]">BM</div>
                           <div>
                              <p className="text-[11px] font-black text-slate-800 leading-none">BEATRICE M. VANCE</p>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Joint Holder (Either or Survivor)</span>
                           </div>
                           <ChevronRight size={14} className="ml-auto text-slate-300" />
                        </div>
                        <div className="p-3 bg-slate-50/50 rounded-xl border-l-4 border-slate-200 flex items-center gap-3 opacity-60">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[10px]">NA</div>
                           <div>
                              <p className="text-[11px] font-black text-slate-400 leading-none">NO SECONDARY HANDS</p>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Solo Authority Account</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto h-6 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-black uppercase tracking-widest shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex-1 flex gap-6">
           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> System Integrated</span>
           <span className="text-slate-500">Vault Session: VLT-99827-01</span>
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

