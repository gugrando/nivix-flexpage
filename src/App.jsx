// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DynamicRenderer from './components/DynamicRenderer';
import Builder from './pages/Builder';
import ThemeProvider from './components/ThemeProvider';

// IMPORTAÇÃO DO NOVO JSON
import clientConfigDefault from './data/clientConfig.json';

import { GLOBAL_LIBRARY } from './components/library/registry';

// Componente para a visão real do site (compartilhado entre / e /preview)
const SiteView = ({ config, isPreview }) => {
  useEffect(() => {
    if (isPreview) {
      document.documentElement.classList.add('hide-scrollbar');
      document.body.classList.add('hide-scrollbar');
    } else {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
    }
  }, [isPreview]);

  if (!config) return <div className="p-10 text-center text-gray-500">Carregando configuração...</div>;

  const theme = config.theme || { colors: {} };
  const blocks = config.blocks || [];
  const global = config.global || { socials: [], brandName: "" };

  return (
    <ThemeProvider theme={theme}>
      <div className={`bg-bg-main min-h-screen text-white font-sans selection:bg-brand-primary selection:text-black`}>
        <DynamicRenderer 
          blocks={blocks} 
          globalSocials={global.socials} 
        />
      </div>
    </ThemeProvider>
  );
};

// Rota de Preview Dinâmico para o Builder
const DynamicPreview = () => {
  const [config, setConfig] = useState(clientConfigDefault);

  useEffect(() => {
    // 1. Ouvinte para mensagens diretas (Padrão mais rápido e sem piscar)
    const handleMessage = (event) => {
      if (event.data.type === 'SYNC_CONFIG' && event.data.config) {
        setConfig(event.data.config);
      }
    };

    // 2. Fallback para storage (Aba presets/troca de variante)
    const handleStorage = () => {
      const saved = localStorage.getItem('nivix_builder_temp_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.blocks) setConfig(parsed);
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorage);
    
    // Sincronia inicial
    handleStorage();

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return <SiteView config={config} isPreview={true} />;
};

function App() {
  const [activeConfig, setActiveConfig] = useState(clientConfigDefault);

  useEffect(() => {
    const syncConfig = () => {
      const saved = localStorage.getItem('nivix_builder_temp_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.blocks) setActiveConfig(parsed);
      }
    };

    syncConfig();
    window.addEventListener('storage', syncConfig);
    const interval = setInterval(syncConfig, 2000); // Sincronia global mais lenta no main site
    return () => {
      window.removeEventListener('storage', syncConfig);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* ROTA DO SITE (VISÃO DO CLIENTE) */}
        <Route path="/" element={<SiteView config={activeConfig} isPreview={false} />} />

        {/* ROTA DE PREVIEW (USADA PELO BUILDER NO IFRAME) */}
        <Route path="/preview" element={<DynamicPreview />} />

        {/* ROTA DO BUILDER */}
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Router>
  );
}

export default App;