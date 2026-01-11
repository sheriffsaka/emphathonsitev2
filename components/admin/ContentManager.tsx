
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

export const ContentManager: React.FC = () => {
  const [section, setSection] = useState<'hero' | 'testimonials'>('hero');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State for Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({});
  
  // File states
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [carFile, setCarFile] = useState<File | null>(null);

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
    resetForm();
  }, [section]);

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({});
    setHeroFile(null);
    setAvatarFile(null);
    setCarFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    const table = section === 'hero' ? 'hero_media' : 'testimonials';
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setIsFormOpen(true);
    // Clear files so we don't accidentally re-upload unless changed
    setHeroFile(null);
    setAvatarFile(null);
    setCarFile(null);
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('media').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Image upload failed: ${error}`);
      return '';
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // VALIDATION: Ensure image is present for new Hero items
    if (section === 'hero' && !editingId && !heroFile && !formData.image_url) {
      alert("Please upload a slide image to continue.");
      return;
    }

    setLoading(true);
    const table = section === 'hero' ? 'hero_media' : 'testimonials';
    
    let payload = { ...formData };

    // Handle Uploads
    if (section === 'hero') {
      if (heroFile) {
        const url = await uploadFile(heroFile, 'hero');
        if (url) payload.image_url = url;
        else {
           setLoading(false);
           return; // Upload failed
        }
      }
      // Ensure defaults
      payload.cta_primary_text = payload.cta_primary_text || 'View Inventory';
      payload.cta_secondary_text = payload.cta_secondary_text || 'Contact Us';
      if (!editingId) payload.display_order = data.length + 1;

      // Clean up fields from other section
      delete payload.client_name; delete payload.role; delete payload.content; delete payload.avatar_url; delete payload.car_purchased_image_url;
    } else {
      if (avatarFile) {
        const url = await uploadFile(avatarFile, 'avatars');
        if (url) payload.avatar_url = url;
      }
      if (carFile) {
        const url = await uploadFile(carFile, 'testimonials');
        if (url) payload.car_purchased_image_url = url;
      }
      payload.rating = Number(payload.rating) || 5;
      payload.client_type = payload.client_type || 'Individual';
      
      delete payload.title; delete payload.subtitle; delete payload.image_url; delete payload.cta_primary_text; delete payload.cta_secondary_text;
    }

    let error;

    if (editingId) {
       // Supabase Update
       const { error: updateError } = await supabase.from(table).update(payload).eq('id', editingId);
       error = updateError;
    } else {
       // Supabase Insert
       const { error: insertError } = await supabase.from(table).insert([payload]);
       error = insertError;
    }
    
    if (!error) {
      resetForm();
      fetchData();
    } else {
      alert(`Failed to save item: ${error.message}`);
      console.error(error);
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empathon-rust";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => { setSection('hero'); resetForm(); }}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'hero' ? 'bg-empathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Hero Slides
          </button>
          <button 
            onClick={() => { setSection('testimonials'); resetForm(); }}
            className={`px-6 py-2 rounded-md text-sm transition-all ${section === 'testimonials' ? 'bg-empathon-rust text-white shadow' : 'text-slate-400'}`}
          >
            Testimonials
          </button>
        </div>
        {!isFormOpen && (
          <Button variant={ComponentVariant.PRIMARY} className="!py-2 !px-4 !text-sm" onClick={() => setIsFormOpen(true)}>
            Create New {section === 'hero' ? 'Slide' : 'Testimonial'}
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="flex-1 overflow-auto min-h-0">
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-serif text-white">{editingId ? 'Edit' : 'Add New'} {section === 'hero' ? 'Hero Slide' : 'Testimonial'}</h3>
               <button onClick={resetForm} className="text-slate-400 hover:text-white">Cancel</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {section === 'hero' ? (
                <>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input required type="text" className={inputClass} placeholder="e.g. The New GLE 350" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Subtitle</label>
                    <textarea required className={inputClass} rows={2} placeholder="Description text..." value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className={labelClass}>Slide Image {(!editingId && !formData.image_url) && <span className="text-empathon-rust">*</span>}</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-empathon-rust file:text-white hover:file:bg-empathon-rustLight"
                      onChange={(e) => e.target.files && setHeroFile(e.target.files[0])}
                    />
                    {(heroFile || formData.image_url) && (
                      <div className="mt-2 h-24 w-full bg-black/40 rounded overflow-hidden relative">
                         <img src={heroFile ? URL.createObjectURL(heroFile) : formData.image_url} className="h-full w-full object-contain" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Primary Button Text</label>
                      <input type="text" className={inputClass} placeholder="View Inventory" value={formData.cta_primary_text || ''} onChange={e => setFormData({...formData, cta_primary_text: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Button Text</label>
                      <input type="text" className={inputClass} placeholder="Contact Us" value={formData.cta_secondary_text || ''} onChange={e => setFormData({...formData, cta_secondary_text: e.target.value})} />
                    </div>
                  </div>
                </>
              ) : (
                 <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Client Name</label>
                      <input required type="text" className={inputClass} placeholder="e.g. John Doe" value={formData.client_name || ''} onChange={e => setFormData({...formData, client_name: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Client Type</label>
                      <select className={inputClass} value={formData.client_type || 'Individual'} onChange={e => setFormData({...formData, client_type: e.target.value})}>
                         <option value="Individual">Individual</option>
                         <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Role / Title</label>
                    <input type="text" className={inputClass} placeholder="e.g. CEO of TechCorp" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Testimonial Content</label>
                    <textarea required className={inputClass} rows={3} placeholder="Quote..." value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <label className={labelClass}>Client Avatar</label>
                        <input 
                           type="file" accept="image/*"
                           className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-empathon-rust file:text-white"
                           onChange={(e) => e.target.files && setAvatarFile(e.target.files[0])}
                        />
                         {(avatarFile || formData.avatar_url) && (
                           <div className="mt-2 h-16 w-16 rounded-full overflow-hidden bg-black/40">
                              <img src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar_url} className="h-full w-full object-cover" />
                           </div>
                        )}
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <label className={labelClass}>Purchased Car Img</label>
                        <input 
                           type="file" accept="image/*"
                           className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-empathon-rust file:text-white"
                           onChange={(e) => e.target.files && setCarFile(e.target.files[0])}
                        />
                         {(carFile || formData.car_purchased_image_url) && (
                           <div className="mt-2 h-16 w-full rounded overflow-hidden bg-black/40">
                              <img src={carFile ? URL.createObjectURL(carFile) : formData.car_purchased_image_url} className="h-full w-full object-cover" />
                           </div>
                        )}
                     </div>
                  </div>

                  <div>
                    <label className={labelClass}>Rating (1-5)</label>
                    <input type="number" min="1" max="5" className={inputClass} value={formData.rating || 5} onChange={e => setFormData({...formData, rating: e.target.value})} />
                  </div>
                </>
              )}

              <Button type="submit" disabled={loading || uploading} variant={ComponentVariant.PRIMARY} className="w-full justify-center">
                {loading || uploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Create')}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* FIX: Separated scroll container from grid to ensure padding is respected and buttons aren't cut off */
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {loading ? (
              <div className="col-span-3 text-center text-slate-500 py-12">Loading content...</div>
            ) : (
              data.map((item: any) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-empathon-rust/50 transition-colors flex flex-col h-full">
                  {section === 'hero' ? (
                    <>
                      <div className="h-40 bg-black/40 relative shrink-0">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-white font-bold mb-1 truncate">{item.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1">{item.subtitle}</p>
                        <div className="flex justify-end gap-2 pt-2 border-t border-white/5 shrink-0">
                           <button onClick={() => handleEdit(item)} className="text-xs text-slate-300 hover:text-white px-3 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">Edit</button>
                           <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 bg-white/5 rounded transition-colors hover:bg-red-500/20">Delete</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                           {item.avatar_url ? <img src={item.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-700"></div>}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">{item.client_name}</h4>
                          <p className="text-slate-500 text-xs">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-4 flex-1 italic">"{item.content}"</p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-4 shrink-0">
                         <span className="text-empathon-rust text-xs font-bold">{item.rating} Stars</span>
                         <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/5">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10">Delete</button>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
