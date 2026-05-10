// src/components/Builder/Controls/Toggle.jsx
import React from 'react';

export default function Toggle({ label, value, onChange }) {
  return (
    <div 
      className="flex items-center justify-between mb-6 group cursor-pointer bg-zinc-900/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all" 
      onClick={() => onChange(!value)}
    >
      <label className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors select-none tracking-tight">{label}</label>
      <button className={`w-12 h-6 rounded-full relative transition-all duration-300 ${value ? 'bg-[#EAB308]' : 'bg-zinc-800'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${value ? 'left-7 bg-black' : 'left-1 bg-zinc-500'}`} />
      </button>
    </div>
  );
}
