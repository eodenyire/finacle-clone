import React from 'react';

interface LogoProps {
  variant?: 'finacle' | 'infosys' | 'combined-color' | 'combined-white' | 'stacked' | 'tiny' | 'stacked-white';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'finacle', className = '' }) => {
  switch (variant) {
    case 'finacle':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          {/* Finacle Red Square Icon */}
          <div className="relative w-7 h-7 bg-[#ed1c24] flex-shrink-0 flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M70 10 L30 90 L45 90 L85 10 Z" fill="white" className="opacity-20" />
                <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
             </svg>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-[#58595b] font-sans">Finacle</span>
        </div>
      );
    case 'infosys':
      return (
        <div className={`flex items-center gap-0.5 ${className}`}>
          <span className="text-[#007cc3] font-bold text-2xl tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>Infosys</span>
          <span className="text-[8px] align-top text-[#007cc3] font-bold -mt-2">®</span>
        </div>
      );
    case 'combined-color':
      return (
        <div className={`flex items-center gap-4 ${className}`}>
           <div className="flex items-center gap-0.5">
              <span className="text-[#007cc3] font-bold text-3xl tracking-tighter">Infosys</span>
              <span className="text-[10px] align-top text-[#007cc3] font-bold -mt-3">®</span>
           </div>
           <div className="h-10 w-[2px] bg-slate-300 self-center"></div>
           <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#ed1c24] relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M70 10 L30 90 L45 90 L85 10 Z" fill="white" className="opacity-20" />
                    <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
                 </svg>
              </div>
              <span className="text-3xl font-semibold tracking-tight text-[#58595b]">Finacle</span>
           </div>
        </div>
      );
    case 'combined-white':
      return (
        <div className={`flex items-center gap-4 ${className}`}>
           <div className="flex items-center gap-0.5">
              <span className="text-white font-bold text-3xl tracking-tighter">Infosys</span>
              <span className="text-[10px] align-top text-white font-bold -mt-3">®</span>
           </div>
           <div className="h-10 w-[2px] bg-white/40 self-center"></div>
           <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 border border-white/30 relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
                 </svg>
              </div>
              <span className="text-3xl font-semibold tracking-tight text-white leading-none">Finacle</span>
           </div>
        </div>
      );
    case 'tiny':
      return (
        <div className={`w-4 h-4 bg-[#ed1c24] relative ${className}`}>
           <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
           </svg>
        </div>
      );
    case 'stacked':
      return (
        <div className={`flex items-center gap-3 ${className}`}>
           <div className="flex items-center gap-0.5">
              <span className="text-[#007cc3] font-bold text-xl tracking-tighter">Infosys</span>
              <span className="text-[6px] align-top text-[#007cc3] font-bold -mt-1">®</span>
           </div>
           <div className="h-6 w-[1px] bg-slate-400 self-center"></div>
           <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#ed1c24] relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
                 </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-[#58595b]">Finacle</span>
           </div>
        </div>
      );
    case 'stacked-white':
      return (
        <div className={`flex items-center gap-3 ${className}`}>
           <div className="flex items-center gap-0.5">
              <span className="text-white font-bold text-xl tracking-tighter">Infosys</span>
              <span className="text-[6px] align-top text-white font-bold -mt-1">®</span>
           </div>
           <div className="h-6 w-[1px] bg-white/30 self-center"></div>
           <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-white/20 border border-white/40 relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 10 L25 90 L40 90 L65 10 Z" fill="white" />
                 </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white leading-none">Finacle</span>
           </div>
        </div>
      );
    default:
      return null;
  }
};
