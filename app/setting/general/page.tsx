"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function GeneralSettingPage() {
  const [appName, setAppName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [appLogoFile, setAppLogoFile] = useState<File | null>(null);
  const [appLogoPreview, setAppLogoPreview] = useState<string | null>(null);

  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/general`);
      if (res.ok) {
        const data = await res.json();
        setAppName(data.app_name || '');
        setSupportEmail(data.support_email || '');
        setMaintenanceMode(data.maintenance_mode || false);
        if (data.app_logo) setAppLogoPreview(`${API_BASE_URL}${data.app_logo}`);
        if (data.favicon) setFaviconPreview(`${API_BASE_URL}${data.favicon}`);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAppLogoFile(file);
      setAppLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('appName', appName);
      formData.append('supportEmail', supportEmail);
      formData.append('maintenanceMode', String(maintenanceMode));
      if (appLogoFile) formData.append('appLogo', appLogoFile);
      if (faviconFile) formData.append('favicon', faviconFile);

      const res = await fetch(`${API_BASE_URL}/api/settings/general`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('General settings saved successfully!');
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
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">General Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure core application details, branding, and platform-wide configurations.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3">App Branding</h2>
        <div className="space-y-6 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Application Name</label>
            <input 
              type="text" 
              value={appName} 
              onChange={(e) => setAppName(e.target.value)} 
              placeholder="e.g. LiveStream Pro" 
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" 
            />
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">App Logo</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-[#18181b] hover:border-indigo-500 transition cursor-pointer relative overflow-hidden group">
                <input type="file" accept="image/png, image/jpeg" onChange={handleLogoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {appLogoPreview ? (
                  <img src={appLogoPreview} alt="App Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-sm text-gray-500">Upload Image (PNG/JPG)</span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Favicon</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center bg-[#18181b] hover:border-indigo-500 transition cursor-pointer relative overflow-hidden group">
                <input type="file" accept=".ico, image/png" onChange={handleFaviconChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {faviconPreview ? (
                  <img src={faviconPreview} alt="Favicon" className="w-16 h-16 object-contain" />
                ) : (
                  <span className="text-sm text-gray-500">Upload Icon (ICO/PNG)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3 mt-10">Platform Control</h2>
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-800">
            <div>
              <h3 className="font-semibold text-white">Maintenance Mode</h3>
              <p className="text-sm text-gray-500 mt-1">Temporarily disable access to the user app for upgrades.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={maintenanceMode} 
                onChange={(e) => setMaintenanceMode(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
            <input 
              type="email" 
              value={supportEmail} 
              onChange={(e) => setSupportEmail(e.target.value)} 
              placeholder="e.g. support@livestream.com" 
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" 
            />
          </div>
        </div>
        
        <div className="mt-10 flex justify-end">
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
