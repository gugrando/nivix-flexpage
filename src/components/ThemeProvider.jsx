import { useEffect } from 'react';

export default function ThemeProvider({ theme, children }) {
  useEffect(() => {
    if (!theme || !theme.colors) return;

    const root = document.documentElement;
    const colors = theme.colors;

    // Mapeamento das cores do JSON para variáveis CSS
    const colorMap = {
      '--brand-primary': colors.primary || '#EAB308',
      '--brand-secondary': colors.secondary || '#CA8A04',
      '--brand-accent': colors.accent || '#FACC15',
      '--bg-main': colors.background || '#09090b',
      '--bg-surface': colors.surface || '#18181b',
      '--bg-elevated': colors.elevated || '#27272a',
    };

    Object.entries(colorMap).forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });
  }, [theme]);

  return children;
}