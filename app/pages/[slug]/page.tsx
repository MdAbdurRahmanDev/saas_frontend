"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const getTitle = (slug: string) => {
    switch (slug) {
      case 'privacy-policy':
        return 'Privacy Policy';
      case 'terms-of-service':
        return 'Terms of Service';
      case 'about-us':
        return 'About Us';
      default:
        return 'Edit Page';
    }
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        // Fetch from API
        const res = await fetch(`http://localhost:8080/api/pages/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setContent(data.content || '');
        }
      } catch (error) {
        console.error("Failed to fetch page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPageContent();
  }, [slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`http://localhost:8080/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setMessage({ text: 'Page updated successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to update page.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{getTitle(slug)}</h1>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] transition"
          >
            Go Back
          </button>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-xl border border-gray-800">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Content
            </label>
            <textarea
              rows={20}
              className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              You can use plain text. Line breaks will be preserved in the mobile app.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center font-medium disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
