"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/lab", label: "Lab" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-night-900/70 border border-white/20 dark:border-night-700/50 px-4 sm:px-6 py-2">
          <Link
            href="/"
            className="text-lg sm:text-xl font-semibold text-night-800 dark:text-night-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Yuuishikii
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-night-600 dark:text-night-300 hover:text-sky-600 dark:hover:text-sky-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden p-2 rounded-lg hover:bg-night-100 dark:hover:bg-night-800 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5 text-night-700 dark:text-night-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden mt-2 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-night-900/70 border border-white/20 dark:border-night-700/50 px-4 py-3">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-night-800"
                      : "text-night-600 dark:text-night-300 hover:bg-night-100 dark:hover:bg-night-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
