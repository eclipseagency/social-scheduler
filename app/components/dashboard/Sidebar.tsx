"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  Building2,
  FileText,
  Sparkles,
  BarChart3,
  UserCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Building2 },
  { href: "/dashboard/posts", label: "All Posts", icon: FileText },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const moderatorNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Building2 },
  { href: "/dashboard/posts", label: "All Posts", icon: FileText },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const navItems = isAdmin ? adminNavItems : moderatorNavItems;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${isOpen ? "open" : ""}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(139,92,246,0.2)]">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="font-bold text-white">SocialFlow</h1>
                <p className="text-xs text-[#94a3b8]">Management Platform</p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-[#94a3b8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => onClose()}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* AI Section */}
          <div className="mt-8 pt-6 border-t border-[rgba(139,92,246,0.2)]">
            <p className="px-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">
              AI Tools
            </p>
            <Link
              href="/dashboard/ai-caption"
              className={`sidebar-nav-item ${pathname === "/dashboard/ai-caption" ? "active" : ""}`}
              onClick={() => onClose()}
            >
              <Sparkles className="w-5 h-5" />
              Caption Generator
            </Link>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[rgba(139,92,246,0.2)]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(139,92,246,0.08)]">
            <div className="avatar">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-[#94a3b8] truncate">
                {session?.user?.role === "ADMIN" ? "Administrator" : "Moderator"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full mt-3 sidebar-nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
