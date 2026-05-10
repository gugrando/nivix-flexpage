// src/components/Builder/Controls/Input.jsx
import React from 'react';
import FieldLabel from './FieldLabel';

export default function Input({ label, value, onChange, disabled, placeholder }) {
  return (
    <div className={`mb-6 transition-all ${disabled ? 'opacity-30 grayscale pointer-events-none' : ''}`}>
      <FieldLabel>{label}</FieldLabel>
      <input 
        value={value || ''} 
        onChange={e => onChange(e.target.value)} 
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-zinc-900/50 border border-white/5 rounded-[1.25rem] p-4 text-sm focus:border-[#EAB308]/50 focus:ring-4 focus:ring-[#EAB308]/5 outline-none text-zinc-100 placeholder:text-zinc-700 transition-all hover:bg-zinc-800/50 focus:shadow-[0_0_20px_rgba(234,179,8,0.15)]" 
      />
    </div>
  );
}
