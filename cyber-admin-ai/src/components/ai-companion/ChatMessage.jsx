export default function ChatMessage({ turn }) {
  const isUser = turn.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        dir="auto"
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser ? "bg-slate-800 text-slate-100" : "bg-cyan-neon/10 text-cyan-100"
        }`}
      >
        {turn.text}
      </div>
    </div>
  );
}
