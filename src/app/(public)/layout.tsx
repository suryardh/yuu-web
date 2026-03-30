"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/shared/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      <main className="flex-1 w-full flex flex-col items-center">{children}</main>
      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
