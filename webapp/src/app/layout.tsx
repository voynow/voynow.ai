import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans-src", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono-src", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Jamie Voynow",
  description: "CTO at Kling Capital. Building an AI-native hedge fund in New York.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
