"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeProvider";

interface Building {
  height: number;
  width: number;
  windows: number[];
}

export default function HomePage() {
  const { theme } = useTheme();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newBuildings: Building[] = Array.from({ length: 30 }, () => {
      const height = Math.floor(Math.random() * 180 + 80);
      const windowCount = Math.floor(height / 20);
      const windows: number[] = [];
      for (let i = 0; i < windowCount; i++) {
        windows.push(Math.random() > 0.35 ? 1 : 0);
      }
      return {
        height,
        width: Math.floor(Math.random() * 40 + 32),
        windows,
      };
    });
    setBuildings(newBuildings);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          isDark 
            ? "bg-gradient-to-b from-night-900 via-night-950 to-night-900" 
            : "bg-gradient-to-b from-sky-100 via-sky-50 to-white"
        }`}
      />

      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out">
        <div 
          className={`absolute top-20 right-20 w-32 h-32 bg-sky-200/50 rounded-full blur-3xl transition-opacity duration-1000 ease-in-out ${
            isDark ? "opacity-0" : "opacity-100"
          }`} 
        />
        <div 
          className={`absolute top-40 left-10 w-48 h-48 bg-sky-100/40 rounded-full blur-3xl transition-opacity duration-1000 ease-in-out ${
            isDark ? "opacity-0" : "opacity-100"
          }`} 
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 flex items-end">
          <div className="flex items-end justify-center w-full h-80">
            {mounted && buildings.map((b, i) => (
              <div
                key={i}
                className={`relative mx-px rounded-t-sm transition-all duration-700 ease-in-out ${
                  isDark 
                    ? "bg-night-800/95" 
                    : "bg-night-500/80"
                }`}
                style={{ 
                  height: `${b.height}px`, 
                  width: `${b.width}px`,
                }}
              >
                <div className="absolute inset-1 flex flex-col justify-around">
                  {b.windows.map((w, wi) => (
                    <div key={wi} className="flex justify-around">
                      {Array.from({ length: Math.floor(b.width / 9) }).map((_, wj) => (
                        <span
                          key={wj}
                          className={`w-1.5 h-2 rounded-sm transition-all duration-700 ease-in-out ${
                            isDark 
                                ? (w && Math.random() > 0.2 ? "bg-amber-300 shadow-[0_0_4px_#fbbf24]" : "bg-night-900/50")
                                : (w ? "bg-white/60" : "bg-night-600/30")
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-700 ease-in-out">
        <h1 className={`text-5xl md:text-7xl font-light mb-6 tracking-tight transition-all duration-700 ease-in-out ${
          isDark ? "text-night-100" : "text-night-800"
        }`}>
          Yuuishikii
        </h1>
        <p className={`text-lg md:text-xl mb-8 font-light transition-all duration-700 ease-in-out delay-100 ${
          isDark ? "text-night-300" : "text-night-600"
        }`}>
          Crafting digital experiences with precision and passion
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-in-out delay-200 ${
          isDark ? "opacity-100" : "opacity-100"
        }`}>
          <Button variant="primary" size="lg">
            View Portfolio
          </Button>
          <Button variant="secondary" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
