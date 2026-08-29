import { Sunrise, TrendingUp, Moon } from "lucide-react";
import NeonButton from "../ui/NeonButton";
import { useDashboardStore } from "../../store/useDashboardStore";
import { morningBriefing, strategicAudit, deepFocusPlan } from "./aiEngine";

export default function ScenarioButtons({ context, onReply }) {
  const startDeepFocus = useDashboardStore((s) => s.startDeepFocus);

  function handleMorningBriefing() {
    onReply({ text: morningBriefing(context), id: Date.now() });
  }

  function handleStrategicAudit() {
    onReply({ text: strategicAudit(context), id: Date.now() });
  }

  function handleDeepFocus() {
    startDeepFocus(120);
    onReply({ text: deepFocusPlan(), id: Date.now() });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <NeonButton variant="cyan" icon={Sunrise} onClick={handleMorningBriefing}>
        بریفینگ صبحگاهی
      </NeonButton>
      <NeonButton variant="purple" icon={TrendingUp} onClick={handleStrategicAudit}>
        تحلیل استراتژیک
      </NeonButton>
      <NeonButton variant="magenta" icon={Moon} onClick={handleDeepFocus}>
        حالت تمرکز عمیق
      </NeonButton>
    </div>
  );
}
