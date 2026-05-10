// src/components/library/registry.js

/**
 * AUTO-DISCOVERY MOTOR (PLUG-AND-PLAY) v2.0
 * -----------------------------------
 * O Vite varre a pasta ./library/ e importa todos os componentes .jsx
 * que exportam o objeto 'metadata' e o objeto 'schema'.
 */
const modules = import.meta.glob('./**/*.jsx', { eager: true });

export const BLOCK_LIBRARY = {};

for (const path in modules) {
  const module = modules[path];
  
  if (module.default && module.metadata) {
    const { type, variant, label, defaultData } = module.metadata;
    const schema = module.schema || [];

    // Normaliza o tipo (ex: 'Header' vira 'header')
    const normalizedType = type.toLowerCase();

    if (!BLOCK_LIBRARY[normalizedType]) {
      BLOCK_LIBRARY[normalizedType] = { default: variant }; 
    }

    BLOCK_LIBRARY[normalizedType][variant] = {
      component: module.default,
      label: label,
      schema: schema,
      defaultData: defaultData || {}
    };
  }
}

export const GLOBAL_LIBRARY = {};
