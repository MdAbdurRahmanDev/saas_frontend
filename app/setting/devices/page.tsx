"use client";

import React from 'react';

export default function DevicesInfoPage() {
  const mockDevices = [
    { id: 1, user: 'John Doe', uuid: 'U-11223', device: 'iPhone 14 Pro Max', os: 'iOS 17.2', ip: '192.168.1.45', lastActive: '2 mins ago', status: 'Online' },
    { id: 2, user: 'Emma Watson', uuid: 'U-44556', device: 'Samsung Galaxy S23', os: 'Android 14', ip: '10.0.0.12', lastActive: '1 hour ago', status: 'Offline' },
    { id: 3, user: 'Alex Admin', uuid: 'U-99999', device: 'MacBook Pro M2', os: 'macOS Sonoma', ip: '172.16.0.4', lastActive: 'Just now', status: 'Online' },
    { id: 4, user: 'Sarah Connor', uuid: 'U-77889', device: 'iPad Pro 12.9"', os: 'iPadOS 17', ip: '192.168.1.100', lastActive: '3 days ago', status: 'Offline' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Devices Information</h1>
          <p className="text-[var(--text-secondary)] text-sm">Monitor all active and historical device logins across the platform for security auditing.</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
           <input type="text" placeholder="Search by UUID or IP..." className="w-64 bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
           <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors">
             Search
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
         <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Active Devices (24h)</p>
              <h3 className="text-2xl font-bold text-white mt-1">12,450</h3>
            </div>
            <div className="text-3xl text-indigo-500">📱</div>
         </div>
         <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">iOS / Android Ratio</p>
              <h3 className="text-2xl font-bold text-white mt-1">45% / 55%</h3>
            </div>
            <div className="text-3xl text-emerald-500">📊</div>
         </div>
         <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Suspicious Logins Detected</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">12</h3>
            </div>
            <div className="text-3xl text-red-500">⚠️</div>
         </div>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18181b] border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Device Model</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">OS Version</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockDevices.map((row) => (
                <tr key={row.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white flex items-center gap-2">
                       {row.status === 'Online' ? <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> : <span className="w-2 h-2 rounded-full bg-gray-600"></span>}
                       {row.user}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{row.uuid}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-medium">{row.device}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{row.os}</td>
                  <td className="px-6 py-4 text-indigo-400 font-mono text-sm">{row.ip}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{row.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded border border-red-500/20">
                      Force Logout
                    </button>
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
