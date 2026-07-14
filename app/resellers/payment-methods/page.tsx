"use client";

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function PaymentMethodsPage() {
  const [resellers, setResellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResellers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reseller`);
        if (res.ok) {
          const data = await res.json();
          setResellers(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResellers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Reseller Payment Methods</h1>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="bg-[#11111a] rounded-lg overflow-hidden border border-[#2a2a35]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1a1a24] text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Reseller</th>
                <th className="px-6 py-4 font-medium">Provider</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Account Number</th>
                <th className="px-6 py-4 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a35]">
              {resellers.map((reseller) => {
                const methods = reseller.payment_methods || [];
                if (methods.length === 0) return null;
                
                return methods.map((method: any, index: number) => (
                  <tr key={`${reseller.id}-${index}`} className="hover:bg-[#1a1a24] transition-colors">
                    {index === 0 ? (
                      <td className="px-6 py-4" rowSpan={methods.length}>
                        <div className="font-medium text-white">{reseller.name}</div>
                        <div className="text-xs text-gray-500">@{reseller.uuid}</div>
                      </td>
                    ) : null}
                    <td className="px-6 py-4 capitalize">{method.provider}</td>
                    <td className="px-6 py-4 capitalize">{method.type}</td>
                    <td className="px-6 py-4 font-mono text-blue-400">{method.number}</td>
                    <td className="px-6 py-4 text-gray-400">{method.note || '-'}</td>
                  </tr>
                ));
              })}
              {resellers.every(r => !r.payment_methods || r.payment_methods.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">No payment methods configured by any reseller.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
