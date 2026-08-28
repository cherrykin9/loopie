import { Loopie } from "@/components/mascot/Loopie";

export function AllCaughtUpState({ onViewSchedule }: { onViewSchedule?: () => void }) {
  return (
    <div className="max-w-[380px] mx-auto bg-card-bg rounded-[28px] px-7 pt-10 pb-8 text-center shadow-[0_8px_32px_rgba(74,66,59,0.10)]">
      <Loopie variant="happy" showSparkles />
      <p className="font-wordmark text-[26px] text-terracotta mt-2.5 mb-1">all caught up!</p>
      <p className="text-sm text-charcoal-soft mb-6 leading-relaxed">
        Every item is fresh and on schedule.
        <br />
        Loopie&apos;s happy. Go relax a little.
      </p>
      <button
        onClick={onViewSchedule}
        className="px-7 py-3.5 rounded-2xl bg-sage text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(143,168,136,0.4)]"
      >
        View schedule
      </button>
    </div>
  );
}
