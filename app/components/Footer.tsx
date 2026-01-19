import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[rgba(15,10,26,0.8)] backdrop-blur-xl border-t border-[rgba(139,92,246,0.2)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">SocialFlow</span>
            </Link>
            <p className="text-[#94a3b8] text-sm max-w-md leading-relaxed mb-6">
              Streamline your social media management with AI-powered captions and
              effortless scheduling across Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.2)] hover:scale-110 transition-all"
              >
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.2)] hover:scale-110 transition-all"
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.2)] hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-[#94a3b8] hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#94a3b8] hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#94a3b8] hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <a
              href="mailto:oemad442@gmail.com"
              className="text-[#94a3b8] hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              oemad442@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(139,92,246,0.2)] mt-12 pt-8 text-center">
          <p className="text-[#94a3b8] text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-[#EC4899]" /> by SocialFlow
            Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
