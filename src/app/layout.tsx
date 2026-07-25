import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CityBackground } from "@/components/ui/CityBackground";
import { Progress } from "@/components/ui/Progress"; // Import Progress
import { Shell } from "@/components/Shell"; // Import Shell

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#02040a] text-night-200 flex flex-col`}>
        <Progress />
        <CityBackground />
        {/* Fluid Digital HUD Overlays */}
        <div className="fixed inset-4 pointer-events-none z-0 border border-sky-900/10 rounded-3xl animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="fixed top-8 left-8 w-8 h-8 pointer-events-none z-0 border-t-2 border-l-2 border-sky-500/30 rounded-tl-lg animate-[fade_8s_ease-in-out_infinite_alternate]" />
        <div className="fixed top-8 right-8 w-8 h-8 pointer-events-none z-0 border-t-2 border-r-2 border-sky-500/30 rounded-tr-lg animate-[fade_8s_ease-in-out_infinite_alternate]" />
        <div className="fixed bottom-8 left-8 w-8 h-8 pointer-events-none z-0 border-b-2 border-l-2 border-sky-500/30 rounded-bl-lg animate-[fade_8s_ease-in-out_infinite_alternate]" />
        <div className="fixed bottom-8 right-8 w-8 h-8 pointer-events-none z-0 border-b-2 border-r-2 border-sky-500/30 rounded-br-lg animate-[fade_8s_ease-in-out_infinite_alternate]" />

        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
