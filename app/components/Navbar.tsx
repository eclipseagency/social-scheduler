"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, LogOut, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(15,10,26,0.8)] backdrop-blur-xl border-b border-[rgba(139,92,246,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="font-semibold text-white">SocialFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/#contact" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
              Contact
            </Link>

            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-[rgba(139,92,246,0.2)] animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#8B5CF6] hover:text-white transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#94a3b8] hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#94a3b8] hover:text-white"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(139,92,246,0.2)]">
            <div className="flex flex-col gap-3">
              <Link
                href="/#features"
                className="text-sm text-[#94a3b8] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="text-sm text-[#94a3b8] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-[#94a3b8] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm text-[#8B5CF6] hover:text-white transition-colors"
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
                    className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-lg hover:opacity-90 transition-opacity text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
