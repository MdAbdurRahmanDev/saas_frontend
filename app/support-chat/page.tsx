"use client";

import React, { useState, useEffect, useRef } from 'react';

type ChatSession = {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  last_message: string;
  last_message_time: string;
  unread_admin: number;
  unread_user: number;
  status: string;
};

type ChatMessage = {
  id: string;
  chat_id: string;
  user_id: string;
  sender: string;
  content: string;
  created_at: string;
};

export default function SupportChatPage() {
  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([]);
  const [solvedSessions, setSolvedSessions] = useState<ChatSession[]>([]);
  const [sidebarTab, setSidebarTab] = useState<'active' | 'old'>('active');
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeSessionRef = useRef<ChatSession | null>(null);

  // activeSession ref sync করা হচ্ছে যাতে WebSocket handler সঠিক state পাই
  useEffect(() => {
    activeSessionRef.current = activeSession;
  }, [activeSession]);

  useEffect(() => {
    fetchSessions();

    const websocket = new WebSocket('ws://localhost:8080/ws?uuid=admin');

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'support_message') {
          const msg = data.message as ChatMessage;
          const current = activeSessionRef.current;

          if (current && msg.user_id === current.user_id) {
            setMessages((prev) => [...prev, msg]);
          }
          fetchSessions();
        }
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    setWsInstance(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchMessages(activeSession.user_id);
    }
  }, [activeSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const [activeRes, solvedRes] = await Promise.all([
        fetch('http://localhost:8080/api/support/chats?status=active'),
        fetch('http://localhost:8080/api/support/chats?status=solved'),
      ]);

      if (activeRes.ok) setActiveSessions((await activeRes.json()) || []);
      if (solvedRes.ok) setSolvedSessions((await solvedRes.json()) || []);
    } catch (error) {
      console.error('Failed to fetch chat sessions', error);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/support/messages/${userId}?reader=admin`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
        setSessions(userId, { unread_admin: 0 });
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  // নির্দিষ্ট userId-এর session locally update করা
  const setSessions = (userId: string, patch: Partial<ChatSession>) => {
    setActiveSessions(prev => prev.map(s => s.user_id === userId ? { ...s, ...patch } : s));
    setSolvedSessions(prev => prev.map(s => s.user_id === userId ? { ...s, ...patch } : s));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeSession) return;

    try {
      const res = await fetch(`http://localhost:8080/api/support/messages/${activeSession.user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'admin', content: newMessage }),
      });

      if (res.ok) {
        const saved = await res.json();
        setMessages(prev => [...prev, saved]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  // Chat solved হিসেবে mark করা
  const handleSolve = async () => {
    if (!activeSession) return;
    setIsSolving(true);
    try {
      const res = await fetch(`http://localhost:8080/api/support/chats/${activeSession.user_id}/solve`, {
        method: 'PUT',
      });

      if (res.ok) {
        setActiveSession(null);
        setMessages([]);
        await fetchSessions();
        setSidebarTab('old'); // solved হলে old messages tab এ নিয়ে যাও
      }
    } catch (error) {
      console.error('Failed to solve chat', error);
    } finally {
      setIsSolving(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSessions = sidebarTab === 'active' ? activeSessions : solvedSessions;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[var(--bg-primary)]">
      {/* ===== Sidebar ===== */}
      <div className="w-1/3 max-w-sm border-r border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[var(--card-border)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Live Chat Support</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Manage user issues in real-time</p>
        </div>

        {/* Sidebar Tabs: Active / Old Messages */}
        <div className="flex border-b border-[var(--card-border)]">
          <button
            onClick={() => setSidebarTab('active')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              sidebarTab === 'active'
                ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Active
            {activeSessions.filter(s => s.unread_admin > 0).length > 0 && (
              <span className="ml-2 bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {activeSessions.filter(s => s.unread_admin > 0).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setSidebarTab('old')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              sidebarTab === 'old'
                ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Old Messages
          </button>
        </div>

        {/* Chat Session List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {currentSessions.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--text-secondary)]">
              {sidebarTab === 'active' ? 'No active chats' : 'No solved chats yet'}
            </div>
          ) : (
            currentSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setActiveSession(session)}
                className={`p-4 border-b border-[var(--card-border)] cursor-pointer hover:bg-black/10 transition-colors ${
                  activeSession?.id === session.id
                    ? 'bg-indigo-500/10 border-l-4 border-l-indigo-500'
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                      {session.user_name || 'App User'}
                    </h3>
                    <p className="text-[10px] text-[var(--text-secondary)] font-mono">{session.user_id}</p>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] shrink-0 ml-2">
                    {new Date(session.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-[var(--text-secondary)] truncate max-w-[80%]">
                    {session.last_message}
                  </p>
                  {session.unread_admin > 0 && (
                    <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {session.unread_admin}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== Main Chat Area ===== */}
      <div className="flex-1 flex flex-col bg-black/5">
        {activeSession ? (
          <>
            {/* Chat Header: Name + UUID + Solved Button */}
            <div className="p-4 bg-[var(--card-bg)] border-b border-[var(--card-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                  {activeSession.user_name ? activeSession.user_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base leading-tight">
                    {activeSession.user_name || 'App User'}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                    UUID: {activeSession.user_id}
                  </p>
                </div>
              </div>

              {/* Solved Button — শুধু active চ্যাটে দেখাবে */}
              {activeSession.status !== 'solved' && (
                <button
                  onClick={handleSolve}
                  disabled={isSolving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-md shadow-green-500/20"
                >
                  {isSolving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                  Solved
                </button>
              )}

              {/* Solved badge for old chats */}
              {activeSession.status === 'solved' && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold rounded-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Solved
                </span>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div key={idx} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isAdmin
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-500/20'
                          : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${isAdmin ? 'text-indigo-200' : 'text-[var(--text-secondary)]'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form — solved হলে disabled দেখাবে */}
            <div className="p-4 bg-[var(--card-bg)] border-t border-[var(--card-border)]">
              {activeSession.status === 'solved' ? (
                <div className="text-center text-sm text-[var(--text-secondary)] py-2">
                  This conversation has been marked as solved.
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/20 shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-secondary)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>Select a chat from the sidebar to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
