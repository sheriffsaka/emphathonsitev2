import React from 'react';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const IndividualCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/40" id="private">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          
          {/* Background Image / Texture */}
          <div className="absolute inset-0 bg-emphathon-navyLight/50">
             <div className="absolute inset-0 bg-gradient-to-r from-emphathon-navy via-emphathon-navy/80 to-transparent z-10"></div>
              {/* Decorative stripes */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #C85A17 10px, #C85A17 11px)' }}></div>
          </div>

          <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-12 md:p-16 gap-12">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded border border-white/20 bg-white/5 text-xs text-white uppercase tracking-widest mb-4">
                Private Collection
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                Building Your Personal Legacy?
              </h2>
              <p className="text-slate-300 text-lg font-light">
                Our individual brokerage service connects you with rare, limited-run, and bespoke vehicles tailored to your exact specification.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button 
                variant={ComponentVariant.PRIMARY} 
                className="!text-lg !px-8 !py-4"
                onClick={() => document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Available Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};