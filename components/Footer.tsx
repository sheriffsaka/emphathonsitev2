import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/40 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             {/* Logo Lockup */}
             <div 
               className="flex items-center gap-3 mb-6 cursor-pointer group w-fit"
               onClick={scrollToTop}
             >
                <div className="w-10 h-10 relative flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M20 30 L50 80 L80 30 L65 15 L50 40 L35 15 Z" 
                        stroke="#C85A17" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                      <circle cx="35" cy="25" r="5" fill="white" className="opacity-80" />
                      <circle cx="65" cy="25" r="5" fill="white" className="opacity-80" />
                   </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xl font-bold tracking-wider text-white leading-none group-hover:text-empathon-rust transition-colors">
                    EMPATHON
                  </span>
                  <span className="font-sans text-[0.6rem] font-bold tracking-[0.2em] text-slate-500 mt-1 uppercase">
                    Global Services
                  </span>
                </div>
            </div>
            
            <p className="text-slate-400 font-light max-w-md">
              Redefining the acquisition of luxury mobility. Corporate fleets and private collections managed with unparalleled precision.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#corporate" className="hover:text-empathon-rust transition-colors">Corporate Fleet</a></li>
              <li><a href="#private" className="hover:text-empathon-rust transition-colors">Private Brokerage</a></li>
              <li><a href="#corporate" className="hover:text-empathon-rust transition-colors">Import/Export</a></li>
              <li><a href="#concierge" className="hover:text-empathon-rust transition-colors">Maintenance Concierge</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
             <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#contact" className="hover:text-empathon-rust transition-colors">Contact Support</a></li>
              <li><a href="#contact" className="hover:text-empathon-rust transition-colors">Showroom Locations</a></li>
              <li><a href="#concierge" className="hover:text-empathon-rust transition-colors">Client Portal</a></li>
              <li><a href="#admin" className="text-empathon-rust hover:text-white transition-colors font-medium">Admin Portal</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-xs text-slate-600">© 2024 Empathon Global Services. All rights reserved.</p>
            <a 
              href="https://cloudcraves.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-slate-600 hover:text-empathon-rust transition-colors"
            >
              Site By: CloudCraves
            </a>
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};