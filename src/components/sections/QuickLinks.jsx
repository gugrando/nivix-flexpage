// src/components/sections/QuickLinks.jsx
import { motion } from 'framer-motion';

export default function QuickLinks({ config }) {
  return (
    <div className="relative -mt-10 z-20 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900 p-6 rounded-2xl shadow-2xl border border-zinc-800">
        {config.sections.quickLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl font-bold transition-all
              ${link.highlight 
                ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
              }`}
          >
            <link.icon size={20} />
            {link.label}
          </motion.a>
        ))}
      </div>
    </div>
  );
}