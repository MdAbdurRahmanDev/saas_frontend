"use client";

import React, { useState } from 'react';

export default function DailyRewardsPage() {
  const [rewards, setRewards] = useState([
    { day: 1, type: 'Coins', amount: 50, active: true },
    { day: 2, type: 'Coins', amount: 100, active: true },
    { day: 3, type: 'Diamonds', amount: 5, active: true },
    { day: 4, type: 'Coins', amount: 200, active: true },
    { day: 5, type: 'Gift', amount: 1, itemName: 'Rose', active: true },
    { day: 6, type: 'Coins', amount: 500, active: true },
    { day: 7, type: 'Diamonds', amount: 20, active: true, isGrand: true },
  ]);

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2">
            Daily Login Rewards
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Configure the 7-day streak rewards to keep users engaged and coming back daily.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-yellow-500/25 hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: 7 Day Streak config */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/5 rounded-2xl pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm">📅</span>
              7-Day Streak Configuration
            </h2>

            <div className="space-y-4 relative z-10">
              {rewards.map((reward, index) => (
                <div 
                  key={reward.day} 
                  className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border transition-all ${
                    reward.isGrand 
                      ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                      : 'bg-[#18181b] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/40 border border-gray-700/50 font-bold text-gray-300">
                    D{reward.day}
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Reward Type</label>
                      <select 
                        defaultValue={reward.type}
                        className="w-full bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                      >
                        <option>Coins</option>
                        <option>Diamonds</option>
                        <option>Gift</option>
                        <option>VIP Days</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Amount / Quantity</label>
                      <input 
                        type="number" 
                        defaultValue={reward.amount}
                        className="w-full bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Specific Item (If Gift)</label>
                      <input 
                        type="text" 
                        defaultValue={reward.itemName || ''}
                        disabled={reward.type !== 'Gift'}
                        placeholder="e.g. Rose"
                        className="w-full bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center pt-5 md:pt-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={reward.active} />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Settings & Global */}
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">⚙️</span>
              Global Settings
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center bg-[#18181b] p-4 rounded-xl border border-gray-800">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">Enable Daily Rewards</h3>
                  <p className="text-xs text-gray-500 mt-1">Master switch for the feature</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Streak Reset Logic</label>
                <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all">
                  <option value="miss">Reset to Day 1 on missed day</option>
                  <option value="pause">Pause streak on missed day (No penalty)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">New Cycle Logic</label>
                <select className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all">
                  <option value="loop">Loop back to Day 1 after Day 7</option>
                  <option value="stay">Stay at Day 7 rewards forever</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Widget */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Reward Statistics (Today)</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-800 pb-3">
                <div className="text-xs text-gray-500">Users Claimed</div>
                <div className="text-xl font-bold text-white">4,209</div>
              </div>
              <div className="flex justify-between items-end border-b border-gray-800 pb-3">
                <div className="text-xs text-gray-500">Coins Distributed</div>
                <div className="text-xl font-bold text-yellow-500">128,500</div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-xs text-gray-500">Diamonds Distributed</div>
                <div className="text-xl font-bold text-cyan-400">1,420</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
