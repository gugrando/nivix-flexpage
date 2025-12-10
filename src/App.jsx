// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Highlights from './components/sections/Highlights';
import About from './components/sections/About';
import Location from './components/sections/Location';  
import Footer from './components/Footer';

// IMPORTAÇÃO DO ARQUIVO MESTRE (A Mágica Acontece Aqui)
import { clientConfig } from './data/clientConfig';

function App() {
  return (
    <div className="bg-bg-main min-h-screen text-white font-sans selection:bg-brand-primary selection:text-black">
    
      <Navbar config={clientConfig} />
      <Hero data={clientConfig.sections.hero} />
      <Highlights data={clientConfig.sections.highlights} />
      <About data={clientConfig.sections.about} />
      <Location 
        data={clientConfig.sections.location} 
        globalSocials={clientConfig.social} // <--- PASSAR ISTO AQUI
     />  
     <Footer config={clientConfig} />
    </div>
  );
}

export default App;