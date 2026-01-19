"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(15,10,26,0.85)] backdrop-blur-lg border-b border-[rgba(139,92,246,0.15)]">
      <div className="container">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-gradient">SocialFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
              About
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="text-sm text-[#94a3b8] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#64748b] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="btn-primary text-xs py-1.5 px-4">
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[rgba(15,10,26,0.95)] border-t border-[rgba(139,92,246,0.15)]">
          <div className="container py-4 space-y-3">
            <Link href="/" className="block text-sm text-[#94a3b8] hover:text-white" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block text-sm text-[#94a3b8] hover:text-white" onClick={() => setOpen(false)}>
              About
            </Link>
            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href={session.user.role === "admin" ? "/dashboard" : "/client-dashboard"}
                  className="block text-sm text-[#94a3b8] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-3 border-t border-[rgba(139,92,246,0.15)]">
                  <p className="text-xs text-[#64748b] mb-2">Signed in as {session.user.name}</p>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary w-full text-xs py-2">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="block btn-primary text-center text-xs py-2" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
