"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Instagram,
  Facebook,
  Linkedin,
  Plus,
  Calendar,
  Sparkles,
  Loader2,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Save,
  X,
} from "lucide-react";

interface SocialAccount {
  id: string;
  platform: string;
  accountName: string;
  isConnected: boolean;
  profileUrl: string | null;
}

interface Post {
  id: string;
  title: string | null;
  caption: string | null;
  imageUrl: string | null;
  status: string;
  scheduledAt: string | null;
  socialAccount: SocialAccount;
}

interface Client {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  logoUrl: string | null;
  description: string | null;
  socialAccounts: SocialAccount[];
  posts: Post[];
}

export default function ClientDetailPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "accounts">(
    "overview"
  );

  // Social account form
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountForm, setAccountForm] = useState({
    platform: "instagram",
    accountName: "",
    profileUrl: "",
  });
  const [savingAccount, setSavingAccount] = useState(false);

  // Post creation
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postForm, setPostForm] = useState({
    socialAccountId: "",
    caption: "",
    imageUrl: "",
    postType: "image_first",
    scheduledAt: "",
  });
  const [savingPost, setSavingPost] = useState(false);
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}`);
      if (res.ok) {
        const data = await res.json();
        setClient(data);
      } else {
        router.push("/dashboard/clients");
      }
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSocialAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAccount(true);

    try {
      const res = await fetch("/api/social-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          ...accountForm,
        }),
      });

      if (res.ok) {
        fetchClient();
        setShowAddAccount(false);
        setAccountForm({ platform: "instagram", accountName: "", profileUrl: "" });
      }
    } catch (error) {
      console.error("Error adding social account:", error);
    } finally {
      setSavingAccount(false);
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (!confirm("Delete this social account?")) return;

    try {
      const res = await fetch(`/api/social-accounts/${accountId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchClient();
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleGenerateCaption = async () => {
    if (!postForm.socialAccountId) {
      alert("Please select a social account first");
      return;
    }

    setGeneratingCaption(true);

    try {
      const account = client?.socialAccounts.find(
        (a) => a.id === postForm.socialAccountId
      );

      const res = await fetch("/api/ai/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          platform: account?.platform,
          imageDescription,
          tone: "professional",
          language: "English",
          includeHashtags: true,
          postType: postForm.postType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPostForm((prev) => ({ ...prev, caption: data.caption }));
      } else {
        alert(data.error || "Failed to generate caption");
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      alert("Failed to generate caption");
    } finally {
      setGeneratingCaption(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPost(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          ...postForm,
          aiGenerated: true,
        }),
      });

      if (res.ok) {
        fetchClient();
        setShowCreatePost(false);
        setPostForm({
          socialAccountId: "",
          caption: "",
          imageUrl: "",
          postType: "image_first",
          scheduledAt: "",
        });
        setImageDescription("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSavingPost(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "post");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setPostForm((prev) => ({ ...prev, imageUrl: data.url }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getPlatformIcon = (platform: string, size = "w-5 h-5") => {
    switch (platform) {
      case "instagram":
        return <Instagram className={`${size} text-[#E4405F]`} />;
      case "facebook":
        return <Facebook className={`${size} text-[#1877F2]`} />;
      case "linkedin":
        return <Linkedin className={`${size} text-[#0A66C2]`} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Clients
        </Link>

        {/* Client Header */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {client.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={client.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {client.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{client.name}</h1>
              {client.company && (
                <p className="text-[#94a3b8]">{client.company}</p>
              )}
              {client.description && (
                <p className="text-[#94a3b8] text-sm mt-2">
                  {client.description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreatePost(true)}
                className="btn-gradient flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Create Post
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-[rgba(139,92,246,0.1)] rounded-xl w-fit">
          {(["overview", "posts", "accounts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Social Accounts */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Social Accounts</h2>
                <button
                  onClick={() => setShowAddAccount(true)}
                  className="btn-outline text-sm py-2 px-3 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {client.socialAccounts.length === 0 ? (
                <p className="text-[#94a3b8] text-center py-8">
                  No social accounts connected
                </p>
              ) : (
                <div className="space-y-3">
                  {client.socialAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(139,92,246,0.05)]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.1)] flex items-center justify-center">
                        {getPlatformIcon(account.platform)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {account.accountName}
                        </p>
                        <p className="text-[#94a3b8] text-sm capitalize">
                          {account.platform}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="p-2 text-[#94a3b8] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Posts */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Posts</h2>
              {client.posts.length === 0 ? (
                <p className="text-[#94a3b8] text-center py-8">No posts yet</p>
              ) : (
                <div className="space-y-3">
                  {client.posts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-xl bg-[rgba(139,92,246,0.05)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {getPlatformIcon(post.socialAccount.platform, "w-4 h-4")}
                        <span className="text-[#94a3b8] text-sm">
                          {post.socialAccount.accountName}
                        </span>
                        <span
                          className={`ml-auto px-2 py-0.5 rounded text-xs ${
                            post.status === "published"
                              ? "bg-green-500/20 text-green-400"
                              : post.status === "scheduled"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p className="text-white text-sm line-clamp-2">
                        {post.caption || "No caption"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">All Posts</h2>
              <button
                onClick={() => setShowCreatePost(true)}
                className="btn-gradient flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Post
              </button>
            </div>

            {client.posts.length === 0 ? (
              <p className="text-[#94a3b8] text-center py-12">
                No posts created yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {client.posts.map((post) => (
                  <div key={post.id} className="glass-card p-4">
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Post"
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {getPlatformIcon(post.socialAccount.platform, "w-4 h-4")}
                      <span className="text-[#94a3b8] text-sm">
                        {post.socialAccount.accountName}
                      </span>
                    </div>
                    <p className="text-white text-sm line-clamp-3 mb-3">
                      {post.caption || "No caption"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : post.status === "scheduled"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.scheduledAt && (
                        <span className="text-[#94a3b8] text-xs">
                          {new Date(post.scheduledAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "accounts" && (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Social Accounts</h2>
              <button
                onClick={() => setShowAddAccount(true)}
                className="btn-gradient flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Account
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["instagram", "facebook", "linkedin"].map((platform) => {
                const accounts = client.socialAccounts.filter(
                  (a) => a.platform === platform
                );
                return (
                  <div key={platform} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {getPlatformIcon(platform, "w-8 h-8")}
                      <h3 className="text-lg font-semibold text-white capitalize">
                        {platform}
                      </h3>
                    </div>
                    {accounts.length === 0 ? (
                      <p className="text-[#94a3b8] text-sm">
                        No {platform} accounts
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {accounts.map((account) => (
                          <div
                            key={account.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-[rgba(139,92,246,0.05)]"
                          >
                            <span className="text-white text-sm">
                              {account.accountName}
                            </span>
                            <button
                              onClick={() => handleDeleteAccount(account.id)}
                              className="text-[#94a3b8] hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Social Account Modal */}
        {showAddAccount && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="glass-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Add Social Account
                </h3>
                <button
                  onClick={() => setShowAddAccount(false)}
                  className="text-[#94a3b8] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddSocialAccount} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2">
                    Platform
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["instagram", "facebook", "linkedin"].map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() =>
                          setAccountForm({ ...accountForm, platform })
                        }
                        className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                          accountForm.platform === platform
                            ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                            : "bg-[rgba(139,92,246,0.1)] hover:bg-[rgba(139,92,246,0.2)]"
                        }`}
                      >
                        {getPlatformIcon(platform, "w-6 h-6")}
                        <span className="text-white text-xs capitalize">
                          {platform}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">
                    Account Name / Handle
                  </label>
                  <input
                    type="text"
                    value={accountForm.accountName}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        accountName: e.target.value,
                      })
                    }
                    className="input-styled"
                    placeholder="@username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">
                    Profile URL (optional)
                  </label>
                  <input
                    type="url"
                    value={accountForm.profileUrl}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        profileUrl: e.target.value,
                      })
                    }
                    className="input-styled"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddAccount(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingAccount}
                    className="btn-gradient flex-1 flex items-center justify-center gap-2"
                  >
                    {savingAccount ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    Add Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="glass-card p-6 w-full max-w-2xl my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create New Post</h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-[#94a3b8] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Social Account Selection */}
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2">
                    Select Social Account *
                  </label>
                  <select
                    value={postForm.socialAccountId}
                    onChange={(e) =>
                      setPostForm({
                        ...postForm,
                        socialAccountId: e.target.value,
                      })
                    }
                    className="input-styled"
                    required
                  >
                    <option value="">Choose an account...</option>
                    {client.socialAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.platform} - {account.accountName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Post Type */}
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2">
                    Post Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPostForm({ ...postForm, postType: "image_first" })
                      }
                      className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                        postForm.postType === "image_first"
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                          : "bg-[rgba(139,92,246,0.1)]"
                      }`}
                    >
                      <ImageIcon className="w-5 h-5 text-white" />
                      <span className="text-white text-sm">Image First</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPostForm({ ...postForm, postType: "text_first" })
                      }
                      className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                        postForm.postType === "text_first"
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                          : "bg-[rgba(139,92,246,0.1)]"
                      }`}
                    >
                      <Edit2 className="w-5 h-5 text-white" />
                      <span className="text-white text-sm">Text First</span>
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2">
                    Design Image
                  </label>
                  {postForm.imageUrl ? (
                    <div className="relative">
                      <img
                        src={postForm.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPostForm({ ...postForm, imageUrl: "" })
                        }
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-full h-40 border-2 border-dashed border-[rgba(139,92,246,0.3)] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#8B5CF6] transition-colors">
                      <ImageIcon className="w-10 h-10 text-[#94a3b8] mb-2" />
                      <span className="text-[#94a3b8]">Click to upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Image Description for AI */}
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">
                    Describe the image (for AI caption)
                  </label>
                  <textarea
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    className="input-styled resize-none"
                    placeholder="Describe what's in the image or design..."
                    rows={2}
                  />
                </div>

                {/* Caption */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-[#94a3b8]">Caption</label>
                    <button
                      type="button"
                      onClick={handleGenerateCaption}
                      disabled={generatingCaption}
                      className="text-[#8B5CF6] hover:text-[#EC4899] text-sm flex items-center gap-1 transition-colors"
                    >
                      {generatingCaption ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate with AI
                    </button>
                  </div>
                  <textarea
                    value={postForm.caption}
                    onChange={(e) =>
                      setPostForm({ ...postForm, caption: e.target.value })
                    }
                    className="input-styled resize-none"
                    placeholder="Write your caption..."
                    rows={4}
                  />
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-1">
                    Schedule For (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={postForm.scheduledAt}
                    onChange={(e) =>
                      setPostForm({ ...postForm, scheduledAt: e.target.value })
                    }
                    className="input-styled"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingPost}
                    className="btn-gradient flex-1 flex items-center justify-center gap-2"
                  >
                    {savingPost ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                    {postForm.scheduledAt ? "Schedule Post" : "Save Draft"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
