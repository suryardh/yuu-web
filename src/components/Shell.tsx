"use client";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-[5rem] flex-1">{children}</main>
      <Footer />
    </>
  );
}
