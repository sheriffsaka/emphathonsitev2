import React, { useState } from 'react';
import { Car } from '../types';
import { GlassCard } from './GlassCard';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const isPreOrder = car.status === 'Pre-Order';
  const [imgSrc, setImgSrc] = useState(car.image);

  return (
    <GlassCard className="group relative overflow-hidden !p-0 h-full flex flex-col" hoverEffect={true}>
      
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-empathon-navyLight">
        <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase ${
          isPreOrder ? 'bg-empathon-rust text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
        }`}>
          {car.status}
        </div>
        
        {/* Placeholder Gradient Overlay if Image Fails (or stylistic choice) */}
        <div className="absolute inset-0 bg-gradient-to-t from-empathon-navy to-transparent opacity-60 z-10" />
        
        <img 
          src={imgSrc} 
          alt={`${car.brand} ${car.model}`}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800')} // Reliable Fallback
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-transparent to-empathon-navy/50">
        
        <div className="mb-4">
          <p className="text-empathon-rust text-xs font-bold tracking-[0.2em] uppercase mb-1">{car.brand}</p>
          <h3 className="font-serif text-2xl text-white leading-tight group-hover:text-empathon-rustLight transition-colors">
            {car.model}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Mileage</span>
            <span className="text-sm text-slate-300 font-medium">{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/10 pl-2">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Trans</span>
            <span className="text-sm text-slate-300 font-medium truncate" title={car.transmission}>{car.transmission}</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/10 pl-2">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Fuel</span>
            <span className="text-sm text-slate-300 font-medium">{car.fuelType}</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xs text-slate-500 block mb-1">Estimated Price</span>
            <span className="font-serif text-xl md:text-2xl font-bold text-white">
              ${car.price.toLocaleString()}
            </span>
          </div>
          <button className="w-10 h-10 rounded-full border border-empathon-rust/50 text-empathon-rust flex items-center justify-center group-hover:bg-empathon-rust group-hover:text-white transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};