import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import {
  Plus,
  Search,
  Building2,
  Instagram,
  Facebook,
  Linkedin,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import ClientsTable from "./ClientsTable";

async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    include: {
      socialAccounts: {
        include: { platform: true },
      },
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ClientsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const clients = await getClients(session.user.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-[#94a3b8]">
            Manage your client accounts and their social media profiles
          </p>
        </div>
        <Link href="/dashboard/clients/new" className="btn-gradient">
          <Plus className="w-5 h-5" />
          Add Client
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search clients..."
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Clients Grid */}
      {clients.length === 0 ? (
        <div className="dashboard-card">
          <div className="empty-state py-12">
            <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">No clients yet</h3>
            <p className="text-[#94a3b8] mb-6">
              Start by adding your first client to manage their social media
            </p>
            <Link href="/dashboard/clients/new" className="btn-gradient">
              <Plus className="w-5 h-5" />
              Add Your First Client
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="dashboard-card hover:border-[rgba(139,92,246,0.4)] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-white">{client.name}</h3>
                    <p className="text-xs text-[#94a3b8]">{client.company}</p>
                  </div>
                </div>
                <div className="relative group">
                  <button className="p-1 text-[#64748b] hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-40 bg-[#0f0a1a] border border-[rgba(139,92,246,0.2)] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="dropdown-item"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Dashboard
                    </Link>
                    <Link
                      href={`/dashboard/clients/${client.id}/edit`}
                      className="dropdown-item"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button className="dropdown-item text-red-400 hover:text-red-300 w-full">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Brand Tone */}
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]">
                  {client.brandTone.replace("_", " ").toLowerCase()}
                </span>
                {client.industry && (
                  <span className="inline-block ml-2 px-2 py-1 text-xs rounded-full bg-[rgba(59,130,246,0.2)] text-blue-400">
                    {client.industry}
                  </span>
                )}
              </div>

              {/* Connected Platforms */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#64748b]">Connected:</span>
                <div className="flex gap-2">
                  {client.socialAccounts.map((account) => (
                    <div
                      key={account.id}
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        account.isConnected
                          ? "bg-[rgba(139,92,246,0.2)]"
                          : "bg-[rgba(100,116,139,0.2)] opacity-50"
                      }`}
                      title={`${account.platform.name}${
                        account.isConnected ? "" : " (Not connected)"
                      }`}
                    >
                      {account.platform.name === "Instagram" && (
                        <Instagram className="w-4 h-4 text-[#E4405F]" />
                      )}
                      {account.platform.name === "Facebook" && (
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                      )}
                      {account.platform.name === "LinkedIn" && (
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(139,92,246,0.2)]">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {client._count.posts}
                  </p>
                  <p className="text-xs text-[#94a3b8]">Total Posts</p>
                </div>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="btn-ghost text-[#8B5CF6] hover:text-[#EC4899]"
                >
                  View Dashboard
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
