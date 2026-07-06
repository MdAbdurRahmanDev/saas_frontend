"use client";

import React from 'react';

const SparkleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const LinkIcon = () => (
  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const PlusIcon = () => (
  <svg className="w-8 h-8 text-gray-500 mb-2 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MOCK_PACKAGES = [
  { id: 1, slot: 1, method: 'BKASH', type: 'BEANS PACKAGE', amount: '22,200', price: '300' },
  { id: 2, slot: 2, method: 'BKASH', type: 'BEANS PACKAGE', amount: '37,000', price: '500' },
  { id: 3, slot: 3, method: 'BKASH', type: 'BEANS PACKAGE', amount: '74,000', price: '1000' },
  { id: 4, slot: 4, method: 'BKASH', type: 'BEANS PACKAGE', amount: '22,200', price: '300' },
  { id: 5, slot: 5, method: 'BKASH', type: 'BEANS PACKAGE', amount: '37,000', price: '500' },
  { id: 6, slot: 6, method: 'BKASH', type: 'BEANS PACKAGE', amount: '74,000', price: '1000' },
];

export default function TopUpPackagesPage() {
  return (
    <div className="flex flex-col space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Top-up Packages</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure dynamic top-up cards shown on the user's Top-up page.</p>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-900/20 border border-indigo-700/50 rounded-lg p-4 flex items-start space-x-3">
        <div className="text-indigo-400 mt-0.5"><SparkleIcon /></div>
        <p className="text-indigo-200/80 text-sm font-medium leading-relaxed">
          <span className="font-bold text-indigo-300">Dynamic Top-ups Enabled:</span> You can now create as many packages as you want, edit existing ones, or delete those that are no longer offered. Select <span className="font-bold text-white">All Method</span> to show it across all payment popups, and change payment list!
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {MOCK_PACKAGES.map((pkg) => (
          <div key={pkg.id} className="bg-[#151520] border border-gray-800 rounded-xl p-5 flex flex-col relative transition-all hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-purple-600 rounded-b-md"></div>

            {/* Card Header */}
            <div className="flex justify-between items-center mt-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
                  {pkg.slot}
                </div>
                <span className="text-xs font-bold text-gray-500 tracking-wider">SLOT {pkg.slot}</span>
              </div>
              <span className="bg-[#0c0c1a] border border-gray-800 text-[10px] font-bold text-gray-500 px-2 py-1 rounded tracking-wider">{pkg.method}</span>
            </div>

            {/* Package Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center space-x-1.5 mb-2">
                <LinkIcon />
                <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">{pkg.type}</span>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2">{pkg.amount}</h2>
              
              <div className="text-sm font-bold text-green-500 mb-8">
                Price: BDT {pkg.price}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-800/50 mt-auto">
              <button className="flex items-center space-x-1.5 px-3 py-1.5 text-red-500/80 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30 text-xs font-semibold">
                <DeleteIcon />
                <span>Delete</span>
              </button>
              
              <button className="flex items-center space-x-1.5 px-4 py-1.5 text-indigo-400 hover:text-indigo-300 bg-indigo-900/20 hover:bg-indigo-900/40 rounded-lg transition-colors border border-indigo-900/50 text-xs font-semibold">
                <EditIcon />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card Placeholder */}
        <button className="bg-[#0c0c1a] border-2 border-dashed border-gray-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col items-center justify-center min-h-[250px] transition-all group hover:bg-[#151520]">
          <PlusIcon />
          <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors">Add New Package</span>
        </button>

      </div>
    </div>
  );
}
