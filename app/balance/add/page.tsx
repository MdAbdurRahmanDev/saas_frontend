"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState } from 'react';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const DiamondIcon = () => (
  <span className="text-cyan-400 font-bold text-lg">💎</span>
);
const BeanIcon = () => (
  <span className="text-yellow-400 font-bold text-lg">🟡</span>
);

export default function BalanceAddPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState<any>(null); // null when not searched
  const [activeTab, setActiveTab] = useState<'increase' | 'decrease'>('increase');
  
  // Form states
  const [diamondAmount, setDiamondAmount] = useState('');
  const [beanAmount, setBeanAmount] = useState('');

  // Mock Handle Search (Will connect to API later)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/search?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedUser(data);
      } else {
        alert("User not found!");
        setSearchedUser(null);
      }
    } catch (error) {
      console.error("Error searching user:", error);
      alert("Error connecting to server");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedUser) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/balance/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_uuid: searchedUser.id,
          action: activeTab,
          diamond_amount: parseInt(diamondAmount || '0', 10),
          bean_amount: parseInt(beanAmount || '0', 10),
          admin_email: "admin@livestream.com" // Mock admin email for now
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Success! Transaction ID: ${data.trx_id}`);
        setDiamondAmount('');
        setBeanAmount('');
        // Refresh user data silently to show updated balance
        handleSearch(new Event('submit') as any);
      } else {
        const err = await response.text();
        alert(`Error: ${err}`);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Error updating balance");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Manage Balance</h1>
        <p className="text-gray-400 text-sm">Search for a user by UUID or Email to increase or decrease their Diamonds and Beans.</p>
      </div>

      {/* Search Section */}
      <div className="bg-[#151520] border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/5 blur-[80px]"></div>
        
        <form onSubmit={handleSearch} className="relative z-10">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search User</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter UUID or Email address..."
                className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full pl-11 p-3.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
              />
            </div>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-8 py-3.5 transition shadow-lg shadow-indigo-600/20 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* User Details & Action Area */}
      {searchedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
          
          {/* Left Column: User Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#151520] border border-gray-800 rounded-xl p-6 shadow-xl flex flex-col items-center text-center relative overflow-hidden h-full">
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
              
              <div className="relative z-10 mb-4 mt-2">
                {searchedUser.profilePic ? (
                  <img src={searchedUser.profilePic} alt={searchedUser.name} className="w-24 h-24 rounded-full object-cover border-4 border-[#0c0c1a] shadow-xl" />
                ) : (
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-[#0c0c1a] shadow-xl ${searchedUser.color}`}>
                    {searchedUser.initial}
                  </div>
                )}
              </div>
              
              <h2 className="text-lg font-bold text-white mb-1 relative z-10">{searchedUser.name}</h2>
              <p className="text-gray-400 text-sm mb-1 relative z-10">{searchedUser.email}</p>
              <div className="bg-[#0c0c1a] px-3 py-1 rounded-md border border-gray-800/50 text-xs font-mono text-gray-500 mb-6 relative z-10">
                UID: {searchedUser.id}
              </div>

              <div className="w-full grid grid-cols-2 gap-3 relative z-10 mt-auto">
                <div className="bg-[#0c0c1a] border border-gray-800 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <DiamondIcon />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Diamonds</span>
                  </div>
                  <span className="text-white font-bold text-lg">{searchedUser.diamonds}</span>
                </div>
                <div className="bg-[#0c0c1a] border border-gray-800 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <BeanIcon />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Beans</span>
                  </div>
                  <span className="text-white font-bold text-lg">{searchedUser.beans}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Manage Balance Forms */}
          <div className="lg:col-span-8">
            <div className="bg-[#151520] border border-gray-800 rounded-xl shadow-xl overflow-hidden">
              
              {/* Tabs */}
              <div className="flex border-b border-gray-800">
                <button
                  onClick={() => setActiveTab('increase')}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition relative ${
                    activeTab === 'increase' 
                      ? 'text-indigo-400 bg-indigo-500/5' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                  }`}
                >
                  Increase (+)
                  {activeTab === 'increase' && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 shadow-[0_-2px_10px_rgba(99,102,241,0.5)]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('decrease')}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition relative ${
                    activeTab === 'decrease' 
                      ? 'text-red-400 bg-red-500/5' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                  }`}
                >
                  Decrease (-)
                  {activeTab === 'decrease' && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-red-500 shadow-[0_-2px_10px_rgba(239,68,68,0.5)]"></div>
                  )}
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Diamonds Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {activeTab === 'increase' ? 'Add' : 'Deduct'} Diamonds
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DiamondIcon />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={diamondAmount}
                          onChange={(e) => setDiamondAmount(e.target.value)}
                          placeholder="e.g. 1000"
                          className="bg-[#0c0c1a] border border-gray-800 text-white text-lg font-semibold rounded-lg w-full pl-12 p-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Beans Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {activeTab === 'increase' ? 'Add' : 'Deduct'} Beans
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <BeanIcon />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={beanAmount}
                          onChange={(e) => setBeanAmount(e.target.value)}
                          placeholder="e.g. 500"
                          className="bg-[#0c0c1a] border border-gray-800 text-white text-lg font-semibold rounded-lg w-full pl-12 p-3 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!diamondAmount && !beanAmount}
                      className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                        activeTab === 'increase'
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-indigo-600/20'
                          : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-red-600/20'
                      }`}
                    >
                      {activeTab === 'increase' ? 'Confirm Addition' : 'Confirm Deduction'}
                    </button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
          
        </div>
      )}

      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}
