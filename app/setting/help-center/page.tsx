"use client";

import React, { useState, useEffect } from 'react';

export default function HelpCenterSettings() {
  const [liveChatEnabled, setLiveChatEnabled] = useState(false);
  const [emailSupportEnabled, setEmailSupportEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [telegramSupportEnabled, setTelegramSupportEnabled] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/settings/help-center');
      if (response.ok) {
        const data = await response.json();
        setLiveChatEnabled(data.live_chat_enabled || false);
        setEmailSupportEnabled(data.email_support_enabled || false);
        setEmailAddress(data.email_address || '');
        setTelegramSupportEnabled(data.telegram_support_enabled || false);
        setTelegramUsername(data.telegram_username || '');
      }
    } catch (error) {
      console.error('Failed to fetch help center settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8080/api/settings/help-center', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          live_chat_enabled: liveChatEnabled,
          email_support_enabled: emailSupportEnabled,
          email_address: emailAddress,
          telegram_support_enabled: telegramSupportEnabled,
          telegram_username: telegramUsername,
        }),
      });

      if (response.ok) {
        alert('Help Center settings updated successfully!');
      } else {
        alert('Failed to update settings.');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Help Center Settings</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Configure support channels for your users.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            )}
            Save Changes
          </button>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 space-y-8">
            
            {/* Live Chat Support */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)]">Live Chat Support</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Enable live chat support for users in the app.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={liveChatEnabled}
                    onChange={(e) => setLiveChatEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>
            </div>

            <hr className="border-[var(--card-border)]" />

            {/* Email Support */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)]">Email Support</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Allow users to contact you via Email.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={emailSupportEnabled}
                    onChange={(e) => setEmailSupportEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>
              
              {emailSupportEnabled && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg border border-[var(--card-border)]">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Support Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="support@example.com"
                    className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              )}
            </div>

            <hr className="border-[var(--card-border)]" />

            {/* Telegram Support */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)]">Telegram Support</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Allow users to reach your official Telegram account.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={telegramSupportEnabled}
                    onChange={(e) => setTelegramSupportEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              {telegramSupportEnabled && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg border border-[var(--card-border)]">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Telegram Username</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-[var(--input-border)] bg-[#27272a] text-gray-400">
                      @
                    </span>
                    <input
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder="livestream_support"
                      className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-none rounded-r-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
