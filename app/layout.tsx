import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PosterGen",
  description: "Offline PWA for Sales Posters",
  manifest: "/manifest.json",
};

// SOLUTION: Prevent whole page zoom and handle virtual keyboard layout shifts
export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // This tells modern mobile browsers to overlay the keyboard rather than squishing the 100dvh layout
  interactiveWidget: "overlays-content", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
