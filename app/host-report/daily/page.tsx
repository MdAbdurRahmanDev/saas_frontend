"use client";

import React from 'react';

export default function DailyHostReportPage() {
  const mockReports = [
    { id: 1, hostName: 'Emma Watson', hostId: 'HW12345', duration: '4h 20m', diamonds: 15400, followers: 120, status: 'Online' },
    { id: 2, hostName: 'James Bond', hostId: 'HB98765', duration: '2h 15m', diamonds: 8500, followers: 45, status: 'Offline' },
    { id: 3, hostName: 'Sarah Connor', hostId: 'SC55555', duration: '6h 45m', diamonds: 42000, followers: 310, status: 'Online' },
    { id: 4, hostName: 'John Wick', hostId: 'JW77777', duration: '1h 30m', diamonds: 5000, followers: 20, status: 'Offline' },
    { id: 5, hostName: 'Lara Croft', hostId: 'LC11111', duration: '5h 10m', diamonds: 27800, followers: 195, status: 'Online' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Daily Host Report</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Monitor daily streaming performance, earnings, and engagement for all hosts.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input type="date" className="bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 w-full md:w-auto" defaultValue={new Date().toISOString().split('T')[0]} />
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors whitespace-nowrap">
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Active Hosts</div>
          <div className="text-2xl font-bold text-white">124</div>
          <div className="text-xs text-green-400 mt-2">↑ 12% from yesterday</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Stream Time</div>
          <div className="text-2xl font-bold text-white">458h 20m</div>
          <div className="text-xs text-green-400 mt-2">↑ 5% from yesterday</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Diamonds Earned</div>
          <div className="text-2xl font-bold text-cyan-400">1,250,400 <span className="text-sm">💎</span></div>
          <div className="text-xs text-red-400 mt-2">↓ 2% from yesterday</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">New Followers Gained</div>
          <div className="text-2xl font-bold text-pink-400">3,420</div>
          <div className="text-xs text-green-400 mt-2">↑ 18% from yesterday</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#18181b] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input type="text" placeholder="Search by Host Name or ID..." className="w-full bg-[#27272a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select className="bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full md:w-auto">
            <option>All Agencies</option>
            <option>Agency Alpha</option>
            <option>Agency Beta</option>
          </select>
          <select className="bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full md:w-auto">
            <option>Sort by Diamonds</option>
            <option>Sort by Stream Time</option>
            <option>Sort by Followers</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18181b] border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Host Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Stream Duration</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Diamonds Received</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">New Followers</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mr-3 border border-indigo-500/30">
                        {report.hostName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{report.hostName}</div>
                        <div className="text-xs text-gray-500">ID: {report.hostId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-300 font-medium">{report.duration}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-cyan-400 font-bold">{report.diamonds.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-pink-400 font-medium">+{report.followers}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      report.status === 'Online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {report.status === 'Online' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between bg-[#18181b]">
          <div className="text-sm text-gray-500">Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">124</span> results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">Previous</button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white shadow text-sm">1</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">2</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">3</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
