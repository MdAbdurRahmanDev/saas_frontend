"use client";

import React, { useState } from 'react';

export default function CreateVideoSeriesPage() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 mb-2">
            Create Video Series
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Launch a new episodic video series. You can add individual episodes after creation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1f2937] text-gray-300 rounded-md text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-pink-500/25 hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Create Series
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-sm">📝</span>
              Series Details
            </h2>
            
            <div className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Series Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Masterclass: Advanced Streaming"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select Category...</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                    <option value="gaming">Gaming</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Host / Creator</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select Official Host...</option>
                    <option value="1">Emma Watson</option>
                    <option value="2">Sarah Connor</option>
                    <option value="system">Platform Official</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Synopsis / Description</label>
                <textarea 
                  rows={4}
                  placeholder="What is this series about?"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm">🖼️</span>
              Cover Art
            </h2>

            <div className="relative z-10">
              <div className="w-full aspect-[16/9] border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-pink-500/50 hover:bg-[#18181b]/50 transition-all cursor-pointer group bg-[#18181b]">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleCoverChange}
                />
                
                {coverPreview ? (
                  <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-300 mb-1">Upload Thumbnail</p>
                    <p className="text-xs text-gray-500">16:9 ratio recommended</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm">💎</span>
              Monetization
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Premium Access</h3>
                  <p className="text-xs text-gray-500 mt-1">Require users to unlock</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Price to Unlock Entire Series</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-yellow-500 font-bold">
                      💎
                    </span>
                    <input 
                      type="number" 
                      placeholder="e.g. 5000"
                      className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Users can also buy individual episodes later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
