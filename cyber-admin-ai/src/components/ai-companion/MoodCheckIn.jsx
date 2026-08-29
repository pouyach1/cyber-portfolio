import { useState } from "react";
import GlassPanel from "../ui/GlassPanel";

const MOODS = [
  { emoji: "😄", label: "عالی" },
  { emoji: "🙂", label: "خوب" },
  { emoji: "😐", label: "معمولی" },
  { emoji: "😩", label: "خسته" },
  { emoji: "😣", label: "پراسترس" },
];

export default function MoodCheckIn({ onCheckIn }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(mood) {
    setSelected(mood.label);
    onCheckIn({ date: new Date().toISOString(), note: mood.label });
  }

  return (
    <GlassPanel glow="emerald" className="p-5">
      <h3 className="mb-3 text-sm font-bold text-white">امروز حالت چطوره؟</h3>
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleSelect(mood)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              selected === mood.label
                ? "border-emerald-neon bg-emerald-neon/10 text-emerald-neon"
                : "border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            <span>{mood.emoji}</span> {mood.label}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-3 text-xs text-slate-500">
          ثبت شد. اگه چیزی هست که می‌خوای درباره‌ش صحبت کنی، همین‌جا در خدمتم.
        </p>
      )}
    </GlassPanel>
  );
}
