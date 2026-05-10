// src/components/Builder/Sidebar/BlockLibrary.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import { BLOCK_LIBRARY } from '../../library/registry';

export default function BlockLibrary({ config, setConfig, setSelId, setIkey }) {
  const groups = [
    { group: 'Essenciais', types: ['header', 'hero', 'footer', 'dividers'] },
    { group: 'Conteúdo', types: ['about', 'features', 'process', 'splitcontent', 'stats', 'narrative'] },
    { group: 'Social & FAQ', types: ['testimonials', 'faq', 'gallery', 'logocloud', 'team', 'portfolio'] },
    { group: 'Conversão', types: ['contact', 'cta', 'location', 'pricing', 'leadgen'] }
  ];

  const addBlock = (t) => {
    // eslint-disable-next-line react-hooks/purity
    const id = `${t}-${Date.now()}`; 
    const variants = BLOCK_LIBRARY[t];
    const defaultVariant = variants?.default || 'v1';
    const defaultData = variants?.[defaultVariant]?.defaultData || {};
    
    const newBlock = {
      id,
      type: t,
      variant: defaultVariant,
      data: JSON.parse(JSON.stringify(defaultData))
    };
    
    setConfig({ ...config, blocks: [...config.blocks, newBlock] });
    setSelId(id);
  };

  return (
    <div className="pt-10 mb-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-left px-2 mb-6">Biblioteca de Blocos</h3>
      <div className="space-y-8">
        {groups.map((g, gi) => (
          <div key={gi} className="space-y-3">
             <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest px-2">{g.group}</span>
             <div className="grid grid-cols-2 gap-2">
               {g.types.map(t => (
                  <button 
                    key={t} 
                    onClick={() => addBlock(t)} 
                    className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase hover:bg-[#EAB308] hover:text-black transition-all flex items-center justify-center gap-2 text-zinc-500 group"
                  >
                    <Plus size={12} className="group-hover:text-black" />
                    {t}
                  </button>
               ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
