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
          yellow: '#EAB308', // O Amarelo Ouro da marca
          black: '#09090b',  // Fundo quase preto (Zinc 950)
        },
        
        // Cores do CLIENTE (Editáveis para cada projeto)
        // Por padrão, deixamos igual ao da Nivix para o template
        brand: {
          primary: '#640505',  // Cor principal (Botões, Destaques)
          secondary: '#BA002B', // Cor secundária (Hover, bordas)
          accent: '#FACC15',    // Cor de brilho/texto claro
        },

        // Cores de Fundo (Modo Dark Premium)
        bg: {
          main: '#09090b',    // Fundo da página (Zinc 950)
          surface: '#18181b', // Fundo de cartões/seções (Zinc 900)
          elevated: '#27272a' // Fundo de modais/dropdowns (Zinc 800)
        }
      },
      fontFamily: {
        // Vamos usar a fonte padrão 'sans' do Tailwind, 
        // mas você pode importar uma fonte do Google Fonts depois
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // Fonte para títulos
      }
    },
  },
  plugins: [],
}