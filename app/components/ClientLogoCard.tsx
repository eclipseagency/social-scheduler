"use client";

import { Building2, Calendar } from "lucide-react";

interface ClientLogoCardProps {
  name: string;
  logoUrl?: string;
  description?: string;
}

export default function ClientLogoCard({
  name,
  logoUrl,
  description,
}: ClientLogoCardProps) {
  return (
    <div className="glass-card p-6 group cursor-pointer">
      {/* Logo Area */}
      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-[rgba(236,72,153,0.1)] flex items-center justify-center mb-4 group-hover:from-[rgba(139,92,246,0.2)] group-hover:to-[rgba(236,72,153,0.2)] transition-all duration-300 overflow-hidden">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <Building2 className="w-16 h-16 text-[#8B5CF6] opacity-50 group-hover:opacity-70 transition-opacity" />
        )}
      </div>

      {/* Client Info */}
      <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-gradient transition-colors">
        {name}
      </h3>

      {description && (
        <p className="text-[#94a3b8] text-sm mb-3 line-clamp-2">{description}</p>
      )}

      {/* Action Hint */}
      <div className="flex items-center gap-2 text-[#8B5CF6] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <Calendar className="w-4 h-4" />
        <span>Click to view schedule</span>
      </div>
    </div>
  );
}
