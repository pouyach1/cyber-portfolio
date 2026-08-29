import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import AvatarOrb from "./AvatarOrb";
import ChatMessage from "./ChatMessage";
import { generateChatReply } from "./aiEngine";

const WELCOME_TURN = {
  role: "assistant",
  text: "سلام رفیق 👋 من دستیار هوشمندتم. می‌تونم برات بریفینگ صبح رو خلاصه کنم، پیشنهاد قیمت بنویسم، یا فقط بشنوم اگه روز سختی داشتی. چیکار می‌تونم برات بکنم؟",
  timestamp: new Date().toISOString(),
};

export default function ChatWidget({ context, conversationLogs, onAppendTurn, externalReply }) {
  const [messages, setMessages] = useState(
    conversationLogs.length ? conversationLogs : [WELCOME_TURN]
  );
  const [draft, setDraft] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Scenario buttons push replies in from the parent page.
  useEffect(() => {
    if (!externalReply) return;
    pushTurn({ role: "assistant", text: externalReply.text, timestamp: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalReply]);

  function pushTurn(turn) {
    setMessages((prev) => [...prev, turn]);
    onAppendTurn(turn);
  }

  function handleSend(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    pushTurn({ role: "user", text, timestamp: new Date().toISOString() });
    setDraft("");
    setSpeaking(true);

    setTimeout(() => {
      const reply = generateChatReply(text, context);
      pushTurn({ role: "assistant", text: reply, timestamp: new Date().toISOString() });
      setSpeaking(false);
    }, 500);
  }

  return (
    <GlassPanel glow="cyan" className="flex h-[520px] flex-col p-5">
      <div className="mb-3 flex items-center gap-3">
        <AvatarOrb speaking={speaking} />
        <div>
          <p className="font-bold text-white">دستیار هوشمند</p>
          <p className="text-xs text-slate-500">رفیق و همکار هوشمند — همیشه در دسترس</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pl-1">
        {messages.map((turn, i) => (
          <ChatMessage key={i} turn={turn} />
        ))}
        {speaking && (
          <div className="flex justify-end">
            <div className="rounded-2xl bg-cyan-neon/10 px-4 py-2 text-xs text-cyan-300">در حال نوشتن…</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-3 flex items-center gap-2 border-t border-slate-800 pt-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="پیامت رو بنویس..."
          className="flex-1 rounded-full border border-slate-700 bg-void/60 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
        />
        <button
          type="submit"
          aria-label="ارسال"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-neon/50 text-cyan-neon hover:bg-cyan-neon/10"
        >
          <Send size={16} />
        </button>
      </form>
    </GlassPanel>
  );
}
