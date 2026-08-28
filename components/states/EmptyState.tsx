import { Loopie } from "@/components/mascot/Loopie";

export function EmptyState({ onAddFirstItem }: { onAddFirstItem?: () => void }) {
  return (
    <div className="max-w-[380px] mx-auto bg-card-bg rounded-[28px] px-7 pt-10 pb-8 text-center shadow-[0_8px_32px_rgba(74,66,59,0.10)]">
      <Loopie variant="curious" />
      <p className="font-wordmark text-[26px] text-terracotta mt-2.5 mb-1">nothing here yet</p>
      <p className="text-sm text-charcoal-soft mb-6 leading-relaxed">
        Loopie&apos;s got nothing to keep track of.
        <br />
        Add your first item to get started.
      </p>
      <button
        onClick={onAddFirstItem}
        className="px-7 py-3.5 rounded-2xl bg-terracotta text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(217,119,87,0.35)]"
      >
        + Add your first item
      </button>
    </div>
  );
}
