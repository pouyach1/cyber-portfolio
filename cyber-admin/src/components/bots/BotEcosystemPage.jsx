import SectionHeading from "../ui/SectionHeading";
import BotStatusTable from "./BotStatusTable";
import BroadcastDrawer from "./BroadcastDrawer";
import LogsDrawer from "./LogsDrawer";

export default function BotEcosystemPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Telegram Bot Ecosystem Controller"
        description="Live status for every connected bot — restart, pause, broadcast, or pull logs."
      />
      <BotStatusTable />
      <BroadcastDrawer />
      <LogsDrawer />
    </div>
  );
}
