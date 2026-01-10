
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

export const CarManager: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    min_price: '',
    max_price: '',
    condition: '',
    preorder: false
  });

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Mercedes-Benz',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    status: 'Available',
    condition: 'Used',
    buyer_type: ['Individual'], // Default selection
    image_url: ''
  });

  const fetchCars = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.brand) query = query.eq('brand', filters.brand);
      if (filters.status) query = query.eq('status', filters.status);
      if (filters.condition) query = query.eq('condition', filters.condition);
      if (filters.min_price) query = query.gte('price', filters.min_price);
      if (filters.max_price) query = query.lte('price', filters.max_price);
      if (filters.preorder) query = query.eq('status', 'Pre-Order');

      const { data, error } = await query;
      
      if (error) throw error;
      setCars(data || []);
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters, isCreating]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) {
        alert('Error deleting vehicle');
        console.error(error);
      } else {
        fetchCars();
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      buyer_type: formData.buyer_type
    };

    const { error } = await supabase.from('cars').insert([payload]);

    if (error) {
      console.error('Error creating car:', error);
      alert('Failed to add vehicle. Please check the console for details.');
    } else {
      setIsCreating(false);
      setFormData({
        brand: 'Mercedes-Benz',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        status: 'Available',
        condition: 'Used',
        buyer_type: ['Individual'],
        image_url: ''
      });
      fetchCars();
    }
    setLoading(false);
  };

  const toggleBuyerType = (type: string) => {
    const currentTypes = formData.buyer_type;
    if (currentTypes.includes(type)) {
      setFormData({ ...formData, buyer_type: currentTypes.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, buyer_type: [...currentTypes, type] });
    }
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empathon-rust transition-colors";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      
      {isCreating ? (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
             <h2 className="text-2xl font-serif text-white">Add New Vehicle</h2>
             <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
          </div>

          <form onSubmit={handleCreate} className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Brand</label>
                <select 
                  className={inputClass}
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                >
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Rolls-Royce">Rolls-Royce</option>
                  <option value="Bentley">Bentley</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Aston Martin">Aston Martin</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Model</label>
                <input required type="text" className={inputClass} placeholder="e.g. GLE 350" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input required type="number" className={inputClass} value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} />
              </div>
              <div>
                <label className={labelClass}>Condition</label>
                 <select 
                  className={inputClass}
                  value={formData.condition}
                  onChange={e => setFormData({...formData, condition: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className={labelClass}>Price (₦)</label>
                  <input required type="number" className={inputClass} placeholder="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               </div>
               <div>
                  <label className={labelClass}>Mileage</label>
                  <input required type="number" className={inputClass} placeholder="0" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} />
               </div>
               <div>
                  <label className={labelClass}>Status</label>
                  <select className={inputClass} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                     <option value="Available">Available</option>
                     <option value="Reserved">Reserved</option>
                     <option value="Pre-Order">Pre-Order</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Transmission</label>
                <select className={inputClass} value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})}>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="PDK">PDK</option>
                  <option value="E-Drive">E-Drive</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuel Type</label>
                <select className={inputClass} value={formData.fuel_type} onChange={e => setFormData({...formData, fuel_type: e.target.value})}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div>
               <label className={labelClass}>Image URL</label>
               <input required type="text" className={inputClass} placeholder="https://images.unsplash.com/..." value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
               {formData.image_url && (
                 <div className="mt-4 h-48 w-full bg-black/40 rounded-lg overflow-hidden border border-white/5">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain" />
                 </div>
               )}
            </div>

            <div>
              <label className={labelClass}>Target Market</label>
              <div className="flex gap-4 mt-2">
                 <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-empathon-rust/50 transition-colors">
                    <input type="checkbox" checked={formData.buyer_type.includes('Individual')} onChange={() => toggleBuyerType('Individual')} className="accent-empathon-rust" />
                    <span className="text-sm text-white">Individual</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-empathon-rust/50 transition-colors">
                    <input type="checkbox" checked={formData.buyer_type.includes('Corporate')} onChange={() => toggleBuyerType('Corporate')} className="accent-empathon-rust" />
                    <span className="text-sm text-white">Corporate</span>
                 </label>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
               <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2 rounded-xl text-slate-400 hover:text-white transition-colors">Cancel</button>
               <Button type="submit" variant={ComponentVariant.PRIMARY} disabled={loading}>
                 {loading ? 'Creating...' : 'Add Vehicle'}
               </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Filters Panel */}
          <div className="w-full lg:w-64 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit shrink-0">
            <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-empathon-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-empathon-rust outline-none"
                >
                  <option value="">All Brands</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Rolls-Royce">Rolls-Royce</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Condition</label>
                <select 
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-empathon-rust outline-none"
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
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-empathon-rust outline-none"
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
                    className="rounded border-white/20 bg-black/20 text-empathon-rust focus:ring-empathon-rust"
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
              <Button variant={ComponentVariant.PRIMARY} onClick={() => setIsCreating(true)} className="!py-2 !px-4 !text-sm flex items-center gap-2">
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
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price (₦)</th>
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
                          <div className="w-16 h-10 rounded overflow-hidden bg-white/5 border border-white/10">
                             <img src={car.image_url} alt={car.model} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white font-medium">{car.brand} {car.model}</div>
                          <div className="text-xs text-slate-500">{car.year} • {car.condition} • {car.mileage.toLocaleString()} mi</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-mono">
                          ₦{Number(car.price).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                            car.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                            car.status === 'Reserved' ? 'bg-red-500/10 text-red-500' :
                            'bg-empathon-rust/10 text-empathon-rust'
                          }`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </>
      )}
    </div>
  );
};
