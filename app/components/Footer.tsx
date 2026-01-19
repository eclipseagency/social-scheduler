import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[rgba(15,10,26,0.8)] border-t border-[rgba(139,92,246,0.15)] mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold text-gradient">SocialFlow</span>
            </Link>
            <p className="text-xs text-[#64748b] max-w-xs leading-relaxed mb-4">
              AI-powered social media management for Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, color: "#E4405F" },
                { Icon: Facebook, color: "#1877F2" },
                { Icon: Linkedin, color: "#0A66C2" },
              ].map(({ Icon, color }) => (
                <a
                  key={color}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.15)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.15)] transition-colors"
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Login"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-xs text-[#64748b] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Contact</h3>
            <a
              href="mailto:oemad442@gmail.com"
              className="text-xs text-[#64748b] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              oemad442@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-[rgba(139,92,246,0.15)] mt-8 pt-6 text-center">
          <p className="text-xs text-[#64748b] flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#EC4899]" /> by SocialFlow &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
