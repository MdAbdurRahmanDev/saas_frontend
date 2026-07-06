"use client";

import React from 'react';

export default function GeneralSettingPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-5xl mx-auto pb-12">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">General Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure core application details, branding, and platform-wide configurations.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <h2 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-3">App Branding</h2>
        <div className="space-y-6 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Application Name</label>
            <input type="text" defaultValue="LiveStream Pro" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" />
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">App Logo</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-[#18181b] hover:border-indigo-500 transition cursor-pointer">
                <span className="text-sm text-gray-500">Upload Image (PNG/JPG)</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Favicon</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-[#18181b] hover:border-indigo-500 transition cursor-pointer">
                <span className="text-sm text-gray-500">Upload Icon (ICO)</span>
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
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
            <input type="email" defaultValue="support@livestream.com" className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>
        
        <div className="mt-10 flex justify-end">
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
