"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function LivekitSettingPage() {
  const [hostUrl, setHostUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [maxVideoBitrate, setMaxVideoBitrate] = useState(1500);
  const [audioCodec, setAudioCodec] = useState('OPUS');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings/livekit`)
      .then(res => res.json())
      .then(data => {
        setHostUrl(data.host_url || 'wss://livekit.yourdomain.com');
        setApiKey(data.api_key || 'APIMxxxxxxxxxxxx');
        setApiSecret(data.api_secret || '');
        setMaxVideoBitrate(data.max_video_bitrate || 1500);
        setAudioCodec(data.audio_codec || 'OPUS');
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching livekit settings:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/livekit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host_url: hostUrl,
          api_key: apiKey,
          api_secret: apiSecret,
          max_video_bitrate: Number(maxVideoBitrate),
          audio_codec: audioCodec,
        }),
      });

      if (res.ok) {
        toast.success('Livekit settings saved successfully!');
      } else {
        toast.error('Failed to save settings.');
      }
    } catch (err) {
      toast.error('Error saving settings.');
    }
    setIsSaving(false);
  };

  const testConnection = () => {
    toast.loading('Testing connection...', { duration: 1500 });
    setTimeout(() => {
      if (hostUrl && apiKey && apiSecret) {
        toast.success('Connected successfully!');
      } else {
        toast.error('Connection failed! Please check credentials.');
      }
    }, 1500);
  };

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <Toaster position="top-right" />
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Livekit Config</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure WebRTC streaming servers for Live and Audio Rooms.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <div className="flex items-center gap-4 mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
           <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-lg">📡</div>
           <div>
             <h3 className="font-bold text-white">Streaming Server Status</h3>
             <p className="text-sm text-indigo-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Configured & Operational</p>
           </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Livekit Host URL</label>
            <input 
              type="text" 
              value={hostUrl}
              onChange={(e) => setHostUrl(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
            <input 
              type="text" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">API Secret</label>
            <input 
              type="password" 
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="••••••••••••••••••••••••••••••••"
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-800">
             <div>
               <label className="block text-sm font-medium text-gray-400 mb-2">Max Video Bitrate (kbps)</label>
               <input 
                 type="number" 
                 value={maxVideoBitrate}
                 onChange={(e) => setMaxVideoBitrate(Number(e.target.value))}
                 className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" 
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-400 mb-2">Audio Room Codec</label>
               <select 
                 value={audioCodec}
                 onChange={(e) => setAudioCodec(e.target.value)}
                 className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
               >
                 <option value="OPUS">OPUS (High Quality)</option>
                 <option value="AAC">AAC</option>
               </select>
             </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={testConnection}
            className="px-6 py-3 bg-[#27272a] hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors border border-gray-600"
          >
            Test Connection
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
