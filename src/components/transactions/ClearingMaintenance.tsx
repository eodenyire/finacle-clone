import React, { useState } from 'react';
import { Search, Calendar, User, HelpCircle } from 'lucide-react';

export default function ClearingMaintenance() {
  const [formData, setFormData] = useState({
    function: 'A - Add',
    zoneDate: '04-08-2015',
    zone: 'MICR',
    zoneSrlNo: '',
    solId: '50000300'
  });

  return (
    <div className="flex flex-col h-full bg-white font-sans select-none overflow-y-auto">
      {/* Header Banner - Finacle Style */}
      <div className="bg-[#b0c4de] px-2 py-1 border-b border-[#80a4c1] flex justify-between items-center text-[11px] font-bold text-[#003366]">
        <span>Universal Banking Solution from Infosys</span>
        <div className="flex items-center gap-4">
          <span>04 August, 2015 | User YALALITHA | 50000300 | Menu Shortcut:</span>
          <div className="flex items-center gap-1">
            <input type="text" className="w-20 h-4 border border-slate-400 bg-white px-1 outline-none font-mono" />
            <button className="bg-slate-100 border border-slate-400 px-2 h-4 text-[9px] hover:bg-white active:bg-slate-200">Go</button>
          </div>
        </div>
      </div>

      {/* Page Title Row */}
      <div className="px-2 py-1 bg-white border-b border-slate-300">
        <h1 className="text-sm font-bold text-[#003366]">Inward Clearing Transaction Maintenance Online</h1>
      </div>

      <div className="p-4">
        {/* Main Form Box */}
        <div className="border border-[#80a4c1] p-6 relative">
          {/* Icons at top right of the box */}
          <div className="absolute top-2 right-4 flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                <span className="text-[10px] font-bold text-[#003366]">User Information</span>
                <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                    <User size={10} className="text-slate-600" />
                </div>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                <span className="text-[10px] font-bold text-[#003366]">Help</span>
                <HelpCircle size={14} className="text-blue-500 fill-blue-50" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-12">
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <label className="w-32 text-[11px] font-bold text-[#003366]">
                  Function <span className="text-red-600 font-black">*</span>
                </label>
                <div className="flex-1">
                  <select 
                    value={formData.function}
                    onChange={(e) => setFormData({...formData, function: e.target.value})}
                    className="w-full h-5 border border-slate-400 text-[11px] px-1 bg-white outline-none focus:border-blue-500"
                  >
                    <option>A - Add</option>
                    <option>M - Modify</option>
                    <option>V - Verify</option>
                    <option>D - Delete</option>
                    <option>I - Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-[11px] font-bold text-[#003366]">
                  Zone Date <span className="text-red-600 font-black">*</span>
                </label>
                <div className="flex-1 flex gap-1 items-center">
                  <input 
                    type="text" 
                    value={formData.zoneDate}
                    onChange={(e) => setFormData({...formData, zoneDate: e.target.value})}
                    className="flex-1 h-5 border border-slate-400 text-[11px] px-1 outline-none font-mono"
                  />
                  <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                    <Calendar size={12} className="text-[#003366]" />
                  </button>
                  <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                    <div className="grid grid-cols-2 gap-[1px] p-[2px]">
                      {[1,2,3,4].map(i => <div key={i} className="w-[3px] h-[3px] bg-slate-400"></div>)}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-[11px] font-bold text-[#003366]">
                  Zone <span className="text-red-600 font-black">*</span>
                </label>
                <div className="flex-1 flex gap-1 items-center">
                  <input 
                    type="text" 
                    value={formData.zone}
                    onChange={(e) => setFormData({...formData, zone: e.target.value})}
                    className="flex-1 h-5 border border-slate-400 text-[11px] px-1 outline-none uppercase font-mono"
                  />
                  <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                    <Search size={12} className="text-blue-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-[11px] font-bold text-[#003366]">
                  Zone Srl. No.
                </label>
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={formData.zoneSrlNo}
                    onChange={(e) => setFormData({...formData, zoneSrlNo: e.target.value})}
                    className="w-full h-5 border border-slate-400 text-[11px] px-1 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <label className="w-32 lg:w-24 text-[11px] font-bold text-[#003366]">
                  SOL ID <span className="text-red-600 font-black">*</span>
                </label>
                <div className="flex-1 flex gap-1 items-center max-w-[200px]">
                  <input 
                    type="text" 
                    value={formData.solId}
                    onChange={(e) => setFormData({...formData, solId: e.target.value})}
                    className="flex-1 h-5 border border-slate-400 text-[11px] px-1 outline-none font-mono"
                  />
                  <button className="w-5 h-5 bg-slate-100 border border-slate-400 flex items-center justify-center hover:bg-white active:bg-slate-200">
                    <Search size={12} className="text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="px-3 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm transition-all min-w-[36px]">
            Go
          </button>
          <button className="px-3 h-6 bg-slate-100 border border-slate-400 text-[11px] font-bold text-[#003366] hover:bg-white active:bg-slate-200 shadow-sm transition-all">
            Clear
          </button>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="mt-auto h-5 bg-[#d4d0c8] border-t border-slate-400 flex items-center px-4 text-[9px] text-[#404040] font-bold">
        <span>Done</span>
      </div>
    </div>
  );
}
