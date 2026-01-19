"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

interface SocialAccount {
  id: string;
  platform: string;
  accountName: string;
}

interface Post {
  id: string;
  caption: string | null;
  imageUrl: string | null;
  status: string;
  scheduledAt: string | null;
  publishedAt: string | null;
  socialAccount: SocialAccount;
}

interface Client {
  id: string;
  name: string;
  company: string | null;
  logoUrl: string | null;
  socialAccounts: SocialAccount[];
  posts: Post[];
}

export default function ClientDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "client") {
      fetchClientData();
    }
  }, [status, session]);

  const fetchClientData = async () => {
    try {
      // Get client info based on user
      const postsRes = await fetch("/api/posts");
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        if (postsData.length > 0) {
          // Get client info from first post
          const clientId = postsData[0].clientId;
          const clientRes = await fetch(`/api/clients/${clientId}`);
          if (clientRes.ok) {
            const clientData = await clientRes.json();
            setClient(clientData);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-5 h-5 text-[#E4405F]" />;
      case "facebook":
        return <Facebook className="w-5 h-5 text-[#1877F2]" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-[#0A66C2]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Published
          </span>
        );
      case "scheduled":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
            {status}
          </span>
        );
    }
  };

  const filteredPosts = client?.posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "scheduled") return post.status === "scheduled";
    if (filter === "published") return post.status === "published";
    return post.socialAccount.platform === filter;
  });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!session || session.user?.role !== "client") {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {client?.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={client.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {client?.name.charAt(0) || "C"}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, <span className="text-gradient">{client?.name || session.user.name}</span>
              </h1>
              <p className="text-[#94a3b8]">
                View your scheduled and published content
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {client?.posts.length || 0}
                </p>
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
                <p className="text-2xl font-bold text-white">
                  {client?.posts.filter((p) => p.status === "scheduled").length || 0}
                </p>
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
                <p className="text-2xl font-bold text-white">
                  {client?.posts.filter((p) => p.status === "published").length || 0}
                </p>
                <p className="text-[#94a3b8] text-sm">Published</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {client?.socialAccounts.length || 0}
                </p>
                <p className="text-[#94a3b8] text-sm">Accounts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "scheduled", "published", "instagram", "facebook", "linkedin"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  filter === f
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white"
                    : "glass-card text-[#94a3b8] hover:text-white"
                }`}
              >
                {f}
              </button>
            )
          )}
        </div>

        {/* Posts Grid */}
        {!client || filteredPosts?.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Calendar className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No posts yet
            </h3>
            <p className="text-[#94a3b8]">
              Your scheduled and published posts will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post) => (
              <div key={post.id} className="glass-card overflow-hidden">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(post.socialAccount.platform)}
                      <span className="text-[#94a3b8] text-sm">
                        {post.socialAccount.accountName}
                      </span>
                    </div>
                    {getStatusBadge(post.status)}
                  </div>
                  <p className="text-white text-sm line-clamp-3 mb-3">
                    {post.caption || "No caption"}
                  </p>
                  {post.scheduledAt && (
                    <p className="text-[#94a3b8] text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.scheduledAt).toLocaleString()}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="text-[#94a3b8] text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Published {new Date(post.publishedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
