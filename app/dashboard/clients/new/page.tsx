"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Key,
  X,
} from "lucide-react";

export default function NewClientPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
    logoUrl: "",
    createUserAccount: false,
    password: "",
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "logo");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setFormData((prev) => ({ ...prev, logoUrl: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create client");
      }

      router.push(`/dashboard/clients/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Clients
        </Link>

        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Add New <span className="text-gradient">Client</span>
          </h1>
          <p className="text-[#94a3b8] mb-8">
            Fill in the details to create a new client profile
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-2">
                Client Logo
              </label>
              <div className="flex items-center gap-4">
                {formData.logoUrl ? (
                  <div className="relative">
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, logoUrl: "" }))
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-[rgba(139,92,246,0.3)] flex flex-col items-center justify-center cursor-pointer hover:border-[#8B5CF6] transition-colors">
                    {uploading ? (
                      <Loader2 className="w-6 h-6 text-[#94a3b8] animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-[#94a3b8]" />
                        <span className="text-[#94a3b8] text-xs mt-1">
                          Upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}
                <div>
                  <p className="text-white text-sm">Upload a logo</p>
                  <p className="text-[#94a3b8] text-xs">
                    PNG, JPG, or GIF. Max 50MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">
                Client Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-styled pl-12"
                  placeholder="Client name"
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">
                Company
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="input-styled pl-12"
                  placeholder="Company name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input-styled pl-12"
                  placeholder="client@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input-styled pl-12"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-[#94a3b8]" />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="input-styled pl-12 resize-none"
                  placeholder="Brief description about the client and their brand..."
                  rows={4}
                />
              </div>
            </div>

            {/* Create User Account */}
            <div className="glass-card p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.createUserAccount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      createUserAccount: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-[rgba(139,92,246,0.3)] bg-transparent text-[#8B5CF6] focus:ring-[#8B5CF6]"
                />
                <div>
                  <p className="text-white font-medium">
                    Create client dashboard access
                  </p>
                  <p className="text-[#94a3b8] text-sm">
                    Allow client to login and view their dashboard
                  </p>
                </div>
              </label>

              {formData.createUserAccount && (
                <div className="mt-4">
                  <label className="block text-sm text-[#94a3b8] mb-1">
                    Password for client account *
                  </label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="input-styled pl-12"
                      placeholder="Create a password"
                      required={formData.createUserAccount}
                      minLength={6}
                    />
                  </div>
                  <p className="text-[#94a3b8] text-xs mt-1">
                    Client will use their email and this password to login
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Link href="/dashboard/clients" className="btn-outline flex-1">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-gradient flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Client"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
