export type TaskStatus = "overdue" | "due_today" | "on_track";

export type TaskWithStatus = {
  id: string;
  user_id: string;
  item_id: string;
  task_name: string;
  interval_days: number;
  last_done_date: string | null;
  created_at: string;
  item_name: string;
  item_icon: string;
  next_due: string;
  days_until_due: number;
  status: TaskStatus;
};

export type GroupedTasks = {
  needsAttention: TaskWithStatus[];
  onTrack: TaskWithStatus[];
};

// Overdue-first sort, then due-today, then soonest on-track first.
export function sortByUrgency(tasks: TaskWithStatus[]): TaskWithStatus[] {
  return [...tasks].sort((a, b) => a.days_until_due - b.days_until_due);
}

export function groupTasks(tasks: TaskWithStatus[]): GroupedTasks {
  const sorted = sortByUrgency(tasks);
  return {
    needsAttention: sorted.filter((t) => t.status !== "on_track"),
    onTrack: sorted.filter((t) => t.status === "on_track"),
  };
}

export function summaryCounts(tasks: TaskWithStatus[]) {
  return {
    overdue: tasks.filter((t) => t.status === "overdue").length,
    dueToday: tasks.filter((t) => t.status === "due_today").length,
    onTrack: tasks.filter((t) => t.status === "on_track").length,
  };
}

export const INTERVAL_PRESETS = [
  { label: "Daily", days: 1 },
  { label: "Weekly", days: 7 },
  { label: "Bi-weekly", days: 14 },
  { label: "Monthly", days: 30 },
  { label: "Every 3 months", days: 90 },
  { label: "Every 6 months", days: 182 },
  { label: "Yearly", days: 365 },
] as const;

export function formatDueLabel(task: TaskWithStatus): string {
  const days = task.days_until_due;
  if (days === 0) return "Due today";
  if (days < 0) return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}
