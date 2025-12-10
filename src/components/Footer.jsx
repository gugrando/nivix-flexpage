// src/components/Footer.jsx
import { Link } from 'react-scroll';
import SocialLinks from './SocialLinks'; 

export default function Footer({ config }) {
  if (!config || !config.footer) return null;

  const { 
    brandSlogan, copyrightText, navigation = [], 
    layout = {}, socialDisplay = {} 
  } = config.footer;
  
  const globalSocials = config.social;
  const brandName = config.general.brandName;
  const currentYear = new Date().getFullYear();

  // Ordem de renderização
  const renderOrder = layout.contentRenderOrder || ['brand', 'navigation', 'socials'];

  // --- LÓGICA DE NAVEGAÇÃO ROBUSTA ---
  // 1. Detecta se o usuário passou string antiga ou objeto novo
  const navConfig = layout.navigationStyle || 'column';
  
  const mobileMode = typeof navConfig === 'object' ? navConfig.mobile : navConfig;
  const desktopMode = typeof navConfig === 'object' ? navConfig.desktop : navConfig;

  // 2. Define classes Base (Mobile)
  // Se for column: flex-col, centralizado. Se for row: flex-row, wrap.
  const baseClasses = mobileMode === 'row'
    ? 'flex flex-row flex-wrap justify-center gap-x-6 gap-y-3'
    : 'flex flex-col items-center gap-y-4';

  // 3. Define classes Desktop (md:)
  // O segredo aqui é resetar as propriedades opostas
  const mdClasses = desktopMode === 'row'
    ? 'md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-x-8 md:gap-y-0'
    : 'md:flex-col md:items-start md:gap-y-3';

  // 4. Controle do Título "MENU"
  // Só aparece se estiver em modo COLUNA naquele dispositivo
  const showMenuTitleMobile = mobileMode === 'column';
  const showMenuTitleDesktop = desktopMode === 'column';

  return (
    <footer className={`
      py-12 px-6 
      ${layout.bgStyle === 'black' ? 'bg-black' : 'bg-bg-main'} 
      ${layout.showTopBorder ? 'border-t border-white/5' : ''}
    `}>
      <div className="container mx-auto flex flex-col gap-12">
        
        {/* PARTE SUPERIOR */}
        <div className={`
          flex flex-col md:flex-row justify-between gap-10 items-center
          ${layout.verticalAlign === 'top' ? 'md:items-start' : 'md:items-center'} 
          text-center md:text-left
        `}>
          
          {renderOrder.map((blockKey) => {
            const blocks = {
              
              // 1. MARCA
              brand: (
                <div key="brand" className="max-w-xs w-full md:w-auto flex flex-col items-center md:items-start">
                  <h3 className="text-2xl font-bold text-white tracking-tighter mb-2">
                    {brandName}<span className="text-brand-primary">.</span>
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {brandSlogan}
                  </p>
                </div>
              ),

              // 2. NAVEGAÇÃO (Com correção de conflito)
              navigation: (
                <div key="navigation" className={`w-full md:w-auto ${baseClasses} ${mdClasses}`}>
                   
                   {/* Título MENU: Lógica de exibição precisa */}
                   <span className={`
                     text-xs font-bold text-gray-600 uppercase tracking-widest mb-1
                     ${showMenuTitleMobile ? 'block' : 'hidden'} 
                     ${showMenuTitleDesktop ? 'md:block' : 'md:hidden'}
                   `}>
                     Menu
                   </span>
                   
                   {navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.targetId}
                      smooth={true}
                      duration={700}
                      className="text-gray-400 hover:text-brand-primary text-sm font-medium hover:font-bold cursor-pointer transition-all flex items-center gap-2 group"
                    >
                      {/* Bolinha decorativa: Só aparece se Desktop for ROW */}
                      {desktopMode === 'row' && (
                        <span className="w-1 h-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"></span>
                      )}
                      
                      {item.label}
                    </Link>
                  ))}
                </div>
              ),

              // 3. REDES SOCIAIS
              socials: (
                <div key="socials" className="flex flex-col items-center md:items-end w-full md:w-auto">
                  <SocialLinks 
                    items={globalSocials} 
                    settings={{...socialDisplay, align: 'center'}} 
                  />
                </div>
              )
            };

            return blocks[blockKey];
          })}

        </div>

        {/* PARTE INFERIOR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="order-1 text-center md:text-left">
            &copy; {currentYear} {brandName}. {copyrightText}
          </div>
          <div className="order-2">
            <a 
              href="https://nivix.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all group"
            >
              <span className="opacity-60">Desenvolvido por</span>
              <span className="font-bold text-gray-400 group-hover:text-brand-primary transition-colors tracking-wide">
                Nivix
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}