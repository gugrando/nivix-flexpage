// src/components/Builder/Sidebar/BlockEditor.jsx
import React from 'react';
import { Maximize2 } from 'lucide-react';
import { BLOCK_LIBRARY } from '../../library/registry';
import { Select } from '../ControlField';

export default function BlockEditor({ 
  b, idx, blocks, setConfig, 
  updateData, renderField, setIkey, askConfirmation
}) {
  const changeVariant = (v) => {
    const n = [...blocks];
    const variants = BLOCK_LIBRARY[b.type];
    const newVariantData = variants?.[v]?.defaultData || {};
    
    n[idx] = { 
      ...n[idx], 
      variant: v,
      data: { ...newVariantData, ...n[idx].data } 
    };
    setConfig(prev => ({ ...prev, blocks: n }));
  };

  const removeBlock = () => {
    askConfirmation({
      title: "Remover Seção?",
      description: "Esta ação excluirá permanentemente esta seção e todos os seus assets do servidor.",
      type: "danger",
      onConfirm: () => {
        // AUTO-CLEANUP: Busca recursiva de imagens locais para deletar
        const findAndCleanAssets = (obj) => {
          if (!obj) return;
          if (typeof obj === 'string' && obj.startsWith('/uploads/')) {
            fetch('/api/delete-asset', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: obj })
            }).catch(err => console.error("[CMS] Erro ao limpar asset do bloco:", err));
          } else if (Array.isArray(obj)) {
            obj.forEach(findAndCleanAssets);
          } else if (typeof obj === 'object') {
            Object.values(obj).forEach(findAndCleanAssets);
          }
        };

        findAndCleanAssets(b.data);
        setConfig(prev => ({ ...prev, blocks: prev.blocks.filter(it => it.id !== b.id) }));
      }
    });
  };

  const variantObj = BLOCK_LIBRARY[b.type]?.[b.variant || BLOCK_LIBRARY[b.type]?.default];
  const schema = variantObj?.schema;

  return (
    <div className="mt-4 p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 space-y-10 shadow-inner">
      <div>
        <h4 className="text-[10px] font-black uppercase text-[#EAB308] tracking-[0.3em] mb-6 text-center">Visual da Seção</h4>
        <Select 
          label="Variante de Layout" 
          value={b.variant || BLOCK_LIBRARY[b.type]?.default} 
          options={Object.entries(BLOCK_LIBRARY[b.type] || {}).filter(([k]) => k !== 'default').map(([k, v]) => ({ value: k, label: v.label }))} 
          onChange={changeVariant} 
        />
        
        {schema && schema.map((group, gIdx) => (
          <div key={gIdx} className="space-y-6 pt-6 border-t border-white/5">
            <h4 className="text-[10px] uppercase text-[#EAB308]/60 font-black text-center flex items-center justify-center gap-2 tracking-[0.15em]">
              <Maximize2 size={12}/> {group.group}
            </h4>
            {group.fields.map(field => renderField(b, field))}
          </div>
        ))}
      </div>

      <button 
        onClick={removeBlock} 
        className="w-full py-5 rounded-2xl border border-red-500/20 text-red-500/50 hover:bg-red-500 hover:text-white uppercase font-black text-[10px] tracking-widest transition-all mt-4"
      >
        Remover Seção
      </button>
    </div>
  );
}
