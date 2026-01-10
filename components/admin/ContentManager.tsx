
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

export const ContentManager: React.FC = () => {
  const [section, setSection] = useState<'hero' | 'testimonials'>('hero');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [newItem, setNewItem] = useState<any>({});

  const fetchData = async () => {
    setLoading(true);
    const table = section === 'hero' ? 'hero_media' : 'testimonials';
    const { data: result, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    
    if (!error && result) {
      setData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setIsCreating(false);
    setNewItem({});
  }, [section]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const table = section === 'hero' ? 'hero_media' : 'testimonials';
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const table = section === 'hero' ? 'hero_media' : 'testimonials';
    
    // Default values
    const payload = section === 'hero' ? {
       title: newItem.title,
       subtitle: newItem.subtitle,
       image_url: newItem.image_url,
       cta_primary_text: newItem.cta_primary_text || 'View Inventory',
       cta_secondary_text: newItem.cta_secondary_text || 'Contact Us',
       display_order: data.length + 1
    } : {
       client_name: newItem.client_name,
       role: newItem.role,
       content: newItem.content,
       rating: Number(newItem.rating) || 5,
       client_type: newItem.client_type || 'Individual',
       avatar_url: newItem.avatar_url
    };

    const { error } = await supabase.from(table).insert([payload]);
    
    if (!error) {
      setIsCreating(false);
      setNewItem({});
      fetchData();
    } else {
      alert('Failed to create item');
      console.error(error);
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empathon-rust";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setSection('hero')}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'hero' ? 'bg-empathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Hero Slides
          </button>
          <button 
            onClick={() => setSection('testimonials')}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'testimonials' ? 'bg-empathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Testimonials
          </button>
        </div>
        {!isCreating && (
          <Button variant={ComponentVariant.PRIMARY} className="!py-2 !px-4 !text-sm" onClick={() => setIsCreating(true)}>
            Create New {section === 'hero' ? 'Slide' : 'Testimonial'}
          </Button>
        )}
      </div>

      {isCreating ? (
        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-serif text-white">Add New {section === 'hero' ? 'Hero Slide' : 'Testimonial'}</h3>
               <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">Cancel</button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-6">
              {section === 'hero' ? (
                <>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input required type="text" className={inputClass} placeholder="e.g. The New GLE 350" value={newItem.title || ''} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Subtitle</label>
                    <textarea required className={inputClass} rows={2} placeholder="Description text..." value={newItem.subtitle || ''} onChange={e => setNewItem({...newItem, subtitle: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Image URL (Unsplash or direct link)</label>
                    <input required type="text" className={inputClass} placeholder="https://..." value={newItem.image_url || ''} onChange={e => setNewItem({...newItem, image_url: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Primary Button Text</label>
                      <input type="text" className={inputClass} placeholder="View Inventory" value={newItem.cta_primary_text || ''} onChange={e => setNewItem({...newItem, cta_primary_text: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Button Text</label>
                      <input type="text" className={inputClass} placeholder="Contact Us" value={newItem.cta_secondary_text || ''} onChange={e => setNewItem({...newItem, cta_secondary_text: e.target.value})} />
                    </div>
                  </div>
                </>
              ) : (
                 <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Client Name</label>
                      <input required type="text" className={inputClass} placeholder="e.g. John Doe" value={newItem.client_name || ''} onChange={e => setNewItem({...newItem, client_name: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Client Type</label>
                      <select className={inputClass} value={newItem.client_type || 'Individual'} onChange={e => setNewItem({...newItem, client_type: e.target.value})}>
                         <option value="Individual">Individual</option>
                         <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Role / Title</label>
                    <input type="text" className={inputClass} placeholder="e.g. CEO of TechCorp" value={newItem.role || ''} onChange={e => setNewItem({...newItem, role: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Testimonial Content</label>
                    <textarea required className={inputClass} rows={3} placeholder="Quote..." value={newItem.content || ''} onChange={e => setNewItem({...newItem, content: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Rating (1-5)</label>
                      <input type="number" min="1" max="5" className={inputClass} value={newItem.rating || 5} onChange={e => setNewItem({...newItem, rating: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Avatar URL (Optional)</label>
                      <input type="text" className={inputClass} placeholder="https://..." value={newItem.avatar_url || ''} onChange={e => setNewItem({...newItem, avatar_url: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" disabled={loading} variant={ComponentVariant.PRIMARY} className="w-full justify-center">
                {loading ? 'Creating...' : 'Publish Content'}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto pb-8 flex-1">
          {loading ? (
            <div className="col-span-3 text-center text-slate-500 py-12">Loading content...</div>
          ) : (
            data.map((item: any) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-empathon-rust/50 transition-colors flex flex-col">
                {section === 'hero' ? (
                  <>
                    <div className="h-40 bg-black/40 relative shrink-0">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-white font-bold mb-1 truncate">{item.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1">{item.subtitle}</p>
                      <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                         <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 bg-white/5 rounded transition-colors">Delete</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                         {item.avatar_url ? <img src={item.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-700"></div>}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.client_name}</h4>
                        <p className="text-slate-500 text-xs">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 flex-1 italic">"{item.content}"</p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                       <span className="text-empathon-rust text-xs font-bold">{item.rating} Stars</span>
                       <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
