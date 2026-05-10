// src/components/Builder/Sidebar/BlockItem.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, MoveUp, MoveDown } from 'lucide-react';
import BlockEditor from './BlockEditor';

export default function BlockItem({ 
  b, idx, blocks, setConfig, selId, setSelId, 
  updateData, renderField, setIkey, askConfirmation 
}) {
  const isActive = selId === b.id;

  const moveUp = (e) => {
    e.stopPropagation();
    if (idx > 0) {
      const n = [...blocks];
      [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
      setConfig(prev => ({ ...prev, blocks: n }));
    }
  };

  const moveDown = (e) => {
    e.stopPropagation();
    if (idx < blocks.length - 1) {
      const n = [...blocks];
      [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
      setConfig(prev => ({ ...prev, blocks: n }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group ${selId && !isActive ? 'opacity-40' : 'opacity-100'}`}
    >
      <div 
        onClick={() => setSelId(isActive ? null : b.id)} 
        className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${isActive ? 'border-[#EAB308]/50 bg-[#EAB308]/5 shadow-2xl' : 'border-white/5 bg-zinc-900/30 hover:border-white/10'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-[#EAB308] text-black shadow-lg shadow-[#EAB308]/20' : 'bg-zinc-800 text-zinc-500'}`}>
            <Layout size={18} />
          </div>
          <div className="text-left">
            <span className={`text-xs font-black block truncate max-w-[140px] uppercase tracking-tight ${isActive ? 'text-white' : 'text-zinc-400'}`}>
              {b.data.title || b.type}
            </span>
            <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest block mt-0.5">{b.type}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button onClick={moveUp} className="p-2 text-zinc-600 hover:text-white transition-colors">
            <MoveUp size={14}/>
          </button>
          <button onClick={moveDown} className="p-2 text-zinc-600 hover:text-white transition-colors">
            <MoveDown size={14}/>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <BlockEditor 
              b={b}
              idx={idx}
              blocks={blocks}
              setConfig={setConfig}
              updateData={updateData}
              renderField={renderField}
              setIkey={setIkey}
              askConfirmation={askConfirmation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
