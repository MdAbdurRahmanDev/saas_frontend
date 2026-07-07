"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState } from 'react';
import Link from 'next/link';

export default function GiftStorePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // প্যাগিনেশনের জন্য স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ব্যাকএন্ড থেকে গিফট ডেটা লোড করা
  React.useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gifts`);
        if (response.ok) {
          const data = await response.json();
          setGifts(data || []);
        } else {
          console.error('Failed to fetch gifts');
        }
      } catch (error) {
        console.error('Error fetching gifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  // গিফট ডিলিট করার ফাংশন
  const handleDeleteGift = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gift?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/gifts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // UI থেকে মুছে ফেলা
        setGifts(gifts.filter(g => g.id !== id));
      } else {
        alert('Failed to delete gift');
      }
    } catch (error) {
      console.error('Error deleting gift:', error);
      alert('Error connecting to server');
    }
  };

  const filteredGifts = gifts.filter(g => {
    const matchesTab = activeTab === 'All' || g.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = !searchQuery || g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // প্যাগিনেশনের লজিক
  const totalPages = Math.ceil(filteredGifts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGifts = filteredGifts.slice(startIndex, startIndex + itemsPerPage);

  // ফিল্টার বা সার্চ চেঞ্জ হলে পেজ ১ এ নিয়ে আসা
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Gift Store
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Manage, organize, and track all virtual gifts available on the platform.
          </p>
        </div>
        <Link href="/gift-store/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Gift
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-[#18181b] p-1 rounded-lg w-full md:w-auto overflow-x-auto custom-scrollbar">
          {['All', ...Array.from(new Set(gifts.map(g => g.category)))].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-purple-500/20 text-purple-400 shadow-sm' 
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gifts..."
            className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">Loading gifts...</div>
        ) : paginatedGifts.map((gift) => (
          <div key={gift.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 relative overflow-hidden group hover:border-gray-600 transition-all duration-300">
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 flex items-center justify-center relative">
                  <img src={gift.image_url} alt={gift.name} className="w-full h-full object-contain relative z-10" />
                </div>
                
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  gift.is_active 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {gift.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{gift.name}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-400 bg-[#18181b] px-2 py-1 rounded">
                  {gift.category}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-cyan-400 text-sm">💎</span>
                  <span className="text-white font-semibold">{gift.price.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded transition-colors" title="Settings">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteGift(gift.id)}
                    className="text-red-500 hover:text-white hover:bg-red-600 p-1.5 rounded transition-colors" 
                    title="Delete Gift"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!loading && filteredGifts.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">No gifts found.</div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-all ${
                currentPage === 1 
                  ? 'bg-[#18181b] border-gray-800 text-gray-600 cursor-not-allowed' 
                  : 'bg-[var(--card-bg)] border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                  currentPage === page 
                    ? 'bg-purple-600 border border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-[var(--card-bg)] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-all ${
                currentPage === totalPages 
                  ? 'bg-[#18181b] border-gray-800 text-gray-600 cursor-not-allowed' 
                  : 'bg-[var(--card-bg)] border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
