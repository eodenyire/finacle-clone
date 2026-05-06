import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, AlertTriangle, ShieldCheck, X, FileText, Calendar, DollarSign, RefreshCcw } from 'lucide-react';
import { fetchTransactions, reverseTransaction, Transaction } from '../../services/api';

interface ReversalTxn {
  id: string;
  date: string;
  amount: string;
  currency: string;
  drAccount: string;
  crAccount: string;
  type: string;
  scheme: string;
}

const MOCK_TXNS: ReversalTxn[] = [
  { id: 'S991023', date: '2024-05-01', amount: '1250.00', currency: 'USD', drAccount: '0000045182', crAccount: '1100223344', type: 'CASH DEPOSIT', scheme: 'SBA' },
  { id: 'S991024', date: '2024-05-01', amount: '500.00', currency: 'USD', drAccount: '0000045182', crAccount: '2233445566', type: 'TRANSFER', scheme: 'CAA' },
];

export default function TransactionReversal() {
  const [searchId, setSearchId] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [reversalReason, setReversalReason] = useState('');
  const [reversalReasonCode, setReversalReasonCode] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR' | 'PROCESSING'>('IDLE');
  const [contraTxn, setContraTxn] = useState<Transaction | null>(null);

  const REASON_CODES = [
    { code: 'ERR_DATA_ENTRY', label: 'Data Entry Error' },
    { code: 'CUST_REQ', label: 'Customer Request' },
    { code: 'DUPLICATE_TXN', label: 'Duplicate Transaction' },
    { code: 'SYSTEM_ERR', label: 'System Error' },
    { code: 'WRONG_ACCT', label: 'Incorrect Account Details' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    try {
      const txns = await fetchTransactions();
      const txn = txns.find(t => t.id === searchId.toUpperCase() || t.id === searchId);
      if (txn) {
        setSelectedTxn(txn);
        setStatus('IDLE');
      } else {
        setSelectedTxn(null);
        setStatus('ERROR');
      }
    } catch (err) {
      console.error(err);
      setStatus('ERROR');
    }
  };

  const handleReverse = async () => {
    if (!selectedTxn || !reversalReasonCode || !reversalReason || !supervisorId) return;
    setStatus('PROCESSING');
    try {
      const result = await reverseTransaction(selectedTxn.id, {
        reason: reversalReason,
        reasonCode: reversalReasonCode,
        supervisorId
      });
      if (result.success) {
        setContraTxn(result.contra);
        setStatus('SUCCESS');
      }
    } catch (err: any) {
      alert(err.message || 'Reversal failed');
      setStatus('IDLE');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-[#003366] text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <RotateCcw size={20} className="text-blue-300" />
          </div>
          <div>
            <h1 className="text-sm font-black italic tracking-tighter uppercase">HCRT - Transaction Reversal</h1>
            <p className="text-[9px] font-bold text-blue-200 uppercase tracking-widest opacity-80">Security Solutions // Reversal Maintenance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black bg-blue-500/30 px-2 py-0.5 rounded border border-blue-400/30">MODULE: TM</span>
           <button className="text-white/60 hover:text-white transition-colors">
              <X size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Search size={12} />
            Identify Original Transaction
          </h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Transaction ID (e.g. S991023)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-mono font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-blue-600/20"
            >
              Fetch Details
            </button>
          </form>
          {status === 'ERROR' && (
            <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle size={10} />
              Transaction ID not found or already reversed.
            </p>
          )}
        </div>

        {selectedTxn && status !== 'SUCCESS' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Transaction Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction Details</span>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">STATUS: AUTHORIZED</span>
                </div>
                    <div className="p-6 grid grid-cols-2 gap-y-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Primary Account</span>
                    <p className="font-mono font-black text-blue-900">{selectedTxn.legs[0]?.accountNo || 'N/A'}</p>
                    <p className="text-[10px] text-slate-500 font-medium">CORE LEDGER ACCOUNT // {selectedTxn.batchId}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Value Date</span>
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-slate-400" />
                       <p className="font-mono font-black text-slate-700 uppercase">{selectedTxn.date}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Transaction Type</span>
                    <div className="flex items-center gap-2">
                       <FileText size={14} className="text-slate-400" />
                       <p className="font-black text-slate-700 uppercase italic">{selectedTxn.type}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[9px]">Original Total Amount</span>
                    <div className="flex items-center gap-1 border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg w-fit">
                       <DollarSign size={14} className="text-blue-600" />
                       <p className="font-mono font-black text-blue-600 text-lg tracking-tighter">
                         {selectedTxn.legs.reduce((acc, l) => acc + (l.type === 'DEBIT' ? parseFloat(l.amount) : 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                       </p>
                       <span className="ml-1 text-[10px] font-black text-blue-400">{selectedTxn.legs[0]?.currency || 'USD'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-amber-50 border-t border-amber-100">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="text-amber-600" size={20} />
                     </div>
                     <div>
                        <h4 className="text-xs font-black text-amber-900 uppercase italic mb-1">Reversal Compliance Note</h4>
                        <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed">
                          The reversal of transaction is permitted for customer operative accounts with <strong>SBA, CAA, CCA and ODA</strong> scheme types only. 
                          System will generate a contra entry of <strong>{selectedTxn.amount} {selectedTxn.currency}</strong> to neutralize the balance.
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reversal Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block italic">Reversal Reason Code <span className="text-red-500 font-black">*</span></label>
                  <select 
                    value={reversalReasonCode}
                    onChange={(e) => setReversalReasonCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="">SELECT REASON CODE</option>
                    {REASON_CODES.map(r => (
                      <option key={r.code} value={r.code}>{r.code} - {r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Narration / Detailed Reason <span className="text-red-500 font-black">*</span></label>
                  <textarea 
                    value={reversalReason}
                    onChange={(e) => setReversalReason(e.target.value)}
                    placeholder="Enter explicit reason for reversal..."
                    className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block italic">Supervisor Authorization <span className="text-red-500 font-black">*</span></label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={supervisorId}
                      onChange={(e) => setSupervisorId(e.target.value)}
                      placeholder="Enter Supervisor ID"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all uppercase"
                    />
                    <ShieldCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <button 
                  onClick={handleReverse}
                  disabled={!reversalReasonCode || !reversalReason || !supervisorId || status === 'PROCESSING'}
                  className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all disabled:opacity-30 flex items-center justify-center gap-2 group"
                >
                  {status === 'PROCESSING' ? <RefreshCcw size={14} className="animate-spin" /> : <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />}
                  Post Reversal
                </button>
              </div>
            </div>
          </div>
        )}

        {status === 'SUCCESS' && (
          <div className="bg-emerald-600 rounded-xl p-12 text-white text-center space-y-6 flex flex-col items-center animate-in zoom-in duration-500">
             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <RotateCcw size={40} className="text-white" />
             </div>
             <div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Reversal Successful</h3>
                <p className="text-emerald-100 font-bold uppercase tracking-widest text-[11px]">Original Txn ID: {selectedTxn?.id} // REASON: {reversalReasonCode}</p>
                <p className="text-emerald-200/60 font-medium uppercase tracking-[0.3em] text-[8px] mt-1">Contra Transaction ID: {contraTxn?.id}</p>
             </div>
             <button 
                onClick={() => {
                  setSelectedTxn(null);
                  setStatus('IDLE');
                  setSearchId('');
                }}
                className="bg-white text-emerald-700 px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors shadow-2xl"
             >
                New Reversal Request
             </button>
          </div>
        )}
      </div>

      <div className="bg-slate-100 border-t border-slate-200 px-6 py-2 flex items-center justify-between">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">FINACLE CORE BANKING // V11.X</span>
        <div className="flex items-center gap-4">
           <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">SOL: 60001700</span>
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">User: JS supervisor</span>
        </div>
      </div>
    </div>
  );
}
