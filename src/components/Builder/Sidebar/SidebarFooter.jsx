// src/components/Builder/Sidebar/SidebarFooter.jsx
import React from 'react';

export default function SidebarFooter() {
  return (
    <div className="p-6 border-t border-white/5 bg-black/50 backdrop-blur-md flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-zinc-700 tracking-[0.2em] italic uppercase">Nivix Flexpages</span>
        <span className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest mt-0.5">S-Driven Engine v2.6.0</span>
      </div>
      <div className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full">
        <span className="text-[9px] font-black text-zinc-600 uppercase">Live Preview</span>
      </div>
    </div>
  );
}
