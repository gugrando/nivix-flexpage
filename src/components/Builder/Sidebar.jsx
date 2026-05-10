// src/components/Builder/Sidebar.jsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';

// Sub-components
import SidebarHeader from './Sidebar/SidebarHeader';
import SidebarTabs from './Sidebar/SidebarTabs';
import TabTemplates from './Sidebar/TabTemplates';
import TabStructure from './Sidebar/TabStructure';
import TabTheme from './Sidebar/TabTheme';
import SidebarFooter from './Sidebar/SidebarFooter';

export default function Sidebar({ 
  config, setConfig, tab, setTab, selId, setSelId, 
  tempName, niche, setNiche, setModal, resetToOriginal, 
  updateData, renderField, setIkey, presets, niches, 
  openSaveModal, refreshPresets, askConfirmation 
}) {
  return (
    <aside className="w-[380px] h-full border-r border-white/5 flex flex-col bg-zinc-950 z-[100] shadow-2xl shrink-0">
      <SidebarHeader 
        tempName={tempName} 
        resetToOriginal={resetToOriginal} 
      />
      
      <SidebarTabs 
        tab={tab} 
        setTab={setTab} 
      />

      <div className="flex-1 overflow-y-auto p-6 hide-scrollbar bg-zinc-950">
        <AnimatePresence mode="wait">
          {tab === 'templates' && (
            <TabTemplates 
              niche={niche} 
              setNiche={setNiche} 
              setModal={setModal} 
              presets={presets} 
              niches={niches}
              openSaveModal={openSaveModal}
              refreshPresets={refreshPresets}
            />
          )}

          {tab === 'blocks' && (
            <TabStructure 
              config={config} 
              setConfig={setConfig} 
              selId={selId} 
              setSelId={setSelId} 
              updateData={updateData} 
              renderField={renderField} 
              setIkey={setIkey}
              askConfirmation={askConfirmation}
            />
          )}

          {tab === 'theme' && (
            <TabTheme 
              config={config} 
              setConfig={setConfig} 
            />
          )}
        </AnimatePresence>
      </div>

      <SidebarFooter />
    </aside>
  );
}
