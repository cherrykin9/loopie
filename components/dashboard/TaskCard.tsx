import { formatDueLabel, type TaskWithStatus } from "@/lib/tasks";

const STATUS_STYLES: Record<TaskWithStatus["status"], { border: string; text: string }> = {
  overdue: { border: "border-l-red-orange", text: "text-red-orange" },
  due_today: { border: "border-l-amber", text: "text-amber" },
  on_track: { border: "border-l-sage", text: "text-charcoal-soft" },
};

export function TaskCard({
  task,
  onSelect,
}: {
  task: TaskWithStatus;
  onSelect: (task: TaskWithStatus) => void;
}) {
  const style = STATUS_STYLES[task.status];

  return (
    <button
      onClick={() => onSelect(task)}
      className={`w-full flex items-center gap-3 bg-card-bg rounded-2xl px-4 py-3.5 border-l-4 ${style.border} shadow-[0_2px_10px_rgba(74,66,59,0.06)] text-left`}
    >
      <span className="text-2xl leading-none">{task.item_icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-sm text-charcoal truncate">{task.item_name}</span>
        <span className="block text-xs text-charcoal-soft truncate">{task.task_name}</span>
      </span>
      <span className={`text-xs font-bold whitespace-nowrap ${style.text}`}>
        {formatDueLabel(task)}
      </span>
    </button>
  );
}
