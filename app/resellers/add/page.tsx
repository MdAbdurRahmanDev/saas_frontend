"use client";

import React, { useState } from 'react';

export default function AddResellerPage() {
  const [uuid, setUuid] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setUserFound(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mb-2">Create New Reseller</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Search for an existing user by their UUID to upgrade their account to an official Coin Reseller.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Step 1: Find User</h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Enter User UUID (e.g., U-9823412)..."
              className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
            />
          </div>
          <button 
            type="submit"
            disabled={isSearching || !uuid.trim()}
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center min-w-[140px]"
          >
            {isSearching ? 'Searching...' : 'Search UUID'}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {userFound && (
        <div className="animate-fade-in-up space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-xl -mr-10 -mt-10"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-blue-400">👤</span> User Details
              </h2>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-blue-900/40 border-2 border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl font-bold">JD</div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-bold text-white">John Doe</h3>
                  <p className="text-sm text-gray-400 font-mono">UUID: {uuid}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Status: Active
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full blur-xl -mr-10 -mt-10"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-amber-400">💰</span> Current Wallet
              </h2>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 text-lg">🪙</span>
                    <span className="text-sm text-gray-300 font-medium">Available Coins</span>
                  </div>
                  <span className="font-bold text-white text-lg">15,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">💵</span>
                    <span className="text-sm text-gray-300 font-medium">Current Balance</span>
                  </div>
                  <span className="font-bold text-green-400 text-lg">$150.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl text-center">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Step 2: Confirmation</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-lg mx-auto">
              By approving this user as a reseller, they will be able to purchase bulk coins at wholesale rates and transfer them directly to users.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setUserFound(false)}
                className="px-6 py-3 bg-[#1f2937] text-white rounded-lg text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Approve as Reseller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
