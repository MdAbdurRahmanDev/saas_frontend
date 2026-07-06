"use client";

import React from 'react';
import Link from 'next/link';

export default function AgencyProfilePage() {
  const agencyDetails = {
    name: 'Alpha Entertainment',
    id: 'A-992',
    status: 'Active',
    joinDate: 'Jan 15, 2024',
    owner: {
      name: 'Alex Johnson',
      uuid: 'U-9823412',
      phone: '+1 (555) 123-4567',
      email: 'alex.j@alpha-ent.com',
      avatar: 'AJ',
      level: 42,
    },
    stats: {
      totalHosts: 45,
      activeHosts: 32,
      monthlyDiamonds: '2.5M',
      commissionEarned: '$2,500',
    }
  };

  const hostsList = [
    { id: 1, name: 'Emma Watson', uuid: 'U-11223', status: 'Online', diamonds: '450K' },
    { id: 2, name: 'John Wick', uuid: 'U-44556', status: 'Offline', diamonds: '120K' },
    { id: 3, name: 'Sarah Connor', uuid: 'U-77889', status: 'Online', diamonds: '850K' },
    { id: 4, name: 'Lara Croft', uuid: 'U-99000', status: 'Offline', diamonds: '320K' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <Link href="/agency/list" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 mb-2 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Agency List
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            {agencyDetails.name}
            <span className="bg-green-500/10 text-green-400 text-xs px-2.5 py-1 rounded border border-green-500/20 uppercase tracking-wider font-bold">
              {agencyDetails.status}
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-mono">
            Agency ID: {agencyDetails.id} • Joined {agencyDetails.joinDate}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <button className="px-5 py-2 bg-[#1f2937] text-white rounded-lg text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition flex-1 sm:flex-none">
            Suspend Agency
          </button>
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex-1 sm:flex-none">
            Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Owner Profile & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Owner Profile Card */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-indigo-900/40 to-transparent"></div>
            
            <div className="w-24 h-24 rounded-full bg-indigo-900/50 border-4 border-[var(--card-bg)] flex items-center justify-center text-indigo-400 text-4xl font-bold relative z-10 shadow-lg mt-4 mb-4">
              {agencyDetails.owner.avatar}
            </div>
            
            <h2 className="text-2xl font-bold text-white relative z-10">{agencyDetails.owner.name}</h2>
            <p className="text-indigo-400 font-mono text-sm mb-4 relative z-10">Owner UUID: {agencyDetails.owner.uuid}</p>
            
            <div className="flex gap-2 mb-6 relative z-10">
              <span className="px-3 py-1 bg-[#18181b] border border-gray-700 rounded-full text-xs text-gray-300 font-semibold">User Level {agencyDetails.owner.level}</span>
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-xs font-semibold">Premium Agency</span>
            </div>

            <div className="w-full bg-[#18181b] rounded-xl p-4 text-left border border-gray-800/50 space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📧</span>
                <span className="text-gray-300 text-sm">{agencyDetails.owner.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📱</span>
                <span className="text-gray-300 text-sm">{agencyDetails.owner.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Hosts</div>
              <div className="text-2xl font-bold text-white">{agencyDetails.stats.totalHosts}</div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Active Streams</div>
              <div className="text-2xl font-bold text-green-400">{agencyDetails.stats.activeHosts}</div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center col-span-2">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Monthly Diamonds</div>
              <div className="text-3xl font-bold text-cyan-400">{agencyDetails.stats.monthlyDiamonds} 💎</div>
            </div>
          </div>
        </div>

        {/* Right Column: Host List & Revenue Chart */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Revenue Overview */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
             <div className="flex justify-between items-center mb-6 relative z-10">
               <div>
                 <h3 className="text-lg font-bold text-white">Agency Revenue Overview</h3>
                 <p className="text-xs text-gray-500">Total estimated commission for current month.</p>
               </div>
               <div className="text-right">
                 <div className="text-3xl font-bold text-emerald-400">{agencyDetails.stats.commissionEarned}</div>
                 <div className="text-xs text-emerald-500 font-semibold">↑ 14% vs Last Month</div>
               </div>
             </div>
             
             {/* Mock Chart Area */}
             <div className="h-32 flex items-end gap-2 px-2 relative z-10">
               {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                 <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-t-sm transition-colors group relative flex justify-center" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${height * 10}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Agency Hosts Table */}
          <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Agency Hosts</h3>
              <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#18181b] border-b border-gray-800">
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Host</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Diamonds</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {hostsList.map((host) => (
                    <tr key={host.id} className="hover:bg-[#1f1f23] transition-colors">
                      <td className="px-5 py-3">
                        <div className="font-semibold text-white">{host.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{host.uuid}</div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold ${
                          host.status === 'Online' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {host.status === 'Online' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                          {host.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center text-cyan-400 font-bold">{host.diamonds}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
