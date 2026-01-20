"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Image,
  Video,
  Send,
  Clock,
  Sparkles,
  Loader2,
  Instagram,
  Facebook,
  Linkedin,
  Plus,
  X,
  Calendar,
  Upload,
} from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  name: string;
  brandTone: string;
  socialAccounts: {
    id: string;
    accountName: string;
    username: string;
    isConnected: boolean;
    platform: {
      id: string;
      name: string;
      color: string;
    };
  }[];
}

interface PlatformSchedule {
  platformId: string;
  socialAccountId: string;
  platformName: string;
  scheduledAt: string;
  scheduledTime: string;
}

function getPlatformIcon(platformName: string, className = "w-5 h-5") {
  switch (platformName.toLowerCase()) {
    case "instagram":
      return <Instagram className={`${className} text-[#E4405F]`} />;
    case "facebook":
      return <Facebook className={`${className} text-[#1877F2]`} />;
    case "linkedin":
      return <Linkedin className={`${className} text-[#0A66C2]`} />;
    default:
      return null;
  }
}

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialClientId = searchParams.get("clientId");

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    hashtags: "",
    mediaType: "IMAGE",
  });

  const [platformSchedules, setPlatformSchedules] = useState<PlatformSchedule[]>([]);

  // Fetch clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data);

        // Auto-select client if provided
        if (initialClientId) {
          const client = data.find((c: Client) => c.id === initialClientId);
          if (client) {
            setSelectedClient(client);
          }
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchClients();
  }, [initialClientId]);

  // Add platform schedule
  const addPlatformSchedule = (account: Client["socialAccounts"][0]) => {
    if (platformSchedules.some((s) => s.socialAccountId === account.id)) {
      return; // Already added
    }

    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);

    setPlatformSchedules([
      ...platformSchedules,
      {
        platformId: account.platform.id,
        socialAccountId: account.id,
        platformName: account.platform.name,
        scheduledAt: format(now, "yyyy-MM-dd"),
        scheduledTime: format(now, "HH:mm"),
      },
    ]);
  };

  // Remove platform schedule
  const removePlatformSchedule = (socialAccountId: string) => {
    setPlatformSchedules(platformSchedules.filter((s) => s.socialAccountId !== socialAccountId));
  };

  // Update schedule time
  const updateSchedule = (socialAccountId: string, field: "scheduledAt" | "scheduledTime", value: string) => {
    setPlatformSchedules(
      platformSchedules.map((s) =>
        s.socialAccountId === socialAccountId ? { ...s, [field]: value } : s
      )
    );
  };

  // Generate AI caption
  const generateCaption = async () => {
    if (!selectedClient) return;

    setIsGeneratingCaption(true);
    try {
      const res = await fetch("/api/ai/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClient.id,
          brandTone: selectedClient.brandTone,
          platforms: platformSchedules.map((s) => s.platformName),
          title: formData.title,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setFormData({
        ...formData,
        caption: data.caption,
        hashtags: data.hashtags,
      });
    } catch (error) {
      console.error("Error generating caption:", error);
      setError("Failed to generate caption. Please try again.");
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  // Submit post
  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!selectedClient) return;

    setError("");
    setIsSubmitting(true);

    try {
      const schedules = isDraft
        ? []
        : platformSchedules.map((s) => ({
            platformId: s.platformId,
            socialAccountId: s.socialAccountId,
            scheduledAt: new Date(`${s.scheduledAt}T${s.scheduledTime}`).toISOString(),
          }));

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClient.id,
          title: formData.title,
          caption: formData.caption,
          hashtags: formData.hashtags,
          mediaType: formData.mediaType,
          aiGenerated: false,
          platformSchedules: schedules,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      router.push(`/dashboard/clients/${selectedClient.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={selectedClient ? `/dashboard/clients/${selectedClient.id}` : "/dashboard/posts"}
          className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <p className="text-[#94a3b8]">
            Schedule posts across multiple platforms with different times
          </p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {/* Client Selection */}
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold text-white mb-4">Select Client</h2>

          {clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#94a3b8] mb-4">No clients available</p>
              <Link href="/dashboard/clients/new" className="btn-gradient">
                <Plus className="w-4 h-4" />
                Add Client
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {clients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => {
                    setSelectedClient(client);
                    setPlatformSchedules([]);
                  }}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedClient?.id === client.id
                      ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.15)]"
                      : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-2">
                    <span className="font-bold text-white">{client.name.charAt(0)}</span>
                  </div>
                  <p className="font-medium text-white text-sm truncate">{client.name}</p>
                  <p className="text-xs text-[#64748b]">
                    {client.brandTone.replace("_", " ").toLowerCase()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedClient && (
          <>
            {/* Platform Selection */}
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold text-white mb-4">Select Platforms & Schedule</h2>
              <p className="text-sm text-[#94a3b8] mb-4">
                Choose which platforms to post to and set different times for each
              </p>

              {/* Available Platforms */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {selectedClient.socialAccounts.map((account) => {
                  const isSelected = platformSchedules.some((s) => s.socialAccountId === account.id);
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() =>
                        isSelected
                          ? removePlatformSchedule(account.id)
                          : addPlatformSchedule(account)
                      }
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                        isSelected
                          ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.15)]"
                          : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.1)] flex items-center justify-center">
                        {getPlatformIcon(account.platform.name)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-white text-sm">{account.platform.name}</p>
                        <p className="text-xs text-[#64748b]">{account.username}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                          <span className="text-xs text-white">&#10003;</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Schedule Times */}
              {platformSchedules.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-white">Schedule Times</h3>
                  {platformSchedules.map((schedule) => (
                    <div
                      key={schedule.socialAccountId}
                      className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(139,92,246,0.05)] border border-[rgba(139,92,246,0.2)]"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(139,92,246,0.1)]">
                        {getPlatformIcon(schedule.platformName, "w-4 h-4")}
                      </div>
                      <span className="font-medium text-white text-sm min-w-[80px]">
                        {schedule.platformName}
                      </span>
                      <div className="flex-1 flex items-center gap-3">
                        <input
                          type="date"
                          value={schedule.scheduledAt}
                          onChange={(e) =>
                            updateSchedule(schedule.socialAccountId, "scheduledAt", e.target.value)
                          }
                          className="form-input w-auto"
                        />
                        <input
                          type="time"
                          value={schedule.scheduledTime}
                          onChange={(e) =>
                            updateSchedule(schedule.socialAccountId, "scheduledTime", e.target.value)
                          }
                          className="form-input w-auto"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePlatformSchedule(schedule.socialAccountId)}
                        className="p-2 text-[#94a3b8] hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Post Content</h2>
                <button
                  type="button"
                  onClick={generateCaption}
                  disabled={isGeneratingCaption}
                  className="btn-ghost text-[#EC4899] hover:text-white"
                >
                  {isGeneratingCaption ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Title (optional)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    placeholder="Post title for internal reference"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Caption</label>
                  <textarea
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    className="form-textarea"
                    placeholder="Write your post caption..."
                    rows={5}
                  />
                  <p className="text-xs text-[#64748b] mt-1">
                    {formData.caption.length} characters
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Hashtags</label>
                  <input
                    type="text"
                    value={formData.hashtags}
                    onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                    className="form-input"
                    placeholder="#marketing #social #business"
                  />
                </div>

                {/* Media Type */}
                <div className="form-group">
                  <label className="form-label">Media Type</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "IMAGE" })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        formData.mediaType === "IMAGE"
                          ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.15)] text-white"
                          : "border-[rgba(139,92,246,0.2)] text-[#94a3b8]"
                      }`}
                    >
                      <Image className="w-4 h-4" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "VIDEO" })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        formData.mediaType === "VIDEO"
                          ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.15)] text-white"
                          : "border-[rgba(139,92,246,0.2)] text-[#94a3b8]"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "CAROUSEL" })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        formData.mediaType === "CAROUSEL"
                          ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.15)] text-white"
                          : "border-[rgba(139,92,246,0.2)] text-[#94a3b8]"
                      }`}
                    >
                      <Image className="w-4 h-4" />
                      Carousel
                    </button>
                  </div>
                </div>

                {/* Media Upload Placeholder */}
                <div className="form-group">
                  <label className="form-label">Media</label>
                  <div className="border-2 border-dashed border-[rgba(139,92,246,0.3)] rounded-lg p-8 text-center hover:border-[rgba(139,92,246,0.5)] transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-[#64748b]" />
                    <p className="text-sm text-[#94a3b8]">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-[#64748b] mt-1">
                      PNG, JPG, GIF, MP4 up to 50MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSubmitting}
                className="btn-ghost"
              >
                Save as Draft
              </button>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/clients/${selectedClient.id}`} className="btn-ghost">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || platformSchedules.length === 0}
                  className="btn-gradient"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Schedule Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
