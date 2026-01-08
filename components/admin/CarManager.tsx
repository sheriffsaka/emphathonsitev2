
import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

export const CarManager: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    min_price: '',
    max_price: '',
    condition: '',
    preorder: false
  });

  const fetchCars = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.min_price) queryParams.append('min_price', filters.min_price);
    if (filters.max_price) queryParams.append('max_price', filters.max_price);
    if (filters.condition) queryParams.append('condition', filters.condition);
    if (filters.preorder) queryParams.append('preorder', 'true');

    const res = await api.get(`/cars?${queryParams.toString()}`);
    if (res.success) {
      setCars(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      await api.delete(`/cars/${id}`);
      fetchCars();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Filters Panel */}
      <div className="w-full lg:w-64 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit shrink-0">
        <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-emphathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Brand</label>
            <select 
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emphathon-rust outline-none"
            >
              <option value="">All Brands</option>
              <option value="Rolls-Royce">Rolls-Royce</option>
              <option value="Bentley">Bentley</option>
              <option value="Mercedes-Maybach">Mercedes-Maybach</option>
              <option value="Porsche">Porsche</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Condition</label>
            <select 
              value={filters.condition}
              onChange={(e) => setFilters({...filters, condition: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emphathon-rust outline-none"
            >
              <option value="">Any</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">CPO</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emphathon-rust outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Pre-Order">Pre-Order</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <div>
                <label className="text-[10px] text-slate-500 uppercase block mb-1">Min Price</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={filters.min_price}
                  onChange={(e) => setFilters({...filters, min_price: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-sm text-white"
                />
             </div>
             <div>
                <label className="text-[10px] text-slate-500 uppercase block mb-1">Max Price</label>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={filters.max_price}
                  onChange={(e) => setFilters({...filters, max_price: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-2 text-sm text-white"
                />
             </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.preorder}
                onChange={(e) => setFilters({...filters, preorder: e.target.checked})}
                className="rounded border-white/20 bg-black/20 text-emphathon-rust focus:ring-emphathon-rust"
              />
              <span className="text-sm text-slate-300">Pre-Order Eligible Only</span>
            </label>
          </div>

          <Button 
            variant={ComponentVariant.SECONDARY}
            className="w-full !py-2 !text-xs mt-4"
            onClick={() => setFilters({brand: '', status: '', min_price: '', max_price: '', condition: '', preorder: false})}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-white">Vehicle Inventory</h2>
          <Button variant={ComponentVariant.PRIMARY} className="!py-2 !px-4 !text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Vehicle
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0F1A36] z-10">
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading fleet data...</td></tr>
              ) : cars.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No vehicles found.</td></tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="w-16 h-10 rounded overflow-hidden bg-white/5">
                         <img src={car.image_url} alt={car.model} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{car.brand} {car.model}</div>
                      <div className="text-xs text-slate-500">{car.year} • {car.condition || 'Used'} • {car.mileage} mi</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono">
                      ${Number(car.price).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                        car.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                        car.status === 'Reserved' ? 'bg-red-500/10 text-red-500' :
                        'bg-emphathon-rust/10 text-emphathon-rust'
                      }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(car.id)}
                            className="p-1.5 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
