// src/components/Builder/Sidebar/TabStructure.jsx
import React from 'react';
import { motion } from 'framer-motion';
import BlockItem from './BlockItem';
import BlockLibrary from './BlockLibrary';

export default function TabStructure({ 
  config, setConfig, selId, setSelId, 
  updateData, renderField, setIkey, askConfirmation 
}) {
  return (
    <motion.div 
      key="blocks-tab"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center px-2 mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-left">Estrutura da Página</h3>
        <span className="text-[10px] font-black text-[#EAB308] bg-[#EAB308]/10 px-2 py-0.5 rounded-full border border-[#EAB308]/20">{config.blocks.length}</span>
      </div>
      
      <div className="space-y-3">
        {config.blocks.map((b, idx) => (
          <BlockItem 
            key={b.id}
            b={b}
            idx={idx}
            blocks={config.blocks}
            setConfig={setConfig}
            selId={selId}
            setSelId={setSelId}
            updateData={updateData}
            renderField={renderField}
            setIkey={setIkey}
            askConfirmation={askConfirmation}
          />
        ))}
      </div>

      <BlockLibrary 
        config={config} 
        setConfig={setConfig} 
        setSelId={setSelId} 
        setIkey={setIkey} 
      />
    </motion.div>
  );
}
