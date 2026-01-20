import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

async function getDashboardStats(userId: string) {
  const [
    totalClients,
    totalPosts,
    scheduledPosts,
    postedCount,
    failedCount,
    recentPosts,
    upcomingSchedules,
  ] = await Promise.all([
    prisma.client.count({ where: { userId } }),
    prisma.post.count({ where: { client: { userId } } }),
    prisma.platformSchedule.count({
      where: {
        status: "SCHEDULED",
        post: { client: { userId } },
      },
    }),
    prisma.platformSchedule.count({
      where: {
        status: "POSTED",
        post: { client: { userId } },
      },
    }),
    prisma.platformSchedule.count({
      where: {
        status: "FAILED",
        post: { client: { userId } },
      },
    }),
    prisma.post.findMany({
      where: { client: { userId } },
      include: {
        client: true,
        platformSchedules: {
          include: {
            platform: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.platformSchedule.findMany({
      where: {
        status: "SCHEDULED",
        post: { client: { userId } },
        scheduledAt: { gte: new Date() },
      },
      include: {
        post: {
          include: { client: true },
        },
        platform: true,
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
    }),
  ]);

  return {
    totalClients,
    totalPosts,
    scheduledPosts,
    postedCount,
    failedCount,
    recentPosts,
    upcomingSchedules,
  };
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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const stats = await getDashboardStats(session.user.id);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {session.user.name?.split(" ")[0]}!
        </h1>
        <p className="text-[#94a3b8]">
          Here&apos;s an overview of your social media management activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.2)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalClients}</p>
          <p className="text-sm text-[#94a3b8]">Total Clients</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.2)] flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
          <p className="text-sm text-[#94a3b8]">Total Posts</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(236,72,153,0.2)] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#EC4899]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.scheduledPosts}</p>
          <p className="text-sm text-[#94a3b8]">Scheduled Posts</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.2)] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.postedCount}</p>
          <p className="text-sm text-[#94a3b8]">Published Posts</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="text-lg font-semibold text-white">Recent Posts</h2>
            <Link
              href="/dashboard/posts"
              className="text-sm text-[#8B5CF6] hover:text-[#EC4899] transition-colors flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentPosts.length === 0 ? (
              <div className="empty-state py-8">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No posts yet</p>
              </div>
            ) : (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[rgba(139,92,246,0.08)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {post.title || "Untitled Post"}
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-1">
                      {post.client.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-1">
                        {post.platformSchedules.slice(0, 3).map((schedule) => (
                          <div
                            key={schedule.id}
                            className="w-5 h-5 rounded-full bg-[#0f0a1a] border border-[rgba(139,92,246,0.3)] flex items-center justify-center"
                          >
                            {getPlatformIcon(schedule.platform.name)}
                          </div>
                        ))}
                      </div>
                      {getStatusBadge(post.status)}
                    </div>
                  </div>
                  <span className="text-xs text-[#64748b]">
                    {format(new Date(post.createdAt), "MMM d")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Schedules */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="text-lg font-semibold text-white">Upcoming Posts</h2>
            <Link
              href="/dashboard/calendar"
              className="text-sm text-[#8B5CF6] hover:text-[#EC4899] transition-colors flex items-center gap-1"
            >
              View calendar <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {stats.upcomingSchedules.length === 0 ? (
              <div className="empty-state py-8">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No upcoming posts</p>
              </div>
            ) : (
              stats.upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[rgba(139,92,246,0.08)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.1)] flex items-center justify-center">
                    {getPlatformIcon(schedule.platform.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {schedule.post.title || "Untitled Post"}
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-1">
                      {schedule.post.client.name} - {schedule.platform.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-white">
                      {format(new Date(schedule.scheduledAt), "MMM d")}
                    </p>
                    <p className="text-xs text-[#94a3b8]">
                      {format(new Date(schedule.scheduledAt), "h:mm a")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-card">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/dashboard/clients/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(139,92,246,0.08)] hover:bg-[rgba(139,92,246,0.15)] border border-transparent hover:border-[rgba(139,92,246,0.3)] transition-all text-center"
          >
            <Users className="w-6 h-6 text-[#8B5CF6]" />
            <span className="text-sm text-[#94a3b8]">Add Client</span>
          </Link>
          <Link
            href="/dashboard/posts/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(236,72,153,0.08)] hover:bg-[rgba(236,72,153,0.15)] border border-transparent hover:border-[rgba(236,72,153,0.3)] transition-all text-center"
          >
            <FileText className="w-6 h-6 text-[#EC4899]" />
            <span className="text-sm text-[#94a3b8]">Create Post</span>
          </Link>
          <Link
            href="/dashboard/ai-caption"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(59,130,246,0.08)] hover:bg-[rgba(59,130,246,0.15)] border border-transparent hover:border-[rgba(59,130,246,0.3)] transition-all text-center"
          >
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-[#94a3b8]">AI Caption</span>
          </Link>
          <Link
            href="/dashboard/calendar"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[rgba(34,197,94,0.08)] hover:bg-[rgba(34,197,94,0.15)] border border-transparent hover:border-[rgba(34,197,94,0.3)] transition-all text-center"
          >
            <Calendar className="w-6 h-6 text-green-400" />
            <span className="text-sm text-[#94a3b8]">View Calendar</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
