import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
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
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg tracking-wide bg-[#0a0f1d]/80 backdrop-blur-md border border-fuchsia-500/30 hover:bg-fuchsia-900/30 hover:border-fuchsia-400 text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,0.1)] rounded-xl transition-all">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
