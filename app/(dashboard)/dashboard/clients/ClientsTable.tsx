"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Instagram,
  Facebook,
  Linkedin,
  Edit,
  Trash2,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  name: string;
  company: string | null;
  brandTone: string;
  industry: string | null;
  logoUrl: string | null;
  createdAt: Date;
  socialAccounts: {
    id: string;
    isConnected: boolean;
    platform: {
      name: string;
    };
  }[];
  _count: {
    posts: number;
  };
}

interface ClientsTableProps {
  clients: Client[];
}

export default function ClientsTable({ clients }: ClientsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete client");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Brand Tone</th>
              <th>Platforms</th>
              <th>Posts</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div className="flex items-center gap-3">
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                        <span className="font-bold text-white">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white">{client.name}</p>
                      {client.company && (
                        <p className="text-xs text-[#94a3b8]">{client.company}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="px-2 py-1 text-xs rounded-full bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]">
                    {client.brandTone.replace("_", " ").toLowerCase()}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {client.socialAccounts.map((account) => (
                      <div
                        key={account.id}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          account.isConnected
                            ? "bg-[rgba(139,92,246,0.2)]"
                            : "bg-[rgba(100,116,139,0.2)] opacity-50"
                        }`}
                      >
                        {account.platform.name === "Instagram" && (
                          <Instagram className="w-3 h-3 text-[#E4405F]" />
                        )}
                        {account.platform.name === "Facebook" && (
                          <Facebook className="w-3 h-3 text-[#1877F2]" />
                        )}
                        {account.platform.name === "LinkedIn" && (
                          <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="text-white">{client._count.posts}</span>
                </td>
                <td>
                  <span className="text-[#94a3b8]">
                    {format(new Date(client.createdAt), "MMM d, yyyy")}
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
                      title="View Dashboard"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/dashboard/clients/${client.id}/edit`}
                      className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
                      disabled={deletingId === client.id}
                      className="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
