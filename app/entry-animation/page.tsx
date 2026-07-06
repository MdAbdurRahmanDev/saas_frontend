"use client";

import React from 'react';
import Link from 'next/link';

export default function EntryAnimationManagePage() {
  const mockAnimations = [
    { id: 1, name: 'Flaming Sports Car', price: 1500, validity: '30 Days', vipLevel: 'VIP 1+', status: 'Active', icon: '🏎️', color: 'from-orange-400 to-red-500' },
    { id: 2, name: 'Golden Dragon', price: 5000, validity: 'Permanent', vipLevel: 'VIP 5+', status: 'Active', icon: '🐉', color: 'from-amber-400 to-yellow-600' },
    { id: 3, name: 'Angel Wings', price: 800, validity: '7 Days', vipLevel: 'None', status: 'Active', icon: '🕊️', color: 'from-blue-400 to-cyan-500' },
    { id: 4, name: 'Spaceship Arrival', price: 2000, validity: '30 Days', vipLevel: 'VIP 1+', status: 'Inactive', icon: '🚀', color: 'from-purple-400 to-indigo-500' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Entry Animations (Store)
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Manage premium entrance effects available for users to purchase in the store.
          </p>
        </div>
        <Link href="/entry-animation/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Animation
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-[#18181b] p-1 rounded-lg w-full md:w-auto overflow-x-auto custom-scrollbar">
          {['All', 'Active', 'Inactive', 'VIP Only'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                tab === 'All' 
                  ? 'bg-orange-500/20 text-orange-400 shadow-sm' 
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
            placeholder="Search animations..."
            className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockAnimations.map((anim) => (
          <div key={anim.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 relative overflow-hidden group hover:border-gray-600 transition-all duration-300">
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${anim.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${anim.color} bg-opacity-10 flex items-center justify-center text-3xl shadow-inner relative`}>
                  <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                  <span className="relative z-10">{anim.icon}</span>
                </div>
                
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  anim.status === 'Active' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {anim.status}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{anim.name}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-1 rounded">
                  {anim.validity}
                </span>
                {anim.vipLevel !== 'None' && (
                  <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded">
                    {anim.vipLevel}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-cyan-400 text-sm font-bold">💎</span>
                  <span className="text-white font-semibold">{anim.price.toLocaleString()}</span>
                </div>
                
                <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
