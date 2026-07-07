"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { API_BASE_URL } from '@/utils/api';

export default function PlatformGiftsManagePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [gifts, setGifts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [giftsRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/platform-gifts`),
          fetch(`${API_BASE_URL}/api/gift-categories?type=platform`)
        ]);

        if (giftsRes.ok) {
          const data = await giftsRes.json();
          setGifts(data || []);
        }

        if (catRes.ok) {
          const data = await catRes.json();
          setCategories(data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredGifts = gifts.filter(g => {
    const matchesTab = activeTab === 'All' || g.category === activeTab || g.format === activeTab;
    const matchesSearch = g.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabList = ['All', ...categories.map(c => c.name)];

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
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap capitalize ${activeTab === tab
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-10">Loading platform gifts...</div>
        ) : filteredGifts.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">No platform gifts found.</div>
        ) : (
          filteredGifts.map((gift) => (
            <div key={gift.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 p-6 pb-14 relative overflow-hidden group hover:border-gray-600 transition-all duration-300 flex flex-col justify-between">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-bl-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-[#18181b] border border-gray-700 flex items-center justify-center shadow-inner relative z-10 overflow-hidden`}>
                    {gift.image_url ? (
                      <img src={gift.image_url} alt={gift.name} className="w-full h-full object-cover" />
                    ) : (
                      '🎁'
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${gift.auto_dispatch
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                    {gift.auto_dispatch ? 'Auto' : 'Manual'}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{gift.name}</h3>

                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2.5 py-1 rounded-md uppercase">
                    {gift.format}
                  </span>
                  {gift.category && (
                    <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2.5 py-1 rounded-md">
                      {gift.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 mt-4 relative z-10 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1">
                    {gift.cost}
                    <svg className="w-4 h-4 text-cyan-400 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.5L20 8.5L12 21.5L4 8.5L12 2.5Z" />
                    </svg>
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Admin Commission:</span>
                  <span className="text-teal-400 font-medium">{gift.admin_commission}%</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-800/50">
                  <span className="text-gray-300 font-medium">Profit per Sale:</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    {((gift.cost * gift.admin_commission) / 100).toFixed(0)}
                    <svg className="w-4 h-4 text-cyan-400 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.5L20 8.5L12 21.5L4 8.5L12 2.5Z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <Link href={`/platform-gifts/edit/${gift.id}`}>
                  <button className="text-blue-400 hover:text-white hover:bg-blue-500/20 p-2 rounded transition-colors" title="Edit">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </Link>
                <button className="text-red-400 hover:text-white hover:bg-red-500/20 p-2 rounded transition-colors" title="Delete">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
