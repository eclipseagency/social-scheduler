"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[rgba(139,92,246,0.2)] rounded-none">
      <div className="container-main">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-xl">S</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gradient">SocialFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-[#94a3b8] hover:text-white transition-colors text-sm lg:text-base"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#94a3b8] hover:text-white transition-colors text-sm lg:text-base"
            >
              About Us
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="text-[#94a3b8] hover:text-white transition-colors flex items-center gap-2 text-sm lg:text-base"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 lg:gap-4">
                  <span className="text-[#94a3b8] text-xs lg:text-sm flex items-center gap-2">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-outline text-xs lg:text-sm py-1.5 lg:py-2 px-3 lg:px-4 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="btn-gradient text-xs lg:text-sm py-1.5 lg:py-2 px-4 lg:px-6">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-[rgba(139,92,246,0.2)] rounded-none">
          <div className="container-main py-4 space-y-3">
            <Link
              href="/"
              className="block text-[#94a3b8] hover:text-white transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-[#94a3b8] hover:text-white transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="block text-[#94a3b8] hover:text-white transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-3 border-t border-[rgba(139,92,246,0.2)]">
                  <p className="text-[#94a3b8] text-xs mb-2">
                    Signed in as {session.user.name}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-outline w-full text-xs py-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="block btn-gradient text-center text-xs py-2"
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
