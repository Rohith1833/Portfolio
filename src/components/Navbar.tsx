import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'About', href: '#/#about', id: 'about' },
    { label: 'Projects', href: '#/#projects', id: 'projects' },
    { label: 'Skills', href: '#/#skills', id: 'skills' },
    { label: 'Contact', href: '#/#contact', id: 'contact' }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find which section is closest to the top of the viewport
      const scrollPos = window.scrollY + 200;
      let current = '';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = item.id;
            break;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!PORTFOLIO_CONFIG.resumePath) {
      e.preventDefault();
      alert('The requested document is currently offline. Please reach out directly to rohithmohith78@gmail.com for a copy!');
    }
  };

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-full px-6 md:px-8 select-none transition-all duration-300 ${
      scrolled 
        ? 'top-2 bg-[#080808]/92 border border-white/10 shadow-2xl backdrop-blur-2xl py-1' 
        : 'top-4 bg-[#080808]/60 border border-white/5 backdrop-blur-xl py-2'
    }`}>
      <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12' : 'h-16'}`}>
        {/* Logo */}
        <a href="#/" className="flex items-center outline-none select-none transition-transform hover:scale-[1.02]">
          <img src="/logo.png" alt="Rohith Logo" className={`w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.08)] transition-all duration-300 ${scrolled ? 'h-8' : 'h-9'}`} />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`font-mono text-xs uppercase tracking-wider transition-colors relative py-2 ${
                  isActive ? 'text-fdf3f2 font-bold' : 'text-muted-grey hover:text-fdf3f2'
                }`}
              >
                {item.label}
                {/* Active Section Dot */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-red rounded-full transition-all duration-300 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
          <a
            href={PORTFOLIO_CONFIG.resumePath || '#'}
            onClick={handleResumeClick}
            download={PORTFOLIO_CONFIG.resumePath ? 'Rohith_Gowda_Resume.pdf' : undefined}
            className="font-mono text-xs uppercase tracking-wider text-fdf3f2 border border-primary-red/50 hover:border-primary-red hover:bg-primary-red/10 px-5 py-2 rounded-full transition-all flex items-center gap-1.5"
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-fdf3f2 hover:text-primary-red transition-colors outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer (Glass Dropdown Panel) */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full glass-nav rounded-3xl p-6 flex flex-col gap-4 animate-fade-in z-50">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-mono text-sm uppercase tracking-wider py-2 border-b border-white/5 transition-colors ${
                  isActive ? 'text-primary-red font-bold' : 'text-muted-grey hover:text-fdf3f2'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={PORTFOLIO_CONFIG.resumePath || '#'}
            onClick={(e) => {
              setIsOpen(false);
              handleResumeClick(e);
            }}
            download={PORTFOLIO_CONFIG.resumePath ? 'Rohith_Gowda_Resume.pdf' : undefined}
            className="font-mono text-sm uppercase tracking-wider text-center text-fdf3f2 border border-primary-red bg-primary-red/10 py-3 rounded-full transition-all mt-2"
          >
            Resume Download
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
