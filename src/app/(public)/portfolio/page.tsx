import { Card, CardContent } from "@/components/ui/Card";

const projects = [
  {
    title: "Project One",
    description: "A minimal portfolio website with atmospheric design",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Project Two",
    description: "E-commerce platform with clean UI/UX",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Project Three",
    description: "Dashboard application for data visualization",
    tags: ["TypeScript", "D3.js", "AWS"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-night-800 dark:text-night-100 mb-12">
          Portfolio
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} variant="elevated" className="group cursor-pointer">
              <CardContent>
                <div className="h-40 bg-night-100 dark:bg-night-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-night-400 dark:text-night-500">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-night-800 dark:text-night-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-night-600 dark:text-night-400 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-night-100 dark:bg-night-700 text-night-600 dark:text-night-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
