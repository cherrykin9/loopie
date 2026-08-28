"use client";

import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { IntervalChips } from "./IntervalChips";
import { markTaskDone, updateTask, removeItem } from "@/app/actions";
import type { TaskWithStatus } from "@/lib/tasks";

export function EditSheet({
  task,
  onClose,
}: {
  task: TaskWithStatus | null;
  onClose: () => void;
}) {
  return (
    <BottomSheet open={!!task} onClose={onClose}>
      {task && <EditSheetContent key={task.id} task={task} onClose={onClose} />}
    </BottomSheet>
  );
}

function EditSheetContent({ task, onClose }: { task: TaskWithStatus; onClose: () => void }) {
  const [editing, setEditing] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const [name, setName] = useState(task.task_name);
  const [intervalDays, setIntervalDays] = useState<number | null>(task.interval_days);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMarkDone() {
    setPending(true);
    const result = await markTaskDone(task.id);
    setPending(false);
    if (result?.error) setError(result.error);
    else onClose();
  }

  async function handleSaveEdit() {
    setPending(true);
    const result = await updateTask(task.id, { name, intervalDays: intervalDays ?? undefined });
    setPending(false);
    if (result?.error) setError(result.error);
    else onClose();
  }

  async function handleRemove() {
    setPending(true);
    const result = await removeItem(task.item_id);
    setPending(false);
    if (result?.error) setError(result.error);
    else onClose();
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl leading-none">{task.item_icon}</span>
        <div>
          <p className="font-bold text-charcoal">{task.item_name}</p>
          <p className="text-sm text-charcoal-soft">{task.task_name}</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-orange font-semibold mb-3">{error}</p>}

      {!editing && !confirmingRemove && (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleMarkDone}
            disabled={pending}
            className="px-7 py-3.5 rounded-2xl bg-sage text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(143,168,136,0.4)] disabled:opacity-60"
          >
            {pending ? "Saving…" : "✓ Mark done today"}
          </button>
          <button
            onClick={() => setEditing(true)}
            className="px-7 py-3.5 rounded-2xl bg-cream text-charcoal font-bold text-sm border border-terracotta-soft"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmingRemove(true)}
            className="px-7 py-3.5 rounded-2xl bg-transparent text-red-orange font-bold text-sm"
          >
            Remove
          </button>
        </div>
      )}

      {editing && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
            Task name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
            />
          </label>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-charcoal">How often?</span>
            <IntervalChips value={intervalDays} onChange={setIntervalDays} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-4 py-3 rounded-2xl bg-cream text-charcoal font-bold text-sm border border-terracotta-soft"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={pending}
              className="flex-1 px-4 py-3 rounded-2xl bg-terracotta text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(217,119,87,0.35)] disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {confirmingRemove && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-charcoal">
            Remove <span className="font-bold">{task.item_name}</span> and stop tracking it? This can&apos;t be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmingRemove(false)}
              className="flex-1 px-4 py-3 rounded-2xl bg-cream text-charcoal font-bold text-sm border border-terracotta-soft"
            >
              Cancel
            </button>
            <button
              onClick={handleRemove}
              disabled={pending}
              className="flex-1 px-4 py-3 rounded-2xl bg-red-orange text-white font-extrabold text-sm disabled:opacity-60"
            >
              {pending ? "Removing…" : "Remove"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
