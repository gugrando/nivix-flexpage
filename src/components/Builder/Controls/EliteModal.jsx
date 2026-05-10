// src/components/Builder/Controls/EliteModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function EliteModal({ 
  isOpen, 
  title, 
  description, 
  onConfirm, 
  onClose, 
  children,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  type = "warning" // warning, info, success, danger
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-3xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 rounded-full ${
              type === 'danger' ? 'bg-red-500' : 'bg-[#EAB308]'
            }`} />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8 border ${
                type === 'danger' 
                  ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                  : 'bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/20'
              }`}>
                <AlertTriangle size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-black mb-3 text-white tracking-tight leading-tight">{title}</h3>
              {description && <p className="text-zinc-500 text-sm mb-8 font-medium leading-relaxed">{description}</p>}
              
              {children}

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={onClose} 
                  className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold transition-all border border-white/5"
                >
                  {cancelLabel}
                </button>
                <button 
                  onClick={onConfirm} 
                  className={`flex-1 py-4 rounded-2xl font-black transition-all shadow-lg ${
                    type === 'danger'
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                      : 'bg-[#EAB308] hover:bg-[#FACC15] text-black shadow-[#EAB308]/20'
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
