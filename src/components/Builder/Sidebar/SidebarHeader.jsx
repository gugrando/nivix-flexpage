// src/components/Builder/Sidebar/SidebarHeader.jsx
import React from 'react';
import { Settings, RefreshCcw, Save, ExternalLink } from 'lucide-react';

export default function SidebarHeader({ tempName, resetToOriginal }) {
  return (
    <div className="p-6 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-[#EAB308] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#EAB308]/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Settings size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-black text-sm uppercase tracking-tighter leading-none mb-1 text-white">Nivix Builder</h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.1em]">{tempName}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.open('/preview', '_blank')} 
            title="Ver Site Real" 
            className="w-10 h-10 flex items-center justify-center bg-white/5 text-zinc-500 rounded-xl hover:bg-[#EAB308]/10 hover:text-[#EAB308] transition-all border border-white/5"
          >
            <ExternalLink size={18} />
          </button>
          <button 
            onClick={resetToOriginal} 
            title="Resetar" 
            className="w-10 h-10 flex items-center justify-center bg-white/5 text-zinc-500 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
          >
            <RefreshCcw size={18} />
          </button>
          <button 
            onClick={() => alert('Em breve! 📄')} 
            className="w-10 h-10 flex items-center justify-center bg-[#EAB308] text-black rounded-xl hover:bg-[#FACC15] transition-all shadow-lg shadow-[#EAB308]/10"
          >
            <Save size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
