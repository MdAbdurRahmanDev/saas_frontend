"use client";

import React, { useState } from 'react';

// Icons
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const MOCK_USERS = [
  { id: '0053434', name: 'Maya', email: 'hirach009900@gmail.com', initial: 'S', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/2/2026', diamonds: '1,200', beans: '5,000', color: 'bg-indigo-500' },
  { id: '3355940', name: 'sumona', email: 'baminur477@gmail.com', initial: 's', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/2/2026', diamonds: '340', beans: '1,100', color: 'bg-gray-600' },
  { id: '1936819', name: 'Alex Zihad', email: 'alexzihad087@gmail.com', initial: 'A', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/2/2026', diamonds: '0', beans: '0', color: 'bg-green-600' },
  { id: '4473869', name: '꧁༺অপেক্ষা༻꧂', email: 'nilelamjoy84@gmail.com', initial: 'অ', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/2/2026', diamonds: '50', beans: '200', color: 'bg-red-900' },
  { id: '8754853', name: '▪️SDK ☘️ kajol', email: 'aktershatu97@gmail.com', initial: 'k', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/1/2026', diamonds: '12,000', beans: '45,000', color: 'bg-yellow-600' },
  { id: '2092056', name: '꧁AT. Singer Chaity Khan', email: 'putulkhanputul92@gmail.com', initial: 'C', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/1/2026', diamonds: '400', beans: '3,000', color: 'bg-pink-600' },
  { id: '8482444', name: 'Ismail Sara', email: 'ismailsara025@gmail.com', initial: 'I', status: 'ACTIVE', screenshot: true, level: 'LV.0', joined: '7/1/2026', diamonds: '0', beans: '120', color: 'bg-purple-600' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleScreenshot = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, screenshot: !u.screenshot } : u));
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
        <p className="text-[var(--text-secondary)] text-sm">Manage and monitor platform users (956 total).</p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#151520] p-4 rounded-xl border border-gray-800 flex flex-col space-y-4">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div className="relative w-full xl:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 placeholder-gray-500 outline-none transition" 
              placeholder="Paste User UID (UUID) here to search..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0 hide-scrollbar">
            {['All', 'Active', 'Banned', 'Deactivated'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === filter 
                    ? 'bg-white text-black' 
                    : 'bg-[#1f1f2e] text-gray-400 hover:bg-[#2a2a3c] hover:text-white border border-gray-800'
                }`}
              >
                {filter}
              </button>
            ))}
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-900/30 text-indigo-400 border border-indigo-900/50 rounded-full text-xs font-semibold hover:bg-indigo-900/50 transition-colors ml-auto xl:ml-2"
            >
              <FilterIcon />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Screenshot Status</label>
              <select className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500">
                <option>All</option>
                <option>Screenshot ON</option>
                <option>Screenshot OFF</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Join Date</label>
              <input type="date" className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Sort By Date</label>
              <select className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Level</label>
              <select className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500">
                <option>All Levels</option>
                <option>LV.0</option>
                <option>LV.1+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-[#151520] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-[#0c0c1a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">UID</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Screenshot</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold">Diamonds</th>
                <th className="px-6 py-4 font-semibold">Beans</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg ${user.color}`}>
                        {user.initial}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{user.id}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-sm border border-green-800/50">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleScreenshot(user.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${user.screenshot ? 'bg-indigo-500' : 'bg-gray-600'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${user.screenshot ? 'translate-x-4.5' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-semibold">{user.level}</td>
                  <td className="px-6 py-4 text-cyan-400 font-semibold text-xs">{user.diamonds} <span className="text-gray-600 text-[10px]">💎</span></td>
                  <td className="px-6 py-4 text-yellow-400 font-semibold text-xs">{user.beans} <span className="text-gray-600 text-[10px]">🟡</span></td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-red-500 text-xs font-bold hover:text-red-400 transition">BAN</button>
                      <button className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">History</button>
                      <button className="text-gray-400 text-xs hover:text-white transition">Edit</button>
                      <button className="text-gray-500 hover:text-red-500 transition"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards (App-like feel) */}
      <div className="lg:hidden space-y-3 pb-6">
        {users.map((user) => (
          <div key={user.id} className="bg-[#151520] border border-gray-800 rounded-xl p-4 flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-inner ${user.color}`}>
                  {user.initial}
                </div>
                <div>
                  <div className="font-semibold text-white text-base leading-tight">{user.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1">UID: {user.id}</div>
                </div>
              </div>
              <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded border border-green-800/50">
                {user.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 py-2 border-y border-gray-800/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Level</span>
                <span className="text-xs text-gray-300">{user.level}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Joined</span>
                <span className="text-xs text-gray-300">{user.joined}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Diamonds</span>
                <span className="text-xs text-cyan-400 font-semibold">{user.diamonds} 💎</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Beans</span>
                <span className="text-xs text-yellow-400 font-semibold">{user.beans} 🟡</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-semibold">Screenshot</span>
                <button 
                  onClick={() => toggleScreenshot(user.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${user.screenshot ? 'bg-indigo-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${user.screenshot ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-red-500 text-xs font-bold uppercase tracking-wide">Ban</button>
                <button className="text-indigo-400 text-xs font-semibold">History</button>
                <button className="text-gray-400 hover:text-white"><TrashIcon /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
