"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "same" | "add" | "remove";
  content: string;
  lineNum: number;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const result: DiffLine[] = [];

  // Simple LCS-based diff
  const m = oldLines.length;
  const n = newLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m, j = n;
  const temp: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      temp.unshift({ type: "same", content: oldLines[i - 1], lineNum: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.unshift({ type: "add", content: newLines[j - 1], lineNum: j });
      j--;
    } else {
      temp.unshift({ type: "remove", content: oldLines[i - 1], lineNum: i });
      i--;
    }
  }

  return temp;
}

export default function DiffPage() {
  const [oldText, setOldText] = useState("Hello World\nThis is the original text.\nIt has three lines.");
  const [newText, setNewText] = useState("Hello World\nThis is the modified text.\nIt has three lines.\nAnd a new line.");

  const diff = useMemo(() => computeDiff(oldText, newText), [oldText, newText]);

  const stats = useMemo(() => {
    const adds = diff.filter(d => d.type === "add").length;
    const removes = diff.filter(d => d.type === "remove").length;
    return { adds, removes };
  }, [diff]);

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Diff Checker</h1>
        <p className="text-neutral-400 font-light">Compare two texts side by side.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Input Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Original</div>
            <textarea
              value={oldText}
              onChange={(e) => setOldText(e.target.value)}
              className="w-full h-48 bg-black border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-200 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          <div>
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Modified</div>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full h-48 bg-black border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-200 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4">
          <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest">Diff</span>
          <span className="text-sm font-mono text-neutral-400">
            <span className="text-white">+{stats.adds}</span> added, <span className="text-neutral-500">-{stats.removes}</span> removed
          </span>
        </div>

        {/* Diff Output */}
        <div className="bg-black border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <tbody>
                {diff.map((line, i) => (
                  <tr key={i} className={
                    line.type === "add" ? "bg-white/5" :
                    line.type === "remove" ? "bg-neutral-800/30" : ""
                  }>
                    <td className="w-8 px-3 py-1 text-right text-neutral-600 select-none border-r border-neutral-800">
                      {line.type === "remove" ? line.lineNum : ""}
                    </td>
                    <td className="w-8 px-3 py-1 text-right text-neutral-600 select-none border-r border-neutral-800">
                      {line.type === "add" ? line.lineNum : ""}
                    </td>
                    <td className="w-6 px-2 py-1 text-center select-none">
                      {line.type === "add" && <span className="text-white">+</span>}
                      {line.type === "remove" && <span className="text-neutral-500">-</span>}
                    </td>
                    <td className="px-4 py-1 whitespace-pre-wrap">
                      <span className={
                        line.type === "add" ? "text-white" :
                        line.type === "remove" ? "text-neutral-500 line-through" :
                        "text-neutral-400"
                      }>
                        {line.content}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
