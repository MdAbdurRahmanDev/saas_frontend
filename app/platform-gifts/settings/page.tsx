"use client";

import React from 'react';

export default function PlatformGiftsSettingsPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
            Platform Gift Settings
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Configure global rules, limits, and triggers for platform-wide automated gifts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-teal-500/25 hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Global Limits */}
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">🛡️</span>
            Global Limitations
          </h2>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Max Platform Gifts Per User / Day</label>
              <input 
                type="number" 
                defaultValue={5}
                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1.5">To prevent spam or abuse of the automated system.</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-xl border border-gray-800">
              <div>
                <h3 className="text-sm font-medium text-gray-200">Enable Automated Gifts</h3>
                <p className="text-xs text-gray-500 mt-1">Globally turn on/off all trigger-based gifts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Level Requirements */}
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">⭐</span>
            Level Requirements
          </h2>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Minimum User Level for Rewards</label>
              <input 
                type="number" 
                defaultValue={1}
                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Minimum Host Level for Rewards</label>
              <input 
                type="number" 
                defaultValue={1}
                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
