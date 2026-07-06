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

const MOCK_HISTORY = [
  { id: 'TXN-10023', date: 'Jul 2, 2026, 10:30 AM', type: 'Gift Received', amount: '+500', currency: 'Beans', status: 'Completed' },
  { id: 'TXN-10022', date: 'Jul 1, 2026, 04:15 PM', type: 'Recharge', amount: '+1,200', currency: 'Diamonds', status: 'Completed' },
  { id: 'TXN-10021', date: 'Jun 28, 2026, 09:20 PM', type: 'Sent Gift', amount: '-150', currency: 'Diamonds', status: 'Completed' },
  { id: 'TXN-10020', date: 'Jun 25, 2026, 11:05 AM', type: 'Withdrawal', amount: '-10,000', currency: 'Beans', status: 'Pending' },
  { id: 'TXN-10019', date: 'Jun 20, 2026, 01:45 PM', type: 'Daily Reward', amount: '+50', currency: 'Beans', status: 'Completed' },
];

export default function UserWalletPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 600);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">User Wallet History</h1>
        <p className="text-[var(--text-secondary)] text-sm">Search a specific user's UID to view their transaction and wallet history.</p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-[#151520] p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-h-[150px]">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0c0c1a] border border-gray-700 text-white text-base rounded-full focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-24 py-4 placeholder-gray-500 outline-none transition shadow-inner" 
            placeholder="Enter exact User UID here..."
          />
          <button 
            type="submit"
            disabled={!searchQuery.trim() || isLoading}
            className="absolute inset-y-2 right-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : 'Search'}
          </button>
        </form>
      </div>

      {/* Search Results Area */}
      {hasSearched && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* User Profile Summary */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0c0c1a] rounded-xl border border-indigo-900/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-bl-full opacity-5 -mr-10 -mt-10 blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center space-x-5 z-10 w-full md:w-auto">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
                M
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Maya <span className="text-xs font-normal text-green-400 bg-green-900/30 px-2 py-0.5 rounded ml-2 border border-green-800/50">ACTIVE</span></h2>
                <div className="text-gray-400 text-sm mt-1 flex items-center">
                  <UserIcon /> <span className="ml-1.5 font-mono text-gray-300">{searchQuery || '0053434'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto z-10">
              <div className="bg-[#151520] border border-gray-800 rounded-lg px-5 py-3 flex-1 md:min-w-[140px] text-center md:text-left">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Current Diamonds</div>
                <div className="text-xl font-bold text-cyan-400">1,200 <span className="text-xs">💎</span></div>
              </div>
              <div className="bg-[#151520] border border-gray-800 rounded-lg px-5 py-3 flex-1 md:min-w-[140px] text-center md:text-left">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Current Beans</div>
                <div className="text-xl font-bold text-yellow-400">5,000 <span className="text-xs">🟡</span></div>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-[#151520] rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0c0c1a] gap-4 md:gap-0">
              <h3 className="font-semibold text-white">Transaction History</h3>
              
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="flex items-center space-x-2 bg-[#151520] border border-gray-800 rounded-lg px-3 py-1.5 w-full md:w-auto">
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Filter Date:</span>
                  <input 
                    type="date" 
                    className="bg-transparent border-none text-xs text-gray-300 outline-none w-full md:w-auto [color-scheme:dark]"
                  />
                </div>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition whitespace-nowrap bg-indigo-900/20 px-3 py-1.5 rounded-lg border border-indigo-900/50">
                  Export CSV
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-sm text-gray-300 min-w-[600px]">
                <thead className="text-xs text-gray-500 uppercase bg-[#0c0c1a]/50 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Transaction ID</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Date & Time</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Type</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Amount</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_HISTORY.map((txn, index) => (
                    <tr key={index} className="border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-400 whitespace-nowrap">{txn.id}</td>
                      <td className="px-6 py-4 text-xs whitespace-nowrap">{txn.date}</td>
                      <td className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">{txn.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold ${txn.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {txn.amount}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">{txn.currency}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-sm border ${
                          txn.status === 'Completed' 
                            ? 'bg-green-900/30 text-green-400 border-green-800/50' 
                            : 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile History Cards */}
            <div className="lg:hidden p-4 space-y-3 hidden">
                {/* Handled by CSS to show/hide table, but we can just let table scroll horizontally on mobile for financial records */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
