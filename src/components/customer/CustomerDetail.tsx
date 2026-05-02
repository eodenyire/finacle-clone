import React from 'react';
import { Shield, User, MapPin, Phone, Mail, CreditCard, ChevronRight, History, ArrowLeft, Printer, Edit3, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomerDetailProps {
  onBack: () => void;
  customer: {
    id: string;
    name: string;
    type: string;
    status: string;
    joinDate: string;
    taxId: string;
    email: string;
    phone: string;
    address: string;
    accounts: Array<{
      id: string;
      type: string;
      balance: string;
      ccy: string;
      status: string;
    }>;
  };
}

export default function CustomerDetail({ onBack, customer }: CustomerDetailProps) {
  const balanceData = [
    { month: 'DEC-23', balance: 1150000 },
    { month: 'JAN-24', balance: 1180000 },
    { month: 'FEB-24', balance: 1210000 },
    { month: 'MAR-24', balance: 1195000 },
    { month: 'APR-24', balance: 1230000 },
    { month: 'MAY-24', balance: 1257645 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-6 scrollbar-hide">
      <header className="flex justify-between items-center bg-white p-4 px-6 rounded border border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">{customer.name}</h2>
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${customer.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {customer.status}
              </span>
            </div>
            <p className="text-blue-600 text-[10px] font-mono font-bold uppercase tracking-widest mt-0.5">
              CIF: {customer.id} | {customer.type}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-slate-600 text-[10px] font-black rounded hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Printer size={14} />
            Print Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded shadow shadow-blue-600/20 hover:bg-blue-700 transition-all uppercase tracking-widest">
            <Edit3 size={14} />
            Modify Record
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal & Contact */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-slate-700">
              <User size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Identity Dimensions</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Legal Entity Type</label>
                  <p className="text-xs font-bold text-slate-700">{customer.type}</p>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Tax ID (TIN/PAN)</label>
                  <p className="text-xs font-mono font-bold text-slate-700">{customer.taxId}</p>
                </div>
              </div>
              <div>
                <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Customer Join Date</label>
                <p className="text-xs font-bold text-slate-700">{customer.joinDate}</p>
              </div>
              <div className="h-px bg-slate-100 my-1"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-700">KYC Verified</p>
                  <p className="text-[9px] text-slate-400">Next review: 12-DEC-2026</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-slate-700">
              <MapPin size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Communication Channels</span>
            </div>
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded">
                  <Phone size={14} className="text-slate-400" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Primary Mobile</label>
                  <p className="text-xs font-mono font-bold text-slate-700">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded">
                  <Mail size={14} className="text-slate-400" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Email Address</label>
                  <p className="text-xs font-bold text-slate-700 lowercase">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded">
                  <MapPin size={14} className="text-slate-400" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Registered Address</label>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{customer.address}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Account Summaries & Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <CreditCard size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Account Inventory</span>
              </div>
              <button className="text-[9px] font-black text-blue-600 hover:underline">OPEN NEW ACCOUNT</button>
            </div>
            <div className="overflow-x-auto">
              <table className="finacle-grid">
                <thead>
                  <tr>
                    <th>Scheme Type</th>
                    <th>Account No</th>
                    <th className="text-right">Ledger Balance</th>
                    <th>CCY</th>
                    <th>State</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {customer.accounts.map((acc, i) => (
                    <tr key={acc.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                      <td className="font-bold text-slate-500 uppercase tracking-tighter">{acc.type}</td>
                      <td className="font-mono text-blue-600 font-bold">{acc.id}</td>
                      <td className="text-right font-mono font-bold text-slate-900 pr-6">{acc.balance}</td>
                      <td className="font-mono text-[10px] font-bold text-slate-400">{acc.ccy}</td>
                      <td>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest ${acc.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {acc.status}
                        </span>
                      </td>
                      <td>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[280px]">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <TrendingUp size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Aggregate Liquidity Trend</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-600">+8.4% YoY</span>
            </div>
            <div className="flex-1 p-4 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: '10px', 
                      borderRadius: '4px', 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontWeight: 700 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-slate-700">
              <History size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Security & Audit Timeline</span>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6 relative">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-100"></div>
                {[
                  { event: 'KYC Renewed', date: '14-JAN-2024 10:20', user: 'SYS_ADMIN', desc: 'Auto-renewal via government database sync.' },
                  { event: 'Address Modified', date: '02-OCT-2023 15:45', user: 'JD_001', desc: 'Updated permanent address from utility bill verification.' },
                  { event: 'Entity Created', date: '20-MAY-2021 09:12', user: 'MGR_012', desc: 'Initial CIF creation on core system migration.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm shrink-0 z-10 shadow-blue-500/50"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">{item.event}</span>
                        <span className="text-[9px] text-slate-400 font-mono font-bold tracking-tighter">[{item.date}]</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed max-w-md">{item.desc}</p>
                      <p className="text-[9px] text-blue-500 font-mono font-bold mt-1 tracking-widest">EXECUTOR: {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
