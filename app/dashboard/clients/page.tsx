"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Instagram,
  Facebook,
  Linkedin,
  Trash2,
  Loader2,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string | null;
  logoUrl: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
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

export default function ClientsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchClients();
    }
  }, [status]);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId: string) => {
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return;
    }

    setDeleting(clientId);
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setClients(clients.filter((c) => c.id !== clientId));
      } else {
        alert("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    } finally {
      setDeleting(null);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Your <span className="text-gradient">Clients</span>
            </h1>
            <p className="text-[#94a3b8]">
              Manage all your clients and their social media accounts
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

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search clients by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-styled pl-12 max-w-xl"
          />
        </div>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Users className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? "No clients found" : "No clients yet"}
            </h3>
            <p className="text-[#94a3b8] mb-6">
              {searchTerm
                ? "Try a different search term"
                : "Start by adding your first client"}
            </p>
            {!searchTerm && (
              <Link
                href="/dashboard/clients/new"
                className="btn-gradient inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First Client
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="flex items-center gap-4"
                  >
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-colors">
                        {client.name}
                      </h3>
                      {client.company && (
                        <p className="text-[#94a3b8] text-sm">{client.company}</p>
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id)}
                    disabled={deleting === client.id}
                    className="p-2 rounded-lg text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    {deleting === client.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {client.email && (
                  <p className="text-[#94a3b8] text-sm mb-4">{client.email}</p>
                )}

                {/* Social Accounts */}
                <div className="flex items-center gap-2 mb-4">
                  {client.socialAccounts.length > 0 ? (
                    client.socialAccounts.map((account) => (
                      <div
                        key={account.id}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
                          account.isConnected
                            ? "bg-green-500/20"
                            : "bg-yellow-500/20"
                        }`}
                        title={`${account.accountName} - ${
                          account.isConnected ? "Connected" : "Not connected"
                        }`}
                      >
                        {getPlatformIcon(account.platform)}
                        <span className="text-xs text-white">
                          {account.accountName.slice(0, 10)}
                          {account.accountName.length > 10 && "..."}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[#94a3b8] text-sm">
                      No social accounts
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(139,92,246,0.2)]">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {client._count.posts}
                    </p>
                    <p className="text-[#94a3b8] text-xs">Total Posts</p>
                  </div>
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="btn-outline text-sm py-2 px-4"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
