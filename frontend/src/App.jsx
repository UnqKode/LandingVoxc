import { useEffect, useState } from 'react';
import Nav from './Component/Nav';
import Hero from './Component/Hero';
import Info from './Component/Info';
import Loader from './Component/Loader';
import Contact from './Component/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderExiting(true);
      setTimeout(() => setLoading(false), 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden transition-opacity duration-500 ${
          isLoaderExiting ? 'animate-zoom-out' : ''
        }`}
        style={{ pointerEvents: 'none' }}
      >
        <div className="flex items-center gap-4">
          <Loader />
          <span className="text-white text-xl font-orbitron animate-pulse tracking-widest">
            Initializing AI Assistant...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black overflow-hidden">
      <Nav scrolled={scrolled} />
      <Hero />
      <Info />
      <Contact />
    </div>
  );
}

export default App;
