"use client";

import { useState } from "react";
import { SummaryPills } from "./SummaryPills";
import { TaskGroup } from "./TaskGroup";
import { EditSheet } from "./EditSheet";
import { AddItemFlow } from "./AddItemFlow";
import { EmptyState } from "@/components/states/EmptyState";
import { AllCaughtUpState } from "@/components/states/AllCaughtUpState";
import { groupTasks, summaryCounts, type TaskWithStatus } from "@/lib/tasks";

export function DashboardClient({ tasks }: { tasks: TaskWithStatus[] }) {
  const [selectedTask, setSelectedTask] = useState<TaskWithStatus | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [showScheduleAnyway, setShowScheduleAnyway] = useState(false);

  if (tasks.length === 0) {
    return (
      <>
        <main className="flex-1 flex items-center justify-center p-6">
          <EmptyState onAddFirstItem={() => setAddOpen(true)} />
        </main>
        <AddItemFlow open={addOpen} onOpenChange={setAddOpen} />
      </>
    );
  }

  const { needsAttention, onTrack } = groupTasks(tasks);
  const counts = summaryCounts(tasks);
  const allCaughtUp = needsAttention.length === 0;

  return (
    <>
      <main className="flex-1 p-6 pb-28">
        <SummaryPills overdue={counts.overdue} dueToday={counts.dueToday} onTrack={counts.onTrack} />

        {allCaughtUp && !showScheduleAnyway ? (
          <AllCaughtUpState onViewSchedule={() => setShowScheduleAnyway(true)} />
        ) : (
          <>
            <TaskGroup title="Needs attention" tasks={needsAttention} onSelect={setSelectedTask} />
            <TaskGroup title="On track" tasks={onTrack} onSelect={setSelectedTask} />
          </>
        )}
      </main>

      <button
        onClick={() => setAddOpen(true)}
        aria-label="Add item"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-terracotta text-white text-2xl font-bold shadow-[0_6px_20px_rgba(217,119,87,0.45)] flex items-center justify-center"
      >
        +
      </button>

      <EditSheet task={selectedTask} onClose={() => setSelectedTask(null)} />
      <AddItemFlow open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
