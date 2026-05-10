// src/data/presets/presets-registry.js

/**
 * AUTO-DISCOVERY MOTOR PARA PRESETS
 * --------------------------------
 * Este arquivo varre a pasta ./ e importa todos os JSONs de presets.
 */

const rawPresets = import.meta.glob('./*.json', { eager: true });

export const getPresets = () => {
  const presets = {};
  
  Object.entries(rawPresets).forEach(([path, module]) => {
    // Extrai o nome do arquivo (ex: ./preset-modern.json -> presetModern)
    const fileName = path.split('/').pop().replace('.json', '');
    const key = fileName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    // O conteúdo do JSON está em module.default
    presets[key] = JSON.parse(JSON.stringify(module.default));
    
    // Garante que metadados estejam presentes
    if (presets[key]) {
      presets[key]._fileId = fileName;
      // Se não tiver nicho no JSON, tenta inferir ou deixa em branco
      if (!presets[key]._niche) {
        presets[key]._niche = fileName.includes('pizza') || fileName.includes('restaurant') || fileName.includes('gastronomy') ? 'gastronomy' : 'construction';
      }
    }
  });

  return presets;
};
