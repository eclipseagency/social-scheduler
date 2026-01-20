import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Platforms", href: "#platforms" },
  ],
  company: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sign In", href: "/login" },
  ],
};

const socialLinks = [
  { Icon: Instagram, href: "#", color: "#E4405F" },
  { Icon: Facebook, href: "#", color: "#1877F2" },
  { Icon: Linkedin, href: "#", color: "#0A66C2" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.08)]">
      {/* Gradient Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">
                Social<span className="text-gradient">Flow</span>
              </span>
            </Link>
            <p className="text-[15px] text-[#71717A] max-w-sm leading-relaxed mb-6">
              AI-powered social media management platform. Schedule posts, generate captions,
              and manage multiple clients across Instagram, Facebook, and LinkedIn.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, color }) => (
                <a
                  key={color}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-200"
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Product
                </h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[#71717A] hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Account
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[#71717A] hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#71717A]">
              &copy; {new Date().getFullYear()} SocialFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-[#71717A] hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-[#71717A] hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
