"use client";

import React from 'react';

export default function BannerSettingPage() {
  const mockBanners = [
    { id: 1, image: 'https://via.placeholder.com/600x200/9333ea/ffffff?text=Summer+Event', link: 'https://livestream.app/events/summer', status: 'Active' },
    { id: 2, image: 'https://via.placeholder.com/600x200/2563eb/ffffff?text=Top+Hosts+Tournament', link: 'https://livestream.app/tournaments/tophost', status: 'Active' },
    { id: 3, image: 'https://via.placeholder.com/600x200/db2777/ffffff?text=New+Gifts+Available', link: 'https://livestream.app/store', status: 'Inactive' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Banner Settings</h1>
          <p className="text-[var(--text-secondary)] text-sm">Manage the sliding promotional banners on the app's home screen.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-colors flex items-center gap-2 mt-4 sm:mt-0">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Upload New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBanners.map(banner => (
          <div key={banner.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden group">
            <div className="w-full h-40 bg-gray-900 relative">
               <img src={banner.image} alt="Banner" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               <div className="absolute top-3 right-3">
                 <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded backdrop-blur-md border ${
                   banner.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'
                 }`}>
                   {banner.status}
                 </span>
               </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
               <div>
                 <label className="text-xs text-gray-500 font-bold uppercase">Target Link URL</label>
                 <input type="text" defaultValue={banner.link} className="w-full mt-1 bg-[#18181b] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none" />
               </div>
               <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                 <button className="text-sm font-semibold text-gray-400 hover:text-white transition">Edit</button>
                 <button className="text-sm font-semibold text-red-400 hover:text-red-300 transition">Delete</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
