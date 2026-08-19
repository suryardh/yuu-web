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

const featuredProjects = [
  {
    title: "Veil-Core-Project",
    description: "AI companion built in Python, exploring natural language interactions and intelligent automation.",
    link: "https://github.com/suryardh/Veil-Core-Project",
    language: "Python",
  },
  {
    title: "WA-Bot",
    description: "WhatsApp automation bot designed for utility tasks and communication workflows.",
    link: "https://github.com/suryardh/WA-Bot",
    language: "JavaScript",
  },
  {
    title: "RPGM-Translator",
    description: "Tool for translating RPG Maker games, simplifying localization for modding enthusiasts.",
    link: "https://github.com/suryardh/RPGM-Translator",
    language: "Python",
  },
];

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-start pt-16">
      {/* Hero */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-[5rem] pb-24">
        <h1 className="text-6xl md:text-8xl font-light italic mb-6 tracking-normal text-white">
          Yuuishikii
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light text-neutral-400 tracking-wide">
          Digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/portfolio">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg tracking-wide rounded-xl">
              View Portfolio
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg tracking-wide rounded-xl">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
            Featured Projects
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <FadeIn key={index} delay={index * 100}>
              <Card variant="glass" className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl text-left hover:border-neutral-600 transition-colors">
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm font-light mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-xs text-neutral-500">
                      <span className="w-2 h-2 rounded-full bg-neutral-400 mr-2" />
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
