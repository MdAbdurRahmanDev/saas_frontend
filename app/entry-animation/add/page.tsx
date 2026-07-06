"use client";

import React, { useState } from 'react';

export default function AddEntryAnimationPage() {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd handle SVGA or video differently, 
      // but for UI preview we'll just show an image or generic box
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
            Add Entry Animation
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Create premium entrance effects that users can purchase from the store.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1f2937] text-gray-300 rounded-md text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-orange-500/25 hover:from-orange-400 hover:to-red-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Save Animation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">🔥</span>
              Store Item Details
            </h2>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Animation Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Flaming Sports Car, Golden Dragon"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Store Price (Diamonds)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-400 font-bold">
                      💎
                    </span>
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Validity Duration</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer">
                    <option value="30">30 Days</option>
                    <option value="7">7 Days</option>
                    <option value="1">1 Day</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Minimum VIP Level Required (Optional)</label>
                <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer">
                  <option value="0">None (Available to all)</option>
                  <option value="1">VIP 1+</option>
                  <option value="5">VIP 5+</option>
                  <option value="10">VIP 10+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the entrance effect..."
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm">🎞️</span>
              Animation File
            </h2>

            <div className="relative z-10">
              <div className="w-full aspect-square border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-red-500/50 hover:bg-[#18181b]/50 transition-all cursor-pointer group bg-[#18181b]">
                <input 
                  type="file" 
                  accept=".svga,.mp4,.gif" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleFileChange}
                />
                
                {filePreview ? (
                  <div className="w-full h-full bg-[#18181b] flex flex-col items-center justify-center p-4">
                     <span className="text-4xl mb-2">✅</span>
                     <span className="text-sm font-bold text-white">File Uploaded</span>
                     <span className="text-xs text-gray-500 mt-1">Ready for preview in app</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-300 mb-1">Upload Animation</p>
                    <p className="text-xs text-gray-500 font-bold mb-1">Format: SVGA (Recommended) or MP4</p>
                    <p className="text-xs text-gray-600">Max size 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-sm">⚙️</span>
              Store Status
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Available in Store</h3>
                  <p className="text-xs text-gray-500 mt-1">Users can buy this</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Global Broadcast</h3>
                  <p className="text-xs text-gray-500 mt-1">Announce when equipped</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
