"use client";

import { Building2 } from "lucide-react";

interface ClientLogoCardProps {
  name: string;
  logoUrl?: string;
  description?: string;
}

export default function ClientLogoCard({ name, logoUrl, description }: ClientLogoCardProps) {
  return (
    <div className="card p-4 cursor-pointer group">
      <div className="aspect-square rounded-lg bg-[rgba(139,92,246,0.06)] flex items-center justify-center mb-3 group-hover:bg-[rgba(139,92,246,0.1)] transition-colors">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="w-full h-full object-contain p-3" />
        ) : (
          <Building2 className="w-8 h-8 text-[#8B5CF6] opacity-40" />
        )}
      </div>
      <h3 className="text-sm font-medium text-white truncate">{name}</h3>
      {description && (
        <p className="text-xs text-[#64748b] truncate mt-0.5">{description}</p>
      )}
    </div>
  );
}
