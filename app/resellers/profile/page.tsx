"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/utils/api';

function ResellerProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [resellerDetails, setResellerDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [balanceSettings, setBalanceSettings] = useState({ beansActive: true, diamondsActive: true });

  // History State
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Suspend Modal State
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);

  const fetchResellerHistory = async (start = '', end = '') => {
    if (!id) return;
    setHistoryLoading(true);
    try {
      let url = `${API_BASE_URL}/api/reseller/${id}/history`;
      if (start && end) {
        url += `?start_date=${new Date(start).toISOString()}&end_date=${new Date(end).toISOString()}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setHistoryLoading(false);
    }
  };

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

    if (!id) {
      setError('Reseller ID is missing.');
      setLoading(false);
      return;
    }

    const fetchResellerDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reseller/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResellerDetails(data);
          setEditName(data.name || '');
          setEditPhone(data.phone_number || '');
        } else {
          setError('Failed to fetch reseller details.');
        }
      } catch (err) {
        setError('Network error. Failed to connect to server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResellerDetails();
    fetchResellerHistory();
  }, [id]);

  const handleEditSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, phone_number: editPhone }),
      });
      if (res.ok) {
        alert('Reseller details updated successfully!');
        setShowEditModal(false);
        window.location.reload(); 
      } else {
        alert('Failed to update reseller details.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuspendToggle = async () => {
    setIsSuspending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller/${id}/suspend`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Reseller is now ${data.status}`);
        setShowSuspendModal(false);
        window.location.reload();
      } else {
        alert('Failed to update reseller status.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setIsSuspending(false);
    }
  };

  const handleFilterHistory = () => {
    if (startDate && endDate) {
      fetchResellerHistory(startDate, endDate);
    } else {
      fetchResellerHistory();
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 p-10">Loading reseller profile...</div>;
  }

  if (error || !resellerDetails) {
    return (
      <div className="text-center p-10">
        <div className="text-red-400 mb-4">{error || 'Reseller not found.'}</div>
        <Link href="/resellers/list" className="text-amber-400 underline">Back to Reseller List</Link>
      </div>
    );
  }

  const isSuspended = resellerDetails.status === 'suspended';

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <Link href="/resellers/list" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 mb-2 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Reseller List
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            {resellerDetails.name}
            <span className={`text-xs px-2.5 py-1 rounded border uppercase tracking-wider font-bold ${
              !isSuspended ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {resellerDetails.status}
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-mono">
            Code: <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">{resellerDetails.reseller_code}</span> • Joined {new Date(resellerDetails.reseller_join_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <button 
             onClick={() => setShowSuspendModal(true)}
             className={`px-5 py-2 text-white rounded-lg text-sm font-semibold border transition flex-1 sm:flex-none ${
               isSuspended ? 'bg-green-600 hover:bg-green-700 border-green-700' : 'bg-[#1f2937] hover:bg-red-900 border-gray-700 hover:border-red-800 text-red-400 hover:text-white'
             }`}
           >
            {isSuspended ? 'Reactivate Reseller' : 'Suspend Reseller'}
          </button>
          <button 
            onClick={() => setShowEditModal(true)}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex-1 sm:flex-none"
          >
            Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Owner Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Owner Profile Card */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-amber-900/40 to-transparent"></div>
            
            <div className="w-24 h-24 rounded-full bg-amber-900/50 border-4 border-[var(--card-bg)] flex items-center justify-center text-amber-400 text-4xl font-bold relative z-10 shadow-lg mt-4 mb-4">
              {resellerDetails.name?.charAt(0)?.toUpperCase()}
            </div>
            
            <h2 className="text-2xl font-bold text-white relative z-10">{resellerDetails.name}</h2>
            <p className="text-amber-400 font-mono text-sm mb-4 relative z-10">UUID: {resellerDetails.uuid}</p>
            
            <div className="flex gap-2 mb-6 relative z-10 flex-wrap justify-center">
              <span className="px-3 py-1 bg-[#18181b] border border-gray-700 rounded-full text-xs text-gray-300 font-semibold">Verified</span>
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-xs font-semibold">Official Reseller</span>
            </div>

            <div className="w-full bg-[#18181b] rounded-xl p-4 text-left border border-gray-800/50 space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📧</span>
                <span className="text-gray-300 text-sm break-all">{resellerDetails.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📱</span>
                <span className="text-gray-300 text-sm">{resellerDetails.phone_number || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Wallet & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Wallet View */}
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
             
             <h3 className="text-lg font-bold text-white mb-6">Wallet Balance</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center py-4">
               {balanceSettings.diamondsActive && (
                 <div className="text-center bg-[#18181b] p-6 rounded-xl border border-gray-800">
                   <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Available Diamonds</div>
                   <div className="text-4xl font-extrabold text-cyan-400 flex items-center justify-center gap-3">
                     {resellerDetails.diamonds?.toLocaleString() || '0'} <span className="text-3xl">💎</span>
                   </div>
                 </div>
               )}
               {balanceSettings.beansActive && (
                 <div className="text-center bg-[#18181b] p-6 rounded-xl border border-gray-800">
                   <div className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Available Beans</div>
                   <div className="text-4xl font-extrabold text-yellow-500 flex items-center justify-center gap-3">
                     {resellerDetails.beans?.toLocaleString() || '0'} <span className="text-3xl">🪙</span>
                   </div>
                 </div>
               )}
               {!balanceSettings.diamondsActive && !balanceSettings.beansActive && (
                 <div className="col-span-2 text-center text-gray-500 p-6">
                   Wallet features are currently disabled by the admin.
                 </div>
               )}
             </div>

             <div className="flex gap-4 mt-6">
               <Link href="/resellers/transfer" className="flex-1">
                 <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-lg transition-colors flex items-center justify-center gap-2">
                   <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                   Transfer Coins
                 </button>
               </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-[var(--card-bg)] rounded-xl border border-gray-800 shadow-xl overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-800 bg-[#18181b] flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Transaction History
          </h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 w-full sm:w-auto"
            />
            <span className="text-gray-500 text-sm">to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#0c0c1a] border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 w-full sm:w-auto"
            />
            <button 
              onClick={handleFilterHistory}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
           {historyLoading ? (
             <div className="p-10 text-center text-gray-500">Loading history...</div>
           ) : history.length === 0 ? (
             <div className="p-10 text-center text-gray-500">No transaction history found.</div>
           ) : (
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-[#18181b] border-b border-gray-800">
                   <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                   <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Trx ID</th>
                   <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Currency</th>
                   <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                   <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-800">
                 {history.map((h, i) => (
                   <tr key={h.id || i} className="hover:bg-[#1f1f23] transition-colors">
                     <td className="px-6 py-4 text-gray-300 text-sm">
                       {new Date(h.created_at).toLocaleString()}
                     </td>
                     <td className="px-6 py-4 font-mono text-xs text-gray-400">
                       {h.trx_id}
                     </td>
                     <td className="px-6 py-4 text-gray-300 capitalize text-sm">
                       {h.currency_type}
                     </td>
                     <td className="px-6 py-4">
                       <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                         h.type === 'deposit' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                       }`}>
                         {h.type}
                       </span>
                     </td>
                     <td className={`px-6 py-4 text-right font-bold ${
                       h.type === 'deposit' ? 'text-green-400' : 'text-amber-400'
                     }`}>
                       {h.type === 'deposit' ? '+' : '-'}{h.amount?.toLocaleString()} {h.currency_type === 'diamonds' ? '💎' : '🪙'}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           )}
        </div>
      </div>

      {/* Edit Details Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151520] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-white mb-4">Edit Reseller Details</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Reseller Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0c0c1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Reseller Name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-[#0c0c1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="e.g. +88017xxxxxxxx"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditSave}
                disabled={isSaving}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Confirmation Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151520] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fade-in-up">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${isSuspended ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {isSuspended ? 'Reactivate Reseller?' : 'Suspend Reseller?'}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {isSuspended 
                ? 'This reseller will be reactivated and will regain full access to transfer coins.' 
                : 'This reseller will be suspended and will no longer have access to transfer coins.'}
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSuspendToggle}
                disabled={isSuspending}
                className={`flex-1 py-2.5 text-white rounded-xl font-semibold transition disabled:opacity-50 ${
                  isSuspended ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSuspending ? 'Processing...' : (isSuspended ? 'Yes, Reactivate' : 'Yes, Suspend')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResellerProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F0F1A] text-white flex items-center justify-center">Loading...</div>}>
      <ResellerProfileContent />
    </Suspense>
  );
}
