// src/components/sections/About.jsx
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function About({ data }) {
  if (!data) return null;

  const { 
    title, subtitle, text, ctaButton,
    images = [], stats = [], features = [], 
    layout = {}, visibility = {} 
  } = data;

  const isRightAligned = layout.align === 'right';
  const isSurface = layout.bgStyle === 'surface';
  const hasMultipleImages = images.length > 1;

  // Ordem de renderização (com fallback seguro)
  const renderOrder = layout.contentRenderOrder || ['subtitle', 'title', 'text', 'features', 'stats', 'action'];

  return (
    <section id="about" className={`py-24 px-6 overflow-hidden ${isSurface ? 'bg-bg-surface' : 'bg-bg-main'}`}>
      <div className="container mx-auto">
        
        {/* LAYOUT PRINCIPAL (IMAGEM vs TEXTO) */}
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRightAligned ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* ==============================================
              BLOCO 1: IMAGENS (Fixo na Coluna de Mídia)
             ============================================== */}
          {visibility.showImages !== false && (
            <motion.div 
              initial={{ opacity: 0, x: isRightAligned ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              {hasMultipleImages ? (
                // LAYOUT DE COLAGEM (2 FOTOS)
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <div className={`absolute top-0 ${isRightAligned ? 'right-0' : 'left-0'} w-4/5 h-4/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10`}>
                    <img src={images[0]} alt="Sobre nós Principal" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                  </div>
                  <div className={`absolute bottom-0 ${isRightAligned ? 'left-0' : 'right-0'} w-3/5 h-3/5 rounded-2xl overflow-hidden border-4 border-bg-main shadow-2xl z-20`}>
                    <img src={images[1]} alt="Sobre nós Detalhe" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                  </div>
                  <div className={`absolute bottom-10 ${isRightAligned ? 'right-10' : 'left-10'} w-24 h-24 border-2 border-brand-primary/30 rounded-lg -z-0 animate-pulse-slow`}></div>
                </div>
              ) : (
                // LAYOUT SIMPLES (1 FOTO)
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-2xl group">
                   <img src={images[0]} alt="Sobre nós" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}
            </motion.div>
          )}

          {/* ==============================================
              BLOCO 2: COLUNA DE CONTEÚDO DINÂMICA
             ============================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-6" // Gap controla o espaçamento entre blocos
          >
            {renderOrder.map(blockKey => {
              
              const blocks = {
                // SUBTÍTULO
                subtitle: (
                  <h4 key="subtitle" className="text-yellow-400 font-bold tracking-widest uppercase text-sm">
                    {subtitle}
                  </h4>
                ),

                // TÍTULO
                title: (
                  <h2 key="title" className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
                    {title}
                  </h2>
                ),

                // TEXTO DESCRITIVO
                text: (
                  <p key="text" className="text-gray-400 text-lg leading-relaxed">
                    {text}
                  </p>
                ),

                // FEATURES (CHECKLIST)
                features: visibility.showFeatures !== false && features.length > 0 && (
                  <div key="features" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-brand-primary shrink-0" size={20} />
                        <span className="text-gray-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                ),

                // ESTATÍSTICAS (STATS)
                stats: visibility.showStats !== false && stats.length > 0 && (
                  <div key="stats" className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                    {stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ),

                // BOTÃO DE AÇÃO (NOVO)
                action: visibility.showButton && ctaButton && (
                  <div key="action" className="pt-4">
                    <a 
                      href={ctaButton.url}
                      className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-colors"
                    >
                      {ctaButton.label} <ArrowRight size={18} />
                    </a>
                  </div>
                )
              };

              return blocks[blockKey];
            })}

          </motion.div>

        </div>
      </div>
    </section>
  );
}