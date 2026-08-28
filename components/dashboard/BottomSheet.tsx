"use client";

import { useEffect } from "react";

export function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} />
      <div
        className={`relative w-full max-w-[420px] bg-card-bg rounded-t-[28px] px-6 pt-5 pb-8 shadow-[0_-8px_32px_rgba(74,66,59,0.18)] transition-transform duration-200 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-10 h-1.5 rounded-full bg-terracotta-soft mx-auto mb-5" />
        {children}
      </div>
    </div>
  );
}
