import Navbar from '@/components/Navbar';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jamie Voynow",
  description: "Central hub for Jamie Voynow's work",
  icons: {
    icon: '/headshot.jpeg',
    apple: '/headshot.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <footer className="border-t border-gray-800">
          <div className="px-6 py-12 md:px-24 max-w-5xl mx-auto">
            <div className="flex gap-6 mb-6">
              <a href="https://twitter.com/yourusername" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white">GitHub</a>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Jamie Voynow
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
