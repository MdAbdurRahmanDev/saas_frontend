"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState, useEffect } from 'react';

export default function GiftCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // পেজ লোড হওয়ার সময় ক্যাটাগরিগুলো কল করা
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/gift-categories?type=platform`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // নতুন ক্যাটাগরি সেভ করা
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/gift-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim(), type: 'platform' })
      });

      if (response.ok) {
        setNewCategoryName('');
        fetchCategories(); // লিস্ট আপডেট করা
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error connecting to server');
    } finally {
      setSaving(false);
    }
  };

  // ক্যাটাগরি ডিলিট করা
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/gift-categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="flex flex-col space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-2">
          Platform Gift Categories
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Manage dynamic categories for platform gifts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Add Category Form */}
        <div className="md:col-span-1">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">➕</span>
              Add New
            </h2>
            
            <form onSubmit={handleAddCategory} className="relative z-10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category Name</label>
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Valentines"
                  className="w-full bg-[#18181b] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
              <button 
                type="submit"
                disabled={saving || !newCategoryName.trim()}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Category'}
              </button>
            </form>
          </div>
        </div>

        {/* Category List */}
        <div className="md:col-span-2">
          <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#18181b]/50">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">📋</span>
                All Categories
              </h2>
              <span className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                Total: {categories.length}
              </span>
            </div>

            <div className="p-0">
              {loading ? (
                <div className="text-center py-10 text-gray-500 text-sm">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">No categories found. Add one!</div>
              ) : (
                <ul className="divide-y divide-gray-800/50">
                  {categories.map((cat, idx) => (
                    <li key={cat.id || idx} className="flex items-center justify-between px-6 py-4 hover:bg-[#18181b] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span className="text-gray-200 font-medium">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 font-mono">
                          {new Date(cat.created_at).toLocaleDateString()}
                        </span>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                          title="Delete Category"
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
