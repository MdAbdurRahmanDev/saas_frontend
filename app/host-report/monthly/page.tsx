"use client";

import React from 'react';

export default function MonthlyHostReportPage() {
  const mockReports = [
    { id: 1, hostName: 'Emma Watson', hostId: 'HW12345', activeDays: 28, duration: '114h 20m', diamonds: 450400, followers: 3120, tier: 'Diamond' },
    { id: 2, hostName: 'James Bond', hostId: 'HB98765', activeDays: 12, duration: '42h 15m', diamonds: 85000, followers: 450, tier: 'Silver' },
    { id: 3, hostName: 'Sarah Connor', hostId: 'SC55555', activeDays: 31, duration: '186h 45m', diamonds: 1242000, followers: 8310, tier: 'Crown' },
    { id: 4, hostName: 'John Wick', hostId: 'JW77777', activeDays: 5, duration: '11h 30m', diamonds: 15000, followers: 120, tier: 'Bronze' },
    { id: 5, hostName: 'Lara Croft', hostId: 'LC11111', activeDays: 24, duration: '105h 10m', diamonds: 327800, followers: 1195, tier: 'Gold' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Monthly Host Report</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Review monthly aggregated statistics, total earnings, and host tier progressions.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input type="month" className="bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500 w-full md:w-auto" defaultValue={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`} />
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors whitespace-nowrap">
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full blur-xl -mr-4 -mt-4"></div>
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 relative z-10">Total Active Hosts (Monthly)</div>
          <div className="text-2xl font-bold text-white relative z-10">342</div>
          <div className="text-xs text-green-400 mt-2 relative z-10">↑ 8% from last month</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full blur-xl -mr-4 -mt-4"></div>
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 relative z-10">Total Stream Time</div>
          <div className="text-2xl font-bold text-white relative z-10">14,258h</div>
          <div className="text-xs text-green-400 mt-2 relative z-10">↑ 15% from last month</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full blur-xl -mr-4 -mt-4"></div>
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 relative z-10">Total Monthly Diamonds</div>
          <div className="text-2xl font-bold text-cyan-400 relative z-10">38,250,400 <span className="text-sm">💎</span></div>
          <div className="text-xs text-green-400 mt-2 relative z-10">↑ 22% from last month</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full blur-xl -mr-4 -mt-4"></div>
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 relative z-10">Total Payout Est.</div>
          <div className="text-2xl font-bold text-pink-400 relative z-10">$76,500</div>
          <div className="text-xs text-gray-500 mt-2 relative z-10">Pending Calculation</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#18181b] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input type="text" placeholder="Search by Host Name or ID..." className="w-full bg-[#27272a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select className="bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-full md:w-auto">
            <option>All Tiers</option>
            <option>Crown Tier</option>
            <option>Diamond Tier</option>
            <option>Gold Tier</option>
          </select>
          <select className="bg-[#27272a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-full md:w-auto">
            <option>Sort by Diamonds</option>
            <option>Sort by Stream Time</option>
            <option>Sort by Active Days</option>
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
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Active Days</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Total Stream Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Diamonds Received</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Current Tier</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mr-3 border border-purple-500/30">
                        {report.hostName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{report.hostName}</div>
                        <div className="text-xs text-gray-500">ID: {report.hostId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold ${
                       report.activeDays >= 20 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                       report.activeDays >= 10 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                       'bg-red-500/10 text-red-400 border border-red-500/20'
                     }`}>
                       {report.activeDays} / 31
                     </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-300 font-medium">{report.duration}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-cyan-400 font-bold">{report.diamonds.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      report.tier === 'Crown' ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' :
                      report.tier === 'Diamond' ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' :
                      report.tier === 'Gold' ? 'text-amber-500' :
                      report.tier === 'Silver' ? 'text-gray-300' : 'text-orange-700'
                    }`}>
                      {report.tier === 'Crown' && '👑 '}
                      {report.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-purple-400 hover:text-purple-300 text-xs font-semibold underline mr-3">Settle</button>
                    <button className="text-gray-400 hover:text-gray-200 text-xs font-semibold underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between bg-[#18181b]">
          <div className="text-sm text-gray-500">Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">342</span> results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">Previous</button>
            <button className="px-3 py-1 rounded bg-purple-600 text-white shadow text-sm">1</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">2</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">3</button>
            <button className="px-3 py-1 rounded bg-[#27272a] text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm border border-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
