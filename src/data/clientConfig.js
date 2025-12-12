// src/data/clientConfig.js

export const clientConfig = {
social: [
    { 
      id: "instagram", 
      url: "https://instagram.com/grattopizzas", 
      active: true, 
      label: "Instagram da Gratto" // para acessibilidade/SEO
    },
    { 
      id: "whatsapp", 
      url: "https://wa.me/5491834554", 
      active: true, 
      label: "WhatsApp"
    },
    { 
      id: "facebook", 
      url: "https://www.facebook.com/grattopizzasgourmet", 
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
    brandName: "Gratto",
    whatsapp: "5511999999999"
  },

  header: {
    logo: {
      type: 'text', // 'image' ou 'text'
      text: 'Gratto Pizzas',
      accentColor: 'text-brand-primary',
      imageUrl: '', 
      altText: 'Gratto Pizzas'
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
      url: 'https://wa.me/5491834554',
      className: 'bg-brand-primary text-white hover:bg-brand-secondary shadow-[0_0_15px_rgba(234,179,8,0.3)]'
    }
  },
footer: {
    // Texto descritivo
    brandSlogan: "A melhor pizza Gourmet da cidade é na Gratto!",
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
  headline: "Pizza Gourmet de Qualidade",
  subheadline: "Ingredientes selecionados, massa fermentada e o melhor sabor da cidade.",
  badgeText: "Bem-vindo à Experiência Gratto",
  bgImage: "/bggrt.png",
  
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
      url: "https://wa.me/5491834554", 
      variant: "outline", 
      icon: "whatsapp" 
    }
  ]
},
highlights: {
  // --- CONTEÚDO DE TEXTO ---
  title: "Os Favoritos na Gratto",
  subtitle: "Nossos mais pedidos, ingredientes premium e sabor especial.",
  
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
      name: "Xis da Gratto",
      description: "Todos os sabores premiums da Gratto, o melhor da cidade!",
      price: "R$ 68,00",
      image: "/xisp.png",
      badge: "Mais Pedida", // Opcional
      link: "https://wa.me/5491834554?text=Quero+a+Marguerita" // Link direto do produto
    },
    {
      id: 2,
      name: "Pizza GG",
      description: "Os melhores sabores da casa em promoção!",
      price: "R$ 62,00",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      badge: "Oferta",
      link: "https://wa.me/5491834554?text=Quero+a+Marguerita"
    },
    {
      id: 3,
      name: "Açai Gratto",
      description: "Cremoso e com adicionais perfeitos",
      price: "R$ 85,00",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
      link: "https://wa.me/5491834554?text=Quero+a+Marguerita"
    }
  ]
},// src/data/clientConfig.js

about: {
  // --- CONTEÚDO ---
  title: "A Experiência Gratto",
  subtitle: "Pizza premium saborosa, entregue no conforto da sua casa.",
  text: "Mais do que uma pizzaria, a Gratto quer fazer parte da sua noite em casa. Acreditamos que pizza boa é aquela feita com atenção aos detalhes e ingredientes que a gente conhece e ama. Por isso, nossa seleção é cuidadosa, buscando sempre o sabor mais gostoso. Trabalhamos só com entrega e retirada para que você tenha a melhor pizza do bairro, sem precisar tirar o pijama.",
  
  // Imagens (Mantive as originais pois o pedido era só sobre as copys de texto)
  images: [
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop"
  ],

  // Stats (Adaptados para focar em qualidade e modelo de negócio, não apenas tempo)
  stats: [
    { value: "4.9", label: "Excelência em Avaliações" },
    { value: "24h+", label: "Mínimo de Fermentação Natural" },
    { value: "100%", label: "Foco na Experiência em Casa" },
    { value: "Premium", label: "Curadoria de Ingredientes" },
  ],

  // Features (Focados nos diferenciais competitivos da Gratto)
  features: [
    "Ingredientes de ponta",
    "Massa de longa fermentação, leve e digerível",
    "Delivery e Retirada",
    "Combinações autorais e sofisticadas"
  ],

  // Botão opcional dentro do Sobre Nós (Caso ativem no futuro)
  ctaButton: {
    label: "Explore o Menu Autoral",
    url: "#menu",
  },

  // --- CONFIGURAÇÃO VISUAL (Mantida conforme seu input original) ---
  layout: {
    bgStyle: 'main', 
    align: 'left', 
    contentRenderOrder: ['subtitle', 'title', 'text', 'features', 'stats', 'action'],
  },

  visibility: {
    showStats: true,
    showFeatures: true,
    showImages: true,
    showButton: false // Mantido false, mas a copy do botão foi atualizada acima
  }
},// src/data/clientConfig.js

location: {
  // --- CABEÇALHO ---
  title: "Onde Estamos",
  subtitle: "Venha nos visitar para retirada ou peça no conforto de casa.",
  
  // --- DADOS DE ENDEREÇO ---
  address: "R. Dalci F. de Andrade, 524 - Primeiro de Maio, Farroupilha - RS",
  mapLink: "https://www.google.com/maps/dir/Gratto+Pizzas+Gourmet/R.+Dalci+F.+de+Andrade,+524+-+Primeiro+de+Maio,+Farroupilha+-+RS,+95180-000/@-29.2441243,-51.3371962,14z/data=!4m13!4m12!1m5!1m1!1s0x951c1f8426f2a5c1:0xd25f2520f1616dbd!2m2!1d-51.3496161!2d-29.2435364!1m5!1m1!1s0x951c1f8426f2a5c1:0xd25f2520f1616dbd!2m2!1d-51.3496161!2d-29.2435364?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D", // Link para abrir o app do GPS
  
  // Link EMBED (Google Maps -> Compartilhar -> Incorporar mapa -> Copiar apenas o src="URL")
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27850.55455954519!2d-51.38769149780275!3d-29.243569844102154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951c1f8426f2a5c1%3A0xd25f2520f1616dbd!2sGratto%20Pizzas%20Gourmet!5e0!3m2!1spt-BR!2sbr!4v1765557924205!5m2!1spt-BR!2sbr",

  // --- HORÁRIOS ---
  hours: [
    { day: "Segunda", time: "18h00 - 22h30", highlight: false },
    { day: "Ter a Qui", time: "18h00 - 22h30", highlight: false },
    { day: "Sex e Sáb", time: "18h00 - 23h00", highlight: true }, // Highlight: Amarelo
    { day: "Dom", time: "18h00 - 23h00", highlight: false }
  ],

  // --- CONFIGURAÇÃO VISUAL ---
  serviceTags: [
    { label: "Salão", active: false, icon: "utensils" },
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