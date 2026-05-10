// src/pages/Builder.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// Shared Props
import clientConfig from '../data/clientConfig.json';
import initialNiches from '../data/niches.json';
import { getPresets } from '../data/presets/presets-registry';

// Sub-components
import Sidebar from '../components/Builder/Sidebar';
import Preview from '../components/Builder/Preview';
import { 
  Input, Select, TextArea, ImageInput, Toggle, ColorPicker, 
  ArrayEditor, AlignEditor, RangeEditor, EliteModal, AccordionGroup 
} from '../components/Builder/ControlField';

export default function Builder() {
  const [presets, setPresets] = useState(getPresets());
  const [config, setConfig] = useState(() => { 
    const s = localStorage.getItem('nivix_builder_temp_config'); 
    return s ? JSON.parse(s) : clientConfig; 
  });
  const [tab, setTab] = useState('templates'); 
  const [selId, setSelId] = useState(null); 
  const [view, setView] = useState('desktop'); 
  const [tempName, setTempName] = useState(() => localStorage.getItem('nivix_active_template_name') || 'Customizado');
  const [activePresetId, setActivePresetId] = useState(() => localStorage.getItem('nivix_active_preset_id') || null);
  const [ikey, setIkey] = useState(0);
  const [niche, setNiche] = useState(() => localStorage.getItem('nivix_active_niche') || 'construction');
  const [niches] = useState(initialNiches);

  // --- MODALS STATE ---
  const [modal, setModal] = useState({ open: false, preset: null, name: '', id: null }); 
  const [saveModal, setSaveModal] = useState({ open: false, name: '', niche: 'construction', isEdit: false });
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', description: '', onConfirm: null, type: 'warning' });

  const loadPresets = useCallback(async () => {
    try {
      const res = await fetch('/api/list-presets');
      if (res.ok) {
        const data = await res.json();
        setPresets(data);
      }
    } catch (err) { console.error("Erro ao carregar presets:", err); }
  }, []);

  useEffect(() => { loadPresets(); }, [loadPresets]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'NAVIGATE_TAB') { setTab(event.data.tab); }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => { 
    localStorage.setItem('nivix_builder_temp_config', JSON.stringify(config)); 
    localStorage.setItem('nivix_active_template_name', tempName); 
    localStorage.setItem('nivix_active_preset_id', activePresetId || '');
    localStorage.setItem('nivix_active_niche', niche);
    window.dispatchEvent(new Event('storage')); 
  }, [config, tempName, activePresetId, niche]);

  const updateData = (id, path, val) => { 
    setConfig(p => ({ 
      ...p, 
      blocks: p.blocks.map(b => { 
        if (b.id !== id) return b; 
        const n = JSON.parse(JSON.stringify(b.data)); 
        const k = path.split('.'); 
        let c = n; 
        for (let i=0; i<k.length-1; i++) { 
          // Se o caminho não existe ou não é um objeto, força ser um objeto
          if (!c[k[i]] || typeof c[k[i]] !== 'object') c[k[i]]={}; 
          c=c[k[i]]; 
        } 
        c[k[k.length-1]]=val; 
        return { ...b, data: n }; 
      }) 
    })); 
  };

  const renderField = (b, field) => {
    const getNestedValue = (obj, path) => {
      if (!path) return undefined;
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const value = getNestedValue(b.data, field.key);
    const disabled = field.condition ? getNestedValue(b.data, field.condition) === false : false;
    if (disabled && !['text', 'textarea', 'image'].includes(field.type)) return null;
    
    const commonProps = { label: field.label, value, onChange: v => updateData(b.id, field.key, v), disabled };
    
    if (field.type === 'section') return <div key={field.label} className="pt-4 pb-1 border-b border-white/5 mb-2"><span className="text-[8px] font-black uppercase text-zinc-500 tracking-[0.2em]">{field.label}</span></div>;
    
    if (field.type === 'group') return (
      <AccordionGroup key={field.label} label={field.label}>
        {field.fields.map(subField => renderField(b, subField))}
      </AccordionGroup>
    );

    if (field.type === 'text') return <Input key={field.key} {...commonProps} />;
    if (field.type === 'textarea') return <TextArea key={field.key} {...commonProps} />;
    if (field.type === 'image') return <ImageInput key={field.key} {...commonProps} />;
    if (field.type === 'toggle') return <Toggle key={field.key} {...commonProps} value={value !== undefined ? value : field.default} />;
    if (field.type === 'color') return <ColorPicker key={field.key} {...commonProps} />;
    if (field.type === 'select') return <Select key={field.key} {...commonProps} value={value || field.options[0]?.value} options={field.options} />;
    if (field.type === 'array') return <ArrayEditor key={field.key} {...commonProps} items={value || []} itemFields={field.itemFields} />;
    if (field.type === 'align') return <AlignEditor key={field.key} {...commonProps} />;
    if (field.type === 'range') return <RangeEditor key={field.key} {...commonProps} min={field.min} max={field.max} step={field.step} defaultValue={field.default} />;
    return null;
  };

  const handleSavePreset = async () => {
    if (!saveModal.name) return alert('Dê um nome ao preset!');
    const id = saveModal.isEdit && activePresetId ? activePresetId : `preset-${saveModal.name.toLowerCase().replace(/\s+/g, '-')}`;
    const newConfig = { ...config, _niche: saveModal.niche, global: { ...config.global, brandName: saveModal.name } };
    try {
      const res = await fetch('/api/save-preset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, config: newConfig })
      });
      if (res.ok) {
        setSaveModal({ ...saveModal, open: false, name: '' });
        setActivePresetId(id);
        setTempName(saveModal.name);
        setConfig(newConfig);
        await loadPresets();
      }
    } catch { alert('Erro ao salvar'); }
  };

  const openSaveModal = () => {
    setSaveModal({
      open: true,
      name: activePresetId ? tempName : '',
      niche: niche,
      isEdit: !!activePresetId && activePresetId !== 'preset-blank'
    });
  };

  const askConfirmation = ({ title, description, onConfirm, type = 'warning' }) => {
    setConfirmModal({ open: true, title, description, onConfirm, type });
  };

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 overflow-hidden font-sans fixed inset-0 selection:bg-[#EAB308]/30 selection:text-[#EAB308]">
      
      {/* MODAL: CARREGAR PRESET */}
      <EliteModal 
        isOpen={modal.open} 
        title="Substituir Site?" 
        description={`O template "${modal.name}" substituirá seu trabalho atual.`} 
        onConfirm={() => { setConfig(modal.preset); setTempName(modal.name); setActivePresetId(modal.id); setIkey(k => k + 1); setModal({ open: false }); }} 
        onClose={() => setModal({ open: false })} 
      />
      
      {/* MODAL: SALVAR PRESET */}
      <EliteModal 
        isOpen={saveModal.open} 
        title={saveModal.isEdit ? "Atualizar Preset" : "Salvar Novo Preset"} 
        onConfirm={handleSavePreset} 
        onClose={() => setSaveModal({ ...saveModal, open: false })}
      >
        <div className="space-y-6 text-left">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Nome do Layout</label>
              <input value={saveModal.name} onChange={e => setSaveModal({...saveModal, name: e.target.value})} placeholder="Ex: Pizzaria Dark Mode" className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-[#EAB308]/50" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Categoria / Nicho</label>
              <div className="grid grid-cols-2 gap-2">
                 {niches.map(n => (
                   <button key={n.id} onClick={() => setSaveModal({...saveModal, niche: n.id})} className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${saveModal.niche === n.id ? 'bg-[#EAB308] border-[#EAB308] text-black' : 'bg-zinc-900 border-white/5 text-zinc-500'}`}>
                     {saveModal.niche === n.id && <Check size={12} />}
                     {n.label}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </EliteModal>

      {/* MODAL: CONFIRMAÇÃO GERAL (DELETE BLOCKS, ETC) */}
      <EliteModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        description={confirmModal.description}
        type={confirmModal.type}
        onConfirm={() => { confirmModal.onConfirm(); setConfirmModal({ ...confirmModal, open: false }); }}
        onClose={() => setConfirmModal({ ...confirmModal, open: false })}
      />

      <Sidebar 
        config={config} setConfig={setConfig} tab={tab} setTab={setTab} selId={selId} setSelId={setSelId} tempName={tempName} niche={niche} setNiche={setNiche} setModal={setModal} updateData={updateData} renderField={renderField} setIkey={setIkey}
        presets={presets} niches={niches}
        openSaveModal={openSaveModal}
        refreshPresets={loadPresets}
        askConfirmation={askConfirmation}
      />
      <Preview ikey={ikey} view={view} setView={setView} config={config} />
    </div>
  );
}
