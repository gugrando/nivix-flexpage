// src/components/Builder/Controls/ArrayEditor.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ChevronDown, Move } from 'lucide-react';
import { Input, Select, Toggle, ColorPicker } from '../ControlField';
import ImageInput from './ImageInput';

export default function ArrayEditor({ label, items = [], onChange, itemFields }) {
  const [expanded, setExpanded] = useState(null);

  const addItem = () => {
    const newItem = {};
    itemFields.forEach(f => {
      if (f.key) newItem[f.key] = '';
    });
    onChange([...items, newItem]);
    setExpanded(items.length);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</label>
        <button onClick={addItem} className="p-2 bg-[#EAB308]/10 text-[#EAB308] hover:bg-[#EAB308] hover:text-black rounded-lg transition-all">
          <Plus size={16}/>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30">
            <div 
              className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center gap-4">
                <Move size={14} className="text-zinc-600" />
                <span className="text-xs font-bold text-zinc-300">
                  {it.title || it.label || `${label} #${i + 1}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    // LIMPEZA DE ASSETS AO DELETAR ITEM
                    Object.keys(it).forEach(key => {
                      const val = it[key];
                      if (typeof val === 'string' && val.startsWith('/uploads/')) {
                        fetch('/api/delete-asset', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ url: val })
                        }).catch(err => console.error("[CMS] Erro ao limpar asset:", err));
                      }
                    });
                    onChange(items.filter((_, idx) => idx !== i)); 
                  }} 
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 transition-all text-zinc-600 rounded-lg"
                >
                  <Trash2 size={14}/>
                </button>
                <ChevronDown className={`transition-all duration-300 ${expanded === i ? 'rotate-180 text-[#EAB308]' : 'text-zinc-600'}`} size={16}/>
              </div>
            </div>
            {expanded === i && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4 bg-black/20"
              >
                {itemFields.map((f, idx) => {
                  // Lógica de Condição
                  if (f.condition && !it[f.condition]) return null;

                  // Renderização de Section (Sem Key)
                  if (f.type === 'section') {
                    return (
                        <div key={idx} className="pt-4 pb-2 border-b border-white/5">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#EAB308]/50">
                                {f.label}
                            </span>
                        </div>
                    );
                  }

                  const isImage = f.type === 'image' || (f.key && f.key.toLowerCase().includes('image'));

                  return (
                    <div key={f.key || idx}>
                      {isImage ? (
                        <ImageInput label={f.label} value={it[f.key]} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} />
                      ) : f.type === 'select' ? (
                        <Select label={f.label} value={it[f.key] || f.options[0]?.value} options={f.options} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} />
                      ) : f.type === 'toggle' ? (
                        <Toggle label={f.label} value={it[f.key]} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} />
                      ) : f.type === 'color' ? (
                        <ColorPicker label={f.label} value={it[f.key]} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} />
                      ) : f.type === 'array' ? (
                        <ArrayEditor label={f.label} items={it[f.key] || []} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} itemFields={f.itemFields} />
                      ) : (
                        <Input label={f.label} value={it[f.key]} onChange={v => { const n = [...items]; n[i]={...n[i],[f.key]:v}; onChange(n); }} />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
