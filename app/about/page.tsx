import {
  Target,
  Heart,
  Zap,
  Shield,
  Mail,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-gradient">SocialFlow</span>
          </h1>
          <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
            We&apos;re on a mission to simplify social media management for
            agencies and freelancers who manage multiple clients. Our
            AI-powered platform helps you create, schedule, and publish
            content across all major platforms effortlessly.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="glass-card p-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-[#94a3b8]">
              To empower social media managers and agencies with intelligent
              tools that save time, boost creativity, and deliver exceptional
              results for their clients. We believe in making professional
              social media management accessible to everyone.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-[#94a3b8]">
              A world where managing social media for multiple clients is
              seamless, creative, and powered by AI. We envision a future
              where you can focus on strategy and creativity while our
              platform handles the repetitive tasks.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our <span className="text-gradient">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Innovation
              </h3>
              <p className="text-[#94a3b8] text-sm">
                We constantly push the boundaries of what&apos;s possible with
                AI and automation to bring you cutting-edge features.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trust</h3>
              <p className="text-[#94a3b8] text-sm">
                Your data security and privacy are our top priorities. We
                build trust through transparency and reliability.
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Customer First
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Every feature we build starts with your needs. We listen,
                learn, and create solutions that truly help.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="glass-card p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                For Agencies
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Manage unlimited clients from a single dashboard
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Give clients their own branded dashboards
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    AI-powered caption generation for each client
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Bulk scheduling and auto-publishing
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                For Freelancers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Professional tools at an affordable price
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Easy client onboarding and management
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Save time with AI-generated captions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EC4899] mt-2 flex-shrink-0" />
                  <span className="text-[#94a3b8]">
                    Multi-platform support for all major networks
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href="mailto:oemad442@gmail.com"
              className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-[#94a3b8]">Email Us</p>
                <p className="text-white font-semibold">oemad442@gmail.com</p>
              </div>
            </a>
            <div className="glass-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-[#94a3b8]">Location</p>
                <p className="text-white font-semibold">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
