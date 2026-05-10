// src/components/Builder/Controls/RangeEditor.jsx
import React from 'react';
import FieldLabel from './FieldLabel';

export default function RangeEditor({ label, value, min, max, step, defaultValue, onChange }) {
  return (
    <div className="mb-6 group">
      <FieldLabel secondary={`${Math.round((value !== undefined ? value : (defaultValue || 0.6))*100)}%`}>
        {label}
      </FieldLabel>
      <div className="pt-2 px-1">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value !== undefined ? value : (defaultValue || 0.6)} 
          onChange={e => onChange(parseFloat(e.target.value))} 
          className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#EAB308] border border-white/5 transition-all group-hover:border-white/10" 
        />
      </div>
    </div>
  );
}
