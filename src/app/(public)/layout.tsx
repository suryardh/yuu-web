"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useTheme } from "@/components/ThemeProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        isDark 
          ? "bg-night-900" 
          : "bg-sky-50"
      }`}
    >
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
