
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { HERO_SLIDES } from '../constants';
import { Button } from './Button';
import { ComponentVariant, HeroSlide } from '../types';

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Safely determine which slides to render to prevent "0" counts
  const displaySlides = slides.length > 0 ? slides : HERO_SLIDES;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_media')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const mappedSlides: HeroSlide[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            image: item.image_url,
            ctaPrimary: item.cta_primary_text || 'Learn More',
            ctaSecondary: item.cta_secondary_text || 'Contact Us'
          }));
          setSlides(mappedSlides);
        } else {
          setSlides(HERO_SLIDES);
        }
      } catch (err) {
        console.error('Error fetching hero slides:', err);
        setSlides(HERO_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-advance
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  if (isLoading) {
    return <div className="h-screen w-full bg-empathon-navy flex items-center justify-center text-white">Loading...</div>;
  }

  const activeSlide = displaySlides[currentIndex] || HERO_SLIDES[0];
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="relative h-screen w-full overflow-hidden bg-empathon-navy">
      {/* Background Layer */}
      {displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-empathon-navy via-empathon-navy/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-empathon-navy/80 via-transparent to-transparent pointer-events-none" />

      {/* Content Container - Added z-10 to ensure it sits above backgrounds */}
      <div className="relative z-10 h-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className={`max-w-3xl transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-empathon-rust"></span>
            <span className="text-empathon-rust font-bold tracking-[0.3em] uppercase text-xs drop-shadow-md">
              {formatNumber(currentIndex + 1)} / {formatNumber(displaySlides.length)}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg">
            {activeSlide.title}
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-slate-300 font-light mb-10 max-w-xl leading-relaxed drop-shadow-md">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant={ComponentVariant.PRIMARY} onClick={() => document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' })}>
              {activeSlide.ctaPrimary}
            </Button>
            <Button variant={ComponentVariant.GLASS} onClick={() => document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' })}>
              {activeSlide.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 flex gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-empathon-rust hover:border-empathon-rust transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-empathon-rust hover:border-empathon-rust transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-20">
        <div 
          className="h-full bg-empathon-rust transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / displaySlides.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};
