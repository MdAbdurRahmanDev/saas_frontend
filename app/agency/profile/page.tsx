"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/utils/api';

function AgencyProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [agencyDetails, setAgencyDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Suspend Modal State
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);

  const fetchAgencyDetails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/agency/${id}`);
      if (res.ok) {
        const data = await res.json();
        setAgencyDetails(data);
        setEditName(data.name || '');
        setEditPhone(data.phone_number || '');
      } else {
        setError('Failed to fetch agency details.');
      }
    } catch (err) {
      setError('Network error. Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError('Agency ID is missing.');
      setLoading(false);
      return;
    }
    fetchAgencyDetails();
  }, [id]);

  const handleEditSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/agency/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, phone_number: editPhone }),
      });
      if (res.ok) {
        alert('Agency details updated successfully!');
        setShowEditModal(false);
        fetchAgencyDetails(); // Refresh data
      } else {
        alert('Failed to update agency details.');
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
      const res = await fetch(`${API_BASE_URL}/api/agency/${id}/suspend`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Agency is now ${data.status}`);
        setShowSuspendModal(false);
        fetchAgencyDetails(); // Refresh data
      } else {
        alert('Failed to update agency status.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setIsSuspending(false);
    }
  };

  // Mock data for hosts list since we don't have hosts API yet
  const hostsList = [
    { id: 1, name: 'Emma Watson', uuid: 'U-11223', status: 'Online', diamonds: '450K' },
    { id: 2, name: 'John Wick', uuid: 'U-44556', status: 'Offline', diamonds: '120K' },
    { id: 3, name: 'Sarah Connor', uuid: 'U-77889', status: 'Online', diamonds: '850K' },
    { id: 4, name: 'Lara Croft', uuid: 'U-99000', status: 'Offline', diamonds: '320K' },
  ];

  if (loading) {
    return <div className="text-center text-gray-500 p-10">Loading agency profile...</div>;
  }

  if (error || !agencyDetails) {
    return (
      <div className="text-center p-10">
        <div className="text-red-400 mb-4">{error || 'Agency not found.'}</div>
        <Link href="/agency/list" className="text-indigo-400 underline">Back to Agency List</Link>
      </div>
    );
  }

  const isSuspended = agencyDetails.status === 'suspended';

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <Link href="/agency/list" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 mb-2 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Agency List
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            {agencyDetails.name}
            <span className={`text-xs px-2.5 py-1 rounded border uppercase tracking-wider font-bold ${
              !isSuspended ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {agencyDetails.status}
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-mono">
            Code: <span className="text-yellow-400 font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20">{agencyDetails.agency_code}</span> • Joined {new Date(agencyDetails.agency_join_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <button 
             onClick={() => setShowSuspendModal(true)}
             className={`px-5 py-2 text-white rounded-lg text-sm font-semibold border transition flex-1 sm:flex-none ${
               isSuspended ? 'bg-green-600 hover:bg-green-700 border-green-700' : 'bg-[#1f2937] hover:bg-red-900 border-gray-700 hover:border-red-800 text-red-400 hover:text-white'
             }`}
           >
            {isSuspended ? 'Reactivate Agency' : 'Suspend Agency'}
          </button>
          <button 
            onClick={() => setShowEditModal(true)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex-1 sm:flex-none"
          >
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
              {agencyDetails.name?.charAt(0)?.toUpperCase()}
            </div>
            
            <h2 className="text-2xl font-bold text-white relative z-10">{agencyDetails.name}</h2>
            <p className="text-indigo-400 font-mono text-sm mb-4 relative z-10">UUID: {agencyDetails.uuid}</p>
            
            <div className="flex gap-2 mb-6 relative z-10 flex-wrap justify-center">
              <span className="px-3 py-1 bg-[#18181b] border border-gray-700 rounded-full text-xs text-gray-300 font-semibold">Verified</span>
              <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-xs font-semibold">Premium Agency</span>
            </div>

            <div className="w-full bg-[#18181b] rounded-xl p-4 text-left border border-gray-800/50 space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📧</span>
                <span className="text-gray-300 text-sm break-all">{agencyDetails.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📱</span>
                <span className="text-gray-300 text-sm">{agencyDetails.phone_number || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Hosts</div>
              <div className="text-2xl font-bold text-white">{agencyDetails.total_hosts}</div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Active Streams</div>
              <div className="text-2xl font-bold text-green-400">0</div>
            </div>
            <div className="bg-[var(--card-bg)] rounded-xl p-4 border border-gray-800 shadow-sm text-center col-span-2">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Current Balance</div>
              <div className="text-3xl font-bold text-cyan-400">{agencyDetails.balance?.toLocaleString() || '0'} 💎</div>
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
                 <div className="text-3xl font-bold text-emerald-400">$0.00</div>
                 <div className="text-xs text-gray-500 font-semibold">New Agency</div>
               </div>
             </div>
             
             {/* Mock Chart Area */}
             <div className="h-32 flex items-end gap-2 px-2 relative z-10 opacity-30">
               {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                 <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-t-sm transition-colors group relative flex justify-center" style={{ height: `${height}%` }}>
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
                        <div className="text-xs text-gray-500 font-mono">UUID: {host.uuid}</div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          host.status === 'Online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {host.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center text-cyan-400 font-bold">{host.diamonds} 💎</td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-indigo-400 hover:text-indigo-300 font-semibold underline text-xs">View Data</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151520] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-white mb-4">Edit Agency Details</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Agency Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0c0c1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Agency Name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-[#0c0c1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
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
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
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
              {isSuspended ? 'Reactivate Agency?' : 'Suspend Agency?'}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {isSuspended 
                ? 'This agency will be reactivated and will regain full access to the platform.' 
                : 'This agency will be suspended and will no longer have access to their dashboard until reactivated.'}
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

export default function AgencyProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F0F1A] text-white flex items-center justify-center">Loading...</div>}>
      <AgencyProfileContent />
    </Suspense>
  );
}
