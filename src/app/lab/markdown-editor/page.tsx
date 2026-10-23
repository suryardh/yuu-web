"use client";

import { useState } from "react";

export default function MarkdownEditorPage() {
  const [md, setMd] = useState(`# Hello World\n\nThis is a **markdown** editor with _live preview_.\n\n- Item 1\n- Item 2\n- Item 3\n\n\`\`\`js\nconst x = 42;\n\`\`\`\n\n> Blockquote here`);

  const escapeHtml = (s: string): string =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const sanitizeUrl = (url: string): string => {
    const u = url.trim();
    if (/^(https?:|mailto:)/i.test(u) || u.startsWith("/") || u.startsWith("#")) return u;
    return "#";
  };

  const renderMarkdown = (text: string): string => {
    let html = escapeHtml(text)
      // code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-neutral-900 border border-neutral-800 rounded-lg p-4 my-3 overflow-x-auto"><code class="text-sm font-mono text-neutral-300">$2</code></pre>')
      // inline code
      .replace(/`([^`]+)`/g, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-300">$1</code>')
      // headings
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-white mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-medium text-white mt-8 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-medium text-white mt-8 mb-4">$1</h1>')
      // bold & italic
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
      .replace(/\_(.+?)\_/g, '<em>$1</em>')
      // blockquote
      .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-2 border-neutral-600 pl-4 my-3 text-neutral-400 italic">$1</blockquote>')
      // unordered list
      .replace(/^- (.+)$/gm, '<li class="ml-4 text-neutral-300 list-disc">$1</li>')
      // ordered list
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-neutral-300 list-decimal">$1</li>')
      // horizontal rule
      .replace(/^---$/gm, '<hr class="border-neutral-800 my-6" />')
      // links
      .replace(/\[(.+?)\]\((.+?)\)/g, (_m, label: string, url: string) => `<a href="${sanitizeUrl(url)}" class="text-white underline underline-offset-2 hover:text-neutral-300">${label}</a>`)
      // paragraphs (lines not already wrapped)
      .replace(/^(?!<[hbluaiop]|<li|<hr|<pre|<code)(.+)$/gm, '<p class="text-neutral-300 leading-relaxed my-2">$1</p>');

    // wrap adjacent li's in ul
    html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="my-3 space-y-1">$1</ul>');

    return html;
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Markdown Editor</h1>
        <p className="text-neutral-400 font-light">Write on the left, see the result on the right.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Editor</div>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="w-full h-[600px] bg-black border border-neutral-800 rounded-xl p-5 font-mono text-sm text-neutral-200 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 flex flex-col">
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-2">Preview</div>
          <div
            className="h-[600px] bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 overflow-auto"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }}
          />
        </div>
      </div>
    </div>
  );
}
