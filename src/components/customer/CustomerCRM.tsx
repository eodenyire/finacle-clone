import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone, 
  ChevronRight, 
  Eye, 
  Edit3, 
  AlertTriangle,
  Activity,
  History,
  LifeBuoy
} from 'lucide-react';

export default function CustomerCRM() {
  const [activeTab, setActiveTab] = useState<'360' | 'HISTORY' | 'OFFERS' | 'SERVICE'>('360');

  const customer = {
    id: 'CIF-90122',
    name: 'AMELIA STRATFORD',
    tier: 'PLATINUM',
    relationshipManager: 'Marcus Vance',
    since: 'MAR-2018',
    totalWealth: '$11.4M',
    ltv: '$450K',
    score: 842,
    contact: {
      email: 'a.stratford@global.com',
      phone: '+1 (555) 012-9922',
      address: '777 Park Ave, Manhattan, NY'
    },
    accounts: [
      { id: '100234', type: 'Private Savings', balance: '$2,450,000', status: 'ACTIVE' },
      { id: 'LON-551', type: 'Residential Mortage', balance: '$1,200,000', status: 'PAID' },
      { id: 'INV-990', type: 'Global Equity Portfolio', balance: '$7,800,000', status: 'ACTIVE' },
    ],
    recentEvents: [
      { date: '24-MAY', type: 'TRANSACTION', desc: 'Inward Wire Transfer $50K', status: 'SUCCESS' },
      { date: '22-MAY', type: 'SERVICE', desc: 'Revised KYC Documents Uploaded', status: 'VERIFIED' },
      { date: '15-MAY', type: 'SYSTEM', desc: 'Automatic Tier Upgrade: Gold -> Platinum', status: 'COMPLETE' },
    ],
    nextBestOffers: [
      { id: 'OFR-1', product: 'Lombard Loan', desc: 'Secure financing against your existing equity portfolio with 2.1% APR.', prob: 'High' },
      { id: 'OFR-2', product: 'Private Jet Concierge', desc: 'Unlock executive travel benefits with your Platinum status.', prob: 'Medium' },
    ]
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col p-8 gap-8 overflow-y-auto">
      {/* Header Profile Section */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="relative">
          <div className="w-32 h-32 bg-blue-600 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center text-white text-4xl font-black italic">
            AS
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg border-4 border-white shadow-lg">
             <ShieldCheck size={16} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{customer.name}</h1>
            <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg tracking-widest self-center md:self-auto italic">
              {customer.tier} RELATIONSHIP
            </span>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
            <span>CIF: {customer.id}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span>CUSTOMER SINCE {customer.since}</span>
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2 text-slate-600">
               <Mail size={16} className="text-blue-500" />
               <span className="text-xs font-bold">{customer.contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
               <Phone size={16} className="text-blue-500" />
               <span className="text-xs font-bold">{customer.contact.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-l border-slate-100 pl-8 hidden lg:flex">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Wealth View</span>
            <span className="text-2xl font-black text-blue-600 font-mono italic">{customer.totalWealth}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">RM Assigned</span>
            <span className="text-xs font-black text-slate-800">{customer.relationshipManager}</span>
          </div>
        </div>
      </motion.section>

      {/* Tabs Layout */}
      <div className="flex gap-8 items-start">
        <main className="flex-1 flex flex-col gap-8">
           <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit self-center">
             {[
               { id: '360', label: '360° Insight', icon: <Eye size={16} /> },
               { id: 'HISTORY', label: 'Interaction History', icon: <History size={16} /> },
               { id: 'OFFERS', label: 'Next Best Offers', icon: <Target size={16} /> },
               { id: 'SERVICE', label: 'Service Console', icon: <LifeBuoy size={16} /> },
             ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${
                   activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-500 hover:bg-slate-50'
                 }`}
               >
                 {tab.icon}
                 {tab.label}
               </button>
             ))}
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
             >
               {activeTab === '360' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Accounts Overview */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                       <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                             <CreditCard size={14} className="text-blue-500" />
                             Holdings Summary
                          </h3>
                          <button className="text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1">
                             View Ledger <ChevronRight size={12} />
                          </button>
                       </div>
                       <div className="space-y-3">
                          {customer.accounts.map(acc => (
                            <div key={acc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                               <div>
                                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5">{acc.type}</span>
                                  <span className="text-xs font-black text-slate-700 font-mono italic">{acc.id}</span>
                               </div>
                               <div className="text-right">
                                  <span className="text-xs font-black text-slate-800">{acc.balance}</span>
                                  <span className="text-[9px] text-emerald-500 font-black block uppercase tracking-tight">{acc.status}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Analytics / Risk */}
                    <div className="space-y-8">
                       <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-16 -mt-16"></div>
                          <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                             <TrendingUp size={14} />
                             Relationship Health
                          </h3>
                          <div className="flex items-end gap-6 h-32">
                             {[40, 65, 45, 90, 85, 70, 95].map((val, i) => (
                               <div key={i} className="flex-1 flex flex-col gap-2 items-center">
                                  <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm"
                                  />
                                  <span className="text-[8px] font-bold text-slate-500">M{i+1}</span>
                               </div>
                             ))}
                          </div>
                          <div className="mt-6 flex justify-between items-center">
                             <div>
                                <span className="text-[9px] text-slate-400 block uppercase font-bold">Risk Appetite</span>
                                <span className="text-xs font-black text-blue-100 italic uppercase">Speculative Growth</span>
                             </div>
                             <div className="text-right">
                                <span className="text-[9px] text-slate-400 block uppercase font-bold">Credit Score</span>
                                <span className="text-2xl font-black text-white italic font-mono">{customer.score}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'OFFERS' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {customer.nextBestOffers.map(offer => (
                      <div key={offer.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm border-l-4 border-l-blue-600 relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-blue-50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Activity size={60} />
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full mb-4 inline-block ${
                          offer.prob === 'High' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {offer.prob} Conversion Likelihood
                        </span>
                        <h4 className="text-base font-black text-slate-800 mb-2 uppercase tracking-tighter italic">{offer.product}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">{offer.desc}</p>
                        <button className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                          Initiate Application <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
        </main>

        <aside className="w-80 flex flex-col gap-8 shrink-0">
           {/* Activity Feed */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Clock size={14} className="text-blue-500" />
                 Timeline Artifacts
              </h3>
              <div className="space-y-6 relative">
                 <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-100"></div>
                 {customer.recentEvents.map((event, i) => (
                   <div key={i} className="relative pl-8 flex flex-col gap-1">
                      <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm"></div>
                      <span className="text-[9px] text-slate-400 font-bold block">{event.date} // {event.type}</span>
                      <span className="text-[11px] font-black text-slate-700 italic group cursor-pointer hover:text-blue-600 transition-colors">{event.desc}</span>
                      <span className="text-[9px] text-slate-300 font-bold uppercase">{event.status}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-2.5 text-[10px] font-black text-slate-400 hover:text-blue-600 border border-slate-100 rounded-lg uppercase tracking-widest transition-all">
                 View Historical Logs
              </button>
           </div>

           {/* Risk Alerts */}
           <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="text-amber-600" size={20} />
                <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Relationship Sentinel</span>
             </div>
             <p className="text-xs text-amber-800 font-bold leading-relaxed italic">
               KYC update required by 15-JUN-2024. Periodic verification of High Net Worth individual protocol in progress.
             </p>
             <button className="mt-4 flex items-center gap-2 text-amber-700 text-[10px] font-black uppercase tracking-tight hover:underline">
               Resolve Compliance Flag <ChevronRight size={14} />
             </button>
           </div>
        </aside>
      </div>
    </div>
  );
}
