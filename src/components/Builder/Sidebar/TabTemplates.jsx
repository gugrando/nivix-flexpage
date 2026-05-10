// src/components/Builder/Sidebar/TabTemplates.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Utensils, Sparkles, RefreshCcw, 
  Save, Trash2, Tag
} from 'lucide-react';

const ICON_MAP = {
  Building2: Building2,
  Utensils: Utensils,
  Sparkles: Sparkles,
  Tag: Tag
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.03 } 
  },
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.02, staggerDirection: -1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 0.2, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, x: 10,
    transition: { duration: 0.1 } 
  }
};

export default function TabTemplates({ 
  niche, setNiche, setModal, presets, niches, 
  openSaveModal, refreshPresets 
}) {
  
  const allTemplates = Object.keys(presets).map(key => {
    const p = presets[key];
    const isFixed = [
      'presetEnterprise', 'presetIndustrialStructure', 'presetLuxuryRemodel', 
      'presetModern', 'presetDrywall', 'presetGastronomyElite', 
      'presetPizzaExpress', 'presetRestaurant'
    ].includes(key);

    return {
      id: p._fileId,
      key: key,
      // PRIORIZA O NOME SALVO NO GLOBAL.BRANDNAME
      n: p.global?.brandName || key.replace('preset', '').replace(/([A-Z])/g, ' $1').trim(),
      d: isFixed ? 'Padrão Nivix' : 'Template Customizado',
      cat: p._niche || 'construction',
      p: p,
      isCustom: !isFixed && p._fileId !== 'preset-blank'
    };
  });

  const deletePreset = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Excluir este preset permanentemente?')) return;
    try {
      const res = await fetch('/api/delete-preset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) await refreshPresets();
    } catch (err) { alert('Erro ao excluir'); }
  };

  return (
    <div className="space-y-6">
      <div className="px-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-left">Ponto de Partida</h3>
          <button 
            onClick={openSaveModal} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-black transition-all text-[9px] font-black uppercase tracking-widest"
          >
            <Save size={12} /> Salvar Atual
          </button>
        </div>
        
        <div className="flex flex-wrap bg-zinc-900/50 p-1 rounded-2xl border border-white/5 mb-8">
          {niches.map(n => {
            const Icon = ICON_MAP[n.icon] || Tag;
            return (
              <button 
                key={n.id} 
                onClick={() => setNiche(n.id)} 
                className={`flex-1 min-w-[100px] py-3 rounded-xl flex items-center justify-center gap-2 transition-all relative z-10 ${niche === n.id ? 'text-[#EAB308]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">{n.label}</span>
                {niche === n.id && (
                  <motion.div layoutId="activeNiche" className="absolute inset-0 bg-zinc-800 border border-white/5 rounded-xl -z-10 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 relative">
        {/* BOTAO RESETAR SEMPRE VISIVEL */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setModal({ open: true, preset: presets.presetBlank, name: 'Vazio', id: 'preset-blank' })} 
          className="w-full p-5 rounded-3xl bg-zinc-900/20 border border-white/5 border-dashed hover:border-zinc-700 transition-all text-left flex items-center gap-5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-600 transition-all border border-white/5"><RefreshCcw size={20} /></div>
          <div><h4 className="font-black text-zinc-500 text-xs uppercase tracking-tight">Começar do Zero</h4><p className="text-[9px] text-zinc-700 uppercase font-bold tracking-widest mt-0.5">Resetar Estrutura</p></div>
        </motion.button>

        <div className="h-px bg-white/5 mx-2 my-2" />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={niche}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid gap-3"
          >
            {allTemplates
              .filter(it => it.cat === niche && it.id !== 'preset-blank')
              .map(it => (
                <motion.div 
                  key={it.id} 
                  variants={itemVariants} 
                  layout
                  onClick={() => setModal({ open: true, preset: it.p, name: it.n, id: it.id })} 
                  className="w-full p-5 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all text-left flex items-center gap-5 group relative cursor-pointer" 
                >
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center transition-all border border-white/5 group-hover:scale-105 group-hover:border-[#EAB308]/20 ${it.cat === 'gastronomy' ? 'text-red-500' : 'text-blue-500'}`}>
                    {it.cat === 'gastronomy' ? <Utensils size={28} strokeWidth={1.5} /> : <Building2 size={28} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm uppercase tracking-tight">{it.n}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5">{it.d}</p>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {it.isCustom && (
                      <button onClick={(e) => deletePreset(e, it.id)} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Excluir"><Trash2 size={14} /></button>
                    )}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
