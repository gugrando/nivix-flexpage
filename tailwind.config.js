/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores da Agência Nivix (Identidade Visual Fixa)
        nivix: {
          yellow: '#EAB308', 
          black: '#09090b',  
        },
        
        // Cores do CLIENTE (Editáveis via CSS Variables)
        brand: {
          primary: 'var(--brand-primary)',  
          secondary: 'var(--brand-secondary)', 
          accent: 'var(--brand-accent)',    
        },

        // Cores de Fundo dinâmicas
        bg: {
          main: 'var(--bg-main)',    
          surface: 'var(--bg-surface)', 
          elevated: 'var(--bg-elevated)' 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}