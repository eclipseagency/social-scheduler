import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export const metadata: Metadata = {
  title: "SocialFlow - Social Media Management Platform",
  description:
    "Streamline your social media management with AI-powered captions and effortless scheduling across Instagram, Facebook, and LinkedIn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <div className="gradient-bg" />
          <Navbar />
          <main className="flex-1 pt-14 sm:pt-16">{children}</main>
          <Footer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
