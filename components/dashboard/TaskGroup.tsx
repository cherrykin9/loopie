import { TaskCard } from "./TaskCard";
import type { TaskWithStatus } from "@/lib/tasks";

export function TaskGroup({
  title,
  tasks,
  onSelect,
}: {
  title: string;
  tasks: TaskWithStatus[];
  onSelect: (task: TaskWithStatus) => void;
}) {
  if (tasks.length === 0) return null;

  return (
    <section className="max-w-[420px] mx-auto mb-6">
      <h2 className="text-xs font-extrabold uppercase tracking-wide text-charcoal-soft mb-2 px-1">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
