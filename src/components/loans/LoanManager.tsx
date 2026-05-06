import React, { useState } from 'react';
import { 
  BarChart3, 
  HelpCircle, 
  X, 
  Search, 
  RefreshCcw, 
  ShieldCheck, 
  Save, 
  Printer, 
  ChevronRight, 
  Info,
  Calendar,
  FileText,
  CreditCard,
  User,
  Plus,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  History,
  Coins,
  Calculator,
  ArrowRightLeft,
  FileSearch,
  PieChart,
  Repeat,
  ChevronDown
} from 'lucide-react';

export type LoanMode = 
  | 'OPENING' | 'MOD' | 'VERIFY' | 'DISBURSE' | 'DEMAND_GEN' 
  | 'SCHED_PAY' | 'DEMAND_SAT' | 'UNSCHED_PAY' | 'RESCHEDULE' 
  | 'INT_MAINT' | 'FEE_MAINT' | 'FEE_WAIVE' | 'PAYOFF_INQ' 
  | 'TXN_INQ' | 'LEDGER_INQ' | 'FEE_INQ' | 'PAY_HIST' 
  | 'PREPAY_HIST' | 'SCHED_INQ' | 'DOC_REPORT' | 'GEN_INQ' 
  | 'GEN_DETAIL_INQ' | 'CHARGES_INQ' | 'STATEMENT';

interface LoanManagerProps {
  mode: LoanMode;
}

export default function LoanManager({ mode }: LoanManagerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [loanId, setLoanId] = useState('');

  // Rescheduling specific state
  const [rescheduleData, setRescheduleData] = useState({
    newPrincipal: 45000,
    currentEMI: 1200,
    newTenure: 48,
    newRate: 11.5,
    calculatedEMI: 0,
    rescheduleMethod: 'AMORTIZE_OUTSTANDING',
    capitalizeArrears: false,
    moratoriumPeriod: 0,
    rescheduleReason: '',
    newStartDate: '',
    effectiveDate: ''
  });

  const [scheduleHistory, setScheduleHistory] = useState([
    { id: 'SCH-001', date: '2024-01-15', emi: 1200, tenure: 60, rate: 10.5, status: 'SUPERSEDED' },
    { id: 'SCH-002', date: '2025-06-10', emi: 1150, tenure: 54, rate: 10.2, status: 'ACTIVE' },
  ]);

  const getTitle = () => {
    switch (mode) {
      case 'OPENING': return 'Loan Account Opening [HOAACLA]';
      case 'MOD': return 'Loan Account Modification [HOAACMLA]';
      case 'VERIFY': return 'Loan Account Verification [HOAACVLA]';
      case 'DISBURSE': return 'Loan Disbursement Maintenance [HLADISB]';
      case 'DEMAND_GEN': return 'Loan Demand Generation Batch [HLADGEN]';
      case 'SCHED_PAY': return 'Scheduled Loan Payment [HLASPAY]';
      case 'DEMAND_SAT': return 'Demand Satisfaction Process [HLADSP]';
      case 'UNSCHED_PAY': return 'Unscheduled / Pre-Payment [HLAUPAY]';
      case 'RESCHEDULE': return 'Loan Rescheduling & Amendment [HLARA]';
      case 'INT_MAINT': return 'Loan Interest Table Maintenance [HLINTTM]';
      case 'FEE_MAINT': return 'Loan Fee Collection/Refund [HLAFACR]';
      case 'FEE_WAIVE': return 'Loan Fee Waiver Maintenance [HLAWFEE]';
      case 'PAYOFF_INQ': return 'Loan Payoff Inquiry & Closure [HPAYOFF]';
      case 'TXN_INQ': return 'Loan Transaction Inquiry [HACLI]';
      case 'LEDGER_INQ': return 'Loan Account Ledger Inquiry [HLACLI]';
      case 'FEE_INQ': return 'Loan Fee Details Inquiry [HLFEEI]';
      case 'PAY_HIST': return 'Payment History Repository [HLPAYH]';
      case 'PREPAY_HIST': return 'Pre-payment History Inquiry [HLPREPH]';
      case 'SCHED_INQ': return 'Repayment Schedule Inquiry [HLRPSI]';
      case 'DOC_REPORT': return 'Loan Document Report Gen [HDOCTR]';
      case 'GEN_INQ': return 'LOAN Account General Inquiry [HLAGI]';
      case 'GEN_DETAIL_INQ': return 'Loan Detail Attribute Inquiry [HLNGI]';
      case 'CHARGES_INQ': return 'Loan Charges Cluster Inquiry [HCCI]';
      case 'STATEMENT': return 'Loan Account Statement [HLAPSP]';
      default: return 'Loan Management Hub';
    }
  };

  const handleFetch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowWorkflow(true);
      // Mock calculation for rescheduling
      if (mode === 'RESCHEDULE') {
        calculateEMI();
      }
    }, 1000);
  };

  const calculateEMI = () => {
    const p = rescheduleData.newPrincipal;
    const rate = rescheduleData.newRate;
    const n = rescheduleData.newTenure;
    
    if (n <= 0) {
      setRescheduleData(prev => ({ ...prev, calculatedEMI: 0 }));
      return;
    }

    if (rate === 0) {
      setRescheduleData(prev => ({ ...prev, calculatedEMI: Math.round((p / n) * 100) / 100 }));
      return;
    }

    const r = (rate / 100) / 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setRescheduleData(prev => ({ ...prev, calculatedEMI: isFinite(emi) ? Math.round(emi * 100) / 100 : 0 }));
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfdff] font-sans selection:bg-indigo-100 italic">
      {/* Dynamic Header */}
      <div className="bg-[#1e1b4b] px-10 py-5 flex justify-between items-center shadow-2xl border-b border-indigo-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-300 border border-white/10 backdrop-blur-md">
              <BarChart3 size={22} strokeWidth={3} />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.25em] leading-none mb-1">
                 {getTitle()}
              </h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest opacity-80 italic">Credit Asset Lifecycle Configuration Architecture</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Asset Sync Live</span>
           </div>
           <button className="w-10 h-10 bg-white/5 hover:bg-slate-800 rounded-xl flex items-center justify-center text-white transition-all shadow-xl">
              <X size={20} strokeWidth={3} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Verification / Selection Card */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl p-10 lg:p-14 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] opacity-40"></div>
           
           <div className="relative space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Function</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 appearance-none shadow-sm cursor-pointer italic">
                       <option>M - MODIFY / AMEND</option>
                       <option>A - ADD NEW SCHED</option>
                       <option>R - RESCHEDULE</option>
                       <option>V - VERIFY</option>
                       <option>I - INQUIRE</option>
                    </select>
                 </div>

                 <div className="space-y-3 lg:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Loan Account ID</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         value={loanId}
                         onChange={(e) => setLoanId(e.target.value)}
                         placeholder="e.g. LA-2026-99182" 
                         className="flex-1 bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 font-mono shadow-inner italic uppercase" 
                       />
                       <button 
                         onClick={handleFetch}
                         className="h-[68px] px-12 bg-[#1e1b4b] text-white rounded-[2rem] flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.25em] hover:bg-slate-900 transition-all shadow-2xl active:scale-95 group border border-indigo-700/30"
                       >
                          {isProcessing ? <RefreshCcw size={20} className="animate-spin text-indigo-400" /> : <FileSearch size={20} className="group-hover:scale-110 transition-transform" />}
                          {isProcessing ? 'SCANNING...' : 'FETCH LEDGER'}
                       </button>
                    </div>
                 </div>

                 {(mode === 'SCHED_PAY' || mode === 'UNSCHED_PAY' || mode === 'DISBURSE') && (
                    <div className="space-y-3 animate-in zoom-in duration-300">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Transactional Amount</label>
                       <div className="relative">
                          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400">USD</span>
                          <input type="text" placeholder="0.00" className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-20 pr-8 py-5 text-sm font-black text-indigo-900 font-mono outline-none focus:border-indigo-500 shadow-sm" />
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Dynamic Workflow Area */}
        {showWorkflow && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
             
             {/* Rescheduling Workbench (Special mode) */}
             {mode === 'RESCHEDULE' ? (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                     <div className="bg-white rounded-[4rem] p-12 border-2 border-slate-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative space-y-12">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl">
                                    <Calculator size={32} />
                                 </div>
                                 <div>
                                    <h3 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Amortization Workbench</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Recalculating EMI based on outstanding principal</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2 px-6 py-2 bg-slate-50 rounded-full border border-slate-100">
                                 <ArrowRightLeft size={14} className="text-indigo-500" />
                                 <span className="text-[10px] font-black text-slate-500 uppercase italic">Method: HLARA-V1</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-8">
                                 <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 italic shadow-inner">
                                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] border-b border-indigo-100 pb-4 mb-4">Principal & Tenure Configuration</h4>
                                    <div className="space-y-4">
                                       <div className="space-y-2">
                                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-1">New Principal</label>
                                          <div className="relative">
                                             <input 
                                               type="number" 
                                               value={rescheduleData.newPrincipal}
                                               onChange={(e) => setRescheduleData({...rescheduleData, newPrincipal: parseFloat(e.target.value) || 0})}
                                               className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm font-mono" 
                                             />
                                             <Coins size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                          </div>
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-1">New Tenure (Months)</label>
                                          <div className="relative">
                                             <input 
                                               type="number" 
                                               value={rescheduleData.newTenure}
                                               onChange={(e) => setRescheduleData({...rescheduleData, newTenure: parseInt(e.target.value) || 0})}
                                               className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm font-mono" 
                                             />
                                             <Calendar size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="space-y-4 px-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Reschedule Method</label>
                                    <div className="relative">
                                       <select 
                                          value={rescheduleData.rescheduleMethod}
                                          onChange={(e) => setRescheduleData({...rescheduleData, rescheduleMethod: e.target.value})}
                                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 text-xs font-black text-slate-800 outline-none focus:border-indigo-500 appearance-none italic transition-all"
                                       >
                                          <option value="AMORTIZE_OUTSTANDING">Amortize Outstanding Balance</option>
                                          <option value="CAPITALIZE_RESTRUCTURE">Capitalize Interest & Amortize</option>
                                          <option value="EXTEND_TENURE_ONLY">Extend Tenure (Same EMI)</option>
                                          <option value="BULLET_RESCHEDULE">Bullet Payment Entry</option>
                                       </select>
                                       <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                 </div>

                                 <div className="space-y-3 px-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Reschedule Reason</label>
                                    <textarea 
                                       value={rescheduleData.rescheduleReason}
                                       onChange={(e) => setRescheduleData({...rescheduleData, rescheduleReason: e.target.value})}
                                       className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 text-xs font-black text-slate-800 outline-none focus:border-indigo-500 italic transition-all min-h-[100px]"
                                       placeholder="Provide justification for rescheduling..."
                                    />
                                 </div>

                                 <div className="flex items-center gap-4 px-4 py-2 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer" onClick={() => setRescheduleData(p => ({...p, capitalizeArrears: !p.capitalizeArrears}))}>
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${rescheduleData.capitalizeArrears ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200'}`}>
                                       {rescheduleData.capitalizeArrears && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Capitalize Outstanding Arrears</span>
                                 </div>
                              </div>

                              <div className="space-y-8">
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">New Interest Rate (%)</label>
                                    <div className="relative">
                                       <input 
                                         type="number" 
                                         step="0.1"
                                         value={rescheduleData.newRate}
                                         onChange={(e) => setRescheduleData({...rescheduleData, newRate: parseFloat(e.target.value) || 0})}
                                         className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm font-mono" 
                                       />
                                       <TrendingUp size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300" />
                                    </div>
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Holiday / Moratorium (Prev. Months)</label>
                                    <input 
                                      type="number" 
                                      value={rescheduleData.moratoriumPeriod}
                                      onChange={(e) => setRescheduleData({...rescheduleData, moratoriumPeriod: parseInt(e.target.value)})}
                                      className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-4 text-sm font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm" 
                                    />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">New Start Date</label>
                                       <div className="relative">
                                          <input 
                                            type="date" 
                                            value={rescheduleData.newStartDate}
                                            onChange={(e) => setRescheduleData({...rescheduleData, newStartDate: e.target.value})}
                                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm" 
                                          />
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Effective Date</label>
                                       <div className="relative">
                                          <input 
                                            type="date" 
                                            value={rescheduleData.effectiveDate}
                                            onChange={(e) => setRescheduleData({...rescheduleData, effectiveDate: e.target.value})}
                                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-xs font-black text-indigo-900 outline-none focus:border-indigo-500 shadow-sm" 
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <button 
                                   onClick={calculateEMI}
                                   className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-4 italic active:scale-95"
                                 >
                                    <Repeat size={18} /> Calculate New Schedule
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-[3rem] p-12 border-2 border-slate-100 shadow-xl space-y-10">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                           <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] italic flex items-center gap-3">
                              <History size={18} className="text-indigo-600" /> Rescheduling History & Inquiries
                           </h4>
                           <span className="text-[9px] font-black text-slate-400 uppercase italic">Inquiry Menu: HLOPI</span>
                        </div>
                        
                        <div className="overflow-x-auto">
                           <table className="w-full italic">
                              <thead>
                                 <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-left border-b border-slate-50">
                                    <tr className="pb-4">No.</tr>
                                    <tr className="pb-4 text-center">Ref ID</tr>
                                    <tr className="pb-4">Effective Date</tr>
                                    <tr className="pb-4">Prev EMI</tr>
                                    <tr className="pb-4">New EMI</tr>
                                    <tr className="pb-4">Status</tr>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 {scheduleHistory.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                       <td className="py-6 text-[10px] font-black text-slate-400">0{idx + 1}</td>
                                       <td className="py-6 text-[10px] font-black text-indigo-600 uppercase font-mono text-center">{item.id}</td>
                                       <td className="py-6 text-[10px] font-black text-slate-600 uppercase">{item.date}</td>
                                       <td className="py-6 text-[10px] font-black text-slate-500">$ {item.emi}</td>
                                       <td className="py-6 text-[10px] font-black text-slate-900 tracking-tighter">
                                          {idx === 0 ? '$ 1,200' : '$ 1,150'}
                                       </td>
                                       <td className="py-6">
                                          <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${item.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                             {item.status}
                                          </span>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="bg-[#1e1b4b] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
                        <div className="relative space-y-10 text-center">
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Projected New EMI</p>
                           <h2 className="text-6xl font-black italic tracking-tighter text-indigo-100 leading-none">
                              $ {rescheduleData.calculatedEMI.toLocaleString()}
                           </h2>
                           <div className="pt-10 border-t border-white/5 space-y-6">
                              <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                                 <span className="text-slate-400">Previous EMI</span>
                                 <span>$ {rescheduleData.currentEMI.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                                 <span className="text-slate-400">EMI Variance</span>
                                 <span className={`font-black ${rescheduleData.calculatedEMI < rescheduleData.currentEMI ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {rescheduleData.calculatedEMI < rescheduleData.currentEMI ? '-' : '+'} $ {Math.abs(rescheduleData.currentEMI - rescheduleData.calculatedEMI).toFixed(2)}
                                 </span>
                              </div>
                           </div>
                           <button className="w-full mt-4 py-6 bg-white text-indigo-900 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-100 italic shadow-xl active:scale-95">
                             Execute Amendment
                           </button>
                        </div>
                     </div>

                     <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 space-y-8 shadow-xl relative overflow-hidden italic">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full"></div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                           <Info size={14} className="text-indigo-400" /> Amortization Summary
                        </h4>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Impact on Total Interest</p>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                 <div className="bg-indigo-600 h-full w-[65%]"></div>
                              </div>
                              <p className="text-[9px] font-black text-slate-900 uppercase">Est. Saving: $ 4,200 (15.2%)</p>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Tenure Adjustment</p>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                 <div className="bg-emerald-500 h-full w-[80%]"></div>
                              </div>
                              <p className="text-[9px] font-black text-slate-900 uppercase">Extended by 12 Months</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             ) : (
               /* Generic Workflow View */
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-3 bg-white rounded-[4rem] p-14 border-2 border-slate-100 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
                     <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="space-y-12">
                           <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-xl">
                                 <Plus size={32} />
                              </div>
                              <div>
                                 <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">LA-2026-99182</h2>
                                 <p className="text-[11px] font-black tracking-[0.3em] text-indigo-600 uppercase mt-2">Active Credit Asset Profile</p>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                              <div>
                                 <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Principal</span>
                                 <span className="text-xl font-black italic">$ 125,000.00</span>
                              </div>
                              <div>
                                 <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Repaid</span>
                                 <span className="text-xl font-black italic text-emerald-600">$ 80,000.00</span>
                              </div>
                              <div>
                                 <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest italic">Outstanding</span>
                                 <span className="text-xl font-black italic text-rose-600">$ 45,000.00</span>
                              </div>
                           </div>

                           <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-6">
                              <button className="flex items-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 italic">
                                 <Save size={18} /> Update Asset Ledger
                              </button>
                              <button className="flex items-center gap-3 px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all italic border border-slate-200">
                                 <Printer size={18} /> Print Record
                              </button>
                           </div>
                        </div>

                        <div className="w-full md:w-80 space-y-6">
                           <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6 shadow-2xl relative overflow-hidden">
                              <div className="absolute inset-0 bg-indigo-500/5 opacity-50"></div>
                              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic border-b border-white/5 pb-4">Lifecycle Audit</h4>
                              <div className="space-y-4">
                                 {[
                                   { lb: 'Asset_Class', val: 'STANDARD' },
                                   { lb: 'OD_Position', val: 'NONE' },
                                   { lb: 'SANC_Limit', val: '150K' },
                                 ].map((v, i) => (
                                   <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase opacity-70">
                                      <span className="text-slate-500">{v.lb}</span>
                                      <span className="text-indigo-300">{v.val}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 shadow-xl space-y-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                           <History size={14} /> Recent Payments
                        </h4>
                        <div className="space-y-3">
                           {[1, 2, 3].map((_, i) => (
                             <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center hover:bg-indigo-50/50 transition-all border border-slate-100">
                                <div>
                                   <p className="text-[9px] font-black text-slate-800 uppercase italic">Sch. Rec#992{i}</p>
                                   <span className="text-[8px] font-bold text-slate-400 uppercase">22-MAY-2026</span>
                                </div>
                                <span className="text-xs font-black italic">$ 1,200</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             )}

          </div>
        )}

      </div>

      {/* Terminal Persistence */}
      <div className="bg-white border-t border-slate-200 py-3 px-10 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-[0.25em] italic uppercase">
         <div className="flex gap-12">
            <span className="flex items-center gap-2"><Lock size={12} className="text-emerald-500" /> AES_512_ENCRYPTED</span>
            <span className="flex items-center gap-2"><CreditCard size={12} /> ASSET_CLASS: STA</span>
         </div>
         <span className="flex items-center gap-4">
            <span className="text-indigo-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div> ASSET_LEDGER_UP_TO_DATE</span>
            <span className="text-slate-200 px-3">|</span>
            <span>SOL_ID: 5001</span>
            <span className="text-slate-200 px-3">|</span>
            <span>OPR: JS_99182</span>
         </span>
      </div>
    </div>
  );
}

const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
