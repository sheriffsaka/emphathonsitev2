import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { ComponentVariant } from '../types';

export const AppointmentBlock: React.FC = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="mb-4">
        <span className="text-emphathon-rust text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
          Visit Us
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
          The Gallery
        </h2>
        <p className="text-slate-400 text-lg font-light leading-relaxed">
          Experience the collection in person. Our private showroom offers a discreet and secure environment for viewing and consultation.
        </p>
      </div>

      {/* Showroom Details Card */}
      <GlassCard className="flex-1 relative overflow-hidden group !p-8 flex flex-col justify-between" hoverEffect={true}>
        {/* Background Decorative Icon */}
        <div className="absolute -right-8 -top-8 text-white/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
          </svg>
        </div>

        <div className="space-y-8 relative z-10">
          <div>
            <h4 className="text-white font-serif text-xl mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emphathon-rust"></span>
              New York
            </h4>
            <p className="text-slate-400 pl-4 border-l border-white/10 ml-1 py-1">
              450 Park Avenue <br />
              New York, NY 10022
            </p>
          </div>

          <div>
             <h4 className="text-white font-serif text-xl mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emphathon-rust"></span>
              Hours
            </h4>
            <ul className="text-slate-400 pl-4 border-l border-white/10 ml-1 py-1 space-y-1 text-sm">
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Mon - Fri</span>
                <span className="text-white">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Saturday</span>
                <span className="text-white">By Appointment</span>
              </li>
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Sunday</span>
                <span className="text-slate-600">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
          <Button variant={ComponentVariant.GHOST} className="!p-0 hover:!bg-transparent group/link">
            <span className="text-emphathon-rust font-bold tracking-widest uppercase text-xs flex items-center gap-2">
              Get Directions
              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [method, setMethod] = useState<'Walk-in' | 'Pre-Order'>('Walk-in');
  const [buyerType, setBuyerType] = useState<'Corporate' | 'Individual'>('Individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    // Assuming we have an 'appointments' table
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          appointment_date: formData.date ? formData.date : null,
          message: formData.message,
          visit_type: method,
          buyer_type: buyerType
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error booking appointment:', error);
      alert('Could not schedule appointment. Please try again.');
    } else {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emphathon-rust focus:ring-1 focus:ring-emphathon-rust transition-all duration-300 hover:bg-white/[0.07]";
  const labelClasses = "block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2";

  return (
    <GlassCard className="!p-8 md:!p-10 backdrop-blur-xl bg-emphathon-navy/40 relative overflow-hidden">
      
      {success && (
        <div className="absolute inset-0 z-20 bg-emphathon-navy/95 flex items-center justify-center flex-col animate-in fade-in">
           <div className="text-emphathon-rust mb-4">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h3 className="text-2xl font-serif text-white mb-2">Appointment Scheduled</h3>
           <p className="text-slate-400 text-center max-w-xs">We look forward to seeing you at our gallery.</p>
           <button onClick={() => setSuccess(false)} className="mt-6 text-sm text-white/50 hover:text-white uppercase tracking-widest transition-colors">Close</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
            
            {/* Sales Method Selector */}
            <div className="flex-1">
                <label className={labelClasses}>Inquiry Type</label>
                <div className="bg-black/20 p-1 rounded-lg border border-white/5 flex relative">
                  <button
                    type="button"
                    onClick={() => setMethod('Walk-in')}
                    className={`flex-1 relative z-10 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                        method === 'Walk-in' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Showroom Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('Pre-Order')}
                    className={`flex-1 relative z-10 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                        method === 'Pre-Order' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Pre-Order
                  </button>
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emphathon-rust rounded shadow-lg transition-transform duration-300 ease-out ${
                        method === 'Pre-Order' ? 'translate-x-[100%] translate-x-2' : 'translate-x-0'
                    }`}
                  />
                </div>
            </div>

            {/* Buyer Type Selector */}
             <div className="flex-1">
                <label className={labelClasses}>Buyer Type</label>
                <div className="bg-black/20 p-1 rounded-lg border border-white/5 flex relative">
                  <button
                    type="button"
                    onClick={() => setBuyerType('Individual')}
                    className={`flex-1 relative z-10 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                        buyerType === 'Individual' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyerType('Corporate')}
                    className={`flex-1 relative z-10 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                        buyerType === 'Corporate' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Corporate
                  </button>
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emphathon-rust rounded shadow-lg transition-transform duration-300 ease-out ${
                        buyerType === 'Corporate' ? 'translate-x-[100%] translate-x-2' : 'translate-x-0'
                    }`}
                  />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label className={labelClasses}>Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className={inputClasses} 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleChange}
                />
            </div>
            
            <div>
                <label className={labelClasses}>Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className={inputClasses} 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
            </div>

            <div>
                <label className={labelClasses}>Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  className={inputClasses} 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone}
                  onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2">
                <label className={labelClasses}>Preferred Appointment Date (Optional)</label>
                <input 
                  name="date"
                  type="date" 
                  className={`${inputClasses} [color-scheme:dark]`} 
                  value={formData.date}
                  onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2">
                <label className={labelClasses}>Message</label>
                <textarea 
                  name="message"
                  rows={3} 
                  className={inputClasses} 
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
            </div>
        </div>

        <Button 
          type="submit"
          disabled={isSubmitting}
          variant={ComponentVariant.PRIMARY} 
          className="w-full !py-4 shadow-lg shadow-emphathon-rust/20 hover:shadow-emphathon-rust/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Scheduling...' : 'Request Appointment'}
        </Button>

      </form>
    </GlassCard>
  );
}