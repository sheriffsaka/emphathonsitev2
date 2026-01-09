import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glass background intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-empathon-navy/80 backdrop-blur-xl py-3 shadow-lg shadow-black/20' 
            : 'bg-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Official Logo Lockup */}
          <div 
            className="flex items-center gap-3 cursor-pointer z-50 relative group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Geometric Heart/Shield Outline - Rust */}
                  <path 
                    d="M20 30 L50 80 L80 30 L65 15 L50 40 L35 15 Z" 
                    stroke="#C85A17" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="drop-shadow-[0_0_10px_rgba(200,90,23,0.3)]"
                  />
                  {/* Dots - Adapted to White for Dark Background visibility */}
                  <circle cx="35" cy="25" r="5" fill="white" />
                  <circle cx="65" cy="25" r="5" fill="white" />
               </svg>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="font-sans text-xl md:text-2xl font-bold tracking-wider text-white leading-none">
                EMPATHON
              </span>
              <span className="font-sans text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] text-slate-400 mt-1 uppercase">
                Global Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative group text-sm font-medium tracking-widest uppercase text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-empathon-rust transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant={ComponentVariant.GLASS} className="!py-2 !px-6 !text-xs !tracking-widest">
              Client Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-6'}`}></span>
             </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-empathon-navy/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
          {NAV_ITEMS.map((item, idx) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-serif text-white hover:text-empathon-rust transition-colors transform translate-y-0"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-8">
            <Button variant={ComponentVariant.PRIMARY} onClick={() => setIsMobileMenuOpen(false)}>
              Access Portal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};