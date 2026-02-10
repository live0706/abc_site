
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Le Club', href: '#club' },
    { name: 'Programmes', href: '#programs' },
    { name: 'Coach', href: '#coach' },
    { name: 'Santé', href: '#health' },
    { name: 'Infos', href: '#info' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // On laisse le comportement par défaut de l'ancre car scroll-padding-top et scroll-behavior: smooth sont définis dans l'HTML
    // On ferme juste le menu mobile
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12 bg-orange-600 rounded-full flex items-center justify-center border-2 border-orange-500 shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic">ABC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-orange-600 font-bold text-lg leading-none tracking-tight">ACADEMY</span>
              <span className="text-gray-800 font-bold text-sm tracking-widest">BASKET CLUB</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-700 hover:text-orange-600 font-bold text-sm uppercase tracking-wider transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#registration" 
              onClick={(e) => handleLinkClick(e, '#registration')}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 active:scale-95 transform"
            >
              Rejoignez-nous
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 focus:outline-none p-2"
              aria-label="Menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: scrolled ? '64px' : '80px' }}>
        <div className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-black text-gray-900 uppercase tracking-tighter border-b border-gray-100 pb-2"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#registration" 
            onClick={(e) => handleLinkClick(e, '#registration')}
            className="bg-orange-600 text-white text-center px-6 py-4 rounded-2xl font-black text-xl uppercase"
          >
            Rejoignez-nous
          </a>
          
          <div className="pt-10 text-center">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">ABC ACADEMY BASKET CLUB</p>
            <p className="text-orange-600 font-bold mt-2 text-xl">77 644 51 72</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
