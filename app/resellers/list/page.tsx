"use client";

import React from 'react';
import Link from 'next/link';

export default function ResellerListPage() {
  const mockResellers = [
    { id: 'R-992', name: 'Mega Coins', owner: 'Mike Tyson', sales: '4.5M', status: 'Active' },
    { id: 'R-114', name: 'Swift TopUp', owner: 'Serena Williams', sales: '1.2M', status: 'Active' },
    { id: 'R-882', name: 'Global Pay', owner: 'Elon Musk', sales: '800K', status: 'Suspended' },
  ];

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
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add New Reseller
          </button>
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
           <input type="text" placeholder="Search resellers..." className="w-64 bg-[#27272a] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18181b] border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reseller Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Total Coin Sales</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockResellers.map((row) => (
                <tr key={row.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-lg">{row.name}</div>
                    <div className="text-xs text-gray-500 font-mono">ID: {row.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-medium">{row.owner}</td>
                  <td className="px-6 py-4 text-center text-amber-400 font-bold">{row.sales} 🪙</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                      row.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-white font-semibold underline text-sm">Manage</button>
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
