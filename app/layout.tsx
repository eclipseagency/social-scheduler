import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SocialFlow - AI-Powered Social Media Management",
  description:
    "Schedule posts, generate AI captions, and manage multiple clients across Instagram, Facebook, and LinkedIn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <div className="gradient-bg" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
