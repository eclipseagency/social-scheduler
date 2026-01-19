import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-card border-t border-[rgba(139,92,246,0.2)] rounded-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">SocialFlow</span>
            </Link>
            <p className="text-[#94a3b8] text-sm max-w-md">
              Streamline your social media management with AI-powered captions and
              effortless scheduling across Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#94a3b8] hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#94a3b8] hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#94a3b8] hover:text-white text-sm transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <a
              href="mailto:oemad442@gmail.com"
              className="text-[#94a3b8] hover:text-white text-sm transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              oemad442@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(139,92,246,0.2)] mt-8 pt-8 text-center">
          <p className="text-[#94a3b8] text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#EC4899]" /> by SocialFlow
            Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
