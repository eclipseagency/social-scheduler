"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(9,9,11,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-white">
              Social<span className="text-gradient">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link
              href="#platforms"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              Platforms
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-[rgba(139,92,246,0.2)] animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.3)] rounded-lg hover:bg-[rgba(139,92,246,0.25)] transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/login" className="btn-primary text-sm py-2.5 px-5">
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <Link
              href="#features"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#platforms"
              className="text-[15px] text-[#A1A1AA] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Platforms
            </Link>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {session ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.3)] rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#A1A1AA]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="text-center py-2.5 text-sm text-[#A1A1AA]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="btn-primary justify-center text-sm py-2.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
