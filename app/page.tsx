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
      <section className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-[#8B5CF6] opacity-10 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-10 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#EC4899] opacity-10 rounded-full blur-[100px] sm:blur-[120px]" />

        <div className="container-main section-padding-lg relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EC4899]" />
              <span className="text-xs sm:text-sm text-[#94a3b8]">
                AI-Powered Social Media Management
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
              <span className="text-white">Manage Your Social Media</span>
              <br />
              <span className="text-gradient">With Intelligence</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in px-4 sm:px-0">
              Streamline your clients&apos; content calendars, automate posting schedules,
              and generate AI-powered captions for Instagram, Facebook, and LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in px-4 sm:px-0">
              <Link
                href="/login"
                className="btn-gradient flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="#contact"
                className="btn-outline flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Book a Demo
              </Link>
            </div>

            {/* Platform Icons */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16 animate-fade-in">
              <div className="glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:scale-110 transition-transform">
                <Instagram className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#E4405F]" />
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:scale-110 transition-transform">
                <Facebook className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1877F2]" />
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:scale-110 transition-transform">
                <Linkedin className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#0A66C2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container-main">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Everything You Need to{" "}
              <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto px-4 sm:px-0">
              Powerful features designed to help you manage multiple clients and
              their social media presence effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {/* Feature 1 */}
            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Client Management
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Easily manage multiple clients with their own dashboards, logos,
                and social media accounts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                AI Captions
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Generate unique, engaging captions with Claude AI that never
                repeat and match your client&apos;s brand.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Smart Scheduling
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Schedule posts in advance and let the system automatically
                publish them at the perfect time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Multi-Platform
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Publish to Instagram, Facebook, and LinkedIn from a single
                dashboard with ease.
              </p>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Content Calendar
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Visual calendar view to plan and organize your clients&apos; content
                strategy for weeks ahead.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Media Library
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Upload and organize design images for each client, ready to use
                in your scheduled posts.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 group sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Performance Insights
              </h3>
              <p className="text-[#94a3b8] text-sm">
                Track post performance and get insights to optimize your
                content strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto px-4 sm:px-0">
              Get started in minutes with our simple workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Add Your Clients
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] px-4 md:px-0">
                Create client profiles with their logos and connect their social
                media accounts.
              </p>
              {/* Connector line - hidden on mobile */}
              <div className="hidden md:block absolute top-7 sm:top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent" />
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Create & Schedule Posts
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] px-4 md:px-0">
                Upload designs, generate AI captions, and schedule posts for the
                optimal times.
              </p>
              {/* Connector line */}
              <div className="hidden md:block absolute top-7 sm:top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Auto-Publish
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] px-4 md:px-0">
                Relax while the system automatically publishes your content
                across all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="section-padding">
        <div className="container-main">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Your <span className="text-gradient">Clients</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto px-4 sm:px-0">
              Each client gets their own profile with logo, social accounts, and
              content calendar. Upload logos for easy recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {placeholderClients.map((client) => (
              <ClientLogoCard
                key={client.name}
                name={client.name}
                description={client.description}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/login"
              className="btn-gradient inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Add Your First Client
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="glass-card p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Why Choose <span className="text-gradient">SocialFlow</span>?
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">
                        Save Hours Every Week
                      </h4>
                      <p className="text-[#94a3b8] text-xs sm:text-sm">
                        Automate repetitive tasks and focus on creating great
                        content.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">
                        Never Miss a Post
                      </h4>
                      <p className="text-[#94a3b8] text-xs sm:text-sm">
                        Scheduled posts are published automatically, even when
                        you&apos;re away.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">
                        Unique AI Captions
                      </h4>
                      <p className="text-[#94a3b8] text-xs sm:text-sm">
                        AI generates fresh, unique captions based on your design
                        and client history.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">
                        Client Dashboards
                      </h4>
                      <p className="text-[#94a3b8] text-xs sm:text-sm">
                        Each client gets their own private dashboard to view
                        their content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="glass-card p-4 sm:p-6 animate-pulse-glow">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />
                    <div>
                      <div className="h-3 sm:h-4 w-20 sm:w-24 bg-[rgba(139,92,246,0.3)] rounded" />
                      <div className="h-2 sm:h-3 w-14 sm:w-16 bg-[rgba(139,92,246,0.2)] rounded mt-1" />
                    </div>
                  </div>
                  <div className="h-32 sm:h-40 bg-[rgba(139,92,246,0.1)] rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-10 h-10 sm:w-12 sm:h-12 text-[#8B5CF6] opacity-50 mx-auto mb-2" />
                      <p className="text-[#94a3b8] text-xs sm:text-sm">Design Preview</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4405F]" />
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2]" />
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A66C2]" />
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
      <section className="section-padding">
        <div className="container-sm text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to <span className="text-gradient">Transform</span> Your
            Social Media Management?
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Join today and start managing your clients&apos; social media
            presence with the power of AI.
          </p>
          <Link
            href="/login"
            className="btn-gradient inline-flex items-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
