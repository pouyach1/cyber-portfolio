import SectionHeading from "../ui/SectionHeading";
import SnippetVault from "./SnippetVault";
import GlassPanel from "../ui/GlassPanel";
import { useDashboardStore } from "../../store/useDashboardStore";
import NeonButton from "../ui/NeonButton";
import { Zap } from "lucide-react";

export default function DevToolsPage() {
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="جعبه‌ابزار توسعه‌دهنده"
        description="مخزن کدهای قابل استفاده‌ی مجدد برای پایتون و React."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SnippetVault />
        </div>
        <GlassPanel glow="purple" className="p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
            <Zap size={15} className="text-purple-neon" /> تستر وبهوک
          </h3>
          <p className="mb-4 text-xs text-slate-400">
            تستر وبهوک و پینگ زنده در بخش «اکوسیستم ربات‌ها» قرار داره — چون به داده‌ی زنده‌ی ربات‌ها نیاز داره.
          </p>
          <NeonButton variant="purple" onClick={() => setActiveTab("bots")}>
            رفتن به تستر وبهوک
          </NeonButton>
        </GlassPanel>
      </div>
    </div>
  );
}
