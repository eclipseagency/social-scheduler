"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, User, Bot, Mail } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ContactSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm here to help you get started with SocialFlow. Feel free to ask any questions or leave a message and I'll get back to you via email.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !email.trim() || !name.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: inputValue,
        }),
      });

      if (res.ok) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `Thanks ${name}! I've received your message and will get back to you at ${email} soon. Have a great day!`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setInputValue("");
        setIsSent(true);
        setShowForm(false);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, there was an issue sending your message. Please try again or email me directly at oemad442@gmail.com",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-24 px-6" id="contact">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-[#94a3b8]">
            Have questions about SocialFlow? Drop me a message and I&apos;ll get
            back to you as soon as possible.
          </p>
        </div>

        <div className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-3xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">SocialFlow Support</h3>
                <p className="text-white/70 text-sm">Usually replies within 24h</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-6 min-h-[320px] max-h-[400px] overflow-y-auto space-y-4 bg-[rgba(0,0,0,0.2)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                      : "bg-[rgba(139,92,246,0.3)]"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-[#8B5CF6]" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-br-md"
                      : "bg-[rgba(139,92,246,0.15)] text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/60" : "text-[#94a3b8]"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(139,92,246,0.3)] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div className="bg-[rgba(139,92,246,0.15)] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-[rgba(139,92,246,0.2)] bg-[rgba(0,0,0,0.1)]">
            {showForm && !isSent ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(139,92,246,0.3)] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(139,92,246,0.3)] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)] transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(139,92,246,0.3)] rounded-xl px-4 py-3 text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)] transition-all resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim() || !email.trim() || !name.trim()}
                    className="self-end bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <p className="text-white text-lg">Message sent! I&apos;ll get back to you soon.</p>
                </div>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setIsSent(false);
                  }}
                  className="text-[#8B5CF6] hover:text-[#EC4899] text-sm underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Direct Email */}
          <div className="px-6 pb-6 text-center">
            <p className="text-[#94a3b8] text-sm">
              Or email me directly at{" "}
              <a
                href="mailto:oemad442@gmail.com"
                className="text-[#8B5CF6] hover:text-[#EC4899] transition-colors font-medium"
              >
                oemad442@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
