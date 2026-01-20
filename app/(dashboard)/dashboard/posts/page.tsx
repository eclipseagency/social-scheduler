import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import {
  Plus,
  FileText,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  CheckCircle,
  XCircle,
  Edit2,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

async function getPosts(userId: string, filters: { clientId?: string; status?: string }) {
  const where: Record<string, unknown> = {
    client: { userId },
  };

  if (filters.clientId) {
    where.clientId = filters.clientId;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  return prisma.post.findMany({
    where,
    include: {
      client: true,
      platformSchedules: {
        include: {
          platform: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
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
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[rgba(148,163,184,0.2)] text-[#94a3b8]">
          <FileText className="w-3 h-3" />
          Draft
        </span>
      );
    case "SCHEDULED":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[rgba(59,130,246,0.2)] text-blue-400">
          <Clock className="w-3 h-3" />
          Scheduled
        </span>
      );
    case "POSTED":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[rgba(34,197,94,0.2)] text-green-400">
          <CheckCircle className="w-3 h-3" />
          Posted
        </span>
      );
    case "FAILED":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[rgba(239,68,68,0.2)] text-red-400">
          <XCircle className="w-3 h-3" />
          Failed
        </span>
      );
    default:
      return null;
  }
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string; status?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const [posts, clients] = await Promise.all([
    getPosts(session.user.id, params),
    getClients(session.user.id),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">All Posts</h1>
          <p className="text-[#94a3b8]">
            View and manage all your scheduled and published posts
          </p>
        </div>
        <Link href="/dashboard/posts/new" className="btn-gradient">
          <Plus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          defaultValue={params.clientId || ""}
          className="form-select w-auto"
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value) {
              url.searchParams.set("clientId", e.target.value);
            } else {
              url.searchParams.delete("clientId");
            }
            window.location.href = url.toString();
          }}
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <select
          defaultValue={params.status || ""}
          className="form-select w-auto"
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value) {
              url.searchParams.set("status", e.target.value);
            } else {
              url.searchParams.delete("status");
            }
            window.location.href = url.toString();
          }}
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="POSTED">Posted</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="dashboard-card">
          <div className="empty-state py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">No posts found</h3>
            <p className="text-[#94a3b8] mb-6">
              {params.clientId || params.status
                ? "Try adjusting your filters"
                : "Create your first post to get started"}
            </p>
            <Link href="/dashboard/posts/new" className="btn-gradient">
              <Plus className="w-5 h-5" />
              Create Post
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="dashboard-card hover:border-[rgba(139,92,246,0.4)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-white">
                        {post.title || "Untitled Post"}
                      </h3>
                      <p className="text-sm text-[#94a3b8]">{post.client.name}</p>
                    </div>
                    {getStatusBadge(post.status)}
                  </div>

                  {post.caption && (
                    <p className="text-sm text-[#94a3b8] line-clamp-2 mb-3">
                      {post.caption}
                    </p>
                  )}

                  <div className="flex items-center flex-wrap gap-4">
                    {/* Platforms */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#64748b]">Platforms:</span>
                      <div className="flex -space-x-1">
                        {post.platformSchedules.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="w-6 h-6 rounded-full bg-[#0f0a1a] border border-[rgba(139,92,246,0.3)] flex items-center justify-center"
                            title={schedule.platform.name}
                          >
                            {getPlatformIcon(schedule.platform.name)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Info */}
                    {post.platformSchedules.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-[#64748b]">
                        <Calendar className="w-3 h-3" />
                        {post.platformSchedules.map((s, i) => (
                          <span key={s.id}>
                            {i > 0 && ", "}
                            {format(new Date(s.scheduledAt), "MMM d, h:mm a")}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Created Date */}
                    <span className="text-xs text-[#64748b]">
                      Created {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/posts/${post.id}`}
                  className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
