"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function AddAgencyPage() {
  const [uuid, setUuid] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [approveResult, setApproveResult] = useState<any>(null);
  const [balanceSettings, setBalanceSettings] = useState({ beansActive: true, diamondsActive: true });

  useEffect(() => {
    const fetchBalanceSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/balance`);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setBalanceSettings({
              beansActive: data.beans_active ?? true,
              diamondsActive: data.diamonds_active ?? true,
            });
          }
        } else {
          const local = localStorage.getItem('balanceSettings');
          if (local) {
            const parsed = JSON.parse(local);
            setBalanceSettings({ beansActive: parsed.beansActive, diamondsActive: parsed.diamondsActive });
          }
        }
      } catch {
        const local = localStorage.getItem('balanceSettings');
        if (local) {
          const parsed = JSON.parse(local);
          setBalanceSettings({ beansActive: parsed.beansActive, diamondsActive: parsed.diamondsActive });
        }
      }
    };
    fetchBalanceSettings();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid.trim()) return;
    setIsSearching(true);
    setFoundUser(null);
    setError('');
    setApproveResult(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/search?q=${uuid.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setFoundUser(data);
      } else {
        setError('User not found. Please check the UUID and try again.');
      }
    } catch {
      setError('Failed to connect to server.');
    } finally {
      setIsSearching(false);
    }
  };

  // Confirm বাটনে click হলে এই function call হবে
  const handleApprove = async () => {
    if (!foundUser) return;
    setIsApproving(true);
    setShowConfirmModal(false);
    try {
      const res = await fetch(`${API_BASE_URL}/api/agency`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: foundUser.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setApproveResult(data); // Success result দেখানো হবে
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch {
      alert('Failed to connect to server.');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Create New Agency</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Search for an existing user by their UUID to upgrade their account to an Agency status.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Step 1: Find User</h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="text"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Enter User UUID or Email..."
              className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !uuid.trim()}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center min-w-[140px]"
          >
            {isSearching ? 'Searching...' : 'Search UUID'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Success Result Modal */}
      {approveResult && (
        <div className="bg-[#0c1a0c] border border-green-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✅</span>
            <h2 className="text-lg font-bold text-green-400">Agency Created Successfully!</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#18181b] rounded-lg p-3 border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Agency Code</p>
              <p className="text-white font-bold text-lg font-mono tracking-widest">{approveResult.agency_code}</p>
            </div>
            <div className="bg-[#18181b] rounded-lg p-3 border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">UUID</p>
              <p className="text-cyan-400 text-xs font-mono break-all">{approveResult.uuid}</p>
            </div>
            <div className="bg-[#18181b] rounded-lg p-3 border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Email</p>
              <p className="text-gray-300 text-xs break-all">{approveResult.email}</p>
            </div>
            <div className="bg-[#18181b] rounded-lg p-3 border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Join Date</p>
              <p className="text-gray-300 text-xs">{new Date(approveResult.join_date).toLocaleString()}</p>
            </div>
            <div className="bg-[#18181b] rounded-lg p-3 border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Hosts</p>
              <p className="text-white font-bold text-lg">0</p>
            </div>
          </div>
          <button
            onClick={() => { setApproveResult(null); setFoundUser(null); setUuid(''); }}
            className="mt-5 px-5 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition"
          >
            Create Another Agency
          </button>
        </div>
      )}

      {/* Results Section */}
      {foundUser && !approveResult && (
        <div className="animate-fade-in-up space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* User Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-xl -mr-10 -mt-10"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-blue-400">👤</span> User Details
              </h2>
              <div className="flex items-start gap-4 relative z-10">
                {foundUser.profilePic ? (
                  <img src={foundUser.profilePic} alt={foundUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30" />
                ) : (
                  <div className={`w-16 h-16 rounded-full border-2 border-blue-500/30 flex items-center justify-center text-white text-2xl font-bold ${foundUser.color || 'bg-blue-900/40'}`}>
                    {foundUser.initial || foundUser.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-bold text-white">{foundUser.name}</h3>
                  <p className="text-sm text-gray-400">{foundUser.email}</p>
                  <p className="text-xs text-gray-500 font-mono">UUID: {foundUser.id}</p>
                  <p className={`text-sm flex items-center gap-2 mt-2 ${foundUser.status === 'BANNED' ? 'text-red-400' : 'text-green-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${foundUser.status === 'BANNED' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    Status: {foundUser.status || 'Active'}
                  </p>
                  <div className="pt-3 flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-[#18181b] border border-gray-700 rounded text-xs text-gray-300">Level {foundUser.level ?? 'N/A'}</span>
                    <span className="px-2 py-1 bg-[#18181b] border border-gray-700 rounded text-xs text-gray-300">Joined: {foundUser.joined ?? 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full blur-xl -mr-10 -mt-10"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-yellow-400">💰</span> Wallet Details
              </h2>
              <div className="space-y-4 relative z-10">
                {balanceSettings.diamondsActive && (
                  <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 text-lg">💎</span>
                      <span className="text-sm text-gray-300 font-medium">Diamonds</span>
                    </div>
                    <span className="font-bold text-white text-lg">{Number(foundUser.diamonds ?? 0).toLocaleString()}</span>
                  </div>
                )}
                {balanceSettings.beansActive && (
                  <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-lg">🟡</span>
                      <span className="text-sm text-gray-300 font-medium">Beans</span>
                    </div>
                    <span className="font-bold text-white text-lg">{Number(foundUser.beans ?? 0).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl text-center">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Step 2: Confirmation</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-lg mx-auto">
              By approving <span className="text-white font-semibold">{foundUser.name}</span> as an agency, they will gain access to the Agency Dashboard, ability to recruit hosts, and earn agency commissions.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => { setFoundUser(null); setUuid(''); }}
                className="px-6 py-3 bg-[#1f2937] text-white rounded-lg text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={isApproving}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-60"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {isApproving ? 'Approving...' : 'Approve as Agency'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Modal Popup */}
      {showConfirmModal && foundUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151520] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-emerald-900/40 flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Confirm to Add Agency</h3>
                <p className="text-sm text-gray-400">This action cannot be undone.</p>
              </div>
            </div>

            <div className="bg-[#0c0c1a] rounded-xl p-4 mb-6 space-y-2 border border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Name</span>
                <span className="text-white font-semibold">{foundUser.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email</span>
                <span className="text-cyan-400 font-mono text-xs">{foundUser.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">UUID</span>
                <span className="text-gray-300 font-mono text-xs">{foundUser.id}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-800 pt-2 mt-2">
                <span className="text-gray-400">Agency Code</span>
                <span className="text-yellow-400 font-semibold">Auto-generated (6 digits)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Hosts</span>
                <span className="text-white font-semibold">0</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-semibold transition border border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-semibold transition shadow-lg"
              >
                ✅ Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
