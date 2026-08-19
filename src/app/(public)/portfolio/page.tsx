import { Card, CardContent } from "@/components/ui/Card";

const projects = [
  {
    title: "Veil-Core-Project",
    description: "AI companion built in Python. Explores natural language interactions and intelligent automation — a playground for conversational AI experiments.",
    link: "https://github.com/suryardh/Veil-Core-Project",
    language: "Python",
  },
  {
    title: "WA-Bot",
    description: "WhatsApp automation bot for utility tasks and communication workflows. Built with Node.js and designed for extensibility.",
    link: "https://github.com/suryardh/WA-Bot",
    language: "JavaScript",
  },
  {
    title: "RPGM-Translator",
    description: "Python tool for translating RPG Maker games. Parses game files, extracts text, and streamlines localization for modding enthusiasts.",
    link: "https://github.com/suryardh/RPGM-Translator",
    language: "Python",
  },
  {
    title: "RPGM-TLapk",
    description: "Android companion app for the RPGM-Translator workflow. Built with Flutter/Dart for on-the-go translation work.",
    link: "https://github.com/suryardh/RPGM-TLapk",
    language: "Dart",
  },
  {
    title: "yuu-web",
    description: "This website. Next.js 15 with a monochrome theme, static export to Cloudflare Pages. The Lab section holds client-side tools I built for fun.",
    link: "https://github.com/suryardh/yuu-web",
    language: "TypeScript",
  },
];

export default function PortfolioPage() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
          Portfolio
        </h1>
        <p className="text-lg text-neutral-400 mb-12 font-light">
          Projects I&apos;ve built — from AI experiments to automation tools.
        </p>

        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card variant="glass" className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl hover:border-neutral-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-neutral-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm font-light">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-500" />
                      <span className="text-xs font-mono text-neutral-500">{project.language}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
