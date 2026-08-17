import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#/#about' },
    { label: 'Projects', href: '#/#projects' },
    { label: 'Skills', href: '#/#skills' },
    { label: 'Contact', href: '#/#contact' }
  ];

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!PORTFOLIO_CONFIG.resumePath) {
      e.preventDefault();
      alert('The requested document is currently offline. Please reach out directly to rohithmohith78@gmail.com for a copy!');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-near-black/85 backdrop-blur-md border-b border-border-subtle select-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#/" className="flex items-center outline-none select-none transition-transform hover:scale-[1.02]">
          <img src="/logo.png" alt="Rohith Logo" className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-muted-grey hover:text-fdf3f2 transition-colors relative py-2 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href={PORTFOLIO_CONFIG.resumePath || '#'}
            onClick={handleResumeClick}
            download={PORTFOLIO_CONFIG.resumePath ? 'Rohith_Gowda_Resume.pdf' : undefined}
            className="font-mono text-xs uppercase tracking-wider text-fdf3f2 border border-primary-red/50 hover:border-primary-red hover:bg-primary-red/10 px-4 py-2 rounded-none transition-all flex items-center gap-1.5"
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-fdf3f2 hover:text-primary-red transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-near-black border-b border-border-subtle py-6 px-6 flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-mono text-sm uppercase tracking-wider text-muted-grey hover:text-fdf3f2 py-2 border-b border-border-subtle/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PORTFOLIO_CONFIG.resumePath || '#'}
            onClick={(e) => {
              setIsOpen(false);
              handleResumeClick(e);
            }}
            download={PORTFOLIO_CONFIG.resumePath ? 'Rohith_Gowda_Resume.pdf' : undefined}
            className="font-mono text-sm uppercase tracking-wider text-center text-fdf3f2 border border-primary-red bg-primary-red/10 py-3 rounded-none transition-all mt-2"
          >
            Resume Download
          </a>
        </div>
      )}
    </nav>
  );
};
