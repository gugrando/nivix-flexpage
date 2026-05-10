import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Layers } from 'lucide-react';

export default function AccordionGroup({ label, children, active = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-zinc-900/60 border-white/10 shadow-2xl' : 'bg-black/20 border-white/5 hover:border-white/10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-[#EAB308] text-black shadow-lg shadow-[#EAB308]/20' : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'}`}>
            <Layers size={14} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
            {label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={isOpen ? 'text-[#EAB308]' : 'text-zinc-600'}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-6 space-y-6 border-t border-white/5 pt-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
