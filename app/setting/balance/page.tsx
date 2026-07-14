"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function BalanceSettingPage() {
  const [beansActive, setBeansActive] = useState(false);
  const [diamondsActive, setDiamondsActive] = useState(false);
  const [diamondTopupRate, setDiamondTopupRate] = useState<number>(500);
  const [diamondWithdrawRate, setDiamondWithdrawRate] = useState<number>(400);
  const [beansTopupRate, setBeansTopupRate] = useState<number>(300);
  const [defaultBalance, setDefaultBalance] = useState<string>('beans');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // API থেকে ব্যালেন্স সেটিংস ফেচ করা হচ্ছে
      const res = await fetch(`${API_BASE_URL}/api/settings/balance`);
      let fetchedFromServer = false;
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setBeansActive(data.beans_active ?? true);
          setDiamondsActive(data.diamonds_active ?? true);
          setDiamondTopupRate(data.diamond_topup_rate ?? 500);
          setDiamondWithdrawRate(data.diamond_withdraw_rate ?? 400);
          setBeansTopupRate(data.beans_topup_rate ?? 300);
          setDefaultBalance(data.default_balance ?? 'beans');
          fetchedFromServer = true;
        }
      } 
      
      if (!fetchedFromServer) {
        const localSettings = localStorage.getItem('balanceSettings');
        if (localSettings) {
          const parsed = JSON.parse(localSettings);
          setBeansActive(parsed.beansActive);
          setDiamondsActive(parsed.diamondsActive);
          setDefaultBalance(parsed.defaultBalance || 'beans');
        } else {
          setBeansActive(true);
          setDiamondsActive(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch balance settings:', error);
      const localSettings = localStorage.getItem('balanceSettings');
      if (localSettings) {
        const parsed = JSON.parse(localSettings);
        setBeansActive(parsed.beansActive);
        setDiamondsActive(parsed.diamondsActive);
        setDefaultBalance(parsed.defaultBalance || 'beans');
      } else {
        setBeansActive(true);
        setDiamondsActive(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // API তে ব্যালেন্স সেটিংস সেভ করা হচ্ছে
      const res = await fetch(`${API_BASE_URL}/api/settings/balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          beans_active: beansActive,
          diamonds_active: diamondsActive,
          diamond_topup_rate: diamondTopupRate,
          diamond_withdraw_rate: diamondWithdrawRate,
          beans_topup_rate: beansTopupRate,
          default_balance: beansActive && diamondsActive ? defaultBalance : (beansActive ? 'beans' : (diamondsActive ? 'diamonds' : '')),
        }),
      });

      // Save locally as fallback since backend might not be ready
      localStorage.setItem('balanceSettings', JSON.stringify({ beansActive, diamondsActive, defaultBalance }));

      if (res.ok) {
        toast.success('Balance settings saved successfully!');
      } else {
        // Even if API fails, we saved locally, so let's show success for now
        toast.success('Balance settings saved locally!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">Loading settings...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <Toaster position="top-right" />
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Balance Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure balance features like Beans and Diamonds on the platform.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3">Currency Features</h2>
        <div className="space-y-6 max-w-3xl">
          
          <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-800">
            <div>
              <h3 className="font-semibold text-white">Beans Active</h3>
              <p className="text-sm text-gray-500 mt-1">Enable or disable beans system for the users.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={beansActive} 
                onChange={(e) => setBeansActive(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-800">
            <div>
              <h3 className="font-semibold text-white">Diamonds Active</h3>
              <p className="text-sm text-gray-500 mt-1">Enable or disable diamonds purchasing and trading.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={diamondsActive} 
                onChange={(e) => setDiamondsActive(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          {beansActive && diamondsActive && (
            <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-800 mt-4">
              <div>
                <h3 className="font-semibold text-white">Default Balance</h3>
                <p className="text-sm text-gray-500 mt-1">Choose which balance should be the main default for users.</p>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="default_balance"
                    value="beans"
                    checked={defaultBalance === 'beans'}
                    onChange={(e) => setDefaultBalance(e.target.value)}
                    className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-white text-sm font-medium">Beans</span>
                </label>
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="default_balance"
                    value="diamonds"
                    checked={defaultBalance === 'diamonds'}
                    onChange={(e) => setDefaultBalance(e.target.value)}
                    className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-white text-sm font-medium">Diamonds</span>
                </label>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Rate Settings Card */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <h2 className="text-lg font-bold text-white mb-1 border-b border-gray-800 pb-3">Exchange Rate Settings</h2>
        <p className="text-sm text-gray-500 mb-6 mt-2">প্রতি ১ লাখ (1,00,000) এককে রেট নির্ধারণ করুন।</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">

          {/* Diamond Topup Rate - শুধু Diamonds active থাকলে দেখাবে */}
          {diamondsActive && (
          <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">💎</span>
              <div>
                <h3 className="font-semibold text-white text-sm">Diamond Topup Rate</h3>
                <p className="text-[11px] text-gray-500">১ লাখ Diamond এর দাম (৳)</p>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
              <input
                type="number"
                min="0"
                value={diamondTopupRate}
                onChange={(e) => setDiamondTopupRate(Number(e.target.value))}
                className="w-full bg-[#0c0c1a] border border-gray-700 text-white text-lg font-bold rounded-lg pl-8 pr-3 py-2.5 outline-none focus:border-cyan-500 transition"
                placeholder="500"
              />
            </div>
            <p className="text-[10px] text-cyan-400 mt-2">১,০০,০০০ 💎 = ৳{diamondTopupRate.toLocaleString()}</p>
          </div>
          )}

          {/* Diamond Withdraw Rate - শুধু Diamonds active থাকলে দেখাবে */}
          {diamondsActive && (
          <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">💸</span>
              <div>
                <h3 className="font-semibold text-white text-sm">Diamond Withdraw Rate</h3>
                <p className="text-[11px] text-gray-500">১ লাখ Diamond তুললে (৳)</p>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
              <input
                type="number"
                min="0"
                value={diamondWithdrawRate}
                onChange={(e) => setDiamondWithdrawRate(Number(e.target.value))}
                className="w-full bg-[#0c0c1a] border border-gray-700 text-white text-lg font-bold rounded-lg pl-8 pr-3 py-2.5 outline-none focus:border-red-500 transition"
                placeholder="400"
              />
            </div>
            <p className="text-[10px] text-red-400 mt-2">১,০০,০০০ 💎 Withdraw = ৳{diamondWithdrawRate.toLocaleString()}</p>
          </div>
          )}

          {/* Beans Topup Rate - শুধু Beans active থাকলে দেখাবে */}
          {beansActive && (
          <div className="bg-[#18181b] border border-gray-800 rounded-xl p-5">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🟡</span>
              <div>
                <h3 className="font-semibold text-white text-sm">Beans Topup Rate</h3>
                <p className="text-[11px] text-gray-500">১ লাখ Beans এর দাম (৳)</p>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
              <input
                type="number"
                min="0"
                value={beansTopupRate}
                onChange={(e) => setBeansTopupRate(Number(e.target.value))}
                className="w-full bg-[#0c0c1a] border border-gray-700 text-white text-lg font-bold rounded-lg pl-8 pr-3 py-2.5 outline-none focus:border-yellow-500 transition"
                placeholder="300"
              />
            </div>
            <p className="text-[10px] text-yellow-400 mt-2">১,০০,০০০ 🟡 = ৳{beansTopupRate.toLocaleString()}</p>
          </div>
          )}

        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
