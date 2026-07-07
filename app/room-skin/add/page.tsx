"use client";

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';
import Image from 'next/image';

export default function AddRoomSkinPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      toast.error('Please provide both name and image.');
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const res = await fetch(`${API_BASE_URL}/api/room-skins`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Room Skin added successfully!');
        setName('');
        setImage(null);
        setPreview(null);
      } else {
        toast.error('Failed to add Room Skin.');
      }
    } catch (err) {
      toast.error('Error adding Room Skin.');
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-2xl mx-auto pb-12 mt-10">
      <Toaster position="top-right" />
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-white mb-2">Add Room Skin</h1>
        <p className="text-[var(--text-secondary)] text-sm">Upload a new skin image for users to use in their rooms.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Skin Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Neon City"
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Skin Image</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700 px-6 py-10 bg-[#18181b]">
              <div className="text-center">
                {preview ? (
                  <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-600">
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <svg className="mx-auto h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-[#27272a] px-3 py-1.5 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 hover:bg-gray-700">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Uploading...' : 'Add Room Skin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
