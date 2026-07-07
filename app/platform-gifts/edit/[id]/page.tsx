"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPlatformGiftPage() {
  const params = useParams();
  const router = useRouter();
  const giftId = params.id as string;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [format, setFormat] = useState('');
  const [cost, setCost] = useState('');
  const [adminCommission, setAdminCommission] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [inAppNotification, setInAppNotification] = useState(true);

  // Status states
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gift-categories?type=platform`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchGiftData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/platform-gifts/${giftId}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.name || '');
          setFormat(data.format || '');
          setCost(String(data.cost || ''));
          setAdminCommission(String(data.admin_commission || ''));
          setCategory(data.category || '');
          setNotes(data.internal_notes || '');
          setAutoDispatch(data.auto_dispatch ?? true);
          setInAppNotification(data.in_app_notification ?? true);
          if (data.image_url) {
            setImagePreview(`${API_BASE_URL}${data.image_url}`);
          }
        }
      } catch (error) {
        console.error('Error fetching gift:', error);
      }
    };

    if (giftId) {
      fetchCategories();
      fetchGiftData();
    }
  }, [giftId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImagePreview(url);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !format || !cost) {
      setErrorMsg('Please fill in all required fields (Name, Format, Cost).');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('format', format);
      formData.append('cost', cost);
      formData.append('adminCommission', adminCommission);
      formData.append('category', category);
      formData.append('notes', notes);
      formData.append('autoDispatch', String(autoDispatch));
      formData.append('inAppNotification', String(inAppNotification));
      if (file) {
        formData.append('image', file);
      }

      const response = await fetch(`${API_BASE_URL}/api/platform-gifts/${giftId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setSuccessMsg('Platform Gift successfully updated!');
        setTimeout(() => {
          router.push('/platform-gifts');
        }, 1000);
        // Reset form
        setName('');
        setFormat('');
        setCost('');
        setAdminCommission('');
        setCategory('');
        setNotes('');
        setFile(null);
        setImagePreview(null);
      } else {
        const data = await response.text();
        setErrorMsg(`Error: ${data}`);
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
            Edit Platform Gift
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Modify the selected system-level gift for achievements or events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/platform-gifts')} className="px-4 py-2 bg-[#1f2937] text-gray-300 rounded-md text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-teal-500/25 hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update Platform Gift'}
          </button>
        </div>
      </div>

      {successMsg && <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">{successMsg}</div>}
      {errorMsg && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">{errorMsg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">📝</span>
              Gift Details
            </h2>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Platform Gift Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. VIP Welcome Pack"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Gift Type (Format)</label>
                  <select 
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Format...</option>
                    <option value="image">Image (PNG, JPG)</option>
                    <option value="video">Video (MP4)</option>
                    <option value="gif">GIF</option>
                    <option value="svga">SVGA / Animation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Cost (Coins)</label>
                  <input 
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Admin Commission (%)</label>
                  <input 
                    type="number"
                    value={adminCommission}
                    onChange={(e) => setAdminCommission(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Category...</option>
                    {categories.map((c, idx) => (
                      <option key={c.id || idx} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Internal Notes</label>
                <textarea 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes for admins (not visible to users)..."
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">🖼️</span>
              Visual Assets
            </h2>

            <div className="relative z-10">
              <div className="w-full aspect-square border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-cyan-500/50 hover:bg-[#18181b]/50 transition-all cursor-pointer group bg-[#18181b]">
                <input 
                  type="file" 
                  accept="image/*,video/mp4,.svga" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-300 mb-1">Upload Icon/Animation</p>
                    <p className="text-xs text-gray-500">Must be transparent PNG or SVGA</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">⚙️</span>
              Automation
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Auto-Dispatch</h3>
                  <p className="text-xs text-gray-500 mt-1">Send automatically on trigger</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoDispatch}
                    onChange={(e) => setAutoDispatch(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">In-App Notification</h3>
                  <p className="text-xs text-gray-500 mt-1">Notify user when received</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={inAppNotification}
                    onChange={(e) => setInAppNotification(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
