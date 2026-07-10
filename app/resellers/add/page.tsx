"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function AddResellerPage() {
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
    } catch (err) {
      setError('Network error. Failed to connect to server.');
    } finally {
      setIsSearching(false);
    }
  };

  const confirmApprove = async () => {
    setIsApproving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: foundUser.id }) // Fixed: use .id instead of .uuid
      });
      if (res.ok) {
        const data = await res.json();
        setApproveResult(data);
        setShowConfirmModal(false);
      } else {
        const errData = await res.text();
        alert(`Failed to approve: ${errData}`);
        setShowConfirmModal(false);
      }
    } catch (err) {
      alert('Network error. Failed to connect to server.');
      setShowConfirmModal(false);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12 relative">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mb-2">Create New Reseller</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Search for an existing user by their UUID to upgrade their account to an official Coin Reseller.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Step 1: Find User</h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Enter User UUID or Email..."
              className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
            />
          </div>
          <button 
            type="submit"
            disabled={isSearching || !uuid.trim()}
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center min-w-[140px]"
          >
            {isSearching ? 'Searching...' : 'Search User'}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      {/* Results Section */}
      {foundUser && !approveResult && (
        <div className="animate-fade-in-up space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-blue-400">👤</span> User Details
              </h2>
              <div className="flex items-start gap-4 relative z-10">
                {foundUser.profile_pic ? (
                  <img src={foundUser.profile_pic} alt={foundUser.username} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-900/40 border-2 border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl font-bold">
                    {foundUser.username?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-bold text-white">{foundUser.username}</h3>
                  <p className="text-sm text-gray-400">{foundUser.email}</p>
                  <p className="text-sm text-gray-500 font-mono text-xs">UUID: {foundUser.uuid}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Status: Active
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Details */}
            <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                <span className="text-amber-400">💰</span> Wallet Details
              </h2>
              <div className="space-y-4 relative z-10">
                {balanceSettings.diamondsActive && (
                  <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 text-lg">💎</span>
                      <span className="text-sm text-gray-300 font-medium">Diamonds</span>
                    </div>
                    <span className="font-bold text-white text-lg">{foundUser.diamonds?.toLocaleString() || 0}</span>
                  </div>
                )}
                {balanceSettings.beansActive && (
                  <div className="flex justify-between items-center p-3 bg-[#18181b] rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-lg">🪙</span>
                      <span className="text-sm text-gray-300 font-medium">Beans</span>
                    </div>
                    <span className="font-bold text-white text-lg">{foundUser.beans?.toLocaleString() || 0}</span>
                  </div>
                )}
                {!balanceSettings.diamondsActive && !balanceSettings.beansActive && (
                  <div className="text-center text-gray-500 text-sm mt-4">
                    Wallet features are currently disabled.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-gray-800 shadow-xl text-center">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Step 2: Confirmation</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-lg mx-auto">
              By approving this user as a reseller, they will be able to purchase bulk coins at wholesale rates and transfer them directly to users.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setFoundUser(null)}
                className="px-6 py-3 bg-[#1f2937] text-white rounded-lg text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowConfirmModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Approve as Reseller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success View */}
      {approveResult && (
        <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-2xl p-8 border border-green-500/30 shadow-2xl text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20 border-2 border-green-500/30">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Reseller Approved Successfully!</h2>
          <p className="text-green-300/80 mb-8 max-w-md mx-auto">
            The user has been upgraded to a reseller. Their unique reseller code has been generated.
          </p>
          
          <div className="bg-black/40 rounded-xl p-6 inline-block text-left border border-white/5 w-full max-w-sm mb-8 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -mr-8 -mt-8"></div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email</div>
                <div className="text-white font-medium">{approveResult.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Reseller UUID</div>
                <div className="text-indigo-300 font-mono text-sm bg-indigo-500/10 px-2 py-1 rounded inline-block border border-indigo-500/20">{approveResult.uuid}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Reseller Join Date</div>
                <div className="text-white font-medium">{new Date(approveResult.join_date).toLocaleDateString()}</div>
              </div>
              <div className="pt-2">
                <div className="text-xs text-amber-500/80 uppercase font-bold tracking-wider mb-1">Generated Reseller Code</div>
                <div className="text-amber-400 font-mono text-2xl font-bold bg-amber-500/10 px-3 py-2 rounded-lg inline-block border border-amber-500/20 tracking-widest shadow-inner shadow-black/50">
                  {approveResult.reseller_code}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                setApproveResult(null);
                setFoundUser(null);
                setUuid('');
              }}
              className="px-8 py-3 bg-[#1f2937] hover:bg-gray-700 text-white rounded-xl font-semibold transition shadow-lg"
            >
              Add Another
            </button>
            <a 
              href="/resellers/list"
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition shadow-lg shadow-amber-900/20"
            >
              Go to Reseller List
            </a>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151520] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Confirm Add Reseller</h2>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to approve <strong className="text-white">{foundUser?.username}</strong> as a new reseller? This will generate a unique reseller code.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmApprove}
                disabled={isApproving}
                className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {isApproving ? 'Approving...' : 'Yes, Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
