import React, { useState } from 'react';
import { 
  TrendingUp, 
  HelpCircle, 
  X, 
  Search, 
  RefreshCcw, 
  ShieldCheck, 
  Save, 
  Printer, 
  Database,
  History,
  Lock,
  Globe,
  Settings2,
  ChevronRight,
  Info
} from 'lucide-react';

type RateMode = 'RATE_CODE' | 'RATE_SEQ' | 'COUNTRY_CURR' | 'HOME_LIST' | 'HISTORY' | 'CONCESSION';

interface RateMaintenanceProps {
  mode: RateMode;
}

export default function RateMaintenance({ mode }: RateMaintenanceProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getTitle = () => {
    switch (mode) {
      case 'RATE_CODE': return 'Rate Code Maintenance [HMNTRTM]';
      case 'RATE_SEQ': return 'Rate Code Sequence Maint [HMNTRTSQ]';
      case 'COUNTRY_CURR': return 'Country Currency Maintenance [HCNCM]';
      case 'HOME_LIST': return 'Home Currency Rate List [HMNTRTLH]';
      case 'HISTORY': return 'Rate History Inquiry [HRTHQRY]';
      case 'CONCESSION': return 'Rate Concession Maintenance [HCLERPM]';
      default: return 'Rate Maintenance';
    }
  };

  const handleInquiry = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans selection:bg-blue-100 uppercase tracking-tight italic">
      {/* Header */}
      <div className="bg-[#0f172a] px-8 py-5 flex justify-between items-center border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <TrendingUp size={20} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white tracking-[0.2em]">{getTitle()}</h1>
              <p className="text-[9px] font-bold text-slate-400 tracking-widest mt-0.5">FX Engine Configuration & Settlement Layers</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[8px] font-black text-slate-400">Node: FX_CORE_01</span>
           </div>
           <button className="w-8 h-8 hover:bg-red-500/20 text-slate-500 hover:text-red-500 transition-all rounded-lg flex items-center justify-center">
              <X size={18} />
           </button>
        </div>
      </div>

      <div className="p-8 lg:p-12 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Search/Criteria Card */}
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden">
           <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 tracking-widest">
              <span>Primary Lookup Parameters</span>
              <Settings2 size={14} />
           </div>
           <div className="p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2 lg:col-span-1">
                 <label className="text-[9px] font-black text-slate-400 block ml-1">Selection Function</label>
                 <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500">
                    <option>M - MAINTAIN</option>
                    <option>A - ADD RATE</option>
                    <option>I - INQUIRE</option>
                    <option>V - VERIFY</option>
                    <option>D - DELETE</option>
                 </select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                 <label className="text-[9px] font-black text-slate-400 block ml-1">
                    {mode === 'COUNTRY_CURR' ? 'Currency Code' : 'Rate Code / Reference'}
                 </label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. USD / BASE_RATE" 
                      className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono shadow-inner uppercase" 
                    />
                    <button className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                       <Search size={20} />
                    </button>
                 </div>
              </div>

              <div className="flex items-end">
                 <button 
                  onClick={handleInquiry}
                  className="w-full h-14 bg-[#0f172a] text-white rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-lg hover:shadow-blue-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                 >
                    {isProcessing ? <RefreshCcw size={16} className="animate-spin text-blue-400" /> : <Database size={16} />}
                    {isProcessing ? 'Syncing...' : 'Fetch Parameters'}
                 </button>
              </div>
           </div>
        </div>

        {/* Detailed Fields (Conditional Based on Mode) */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <h2 className="text-[11px] font-black text-blue-600 tracking-[0.3em] mb-10 flex items-center gap-3">
              <ShieldCheck size={16} /> Asset Configuration Schema
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mode === 'RATE_CODE' && (
                <>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Rate Description</label>
                     <input type="text" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Fixed Currency</label>
                     <input type="text" placeholder="USD" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Variable Currency</label>
                     <input type="text" placeholder="INR" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                </>
              )}

              {mode === 'RATE_SEQ' && (
                <>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Sequence Priority</label>
                     <input type="number" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Effective Execution Date</label>
                     <input type="date" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                </>
              )}

              {mode === 'COUNTRY_CURR' && (
                <>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Decimal Places</label>
                     <input type="number" defaultValue={2} className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Country ISO Code</label>
                     <input type="text" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" />
                  </div>
                </>
              )}

              {/* Shared Fields */}
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-400 block ml-1">Spread Verification</label>
                 <input type="text" placeholder="0.0000" className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono" />
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-400 block ml-1">Auth Level Required</label>
                 <select className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 bg-transparent">
                    <option>LEVEL 1 - MAKER</option>
                    <option>LEVEL 2 - CHECKER</option>
                    <option>LEVEL 3 - SUPV</option>
                 </select>
              </div>
           </div>

           <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end gap-4">
              <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 tracking-widest hover:bg-slate-50 transition-all">Discard Changes</button>
              <button className="px-12 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center gap-3">
                 <Save size={16} /> Commit Configuration
              </button>
           </div>
        </div>

        {/* Informational Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
              <div className="relative">
                 <h4 className="text-[10px] font-black text-blue-400 tracking-widest mb-4">Historical Rate Pulse</h4>
                 <div className="space-y-4">
                    {[
                      { pair: 'USD/INR', val: '83.42', trend: '+0.02' },
                      { pair: 'EUR/INR', val: '90.15', trend: '-0.15' },
                      { pair: 'GBP/INR', val: '105.20', trend: '+0.32' },
                    ].map((rate, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                         <span className="text-[10px] font-black font-mono">{rate.pair}</span>
                         <div className="text-right">
                            <p className="text-[11px] font-black font-mono tracking-tighter">{rate.val}</p>
                            <span className={`text-[8px] font-bold ${rate.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{rate.trend}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-8 bg-blue-50 border-2 border-blue-100 rounded-[2rem] space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                 <History size={24} />
              </div>
              <h4 className="text-[10px] font-black text-blue-900 tracking-widest">Rate Log Audit</h4>
              <p className="text-[10px] font-medium text-blue-700 opacity-70 leading-relaxed uppercase">
                 All rate changes are logged in the transaction secure vault. Last change made by <span className="font-black">USER_FX_902</span> at <span className="font-black">18:42:10 GST</span>.
              </p>
              <button className="flex items-center gap-2 text-[9px] font-black text-blue-600 tracking-widest mt-4 group">
                 Open Full History <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="p-8 bg-white border-2 border-slate-100 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-4 shadow-xl">
              <Globe className="text-slate-200" size={48} />
              <div className="space-y-1">
                 <h5 className="text-[10px] font-black text-slate-900 tracking-widest">Market Feed: Active</h5>
                 <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase">Bloomberg Terminal Sync 0.4ms Latency</p>
              </div>
              <div className="flex gap-2 mt-2">
                 <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-100">
                    <Printer size={16} className="text-slate-400" />
                 </button>
                 <button className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-[9px] font-black tracking-widest hover:bg-emerald-100 transition-all border border-emerald-100">
                    Force RE-SYNC
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Persistence Bar */}
      <div className="mt-auto h-10 bg-white border-t border-slate-200 flex items-center px-10 text-[9px] text-slate-400 font-bold tracking-[0.2em]">
         <Lock size={12} className="mr-2" /> 
         <span>Secure Session Hash: {Math.random().toString(36).substring(7).toUpperCase()}</span>
         <span className="ml-auto flex items-center gap-4">
            <span className="text-emerald-500 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> FX_LIVE</span>
            <span className="text-slate-300">|</span>
            <span>SOL: 5001</span>
            <span className="text-slate-300">|</span>
            <span>OPR: AS_992</span>
         </span>
      </div>
    </div>
  );
}
