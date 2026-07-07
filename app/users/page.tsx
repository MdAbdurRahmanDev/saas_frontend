"use client";
import { API_BASE_URL } from '@/utils/api';


import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  initial: string;
  status: string;
  screenshot: boolean;
  level: string;
  joined: string;
  diamonds: string;
  beans: string;
  color: string;
  profilePic: string;
  banReason?: string;
}


import React, { useState, useEffect } from 'react';

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
const EditIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [screenshotFilter, setScreenshotFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Delete Modal States
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<any>(null);

  // Ban Modal States
  const [banUserId, setBanUserId] = useState<string | null>(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [banReasonInput, setBanReasonInput] = useState('');

  // ১. ব্যাকএন্ড থেকে ডাইনামিক ডেটা লোড করা হচ্ছে 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data || []);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ডাইনামিক ফিল্টারিং লজিক (নাম, ইমেইল, UUID, স্ট্যাটাস, স্ক্রিনশট এবং লেভেল অনুযায়ী)
  const filteredUsers = users.filter((user) => {
    // Search Query (Case Insensitive)
    const matchesSearch = 
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status Filter
    const matchesStatus = activeFilter === 'All' || user.status.toLowerCase() === activeFilter.toLowerCase();
    
    // Screenshot Filter
    const matchesScreenshot = screenshotFilter === 'All' 
      ? true 
      : screenshotFilter === 'Screenshot ON' 
        ? user.screenshot 
        : !user.screenshot;
        
    // Date Filter (Optional for now)
    const matchesDate = dateFilter === '' || user.joined === dateFilter; // Date matching logic depends on format
    
    // Level Filter
    const matchesLevel = levelFilter === 'All Levels' || user.level === levelFilter;
    
    return matchesSearch && matchesStatus && matchesScreenshot && matchesDate && matchesLevel;
  });

  const toggleScreenshot = async (id: string, currentStatus: boolean) => {
    // Optimistic update in UI using functional state
    const newStatus = !currentStatus;
    setUsers(prev => prev.map(u => u.id === id ? { ...u, screenshot: newStatus } : u));
    
    // ব্যাকএন্ডে API কল করে ডেটাবেস আপডেট করা হচ্ছে
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: id, screenshot: newStatus })
      });
      
      if (!response.ok) {
        // ফেইল করলে আগের অবস্থায় ফেরত আনা
        setUsers(prev => prev.map(u => u.id === id ? { ...u, screenshot: currentStatus } : u));
        console.error("Failed to update screenshot status");
      }
    } catch (error) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, screenshot: currentStatus } : u));
      console.error("Error connecting to server:", error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${deleteUserId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setUsers(prev => prev.filter(u => u.id !== deleteUserId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
  };

  const handleEditClick = (user: User) => {
    setEditUserData({
      ...user,
      password: '',
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUserData) return;

    try {
      const formData = new FormData();
      formData.append('username', editUserData.name);
      formData.append('email', editUserData.email);
      if (editUserData.password) formData.append('password', editUserData.password);
      formData.append('status', editUserData.status);
      formData.append('userLevel', editUserData.level.replace('LV.', ''));
      formData.append('diamonds', editUserData.diamonds);
      formData.append('beans', editUserData.beans);

      const response = await fetch(`${API_BASE_URL}/api/users/${editUserData.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // Refetch users to get the latest data
        const refreshResponse = await fetch(`${API_BASE_URL}/api/users`);
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setUsers(data || []);
        }
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to edit user");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleBanClick = (id: string, currentStatus: string) => {
    if (currentStatus === 'BANNED') {
      // Direct unban
      handleBanSubmit(id, 'unban', '');
    } else {
      // Open modal for ban
      setBanUserId(id);
      setBanReasonInput('');
      setIsBanModalOpen(true);
    }
  };

  const handleBanSubmit = async (id: string, action: 'ban' | 'unban', reason: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason }),
      });
      if (response.ok) {
        setUsers(prev => prev.map(u => {
          if (u.id === id) {
            return {
              ...u,
              status: action === 'ban' ? 'BANNED' : 'ACTIVE',
              banReason: reason
            };
          }
          return u;
        }));
      }
    } catch (error) {
      console.error("Error updating ban status:", error);
    }
    setIsBanModalOpen(false);
    setBanUserId(null);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
          <p className="text-[var(--text-secondary)] text-sm">Manage and monitor platform users ({users.length} total).</p>
        </div>
        <Link href="/users/add" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add New User
        </Link>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 placeholder-gray-500 outline-none transition" 
              placeholder="Search by UUID, Name, or Email..."
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
              <select 
                value={screenshotFilter} 
                onChange={(e) => setScreenshotFilter(e.target.value)}
                className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500"
              >
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
              <select 
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-md w-full p-2 outline-none focus:border-indigo-500"
              >
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors ${user.status === 'BANNED' ? 'bg-red-900/10' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt={user.name} className="w-9 h-9 rounded-full object-cover shadow-sm border border-gray-700/50" />
                      ) : (
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg ${user.color}`}>
                          {user.initial}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{user.id}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-sm border ${user.status === 'BANNED' ? 'bg-red-900/30 text-red-400 border-red-800/50' : 'bg-green-900/30 text-green-400 border-green-800/50'}`}>
                      {user.status}
                    </span>
                    {user.status === 'BANNED' && user.banReason && (
                      <div className="text-[10px] text-red-400/80 mt-1 max-w-[120px] truncate" title={user.banReason}>
                        {user.banReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleScreenshot(user.id, user.screenshot)}
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
                      <button 
                        onClick={() => handleBanClick(user.id, user.status)}
                        className={`${user.status === 'BANNED' ? 'text-green-500 hover:text-green-400' : 'text-red-500 hover:text-red-400'} text-xs font-bold transition`}
                      >
                        {user.status === 'BANNED' ? 'UNBAN' : 'BAN'}
                      </button>
                      <Link href={`/users/${user.id}/history`} className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">History</Link>
                      <button onClick={() => handleEditClick(user)} className="transition"><EditIcon /></button>
                      <button onClick={() => handleDeleteClick(user.id)} className="text-gray-500 hover:text-red-500 transition"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="lg:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className={`p-4 rounded-xl border border-gray-800 flex flex-col space-y-4 relative overflow-hidden ${user.status === 'BANNED' ? 'bg-[#1a1012]' : 'bg-[#151520]'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 shadow-inner border border-gray-700/50" />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-inner ${user.color}`}>
                    {user.initial}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white text-base leading-tight">{user.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1">UID: {user.id}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${user.status === 'BANNED' ? 'bg-red-900/30 text-red-400 border-red-800/50' : 'bg-green-900/30 text-green-400 border-green-800/50'}`}>
                  {user.status}
                </span>
                {user.banReason && user.status === 'BANNED' && (
                  <span className="text-[9px] text-red-500/70 mt-1 truncate max-w-[100px]">{user.banReason}</span>
                )}
              </div>
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
                  onClick={() => toggleScreenshot(user.id, user.screenshot)}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors mt-1 ${user.screenshot ? 'bg-indigo-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${user.screenshot ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleBanClick(user.id, user.status)}
                  className={`${user.status === 'BANNED' ? 'text-green-500' : 'text-red-500'} text-xs font-bold uppercase tracking-wide`}
                >
                  {user.status === 'BANNED' ? 'UNBAN' : 'BAN'}
                </button>
                <Link href={`/users/${user.id}/history`} className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">History</Link>
                <button onClick={() => handleEditClick(user)} className="text-gray-400 hover:text-white"><EditIcon /></button>
                <button onClick={() => handleDeleteClick(user.id)} className="text-gray-400 hover:text-white"><TrashIcon /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#151520] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl mx-4">
            <h3 className="text-lg font-bold text-white mb-2 text-center">Are you sure?</h3>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Do you really want to delete this user? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 bg-[#0c0c1a] border border-gray-700 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-red-600/20 border border-red-500/50 text-red-500 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editUserData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
          <div className="bg-[#151520] border border-gray-800 rounded-xl p-6 w-full max-w-2xl shadow-2xl mx-4 relative">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6">Edit User Profile</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Username</label>
                  <input type="text" value={editUserData.name} onChange={(e) => setEditUserData({...editUserData, name: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                  <input type="email" value={editUserData.email} onChange={(e) => setEditUserData({...editUserData, email: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">New Password (Optional)</label>
                  <input type="password" placeholder="Leave blank to keep current" value={editUserData.password || ''} onChange={(e) => setEditUserData({...editUserData, password: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Status</label>
                  <select value={editUserData.status} onChange={(e) => setEditUserData({...editUserData, status: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BANNED">BANNED</option>
                    <option value="DEACTIVE">DEACTIVE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">User Level</label>
                  <input type="number" value={editUserData.level.replace('LV.', '')} onChange={(e) => setEditUserData({...editUserData, level: `LV.${e.target.value}`})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" min="0" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Diamonds</label>
                  <input type="number" value={editUserData.diamonds} onChange={(e) => setEditUserData({...editUserData, diamonds: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Beans</label>
                  <input type="number" value={editUserData.beans} onChange={(e) => setEditUserData({...editUserData, beans: e.target.value})} className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-2.5 outline-none focus:border-indigo-500" required />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent border border-gray-700 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ban Reason Modal */}
      {isBanModalOpen && banUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-4">
          <div className="bg-[#151520] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 text-center text-red-500">Ban User</h3>
            <p className="text-sm text-gray-400 mb-4 text-center">
              Are you sure you want to ban this user? You can provide an optional reason below.
            </p>
            
            <textarea
              value={banReasonInput}
              onChange={(e) => setBanReasonInput(e.target.value)}
              placeholder="Reason for banning (optional)"
              className="bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg w-full p-3 outline-none focus:border-red-500/50 resize-none h-24 mb-6"
            />
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsBanModalOpen(false)}
                className="flex-1 py-2.5 bg-[#0c0c1a] border border-gray-700 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleBanSubmit(banUserId, 'ban', banReasonInput)}
                className="flex-1 py-2.5 bg-red-600/20 border border-red-500/50 text-red-500 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
