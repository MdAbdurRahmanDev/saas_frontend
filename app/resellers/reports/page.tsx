"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';

export default function ResellerReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUuid, setSearchUuid] = useState('');
  
  // Date filtering
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      // Assuming GET /api/reseller/reports returns all transaction history for resellers
      const res = await fetch(`${API_BASE_URL}/api/reseller/reports`);
      if (res.ok) {
        const data = await res.json();
        setReports(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter the reports based on search UUID and date range locally
  const filteredReports = reports.filter(r => {
    // Search filter (Match UUID or Reseller Code)
    const matchesSearch = searchUuid === '' || 
                          r.uuid?.toLowerCase().includes(searchUuid.toLowerCase()) ||
                          r.reseller_code?.toLowerCase().includes(searchUuid.toLowerCase());
    
    // Date filter
    let matchesDate = true;
    if (startDate && endDate) {
      const trxDate = new Date(r.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = trxDate >= start && trxDate <= end;
    }

    return matchesSearch && matchesDate;
  });

  // Calculate totals for the stats cards
  const totalTransactions = filteredReports.length;
  const totalDiamonds = filteredReports.filter(r => r.currency_type === 'diamonds').reduce((sum, r) => sum + r.amount, 0);
  const totalBeans = filteredReports.filter(r => r.currency_type === 'beans').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Reseller Transaction Reports</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Track coin deposits to all resellers and view detailed transaction history.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export/Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm flex flex-col md:flex-row gap-5 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Search Reseller</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              value={searchUuid}
              onChange={(e) => setSearchUuid(e.target.value)}
              placeholder="Search by UUID or Reseller Code..."
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all font-mono"
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date Range</label>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-3 text-sm text-gray-300 focus:outline-none focus:border-amber-500" 
            />
            <span className="text-gray-500">to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-3 py-3 text-sm text-gray-300 focus:outline-none focus:border-amber-500" 
            />
          </div>
        </div>
        <button 
          onClick={() => { setStartDate(''); setEndDate(''); setSearchUuid(''); }}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors h-[46px] whitespace-nowrap w-full md:w-auto"
        >
          Reset Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 relative z-10">Total Transactions</div>
          <div className="text-2xl font-bold text-white relative z-10">{totalTransactions}</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 relative z-10">Total Diamonds Deposited</div>
          <div className="text-2xl font-bold text-cyan-400 relative z-10">{totalDiamonds.toLocaleString()} <span className="text-sm">💎</span></div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 relative z-10">Total Beans Deposited</div>
          <div className="text-2xl font-bold text-yellow-500 relative z-10">{totalBeans.toLocaleString()} <span className="text-sm">🪙</span></div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#18181b]">
          <h3 className="font-bold text-white">Reseller Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading reports...</div>
          ) : filteredReports.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No transactions found for the selected filters.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reseller Profile</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Trx ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount Added</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredReports.map((row) => (
                  <tr key={row._id || row.id} className="hover:bg-[#1f1f23] transition-colors">
                    <td className="px-6 py-4 text-gray-300 text-sm whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {row.profile_pic ? (
                          <img src={row.profile_pic} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                            {row.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white text-sm">{row.name}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">UUID: {row.uuid}</div>
                          <div className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">
                            Code: <span className="text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">{row.reseller_code}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      {row.trx_id}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${row.currency_type === 'diamonds' ? 'text-cyan-400' : 'text-yellow-500'}`}>
                      +{row.amount?.toLocaleString()} {row.currency_type === 'diamonds' ? '💎' : '🪙'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/resellers/profile?id=${row.reseller_id}`}>
                        <button className="text-amber-400 hover:text-amber-300 font-semibold underline text-sm">
                          View Profile
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
