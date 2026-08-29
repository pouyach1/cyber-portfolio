import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const EMPTY_MEMORY = {
  conversation_logs: [],
  scheduled_tasks: [],
  user_goals: [],
  strategic_plans: [],
  user_mood_notes: [],
};

/**
 * Loads (or creates) the single ai_memory row this admin uses, and exposes
 * append helpers for each field. Falls back to an in-memory object when
 * Supabase isn't configured, so the AI companion still works locally.
 */
export function useAiMemory() {
  const [memory, setMemory] = useState(EMPTY_MEMORY);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from("ai_memory")
      .select("*")
      .limit(1)
      .then(async ({ data }) => {
        if (data?.[0]) {
          setMemory(data[0]);
          setRecordId(data[0].id);
        } else {
          const { data: created } = await supabase
            .from("ai_memory")
            .insert(EMPTY_MEMORY)
            .select()
            .single();
          if (created) {
            setMemory(created);
            setRecordId(created.id);
          }
        }
      });
  }, []);

  async function persist(patch) {
    setMemory((prev) => ({ ...prev, ...patch }));
    if (isSupabaseConfigured && recordId) {
      await supabase.from("ai_memory").update(patch).eq("id", recordId);
    }
  }

  function appendConversationTurn(turn) {
    persist({ conversation_logs: [...memory.conversation_logs, turn] });
  }

  function addScheduledTask(task) {
    persist({ scheduled_tasks: [...memory.scheduled_tasks, task] });
  }

  function toggleTaskDone(taskId) {
    persist({
      scheduled_tasks: memory.scheduled_tasks.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      ),
    });
  }

  function addMoodNote(note) {
    persist({ user_mood_notes: [...memory.user_mood_notes, note] });
  }

  return {
    memory,
    appendConversationTurn,
    addScheduledTask,
    toggleTaskDone,
    addMoodNote,
    isLive: isSupabaseConfigured,
  };
}
