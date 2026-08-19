import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";

const tools = [
  {
    title: "Markdown Editor",
    description: "Write markdown with live preview.",
    href: "/lab/markdown-editor",
    icon: "M",
  },
  {
    title: "Regex Tester",
    description: "Test and debug regular expressions.",
    href: "/lab/regex-tester",
    icon: ".*",
  },
  {
    title: "Chess",
    description: "Play chess against Stockfish AI.",
    href: "/lab/chess",
    icon: "♟",
  },
  {
    title: "Pomodoro",
    description: "Focus timer with work/break cycles.",
    href: "/lab/pomodoro",
    icon: "25",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, and reading time.",
    href: "/lab/word-counter",
    icon: "W",
  },
  {
    title: "Diff Checker",
    description: "Compare two texts side by side.",
    href: "/lab/diff",
    icon: "±",
  },
];

export default function LabPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight text-center">
          Lab
        </h1>
        <p className="text-neutral-400 font-light text-xl text-center mb-16">
          Developer tools, client-side.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card variant="glass" className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl hover:border-neutral-600 transition-colors h-full cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl font-mono text-white mb-4 w-12 h-12 flex items-center justify-center bg-neutral-800 rounded-lg">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
