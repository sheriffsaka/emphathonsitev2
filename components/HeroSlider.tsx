import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      setIsTransitioning(false);
    }, 500); // Half of the transition time to switch content
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-emphathon-navy">
      {/* Background Layer - In a real app, these would be Image or Video tags */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: slide.image,
            // Fallback for visual noise texture
            backgroundImage: `${slide.image}, url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
          }}
        />
      ))}

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-emphathon-navy via-emphathon-navy/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-emphathon-navy/80 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative h-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className={`max-w-3xl transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-emphathon-rust"></span>
            <span className="text-emphathon-rust font-bold tracking-[0.3em] uppercase text-xs">
              0{currentIndex + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
            {activeSlide.title}
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-slate-300 font-light mb-10 max-w-xl leading-relaxed">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant={ComponentVariant.PRIMARY}>
              {activeSlide.ctaPrimary}
            </Button>
            <Button variant={ComponentVariant.GLASS}>
              {activeSlide.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 flex gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-emphathon-rust hover:border-emphathon-rust transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-emphathon-rust hover:border-emphathon-rust transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div 
          className="h-full bg-emphathon-rust transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / HERO_SLIDES.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};