"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function DashboardHeader({ onMenuClick, title }: DashboardHeaderProps) {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="h-16 border-b border-[rgba(139,92,246,0.2)] bg-[rgba(15,10,26,0.95)] backdrop-blur-lg sticky top-0 z-30">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {title && (
            <h1 className="text-xl font-semibold text-white hidden sm:block">
              {title}
            </h1>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className={`relative transition-all ${isSearchFocused ? "scale-105" : ""}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search clients, posts..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.2)] rounded-lg text-white placeholder-[#64748b] focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[rgba(139,92,246,0.15)] transition-all"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EC4899] rounded-full" />
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
            >
              <div className="avatar avatar-sm">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-white hidden sm:block">
                {session?.user?.name?.split(" ")[0] || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[#0f0a1a] border border-[rgba(139,92,246,0.2)] rounded-lg shadow-xl z-50 py-1">
                  <div className="px-4 py-3 border-b border-[rgba(139,92,246,0.2)]">
                    <p className="text-sm font-medium text-white">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-[#94a3b8]">{session?.user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]">
                      {session?.user?.role === "ADMIN" ? "Admin" : "Moderator"}
                    </span>
                  </div>

                  <a
                    href="/dashboard/profile"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </a>

                  {session?.user?.role === "ADMIN" && (
                    <a
                      href="/dashboard/settings"
                      className="dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                  )}

                  <div className="border-t border-[rgba(139,92,246,0.2)] mt-1 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="dropdown-item text-red-400 hover:text-red-300 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
