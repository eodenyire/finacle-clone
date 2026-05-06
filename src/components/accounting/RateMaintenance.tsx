import React, { useState, useEffect } from 'react';
import { fetchRateCodes, updateRateCode, RateCode } from '../../services/api';
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
  const [selectedSubMode, setSelectedSubMode] = useState<'MAINTAIN' | 'ADD' | 'INQUIRE' | 'VERIFY' | 'DELETE'>('MAINTAIN');
  const [rateCodeData, setRateCodeData] = useState({
    code: '',
    description: '',
    fixedCurr: 'USD',
    varCurr: '',
    buySpread: '0.0000',
    sellSpread: '0.0000',
    midSpread: '0.0000',
    spreadVerification: '0.0000',
    authLevel: 'LEVEL 1 - MAKER'
  });

  const [rateCodes, setRateCodes] = useState<RateCode[]>([]);

  useEffect(() => {
    const loadRates = async () => {
      try {
        setIsProcessing(true);
        const data = await fetchRateCodes();
        setRateCodes(data);
      } catch (err) {
        console.error('Error fetching rate codes:', err);
      } finally {
        setIsProcessing(false);
      }
    };
    loadRates();
  }, []);

  const handleSave = async () => {
    if (!rateCodeData.code) {
      alert('No rate code selected for update.');
      return;
    }

    try {
      setIsProcessing(true);
      const updated = await updateRateCode(rateCodeData.code, {
        desc: rateCodeData.description,
        fixed: rateCodeData.fixedCurr,
        var: rateCodeData.varCurr,
        buy: rateCodeData.buySpread,
        sell: rateCodeData.sellSpread,
        mid: rateCodeData.midSpread,
        verify: rateCodeData.spreadVerification
      });

      // Update local state
      setRateCodes(prev => prev.map(rc => rc.code === updated.code ? updated : rc));
      alert('Configuration committed successfully to terminal node.');
    } catch (err) {
      console.error('Error updating rate code:', err);
      alert('Failed to update rate configuration.');
    } finally {
      setIsProcessing(false);
    }
  };

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
                 <select 
                   value={selectedSubMode}
                   onChange={(e) => setSelectedSubMode(e.target.value as any)}
                   className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500"
                 >
                    <option value="MAINTAIN">M - MAINTAIN</option>
                    <option value="ADD">A - ADD RATE</option>
                    <option value="INQUIRE">I - INQUIRE</option>
                    <option value="VERIFY">V - VERIFY</option>
                    <option value="DELETE">D - DELETE</option>
                 </select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                 <label className="text-[9px] font-black text-slate-400 block ml-1">
                    {mode === 'COUNTRY_CURR' ? 'Currency Code' : 'Rate Code / Reference'}
                 </label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. USD / BASE_RATE" 
                      className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono shadow-inner uppercase" 
                    />
                    <button 
                      onClick={handleInquiry}
                      className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                    >
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
                     <input 
                        type="text" 
                        value={rateCodeData.description}
                        onChange={(e) => setRateCodeData({...rateCodeData, description: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Fixed Currency</label>
                     <input 
                        type="text" 
                        placeholder="USD" 
                        value={rateCodeData.fixedCurr}
                        onChange={(e) => setRateCodeData({...rateCodeData, fixedCurr: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Variable Currency</label>
                     <input 
                        type="text" 
                        placeholder="INR" 
                        value={rateCodeData.varCurr}
                        onChange={(e) => setRateCodeData({...rateCodeData, varCurr: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Buy Spread</label>
                     <input 
                        type="text" 
                        placeholder="0.0000" 
                        value={rateCodeData.buySpread}
                        onChange={(e) => setRateCodeData({...rateCodeData, buySpread: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Sell Spread</label>
                     <input 
                        type="text" 
                        placeholder="0.0000" 
                        value={rateCodeData.sellSpread}
                        onChange={(e) => setRateCodeData({...rateCodeData, sellSpread: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Mid Spread</label>
                     <input 
                        type="text" 
                        placeholder="0.0000" 
                        value={rateCodeData.midSpread}
                        onChange={(e) => setRateCodeData({...rateCodeData, midSpread: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-400 block ml-1">Spread Verification</label>
                     <input 
                        type="text" 
                        placeholder="0.0000" 
                        value={rateCodeData.spreadVerification}
                        onChange={(e) => setRateCodeData({...rateCodeData, spreadVerification: e.target.value})}
                        className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 font-mono" 
                        disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'} 
                     />
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
                 <label className="text-[9px] font-black text-slate-400 block ml-1">Auth Level Required</label>
                 <select 
                   value={rateCodeData.authLevel}
                   onChange={(e) => setRateCodeData({...rateCodeData, authLevel: e.target.value})}
                   className="w-full border-b-2 border-slate-100 py-2 text-xs font-black text-slate-700 outline-none focus:border-blue-500 bg-transparent"
                   disabled={selectedSubMode === 'INQUIRE' || selectedSubMode === 'VERIFY'}
                 >
                    <option>LEVEL 1 - MAKER</option>
                    <option>LEVEL 2 - CHECKER</option>
                    <option>LEVEL 3 - SUPV</option>
                 </select>
              </div>
           </div>

           {mode === 'RATE_CODE' && selectedSubMode === 'INQUIRE' && (
              <div className="mt-12 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Fixed/Var</th>
                      <th className="px-6 py-4">Buy Spread</th>
                      <th className="px-6 py-4">Sell Spread</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rateCodes.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 text-[10px] font-black text-slate-700 font-mono">{r.code}</td>
                        <td className="px-6 py-4 text-[10px] font-bold text-slate-500">{r.desc}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-blue-600">{r.fixed}/{r.var}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-emerald-600 font-mono">{r.buy}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-rose-600 font-mono">{r.sell}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => {
                              setRateCodeData({
                                code: r.code,
                                description: r.desc,
                                fixedCurr: r.fixed,
                                varCurr: r.var,
                                buySpread: r.buy,
                                sellSpread: r.sell,
                                midSpread: r.mid,
                                spreadVerification: r.verify || '0.0000',
                                authLevel: 'LEVEL 1 - MAKER'
                              });
                              setSelectedSubMode('MAINTAIN');
                            }}
                            className="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                          >
                            Modify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

           <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end gap-4">
              <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 tracking-widest hover:bg-slate-50 transition-all">Discard Changes</button>
              <button 
                onClick={handleSave}
                disabled={isProcessing}
                className="px-12 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center gap-3 disabled:opacity-50"
              >
                 {isProcessing ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />} 
                 {selectedSubMode === 'VERIFY' ? 'Approve Configuration' : 'Commit Configuration'}
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
