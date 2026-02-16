"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function LabPage() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const fetchDemo = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setData(`Response at ${new Date().toLocaleTimeString()}`);
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-night-800 dark:text-night-100 mb-4">
          Lab
        </h1>
        <p className="text-night-600 dark:text-night-400 mb-12">
          Experimental space for testing APIs, components, and ideas.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader>
              <h3 className="text-lg font-semibold text-night-800 dark:text-night-100">
                State Management
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-night-600 dark:text-night-400 mb-4">
                Test React state hooks and updates.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="secondary" onClick={() => setCounter(c => c - 1)}>
                  -
                </Button>
                <span className="text-2xl font-mono w-12 text-center">{counter}</span>
                <Button variant="secondary" onClick={() => setCounter(c => c + 1)}>
                  +
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <h3 className="text-lg font-semibold text-night-800 dark:text-night-100">
                API Simulation
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-night-600 dark:text-night-400 mb-4">
                Simulate async data fetching.
              </p>
              <Button variant="primary" onClick={fetchDemo} disabled={loading}>
                {loading ? "Loading..." : "Fetch Data"}
              </Button>
              {data && (
                <p className="mt-4 text-sm text-sky-600 dark:text-sky-400 font-mono">
                  {data}
                </p>
              )}
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <h3 className="text-lg font-semibold text-night-800 dark:text-night-100">
                Theme Preview
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-night-600 dark:text-night-400 mb-4">
                Current theme-aware components.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <h3 className="text-lg font-semibold text-night-800 dark:text-night-100">
                Responsive Test
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-night-600 dark:text-night-400 mb-4">
                Breakpoint indicators:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded">
                  xs: 0px
                </span>
                <span className="px-2 py-1 bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 rounded">
                  sm: 640px
                </span>
                <span className="px-2 py-1 bg-sky-300 dark:bg-sky-700 text-sky-700 dark:text-sky-300 rounded">
                  md: 768px
                </span>
                <span className="px-2 py-1 bg-sky-400 dark:bg-sky-600 text-white rounded">
                  lg: 1024px
                </span>
                <span className="px-2 py-1 bg-sky-500 text-white rounded">
                  xl: 1280px
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
