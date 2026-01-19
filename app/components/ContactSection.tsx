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

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
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
        // Add bot response
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
    <section className="section-padding" id="contact">
      <div className="container-sm">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto px-4 sm:px-0">
            Have questions about SocialFlow? Drop me a message and I&apos;ll get
            back to you as soon as possible.
          </p>
        </div>

        <div className="glass-card overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base">SocialFlow Support</h3>
                <p className="text-white/70 text-xs sm:text-sm">Usually replies within 24h</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] max-h-[350px] sm:max-h-[400px] overflow-y-auto space-y-3 sm:space-y-4 bg-[rgba(0,0,0,0.2)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                      : "bg-[rgba(139,92,246,0.3)]"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6]" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-br-md"
                      : "bg-[rgba(139,92,246,0.1)] text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-xs sm:text-sm">{message.content}</p>
                  <p
                    className={`text-[10px] sm:text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-white/60"
                        : "text-[#94a3b8]"
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
              <div className="flex gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[rgba(139,92,246,0.3)] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6]" />
                </div>
                <div className="bg-[rgba(139,92,246,0.1)] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8B5CF6] rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8B5CF6] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8B5CF6] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 border-t border-[rgba(139,92,246,0.2)]">
            {showForm && !isSent ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a3b8]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="input-styled pl-9 sm:pl-10 py-2 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="input-styled pl-9 sm:pl-10 py-2 text-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="input-styled py-2 text-xs sm:text-sm flex-1 resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      isLoading ||
                      !inputValue.trim() ||
                      !email.trim() ||
                      !name.trim()
                    }
                    className="btn-gradient px-3 sm:px-4 self-end disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <p className="text-white text-sm sm:text-base">
                    Message sent! I&apos;ll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setIsSent(false);
                  }}
                  className="text-[#8B5CF6] hover:text-[#EC4899] text-xs sm:text-sm underline"
                >
                  Send another
                </button>
              </div>
            )}
          </div>

          {/* Direct Email */}
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <p className="text-center text-[#94a3b8] text-xs sm:text-sm">
              Or email me directly at{" "}
              <a
                href="mailto:oemad442@gmail.com"
                className="text-[#8B5CF6] hover:text-[#EC4899] transition-colors"
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
