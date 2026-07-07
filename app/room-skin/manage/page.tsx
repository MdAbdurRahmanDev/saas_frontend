"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';
import Image from 'next/image';

interface RoomSkin {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
}

export default function ManageRoomSkinPage() {
  const [skins, setSkins] = useState<RoomSkin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSkins = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/room-skins`);
      if (res.ok) {
        const data = await res.json();
        setSkins(data);
      }
    } catch (err) {
      console.error("Error fetching skins:", err);
      toast.error('Failed to load room skins');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSkins();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skin?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/room-skins/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Skin deleted successfully');
        setSkins(skins.filter(skin => skin.id !== id));
      } else {
        toast.error('Failed to delete skin');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting skin');
    }
  };

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto pb-12 mt-10">
      <Toaster position="top-right" />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Manage Room Skins</h1>
          <p className="text-[var(--text-secondary)] text-sm">View and remove available room skins.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skins.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10 bg-[var(--card-bg)] rounded-2xl border border-gray-800">
            No room skins found.
          </div>
        ) : (
          skins.map((skin) => (
            <div key={skin.id} className="bg-[var(--card-bg)] rounded-xl border border-gray-800 shadow-xl overflow-hidden group">
              <div className="relative w-full h-40 bg-[#18181b]">
                <Image 
                  src={`${API_BASE_URL}${skin.image_url}`} 
                  alt={skin.name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(skin.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform transform scale-90 group-hover:scale-100"
                    title="Delete Skin"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-gray-800">
                <h3 className="font-bold text-white truncate">{skin.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Added: {new Date(skin.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
