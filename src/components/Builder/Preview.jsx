// src/components/Builder/Preview.jsx
import React, { useRef, useEffect } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

export default function Preview({ ikey, view, setView, config }) {
  const iframeRef = useRef(null);

  // Sincronia Real-time via postMessage (Zero Piscar)
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'SYNC_CONFIG',
        config
      }, '*');
    }
  }, [config]);

  return (
    <main className="flex-1 h-screen flex flex-col bg-[#050505] relative overflow-hidden">
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-xl z-[90] shrink-0">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_10px_#EAB308]" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Preview Engine</span>
        </div>

        <div className="flex bg-zinc-900/80 p-1 rounded-2xl border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('desktop')} 
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${view === 'desktop' ? 'bg-[#EAB308] text-black shadow-lg shadow-[#EAB308]/20 font-black' : 'text-zinc-500 hover:text-zinc-300 font-bold'}`}
          >
            <Monitor size={16} />
            <span className="text-[9px] uppercase tracking-[0.15em]">Desktop</span>
          </button>
          <button 
            onClick={() => setView('mobile')} 
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${view === 'mobile' ? 'bg-[#EAB308] text-black shadow-lg shadow-[#EAB308]/20 font-black' : 'text-zinc-500 hover:text-zinc-300 font-bold'}`}
          >
            <Smartphone size={16} />
            <span className="text-[9px] uppercase tracking-[0.15em]">Mobile</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Sincronizado</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6 md:p-12 flex justify-center items-center bg-dots-pattern scroll-smooth relative">
        <div 
          className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] relative ${
            view === 'mobile' 
              ? 'w-[420px] aspect-[9/20] max-h-[96%] rounded-[3.5rem] border-[12px] border-zinc-900 bg-zinc-900 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] ring-[1px] ring-white/10' 
              : 'w-full h-full border border-white/10 rounded-[2rem] bg-zinc-950 overflow-hidden shadow-2xl'
          }`}
        >
          {view === 'mobile' && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-950 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-900 border border-white/5" />
                <div className="w-10 h-1 bg-zinc-900 rounded-full" />
             </div>
          )}

          <div className={`absolute inset-0 w-full h-full bg-zinc-950 overflow-hidden ${view === 'mobile' ? 'rounded-[2.8rem]' : 'rounded-none'}`}>
            <iframe 
              ref={iframeRef}
              key={ikey} 
              src="/preview" 
              className="w-full h-full border-none" 
              title="PreviewContent" 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
