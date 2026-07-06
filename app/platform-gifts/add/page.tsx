"use client";

import React, { useState } from 'react';

export default function AddPlatformGiftPage() {
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
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
            Add Platform Gift
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Create a new system-level gift for achievements or events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1f2937] text-gray-300 rounded-md text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-teal-500/25 hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Save Platform Gift
          </button>
        </div>
      </div>

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
                  placeholder="e.g. VIP Welcome Pack"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Gift Type</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select Type...</option>
                    <option value="system">System Default</option>
                    <option value="reward">Event Reward</option>
                    <option value="achievement">Achievement</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Trigger Event</label>
                  <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer">
                    <option value="">Select Trigger...</option>
                    <option value="signup">New User Signup</option>
                    <option value="first_deposit">First Deposit</option>
                    <option value="level_up">Level Up</option>
                    <option value="manual">Manual Admin Grant Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Internal Notes</label>
                <textarea 
                  rows={3}
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
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">In-App Notification</h3>
                  <p className="text-xs text-gray-500 mt-1">Notify user when received</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
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
