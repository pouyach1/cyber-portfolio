import SectionHeading from "../ui/SectionHeading";
import BotStatusTable from "./BotStatusTable";
import WebhookPingTester from "./WebhookPingTester";
import BroadcastDrawer from "./BroadcastDrawer";
import LogsDrawer from "./LogsDrawer";

export default function BotEcosystemPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="مدیریت اکوسیستم ربات‌های تلگرام"
        description="وضعیت زنده‌ی همه‌ی ربات‌های متصل — راه‌اندازی مجدد، توقف، پیام همگانی یا مشاهده‌ی لاگ."
      />
      <BotStatusTable />
      <WebhookPingTester />
      <BroadcastDrawer />
      <LogsDrawer />
    </div>
  );
}
