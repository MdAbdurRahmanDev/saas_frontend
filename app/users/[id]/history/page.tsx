"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Icons
const DiamondIcon = () => (
  <span className="text-cyan-400 font-bold">💎</span>
);
const BeanIcon = () => (
  <span className="text-yellow-400 font-bold">🟡</span>
);

interface HistoryRecord {
  trx_id: string;
  admin_email: string;
  admin_ip: string;
  target_user_uuid: string;
  target_user_name: string;
  transaction_type: string;
  currency_type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  diamonds: number;
  beans: number;
  color: string;
  initial: string;
}

export default function UserHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currencyFilter, setCurrencyFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [resolvedParams.id]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, currencyFilter, startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch user profile for running balance
      const userRes = await fetch(`${API_BASE_URL}/api/users/search?q=${resolvedParams.id}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        setUserProfile(userData);
      }

      // Fetch user history
      const historyRes = await fetch(`${API_BASE_URL}/api/users/${resolvedParams.id}/history`);
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setHistory(historyData || []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading User History...</div>;
  }

  if (!userProfile) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-white font-bold mb-4">User not found</h2>
        <Link href="/users" className="text-indigo-400 hover:text-indigo-300 underline">Back to Users</Link>
      </div>
    );
  }

  // Filter Logic
  const filteredHistory = history.filter(record => {
    const matchesSearch = 
      !searchQuery || 
      record.trx_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.admin_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || record.transaction_type.toLowerCase() === typeFilter.toLowerCase();
    const matchesCurrency = currencyFilter === 'All' || record.currency_type.toLowerCase() === currencyFilter.toLowerCase();

    // Date Filters
    let matchesStartDate = true;
    let matchesEndDate = true;
    
    if (startDate) {
      matchesStartDate = new Date(record.created_at) >= new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesEndDate = new Date(record.created_at) <= end;
    }

    return matchesSearch && matchesType && matchesCurrency && matchesStartDate && matchesEndDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4 mb-2">
        <Link href="/users" className="bg-[#151520] hover:bg-[#1f1f2e] text-gray-400 p-2 rounded-lg border border-gray-800 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">User Wallet History</h1>
          <p className="text-sm text-gray-400">Detailed transaction log and current running balance.</p>
        </div>
      </div>

      {/* User Info & Running Balance Card */}
      <div className="bg-[#151520] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center space-x-4">
          {userProfile.profilePic ? (
            <img src={userProfile.profilePic} alt={userProfile.name} className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-gray-700" />
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-gray-700 ${userProfile.color}`}>
              {userProfile.initial}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">{userProfile.name}</h2>
            <div className="text-gray-400 text-sm">{userProfile.email}</div>
            <div className="text-indigo-400/80 font-mono text-xs mt-1 bg-indigo-900/20 px-2 py-0.5 rounded inline-block border border-indigo-900/50">
              UID: {userProfile.id}
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none bg-[#0c0c1a] border border-gray-800 rounded-xl p-4 min-w-[160px] shadow-inner relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">💎</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Running Diamonds</div>
            <div className="text-2xl font-bold text-cyan-400">{userProfile.diamonds}</div>
          </div>
          <div className="flex-1 lg:flex-none bg-[#0c0c1a] border border-gray-800 rounded-xl p-4 min-w-[160px] shadow-inner relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">🟡</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Running Beans</div>
            <div className="text-2xl font-bold text-yellow-400">{userProfile.beans}</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[#151520] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 mt-8">
        <div className="flex-1 relative">
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search TRX ID or Admin..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg pl-10 p-2.5 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500"
            />
            <span className="text-gray-500 self-center">to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="increase">Increase (+)</option>
              <option value="decrease">Decrease (-)</option>
            </select>
          </div>
          <div>
            <select 
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#0c0c1a] border border-gray-800 text-gray-300 text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500"
            >
              <option value="All">All Currencies</option>
              <option value="diamonds">Diamonds 💎</option>
              <option value="beans">Beans 🟡</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Data Table (Desktop) */}
      <div className="hidden lg:block bg-[#151520] rounded-xl border border-gray-800 overflow-hidden shadow-xl mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-[#0c0c1a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Trx ID</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Admin (IP)</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.map((record, index) => (
                <tr key={`${record.trx_id}-${index}`} className="border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-indigo-400 font-bold">
                    {record.trx_id}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold text-xs">{record.admin_email}</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">{record.admin_ip}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-sm border uppercase ${
                      record.transaction_type === 'increase' 
                        ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800/50' 
                        : 'bg-red-900/30 text-red-400 border-red-800/50'
                    }`}>
                      {record.transaction_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5">
                      <span className={`font-bold text-sm ${record.transaction_type === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                        {record.transaction_type === 'increase' ? '+' : '-'}{record.amount}
                      </span>
                      {record.currency_type === 'diamonds' ? <DiamondIcon /> : <BeanIcon />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-800/50 uppercase tracking-wider">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Cards (Mobile) */}
      <div className="lg:hidden space-y-4 mt-4">
        {paginatedHistory.map((record, index) => (
          <div key={`${record.trx_id}-${index}`} className="bg-[#151520] p-4 rounded-xl border border-gray-800 flex flex-col space-y-3 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start border-b border-gray-800 pb-3">
              <div>
                <div className="font-mono text-xs text-indigo-400 font-bold mb-1">{record.trx_id}</div>
                <div className="text-[10px] text-gray-400">{new Date(record.created_at).toLocaleString()}</div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                record.transaction_type === 'increase' 
                  ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800/50' 
                  : 'bg-red-900/30 text-red-400 border-red-800/50'
              }`}>
                {record.transaction_type}
              </span>
            </div>
            
            <div className="pt-1">
              <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5">Processed By Admin</span>
              <div className="text-gray-300 truncate text-xs">{record.admin_email}</div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-800/50">
              <span className="bg-green-900/30 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded border border-green-800/50 uppercase">
                {record.status}
              </span>
              <div className="flex items-center space-x-1.5 text-base">
                <span className={`font-bold ${record.transaction_type === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                  {record.transaction_type === 'increase' ? '+' : '-'}{record.amount}
                </span>
                {record.currency_type === 'diamonds' ? <DiamondIcon /> : <BeanIcon />}
              </div>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="bg-[#151520] p-6 rounded-xl border border-gray-800 text-center text-gray-500 mt-4">
            No transactions found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#151520] border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[#151520] border border-gray-800 text-gray-400 hover:bg-[#1a1a2e]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#151520] border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
