"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function ResellerPacksPage() {
  const [packs, setPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPackId, setCurrentPackId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    price: 0,
    type: 'diamonds',
    is_active: true
  });

  const fetchPacks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/reseller-packs?admin=true`);
      if (res.ok) {
        const data = await res.json();
        setPacks(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const openAddModal = () => {
    setEditMode(false);
    setCurrentPackId('');
    setFormData({ name: '', amount: 0, price: 0, type: 'diamonds', is_active: true });
    setShowModal(true);
  };

  const openEditModal = (pack: any) => {
    setEditMode(true);
    setCurrentPackId(pack.id);
    setFormData({
      name: pack.name,
      amount: pack.amount,
      price: pack.price,
      type: pack.type,
      is_active: pack.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pack?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reseller-packs?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchPacks();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editMode 
      ? `${API_BASE_URL}/api/admin/reseller-packs?id=${currentPackId}` 
      : `${API_BASE_URL}/api/admin/reseller-packs`;
    const method = editMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          amount: Number(formData.amount),
          price: Number(formData.price),
          type: formData.type,
          is_active: formData.is_active
        })
      });
      if (res.ok) {
        setShowModal(false);
        fetchPacks();
      } else {
        alert('Failed to save pack');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Reseller Packs</h1>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-600"
        >
          + Add New Pack
        </button>
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="bg-[#11111a] rounded-lg overflow-hidden border border-[#2a2a35]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1a1a24] text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Price (৳)</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a35]">
              {packs.map((pack) => (
                <tr key={pack.id} className="hover:bg-[#1a1a24] transition-colors">
                  <td className="px-6 py-4">{pack.name}</td>
                  <td className="px-6 py-4">{pack.amount}</td>
                  <td className="px-6 py-4">৳{pack.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${pack.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {pack.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => openEditModal(pack)} className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                    <button onClick={() => handleDelete(pack.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
              {packs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">No packs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a1a24] p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold text-white mb-4">
              {editMode ? 'Edit Pack' : 'Add Pack'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#11111a] border border-[#2a2a35] rounded px-3 py-2 text-white" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-1">Amount (Coins)</label>
                <input 
                  type="number" 
                  required
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full bg-[#11111a] border border-[#2a2a35] rounded px-3 py-2 text-white" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-1">Price (৳)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full bg-[#11111a] border border-[#2a2a35] rounded px-3 py-2 text-white" 
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={formData.is_active}
                    onChange={e => setFormData({...formData, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
