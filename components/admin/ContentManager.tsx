
import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

export const ContentManager: React.FC = () => {
  const [section, setSection] = useState<'hero' | 'testimonials'>('hero');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const endpoint = section === 'hero' ? '/hero-media' : '/testimonials';
    const res = await api.get(endpoint);
    if (res.success) setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [section]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const endpoint = section === 'hero' ? `/hero-media/${id}` : `/testimonials/${id}`;
    await api.delete(endpoint);
    fetchData();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setSection('hero')}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'hero' ? 'bg-emphathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Hero Slides
          </button>
          <button 
            onClick={() => setSection('testimonials')}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'testimonials' ? 'bg-emphathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Testimonials
          </button>
        </div>
        <Button variant={ComponentVariant.PRIMARY} className="!py-2 !px-4 !text-sm">
           Create New {section === 'hero' ? 'Slide' : 'Testimonial'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto pb-8">
        {loading ? (
          <div className="col-span-3 text-center text-slate-500 py-12">Loading content...</div>
        ) : (
          data.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-emphathon-rust/50 transition-colors">
              {section === 'hero' ? (
                <>
                  <div className="h-40 bg-black/40 relative">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-[10px] uppercase text-white backdrop-blur">
                       {item.is_active ? 'Active' : 'Draft'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-1 truncate">{item.title}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4">{item.subtitle}</p>
                    <div className="flex justify-end gap-2">
                       <button className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-white/5 rounded">Edit</button>
                       <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 bg-white/5 rounded">Delete</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                       {item.avatar_url && <img src={item.avatar_url} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{item.client_name}</h4>
                      <p className="text-slate-500 text-xs">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-4 flex-1 italic">"{item.content}"</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                     <span className="text-emphathon-rust text-xs font-bold">{item.rating} Stars</span>
                     <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
