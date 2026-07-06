"use client";

import React, { useState } from 'react';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const DiamondIcon = () => (
  <span className="text-sm">💎</span>
);
const BeanIcon = () => (
  <span className="text-sm">🟡</span>
);

export default function AddBalancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('Diamonds');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSuccess(false);
    setIsLoading(true);
    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 600);
  };

  const handleAddBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    setSuccess(true);
    setAmount('');
    setNote('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Add Balance</h1>
        <p className="text-[var(--text-secondary)] text-sm">Search user by UUID to add Diamonds or Beans to their wallet.</p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-[#151520] p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-h-[150px] shadow-sm">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0c0c1a] border border-gray-700 text-white text-base rounded-full focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-24 py-4 placeholder-gray-500 outline-none transition shadow-inner" 
            placeholder="Enter exact User UUID here..."
          />
          <button 
            type="submit"
            disabled={!searchQuery.trim() || isLoading}
            className="absolute inset-y-2 right-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : 'Find User'}
          </button>
        </form>
      </div>

      {/* Results & Add Balance Form */}
      {hasSearched && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* User Full Details Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0c0c1a] rounded-xl border border-indigo-900/50 p-6 flex flex-col relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-bl-full opacity-5 -mr-10 -mt-10 blur-3xl pointer-events-none"></div>
              
              <h3 className="font-semibold text-white mb-6 flex items-center"><UserIcon /> <span className="ml-2">User Details</span></h3>
              
              <div className="flex flex-col items-center mb-6 z-10">
                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-500/20 mb-4 border-4 border-[#0c0c1a]">
                  M
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Maya</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 font-mono text-sm">{searchQuery || '0053434'}</span>
                  <span className="text-[10px] font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded border border-green-800/50">ACTIVE</span>
                </div>
              </div>

              <div className="flex-1"></div>
              
              <div className="bg-[#151520] border border-gray-800 rounded-lg p-4 w-full z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 border-r border-gray-800">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Current Diamonds</span>
                    <span className="text-xl font-bold text-cyan-400 flex items-center gap-1">1,200 <DiamondIcon /></span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Current Beans</span>
                    <span className="text-xl font-bold text-yellow-400 flex items-center gap-1">5,000 <BeanIcon /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Balance Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#151520] rounded-xl border border-gray-800 p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Recharge Wallet</h3>
              
              {success && (
                <div className="mb-6 bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg flex items-center space-x-2 animate-in fade-in zoom-in duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm font-semibold">Balance successfully added to user!</span>
                </div>
              )}

              <form onSubmit={handleAddBalance} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Currency Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setCurrency('Diamonds')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 transition-all ${
                        currency === 'Diamonds' 
                          ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                          : 'bg-[#0c0c1a] border-gray-800 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <DiamondIcon />
                      <span className="font-semibold">Diamonds</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCurrency('Beans')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 transition-all ${
                        currency === 'Beans' 
                          ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]' 
                          : 'bg-[#0c0c1a] border-gray-800 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <BeanIcon />
                      <span className="font-semibold">Beans</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Amount to Add</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-xl font-bold text-gray-500">+</span>
                    </div>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="bg-[#0c0c1a] border border-gray-700 text-white text-lg font-semibold rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 placeholder-gray-600 outline-none transition"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Remarks / Notes (Optional)</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="E.g., Event reward, manual top-up..."
                    className="bg-[#0c0c1a] border border-gray-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 placeholder-gray-600 outline-none transition custom-scrollbar"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-lg shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
                  >
                    Confirm Recharge
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
