import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CityBackground } from "@/components/ui/CityBackground";
import { Navbar } from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuuishikii | Digital Experiences",
  description: "Crafting digital experiences with precision and passion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#02040a] text-night-200`}>
        <ThemeProvider>
          <Navbar />
          <CityBackground />
          {/* Subtle Sci-Fi HUD Decorative Overlays */}
          <div className="fixed inset-4 pointer-events-none z-0 border border-sky-900/10 rounded-3xl" />
          <div className="fixed top-8 left-8 w-8 h-8 pointer-events-none z-0 border-t-2 border-l-2 border-sky-500/20" />
          <div className="fixed top-8 right-8 w-8 h-8 pointer-events-none z-0 border-t-2 border-r-2 border-sky-500/20" />
          <div className="fixed bottom-8 left-8 w-8 h-8 pointer-events-none z-0 border-b-2 border-l-2 border-sky-500/20" />
          <div className="fixed bottom-8 right-8 w-8 h-8 pointer-events-none z-0 border-b-2 border-r-2 border-sky-500/20" />
          
          <div className="relative z-10 pt-[5rem]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
