"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

// A simple regex-based JSON syntax highlighter for premium feel
const SyntaxHighlighter = ({ code }: { code: string }) => {
  if (typeof code !== "string") {
    code = JSON.stringify(code, null, 2);
  }
  const highlight = (jsonStr: string) => {
    return jsonStr.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-sky-400"; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-night-200 font-medium"; // key
          } else {
            cls = "text-emerald-400"; // string
          }
        } else if (/true|false/.test(match)) {
          cls = "text-amber-400"; // boolean
        } else if (/null/.test(match)) {
          cls = "text-rose-400"; // null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  return (
    <pre
      className="font-mono text-xs md:text-sm leading-relaxed break-words whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: highlight(code) }}
    />
  );
};

export default function LabPage() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [method, setMethod] = useState("GET");
  const [activeTab, setActiveTab] = useState("body");
  const [bodyContent, setBodyContent] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');

  const [response, setResponse] = useState<any>(null);
  const [meta, setMeta] = useState<{ status: number; statusText: string; time: number; size: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    setMeta(null);

    const start = Date.now();
    try {
      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        options.body = bodyContent;
      }

      const res = await fetch(url, options);
      const time = Date.now() - start;

      const text = await res.text();
      const size = new Blob([text]).size;

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text;
      }

      setResponse(data);
      setMeta({ status: res.status, statusText: res.statusText, time, size });
    } catch (err: any) {
      setError(err.message || "Network error. This might be due to CORS restrictions.");
      setMeta({ status: 0, statusText: "Error", time: Date.now() - start, size: 0 });
    } finally {
      setLoading(false);
    }
  };

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.1)]";
    if (status >= 300 && status < 400) return "bg-sky-500/20 text-sky-400 border-sky-500/30 shadow-[0_0_10px_rgba(56,189,248,0.1)]";
    if (status >= 400 && status < 500) return "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(251,191,36,0.1)]";
    if (status >= 500 || status === 0) return "bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.1)]";
    return "bg-night-800 text-night-400 border-night-700";
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl mb-12 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight drop-shadow-md">
          API Workspace
        </h1>
        <p className="text-sky-100/90 font-light text-xl tracking-wide">
          A premium, high-performance environment to test and debug REST APIs.
        </p>
      </div>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-6xl bg-[#060913]/40 backdrop-blur-[24px] border border-sky-900/40 rounded-3xl shadow-[0_8px_32px_rgba(0,10,30,0.6)] flex flex-col overflow-hidden relative z-10 ring-1 ring-white/5">
        
        {/* URL Bar Area */}
        <div className="p-4 md:p-6 border-b border-night-800 bg-[#060913]/50">
          <div className="flex flex-col sm:flex-row shadow-inner rounded-xl overflow-hidden border border-night-700/80 focus-within:ring-2 focus-within:ring-sky-500/50 transition-all bg-[#0d1326]">
            <select
              className="px-6 py-4 font-mono text-sm bg-transparent border-0 border-r border-night-800 focus:ring-0 cursor-pointer text-sky-400 font-semibold outline-none transition-colors hover:bg-night-800/50"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              {methods.map((m) => (
                <option key={m} value={m} className="bg-night-900 text-night-200">
                  {m}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/v1/users"
              className="flex-1 px-6 py-4 font-mono text-sm bg-transparent border-0 focus:ring-0 text-night-100 outline-none placeholder:text-night-600"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-8 py-4 font-semibold text-white bg-sky-600/90 hover:bg-sky-500 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[150px] border-l border-sky-400/20"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending
                </span>
              ) : (
                "Send Request"
              )}
            </button>
          </div>
        </div>

        {/* Split Panels */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-[550px]">
          
          {/* Configuration Panel (Left) */}
          <div className="lg:w-[35%] flex flex-col border-b lg:border-b-0 lg:border-r border-sky-900/40 bg-[#02040a]/30">
            <div className="flex px-3 pt-3 border-b border-sky-900/40 gap-2">
              {["Params", "Headers", "Body"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-5 py-3 text-sm font-medium rounded-t-xl transition-all relative ${
                    activeTab === tab.toLowerCase()
                      ? "text-sky-400 bg-night-900/50"
                      : "text-night-500 hover:text-night-300 hover:bg-night-800/30"
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              {activeTab === "params" && (
                <div className="flex items-center justify-center flex-1 text-sm text-night-600 font-mono italic">
                  // Query mapping coming soon
                </div>
              )}
              {activeTab === "headers" && (
                <div className="space-y-4 font-mono text-sm">
                  <div className="grid grid-cols-[1fr_2fr] gap-3">
                    <input disabled value="Content-Type" className="bg-[#02040a] border border-night-800 rounded-lg px-4 py-3 text-night-300 w-full" />
                    <input disabled value="application/json" className="bg-[#02040a] border border-night-800 rounded-lg px-4 py-3 text-night-300 w-full" />
                  </div>
                  <div className="text-xs text-night-600 mt-4 px-2">// Custom headers unsupported in demo mode</div>
                </div>
              )}
              {activeTab === "body" && (
                <div className="flex-1 flex flex-col">
                  <div className="mb-3 flex justify-between items-center text-xs font-mono">
                    <span className="bg-night-800 text-sky-400 border border-night-700 px-3 py-1.5 rounded-md font-medium">JSON</span>
                    {["GET", "DELETE"].includes(method) && <span className="text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/20">Body ignored for {method}</span>}
                  </div>
                  <textarea
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    className="w-full flex-1 bg-[#02040a] border border-night-800 rounded-xl p-5 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-sky-500/50 resize-none text-night-200 leading-relaxed custom-scrollbar"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Response Panel (Right) */}
          <div className="lg:w-[65%] flex flex-col relative bg-transparent">
            {/* Status Bar */}
            <div className="px-6 py-4 border-b border-sky-900/40 flex flex-wrap items-center justify-between min-h-[68px] bg-[#060913]/30">
              <div className="flex items-center gap-6">
                <span className="text-xs font-bold text-night-600 uppercase tracking-widest">Response</span>
                {meta && (
                  <>
                    <div className={`px-4 py-1.5 rounded-lg border text-sm font-mono font-bold flex items-center gap-2.5 ${getStatusColor(meta.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {meta.status === 0 ? "ERR" : meta.status} {meta.statusText}
                    </div>
                    <div className="text-sm font-mono text-night-300 flex items-center gap-2 bg-night-900/50 px-3 py-1 rounded-lg border border-night-800">
                      <span className="text-night-500 text-xs">TIME</span>
                      {meta.time}ms
                    </div>
                    <div className="text-sm font-mono text-night-300 flex items-center gap-2 bg-night-900/50 px-3 py-1 rounded-lg border border-night-800">
                      <span className="text-night-500 text-xs">SIZE</span>
                      {meta.size > 1024 ? (meta.size / 1024).toFixed(2) + " KB" : meta.size + " B"}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Editor Viewer */}
            <div className="flex-1 p-6 overflow-auto relative custom-scrollbar bg-[#02040a]/60">
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#02040a]/60 backdrop-blur-md border-t border-sky-500/20">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-night-800" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-sky-500 animate-[spin_1s_linear_infinite]" />
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                  </div>
                  <div className="text-sm font-mono text-night-400 mt-6 tracking-widest uppercase">Awaiting Response...</div>
                </div>
              )}

              <div className="h-full">
                {error ? (
                  <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <div className="text-rose-400 font-mono text-sm max-w-prose whitespace-pre-wrap leading-relaxed">{error}</div>
                  </div>
                ) : response ? (
                  <div className="min-h-full">
                    <SyntaxHighlighter code={response} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-night-600">
                    <svg className="w-20 h-20 mb-6 opacity-40 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <p className="font-mono text-night-500 text-sm tracking-widest uppercase">Idle • Ready for Request</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
