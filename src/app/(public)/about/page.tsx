import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="relative z-10 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
          About
        </h1>
        <Card variant="glass" className="mb-8 border border-sky-900/40 bg-[#0d1326]/60 backdrop-blur-2xl shadow-xl">
          <CardContent className="p-8">
            <p className="text-lg text-night-200 leading-relaxed mb-6 font-light">
              We are a digital artisan specializing in building high-performance, atmospheric web experiences. Our passion lies at the intersection of minimalist design, robust engineering, and a deep appreciation for the cyberpunk aesthetic.
            </p>
            <p className="text-lg text-night-300 leading-relaxed font-light">
              This space, Yuuishikii, serves as a canvas for experimentation and a showcase of what's possible when technology and creativity converge. From deterministic server-side rendering to meticulously optimized Core Web Vitals, every detail is crafted with precision.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card variant="glass" className="border border-sky-900/30 bg-[#0d1326]/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-sky-100 mb-3 tracking-wide">
                Our Vision
              </h3>
              <p className="text-night-300 mb-4 font-light text-sm md:text-base leading-relaxed">
                To craft digital interfaces that feel like a natural extension of thought — intuitive, immersive, and aesthetically resonant.
              </p>
            </CardContent>
          </Card>
          <Card variant="glass" className="border border-sky-900/30 bg-[#0d1326]/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-sky-100 mb-3 tracking-wide">
                Our Approach
              </h3>
              <p className="text-night-300 mb-4 font-light text-sm md:text-base leading-relaxed">
                Minimalism with maximum impact. Every line of code and every pixel serves a purpose, contributing to a cohesive and memorable experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
