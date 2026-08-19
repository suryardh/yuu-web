"use client";

import { useState, useMemo } from "react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Contact us at hello@example.com or support@test.org for help.");
  const [replaceStr, setReplaceStr] = useState("[EMAIL]");
  const [showReplace, setShowReplace] = useState(false);

  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = regex.exec(testString)) !== null) {
          matches.push({ match: m[0], index: m.index });
          if (m[0].length === 0) regex.lastIndex++;
        }
      } else {
        m = regex.exec(testString);
        if (m) matches.push({ match: m[0], index: m.index });
      }
      const replaced = showReplace ? testString.replace(regex, replaceStr) : null;
      return { matches, replaced, error: null };
    } catch (e: any) {
      return { matches: [], replaced: null, error: e.message };
    }
  }, [pattern, flags, testString, replaceStr, showReplace]);

  const highlightMatches = () => {
    if (result.matches.length === 0) return testString;
    const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
    return testString.replace(regex, (m) => `<mark class="bg-white text-black px-0.5 rounded">${m}</mark>`);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Regex Tester</h1>
        <p className="text-neutral-400 font-light">Test regular expressions with live matching.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Pattern Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-black border border-neutral-800 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-white/20">
            <span className="px-4 text-neutral-500 font-mono text-lg">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 bg-transparent py-4 pr-2 font-mono text-sm text-white outline-none"
              placeholder="regex pattern"
            />
            <span className="px-4 text-neutral-500 font-mono text-lg">/</span>
          </div>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-20 bg-black border border-neutral-800 rounded-xl px-4 py-4 font-mono text-sm text-white outline-none text-center focus:ring-1 focus:ring-white/20"
            placeholder="flags"
          />
        </div>

        {/* Test String */}
        <div>
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Test String</div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full h-32 bg-black border border-neutral-800 rounded-xl p-5 font-mono text-sm text-neutral-200 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </div>

        {/* Highlighted */}
        <div>
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Highlighted</div>
          <div
            className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 font-mono text-sm text-neutral-300 leading-relaxed min-h-[80px] whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightMatches() }}
          />
        </div>

        {/* Error */}
        {result.error && (
          <div className="bg-neutral-800/20 border border-neutral-700 rounded-xl p-4 text-neutral-300 font-mono text-sm">
            {result.error}
          </div>
        )}

        {/* Matches */}
        <div>
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">
            Matches ({result.matches.length})
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 max-h-48 overflow-auto">
            {result.matches.length === 0 ? (
              <p className="text-neutral-500 text-sm font-mono">No matches</p>
            ) : (
              <div className="space-y-1">
                {result.matches.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 font-mono text-sm">
                    <span className="text-neutral-600 w-12 text-right">#{i + 1}</span>
                    <span className="text-white bg-neutral-800 px-2 py-0.5 rounded">{m.match}</span>
                    <span className="text-neutral-500">index {m.index}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Replace */}
        <div>
          <button
            onClick={() => setShowReplace(!showReplace)}
            className="text-sm text-neutral-400 hover:text-white transition-colors font-mono"
          >
            {showReplace ? "− Hide" : "+ Show"} Replace
          </button>
          {showReplace && (
            <div className="mt-3 space-y-3">
              <input
                type="text"
                value={replaceStr}
                onChange={(e) => setReplaceStr(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl px-5 py-4 font-mono text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                placeholder="replacement string"
              />
              <div>
                <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Result</div>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 font-mono text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {result.replaced}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
