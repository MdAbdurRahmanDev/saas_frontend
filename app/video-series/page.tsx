"use client";

import React from 'react';
import Link from 'next/link';

export default function VideoSeriesManagePage() {
  const mockSeries = [
    { id: 1, title: 'Masterclass: Becoming a Top Host', host: 'Emma Watson', category: 'Education', episodes: 12, views: '1.2M', revenue: 45000, isPremium: true, status: 'Active' },
    { id: 2, title: 'Behind The Scenes: Agency Alpha', host: 'Platform Official', category: 'Entertainment', episodes: 5, views: '850K', revenue: 0, isPremium: false, status: 'Active' },
    { id: 3, title: 'Pro Gamer Guide 2024', host: 'John Wick', category: 'Gaming', episodes: 8, views: '200K', revenue: 15000, isPremium: true, status: 'Active' },
    { id: 4, title: 'Fitness Journey', host: 'Lara Croft', category: 'Lifestyle', episodes: 30, views: '3M', revenue: 120000, isPremium: true, status: 'Completed' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Video Series
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Manage long-form episodic content, track viewership, and monitor series revenue.
          </p>
        </div>
        <Link href="/video-series/create">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Series
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-[#18181b] p-1 rounded-lg w-full md:w-auto overflow-x-auto custom-scrollbar">
          {['All Series', 'Premium', 'Free', 'Education', 'Gaming'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                tab === 'All Series' 
                  ? 'bg-pink-500/20 text-pink-400 shadow-sm' 
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
            placeholder="Search series by title or host..."
            className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSeries.map((series) => (
          <div key={series.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 relative overflow-hidden group hover:border-gray-600 transition-all duration-300 flex flex-col">
            {/* Thumbnail Placeholder */}
            <div className="w-full aspect-[16/9] bg-[#18181b] relative overflow-hidden group-hover:opacity-90 transition-opacity flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
               {/* Just a decorative icon for the mock thumbnail */}
               <div className="text-gray-700 text-5xl">🎬</div>
               
               <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                 {series.episodes} Episodes
               </div>
               
               {series.isPremium && (
                 <div className="absolute top-3 left-3 z-20 bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-extrabold tracking-wider shadow-lg">
                   PREMIUM
                 </div>
               )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">{series.title}</h3>
              </div>
              
              <div className="text-sm text-gray-400 mb-4 flex-1">
                Hosted by <span className="text-gray-200 font-semibold">{series.host}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-4 mb-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase">Category</div>
                  <div className="text-sm font-semibold text-white">{series.category}</div>
                </div>
                <div className="text-center border-l border-r border-gray-800">
                  <div className="text-xs text-gray-500 uppercase">Views</div>
                  <div className="text-sm font-semibold text-white">{series.views}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase">Revenue</div>
                  <div className="text-sm font-semibold text-green-400">
                    {series.revenue > 0 ? `$${(series.revenue/1000).toFixed(1)}k` : '-'}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <button className="flex-1 bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 hover:bg-fuchsia-600/20 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Manage Episodes
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors border border-gray-700">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
