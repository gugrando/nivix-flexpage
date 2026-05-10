// src/components/Builder/Sidebar/SidebarTabs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Layout, Palette } from 'lucide-react';

export default function SidebarTabs({ tab, setTab }) {
  const tabs = [
    { id: 'templates', label: 'Presets', icon: Layers },
    { id: 'blocks', label: 'Estrutura', icon: Layout },
    { id: 'theme', label: 'Identidade', icon: Palette }
  ];

  return (
    <div className="px-6 pb-6 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex bg-zinc-900/50 p-1 rounded-2xl border border-white/5 relative">
        {tabs.map(t => (
          <button 
            key={t.id} 
            onClick={() => setTab(t.id)} 
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all relative z-10 ${tab === t.id ? 'text-[#EAB308]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <t.icon size={14} strokeWidth={tab === t.id ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-wider">{t.label}</span>
            {tab === t.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-zinc-800 border border-white/5 rounded-xl -z-10 shadow-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
