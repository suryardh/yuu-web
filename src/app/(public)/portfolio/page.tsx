import { Card, CardContent } from "@/components/ui/Card";

export default function PortfolioPage() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
          Portfolio
        </h1>
        <p className="text-xl text-night-300 mb-12 font-light">
          A curated selection of our recent projects and case studies.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="glass" className="border border-sky-900/30 bg-[#0d1326]/50 backdrop-blur-xl text-left">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-sky-200 mb-2">Project Alpha</h3>
              <p className="text-night-400 text-sm font-light">
                A cutting-edge web application built with Next.js 15 and a custom design system, focusing on performance and atmospheric UI.
              </p>
            </CardContent>
          </Card>
          <Card variant="glass" className="border border-sky-900/30 bg-[#0d1326]/50 backdrop-blur-xl text-left">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-sky-200 mb-2">Project Beta</h3>
              <p className="text-night-400 text-sm font-light">
                An interactive data visualization dashboard, leveraging deterministic rendering and advanced animation techniques.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
