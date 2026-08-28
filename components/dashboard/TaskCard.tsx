"use client";

import { useState } from "react";
import { dueDetail, statusLabel, type TaskWithStatus } from "@/lib/tasks";
import { markTaskDone } from "@/app/actions";

const STATUS_STYLES: Record<TaskWithStatus["status"], { border: string; iconBg: string; badge: string }> = {
  overdue: { border: "border-l-red-orange", iconBg: "bg-terracotta-soft", badge: "bg-red-orange" },
  due_soon: { border: "border-l-amber", iconBg: "bg-amber-soft", badge: "bg-amber" },
  on_track: { border: "border-l-sage", iconBg: "bg-sage-soft", badge: "bg-sage" },
};

export function TaskCard({
  task,
  onSelect,
}: {
  task: TaskWithStatus;
  onSelect: (task: TaskWithStatus) => void;
}) {
  const [pending, setPending] = useState(false);
  const style = STATUS_STYLES[task.status];

  async function handleMarkDone(e: React.MouseEvent) {
    e.stopPropagation();
    setPending(true);
    await markTaskDone(task.id);
    setPending(false);
  }

  return (
    <div
      onClick={() => onSelect(task)}
      className={`w-full flex items-center gap-3 bg-card-bg rounded-2xl px-4 py-3.5 border-l-4 ${style.border} shadow-[0_2px_10px_rgba(74,66,59,0.06)] text-left cursor-pointer`}
    >
      <span className={`w-11 h-11 shrink-0 rounded-xl ${style.iconBg} flex items-center justify-center text-xl leading-none`}>
        {task.item_icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-sm text-charcoal truncate">{task.item_name}</span>
        <span className="block text-xs text-charcoal-soft truncate">
          {task.task_name} · {dueDetail(task)}
        </span>
      </span>
      <span className={`px-2.5 py-1 rounded-full text-white text-[11px] font-bold whitespace-nowrap ${style.badge}`}>
        {statusLabel(task)}
      </span>
      <button
        onClick={handleMarkDone}
        disabled={pending}
        aria-label="Mark done"
        className="w-8 h-8 shrink-0 rounded-full bg-cream flex items-center justify-center text-charcoal disabled:opacity-50"
      >
        ✓
      </button>
    </div>
  );
}
