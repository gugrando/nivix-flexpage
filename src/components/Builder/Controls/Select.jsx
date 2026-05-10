// src/components/Builder/Controls/Select.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import FieldLabel from './FieldLabel';

export default function Select({ label, value, options, onChange }) {
  return (
    <div className="mb-6 group">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="w-full bg-zinc-900/50 border border-white/5 rounded-[1.25rem] p-4 text-sm focus:border-[#EAB308]/50 focus:ring-4 focus:ring-[#EAB308]/5 outline-none text-zinc-200 appearance-none cursor-pointer transition-all hover:bg-zinc-800/50 group-hover:border-white/10 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
        >
          {options.map(opt => (<option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">{opt.label}</option>))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-hover:text-zinc-400 transition-colors">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}
