"use client";

import { useState, useMemo } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\n+/).filter(p => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const items = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "No Spaces", value: stats.charsNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading", value: `${stats.readingTime} min` },
    { label: "Speaking", value: `${stats.speakingTime} min` },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Word Counter</h1>
        <p className="text-neutral-400 font-light">Paste or type text to get instant stats.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {items.map((item) => (
            <div key={item.label} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-mono text-white mb-1">{item.value}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-[400px] bg-black border border-neutral-800 rounded-xl p-5 font-mono text-sm text-neutral-200 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-neutral-600"
        />
      </div>
    </div>
  );
}
