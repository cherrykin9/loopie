const ICONS = [
  "🪴", "🌵", "🐶", "🐱", "🐟", "🚗", "🚲", "🏠",
  "🧹", "🧺", "🪥", "💊", "🛁", "🧴", "🔥", "❄️",
  "💧", "🧯", "🔋", "🧻", "🐾", "📚", "💻", "🧦",
];

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {ICONS.map((icon) => (
        <button
          key={icon}
          type="button"
          onClick={() => onChange(icon)}
          className={`text-xl aspect-square rounded-xl flex items-center justify-center transition-colors ${
            value === icon ? "bg-terracotta-soft ring-2 ring-terracotta" : "bg-cream"
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
