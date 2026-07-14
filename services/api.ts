// API services to connect to the backend

const BASE_URL = 'http://tu286r0hary5blh7i51xiv6g.31.97.237.130.sslip.io/api';

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// API থেকে ব্যালেন্স সেটিংস ফেচ করার ফাংশন
export const fetchBalanceSettings = async () => {
  const response = await fetch(`${BASE_URL}/settings/balance`);
  if (!response.ok) {
    throw new Error('Failed to fetch balance settings');
  }
  return response.json();
};

export const fetchGiftOrders = async () => {
  const response = await fetch(`${BASE_URL}/admin/gift-orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch gift orders');
  }
  return response.json();
};
