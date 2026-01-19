import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-card border-t border-[rgba(139,92,246,0.2)] rounded-none mt-auto">
      <div className="container-main py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-xl">S</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gradient">SocialFlow</span>
            </Link>
            <p className="text-[#94a3b8] text-xs sm:text-sm max-w-md">
              Streamline your social media management with AI-powered captions and
              effortless scheduling across Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4405F]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#94a3b8] hover:text-white text-xs sm:text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#94a3b8] hover:text-white text-xs sm:text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#94a3b8] hover:text-white text-xs sm:text-sm transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Contact</h3>
            <a
              href="mailto:oemad442@gmail.com"
              className="text-[#94a3b8] hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              oemad442@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(139,92,246,0.2)] mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-[#94a3b8] text-xs sm:text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EC4899]" /> by SocialFlow
            Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
