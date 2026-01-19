"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, User, Bot, Mail } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  time: string;
}

export default function ContactSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm here to help you get started with SocialFlow. Leave a message and I'll get back to you via email.",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !email.trim() || !name.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: input }),
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: res.ok
          ? `Thanks ${name}! I'll get back to you at ${email} soon.`
          : "Sorry, there was an issue. Please try again or email oemad442@gmail.com",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (res.ok) {
        setInput("");
        setSent(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Connection error. Please email oemad442@gmail.com directly.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-3">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-sm md:text-base text-[#94a3b8]">
            Have questions? Send me a message and I&apos;ll respond soon.
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">SocialFlow Support</h3>
                <p className="text-white/70 text-xs">Usually replies within 24h</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[rgba(0,0,0,0.15)]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]"
                    : "bg-[rgba(139,92,246,0.2)]"
                }`}>
                  {msg.sender === "user" ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  )}
                </div>
                <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-br-sm"
                    : "bg-[rgba(139,92,246,0.1)] text-white rounded-bl-sm"
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-white/60" : "text-[#64748b]"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[rgba(139,92,246,0.2)] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </div>
                <div className="bg-[rgba(139,92,246,0.1)] px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[rgba(139,92,246,0.15)] bg-[rgba(0,0,0,0.1)]">
            {!sent ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="input pl-9 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="input pl-9 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Type your message..."
                    className="input text-sm flex-1 resize-none h-20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim() || !email.trim() || !name.trim()}
                    className="btn-primary px-4 self-end disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-white text-sm">Message sent!</p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="text-[#8B5CF6] hover:text-[#EC4899] text-xs underline"
                >
                  Send another
                </button>
              </div>
            )}
          </div>

          <div className="px-4 pb-3 text-center">
            <p className="text-xs text-[#64748b]">
              Or email{" "}
              <a href="mailto:oemad442@gmail.com" className="text-[#8B5CF6] hover:text-[#EC4899]">
                oemad442@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
