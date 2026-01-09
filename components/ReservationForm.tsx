import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const ReservationForm: React.FC = () => {
  const [buyerType, setBuyerType] = useState<'Corporate' | 'Individual'>('Individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    color: '',
    date: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const { error } = await supabase
      .from('preorders')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          brand: formData.brand,
          model: formData.model,
          color: formData.color,
          expected_delivery: formData.date ? formData.date : null,
          notes: formData.notes,
          buyer_type: buyerType
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting reservation:', error);
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        brand: '',
        model: '',
        color: '',
        date: '',
        notes: ''
      });
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-empathon-rust focus:ring-1 focus:ring-empathon-rust transition-all duration-300";
  const labelClasses = "block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2";

  return (
    <section className="py-24 relative" id="concierge">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-empathon-navyLight/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-empathon-rust text-xs font-bold tracking-[0.3em] uppercase block mb-4">
            Concierge Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve Your Allocation
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Secure priority access to incoming inventory. Reserve luxury cars via pre-order before they arrive at our showroom.
          </p>
        </div>

        <GlassCard className="max-w-4xl mx-auto backdrop-blur-2xl !p-8 md:!p-12 relative overflow-hidden">
          
          {submitStatus === 'success' && (
             <div className="absolute inset-0 z-20 bg-empathon-navy/95 flex items-center justify-center flex-col animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Request Received</h3>
                <p className="text-slate-400">Our concierge team will contact you shortly.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-6 text-sm text-empathon-rust uppercase tracking-widest hover:text-white transition-colors">Make another request</button>
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Buyer Type Toggle */}
            <div className="flex flex-col items-center justify-center mb-8">
              <label className={labelClasses}>I am purchasing as</label>
              <div className="bg-black/20 p-1 rounded-xl border border-white/5 inline-flex relative">
                <button
                  type="button"
                  onClick={() => setBuyerType('Individual')}
                  className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    buyerType === 'Individual' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerType('Corporate')}
                  className={`relative z-10 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    buyerType === 'Corporate' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Corporate
                </button>
                {/* Active Pill Background */}
                <div 
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-empathon-rust rounded-lg shadow-lg transition-transform duration-300 ease-out ${
                    buyerType === 'Corporate' ? 'translate-x-[100%] translate-x-2' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                <input 
                  required
                  type="text" 
                  name="fullName" 
                  id="fullName"
                  className={inputClasses}
                  placeholder="e.g. Jonathan Sterling"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email" 
                  id="email"
                  className={inputClasses}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  className={inputClasses}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                 <label htmlFor="date" className={labelClasses}>Expected Delivery</label>
                 <input 
                  type="date" 
                  name="date" 
                  id="date"
                  className={`${inputClasses} [color-scheme:dark]`} 
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Car Details Divider */}
            <div className="border-t border-white/10 pt-8 mt-8">
               <h4 className="font-serif text-xl text-white mb-6">Vehicle Preferences</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label htmlFor="brand" className={labelClasses}>Brand Interest</label>
                    <select 
                      name="brand" 
                      id="brand" 
                      className={inputClasses}
                      value={formData.brand}
                      onChange={handleChange}
                    >
                      <option value="" className="bg-empathon-navy text-slate-400">Select Brand</option>
                      <option value="Rolls-Royce" className="bg-empathon-navy text-white">Rolls-Royce</option>
                      <option value="Bentley" className="bg-empathon-navy text-white">Bentley</option>
                      <option value="Porsche" className="bg-empathon-navy text-white">Porsche</option>
                      <option value="Aston Martin" className="bg-empathon-navy text-white">Aston Martin</option>
                      <option value="Other" className="bg-empathon-navy text-white">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="model" className={labelClasses}>Model (Optional)</label>
                    <input 
                      type="text" 
                      name="model" 
                      id="model"
                      className={inputClasses}
                      placeholder="e.g. Phantom"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="color" className={labelClasses}>Preferred Spec/Color</label>
                    <input 
                      type="text" 
                      name="color" 
                      id="color"
                      className={inputClasses}
                      placeholder="e.g. Midnight Sapphire"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
               </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className={labelClasses}>Additional Requests</label>
              <textarea 
                name="notes" 
                id="notes"
                rows={4}
                className={inputClasses}
                placeholder="Specific packages, customization requests, or logistics details..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Submit Action */}
            <div className="flex flex-col items-end pt-4">
              <Button 
                type="submit"
                disabled={isSubmitting}
                variant={ComponentVariant.PRIMARY} 
                className="w-full md:w-auto !py-4 !px-12 text-lg shadow-xl shadow-empathon-rust/20 hover:shadow-empathon-rust/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Submit Reservation Request'}
              </Button>
              {submitStatus === 'error' && <p className="text-red-400 text-sm mt-2">Failed to submit request. Please try again.</p>}
            </div>

          </form>
        </GlassCard>
      </div>
    </section>
  );
};