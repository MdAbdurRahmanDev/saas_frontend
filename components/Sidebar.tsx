"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Pre-defined SVG icons to avoid external dependencies
const icons = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
  billing: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M7 15h0M2 9h20"></path></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  balance: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  payment: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>,
  gift: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"></rect><path d="M12 8v12"></path><path d="M19 8c-1.5 0-2.8-1.4-3-3-.2-1.5 1.1-3 2.5-3s2.5 1.5 2.5 3c0 1.5-1.5 3-2 3z"></path><path d="M5 8c1.5 0 2.8-1.4 3-3 .2-1.5-1.1-3-2.5-3S3 3.5 3 5c0 1.5 1.5 3 2 3z"></path></svg>,
  report: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  animation: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>,
  video: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  chevronDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
};

type MenuItem = {
  name?: string;
  icon?: React.ReactNode;
  href?: string;
  type?: 'divider';
  title?: string;
  children?: { name: string; href: string }[];
};

const menuConfig: MenuItem[] = [
  { name: 'Dashboard', icon: icons.dashboard, href: '/' },
  { name: 'Billing System', icon: icons.billing, href: '#' },
  {
    name: 'Users', icon: icons.users,
    children: [{ name: 'All Users', href: '/users' }, { name: 'User Wallet', href: '/users/wallet' }]
  },
  {
    name: 'Balance', icon: icons.balance,
    children: [{ name: 'Add Balance', href: '/balance/add' }, { name: 'History', href: '/balance/history' }]
  },
  {
    name: 'Level System', icon: icons.star,
    children: [{ name: 'User Levels', href: '#' }, { name: 'Host Levels', href: '#' }]
  },
  {
    name: 'Payment System', icon: icons.payment,
    children: [
      { name: 'Payment Method', href: '/payment/method' },
      { name: 'Top-up Packages', href: '/payment/packages' },
      { name: 'Top-up Requests', href: '#' },
      { name: 'Withdrawal Request', href: '#' }
    ]
  },
  { type: 'divider', title: 'BUSINESS' },
  {
    name: 'Gift Store', icon: icons.gift,
    children: [{ name: 'All Gifts', href: '/gift-store' }, { name: 'Add Gift', href: '/gift-store/add' }]
  },
  {
    name: 'Platform Gifts', icon: icons.gift,
    children: [{ name: 'Manage', href: '/platform-gifts' }, { name: 'Add Platform Gift', href: '/platform-gifts/add' }, { name: 'Settings', href: '/platform-gifts/settings' }]
  },
  { name: 'Daily Rewards', icon: icons.star, href: '/daily-rewards' },
  {
    name: 'Host Report', icon: icons.report,
    children: [{ name: 'Daily', href: '/host-report/daily' }, { name: 'Monthly', href: '/host-report/monthly' }]
  },
  {
    name: 'Entry Animation', icon: icons.animation,
    children: [{ name: 'Manage', href: '/entry-animation' }, { name: 'Add Animation', href: '/entry-animation/add' }]
  },
  {
    name: 'Game Reports', icon: icons.dashboard,
    children: [{ name: 'History', href: '#' }, { name: 'Winners', href: '#' }]
  },
  {
    name: 'Video Series', icon: icons.video,
    children: [{ name: 'All Series', href: '/video-series' }, { name: 'Create', href: '/video-series/create' }]
  },
  {
    name: 'Agency', icon: icons.users,
    children: [
      { name: 'List', href: '/agency/list' },
      { name: 'Applications', href: '/agency/applications' },
      { name: 'Add New', href: '/agency/add' },
      { name: 'Reports', href: '/agency/reports' }
    ]
  },
  {
    name: 'Resellers', icon: icons.users,
    children: [
      { name: 'List', href: '/resellers/list' },
      { name: 'Applications', href: '/resellers/applications' },
      { name: 'Add New', href: '/resellers/add' },
      { name: 'Reports', href: '/resellers/reports' },
      { name: 'Coin Transfer', href: '/resellers/transfer' }
    ]
  },
  {
    name: 'Settings', icon: icons.settings,
    children: [
      { name: 'General', href: '/setting/general' },
      { name: 'Security', href: '/setting/security' },
      { name: 'Livekit Config', href: '/setting/livekit' },
      { name: 'Banner Setting', href: '/setting/banner' },
      { name: 'Firebase', href: '/setting/firebase' },
      { name: 'Room Skins', href: '/setting/room-skins' },
      { name: 'Devices Info', href: '/setting/devices' }
    ]
  },
  { name: 'Push Notifications', icon: icons.bell, href: '#' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-[var(--sidebar-bg)] flex-shrink-0 flex flex-col border-r border-[#222] transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-16 flex items-center justify-between px-4 font-bold text-xl tracking-wider pt-4">
        <div className="flex items-center whitespace-nowrap gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span className="font-extrabold text-white text-xl tracking-tight">
            STREAM<span className="text-indigo-400 font-medium">Admin</span>
          </span>
        </div>
        {/* Close button for mobile */}
        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="text-[10px] text-[var(--sidebar-text)] px-4 mb-4 mt-1">ADMIN PANEL</div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1 pb-4 custom-scrollbar">
        {menuConfig.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div key={index} className="mt-6 mb-2 px-3 text-xs font-semibold text-[var(--sidebar-text)] uppercase tracking-wider">
                {item.title}
              </div>
            );
          }

          const hasChildren = !!item.children;
          const isOpen = openMenus[item.name!];

          // Simulate Dashboard being active by default
          const isActive = item.name === 'Dashboard';

          return (
            <div key={index} className="space-y-1">
              {hasChildren ? (
                <button
                  onClick={() => toggleMenu(item.name!)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${isActive
                      ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-text-hover)] border-l-2 border-[var(--sidebar-active-border)]'
                      : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--sidebar-active-bg)] border-l-2 border-transparent'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-current opacity-80">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="opacity-70 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    {icons.chevronRight}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${isActive
                      ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-text-hover)] border-l-2 border-[var(--sidebar-active-border)]'
                      : 'text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] hover:bg-[var(--sidebar-active-bg)] border-l-2 border-transparent'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-current opacity-80">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              )}

              {hasChildren && isOpen && (
                <div className="pl-10 pr-3 py-1 space-y-1 border-l border-gray-800 ml-4">
                  {item.children!.map((child, childIdx) => (
                    <Link
                      key={childIdx}
                      href={child.href}
                      className="block px-3 py-1.5 text-xs text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-hover)] rounded hover:bg-[#27272a]/50 transition"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
