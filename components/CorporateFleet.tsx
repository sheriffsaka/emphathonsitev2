import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const CorporateFleet: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="corporate">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emphathon-rust/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Pitch & CTA */}
          <GlassCard className="flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-20">
               {/* Abstract geometric shape */}
               <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor" className="text-emphathon-rust">
                 <path d="M100 0L200 100L100 200L0 100Z" />
               </svg>
            </div>

            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-emphathon-rust text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                  For Enterprise Clients
                </span>
                <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  Corporate Fleet <br /> & Bulk Orders
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  Secure your competitive edge with Emphathon’s priority allocation program. We manage the entire lifecycle of your executive fleet, from acquisition to rotation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant={ComponentVariant.PRIMARY} 
                  className="group/btn relative overflow-hidden"
                  icon={
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Fleet Pre-Order Request
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none" />
                </Button>
                
                <Button variant={ComponentVariant.GLASS}>
                  Download Brochure
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Right Column: Benefits Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Benefit 1 */}
            <GlassCard className="group hover:bg-white/10 transition-colors" hoverEffect={true}>
              <div className="w-12 h-12 rounded-xl bg-emphathon-rust/10 border border-emphathon-rust/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emphathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Global Logistics</h3>
              <p className="text-sm text-slate-400">Customized import/export solutions handling customs, taxes, and delivery to any global HQ.</p>
            </GlassCard>

            {/* Benefit 2 */}
            <GlassCard className="group hover:bg-white/10 transition-colors" hoverEffect={true}>
              <div className="w-12 h-12 rounded-xl bg-emphathon-rust/10 border border-emphathon-rust/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emphathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Verified Pricing</h3>
              <p className="text-sm text-slate-400">Transparent corporate tier pricing with pre-negotiated fleet discounts and incentives.</p>
            </GlassCard>

            {/* Benefit 3 */}
            <GlassCard className="group hover:bg-white/10 transition-colors" hoverEffect={true}>
              <div className="w-12 h-12 rounded-xl bg-emphathon-rust/10 border border-emphathon-rust/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emphathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Priority Import</h3>
              <p className="text-sm text-slate-400">Skip the waitlist. Corporate partners receive first-allocation rights on new models.</p>
            </GlassCard>

             {/* Benefit 4 */}
             <GlassCard className="group hover:bg-white/10 transition-colors" hoverEffect={true}>
              <div className="w-12 h-12 rounded-xl bg-emphathon-rust/10 border border-emphathon-rust/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emphathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Dedicated Manager</h3>
              <p className="text-sm text-slate-400">A single point of contact available 24/7 to manage your fleet's needs and maintenance.</p>
            </GlassCard>

          </div>
        </div>
      </div>
    </section>
  );
};