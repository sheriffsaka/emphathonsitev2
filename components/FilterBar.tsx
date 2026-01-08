import React from 'react';
import { BuyerType } from '../types';

interface FilterBarProps {
  buyerType: BuyerType;
  setBuyerType: (type: BuyerType) => void;
  showPreOrder: boolean;
  setShowPreOrder: (show: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  buyerType, 
  setBuyerType,
  showPreOrder,
  setShowPreOrder
}) => {
  return (
    <div className="sticky top-[80px] z-30 mb-12">
      <div className="bg-emphathon-navy/80 backdrop-blur-xl border-y border-white/5 py-4 px-6 shadow-xl">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Left: Buyer Type Toggle */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <span className="text-xs text-slate-400 uppercase tracking-widest hidden md:block">Market:</span>
            <div className="bg-black/20 p-1 rounded-lg border border-white/5 flex relative">
              <button 
                onClick={() => setBuyerType('Corporate')}
                className={`relative z-10 px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  buyerType === 'Corporate' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Corporate Fleet
              </button>
              <button 
                 onClick={() => setBuyerType('Individual')}
                 className={`relative z-10 px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  buyerType === 'Individual' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Individual
              </button>
              
              {/* Sliding Background */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emphathon-rust rounded shadow-lg transition-transform duration-300 ease-out ${
                  buyerType === 'Individual' ? 'translate-x-[100%] translate-x-2' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>

          {/* Center: Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
            {/* Brand Dropdown */}
            <div className="relative group">
              <select className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-emphathon-rust transition-colors cursor-pointer min-w-[160px]">
                <option value="">All Brands</option>
                <option value="Rolls-Royce">Rolls-Royce</option>
                <option value="Bentley">Bentley</option>
                <option value="Porsche">Porsche</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Availability Dropdown */}
            <div className="relative group">
              <select className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-emphathon-rust transition-colors cursor-pointer min-w-[160px]">
                <option value="">Any Availability</option>
                <option value="Available">Available Now</option>
                <option value="Reserved">Reserved</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

             {/* Price Slider Placeholder */}
             <div className="hidden md:flex items-center gap-3 px-4 border-l border-white/10">
                <span className="text-xs text-slate-500 uppercase">Price</span>
                <div className="w-32 h-1 bg-white/10 rounded-full relative">
                  <div className="absolute left-0 w-1/2 h-full bg-emphathon-rust rounded-full"></div>
                  <div className="absolute left-1/2 w-3 h-3 bg-white rounded-full -top-1 shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
             </div>
          </div>

          {/* Right: Pre-Order Checkbox */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                showPreOrder ? 'bg-emphathon-rust border-emphathon-rust' : 'border-slate-600 bg-transparent group-hover:border-slate-400'
              }`}>
                {showPreOrder && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={showPreOrder}
                onChange={(e) => setShowPreOrder(e.target.checked)}
              />
              <span className={`text-sm select-none transition-colors ${showPreOrder ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                Pre-Order Eligible
              </span>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};