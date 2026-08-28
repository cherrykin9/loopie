"use client";

import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { IconPicker } from "./IconPicker";
import { IntervalChips } from "./IntervalChips";
import { createItemWithTask } from "@/app/actions";

export function AddItemFlow({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [icon, setIcon] = useState("🪴");
  const [intervalDays, setIntervalDays] = useState<number | null>(7);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function close() {
    onOpenChange(false);
    setError(null);
  }

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    formData.set("icon", icon);
    formData.set("intervalDays", String(intervalDays ?? ""));

    const result = await createItemWithTask(formData);
    setPending(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    close();
  }

  return (
    <BottomSheet open={open} onClose={close}>
      <p className="font-wordmark text-2xl text-terracotta text-center mb-4">add an item</p>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
          What is it?
          <input
            name="itemName"
            type="text"
            required
            placeholder="e.g. Car, Plants, Fish tank"
            className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
          What needs doing? (optional)
          <input
            name="taskName"
            type="text"
            placeholder="e.g. Oil change, Water"
            className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
          />
        </label>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-charcoal">Icon</span>
          <IconPicker value={icon} onChange={setIcon} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-charcoal">How often?</span>
          <IntervalChips value={intervalDays} onChange={setIntervalDays} />
        </div>

        {error && <p className="text-sm text-red-orange font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 px-7 py-3.5 rounded-2xl bg-terracotta text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(217,119,87,0.35)] disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add item"}
        </button>
      </form>
    </BottomSheet>
  );
}
