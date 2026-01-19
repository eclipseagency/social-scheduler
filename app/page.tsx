import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  Calendar,
  Users,
  BarChart3,
  ArrowRight,
  Check,
  Clock,
  Palette,
  TrendingUp,
} from "lucide-react";
import ClientLogoCard from "./components/ClientLogoCard";
import ContactSection from "./components/ContactSection";

const clients = [
  { name: "Acme Corp", description: "Tech startup" },
  { name: "Bloom Studio", description: "Design agency" },
  { name: "Velocity Fitness", description: "Fitness brand" },
  { name: "Green Earth", description: "Eco products" },
  { name: "Nova Digital", description: "Marketing agency" },
  { name: "Urban Eats", description: "Restaurant chain" },
];

const features = [
  { icon: Users, title: "Client Management", desc: "Manage multiple clients with dedicated dashboards and branding." },
  { icon: Sparkles, title: "AI Captions", desc: "Generate unique captions with Claude AI that match your brand." },
  { icon: Calendar, title: "Smart Scheduling", desc: "Schedule posts and auto-publish at optimal times." },
  { icon: BarChart3, title: "Multi-Platform", desc: "Publish to Instagram, Facebook, and LinkedIn easily." },
  { icon: Clock, title: "Content Calendar", desc: "Visual calendar to plan your content strategy." },
  { icon: Palette, title: "Media Library", desc: "Organize design assets for each client." },
  { icon: TrendingUp, title: "Analytics", desc: "Track performance and optimize your strategy." },
];

const steps = [
  { num: "1", title: "Add Clients", desc: "Create profiles and connect social accounts." },
  { num: "2", title: "Create Posts", desc: "Upload designs and generate AI captions." },
  { num: "3", title: "Auto-Publish", desc: "Schedule and let the system handle the rest." },
];

const benefits = [
  { title: "Save Hours Weekly", desc: "Automate tasks and focus on content." },
  { title: "Never Miss a Post", desc: "Auto-publish even when you're away." },
  { title: "Unique AI Captions", desc: "Fresh captions based on your design." },
  { title: "Client Dashboards", desc: "Private dashboards for each client." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-8">
        <div className="container text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] rounded-full px-5 py-2.5 mb-8">
            <Sparkles className="w-4 h-4 text-[#EC4899]" />
            <span className="text-sm text-[#94a3b8]">AI-Powered Social Media Management</span>
          </div>

          <h1 className="text-[36px] md:text-[56px] font-bold leading-[1.15] mb-6 max-w-3xl mx-auto">
            <span className="text-white">Manage Your Social Media</span>{" "}
            <span className="text-gradient">With Intelligence</span>
          </h1>

          <p className="text-base md:text-lg text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Streamline content calendars, automate scheduling, and generate AI captions for Instagram, Facebook, and LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login" className="btn-primary">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#contact" className="btn-secondary">
              Book a Demo
            </Link>
          </div>

          <div className="flex justify-center gap-5">
            {[
              { Icon: Instagram, color: "#E4405F" },
              { Icon: Facebook, color: "#1877F2" },
              { Icon: Linkedin, color: "#0A66C2" },
            ].map(({ Icon, color }) => (
              <div
                key={color}
                className="w-14 h-14 rounded-xl bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center hover:bg-[rgba(139,92,246,0.15)] transition-colors"
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-3">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-sm md:text-base text-[#94a3b8] max-w-lg mx-auto">
              Powerful features to manage multiple clients effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="card p-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {features.slice(4).map((f, i) => (
              <div key={i} className="card p-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-3">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-sm md:text-base text-[#94a3b8]">
              Get started in minutes with our simple workflow
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#94a3b8]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section" id="clients">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-3">
              Your <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-sm md:text-base text-[#94a3b8] max-w-lg mx-auto">
              Each client gets their own profile with logo and content calendar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((c) => (
              <ClientLogoCard key={c.name} name={c.name} description={c.description} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/login" className="btn-primary">
              Add Your First Client <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container max-w-5xl">
          <div className="card p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-6">
                  Why Choose <span className="text-gradient">SocialFlow</span>?
                </h2>
                <div className="space-y-4">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-white">{b.title}</h4>
                        <p className="text-sm text-[#94a3b8]">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5 animate-pulse-glow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]" />
                  <div>
                    <div className="h-3 w-20 bg-[rgba(139,92,246,0.2)] rounded mb-1.5" />
                    <div className="h-2.5 w-14 bg-[rgba(139,92,246,0.15)] rounded" />
                  </div>
                </div>
                <div className="h-32 bg-[rgba(139,92,246,0.05)] border border-[rgba(139,92,246,0.15)] rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Palette className="w-10 h-10 text-[#8B5CF6] opacity-30 mx-auto mb-1" />
                    <span className="text-xs text-[#64748b]">Design Preview</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* CTA */}
      <section className="section">
        <div className="container max-w-2xl text-center">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            Ready to <span className="text-gradient">Transform</span> Your Social Media?
          </h2>
          <p className="text-sm md:text-base text-[#94a3b8] mb-6">
            Join today and manage your clients with the power of AI.
          </p>
          <Link href="/login" className="btn-primary">
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
