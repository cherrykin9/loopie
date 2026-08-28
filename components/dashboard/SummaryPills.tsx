export function SummaryPills({
  overdue,
  dueToday,
  onTrack,
}: {
  overdue: number;
  dueToday: number;
  onTrack: number;
}) {
  const pills = [
    { label: "Overdue", count: overdue, bg: "bg-red-orange" },
    { label: "Due today", count: dueToday, bg: "bg-amber" },
    { label: "On track", count: onTrack, bg: "bg-sage" },
  ];

  return (
    <div className="flex gap-2 max-w-[420px] mx-auto mb-5 overflow-x-auto">
      {pills.map((pill) => (
        <div
          key={pill.label}
          className="flex items-center gap-2 bg-card-bg rounded-full px-4 py-2 shadow-[0_2px_10px_rgba(74,66,59,0.06)] shrink-0"
        >
          <span className={`w-2 h-2 rounded-full ${pill.bg}`} />
          <span className="text-sm font-bold text-charcoal">{pill.count}</span>
          <span className="text-xs text-charcoal-soft font-semibold">{pill.label}</span>
        </div>
      ))}
    </div>
  );
}
