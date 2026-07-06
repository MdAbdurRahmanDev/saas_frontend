"use client";

import React from 'react';

export default function AgencyApplicationsPage() {
  const mockApps = [
    { id: 'APP-101', applicant: 'Michael Scott', uuid: 'U-77721', date: '2024-03-15', status: 'Pending' },
    { id: 'APP-102', applicant: 'Pam Beesly', uuid: 'U-33311', date: '2024-03-14', status: 'Under Review' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Agency Applications</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Review and approve requests from users who want to start an agency.
        </p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
           <div className="flex gap-2">
             <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm font-semibold">Pending (2)</button>
             <button className="px-3 py-1.5 bg-[#27272a] text-gray-400 hover:text-white rounded text-sm transition-colors border border-gray-700">Rejected</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18181b] border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User UUID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Applied Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockApps.map((row) => (
                <tr key={row.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="px-6 py-4 text-indigo-400 font-mono font-bold">{row.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{row.applicant}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono">{row.uuid}</td>
                  <td className="px-6 py-4 text-center text-gray-300">{row.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                      row.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-sm">Approve</button>
                    <button className="text-red-400 hover:text-red-300 font-semibold underline text-sm">Reject</button>
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
