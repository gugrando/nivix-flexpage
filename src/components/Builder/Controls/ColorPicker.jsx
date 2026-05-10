// src/components/Builder/Controls/ColorPicker.jsx
import React from 'react';
import FieldLabel from './FieldLabel';

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="mb-6 group">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-3 items-center">
        <div className="relative w-12 h-12 shrink-0 group-hover:scale-105 transition-transform">
          <input 
            type="color" 
            value={value || '#000000'} 
            onChange={e => onChange(e.target.value)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div 
            className="w-full h-full rounded-2xl border border-white/10 shadow-inner" 
            style={{ backgroundColor: value || '#000000' }} 
          />
        </div>
        <input 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          className="flex-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-4 text-xs font-mono text-zinc-300 outline-none focus:border-[#EAB308]/50 transition-all group-hover:border-white/10" 
        />
      </div>
    </div>
  );
}
