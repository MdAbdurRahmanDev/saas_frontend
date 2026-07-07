"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';

export default function PlatformGiftsSettingsPage() {
  const [maxGifts, setMaxGifts] = useState(5);
  const [enableAutomated, setEnableAutomated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/platform-gifts/settings`);
      if (res.ok) {
        const data = await res.json();
        setMaxGifts(data.max_gifts_per_user_day ?? 5);
        setEnableAutomated(data.enable_automated ?? true);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/platform-gifts/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_gifts_per_user_day: parseInt(maxGifts.toString()) || 0,
          enable_automated: enableAutomated,
        }),
      });

      if (res.ok) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
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
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
            Platform Gift Settings
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Configure global rules, limits, and triggers for platform-wide automated gifts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-md text-sm font-semibold shadow-lg hover:shadow-teal-500/25 hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Global Limits */}
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">🛡️</span>
            Global Limitations
          </h2>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Max Platform Gifts Per User / Day</label>
              <input 
                type="number" 
                value={maxGifts}
                onChange={(e) => setMaxGifts(parseInt(e.target.value) || 0)}
                className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1.5">To prevent spam or abuse of the automated system. <strong>Set to 0 for unlimited.</strong></p>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-xl border border-gray-800">
              <div>
                <h3 className="text-sm font-medium text-gray-200">Enable Automated Gifts</h3>
                <p className="text-xs text-gray-500 mt-1">Globally turn on/off all trigger-based gifts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={enableAutomated}
                  onChange={(e) => setEnableAutomated(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
