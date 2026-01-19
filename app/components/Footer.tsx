import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[rgba(15,10,26,0.8)] border-t border-[rgba(139,92,246,0.15)] mt-auto">
      <div className="container py-12 px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold text-gradient">SocialFlow</span>
            </Link>
            <p className="text-sm text-[#64748b] max-w-xs leading-relaxed mb-5">
              AI-powered social media management for Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, color: "#E4405F" },
                { Icon: Facebook, color: "#1877F2" },
                { Icon: Linkedin, color: "#0A66C2" },
              ].map(({ Icon, color }) => (
                <a
                  key={color}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.15)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.15)] transition-colors"
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Login"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-[#64748b] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <a
              href="mailto:oemad442@gmail.com"
              className="text-sm text-[#64748b] hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              oemad442@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
