"use client";

import React, { useState } from 'react';

export default function AddGiftPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-2">
            Add New Gift
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Create and configure a new virtual gift for the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1f2937] text-gray-300 rounded-md text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-pink-500/25 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Save Gift
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">📝</span>
              Basic Information
            </h2>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Gift Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Royal Crown, Flying Dragon"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Price (Coins)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-yellow-500 font-bold">
                      💎
                    </span>
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select Category...</option>
                    <option value="classic">Classic</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury (Animations)</option>
                    <option value="event">Special Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="A short description of this gift..."
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Media & Settings */}
        <div className="space-y-8">
          {/* Media Upload */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm">🖼️</span>
              Gift Media
            </h2>

            <div className="relative z-10">
              <div className="w-full aspect-square border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-pink-500/50 hover:bg-[#18181b]/50 transition-all cursor-pointer group bg-[#18181b]">
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
                    <div className="w-16 h-16 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-300 mb-1">Click or drag to upload</p>
                    <p className="text-xs text-gray-500">SVG, PNG, GIF or SVGA (Max 5MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">⚙️</span>
              Settings
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Active Status</h3>
                  <p className="text-xs text-gray-500 mt-1">Make gift available in the store</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Broadcast Message</h3>
                  <p className="text-xs text-gray-500 mt-1">Announce in global chat when sent</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
