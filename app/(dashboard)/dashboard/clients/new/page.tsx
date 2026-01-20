"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
  Loader2,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

const brandTones = [
  { value: "PROFESSIONAL", label: "Professional", description: "Formal and business-oriented" },
  { value: "FRIENDLY", label: "Friendly", description: "Warm and approachable" },
  { value: "CASUAL", label: "Casual", description: "Relaxed and informal" },
  { value: "FORMAL", label: "Formal", description: "Strict and official" },
  { value: "HUMOROUS", label: "Humorous", description: "Fun and witty" },
  { value: "INSPIRATIONAL", label: "Inspirational", description: "Motivating and uplifting" },
  { value: "SALES_DRIVEN", label: "Sales-Driven", description: "Persuasive and action-oriented" },
  { value: "EDUCATIONAL", label: "Educational", description: "Informative and teaching" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Fashion",
  "Travel",
  "Education",
  "Real Estate",
  "Entertainment",
  "Health & Fitness",
  "Beauty",
  "Automotive",
  "Other",
];

export default function NewClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
    brandTone: "PROFESSIONAL",
    industry: "",
    website: "",
    platforms: {
      instagram: true,
      facebook: true,
      linkedin: true,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone || null,
          company: formData.company || null,
          description: formData.description || null,
          brandTone: formData.brandTone,
          industry: formData.industry || null,
          website: formData.website || null,
          platforms: formData.platforms,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create client");
      }

      router.push(`/dashboard/clients/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/clients"
          className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Client</h1>
          <p className="text-[#94a3b8]">
            Create a new client account and configure their social media profiles
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8B5CF6]" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">
                Client Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="e.g., TechStart Inc."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="form-input"
                placeholder="Company name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                placeholder="contact@company.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="form-select"
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group mt-4">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              placeholder="Brief description of the client's business and social media goals..."
              rows={3}
            />
          </div>
        </div>

        {/* Brand Tone */}
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold text-white mb-4">
            Brand Tone <span className="text-red-400">*</span>
          </h2>
          <p className="text-sm text-[#94a3b8] mb-4">
            Select the communication style for AI-generated content
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {brandTones.map((tone) => (
              <label
                key={tone.value}
                className={`relative cursor-pointer rounded-lg p-4 border transition-all ${
                  formData.brandTone === tone.value
                    ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.1)]"
                    : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
                }`}
              >
                <input
                  type="radio"
                  name="brandTone"
                  value={tone.value}
                  checked={formData.brandTone === tone.value}
                  onChange={(e) => setFormData({ ...formData, brandTone: e.target.value })}
                  className="sr-only"
                />
                <div>
                  <p className="font-medium text-white text-sm">{tone.label}</p>
                  <p className="text-xs text-[#94a3b8] mt-1">{tone.description}</p>
                </div>
                {formData.brandTone === tone.value && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#8B5CF6]" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Social Media Platforms */}
        <div className="dashboard-card">
          <h2 className="text-lg font-semibold text-white mb-4">
            Social Media Platforms
          </h2>
          <p className="text-sm text-[#94a3b8] mb-4">
            Select which platforms this client will use
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                formData.platforms.instagram
                  ? "border-[#E4405F] bg-[rgba(228,64,95,0.1)]"
                  : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
              }`}
            >
              <input
                type="checkbox"
                checked={formData.platforms.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    platforms: { ...formData.platforms, instagram: e.target.checked },
                  })
                }
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                formData.platforms.instagram ? "bg-[rgba(228,64,95,0.2)]" : "bg-[rgba(100,116,139,0.2)]"
              }`}>
                <Instagram className={`w-5 h-5 ${formData.platforms.instagram ? "text-[#E4405F]" : "text-[#64748b]"}`} />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${formData.platforms.instagram ? "text-white" : "text-[#94a3b8]"}`}>
                  Instagram
                </p>
                <p className="text-xs text-[#64748b]">Photos & Reels</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                formData.platforms.facebook
                  ? "border-[#1877F2] bg-[rgba(24,119,242,0.1)]"
                  : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
              }`}
            >
              <input
                type="checkbox"
                checked={formData.platforms.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    platforms: { ...formData.platforms, facebook: e.target.checked },
                  })
                }
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                formData.platforms.facebook ? "bg-[rgba(24,119,242,0.2)]" : "bg-[rgba(100,116,139,0.2)]"
              }`}>
                <Facebook className={`w-5 h-5 ${formData.platforms.facebook ? "text-[#1877F2]" : "text-[#64748b]"}`} />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${formData.platforms.facebook ? "text-white" : "text-[#94a3b8]"}`}>
                  Facebook
                </p>
                <p className="text-xs text-[#64748b]">Posts & Pages</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                formData.platforms.linkedin
                  ? "border-[#0A66C2] bg-[rgba(10,102,194,0.1)]"
                  : "border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)]"
              }`}
            >
              <input
                type="checkbox"
                checked={formData.platforms.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    platforms: { ...formData.platforms, linkedin: e.target.checked },
                  })
                }
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                formData.platforms.linkedin ? "bg-[rgba(10,102,194,0.2)]" : "bg-[rgba(100,116,139,0.2)]"
              }`}>
                <Linkedin className={`w-5 h-5 ${formData.platforms.linkedin ? "text-[#0A66C2]" : "text-[#64748b]"}`} />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${formData.platforms.linkedin ? "text-white" : "text-[#94a3b8]"}`}>
                  LinkedIn
                </p>
                <p className="text-xs text-[#64748b]">Professional Content</p>
              </div>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/dashboard/clients"
            className="btn-ghost"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !formData.name}
            className="btn-gradient"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Create Client
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
