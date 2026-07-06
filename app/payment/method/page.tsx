"use client";

import React, { useState } from 'react';

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const WarningIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const MOCK_GATEWAYS = [
  { id: 1, name: 'bKash', code: 'BKASH', walletNumber: '01700000000', type: 'Personal', updated: '6/4/2026', isActive: true, activeColor: 'bg-green-500' },
  { id: 2, name: 'Nagad', code: 'NAGAD', walletNumber: '01800000000', type: 'Personal', updated: '6/4/2026', isActive: true, activeColor: 'bg-green-500' },
  { id: 3, name: 'bKash', code: 'BKASH', walletNumber: '01700000000', type: 'Personal', updated: '6/5/2026', isActive: false, activeColor: 'bg-gray-600' },
  { id: 4, name: 'Nagad', code: 'NAGAD', walletNumber: '01800000000', type: 'Personal', updated: '6/20/2026', isActive: true, activeColor: 'bg-green-500' },
];

export default function PaymentMethodPage() {
  const [gateways, setGateways] = useState(MOCK_GATEWAYS);

  const toggleGateway = (id: number) => {
    setGateways(gateways.map(g => g.id === id ? { ...g, isActive: !g.isActive, activeColor: !g.isActive ? 'bg-green-500' : 'bg-gray-600' } : g));
  };

  return (
    <div className="flex flex-col space-y-6 max-w-[1400px]">
      
      {/* Warning Banner */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 flex items-start space-x-3">
        <div className="text-yellow-500 mt-0.5"><WarningIcon /></div>
        <p className="text-yellow-400/90 text-sm font-medium leading-relaxed">
          <span className="font-bold text-yellow-500">Important Notice:</span> In order to maintain gateway integrity, creating new custom channels is restricted. Only standard seeded premium channels (bKash & Nagad) can be edited or toggled to avoid transaction sync problems inside the mobile application.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side: Gateway Cards */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {gateways.map(gateway => (
            <div key={gateway.id} className="bg-[#151520] border border-gray-800 rounded-xl p-5 flex flex-col relative overflow-hidden transition-all hover:border-gray-700 shadow-sm">
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-md ${gateway.isActive ? 'bg-green-500' : 'bg-gray-700'}`}></div>

              <div className="flex justify-between items-start mt-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center bg-[#0c0c1a]">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${gateway.isActive ? 'text-white' : 'text-gray-400'}`}>{gateway.name}</h3>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded tracking-wider">{gateway.code}</span>
                  </div>
                </div>
                
                {/* Toggle */}
                <button 
                  onClick={() => toggleGateway(gateway.id)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full border transition-colors ${gateway.isActive ? 'border-green-500' : 'border-gray-600'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full transition-transform ${gateway.isActive ? 'translate-x-5 bg-green-500' : 'translate-x-1 bg-gray-600'}`} />
                </button>
              </div>

              <div className="mt-8 space-y-4 flex-1">
                <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                  <span className="text-xs font-bold text-gray-500 tracking-wider">WALLET NUMBER</span>
                  <span className={`text-sm font-bold ${gateway.isActive ? 'text-white' : 'text-gray-400'}`}>{gateway.walletNumber}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                  <span className="text-xs font-bold text-gray-500 tracking-wider">TYPE</span>
                  <span className={`text-sm font-semibold ${gateway.isActive ? 'text-indigo-400' : 'text-indigo-900'}`}>{gateway.type}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-600 font-medium tracking-wider">Updated: {gateway.updated}</span>
                <button className="flex items-center space-x-1.5 px-4 py-1.5 bg-indigo-900/20 hover:bg-indigo-900/40 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-900/50 transition-colors">
                  <EditIcon />
                  <span>Edit Gateway</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Placeholder Area */}
        <div className="bg-[#151520] border border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center mb-6 text-gray-500">
            <InfoIcon />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">No Gateway Selected</h3>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Click on the "Edit Gateway" button of bKash or Nagad to configure their wallet credentials.
          </p>
        </div>

      </div>
    </div>
  );
}
