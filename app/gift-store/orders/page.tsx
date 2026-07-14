"use client";
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function GiftOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [totalBeans, setTotalBeans] = useState(0);
  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [topItem, setTopItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredOrders(orders.filter(o => 
        o.user_name?.toLowerCase().includes(search.toLowerCase()) || 
        o.gift_name?.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setFilteredOrders(orders);
    }
  }, [search, orders]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/gift-orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalBeans(data.totalSalesBeans || 0);
        setTotalDiamonds(data.totalSalesDiamonds || 0);
        setTopItem(data.topSellingItem || 'N/A');
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Gift Orders</h1>
          <p className="text-[var(--text-secondary)] text-sm">Monitor all user gift purchases, calculate totals and find top sellers.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg">
          <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Total Beans Sales</div>
          <div className="text-3xl font-bold text-yellow-400">{totalBeans.toLocaleString()}</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg">
          <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Total Diamonds Sales</div>
          <div className="text-3xl font-bold text-cyan-400">{totalDiamonds.toLocaleString()}</div>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
          <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Top Selling Item</div>
          <div className="text-2xl font-bold text-white relative z-10">{topItem}</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Order History</h2>
          <input 
            type="text"
            placeholder="Search user or gift..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#18181b] text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Gift Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Currency</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order, i) => (
                  <tr key={order.id || i} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{order.user_name || order.user_email}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={order.image_url} alt="" className="w-8 h-8 rounded-md bg-gray-800" />
                      <span className="text-gray-300">{order.gift_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-800 rounded-md text-xs font-medium text-gray-300">
                        {order.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{order.price}</td>
                    <td className="px-6 py-4">
                      {order.currency === 'beans' 
                        ? <span className="text-yellow-400 font-medium">Beans</span>
                        : <span className="text-cyan-400 font-medium">Diamonds</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
