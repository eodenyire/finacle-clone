import React from 'react';
import { Search, ChevronDown, Monitor, HelpCircle, Map, Globe, Calculator, FileText } from 'lucide-react';
import { Logo } from '@/src/components/common/Logo';

export default function TopBar() {
  return (
    <div id="finacle-universal-header" className="flex flex-col shrink-0 select-none">
      {/* Row 1: System Info & Solution Selection */}
      <div className="h-7 bg-gradient-to-b from-[#e6f0f9] to-[#c8daea] border-b border-slate-400 flex items-center justify-between px-2 text-[10px] font-bold text-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex border border-slate-400 bg-[#f4f7fa] px-2 py-0.5 shadow-inner">
            <span className="text-blue-800 mr-2">User:</span>
            <span className="text-slate-900">E.ANYIRA33</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-800">Time Zone:</span>
            <span className="text-slate-900 uppercase">GMT +3</span>
            <Search size={10} className="text-blue-600 ml-1 cursor-pointer" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-blue-800">Solution:</span>
            <div className="flex items-center bg-white border border-slate-400 px-1 py-0 shadow-sm min-w-[100px] justify-between">
              <span className="text-slate-900 font-mono">FINCORE</span>
              <ChevronDown size={10} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-slate-400 flex items-center justify-center p-0.5 cursor-pointer hover:bg-slate-50">
               <div className="w-full h-full bg-emerald-500 rounded-sm"></div>
            </div>
            <div className="w-4 h-4 bg-white border border-slate-400 flex items-center justify-center p-0.5 cursor-pointer hover:bg-slate-50">
               <div className="w-full h-full border-t-2 border-r-2 border-blue-600 rotate-45 transform -translate-x-0.5 translate-y-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Branding & Secondary Menu */}
      <div className="h-10 bg-[#f4f7f9] border-b border-slate-400 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Logo variant="stacked" />
        </div>

        <div className="flex items-center gap-[1px]">
          {[
            { label: 'Menu', icon: <ChevronRight size={10} /> },
            { label: 'Show Memo Pad', icon: null },
            { label: 'Background Menu', icon: null },
            { label: 'CCY Converter', icon: <Globe size={10} /> }
          ].map((link, i) => (
            <button key={i} className="flex items-center gap-1.5 px-3 h-10 text-[10px] font-bold text-[#003366] hover:bg-white hover:shadow-inner border-x border-transparent hover:border-slate-300 transition-all">
              {link.icon && <span className="text-blue-500">{link.icon}</span>}
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: Blue Banner & Shortcut */}
      <div className="h-6 bg-gradient-to-b from-[#a4c1d7] to-[#80a4c1] border-b border-slate-500 flex items-center justify-between px-2 shadow-sm">
        <span className="text-[10px] font-bold text-[#003366] uppercase tracking-tight italic">
          Universal Banking Solution from Infosys
        </span>
        
        <div className="flex items-center gap-2">
           <span className="text-[9px] text-[#003366] font-bold uppercase whitespace-nowrap">26 December, 2013 | User DOPUSER33 | 60001700 | Menu Shortcut:</span>
           <div className="flex items-center gap-1">
             <input type="text" className="h-[18px] w-20 bg-white border border-slate-500 text-[10px] font-mono px-1 outline-none" />
             <button className="h-[18px] px-2 bg-[#efefef] border border-slate-500 text-[9px] font-black uppercase hover:bg-white active:bg-slate-200">Go</button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
}
