"use client";

import { useState } from "react";
import { INTERVAL_PRESETS } from "@/lib/tasks";

export function IntervalChips({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (days: number) => void;
}) {
  const [customOpen, setCustomOpen] = useState(
    value !== null && !INTERVAL_PRESETS.some((p) => p.days === value)
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {INTERVAL_PRESETS.map((preset) => (
          <button
            key={preset.days}
            type="button"
            onClick={() => {
              setCustomOpen(false);
              onChange(preset.days);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              value === preset.days && !customOpen
                ? "bg-terracotta text-white border-terracotta"
                : "bg-cream text-charcoal border-terracotta-soft"
            }`}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCustomOpen(true)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
            customOpen
              ? "bg-terracotta text-white border-terracotta"
              : "bg-cream text-charcoal border-terracotta-soft"
          }`}
        >
          Custom
        </button>
      </div>

      {customOpen && (
        <label className="flex items-center gap-2 text-sm font-semibold text-charcoal">
          Every
          <input
            type="number"
            min={1}
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-20 rounded-lg border border-terracotta-soft px-2 py-1.5 text-sm outline-none focus:border-terracotta"
          />
          days
        </label>
      )}
    </div>
  );
}
