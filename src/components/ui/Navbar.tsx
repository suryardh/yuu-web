"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Lab", href: "/lab" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent ${
        scrolled ? "bg-[#060913]/60 backdrop-blur-xl border-sky-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-light italic text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          Yuuishikii
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-light tracking-wide transition-all relative group ${
                  isActive ? "text-sky-200" : "text-night-400 hover:text-sky-100"
                }`}
              >
                {link.name}
                {/* Glowing Underline Indicator */}
                <span 
                  className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-all duration-300 ease-in-out ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`} 
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button - Minimal */}
        <div className="md:hidden flex items-center text-night-200">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
