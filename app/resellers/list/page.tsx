"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';

export default function ResellerListPage() {
  const [resellers, setResellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [balanceSettings, setBalanceSettings] = useState({ beansActive: true, diamondsActive: true });

  useEffect(() => {
    const fetchBalanceSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/balance`);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setBalanceSettings({
              beansActive: data.beans_active ?? true,
              diamondsActive: data.diamonds_active ?? true,
            });
          }
        } else {
          const local = localStorage.getItem('balanceSettings');
          if (local) {
            const parsed = JSON.parse(local);
            setBalanceSettings({ beansActive: parsed.beansActive, diamondsActive: parsed.diamondsActive });
          }
        }
      } catch {
        const local = localStorage.getItem('balanceSettings');
        if (local) {
          const parsed = JSON.parse(local);
          setBalanceSettings({ beansActive: parsed.beansActive, diamondsActive: parsed.diamondsActive });
        }
      }
    };
    fetchBalanceSettings();

    const fetchResellers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reseller`);
        if (res.ok) {
          const data = await res.json();
          setResellers(data);
        }
      } catch (err) {
        console.error('Failed to fetch resellers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResellers();
  }, []);

  const filteredResellers = resellers.filter(r => 
    r.name?.toLowerCase().includes(search.toLowerCase()) || 
    r.reseller_code?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Reseller List</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Manage all verified coin resellers operating on the platform.
          </p>
        </div>
        <Link href="/resellers/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Reseller
          </button>
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
           <input 
             type="text" 
             placeholder="Search resellers by name, email or code..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-80 bg-[#27272a] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500" 
           />
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading resellers...</div>
          ) : filteredResellers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No resellers found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reseller Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                  {balanceSettings.diamondsActive && (
                    <th className="px-6 py-4 text-xs font-bold text-cyan-400 uppercase tracking-wider text-center">Diamonds</th>
                  )}
                  {balanceSettings.beansActive && (
                    <th className="px-6 py-4 text-xs font-bold text-yellow-500 uppercase tracking-wider text-center">Beans</th>
                  )}
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredResellers.map((row) => (
                  <tr key={row.id} className="hover:bg-[#1f1f23] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {row.profilePic ? (
                        <img src={row.profilePic} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                          {row.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-white text-lg">{row.name}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">
                          Code: <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">{row.reseller_code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">{row.email}</td>
                    
                    {balanceSettings.diamondsActive && (
                      <td className="px-6 py-4 text-center text-cyan-400 font-bold">{row.diamonds?.toLocaleString() || 0} 💎</td>
                    )}
                    {balanceSettings.beansActive && (
                      <td className="px-6 py-4 text-center text-yellow-500 font-bold">{row.beans?.toLocaleString() || 0} 🪙</td>
                    )}

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        row.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/resellers/profile?id=${row.id}`}>
                        <button className="text-amber-400 hover:text-amber-300 font-semibold underline text-sm">View Profile</button>
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
