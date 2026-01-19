"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Plus,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string | null;
  logoUrl: string | null;
  email: string | null;
  socialAccounts: {
    id: string;
    platform: string;
    accountName: string;
    isConnected: boolean;
  }[];
  _count: {
    posts: number;
  };
}

interface Post {
  id: string;
  title: string | null;
  caption: string | null;
  imageUrl: string | null;
  status: string;
  scheduledAt: string | null;
  client: {
    name: string;
    logoUrl: string | null;
  };
  socialAccount: {
    platform: string;
    accountName: string;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/client-dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchData();
    }
  }, [status, session]);

  const fetchData = async () => {
    try {
      const [clientsRes, postsRes] = await Promise.all([
        fetch("/api/clients"),
        fetch("/api/posts"),
      ]);

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalClients: clients.length,
    totalPosts: posts.length,
    scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4 text-[#E4405F]" />;
      case "facebook":
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
      default:
        return null;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient">{session.user.name}</span>
            </h1>
            <p className="text-[#94a3b8]">
              Manage your clients and social media content
            </p>
          </div>
          <Link
            href="/dashboard/clients/new"
            className="btn-gradient flex items-center gap-2 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalClients}</p>
                <p className="text-[#94a3b8] text-sm">Total Clients</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
                <p className="text-[#94a3b8] text-sm">Total Posts</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.scheduledPosts}</p>
                <p className="text-[#94a3b8] text-sm">Scheduled</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
                <p className="text-[#94a3b8] text-sm">Published</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clients List */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Clients</h2>
                <Link
                  href="/dashboard/clients"
                  className="text-[#8B5CF6] hover:text-[#EC4899] text-sm transition-colors"
                >
                  View All
                </Link>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-styled pl-12"
                />
              </div>

              {filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-[#94a3b8] mx-auto mb-4" />
                  <p className="text-[#94a3b8]">
                    {searchTerm ? "No clients found" : "No clients yet"}
                  </p>
                  {!searchTerm && (
                    <Link
                      href="/dashboard/clients/new"
                      className="btn-gradient inline-flex items-center gap-2 mt-4"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Client
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredClients.slice(0, 5).map((client) => (
                    <Link
                      key={client.id}
                      href={`/dashboard/clients/${client.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(139,92,246,0.05)] hover:bg-[rgba(139,92,246,0.1)] transition-colors"
                    >
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">
                          {client.name}
                        </p>
                        <p className="text-[#94a3b8] text-sm truncate">
                          {client.company || client.email || "No details"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {client.socialAccounts.map((account) => (
                          <div
                            key={account.id}
                            className={`p-1.5 rounded-lg ${
                              account.isConnected
                                ? "bg-green-500/20"
                                : "bg-yellow-500/20"
                            }`}
                          >
                            {getPlatformIcon(account.platform)}
                          </div>
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          {client._count.posts}
                        </p>
                        <p className="text-[#94a3b8] text-xs">posts</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Posts / Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/clients/new"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(139,92,246,0.05)] hover:bg-[rgba(139,92,246,0.1)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white">Add New Client</span>
                </Link>
                <Link
                  href="/dashboard/posts/new"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(139,92,246,0.05)] hover:bg-[rgba(139,92,246,0.1)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white">Schedule Post</span>
                </Link>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Posts</h2>
                <Link
                  href="/dashboard/posts"
                  className="text-[#8B5CF6] hover:text-[#EC4899] text-sm transition-colors"
                >
                  View All
                </Link>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
                  <p className="text-[#94a3b8] text-sm">No posts yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="p-3 rounded-xl bg-[rgba(139,92,246,0.05)]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {getPlatformIcon(post.socialAccount.platform)}
                        <span className="text-white text-sm font-medium truncate">
                          {post.client.name}
                        </span>
                        <span
                          className={`ml-auto px-2 py-0.5 rounded text-xs ${
                            post.status === "published"
                              ? "bg-green-500/20 text-green-400"
                              : post.status === "scheduled"
                              ? "bg-blue-500/20 text-blue-400"
                              : post.status === "failed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p className="text-[#94a3b8] text-sm truncate">
                        {post.caption || post.title || "No content"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
