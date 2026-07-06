"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--main-bg)] text-[var(--text-primary)] relative">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with mobile drawer capabilities */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 flex items-center px-3 md:px-4 justify-between" style={{ background: 'linear-gradient(to right, var(--header-bg-start), var(--header-bg-end))' }}>
          <div className="flex items-center">
            <button 
              className="text-white mr-2 md:mr-4 md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="text-[var(--header-text)] text-xs md:text-sm font-semibold tracking-wide flex flex-col md:flex-row md:items-center">
              <span className="hidden md:inline">SYSTEM / </span><span className="font-bold">DASHBOARD</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <button className="hidden md:flex items-center space-x-1 px-3 py-1.5 bg-green-500/20 text-green-300 rounded-md text-xs font-semibold border border-green-500/30 hover:bg-green-500/30 transition">
              <span>✨ Clean Empty Rooms</span>
            </button>
            <button className="hidden md:block px-4 py-1.5 bg-white/20 text-white rounded-md text-sm font-medium hover:bg-white/30 transition">
              Log Out
            </button>
            <button className="px-3 py-1.5 md:px-4 md:py-1.5 bg-white text-black rounded-md text-xs md:text-sm font-semibold hover:bg-gray-100 transition shadow flex-shrink-0">
              Live Support
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[var(--main-bg)] pb-20 md:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--sidebar-bg)] border-t border-gray-800 flex items-center justify-around h-16 px-2">
          <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/users" className="flex flex-col items-center justify-center w-full h-full text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span className="text-[10px] font-medium">Users</span>
          </Link>
          <Link href="/balance/history" className="flex flex-col items-center justify-center w-full h-full text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <span className="text-[10px] font-medium">Balance</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
