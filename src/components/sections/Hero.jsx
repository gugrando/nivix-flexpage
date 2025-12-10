// src/components/sections/Hero.jsx
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageCircle, MapPin, Phone } from 'lucide-react';

const ICON_MAP = {
  'arrow-right': ArrowRight,
  'book-open': BookOpen,
  'whatsapp': MessageCircle,
  'map-pin': MapPin,
  'phone': Phone
};

export default function Hero({ data }) {
  if (!data) return null;

  // Extraindo todas as configs novas
  const { 
    headline, subheadline, badgeText, bgImage, buttons, 
    visibility = {}, 
    layout = {} 
  } = data;

  // Defaults para evitar quebra se o config estiver incompleto
  const showBadge = visibility.showBadge !== false;
  const showHeadline = visibility.showHeadline !== false;
  const showSubheadline = visibility.showSubheadline !== false;
  const showButtons = visibility.showButtons !== false;
  const showScrollIndicator = visibility.showScrollIndicator !== false;

  const desktopAlign = layout.desktopAlign || 'center';
  const renderOrder = layout.renderOrder || ['badge', 'headline', 'subheadline', 'buttons'];
  const btnsDirection = layout.buttonsDirection || 'row';
  const opacity = layout.overlayOpacity || 0.75;

  // Lógica de Alinhamento Responsivo:
  // Mobile = Sempre Center/Items-Center
  // Desktop (md:) = Obedece o config
  const alignClasses = {
    left: 'md:text-left md:items-start',
    center: 'md:text-center md:items-center',
    right: 'md:text-right md:items-end',
  };

  // --- SUB-COMPONENTES INTERNOS (Peças do Lego) ---
  
  const componentsMap = {
    badge: showBadge && (
      <motion.div key="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium tracking-wide backdrop-blur-sm">
          {badgeText || "Bem-vindo"}
        </span>
      </motion.div>
    ),

    headline: showHeadline && (
      <h1 key="headline" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-display leading-[0.9] drop-shadow-2xl">
        {headline}
      </h1>
    ),

    subheadline: showSubheadline && (
      <p key="subheadline" className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl font-light leading-[1.2] drop-shadow-md">
        {subheadline}
      </p>
    ),

    buttons: showButtons && (
      <div key="buttons" className={`flex flex-wrap gap-4 w-full ${
        // Lógica de direção dos botões (Coluna ou Linha)
        btnsDirection === 'column' ? 'flex-col' : 'flex-row'
      } ${
        // Alinhamento dos botões (Mobile sempre centro)
        'justify-center items-center'
      } ${
        // Alinhamento Desktop
        desktopAlign === 'left' ? 'md:justify-start md:items-start' : 
        desktopAlign === 'right' ? 'md:justify-end md:items-end' : 
        'md:justify-center md:items-center'
      }`}>
        {buttons.map((btn, index) => {
          const BtnIcon = ICON_MAP[btn.icon] || ArrowRight;
          const isPrimary = btn.variant === 'primary';
          return (
            <motion.a
              key={index}
              href={btn.url}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center justify-center gap-3 h-14 px-6
                min-w-[290px] max-w-[300px] 
                rounded-full font-bold text-lg transition-all shadow-lg cursor-pointer
                ${isPrimary 
                  ? 'bg-brand-primary text-black hover:bg-brand-secondary shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
                  : 'bg-white/5 text-white backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/40'
                }
              `}
            >
              {btn.label}
              <BtnIcon size={20} />
            </motion.a>
          )
        })}
      </div>
    )
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full flex flex-col justify-center overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-nivix-black z-10 transition-opacity duration-700" style={{ opacity }}></div>
        <img src={bgImage} alt="Background" className="w-full h-full object-cover scale-105 animate-pulse-slow" />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`
            flex flex-col w-full 
            items-center text-center             
            ${alignClasses[desktopAlign] || alignClasses.center} 
            ${desktopAlign === 'center' ? 'md:mx-auto max-w-4xl' : 'md:max-w-3xl'}
            ${desktopAlign === 'right' ? 'md:ml-auto' : ''}
          `}
        >
          
          {/* RENDERIZAÇÃO MÁGICA BASEADA NA ORDEM DO CONFIG */}
          {renderOrder.map(itemKey => componentsMap[itemKey])}

        </motion.div>
      </div>

      {/* SCROLL INDICATOR (Toggleable) */}
      {showScrollIndicator && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-5 h-9 border border-white/30 rounded-full flex justify-center p-1 bg-black/30 backdrop-blur-sm">
            <div className="w-1 h-1.5 bg-brand-primary rounded-full"></div>
          </div>
        </motion.div>
      )}

    </section>
  );
}