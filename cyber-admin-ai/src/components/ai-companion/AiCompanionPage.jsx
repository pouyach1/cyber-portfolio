import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import ChatWidget from "./ChatWidget";
import ScenarioButtons from "./ScenarioButtons";
import EisenhowerMatrix from "./EisenhowerMatrix";
import MoodCheckIn from "./MoodCheckIn";
import { useBots } from "../../hooks/useBots";
import { useProjects } from "../../hooks/useProjects";
import { useInvoices } from "../../hooks/useInvoices";
import { useAiMemory } from "../../hooks/useAiMemory";

export default function AiCompanionPage() {
  const { bots } = useBots();
  const { projects } = useProjects();
  const { invoices } = useInvoices();
  const { memory, appendConversationTurn, addScheduledTask, toggleTaskDone, addMoodNote } = useAiMemory();
  const [scenarioReply, setScenarioReply] = useState(null);

  const context = { bots, projects, invoices };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="دستیار هوشمند ۳۶۰ درجه"
        description="رفیق، استراتژیست، برنامه‌ریز و نویسنده — همه در یک دستیار."
        action={<ScenarioButtons context={context} onReply={setScenarioReply} />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatWidget
            context={context}
            conversationLogs={memory.conversation_logs}
            onAppendTurn={appendConversationTurn}
            externalReply={scenarioReply}
          />
        </div>

        <div className="space-y-6">
          <MoodCheckIn onCheckIn={addMoodNote} />
        </div>
      </div>

      <EisenhowerMatrix
        tasks={memory.scheduled_tasks}
        onAddTask={addScheduledTask}
        onToggleTask={toggleTaskDone}
      />
    </div>
  );
}
