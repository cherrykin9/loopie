export function SummaryPills({
  overdue,
  dueSoon,
  onTrack,
}: {
  overdue: number;
  dueSoon: number;
  onTrack: number;
}) {
  const pills = [
    { label: "Overdue", count: overdue, color: "text-red-orange" },
    { label: "Due soon", count: dueSoon, color: "text-amber" },
    { label: "All good", count: onTrack, color: "text-sage" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 max-w-[420px] mx-auto mb-6">
      {pills.map((pill) => (
        <div
          key={pill.label}
          className="bg-card-bg rounded-2xl px-3 py-4 text-center shadow-[0_2px_10px_rgba(74,66,59,0.06)]"
        >
          <div className={`text-2xl font-extrabold ${pill.color}`}>{pill.count}</div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-charcoal-soft mt-1">
            {pill.label}
          </div>
        </div>
      ))}
    </div>
  );
}
