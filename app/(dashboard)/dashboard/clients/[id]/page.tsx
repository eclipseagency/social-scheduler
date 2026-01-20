import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Edit,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  TrendingUp,
  ExternalLink,
  Settings,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";

async function getClient(id: string, userId: string) {
  const client = await prisma.client.findFirst({
    where: { id, userId },
    include: {
      socialAccounts: {
        include: { platform: true },
      },
      posts: {
        orderBy: { createdAt: "desc" },
        include: {
          platformSchedules: {
            include: { platform: true },
          },
        },
      },
      _count: {
        select: { posts: true },
      },
    },
  });

  return client;
}

async function getClientStats(clientId: string) {
  const [
    totalPosts,
    scheduledCount,
    postedCount,
    failedCount,
  ] = await Promise.all([
    prisma.post.count({ where: { clientId } }),
    prisma.platformSchedule.count({
      where: { post: { clientId }, status: "SCHEDULED" },
    }),
    prisma.platformSchedule.count({
      where: { post: { clientId }, status: "POSTED" },
    }),
    prisma.platformSchedule.count({
      where: { post: { clientId }, status: "FAILED" },
    }),
  ]);

  return { totalPosts, scheduledCount, postedCount, failedCount };
}

function getPlatformIcon(platformName: string) {
  switch (platformName.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-4 h-4 text-[#E4405F]" />;
    case "facebook":
      return <Facebook className="w-4 h-4 text-[#1877F2]" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "DRAFT":
      return <span className="status-badge status-draft">Draft</span>;
    case "SCHEDULED":
      return <span className="status-badge status-scheduled">Scheduled</span>;
    case "POSTED":
      return <span className="status-badge status-posted">Posted</span>;
    case "FAILED":
      return <span className="status-badge status-failed">Failed</span>;
    default:
      return null;
  }
}

export default async function ClientDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const client = await getClient(id, session.user.id);

  if (!client) {
    notFound();
  }

  const stats = await getClientStats(id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/clients"
            className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-4">
            {client.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={client.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {client.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{client.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-2 py-1 text-xs rounded-full bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]">
                  {client.brandTone.replace("_", " ").toLowerCase()}
                </span>
                {client.industry && (
                  <span className="text-sm text-[#94a3b8]">{client.industry}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/clients/${id}/edit`}
            className="btn-ghost"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <Link
            href={`/dashboard/posts/new?clientId=${id}`}
            className="btn-gradient"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.2)] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#8B5CF6]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
          <p className="text-sm text-[#94a3b8]">Total Posts</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.2)] flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.scheduledCount}</p>
          <p className="text-sm text-[#94a3b8]">Scheduled</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.2)] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.postedCount}</p>
          <p className="text-sm text-[#94a3b8]">Published</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(239,68,68,0.2)] flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.failedCount}</p>
          <p className="text-sm text-[#94a3b8]">Failed</p>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="dashboard-card">
        <h2 className="text-lg font-semibold text-white mb-4">Connected Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {client.socialAccounts.map((account) => (
            <div
              key={account.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                account.isConnected
                  ? "border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.05)]"
                  : "border-[rgba(100,116,139,0.3)] bg-[rgba(100,116,139,0.05)]"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  account.isConnected
                    ? "bg-[rgba(139,92,246,0.2)]"
                    : "bg-[rgba(100,116,139,0.2)]"
                }`}
              >
                {getPlatformIcon(account.platform.name)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{account.platform.name}</p>
                <p className="text-xs text-[#94a3b8]">{account.username}</p>
              </div>
              {account.isConnected ? (
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  Connected
                </span>
              ) : (
                <button className="text-xs text-[#8B5CF6] hover:text-[#EC4899]">
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h2 className="text-lg font-semibold text-white">Recent Posts</h2>
          <Link
            href={`/dashboard/posts?clientId=${id}`}
            className="text-sm text-[#8B5CF6] hover:text-[#EC4899] transition-colors flex items-center gap-1"
          >
            View all <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {client.posts.length === 0 ? (
          <div className="empty-state py-8">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="mb-4">No posts created yet</p>
            <Link
              href={`/dashboard/posts/new?clientId=${id}`}
              className="btn-gradient inline-flex"
            >
              <Plus className="w-4 h-4" />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {client.posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-[rgba(139,92,246,0.08)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-white">
                        {post.title || "Untitled Post"}
                      </h3>
                      <p className="text-sm text-[#94a3b8] mt-1 line-clamp-2">
                        {post.caption || "No caption"}
                      </p>
                    </div>
                    {getStatusBadge(post.status)}
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex -space-x-1">
                      {post.platformSchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="w-6 h-6 rounded-full bg-[#0f0a1a] border border-[rgba(139,92,246,0.3)] flex items-center justify-center"
                        >
                          {getPlatformIcon(schedule.platform.name)}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-[#64748b]">
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/posts/${post.id}`}
                  className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href={`/dashboard/posts/new?clientId=${id}`}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(139,92,246,0.08)] hover:bg-[rgba(139,92,246,0.15)] border border-transparent hover:border-[rgba(139,92,246,0.3)] transition-all text-center"
        >
          <FileText className="w-6 h-6 text-[#8B5CF6]" />
          <span className="text-sm text-[#94a3b8]">Create Post</span>
        </Link>
        <Link
          href={`/dashboard/ai-caption?clientId=${id}`}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(236,72,153,0.08)] hover:bg-[rgba(236,72,153,0.15)] border border-transparent hover:border-[rgba(236,72,153,0.3)] transition-all text-center"
        >
          <Sparkles className="w-6 h-6 text-[#EC4899]" />
          <span className="text-sm text-[#94a3b8]">AI Caption</span>
        </Link>
        <Link
          href={`/dashboard/calendar?clientId=${id}`}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(59,130,246,0.08)] hover:bg-[rgba(59,130,246,0.15)] border border-transparent hover:border-[rgba(59,130,246,0.3)] transition-all text-center"
        >
          <Calendar className="w-6 h-6 text-blue-400" />
          <span className="text-sm text-[#94a3b8]">Calendar</span>
        </Link>
        <Link
          href={`/dashboard/clients/${id}/edit`}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(34,197,94,0.08)] hover:bg-[rgba(34,197,94,0.15)] border border-transparent hover:border-[rgba(34,197,94,0.3)] transition-all text-center"
        >
          <Settings className="w-6 h-6 text-green-400" />
          <span className="text-sm text-[#94a3b8]">Settings</span>
        </Link>
      </div>
    </div>
  );
}
