import { motion } from 'framer-motion';
import { Layout, Plus, MousePointer2, Sparkles } from 'lucide-react';
import { BLOCK_LIBRARY } from './library/registry';

const EmptyStateOnboarding = () => {
  const navigateTo = (tab) => {
    window.parent.postMessage({ type: 'NAVIGATE_TAB', tab }, '*');
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EAB308]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/5 mb-8">
          <Sparkles size={14} className="text-[#EAB308]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Nivix Builder Alpha</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
          Sua tela está <span className="text-[#EAB308]">vazia</span>.
        </h1>
        
        <p className="text-xl text-zinc-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
          Comece a criar seu site de elite agora mesmo adicionando o primeiro bloco.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <button 
            onClick={() => navigateTo('blocks')}
            className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col items-center group hover:bg-zinc-800/50 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 border border-white/5 text-[#EAB308] group-hover:scale-110 transition-transform">
              <Layout size={24} />
            </div>
            <h3 className="text-white font-black uppercase text-sm tracking-widest mb-2">Acesse Estrutura</h3>
            <p className="text-xs text-zinc-500 font-medium">Vá na aba ao lado para ver sua lista de blocos.</p>
          </button>

          <button 
            onClick={() => navigateTo('blocks')}
            className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col items-center group hover:bg-zinc-800/50 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 border border-white/5 text-blue-500 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <h3 className="text-white font-black uppercase text-sm tracking-widest mb-2">Adicione Blocos</h3>
            <p className="text-xs text-zinc-500 font-medium">Clique no botão "+" para abrir a biblioteca de elite.</p>
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 animate-bounce">
          <MousePointer2 size={16} className="text-zinc-700" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Tudo começa aqui</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function DynamicRenderer({ blocks, globalSocials }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return <EmptyStateOnboarding />;
  }

  return (
    <>
      {blocks.map((block) => {
        const variants = BLOCK_LIBRARY[block.type];
        if (!variants) return null;

        const variantKey = block.variant || variants.default;
        const variantObj = variants[variantKey];
        const Component = variantObj?.component;
        if (!Component) return null;

        const blockData = { ...(variantObj.defaultData || {}), ...block.data };
        const style = blockData.style || {};
        const isHeader = block.type === 'header';
        const isHero = block.type === 'hero';

        return (
          <div 
            key={block.id} 
            id={block.id}
            className={`
              ${style.customText ? 'section-custom-text' : ''} 
              ${(!style.customBg && !isHero && !isHeader) ? (blockData.layout?.bgStyle === 'surface' ? 'bg-bg-surface' : 'bg-bg-main') : ''}
            `}
            style={{ 
              backgroundColor: (isHeader) ? 'transparent' : (style.customBg || 'transparent'),
              color: style.customText || 'inherit',
              position: 'relative'
            }}
          >
            <Component 
              data={blockData} 
              globalSocials={globalSocials} 
            />
          </div>
        );
      })}
    </>
  );
}