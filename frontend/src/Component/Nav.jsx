import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-orbitron transition-all duration-500 ease-in-out
        ${scrolled || menuOpen ? "bg-black/80 backdrop-blur-md shadow-xl" : "bg-transparent"}
      `}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Zap className="text-blue-400" size={32} strokeWidth={2.5} />
          <span className="text-2xl font-bold text-white tracking-wider">
            Voxe
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-white text-sm leading-tight text-right">
            <p className="font-semibold text-base">Subscribe Early</p>
            <p className="text-white/70">Get extra AI prompts daily</p>
          </div>
          <button
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="
              bg-gradient-to-r from-blue-900 to-green-600 text-white 
              px-4 py-2 rounded-full 
              hover:from-blue-800 hover:to-green-500 
              transition-all duration-300
              font-medium tracking-wide
            "
          >
            Notify
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pt-2 pb-4 bg-black/90 backdrop-blur-md flex flex-col items-center space-y-4">
          <div className="text-white text-center text-sm">
            <p className="font-semibold text-base">Subscribe Early</p>
            <p className="text-white/70">Get extra AI prompts daily</p>
          </div>
          <button
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
              setMenuOpen(false); // Close the menu after scrolling
            }}
            className="
              bg-gradient-to-r from-blue-900 to-green-600 text-white 
              px-4 py-2 rounded-full 
              hover:from-blue-800 hover:to-green-500 
              transition-all duration-300
              font-medium tracking-wide
            "
          >
            Notify
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
