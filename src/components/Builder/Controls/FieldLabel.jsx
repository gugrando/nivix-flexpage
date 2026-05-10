// src/components/Builder/Controls/FieldLabel.jsx
import React from 'react';

export default function FieldLabel({ children, secondary }) {
  return (
    <div className="flex justify-between items-center mb-2 px-1">
      <label className="text-[10px] uppercase text-zinc-500 font-black tracking-[0.15em]">{children}</label>
      {secondary && <span className="text-[9px] text-zinc-600 font-bold uppercase">{secondary}</span>}
    </div>
  );
}
