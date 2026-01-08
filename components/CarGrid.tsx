import React, { useState, useMemo } from 'react';
import { MOCK_CARS } from '../constants';
import { CarCard } from './CarCard';
import { FilterBar } from './FilterBar';
import { BuyerType } from '../types';

export const CarGrid: React.FC = () => {
  const [buyerType, setBuyerType] = useState<BuyerType>('Corporate');
  const [showPreOrder, setShowPreOrder] = useState(false);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      // 1. Filter by Buyer Type
      const matchesBuyerType = car.buyerType.includes(buyerType);
      
      // 2. Filter by Pre-Order (if checked, only show pre-order; if not, show all or standard logic)
      // For this demo, if "Pre-Order Eligible" is checked, we ONLY show Pre-Order status cars.
      // If unchecked, we show everything.
      const matchesPreOrder = showPreOrder ? car.status === 'Pre-Order' : true;

      return matchesBuyerType && matchesPreOrder;
    });
  }, [buyerType, showPreOrder]);

  return (
    <section className="relative z-20 pb-24" id="showroom">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-12 pt-24">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Current Inventory</h2>
        <p className="text-slate-400 max-w-2xl font-light text-lg">
          Explore our curated selection of vehicles available for immediate acquisition or future allocation.
        </p>
      </div>

      <FilterBar 
        buyerType={buyerType} 
        setBuyerType={setBuyerType}
        showPreOrder={showPreOrder}
        setShowPreOrder={setShowPreOrder}
      />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-slate-400 text-lg">No vehicles found matching your criteria.</p>
            <button 
              onClick={() => {setShowPreOrder(false); setBuyerType('Corporate')}}
              className="mt-4 text-emphathon-rust hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};