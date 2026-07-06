"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlatformGiftsManagePage() {
  const [activeTab, setActiveTab] = useState('All');

  // Mock data for platform gifts
  const gifts = [
    { id: 1, name: 'Welcome Star', type: 'System', trigger: 'New User Signup', status: 'Active', icon: '⭐', color: 'from-blue-400 to-teal-500' },
    { id: 2, name: 'First Top-up Bonus', type: 'Reward', trigger: 'First Payment', status: 'Active', icon: '🎁', color: 'from-emerald-400 to-green-500' },
    { id: 3, name: 'Level 10 Badge', type: 'Achievement', trigger: 'Reach Level 10', status: 'Active', icon: '🏆', color: 'from-amber-400 to-orange-500' },
    { id: 4, name: 'VIP Welcome', type: 'System', trigger: 'VIP Subscription', status: 'Inactive', icon: '💎', color: 'from-indigo-400 to-purple-500' },
    { id: 5, name: 'Weekly Login', type: 'Reward', trigger: '7 Days Streak', status: 'Active', icon: '📅', color: 'from-pink-400 to-rose-500' },
  ];

  const filteredGifts = activeTab === 'All' ? gifts : gifts.filter(g => g.type === activeTab);

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
            Platform Gifts
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Manage system-level gifts, automated rewards, and achievement unlocked gifts.
          </p>
        </div>
        <Link href="/platform-gifts/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Platform Gift
          </button>
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-[#18181b] p-1 rounded-lg w-full md:w-auto overflow-x-auto custom-scrollbar">
          {['All', 'System', 'Reward', 'Achievement'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-teal-500/20 text-teal-400 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#27272a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search platform gifts..."
            className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map((gift) => (
          <div key={gift.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 p-6 relative overflow-hidden group hover:border-gray-600 transition-all duration-300 flex flex-col justify-between">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gift.color} rounded-bl-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gift.color} bg-opacity-20 flex items-center justify-center text-2xl shadow-inner relative z-10`}>
                  {gift.icon}
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  gift.status === 'Active' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {gift.status}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{gift.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2.5 py-1 rounded-md">
                  {gift.type}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 mt-4 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Trigger:</span>
                <span className="text-white font-medium">{gift.trigger}</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
