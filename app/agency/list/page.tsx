"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';

export default function AgencyListPage() {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/agency`);
        if (res.ok) {
          const data = await res.json();
          setAgencies(data);
        }
      } catch (err) {
        console.error('Failed to fetch agencies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  const filteredAgencies = agencies.filter(a => 
    a.name?.toLowerCase().includes(search.toLowerCase()) || 
    a.agency_code?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Agency List</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            View and manage all approved agencies on the platform.
          </p>
        </div>
        <Link href="/agency/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Agency
          </button>
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
           <input 
             type="text" 
             placeholder="Search agencies by name, email or code..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-80 bg-[#27272a] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" 
           />
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading agencies...</div>
          ) : filteredAgencies.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No agencies found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#18181b] border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Agency Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Total Hosts</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredAgencies.map((row) => (
                  <tr key={row.id} className="hover:bg-[#1f1f23] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {row.profilePic ? (
                        <img src={row.profilePic} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                          {row.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-white text-lg">{row.name}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">
                          Code: <span className="text-yellow-400 font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20">{row.agency_code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">{row.email}</td>
                    <td className="px-6 py-4 text-center text-indigo-400 font-bold">{row.total_hosts}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        row.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/agency/profile?id=${row.id}`}>
                        <button className="text-indigo-400 hover:text-indigo-300 font-semibold underline text-sm">View Profile</button>
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
