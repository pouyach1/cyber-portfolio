import { useMemo, useState } from "react";
import { Copy, Check, Search } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { snippets } from "../../data/snippets";

export default function SnippetVault() {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const visibleSnippets = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return snippets;
    return snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.lang.toLowerCase().includes(q) ||
        s.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search]);

  async function handleCopy(snippet) {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopiedId(snippet.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <GlassPanel glow="cyan" className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
          Code Snippet Vault
        </h3>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets..."
            aria-label="Search snippets"
            className="w-48 rounded-full border border-slate-700 bg-void/60 py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {visibleSnippets.map((snippet) => (
          <div key={snippet.id} className="rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
              <div>
                <p className="text-sm font-semibold text-white">{snippet.title}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded bg-purple-neon/10 px-2 py-0.5 font-mono text-[10px] text-purple-neon">
                    {snippet.lang}
                  </span>
                  {snippet.tags.map((tag) => (
                    <span key={tag} className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleCopy(snippet)}
                aria-label="Copy snippet"
                className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:border-cyan-neon hover:text-cyan-neon"
              >
                {copiedId === snippet.id ? <Check size={14} className="text-emerald-neon" /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs text-emerald-neon">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
        {visibleSnippets.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500">No snippets match your search.</p>
        )}
      </div>
    </GlassPanel>
  );
}
