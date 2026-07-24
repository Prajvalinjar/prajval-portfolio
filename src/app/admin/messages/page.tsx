"use client";

import { useState, useEffect } from "react";
import { Lock, Mail, RefreshCw, Trash2, CheckCircle, Clock, Eye, AlertCircle } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "archived";
  created_at: string;
}

export default function AdminMessagesPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async (pwd: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/contact?passcode=${encodeURIComponent(pwd)}`);
      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`Server returned non-JSON (${res.status}). Please restart dev server.`);
      }

      if (!res.ok) {
        throw new Error(data.error || "Invalid Passcode");
      }

      setMessages(data.messages || []);
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_passcode", pwd);
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_passcode");
    if (saved) {
      setPasscode(saved);
      fetchMessages(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages(passcode);
  };

  const handleMarkAsRead = async (msg: ContactMessage) => {
    if (msg.status === "read") return;
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, status: "read", passcode }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
        );
        if (selectedMessage?.id === msg.id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: "read" } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}&passcode=${encodeURIComponent(passcode)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return m.status === "unread";
    if (filter === "read") return m.status === "read";
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-inter">
        <div className="w-full max-w-md bg-[#0A0D18] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
              <Lock size={26} />
            </div>
            <h1 className="text-xl font-bold tracking-wide uppercase">Admin Portal</h1>
            <p className="text-xs text-secondary/60">Enter secret passcode to access received messages</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-3 px-4 bg-[#0070F3] hover:bg-[#0070F3]/90 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-inter">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#060810]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
            <Mail size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
              Messages Center
              {unreadCount > 0 && (
                <span className="bg-[#0070F3] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-xs text-secondary/60">Portfolio Contact Inbox</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchMessages(passcode)}
            className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center gap-2"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_passcode");
              setIsAuthenticated(false);
            }}
            className="px-3 py-1.5 border border-white/10 rounded-lg text-xs hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            Lock
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Messages List Column */}
        <div className="lg:col-span-5 border-r border-white/10 flex flex-col h-[calc(100vh-73px)]">
          {/* Filters Bar */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
            <span className="text-xs font-mono text-secondary/60 uppercase">
              Total ({filteredMessages.length})
            </span>
            <div className="flex gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/5">
              {(["all", "unread", "read"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 text-xs font-mono capitalize rounded ${
                    filter === tab
                      ? "bg-[#0070F3] text-white font-bold"
                      : "text-secondary/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-secondary/50 text-sm">
                No messages found in this view.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      handleMarkAsRead(msg);
                    }}
                    className={`p-4 cursor-pointer transition-colors flex flex-col gap-2 ${
                      isSelected
                        ? "bg-[#0070F3]/15 border-l-4 border-l-[#0070F3]"
                        : msg.status === "unread"
                        ? "bg-white/[0.02] font-semibold"
                        : "hover:bg-white/[0.02] opacity-75"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white font-bold truncate">{msg.name}</span>
                      <span className="text-[10px] font-mono text-secondary/50">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <span className="text-xs text-[#00E5FF] font-mono truncate">{msg.email}</span>

                    <p className="text-xs text-secondary/70 line-clamp-2 mt-1">{msg.message}</p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-secondary/40 font-mono">
                      <span className="flex items-center gap-1">
                        {msg.status === "unread" ? (
                          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
                        ) : (
                          <CheckCircle size={12} className="text-green-400" />
                        )}
                        {msg.status}
                      </span>
                      <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Message Details Preview Column */}
        <div className="lg:col-span-7 flex flex-col h-[calc(100vh-73px)] bg-[#030408]">
          {selectedMessage ? (
            <div className="p-8 flex flex-col h-full justify-between">
              <div className="flex flex-col gap-6">
                {/* Actions & Header */}
                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedMessage.name}</h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm font-mono text-[#00E5FF] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-xs flex items-center gap-2"
                      title="Delete Message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Date info */}
                <div className="flex items-center gap-2 text-xs text-secondary/60 font-mono">
                  <Clock size={14} />
                  <span>
                    Received on {new Date(selectedMessage.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Message Body */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 min-h-[200px]">
                  <p className="text-sm text-secondary/90 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent("Re: Portfolio Inquiry")}`}
                  className="px-6 py-3 bg-[#0070F3] hover:bg-[#0070F3]/90 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,112,243,0.3)]"
                >
                  <Mail size={16} />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-secondary/40">
              <Eye size={48} className="mb-4 text-white/10" />
              <p className="text-sm">Select a message from the list to view its full details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
