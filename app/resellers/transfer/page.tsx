"use client";

import React, { useState } from 'react';
import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';

export default function CoinTransferPage() {
  const [recipientUuid, setRecipientUuid] = useState('');
  const [amount, setAmount] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedReseller, setVerifiedReseller] = useState<any>(null);
  const [verifyError, setVerifyError] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferResult, setTransferResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!recipientUuid.trim()) return;
    setIsVerifying(true);
    setVerifyError('');
    setVerifiedReseller(null);
    setIsVerified(false);
    setTransferResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller/search?q=${recipientUuid.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setVerifiedReseller(data);
        setIsVerified(true);
      } else {
        setVerifyError('Reseller not found. Please check UUID or Reseller Code.');
      }
    } catch (err) {
      setVerifyError('Network error. Failed to connect to server.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedReseller || !amount || Number(amount) <= 0) return;
    
    setIsTransferring(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reseller_id: verifiedReseller.id, // Using the _id of the reseller
          amount: Number(amount)
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTransferResult(data);
        // Clean up the form
        setAmount('');
      } else {
        const errText = await res.text();
        alert(`Transfer failed: ${errText}`);
      }
    } catch (err) {
      alert('Network error during transfer.');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mb-2">
          Coin Transfer Portal
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Transfer coins directly to a Reseller's wallet using their UUID or Reseller Code.
        </p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Transfer Form */}
        <div className="flex-1 p-8 relative">
          <h2 className="text-lg font-bold text-white mb-6">Transfer Details</h2>
          
          <div className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Recipient UUID or Reseller Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <input 
                    type="text" 
                    value={recipientUuid}
                    onChange={(e) => { setRecipientUuid(e.target.value); setIsVerified(false); setVerifiedReseller(null); }}
                    placeholder="e.g. U-123456 or 123456"
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 font-mono transition-all"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleVerify}
                  disabled={!recipientUuid || isVerifying}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors min-w-[100px]"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
              {verifyError && <p className="text-red-400 text-sm mt-2">{verifyError}</p>}
              
              {/* Verified User Details Card */}
              {isVerified && verifiedReseller && (
                <div className="mt-3 bg-gradient-to-r from-emerald-500/10 to-[#18181b] border border-emerald-500/30 rounded-xl p-4 flex flex-col gap-4 animate-fade-in-up">
                  <div className="flex items-center gap-4">
                    {verifiedReseller.profile_pic ? (
                      <img src={verifiedReseller.profile_pic} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/30 shadow-sm" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/30 flex items-center justify-center font-bold text-xl shadow-sm">
                        {verifiedReseller.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        {verifiedReseller.name}
                        <svg width="16" height="16" fill="currentColor" className="text-blue-400" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      </div>
                      <div className="text-xs text-emerald-400/80 font-mono mt-0.5">UUID: {verifiedReseller.uuid}</div>
                      <div className="text-xs text-gray-400 mt-1">{verifiedReseller.email}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-500/20">
                     <div>
                       <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Reseller Code</div>
                       <div className="text-amber-400 font-mono text-sm font-bold bg-amber-500/10 px-1.5 py-0.5 rounded inline-block border border-amber-500/20 mt-1">{verifiedReseller.reseller_code}</div>
                     </div>
                     {verifiedReseller.phone_number && (
                       <div>
                         <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Phone Number</div>
                         <div className="text-gray-300 text-sm mt-1">{verifiedReseller.phone_number}</div>
                       </div>
                     )}
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleTransfer} className={`transition-opacity duration-300 ${isVerified ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Amount to Transfer</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-amber-500 text-lg">
                    💎
                  </span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount..."
                    min="1"
                    className="w-full bg-[#18181b] border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {/* [BENGALI]: client jodi beans chai tahole eita 'Beans' hobe */}
                    Diamonds
                  </div>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={!isVerified || !amount || Number(amount) <= 0 || isTransferring}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isTransferring ? 'Processing Transfer...' : (
                  <>
                    Transfer Coins 
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Success Message overlay */}
          {transferResult && (
             <div className="absolute inset-0 bg-[#0c0c1a]/95 backdrop-blur-sm z-20 flex items-center justify-center p-8 rounded-xl animate-fade-in">
                <div className="text-center w-full">
                   <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/30">
                     <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Transfer Successful!</h3>
                   <p className="text-gray-400 text-sm mb-6">
                     You have successfully transferred <strong className="text-amber-400">{transferResult.amount} Diamonds</strong> to {verifiedReseller?.name}.
                   </p>
                   <div className="bg-[#18181b] rounded-lg p-4 mb-6 border border-gray-800 text-left">
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Transaction ID</div>
                      <div className="text-sm font-mono text-gray-300">{transferResult.trx_id}</div>
                   </div>
                   <div className="flex gap-3">
                     <button 
                       onClick={() => {
                         setTransferResult(null);
                         setRecipientUuid('');
                         setIsVerified(false);
                         setVerifiedReseller(null);
                       }}
                       className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition"
                     >
                       Make Another Transfer
                     </button>
                     <Link href={`/resellers/profile?id=${verifiedReseller?.id}`} className="flex-1">
                       <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition shadow-lg">
                         View Profile
                       </button>
                     </Link>
                   </div>
                </div>
             </div>
          )}
        </div>

        {/* Right Side: Reseller Wallet Status */}
        <div className="w-full md:w-72 bg-[#18181b] p-8 border-l border-gray-800">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Recent Transfers</h3>
           <div className="space-y-4">
              <p className="text-xs text-gray-500 italic">Transfer history will appear here once you make transactions.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
