"use client";

import React, { useState } from 'react';

export default function CoinTransferPage() {
  const [recipientUuid, setRecipientUuid] = useState('');
  const [amount, setAmount] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mb-2">
          Coin Transfer Portal
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Resellers can instantly top-up user accounts by transferring coins directly to their UUID.
        </p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Transfer Form */}
        <div className="flex-1 p-8 relative">
          <h2 className="text-lg font-bold text-white mb-6">Transfer Details</h2>
          
          <form className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Recipient UUID</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <input 
                    type="text" 
                    value={recipientUuid}
                    onChange={(e) => { setRecipientUuid(e.target.value); setIsVerified(false); }}
                    placeholder="e.g. U-123456"
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-mono transition-all"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsVerified(true)}
                  disabled={!recipientUuid}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Verify
                </button>
              </div>
              
              {/* Verified User Details Card */}
              {isVerified && (
                <div className="mt-3 bg-gradient-to-r from-emerald-500/10 to-[#18181b] border border-emerald-500/30 rounded-xl p-4 flex items-center gap-4 animate-fade-in-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl shadow-sm">
                    JD
                  </div>
                  <div>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      John Doe 
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">Valid User</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Level 42 • Current Balance: <span className="font-bold text-amber-400">1,245 🪙</span></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Amount to Transfer (Coins)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500 font-bold">🪙</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-bold text-lg transition-all"
                />
              </div>
              {/* Quick Select Buttons */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 custom-scrollbar">
                {[1000, 5000, 10000, 50000].map(val => (
                  <button 
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="px-3 py-1 bg-[#27272a] text-gray-300 hover:text-white hover:bg-amber-600/20 hover:border-amber-500/50 rounded-lg text-xs font-semibold border border-gray-700 transition-colors whitespace-nowrap"
                  >
                    +{val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Transfer Note (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Monthly top-up..."
                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
            </div>

            <button 
              type="button"
              className="w-full py-4 mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Transfer Coins Now
            </button>
          </form>
        </div>

        {/* Right Side: Reseller Wallet Status */}
        <div className="md:w-72 bg-[#18181b] p-8 border-l border-gray-800 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-3xl mb-4 border border-amber-500/20">
            💼
          </div>
          <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Your Coin Balance</h3>
          <div className="text-4xl font-extrabold text-white mb-1">
            2.4M
          </div>
          <div className="text-sm text-gray-500 font-mono mb-8">🪙 Available</div>

          <button className="w-full py-2 bg-transparent border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-400 rounded-lg text-sm font-semibold transition-colors">
            Purchase More Coins
          </button>
        </div>
      </div>
    </div>
  );
}
