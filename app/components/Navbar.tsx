"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(15,10,26,0.8)] backdrop-blur-xl border-b border-[rgba(139,92,246,0.2)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gradient">SocialFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              About Us
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="text-[#94a3b8] hover:text-white transition-colors flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-[#94a3b8] text-sm flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-outline py-2 px-4 text-sm flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="btn-gradient py-2 px-6">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[rgba(15,10,26,0.95)] backdrop-blur-xl border-t border-[rgba(139,92,246,0.2)]">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
            <Link
              href="/"
              className="block text-[#94a3b8] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-[#94a3b8] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="block text-[#94a3b8] hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-4 border-t border-[rgba(139,92,246,0.2)]">
                  <p className="text-[#94a3b8] text-sm mb-3">
                    Signed in as {session.user.name}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-outline w-full py-2 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="block btn-gradient text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
