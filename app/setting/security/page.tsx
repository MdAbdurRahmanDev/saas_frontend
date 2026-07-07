"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function SecuritySettingPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings/security`)
      .then(res => res.json())
      .then(data => {
        setTwoFactorEnabled(data.two_factor_enabled);
        setPublicKey(data.public_key || 'pk_test_1234567890abcdef');
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching security settings:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/security`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          two_factor_enabled: twoFactorEnabled,
          public_key: publicKey,
        }),
      });

      if (res.ok) {
        toast.success('Security settings saved successfully!');
      } else {
        toast.error('Failed to save settings.');
      }
    } catch (err) {
      toast.error('Error saving settings.');
    }
    setIsSaving(false);
  };

  const generateNewKey = () => {
    const newKey = 'pk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setPublicKey(newKey);
    toast.success('New API key generated! Please save to apply.');
  };

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <Toaster position="top-right" />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Security Settings</h1>
          <p className="text-[var(--text-secondary)] text-sm">Manage admin credentials, 2FA, and API keys securely.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl p-8 h-fit">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-red-500">🔒</span> Change Admin Password
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-red-500 focus:outline-none" />
            </div>
            <button className="w-full py-3 bg-[#27272a] hover:bg-gray-700 text-white rounded-lg text-sm font-semibold shadow transition-colors mt-2 border border-gray-600">
              Update Password
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl p-8">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-blue-500">🛡️</span> Two-Factor Authentication
            </h2>
            <p className="text-sm text-gray-400 mb-4">Protect your admin account with an extra layer of security using Google Authenticator.</p>
            <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-800">
              <span className="font-semibold text-white">Enable 2FA</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl p-8">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-green-500">🔑</span> System API Keys
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Public Key</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value={publicKey} className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2 text-gray-400 font-mono text-sm" />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey);
                      toast.success('Copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-[#27272a] hover:bg-gray-700 text-white rounded border border-gray-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <button onClick={generateNewKey} className="text-sm text-green-500 hover:text-green-400 font-semibold underline mt-2">Generate New Keys</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
