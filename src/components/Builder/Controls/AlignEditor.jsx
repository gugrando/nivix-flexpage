// src/components/Builder/Controls/AlignEditor.jsx
import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import FieldLabel from './FieldLabel';

export default function AlignEditor({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
        {['left', 'center', 'right'].map(a => (
          <button 
            key={a} 
            onClick={() => onChange(a)} 
            className={`flex-1 py-3 rounded-xl flex items-center justify-center transition-all ${value === a ? 'bg-zinc-800 text-[#EAB308] shadow-lg border border-white/5' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            {a === 'left' ? <AlignLeft size={18}/> : a === 'center' ? <AlignCenter size={18}/> : <AlignRight size={18}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
