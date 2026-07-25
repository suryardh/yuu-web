"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useEffect, useRef, useState } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ponytail: IntersectionObserver — native API, zero deps. Upgrade ke framer-motion kalau butuh orchestrated page transitions nanti.

const featuredProjects = [
  {
    title: "Veil-Core-Project",
    description: "An AI Companion Project, exploring natural language interactions and intelligent automation.",
    link: "https://github.com/suryardh/Veil-Core-Project",
    language: "Python",
  },
  {
    title: "RPGM-Translator",
    description: "A specialized tool for translating RPG Maker games, simplifying localization efforts for enthusiasts.",
    link: "https://github.com/suryardh/RPGM-Translator",
    language: "Python",
  },
  {
    title: "WA-Bot",
    description: "A robust WhatsApp bot designed for automation and utility tasks, enhancing communication workflows.",
    link: "https://github.com/suryardh/WA-Bot",
    language: "JavaScript",
  },
];

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-start pt-16">
      {/* Hero Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-[5rem] pb-24">
        <h1 className="text-6xl md:text-8xl font-light italic mb-6 tracking-normal text-transparent bg-clip-text bg-gradient-to-br from-white via-sky-100 to-sky-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
          Yuuishikii
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light text-sky-100 tracking-wide opacity-90 drop-shadow-md">
          Crafting digital experiences with precision and passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/portfolio">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg tracking-wide border border-sky-400/50 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_35px_rgba(14,165,233,0.6)] rounded-xl transition-all">
              View Portfolio
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg tracking-wide bg-[#0d1326] backdrop-blur-md border border-violet-400/30 hover:bg-violet-400/30 hover:border-violet-400 text-violet-400 shadow-[0_0_15px_rgba(196,113,237,0.1)] rounded-xl transition-all">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Projects Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
            Featured Projects
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <FadeIn key={index} delay={index * 100}>
              <Card variant="glass" className="border border-sky-900/30 bg-[#0d1326]/50 backdrop-blur-xl text-left hover:border-sky-500/50 transition-colors">
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-sky-200 mb-2 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-night-400 text-sm font-light mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-xs text-night-500">
                      <span className="w-2 h-2 rounded-full bg-violet-400 mr-2" />
                      {project.language}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
