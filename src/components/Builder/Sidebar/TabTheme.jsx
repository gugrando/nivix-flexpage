// src/components/Builder/Sidebar/TabTheme.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Settings } from 'lucide-react';
import { ColorPicker, Input } from '../ControlField';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

export default function TabTheme({ config, setConfig }) {
  return (
    <motion.div 
      key="theme-tab"
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      exit="hidden"
      className="space-y-12"
    >
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] border border-[#EAB308]/20">
            <Palette size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight text-white">Identidade Visual</h3>
        </div>
        <div className="space-y-2">
          <ColorPicker 
            label="Cor Primária (Brand)" 
            value={config.theme.colors.primary} 
            onChange={v => setConfig(p=>({...p,theme:{...p.theme,colors:{...p.theme.colors,primary:v}}}))} 
          />
          <ColorPicker 
            label="Fundo da Página" 
            value={config.theme.colors.background} 
            onChange={v => setConfig(p=>({...p,theme:{...p.theme,colors:{...p.theme.colors,background:v}}}))} 
          />
        </div>
      </section>

      <section className="pt-12 border-t border-white/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] border border-[#EAB308]/20">
            <Settings size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight text-white">Configurações Globais</h3>
        </div>
        <div className="space-y-2">
          <Input 
            label="Nome da Marca / Empresa" 
            value={config.global.brandName} 
            onChange={v => setConfig(p=>({...p,global:{...p.global,brandName:v}}))} 
          />
          <Input 
            label="Link de WhatsApp / Contato" 
            value={config.global.whatsapp} 
            onChange={v => setConfig(p=>({...p,global:{...p.global,whatsapp:v}}))} 
          />
        </div>
      </section>
    </motion.div>
  );
}
