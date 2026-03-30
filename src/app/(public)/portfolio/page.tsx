import { Card, CardContent } from "@/components/ui/Card";

export default function PortfolioPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-light text-night-800 dark:text-night-100 mb-6">
          Portfolio
        </h1>
        <Card variant="glass" className="inline-block">
          <CardContent className="px-12 py-8">
            <h2 className="text-2xl font-medium text-sky-600 dark:text-sky-400 mb-4 animate-pulse">
              Coming Soon
            </h2>
            <p className="text-night-600 dark:text-night-400 max-w-md mx-auto">
              We are currently curating our best work. Please check back later to see our latest projects and case studies.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
