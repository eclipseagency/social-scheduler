import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  Calendar,
  Users,
  Clock,
  Image,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Send,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Organize multiple clients with dedicated profiles, brand settings, and connected social accounts in one place.",
  },
  {
    icon: Sparkles,
    title: "AI Captions",
    description:
      "Generate unique, engaging captions powered by AI that match each client's brand tone and platform requirements.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Set different posting times for each platform. Schedule Instagram at 9am and LinkedIn at 2pm for the same post.",
  },
  {
    icon: Send,
    title: "Multi-Platform Posting",
    description:
      "Publish to Instagram, Facebook, and LinkedIn simultaneously or at platform-specific optimal times.",
  },
  {
    icon: Clock,
    title: "Content Calendar",
    description:
      "Visual calendar view to plan, organize, and track all scheduled content across clients and platforms.",
  },
  {
    icon: Image,
    title: "Media Library",
    description:
      "Upload and organize images and videos. Attach media to posts and manage assets for each client.",
  },
  {
    icon: BarChart3,
    title: "Status Tracking",
    description:
      "Track post status in real-time: Draft, Scheduled, Posted, or Failed. Never miss a failed post again.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add Your Clients",
    description: "Create client profiles with brand tone, industry, and connect their social media accounts.",
  },
  {
    number: "02",
    title: "Create Content",
    description: "Upload media, write captions or use AI to generate them, and select target platforms.",
  },
  {
    number: "03",
    title: "Schedule & Publish",
    description: "Set platform-specific times and let the system auto-publish at the perfect moment.",
  },
];

const platforms = [
  { name: "Instagram", Icon: Instagram, color: "#E4405F", users: "2B+ users" },
  { name: "Facebook", Icon: Facebook, color: "#1877F2", users: "3B+ users" },
  { name: "LinkedIn", Icon: Linkedin, color: "#0A66C2", users: "900M+ users" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-[128px] opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EC4899] rounded-full blur-[128px] opacity-15" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
              <span className="text-sm text-[#A1A1AA]">AI-Powered Social Media Management</span>
            </div>

            {/* Heading */}
            <h1 className="heading-xl mb-6">
              <span className="text-white">Manage Social Media</span>
              <br />
              <span className="text-gradient">With Intelligence</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule posts, generate AI captions, and manage multiple clients across Instagram,
              Facebook, and LinkedIn from one powerful dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="/login" className="btn-primary text-base px-8 py-4">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#features" className="btn-secondary text-base px-8 py-4">
                See Features
              </Link>
            </div>

            {/* Platform Icons */}
            <div className="flex items-center justify-center gap-4">
              {platforms.map(({ Icon, color, name }) => (
                <div
                  key={name}
                  className="platform-icon hover:scale-110"
                  title={name}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-lg text-[#A1A1AA]">
              Powerful features designed for agencies and social media managers handling multiple clients.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="relative z-10">
                  <div className="icon-container">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-[15px] text-[#A1A1AA] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-[#A1A1AA]">
              Get started in minutes with our simple three-step workflow.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-30" />
                  )}

                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] shadow-lg shadow-purple-500/30">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[15px] text-[#A1A1AA] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Content */}
                <div>
                  <h2 className="heading-md mb-4">
                    Publish to <span className="text-gradient">Every Platform</span>
                  </h2>
                  <p className="text-[15px] text-[#A1A1AA] leading-relaxed mb-6">
                    Connect your clients&apos; social accounts and publish content with platform-specific
                    optimizations. Set different times, captions, and hashtags for each platform.
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Platform-specific posting times",
                      "Optimized captions per network",
                      "Automatic hashtag suggestions",
                      "Real-time publish status tracking",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[15px] text-[#A1A1AA]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Platform Cards */}
                <div className="space-y-4">
                  {platforms.map(({ name, Icon, color, users }) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(139,92,246,0.3)] transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{name}</h4>
                        <p className="text-sm text-[#71717A]">{users}</p>
                      </div>
                      <Zap className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-card p-10 md:p-14 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8B5CF6] rounded-full blur-[120px] opacity-20" />
              </div>

              <div className="relative">
                <h2 className="heading-md mb-4">
                  Ready to <span className="text-gradient">Transform</span> Your Workflow?
                </h2>
                <p className="text-lg text-[#A1A1AA] mb-8 max-w-xl mx-auto">
                  Join thousands of agencies and social media managers who save hours every week with SocialFlow.
                </p>
                <Link href="/login" className="btn-primary text-base px-8 py-4">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
