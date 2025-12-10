// src/data/clientConfig.js

export const clientConfig = {
social: [
    { 
      id: "instagram", 
      url: "https://instagram.com/nivix", 
      active: true, 
      label: "Instagram" // para acessibilidade/SEO
    },
    { 
      id: "whatsapp", 
      url: "https://wa.me/5599999999", 
      active: true, 
      label: "WhatsApp"
    },
    { 
      id: "facebook", 
      url: "#", 
      active: true, 
      label: "Facebook"
    },
    { 
      id: "tiktok", 
      url: "#", 
      active: false, // Exemplo: desativado
      label: "TikTok"
    }
  ],

  general: {
    brandName: "La Mamma",
    whatsapp: "5511999999999"
  },

  header: {
    logo: {
      type: 'text', // 'image' ou 'text'
      text: 'La Mamma',
      accentColor: 'text-brand-primary',
      imageUrl: '', 
      altText: 'La Mamma Pizzaria'
    },
    style: {
      bgColorScrolled: 'bg-bg-main',
      textColor: 'text-gray-100',
      hoverColor: 'text-brand-primary',
    },
    navigation: [
      { label: 'Início', targetId: 'home' },
      { label: 'Destaques', targetId: 'menu' },
      { label: 'Sobre', targetId: 'about' },
      { label: 'Local', targetId: 'location' },
    ],
    ctaButton: {
      visible: true,
      label: 'Pedir no Whats',
      url: 'https://wa.me/55999999999',
      className: 'bg-brand-primary text-black hover:bg-brand-secondary shadow-[0_0_15px_rgba(234,179,8,0.3)]'
    }
  },
footer: {
    // Texto descritivo
    brandSlogan: "A melhor experiência gastronômica da cidade.",
    copyrightText: "Todos os direitos reservados.",
    
    // Links de Navegação
    navigation: [
      { label: "Início", targetId: "home" },
      { label: "Cardápio Digital", targetId: "menu" },
      { label: "Nossa História", targetId: "about" },
      { label: "Localização", targetId: "location" }
    ],

    // --- CONFIGURAÇÃO VISUAL E LAYOUT ---
    layout: {
      bgStyle: 'black',      // 'black' (Preto total) ou 'main' (Zinc 950)
      showTopBorder: true,   // Linha fina separando o footer
      verticalAlign: 'center', // Alinhamento vertical no desktop: 'top', 'center', 'bottom'

      // CONTROLE RESPONSIVO DE NAVEGAÇÃO (A Mágica)
      // Defina como a lista de links se comporta em cada tela
      navigationStyle: {
        mobile: 'column',  // 'column' (Lista vertical - Melhor para celular)
        desktop: 'row'     // 'row' (Lado a lado - Melhor para desktop)
      },

      // Ordem das colunas no Desktop (Esquerda -> Direita)
      contentRenderOrder: ['brand', 'navigation', 'socials']
    },

    // --- REDES SOCIAIS (Visual específico do Footer) ---
    socialDisplay: {
      align: 'right',          // Alinhamento interno do bloco social
      label: "",               // Sem texto "Siga-nos" no footer para ficar limpo
      labelPosition: 'top',
      buttonStyle: 'minimal',  // 'minimal' (Só o ícone) fica mais elegante aqui
      size: 'lg'               // Ícones grandes
    }
  },

  sections: {
    hero: {
  // --- CONTEÚDO (O que aparece) ---
  headline: "Experiência Gastronômica Inesquecível",
  subheadline: "Ingredientes selecionados, ambiente acolhedor e o sabor que você já conhece.",
  badgeText: "Bem-vindo à Experiência Nivix",
  bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
  
  // --- VISIBILIDADE (O que existe ou não - ON/OFF) ---
  visibility: {
    showBadge: true,       // Quer o selo "Bem-vindo"? true/false
    showHeadline: true,    // Quer o título?
    showSubheadline: true, // Quer o subtítulo?
    showButtons: true,     // Quer os botões?
    showScrollIndicator: true // Quer a setinha pulsando embaixo?
  },

  // --- LAYOUT E POSIÇÃO (A Mágica da Customização) ---
  layout: {
    // Ordem visual dos elementos (Mude a sequencia aqui e muda no site)
    // Opções: 'badge', 'headline', 'subheadline', 'buttons'
    renderOrder: ['badge', 'headline', 'subheadline', 'buttons'],
    
    // Alinhamento Desktop (Mobile será sempre CENTER por padrão)
    desktopAlign: 'center', // 'left', 'center', 'right'
    
    // Como os botões se comportam?
    buttonsDirection: 'row', // 'row' (lado a lado) ou 'column' (um embaixo do outro)
    
    // Opacidade do fundo preto (0.1 a 0.9)
    overlayOpacity: 0.8
  },

  // --- BOTÕES ---
  buttons: [
    { 
      label: "Ver Cardápio Digital", 
      url: "#menu", 
      variant: "primary", 
      icon: "book-open" 
    },
    { 
      label: "Chamar no WhatsApp", 
      url: "https://wa.me/...", 
      variant: "outline", 
      icon: "whatsapp" 
    }
  ]
},
highlights: {
  // --- CONTEÚDO DE TEXTO ---
  title: "Os Favoritos da Casa",
  subtitle: "Nossas receitas mais pedidas, preparadas com ingredientes selecionados.",
  
  layout: {
    bgStyle: 'surface', 
    columnsDesktop: 3, 
    cardStyle: 'elevated',
    
    // --- A NOVA MÁGICA AQUI ---
    // Defina a ordem visual dos elementos dentro do card
    // Opções disponíveis: 'image', 'header', 'description', 'action'
    cardRenderOrder: ['image', 'header', 'description', 'action'], 
  },

  visibility: {
    showPrice: true,
    showButton: true,
    showBadges: true,
    showDescription: true
  },

  // --- LISTA DE PRODUTOS ---
  items: [
    {
      id: 1,
      name: "Marguerita Speciale",
      description: "Molho de tomate pelati, mussarela de búfala, manjericão fresco e azeite trufado.",
      price: "R$ 68,00",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop",
      badge: "Mais Pedida", // Opcional
      link: "https://wa.me/...?text=Quero+a+Marguerita" // Link direto do produto
    },
    {
      id: 2,
      name: "Calabresa Defumada",
      description: "Calabresa artesanal defumada, cebola roxa caramelizada e orégano fresco.",
      price: "R$ 62,00",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      badge: "Oferta",
      link: "https://wa.me/...?text=Quero+a+Calabresa"
    },
    {
      id: 3,
      name: "Burrata & Parma",
      description: "Base branca, burrata inteira no centro, presunto de parma e rúcula selvagem.",
      price: "R$ 85,00",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
      link: "https://wa.me/...?text=Quero+a+Burrata"
    }
  ]
},// src/data/clientConfig.js

about: {
  // --- CONTEÚDO ---
  title: "Nossa História",
  subtitle: "Mais que uma pizzaria, uma tradição de família.",
  text: "Fundada em 1998, a La Mamma nasceu do sonho de trazer a autêntica receita napolitana para o Brasil. Nossa massa descansa por 48 horas e nossos ingredientes são selecionados a dedo todos os dias.",
  
  // Imagens
  images: [
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop"
  ],

  stats: [
    { value: "25+", label: "Anos de História" },
    { value: "15k", label: "Clientes Felizes" },
    { value: "4.9", label: "Nota no Google" },
    { value: "5k+", label: "Seguidores" },
  ],

  features: [
    "Ingredientes Importados",
    "Ambiente Pet Friendly",
    "Forno a Lenha Certificado",
    "Estacionamento Gratuito"
  ],

  // Botão opcional dentro do Sobre Nós
  ctaButton: {
    label: "Conheça o Chef",
    url: "#chef"
  },

  // --- CONFIGURAÇÃO VISUAL ---
  layout: {
    bgStyle: 'main', 
    align: 'left', // Imagem na esquerda
    
    // --- A NOVA MÁGICA: ORDEM DO CONTEÚDO ---
    // Defina o que aparece primeiro na coluna de texto
    contentRenderOrder: ['subtitle', 'title', 'text', 'features', 'stats', 'action'],
  },

  visibility: {
    showStats: true,
    showFeatures: true,
    showImages: true,
    showButton: false // Deixei false por padrão, ative se quiser testar
  }
},// src/data/clientConfig.js

location: {
  // --- CABEÇALHO ---
  title: "Onde Estamos",
  subtitle: "Venha nos visitar ou peça no conforto de casa.",
  
  // --- DADOS DE ENDEREÇO ---
  address: "Rua das Flores, 123 - Centro, São Paulo - SP",
  mapLink: "https://maps.google.com/...", // Link para abrir o app do GPS
  
  // Link EMBED (Google Maps -> Compartilhar -> Incorporar mapa -> Copiar apenas o src="URL")
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197577867296!2d-46.6565!3d-23.5615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQxLjQiUyA0NsKwMzknMjMuNCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr",

  // --- HORÁRIOS ---
  hours: [
    { day: "Segunda", time: "Fechado", highlight: false },
    { day: "Ter a Qui", time: "18h00 - 23h00", highlight: false },
    { day: "Sex e Sáb", time: "18h00 - 00h00", highlight: true }, // Highlight: Amarelo
    { day: "Dom", time: "18h00 - 23h00", highlight: false }
  ],

  // --- CONFIGURAÇÃO VISUAL ---
  serviceTags: [
    { label: "Salão", active: true, icon: "utensils" },
    { label: "Retirada", active: true, icon: "bag" },
    { label: "Delivery", active: true, icon: "bike" },
    { label: "Pet Friendly", active: false, icon: "paw" } // Exemplo extra
  ],
  socialDisplay: {
    align: 'center',          // 'left', 'center', 'right'
    label: "", // Texto acima ou ao lado. Deixe vazio "" para remover.
    labelPosition: 'top',   // 'top' (em cima dos icones) ou 'side' (ao lado esquerdo)
    buttonStyle: 'outline', // 'outline' (circular), 'solid' (amarelo cheio), 'minimal' (só icone)
    size: 'md'
  },

  layout: {
        bgStyle: 'surface',
        // ADICIONE 'socials' NA ORDEM ONDE PREFERIR
        infoRenderOrder: ['address', 'hours', 'button', 'socials'], 
      },

  visibility: {
    showMap: true, // Se false, a coluna do mapa some e o texto centraliza
    showAddress: true,
    showHours: true,
    showButton: true,
    showSocials: true
  }
},

  }
};