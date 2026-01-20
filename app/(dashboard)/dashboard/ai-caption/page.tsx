"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  brandTone: string;
  description: string | null;
}

export default function AICaptionPage() {
  const searchParams = useSearchParams();
  const initialClientId = searchParams.get("clientId");

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    platforms: ["Instagram"],
    title: "",
    imageDescription: "",
  });

  const [result, setResult] = useState<{
    caption: string;
    hashtags: string;
  } | null>(null);

  // Fetch clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data);

        if (initialClientId) {
          const client = data.find((c: Client) => c.id === initialClientId);
          if (client) setSelectedClient(client);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchClients();
  }, [initialClientId]);

  const togglePlatform = (platform: string) => {
    if (formData.platforms.includes(platform)) {
      if (formData.platforms.length > 1) {
        setFormData({
          ...formData,
          platforms: formData.platforms.filter((p) => p !== platform),
        });
      }
    } else {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, platform],
      });
    }
  };

  const generateCaption = async () => {
    if (!selectedClient) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClient.id,
          brandTone: selectedClient.brandTone,
          platforms: formData.platforms,
          title: formData.title,
          imageDescription: formData.imageDescription,
        }),
      });

      const data = await res.json();
      setResult({
        caption: data.caption,
        hashtags: data.hashtags,
      });
    } catch (error) {
      console.error("Error generating caption:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `${result.caption}\n\n${result.hashtags}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AI Caption Generator</h1>
        </div>
        <p className="text-[#94a3b8]">
          Generate engaging captions tailored to your client&apos;s brand tone and platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Client Selection */}
          <div className="dashboard-card">
            <h2 className="text-lg font-semibold text-white mb-4">Select Client</h2>
            <select
              value={selectedClient?.id || ""}
              onChange={(e) => {
                const client = clients.find((c) => c.id === e.target.value);
                setSelectedClient(client || null);
              }}
              className="form-select"
            >
              <option value="">Choose a client...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.brandTone.replace("_", " ").toLowerCase()})
                </option>
              ))}
            </select>

            {selectedClient && (
              <div className="mt-4 p-3 rounded-lg bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)]">
                <p className="text-sm text-white font-medium">{selectedClient.name}</p>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Tone: {selectedClient.brandTone.replace("_", " ").toLowerCase()}
                </p>
                {selectedClient.description && (
                  <p className="text-xs text-[#64748b] mt-2 line-clamp-2">
                    {selectedClient.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Platform Selection */}
          <div className="dashboard-card">
            <h2 className="text-lg font-semibold text-white mb-4">Target Platforms</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => togglePlatform("Instagram")}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  formData.platforms.includes("Instagram")
                    ? "border-[#E4405F] bg-[rgba(228,64,95,0.15)]"
                    : "border-[rgba(139,92,246,0.2)]"
                }`}
              >
                <Instagram className="w-5 h-5 text-[#E4405F]" />
                <span className={formData.platforms.includes("Instagram") ? "text-white" : "text-[#94a3b8]"}>
                  Instagram
                </span>
              </button>
              <button
                type="button"
                onClick={() => togglePlatform("Facebook")}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  formData.platforms.includes("Facebook")
                    ? "border-[#1877F2] bg-[rgba(24,119,242,0.15)]"
                    : "border-[rgba(139,92,246,0.2)]"
                }`}
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
                <span className={formData.platforms.includes("Facebook") ? "text-white" : "text-[#94a3b8]"}>
                  Facebook
                </span>
              </button>
              <button
                type="button"
                onClick={() => togglePlatform("LinkedIn")}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  formData.platforms.includes("LinkedIn")
                    ? "border-[#0A66C2] bg-[rgba(10,102,194,0.15)]"
                    : "border-[rgba(139,92,246,0.2)]"
                }`}
              >
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                <span className={formData.platforms.includes("LinkedIn") ? "text-white" : "text-[#94a3b8]"}>
                  LinkedIn
                </span>
              </button>
            </div>
          </div>

          {/* Content Details */}
          <div className="dashboard-card">
            <h2 className="text-lg font-semibold text-white mb-4">Content Details</h2>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Topic or Context (optional)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Product launch, Behind the scenes..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image/Visual Description (optional)</label>
                <textarea
                  value={formData.imageDescription}
                  onChange={(e) => setFormData({ ...formData, imageDescription: e.target.value })}
                  className="form-textarea"
                  placeholder="Describe the image or visual content..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCaption}
            disabled={!selectedClient || isGenerating}
            className="btn-gradient w-full py-4"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Caption
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="dashboard-card h-fit sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Generated Caption</h2>
            {result && (
              <div className="flex gap-2">
                <button
                  onClick={generateCaption}
                  disabled={isGenerating}
                  className="btn-ghost"
                  title="Regenerate"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="btn-ghost"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)]">
                <p className="text-white whitespace-pre-wrap">{result.caption}</p>
              </div>

              <div className="p-4 rounded-lg bg-[rgba(236,72,153,0.08)] border border-[rgba(236,72,153,0.2)]">
                <p className="text-sm font-medium text-[#EC4899] mb-2">Hashtags</p>
                <p className="text-[#94a3b8]">{result.hashtags}</p>
              </div>

              <div className="flex gap-2">
                <span className="text-xs text-[#64748b]">
                  {result.caption.length} characters
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#64748b]">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Select a client and click generate to create a caption</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
