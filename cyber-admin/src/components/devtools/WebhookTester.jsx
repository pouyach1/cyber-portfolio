import { useState } from "react";
import { Send, Zap } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import NeonButton from "../ui/NeonButton";

const METHODS = ["POST", "GET", "PUT"];

export default function WebhookTester() {
  const [url, setUrl] = useState("https://api.yourbot.dev/webhook/telegram");
  const [method, setMethod] = useState("POST");
  const [payload, setPayload] = useState('{\n  "update_id": 88410001,\n  "message": { "text": "/start" }\n}');
  const [result, setResult] = useState(null);
  const [sending, setSending] = useState(false);

  function simulateRequest(e) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    const latency = Math.round(60 + Math.random() * 200);
    setTimeout(() => {
      const ok = Math.random() > 0.15;
      setResult({
        ok,
        status: ok ? 200 : 502,
        latency,
        body: ok ? '{ "ok": true }' : '{ "ok": false, "error": "upstream timeout" }',
      });
      setSending(false);
    }, latency);
  }

  return (
    <GlassPanel glow="purple" className="p-5">
      <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-white">
        <Zap size={15} className="text-purple-neon" /> Webhook Tester
      </h3>

      <form onSubmit={simulateRequest} className="space-y-3">
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-lg border border-slate-700 bg-void/60 px-2 py-2 text-xs text-white focus:border-purple-neon focus:outline-none"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-void/60 px-3 py-2 font-mono text-xs text-white focus:border-purple-neon focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-slate-700 bg-void/60 p-3 font-mono text-xs text-emerald-neon focus:border-purple-neon focus:outline-none"
        />

        <NeonButton type="submit" variant="purple" icon={Send} disabled={sending}>
          {sending ? "Pinging..." : "Send Test Ping"}
        </NeonButton>
      </form>

      {result && (
        <div
          className={`mt-4 rounded-xl border p-3 font-mono text-xs ${
            result.ok ? "border-emerald-neon/30 text-emerald-neon" : "border-magenta-neon/30 text-magenta-neon"
          }`}
        >
          <p>
            Status: {result.status} · Latency: {result.latency}ms
          </p>
          <p className="mt-1 text-slate-400">{result.body}</p>
        </div>
      )}
    </GlassPanel>
  );
}
