import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  title: "SocialFlow - Social Media Management Platform",
  description: "AI-powered social media management for Instagram, Facebook, and LinkedIn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <div className="gradient-bg" />
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
