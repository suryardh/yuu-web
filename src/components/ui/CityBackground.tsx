"use client";

import { usePathname } from "next/navigation";

interface Building {
  height: number;
  width: number;
  windows: { on: boolean }[];
}

export function CityBackground() {
  const pathname = usePathname();

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const pageSeed = pathname ? pathname.length : 1;

  const buildings: Building[] = Array.from({ length: 45 }, (_, i) => {
    const seed = i * 10 + pageSeed;
    const height = Math.floor(pseudoRandom(seed) * 250 + 60);
    const windowCount = Math.floor(height / 15);
    const windows = [];

    for (let j = 0; j < windowCount; j++) {
      windows.push({
        on: pseudoRandom(seed + j + 3) > 0.4,
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

  const stars = Array.from({ length: 100 }, (_, i) => ({
    x: Number((pseudoRandom(i * 3 + pageSeed + 200) * 100).toFixed(2)),
    y: Number((pseudoRandom(i * 3 + pageSeed + 201) * 70).toFixed(2)),
    s: Number((pseudoRandom(i * 3 + pageSeed + 202) * 2 + 1).toFixed(2)),
    d: Number((pseudoRandom(i * 3 + pageSeed + 203) * 5 + 2).toFixed(2)),
    opacity: Number((pseudoRandom(i * 3 + pageSeed + 204) * 0.3 + 0.1).toFixed(2)),
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-end opacity-90">
        {/* Background Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center w-full h-[50vh] min-h-[400px] opacity-30 z-0">
          {bgBuildings.map((b, i) => (
            <div
              key={`bg-${i}`}
              className="relative mx-px rounded-t-sm bg-neutral-950"
              style={{ height: `${b.height}px`, width: `${b.width}px` }}
            />
          ))}
        </div>

        {/* Foreground City */}
        <div className="flex items-end justify-center w-full h-[40vh] min-h-[300px] z-10">
          {buildings.map((b, i) => (
            <div
              key={i}
              className="relative mx-px rounded-t-sm bg-neutral-900 border-t border-l border-r border-neutral-700/50"
              style={{ height: `${b.height}px`, width: `${b.width}px` }}
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
                            isOn ? "bg-neutral-300" : "bg-black"
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

      {/* Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none select-none" />
    </div>
  );
}
