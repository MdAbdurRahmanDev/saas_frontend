"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function FirebaseSettingPage() {
  const [projectId, setProjectId] = useState('');
  const [fcmServerKey, setFcmServerKey] = useState('');
  const [senderId, setSenderId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings/firebase`)
      .then(res => res.json())
      .then(data => {
        setProjectId(data.project_id || 'livestream-app-prod');
        setFcmServerKey(data.fcm_server_key || '');
        setSenderId(data.sender_id || '');
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching firebase settings:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          fcm_server_key: fcmServerKey,
          sender_id: senderId,
        }),
      });

      if (res.ok) {
        toast.success('Firebase settings saved successfully!');
      } else {
        toast.error('Failed to save settings.');
      }
    } catch (err) {
      toast.error('Error saving settings.');
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-12">
      <Toaster position="top-right" />
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-[#FFCA28] mb-2 flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.6 3.23l-2.73 5.37-3.92-3.8c-.46-.44-1.22-.12-1.22.54v14.4c0 .28.22.5.5.5h15.54c.28 0 .5-.22.5-.5V5.34c0-.66-.76-.98-1.22-.54l-3.92 3.8-2.73-5.37a.64.64 0 00-1.14 0z" />
          </svg>
          Firebase Config
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">Configure Firebase for Push Notifications (FCM) and Phone Auth.</p>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Project ID</label>
            <input 
              type="text" 
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#FFCA28] focus:outline-none font-mono" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Firebase Cloud Messaging (FCM) Server Key</label>
            <textarea 
              rows={3} 
              value={fcmServerKey}
              onChange={(e) => setFcmServerKey(e.target.value)}
              placeholder="AAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
              className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#FFCA28] focus:outline-none font-mono resize-none"
            ></textarea>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Sender ID</label>
             <input 
               type="text" 
               value={senderId}
               onChange={(e) => setSenderId(e.target.value)}
               className="w-full bg-[#18181b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#FFCA28] focus:outline-none font-mono" 
             />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-[#FFCA28] hover:bg-[#FFB300] text-black rounded-lg text-sm font-extrabold shadow-lg transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Firebase Keys'}
          </button>
        </div>
      </div>
    </div>
  );
}
