"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function LabPage() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [method, setMethod] = useState("GET");
  const [activeTab, setActiveTab] = useState("body");
  const [bodyContent, setBodyContent] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
  
  const [response, setResponse] = useState<any>(null);
  const [meta, setMeta] = useState<{status: number; statusText: string; time: number; size: number} | null>(null);
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
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      if (["POST", "PUT", "PATCH"].includes(method)) {
        options.body = bodyContent;
      }
      
      const res = await fetch(url, options);
      const time = Date.now() - start;
      
      let data;
      let size = 0;
      
      const text = await res.text();
      size = new Blob([text]).size;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text; // Just fallback to raw string
      }
      
      setResponse(data);
      setMeta({
        status: res.status,
        statusText: res.statusText,
        time,
        size
      });
      
    } catch (err: any) {
      setError(err.message || "Network error. This might be due to CORS restrictions on the target API.");
      setMeta({ status: 0, statusText: "Error", time: Date.now() - start, size: 0 });
    } finally {
      setLoading(false);
    }
  };

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-night-800 dark:text-night-100 mb-4">
          API Playground
        </h1>
        <p className="text-night-600 dark:text-night-400">
          A lightweight environment to test and debug REST APIs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Request Builder */}
        <div className="space-y-6">
          <Card variant="glass" className="overflow-visible">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select 
                  className="bg-night-100 dark:bg-night-800 border border-night-200 dark:border-night-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer text-night-800 dark:text-night-100"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {methods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/v1/users"
                    className="w-full bg-night-100 dark:bg-night-800 border border-night-200 dark:border-night-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-night-800 dark:text-night-100"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={loading}
                  className="py-3 px-8 font-semibold min-w-[120px] transition-all bg-sky-600 hover:bg-sky-500 text-white border-0 shadow-lg shadow-sky-500/20"
                >
                  {loading ? (
                     <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Sending...
                     </span>
                  ) : "Send"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-0 overflow-hidden rounded-xl">
              <div className="flex border-b border-night-200 dark:border-night-800/50 bg-night-50/50 dark:bg-night-900/30">
                <button 
                  onClick={() => setActiveTab("params")}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'params' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 bg-white/50 dark:bg-night-800/50' : 'text-night-500 hover:text-night-700 dark:text-night-400 dark:hover:text-night-200'}`}
                >
                  Params
                </button>
                <button 
                  onClick={() => setActiveTab("headers")}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'headers' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 bg-white/50 dark:bg-night-800/50' : 'text-night-500 hover:text-night-700 dark:text-night-400 dark:hover:text-night-200'}`}
                >
                  Headers
                </button>
                <button 
                  onClick={() => setActiveTab("body")}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'body' ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 bg-white/50 dark:bg-night-800/50' : 'text-night-500 hover:text-night-700 dark:text-night-400 dark:hover:text-night-200'}`}
                >
                  Body
                </button>
              </div>
              
              <div className="p-4 bg-night-50/30 dark:bg-night-900/10 min-h-[300px]">
                {activeTab === "params" && (
                  <div className="flex items-center justify-center h-full text-sm text-night-400 italic">
                    Query parameters builder coming soon
                  </div>
                )}
                {activeTab === "headers" && (
                  <div className="space-y-3 font-mono text-sm">
                    <div className="grid grid-cols-[1fr_2fr] gap-2">
                       <input disabled value="Content-Type" className="bg-transparent border border-night-200 dark:border-night-800 rounded px-3 py-2 text-night-500" />
                       <input disabled value="application/json" className="bg-transparent border border-night-200 dark:border-night-800 rounded px-3 py-2 text-night-500" />
                    </div>
                    <div className="text-xs text-night-500 mt-4">Custom headers currently unsupported in this demo.</div>
                  </div>
                )}
                {activeTab === "body" && (
                  <div className="h-full flex flex-col">
                    <div className="mb-2 flex justify-between items-center text-xs">
                       <span className="bg-night-200 dark:bg-night-800 text-night-600 dark:text-night-300 px-2 py-1 rounded">JSON</span>
                       {["GET", "DELETE"].includes(method) && <span className="text-amber-500">Body not widely supported for {method}</span>}
                    </div>
                    <textarea 
                      value={bodyContent}
                      onChange={(e) => setBodyContent(e.target.value)}
                      className="w-full flex-1 bg-white/50 dark:bg-night-950/50 border border-night-200 dark:border-night-800 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 resize-y min-h-[250px] shadow-inner"
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Response Viewer */}
        <div className="flex flex-col h-full space-y-4">
          {meta ? (
             <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-night-50/80 dark:bg-night-900/40 border border-night-200 dark:border-night-800/50 shadow-sm backdrop-blur-md">
                <div className="flex flex-col">
                   <span className="text-xs text-night-500 font-semibold uppercase tracking-wider">Status</span>
                   <span className={`text-lg font-mono font-bold flex items-center gap-2 ${meta.status >= 200 && meta.status < 300 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                      {meta.status === 0 ? "ERR" : meta.status} 
                      <span className="text-sm font-normal">{meta.statusText}</span>
                   </span>
                </div>
                <div className="w-px h-8 bg-night-200 dark:bg-night-800 mx-1"></div>
                <div className="flex flex-col">
                   <span className="text-xs text-night-500 font-semibold uppercase tracking-wider">Time</span>
                   <span className="text-lg font-mono text-night-700 dark:text-night-200">{meta.time} <span className="text-sm">ms</span></span>
                </div>
                <div className="w-px h-8 bg-night-200 dark:bg-night-800 mx-1"></div>
                <div className="flex flex-col">
                   <span className="text-xs text-night-500 font-semibold uppercase tracking-wider">Size</span>
                   <span className="text-lg font-mono text-night-700 dark:text-night-200">
                     {meta.size > 1024 ? (meta.size / 1024).toFixed(2) + ' KB' : meta.size + ' B'}
                   </span>
                </div>
             </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-night-50/80 dark:bg-night-900/40 border border-night-200 dark:border-night-800/50 opacity-50">
                <span className="text-night-500 dark:text-night-400 italic">No request sent yet</span>
            </div>
          )}

          <Card variant="glass" className="flex-1 overflow-hidden flex flex-col">
             <div className="bg-night-100 dark:bg-night-900 border-b border-night-200 dark:border-night-800 px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-night-700 dark:text-night-300">Response Data</span>
             </div>
             <CardContent className="p-0 flex-1 relative bg-[#FAFAFA] dark:bg-[#0D0D0D]">
                {loading && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                     <div className="flex flex-col items-center gap-3">
                        <svg className="animate-spin h-8 w-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm text-night-600 dark:text-night-300 font-medium animate-pulse">Waiting for response...</span>
                     </div>
                  </div>
                )}
                <div className="h-full overflow-auto p-4 custom-scrollbar">
                   {error ? (
                     <div className="text-red-500 font-mono text-sm max-w-prose whitespace-pre-wrap">
                        {error}
                     </div>
                   ) : response ? (
                     <pre className="font-mono text-xs md:text-sm text-night-800 dark:text-sky-100">
                        {typeof response === 'object' ? JSON.stringify(response, null, 2) : response}
                     </pre>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-night-400 opacity-50 space-y-4">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <p>Hit send to fetch data</p>
                     </div>
                   )}
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
