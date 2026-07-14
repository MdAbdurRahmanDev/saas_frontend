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
  const [showCurrency, setShowCurrency] = useState('both');
  
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const categories = Array.from(new Set(orders.map(o => o.category).filter(Boolean)));

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;

    if (search) {
      result = result.filter(o => 
        o.user_name?.toLowerCase().includes(search.toLowerCase()) || 
        o.gift_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(o => o.category === categoryFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(o => {
        const orderDate = new Date(o.created_at);
        if (dateFilter === 'today') {
          return orderDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return orderDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          return orderDate >= monthAgo;
        }
        return true;
      });
    }

    setFilteredOrders(result);
  }, [search, categoryFilter, dateFilter, orders]);

  const fetchOrders = async () => {
    try {
      const [res, settingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/gift-orders`),
        fetch(`${API_BASE_URL}/api/settings/balance`)
      ]);
      
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalBeans(data.totalSalesBeans || 0);
        setTotalDiamonds(data.totalSalesDiamonds || 0);
        setTopItem(data.topSellingItem || 'N/A');
      }

      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        if (settings.beans_active && settings.diamonds_active) {
          setShowCurrency(settings.default_balance || 'diamonds');
        } else if (settings.beans_active) {
          setShowCurrency('beans');
        } else if (settings.diamonds_active) {
          setShowCurrency('diamonds');
        }
      }
    } catch (err) {
      console.error('Failed to fetch orders or settings', err);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(showCurrency === 'beans' || showCurrency === 'both') && (
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg">
            <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Total Beans Added</div>
            <div className="text-3xl font-bold text-yellow-400">{totalBeans.toLocaleString()}</div>
          </div>
        )}
        {(showCurrency === 'diamonds' || showCurrency === 'both') && (
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg">
            <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Total Diamonds Added</div>
            <div className="text-3xl font-bold text-cyan-400">{totalDiamonds.toLocaleString()}</div>
          </div>
        )}
        <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-gray-800 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
          <div className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">Top Selling Item</div>
          <div className="text-2xl font-bold text-white relative z-10">{topItem}</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
          <h2 className="text-lg font-bold text-white">Order History</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#18181b] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat as string}>{cat as string}</option>
              ))}
            </select>

            <input 
              type="text"
              placeholder="Search user or gift..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#18181b] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
            />
          </div>
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
                      <img src={order.image_url ? (order.image_url.startsWith('http') ? order.image_url : `${API_BASE_URL}${order.image_url}`) : ''} alt="" className="w-8 h-8 rounded-md bg-gray-800" />
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
