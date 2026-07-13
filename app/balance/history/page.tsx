"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState, useEffect } from 'react';

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

export default function BalanceHistoryPage() {
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
    fetchHistory();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, currencyFilter, startDate, endDate]);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/balance/history`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading History...</div>;
  }

  // Filter Logic
  const filteredHistory = history.filter(record => {
    // Search query matches TRX ID, Admin Email, User Name, or UUID
    const matchesSearch = 
      !searchQuery || 
      record.trx_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.admin_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.target_user_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.target_user_uuid.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Balance History</h1>
          <p className="text-sm text-gray-400">Track all manual balance adjustments made by admins.</p>
        </div>
        <button 
          onClick={fetchHistory}
          className="mt-4 sm:mt-0 bg-[#151520] border border-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-[#151520] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search TRX ID, Admin, or User..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0c1a] border border-gray-800 text-white text-sm rounded-lg pl-10 p-2.5 outline-none focus:border-indigo-500"
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

      {/* Desktop Table */}
      <div className="hidden lg:block bg-[#151520] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-500 uppercase bg-[#0c0c1a] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Trx ID</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Admin (IP)</th>
                <th className="px-6 py-4 font-semibold">Target User</th>
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
                    <div className="text-white font-semibold">{record.target_user_name || "Unknown"}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">UID: {record.target_user_uuid}</div>
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
                      <span className={`font-bold ${record.transaction_type === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                        {record.transaction_type === 'increase' ? '+' : '-'}{record.amount}
                      </span>
                      {record.currency_type === 'diamonds' ? <DiamondIcon /> : <BeanIcon />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-800/50 uppercase">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
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
            
            <div className="grid grid-cols-2 gap-4 text-sm pt-1">
              <div>
                <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5">Admin</span>
                <div className="text-gray-300 truncate text-xs">{record.admin_email}</div>
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5">User</span>
                <div className="text-gray-300 truncate text-xs">{record.target_user_name || record.target_user_uuid}</div>
              </div>
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
          <div className="bg-[#151520] p-6 rounded-xl border border-gray-800 text-center text-gray-500">
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
