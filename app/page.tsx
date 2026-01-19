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
  CheckCircle,
  Clock,
  Palette,
  TrendingUp,
} from "lucide-react";
import ClientLogoCard from "./components/ClientLogoCard";
import ContactSection from "./components/ContactSection";

// Placeholder clients for demonstration
const placeholderClients = [
  { name: "Acme Corp", description: "Tech startup specializing in AI solutions" },
  { name: "Bloom Studio", description: "Creative design agency" },
  { name: "Velocity Fitness", description: "Premium fitness brand" },
  { name: "Green Earth Co", description: "Sustainable products company" },
  { name: "Nova Digital", description: "Digital marketing agency" },
  { name: "Urban Eats", description: "Restaurant chain" },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#8B5CF6] opacity-20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#EC4899] opacity-15 rounded-full blur-[150px]" />

        <div className="w-full max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.3)] rounded-full px-5 py-2.5 mb-8">
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
              <span className="text-sm text-[#e2e8f0]">
                AI-Powered Social Media Management
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Manage Your Social Media</span>
              <br />
              <span className="text-gradient">With Intelligence</span>
            </h1>

            <p className="text-lg md:text-xl text-[#94a3b8] max-w-3xl mx-auto mb-12 leading-relaxed">
              Streamline your clients&apos; content calendars, automate posting schedules,
              and generate AI-powered captions for Instagram, Facebook, and LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/login"
                className="btn-gradient inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="btn-outline inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl"
              >
                Book a Demo
              </Link>
            </div>

            {/* Platform Icons */}
            <div className="flex justify-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:scale-110 hover:bg-[rgba(139,92,246,0.2)] transition-all duration-300">
                <Instagram className="w-8 h-8 text-[#E4405F]" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:scale-110 hover:bg-[rgba(139,92,246,0.2)] transition-all duration-300">
                <Facebook className="w-8 h-8 text-[#1877F2]" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] flex items-center justify-center hover:scale-110 hover:bg-[rgba(139,92,246,0.2)] transition-all duration-300">
                <Linkedin className="w-8 h-8 text-[#0A66C2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Powerful features designed to help you manage multiple clients and
              their social media presence effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Client Management", desc: "Easily manage multiple clients with their own dashboards, logos, and social media accounts." },
              { icon: Sparkles, title: "AI Captions", desc: "Generate unique, engaging captions with Claude AI that never repeat and match your client's brand." },
              { icon: Calendar, title: "Smart Scheduling", desc: "Schedule posts in advance and let the system automatically publish them at the perfect time." },
              { icon: BarChart3, title: "Multi-Platform", desc: "Publish to Instagram, Facebook, and LinkedIn from a single dashboard with ease." },
            ].map((feature, i) => (
              <div key={i} className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-2xl p-6 hover:bg-[rgba(139,92,246,0.12)] hover:border-[rgba(236,72,153,0.4)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: Clock, title: "Content Calendar", desc: "Visual calendar view to plan and organize your clients' content strategy for weeks ahead." },
              { icon: Palette, title: "Media Library", desc: "Upload and organize design images for each client, ready to use in your scheduled posts." },
              { icon: TrendingUp, title: "Performance Insights", desc: "Track post performance and get insights to optimize your content strategy." },
            ].map((feature, i) => (
              <div key={i} className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-2xl p-6 hover:bg-[rgba(139,92,246,0.12)] hover:border-[rgba(236,72,153,0.4)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-[#94a3b8]">
              Get started in minutes with our simple workflow
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-1 bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                { num: "1", title: "Add Your Clients", desc: "Create client profiles with their logos and connect their social media accounts." },
                { num: "2", title: "Create & Schedule Posts", desc: "Upload designs, generate AI captions, and schedule posts for the optimal times." },
                { num: "3", title: "Auto-Publish", desc: "Relax while the system automatically publishes your content across all platforms." },
              ].map((step, i) => (
                <div key={i} className="text-center relative z-10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg shadow-[rgba(139,92,246,0.4)]">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[#94a3b8] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Your <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Each client gets their own profile with logo, social accounts, and
              content calendar. Upload logos for easy recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderClients.map((client) => (
              <ClientLogoCard
                key={client.name}
                name={client.name}
                description={client.description}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/login"
              className="btn-gradient inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl"
            >
              Add Your First Client
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Why Choose <span className="text-gradient">SocialFlow</span>?
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Save Hours Every Week", desc: "Automate repetitive tasks and focus on creating great content." },
                    { title: "Never Miss a Post", desc: "Scheduled posts are published automatically, even when you're away." },
                    { title: "Unique AI Captions", desc: "AI generates fresh, unique captions based on your design and client history." },
                    { title: "Client Dashboards", desc: "Each client gets their own private dashboard to view their content." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
                        <p className="text-[#94a3b8]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] rounded-2xl p-8 animate-pulse-glow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />
                    <div>
                      <div className="h-4 w-28 bg-[rgba(139,92,246,0.3)] rounded mb-2" />
                      <div className="h-3 w-20 bg-[rgba(139,92,246,0.2)] rounded" />
                    </div>
                  </div>
                  <div className="h-48 bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-xl mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-[#8B5CF6] opacity-40 mx-auto mb-3" />
                      <p className="text-[#94a3b8]">Design Preview</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Instagram className="w-6 h-6 text-[#E4405F]" />
                    <Facebook className="w-6 h-6 text-[#1877F2]" />
                    <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-gradient">Transform</span> Your
            Social Media Management?
          </h2>
          <p className="text-lg text-[#94a3b8] mb-10 max-w-2xl mx-auto">
            Join today and start managing your clients&apos; social media
            presence with the power of AI.
          </p>
          <Link
            href="/login"
            className="btn-gradient inline-flex items-center gap-2 text-lg px-10 py-5 rounded-xl"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
