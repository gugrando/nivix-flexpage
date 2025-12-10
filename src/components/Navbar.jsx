import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ config }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEGURANÇA: Se não vier config ou header, não quebra a tela, retorna null
  if (!config || !config.header) return null;

  // Desestruturação segura
  const { logo, navigation, ctaButton, style } = config.header;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-colors duration-500 ${
        scrolled || isOpen 
          ? `${style.bgColorScrolled} shadow-xl` 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center h-full">
        
        {/* 1. LOGO */}
        <div className="flex items-center gap-2 cursor-pointer z-50">
          <Link to="home" smooth={true} duration={500}>
            {logo.type === 'image' ? (
              <img src={logo.imageUrl} alt={logo.altText} className="h-10 w-auto object-contain" />
            ) : (
              <span className={`text-2xl font-bold ${style.textColor} tracking-tighter`}>
                {logo.text}<span className={logo.accentColor}>.</span>
              </span>
            )}
          </Link>
        </div>

        {/* 2. MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item, index) => (
            <Link
              key={index}
              to={item.targetId}
              smooth={true}
              duration={700}
              className={`${style.textColor} hover:${style.hoverColor} font-medium cursor-pointer transition-colors text-sm uppercase tracking-wide`}
            >
              {item.label}
            </Link>
          ))}
          
          {ctaButton.visible && (
            <a 
              href={ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 flex items-center gap-2 ${ctaButton.className}`}
            >
              <Phone size={18} />
              {ctaButton.label}
            </a>
          )}
        </div>

        {/* 3. BOTÃO HAMBURGUER */}
        <div className="lg:hidden z-50">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`hover:${style.hoverColor} transition-colors focus:outline-none p-2 ${style.textColor}`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* 4. MENU MOBILE ATUALIZADO (Usando 'navigation' em vez de 'links') */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-bg-main shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center py-10 space-y-6">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.targetId}
                  smooth={true}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold ${style.textColor} hover:${style.hoverColor} cursor-pointer`}
                >
                  {item.label}
                </Link>
              ))}
              
              {ctaButton.visible && (
                <a 
                  href={ctaButton.url}
                  className={`mt-4 px-8 py-3 rounded-full font-bold text-lg w-3/4 text-center flex justify-center items-center gap-2 ${ctaButton.className}`}
                >
                  <Phone size={20} />
                  {ctaButton.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}