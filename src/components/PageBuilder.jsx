// src/components/PageBuilder.jsx
import Hero from './sections/Hero';
import MenuGrid from './sections/MenuGrid';
import LocationMap from './sections/LocationMap';
import BioLinks from './sections/QuickLinks';
import SocialProof from './sections/SocialProof';

// Mapeamento dos componentes disponíveis
const COMPONENT_MAP = {
  hero: Hero,
  menu: MenuGrid,
  location: LocationMap,
  links: BioLinks,
  reviews: SocialProof,
};

export default function PageBuilder({ config }) {
  return (
    <main className="w-full overflow-x-hidden bg-zinc-950 text-white">
      {config.sections.map((section, index) => {
        const Component = COMPONENT_MAP[section.type];
        
        if (!Component) {
          console.warn(`Componente tipo "${section.type}" não encontrado.`);
          return null;
        }

        return (
          <section key={section.id || index} id={section.id} className="relative">
             {/* Passamos todas as configurações (props) direto para o componente */}
            <Component {...section.props} />
          </section>
        );
      })}
    </main>
  );
}