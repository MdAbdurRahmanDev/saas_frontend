"use client";

import React from 'react';

export default function RoomSkinsPage() {
  const mockSkins = [
    { id: 1, name: 'Neon City Night', type: 'Premium', cost: 1500, image: 'https://via.placeholder.com/300x500/18181b/ffffff?text=Neon+City', status: 'Active' },
    { id: 2, magic: true, name: 'Enchanted Forest', type: 'Free', cost: 0, image: 'https://via.placeholder.com/300x500/064e3b/ffffff?text=Forest', status: 'Active' },
    { id: 3, name: 'Cyberpunk Red', type: 'Premium', cost: 3000, image: 'https://via.placeholder.com/300x500/7f1d1d/ffffff?text=Cyber', status: 'Inactive' },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Audio Room Skins</h1>
          <p className="text-[var(--text-secondary)] text-sm">Upload and manage background wallpapers that users can equip in their Audio Boards/Rooms.</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-pink-500/25 transition-all mt-4 sm:mt-0 flex items-center gap-2">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Add New Room Skin
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSkins.map(skin => (
          <div key={skin.id} className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative group">
            <div className="aspect-[9/16] w-full bg-black relative">
               <img src={skin.image} alt={skin.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
               
               <div className="absolute top-3 left-3 flex gap-2">
                 <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border backdrop-blur-md ${
                   skin.type === 'Premium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-green-500/20 text-green-400 border-green-500/50'
                 }`}>
                   {skin.type}
                 </span>
               </div>
               
               {skin.status === 'Inactive' && (
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500/80 text-white px-3 py-1 rounded text-sm font-bold shadow-lg transform -rotate-12">INACTIVE</span>
                 </div>
               )}
            </div>
            
            <div className="p-4">
               <h3 className="text-white font-bold text-lg mb-1">{skin.name}</h3>
               <div className="flex justify-between items-center mt-2">
                 <div className="flex items-center gap-1">
                   <span className="text-cyan-400 text-sm">💎</span>
                   <span className="text-gray-300 text-sm font-bold">{skin.cost > 0 ? skin.cost : 'Free'}</span>
                 </div>
                 <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Edit Settings</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
