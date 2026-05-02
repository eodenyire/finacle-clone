import React, { useState } from 'react';
import { ChevronRight, Folder, FileText, ChevronDown } from 'lucide-react';
import { MENU_DATA, MenuItem } from '@/src/constants';

interface SidebarProps {
  onSelect: (id: string) => void;
  activeId: string;
}

export default function Sidebar({ onSelect, activeId }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    dashboard: true,
    crm: true,
    accounting: true,
    'customer-accounts': true,
    'inventory-mgt': true,
    'product-factory': false,
    'func-services': false,
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expanded[item.id];
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeId === item.id;

    return (
      <div key={item.id} className="select-none">
        <div
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              onSelect(item.id);
            }
          }}
          style={{ paddingLeft: `${depth * 12 + 4}px` }}
          className={`
            h-6 flex items-center group cursor-pointer border-y border-transparent hover:bg-blue-50 transition-all
            ${isActive ? 'bg-white border-slate-300 font-bold text-blue-900 shadow-sm' : 'text-blue-900'}
          `}
        >
          <div className="flex items-center gap-1.5 w-full pr-2">
            <div className="shrink-0 flex items-center justify-center w-5">
              {hasChildren ? (
                <Folder size={14} className="text-blue-600 fill-blue-100" />
              ) : (
                <FileText size={12} className="text-blue-400" />
              )}
            </div>
            <span className="text-[11px] whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
              {item.label}
              {item.shortcut && (
                <span className="ml-1 text-[9px] text-slate-400 font-normal">
                  ({item.shortcut})
                </span>
              )}
            </span>
            {hasChildren && (
              <div className={`ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                 <ChevronDown size={10} className="text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="flex flex-col bg-slate-50/30">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside 
      id="finacle-sidebar"
      className="w-64 h-full bg-[#f4f7fa] flex flex-col shrink-0 z-20 border-r border-[#80a4c1] shadow-lg shadow-black/5 select-none"
    >
      <div className="h-6 bg-gradient-to-b from-[#e6f0f9] to-[#c8daea] border-b border-[#80a4c1] flex items-center justify-between px-2 text-[10px] font-bold text-[#003366]">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 bg-[#ed1c20] flex items-center justify-center text-white text-[8px] font-black rounded-[1px]">f</div>
          <span>Menu</span>
        </div>
        <button className="w-4 h-4 hover:bg-blue-200 flex items-center justify-center rounded text-xs">×</button>
      </div>

      <div className="flex-1 overflow-y-auto py-1 custom-scrollbar">
        {MENU_DATA.map(item => renderMenuItem(item))}
      </div>

      <div className="mt-auto p-2 border-t border-[#80a4c1] bg-[#e6f0f9] text-[9px] font-bold text-[#003366] flex flex-col gap-1">
        <div className="flex justify-between items-center bg-white/40 px-1.5 py-0.5 border border-[#80a4c1]/30 rounded-[1px]">
          <span>Reports Pending Printing:</span>
          <span className="text-blue-700">8</span>
        </div>
        <div className="flex justify-between items-center opacity-70">
           <span>DB Connection:</span>
           <span className="text-emerald-700 font-mono">OK</span>
        </div>
      </div>
    </aside>
  );
}
