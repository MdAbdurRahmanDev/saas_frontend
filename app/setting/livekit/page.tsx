"use client";

import React from 'react';

export default function LivekitSettingPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Livekit Config</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure WebRTC streaming servers for Live and Audio Rooms.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <div className="flex items-center gap-4 mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
           <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-lg">📡</div>
           <div>
             <h3 className="font-bold text-white">Streaming Server Status</h3>
             <p className="text-sm text-indigo-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Connected & Operational</p>
           </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Livekit Host URL</label>
            <input type="text" defaultValue="wss://livekit.yourdomain.com" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
            <input type="text" defaultValue="APIMxxxxxxxxxxxx" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">API Secret</label>
            <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none font-mono" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-800">
             <div>
               <label className="block text-sm font-medium text-gray-400 mb-2">Max Video Bitrate (kbps)</label>
               <input type="number" defaultValue="1500" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-400 mb-2">Audio Room Codec</label>
               <select className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none">
                 <option>OPUS (High Quality)</option>
                 <option>AAC</option>
               </select>
             </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-3 bg-[#27272a] hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors border border-gray-600">
            Test Connection
          </button>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
