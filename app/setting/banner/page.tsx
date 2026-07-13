"use client";

import React, { useState, useEffect } from 'react';

type Banner = {
  id: string;
  image: string;
  link: string;
  status: string;
  created_at: string;
};

export default function BannerSettingPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersEnabled, setBannersEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newLink, setNewLink] = useState('');
  const [newStatus, setNewStatus] = useState('Active');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bannersRes, settingsRes] = await Promise.all([
        fetch('http://localhost:8080/api/banners'),
        fetch('http://localhost:8080/api/settings/banner')
      ]);

      if (bannersRes.ok) {
        const bannersData = await bannersRes.json();
        setBanners(bannersData || []);
      }
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setBannersEnabled(settingsData.banners_enabled);
      }
    } catch (error) {
      console.error('Failed to fetch banner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBanners = async () => {
    const newValue = !bannersEnabled;
    setBannersEnabled(newValue);
    try {
      await fetch('http://localhost:8080/api/settings/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banners_enabled: newValue }),
      });
    } catch (error) {
      console.error('Failed to update banner settings:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/banners/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete banner:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return alert('Please select an image');

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('link', newLink);
      formData.append('status', newStatus);

      const res = await fetch('http://localhost:8080/api/banners', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewImage(null);
        setNewLink('');
        setNewStatus('Active');
        fetchData();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Failed to upload banner:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto pb-12 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">Banner Settings</h1>
          <p className="text-[var(--text-secondary)] text-sm">Manage the sliding promotional banners on the app's home screen.</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <label className="flex items-center gap-3 bg-[var(--card-bg)] px-4 py-2.5 rounded-lg border border-[var(--card-border)] shadow-sm cursor-pointer">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Show on Home Page</span>
            <div className="relative inline-flex items-center">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={bannersEnabled}
                onChange={handleToggleBanners}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </div>
          </label>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex items-center gap-2"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Upload New Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.length === 0 ? (
          <div className="col-span-1 md:col-span-2 p-10 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-center text-[var(--text-secondary)]">
            No banners found. Upload one to get started.
          </div>
        ) : (
          banners.map(banner => (
            <div key={banner.id} className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-xl overflow-hidden group">
              <div className="w-full h-40 bg-black/40 relative">
                 <img src={`http://localhost:8080${banner.image}`} alt="Banner" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-3 right-3">
                   <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded backdrop-blur-md border ${
                     banner.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'
                   }`}>
                     {banner.status}
                   </span>
                 </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                 <div>
                   <label className="text-xs text-[var(--text-secondary)] font-bold uppercase">Target Link URL</label>
                   <input type="text" readOnly defaultValue={banner.link} className="w-full mt-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none" />
                 </div>
                 <div className="flex justify-end gap-2 pt-2 border-t border-[var(--card-border)]">
                   <button 
                     onClick={() => handleDelete(banner.id)}
                     className="text-sm font-semibold text-red-400 hover:text-red-300 transition px-3 py-1 bg-red-500/10 rounded-lg hover:bg-red-500/20"
                   >
                     Delete
                   </button>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[var(--card-border)] flex justify-between items-center">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Upload New Banner</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-secondary)] hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Link URL (Optional)</label>
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-medium text-[var(--text-secondary)] hover:bg-black/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-colors flex items-center gap-2"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : null}
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
