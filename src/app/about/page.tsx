import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="font-semibold text-lg">Social Scheduler</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Social Scheduler</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Social Scheduler is a powerful tool designed to help you manage your social media
              presence efficiently. Whether you&apos;re a content creator, marketer, or business owner,
              our platform makes it easy to plan, schedule, and publish content across multiple platforms.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We believe that managing social media shouldn&apos;t be a time-consuming task.
              Our mission is to provide tools that automate the repetitive aspects of social
              media management, so you can focus on creating great content.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Schedule posts across multiple platforms</li>
              <li>Visual content calendar for easy planning</li>
              <li>Analytics and performance tracking</li>
              <li>Team collaboration tools</li>
              <li>Content library for media assets</li>
              <li>AI-powered content suggestions</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Supported Platforms</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Social Scheduler integrates with major social media platforms including Twitter/X,
              Facebook, Instagram, LinkedIn, and more. Connect your accounts and manage everything
              from a single dashboard.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Social Scheduler. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
