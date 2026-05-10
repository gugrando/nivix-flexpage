// src/components/builder/Controls/ImageInput.jsx
import React, { useState } from 'react';
import { Upload, Loader2, Trash2 } from 'lucide-react';
import FieldLabel from './FieldLabel';

export default function ImageInput({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const deleteOldAsset = async (oldUrl) => {
    if (oldUrl && typeof oldUrl === 'string' && oldUrl.startsWith('/uploads/')) {
      try {
        await fetch('/api/delete-asset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: oldUrl })
        });
      } catch (err) {
        console.error("[CMS] Falha ao deletar asset antigo:", err);
      }
    }
  };

  const handleManualChange = async (newVal) => {
    // Se o usuário está trocando ou limpando um asset que era local, limpamos o servidor
    if (value && value !== newVal) {
      await deleteOldAsset(value);
    }
    onChange(newVal);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fileName: `${Date.now()}-${file.name.replace(/\s+/g, '-')}`, 
            base64: reader.result 
          })
        });
        const d = await res.json();
        
        if (d.url) {
          // Limpa o antigo antes de aplicar o novo
          if (value) await deleteOldAsset(value);
          onChange(d.url);
        }
      } catch {
        alert('Upload falhou');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 group">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col gap-3">
        {/* PREVIEW DA IMAGEM SE EXISTIR */}
        {value && (
          <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/50 group-hover:border-white/10 transition-all">
            <img src={value} alt="Preview" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Preview Ativo</span>
            </div>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <div className="relative flex-1 min-w-0">
            <input 
              value={value || ''} 
              onChange={e => handleManualChange(e.target.value)} 
              placeholder="URL da imagem..." 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl p-3 text-[10px] focus:border-[#EAB308]/50 outline-none text-zinc-100 transition-all group-hover:border-white/10" 
            />
          </div>
          
          <div className="flex gap-1.5 shrink-0">
            {value && (
              <button 
                onClick={() => handleManualChange('')}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="Remover Imagem"
              >
                <Trash2 size={16} />
              </button>
            )}

            <label className={`w-10 h-10 flex items-center justify-center rounded-xl border border-white/5 cursor-pointer transition-all ${uploading ? 'animate-pulse bg-zinc-800' : 'bg-zinc-900/80 hover:bg-[#EAB308] hover:text-black group-hover:border-white/10'}`}>
              {uploading ? <Loader2 className="animate-spin text-zinc-500" size={16}/> : <Upload size={16}/>}
              <input type="file" className="hidden" accept="image/*" onChange={handleFile} disabled={uploading}/>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
