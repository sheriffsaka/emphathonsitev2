
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { GlassCard } from './GlassCard';

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  type: 'Corporate' | 'Individual';
  content: string;
  rating: number;
  image: string;
  carImage: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alexander V.",
    role: "Procurement Director, TechCorp",
    type: "Corporate",
    content: "Empathon managed our entire executive fleet refresh. The priority import status allowed us to secure 12 units of the S-Class Maybach before they hit local dealers. Exceptional logistics.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    carImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Elena R.",
    role: "Private Collector",
    type: "Individual",
    content: "The discretion and speed of the pre-order process for my GT3 RS were unmatched. I was kept informed at every stage of the customs and delivery process. Truly white-glove service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359-1508d476fbfb?auto=format&fit=crop&q=80&w=200",
    carImage: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Marcus T.",
    role: "CEO, Venture Holdings",
    type: "Corporate",
    content: "We needed a specific spec for our diplomatic transport requirements. Empathon not only sourced the armored vehicles but handled the complex international compliance seamlessly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    carImage: "https://images.unsplash.com/photo-1631295868223-63260951bcb7?auto=format&fit=crop&q=80&w=200"
  }
];

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .limit(3);

        if (!error && data && data.length > 0) {
          const mapped: Testimonial[] = data.map((item: any) => ({
            id: item.id,
            name: item.client_name,
            role: item.role,
            type: item.client_type,
            content: item.content,
            rating: item.rating,
            image: item.avatar_url,
            carImage: item.car_purchased_image_url
          }));
          setTestimonials(mapped);
        } else {
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setTestimonials(FALLBACK_TESTIMONIALS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <span className="text-empathon-rust text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
            Trusted by Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(isLoading ? FALLBACK_TESTIMONIALS : testimonials).map((item) => (
            <GlassCard key={item.id} className="flex flex-col h-full relative group" hoverEffect={true}>
              
              {/* Header: User Info & Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-slate-500 text-xs">{item.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  item.type === 'Corporate' 
                    ? 'border-empathon-rust/30 text-empathon-rust bg-empathon-rust/5' 
                    : 'border-blue-400/30 text-blue-400 bg-blue-400/5'
                }`}>
                  {item.type}
                </span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-empathon-rust" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                "{item.content}"
              </p>

              {/* Footer: Product Link & Verification */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/5 overflow-hidden">
                    <img src={item.carImage} alt="Purchased Vehicle" className="w-full h-full object-cover opacity-70" />
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">Purchased</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-empathon-rust">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                </div>
              </div>

            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
