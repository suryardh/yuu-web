import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-night-800 dark:text-night-100 mb-8">
          About
        </h1>
        <Card variant="glass" className="mb-8">
          <CardContent>
            <p className="text-lg text-night-600 dark:text-night-300 leading-relaxed">
              Welcome to Yuuishikii website — a creative space where design
              meets functionality. We specialize in crafting minimalist,
              atmospheric digital experiences that leave a lasting impression.
            </p>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="default">
            <CardContent>
              <h3 className="text-xl font-semibold text-night-800 dark:text-night-100 mb-3">
                Our Vision
              </h3>
              <p className="text-night-600 dark:text-night-400">
                To create digital experiences that feel like breathing —
                natural, effortless, and beautiful.
              </p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent>
              <h3 className="text-xl font-semibold text-night-800 dark:text-night-100 mb-3">
                Our Approach
              </h3>
              <p className="text-night-600 dark:text-night-400">
                Minimalist design with maximum impact. Every pixel serves a
                purpose.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
