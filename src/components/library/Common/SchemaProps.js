// src/components/library/Common/SchemaProps.js

// -------------------------------------------------------------------------
// BLOCOS DE SCHEMAS REUTILIZÁVEIS (PADRÃO GLOBAL DNA)
// -------------------------------------------------------------------------

/**
 * DNA de Elite: Configurações que TODO componente deve ter.
 * Ao importar e espalhar (...commonFineTuning) no schema do componente,
 * garantimos que a aba de Ajuste Fino seja consistente em todo o projeto.
 */
export const commonFineTuning = [
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { key: 'style.customAccent', label: 'Cor de Destaque (Accent)', type: 'color' },
      { key: 'style.customBg', label: 'Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { key: 'style.showAmbientLight', label: 'Luz Ambiente Suave', type: 'toggle' }
    ]
  }
];

/**
 * DNA de Botão: Campos padrão para qualquer botão no site.
 * Pode ser usado em arrays (itemFields) ou espalhado em objetos.
 */
export const commonButtonFields = [
  { key: 'label', label: 'Texto', type: 'text' },
  { key: 'url', label: 'Link / ID Seção', type: 'text' },
  { key: 'variant', label: 'Estilo', type: 'select', options: [
    { value: 'primary', label: 'Sólido' },
    { value: 'outline', label: 'Contorno' },
    { value: 'ghost', label: 'Simples' }
  ]},
  { key: 'design', label: 'Formato', type: 'select', options: [
    { value: 'rounded-xl', label: 'Suave' },
    { value: 'rounded-full', label: 'Cápsula (Pill)' },
    { value: 'rounded-none', label: 'Quadrado' }
  ]},
  { key: 'size', label: 'Tamanho', type: 'select', options: [
    { value: 'sm', label: 'Pequeno' },
    { value: 'md', label: 'Normal' },
    { value: 'lg', label: 'Grande' }
  ]}
];

/**
 * DNA de Tipografia: Campos padrão para controle de texto (Headline, Subtitle, etc).
 * Permite que o designer fuja do "tudo em Caps/Black" quando necessário.
 */
export const commonTypographyFields = (prefix = 'headline', options = {}) => {
  const { isBody = false, isBadge = false } = options;
  
  let sizeOptions = [
    { value: 'text-2xl md:text-4xl', label: 'Extra Pequeno' },
    { value: 'text-3xl md:text-5xl', label: 'Pequeno' },
    { value: 'text-4xl md:text-6xl', label: 'Normal' },
    { value: 'text-5xl md:text-7xl', label: 'Grande' },
    { value: 'text-6xl md:text-8xl', label: 'Gigante' },
    { value: 'text-7xl md:text-[10rem]', label: 'Monumental' }
  ];

  if (isBody) {
    sizeOptions = [
      { value: 'text-[10px] md:text-xs', label: 'Micro' },
      { value: 'text-xs md:text-sm', label: 'Extra Pequeno' },
      { value: 'text-sm md:text-base', label: 'Pequeno' },
      { value: 'text-base md:text-lg', label: 'Normal' },
      { value: 'text-lg md:text-xl', label: 'Médio' },
      { value: 'text-xl md:text-2xl', label: 'Grande' }
    ];
  }

  if (isBadge) {
    sizeOptions = [
      { value: 'text-[8px] md:text-[10px]', label: 'Extra Pequeno' },
      { value: 'text-[10px] md:text-xs', label: 'Pequeno' },
      { value: 'text-xs md:text-sm', label: 'Normal' },
      { value: 'text-sm md:text-base', label: 'Médio' }
    ];
  }

  return [
    { type: 'section', label: 'Estilo do Texto' },
    { key: `${prefix}Font`, label: 'Fonte', type: 'select', options: [
      { value: "'Poppins', sans-serif", label: 'Poppins' },
      { value: "'Inter', sans-serif", label: 'Inter' },
      { value: "'Montserrat', sans-serif", label: 'Montserrat' },
      { value: "'Outfit', sans-serif", label: 'Outfit' },
      { value: "'League Spartan', sans-serif", label: 'League Spartan' },
      { value: "'Oswald', sans-serif", label: 'Oswald' },
      { value: "'IBM Plex Sans', sans-serif", label: 'IBM Plex Sans' },
      { value: "'Space Grotesk', sans-serif", label: 'Space Grotesk' },
      { value: "'Playfair Display', serif", label: 'Playfair Display' },
      { value: "'Cormorant Garamond', serif", label: 'Cormorant Garamond' },
      { value: "'Bebas Neue', cursive", label: 'Bebas Neue' },
      { value: "'Fraunces', serif", label: 'Fraunces' },
      { value: "'Raleway', sans-serif", label: 'Raleway' },
      { value: "'Syne', sans-serif", label: 'Syne' },
      { value: "'Josefin Sans', sans-serif", label: 'Josefin Sans' }
    ]},
    { key: `${prefix}Size`, label: 'Tamanho', type: 'select', options: sizeOptions },
    { key: `${prefix}Weight`, label: 'Peso da Fonte', type: 'select', options: [
      { value: 'font-light', label: 'Fina' },
      { value: 'font-normal', label: 'Normal' },
      { value: 'font-medium', label: 'Média' },
      { value: 'font-bold', label: 'Negrito' },
      { value: 'font-black', label: 'Black' }
    ]},
    { key: `${prefix}Transform`, label: 'Transformação', type: 'select', options: [
      { value: 'uppercase', label: 'TUDO MAIÚSCULO' },
      { value: 'normal-case', label: 'Normal (abc)' },
      { value: 'capitalize', label: 'Primeiras Letras' }
    ]}
  ];
};

/**
 * BLOC DE PODER: Unifica Visibilidade + Conteúdo + Estilo em um único bloco.
 * Ideal para Títulos, Subtítulos e Descrições.
 */
export const commonElement = (id, label, options = {}) => {
  const { type = 'textarea', isBody = false, prefix = id.toLowerCase() } = options;
  const visibilityKey = `visibility.show${id}`;
  
  return [
    { 
      type: 'group', 
      label: label,
      fields: [
        { key: visibilityKey, label: `Habilitar ${label}`, type: 'toggle' },
        { key: prefix, label: `Conteúdo do ${label}`, type: type, condition: visibilityKey },
        ...commonTypographyFields(`style.${prefix}`, { isBody }).map(f => ({
          ...f,
          condition: visibilityKey
        }))
      ]
    }
  ];
};

/**
 * BLOC DE PODER (BADGE): Versão especializada para Badges com variantes visuais.
 */
export const commonBadge = (id, label, options = {}) => {
  const { prefix = 'badge' } = options;
  const visibilityKey = `visibility.show${id}`;
  
  return [
    { 
      type: 'group', 
      label: label,
      fields: [
        { key: visibilityKey, label: `Habilitar ${label}`, type: 'toggle' },
        { key: 'layout.badgeVariant', label: 'Design da Badge', type: 'select', condition: visibilityKey, options: [
          { value: 'capsule', label: 'Cápsula (Padrão)' },
          { value: 'lines', label: 'Entre Linhas' },
          { value: 'minimal', label: 'Minimalista (Ponto)' },
          { value: 'underline', label: 'Sublinhado' },
          { value: 'glass', label: 'Vidro Moderno' }
        ]},
        { key: prefix, label: `Texto da Badge`, type: 'text', condition: visibilityKey },
        ...commonTypographyFields(`style.${prefix}`, { isBadge: true }).map(f => ({
          ...f,
          condition: visibilityKey
        }))
      ]
    }
  ];
};

// Nota: Schemas específicos de categorias (Hero, Footer, etc.) agora moram
// diretamente em seus respectivos arquivos .jsx para manter a arquitetura 
// "Self-Contained" e evitar arquivos gigantes de configuração centralizada.
