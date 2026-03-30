"use client";

import { usePathname } from "next/navigation";

interface Building {
  height: number;
  width: number;
  windows: { on: boolean; color: string }[];
}

export function CityBackground() {
  const pathname = usePathname();

  // Deterministic pseudo-random generator so server and client match exactly (Fixes Hydration & CLS)
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const colors = [
    "bg-amber-300 shadow-[0_0_6px_#fbbf24]", // Classic Yellow
    "bg-sky-400 shadow-[0_0_6px_#38bdf8]",   // Neon Blue
    "bg-fuchsia-500 shadow-[0_0_6px_#d946ef]",// Cyber Pink
    "bg-emerald-400 shadow-[0_0_6px_#34d399]",// Matrix Green
  ];

  // Derive a seed based on pathname length so different pages might have slightly different skies, 
  // but remain deterministic on reload.
  const pageSeed = pathname ? pathname.length : 1;

  const buildings: Building[] = Array.from({ length: 45 }, (_, i) => {
    const seed = i * 10 + pageSeed;
    const height = Math.floor(pseudoRandom(seed) * 250 + 60);
    const windowCount = Math.floor(height / 15);
    const windows = [];
    
    const colorIndex = pseudoRandom(seed + 1) > 0.8 ? Math.floor(pseudoRandom(seed + 2) * colors.length) : 0;
    const buildingColorTheme = colors[colorIndex];

    for (let j = 0; j < windowCount; j++) {
      windows.push({
        on: pseudoRandom(seed + j + 3) > 0.4,
        color: buildingColorTheme,
      });
    }
    return {
      height,
      width: Math.floor(pseudoRandom(seed + windowCount) * 45 + 25),
      windows,
    };
  });

  const bgBuildings: Building[] = Array.from({ length: 25 }, (_, i) => ({
    height: Math.floor(pseudoRandom(i * 5 + pageSeed + 100) * 400 + 150),
    width: Math.floor(pseudoRandom(i * 5 + pageSeed + 101) * 80 + 40),
    windows: [],
  }));

  const stars = Array.from({ length: 150 }, (_, i) => ({
    x: Number((pseudoRandom(i * 3 + pageSeed + 200) * 100).toFixed(2)),
    y: Number((pseudoRandom(i * 3 + pageSeed + 201) * 70).toFixed(2)), // Keep stars mostly in upper 70%
    s: Number((pseudoRandom(i * 3 + pageSeed + 202) * 2 + 1).toFixed(2)), // Size
    d: Number((pseudoRandom(i * 3 + pageSeed + 203) * 5 + 2).toFixed(2)), // Animation duration
    opacity: Number((pseudoRandom(i * 3 + pageSeed + 204) * 0.5 + 0.2).toFixed(2)), // Base opacity
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#060913] to-[#04060c]" />

      {/* Floating Stars Layer */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
              opacity: star.opacity,
              animationDuration: `${star.d}s`,
            }}
          />
        ))}
      </div>

      {/* Cyberpunk Glow Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-end opacity-90">
        {/* Background Silhouettes Layer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center w-full h-[50vh] min-h-[400px] opacity-40 z-0">
          {bgBuildings.map((b, i) => (
            <div
              key={`bg-${i}`}
              className="relative mx-px rounded-t-sm bg-[#010204]"
              style={{
                height: `${b.height}px`,
                width: `${b.width}px`,
              }}
            />
          ))}
        </div>

        {/* Foreground City Layer */}
        <div className="flex items-end justify-center w-full h-[40vh] min-h-[300px] z-10">
          {buildings.map((b, i) => (
            <div
              key={i}
              className="relative mx-px rounded-t-sm bg-[#0a0f1d] border-t border-l border-r border-[#1e293b]/50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]"
              style={{
                height: `${b.height}px`,
                width: `${b.width}px`,
              }}
            >
              <div className="absolute inset-1 flex flex-col justify-around">
                {b.windows.map((w, wi) => (
                  <div key={wi} className="flex justify-around">
                    {Array.from({ length: Math.floor(b.width / 10) }).map((_, wj) => {
                      const isOn = w.on && pseudoRandom(i * 1000 + wi * 100 + wj + pageSeed + 300) > 0.2;
                      return (
                        <span
                          key={wj}
                          className={`w-1.5 h-2 rounded-[1px] transition-all duration-1000 ease-in-out ${
                            isOn ? w.color : "bg-[#02040a]"
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pixel Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none select-none" />
    </div>
  );
}
