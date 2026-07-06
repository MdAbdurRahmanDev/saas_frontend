"use client";

import React, { useState } from 'react';

// Icons
const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MOCK_GLOBAL_HISTORY = [
  { id: 'TXN-90234', user: 'Maya (0053434)', date: 'Jul 2, 2026, 10:30 AM', type: 'System Recharge', amount: '+500', currency: 'Diamonds', admin: 'Admin_Joy', status: 'Completed' },
  { id: 'TXN-90233', user: 'sumona (3355940)', date: 'Jul 2, 2026, 09:15 AM', type: 'Gift Received', amount: '+1,200', currency: 'Beans', admin: 'Auto', status: 'Completed' },
  { id: 'TXN-90232', user: 'Alex Zihad (1936819)', date: 'Jul 1, 2026, 08:20 PM', type: 'System Deduction', amount: '-150', currency: 'Diamonds', admin: 'Admin_Joy', status: 'Completed' },
  { id: 'TXN-90231', user: 'Ismail Sara (8482444)', date: 'Jul 1, 2026, 11:05 AM', type: 'Withdrawal', amount: '-10,000', currency: 'Beans', admin: 'Finance_Team', status: 'Pending' },
  { id: 'TXN-90230', user: 'kajol (8754853)', date: 'Jun 30, 2026, 01:45 PM', type: 'Event Reward', amount: '+5,000', currency: 'Beans', admin: 'Auto', status: 'Completed' },
  { id: 'TXN-90229', user: 'Singer Chaity (2092056)', date: 'Jun 30, 2026, 10:10 AM', type: 'System Recharge', amount: '+100', currency: 'Diamonds', admin: 'Admin_Root', status: 'Completed' },
];

export default function BalanceHistoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Platform Balance History</h1>
          <p className="text-[var(--text-secondary)] text-sm">Comprehensive log of all platform-wide balance transactions.</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-cyan-900/20 border border-cyan-900/50 rounded-lg px-4 py-2 flex flex-col">
            <span className="text-[10px] text-cyan-400 font-bold uppercase">Total Diamonds Flow</span>
            <span className="text-lg font-bold text-white">24.5k <span className="text-sm">💎</span></span>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg px-4 py-2 flex flex-col">
            <span className="text-[10px] text-yellow-400 font-bold uppercase">Total Beans Flow</span>
            <span className="text-lg font-bold text-white">1.2M <span className="text-sm">🟡</span></span>
          </div>
        </div>
      </div>

      {/* Control Panel (Search & Filters) */}
      <div className="bg-[#151520] p-4 rounded-xl border border-gray-800 flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          <div className="relative w-full lg:w-[350px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 placeholder-gray-500 outline-none transition" 
              placeholder="Search by User Name, UID, or TXN ID..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
            {['All', 'Diamonds', 'Beans', 'Recharges', 'Withdrawals'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-black' 
                    : 'bg-[#1f1f2e] text-gray-400 hover:bg-[#2a2a3c] hover:text-white border border-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-1 px-3 py-1.5 border rounded-full text-xs font-semibold transition-colors ml-auto lg:ml-2 ${
                showFilters 
                  ? 'bg-indigo-900/50 text-indigo-300 border-indigo-700' 
                  : 'bg-indigo-900/30 text-indigo-400 border-indigo-900/50 hover:bg-indigo-900/50'
              }`}
            >
              <FilterIcon />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters Dropdown */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Start Date</label>
              <input type="date" className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">End Date</label>
              <input type="date" className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Transaction Type</label>
              <select className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500">
                <option>All Types</option>
                <option>System Recharge</option>
                <option>System Deduction</option>
                <option>Gift Received / Sent</option>
                <option>Withdrawal</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
              <select className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-white text-black hover:bg-gray-200 text-sm font-bold py-2 rounded-md transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div className="bg-[#151520] rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#0c0c1a]">
          <h3 className="font-semibold text-white">Records</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition border border-indigo-900/50 bg-indigo-900/20 px-3 py-1.5 rounded-lg">Export CSV</button>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300 min-w-[800px]">
            <thead className="text-[11px] text-gray-500 uppercase bg-[#0c0c1a]/50 border-b border-gray-800 tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">TXN ID & Date</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">User (Name & UID)</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Type & Admin</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-right">Amount</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_GLOBAL_HISTORY.map((txn, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="font-mono text-xs text-indigo-400 font-semibold">{txn.id}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{txn.date}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="font-semibold text-gray-200">{txn.user}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-300">{txn.type}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">By: <span className="text-gray-400">{txn.admin}</span></div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <div className={`font-bold text-base flex items-center justify-end gap-1 ${txn.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {txn.amount} 
                      <span className="text-sm">{txn.currency === 'Diamonds' ? '💎' : '🟡'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      txn.status === 'Completed' 
                        ? 'bg-green-900/20 text-green-400 border-green-800/40' 
                        : 'bg-yellow-900/20 text-yellow-400 border-yellow-800/40'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
