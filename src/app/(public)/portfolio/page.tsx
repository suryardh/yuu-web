import { Card, CardContent } from "@/components/ui/Card";

export default function PortfolioPage() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
          Portfolio
        </h1>
        <Card variant="glass" className="inline-block bg-[#060913]/60 backdrop-blur-xl border-sky-900/40">
          <CardContent className="px-12 py-8">
            <h2 className="text-2xl font-medium text-sky-400 mb-4 animate-pulse">
              Coming Soon
            </h2>
            <p className="text-night-300 max-w-md mx-auto">
              We are currently curating our best work. Please check back later to see our latest projects and case studies.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
