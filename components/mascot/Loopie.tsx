type LoopieVariant = "curious" | "happy" | "worried" | "neutral";

const DOT_POSITIONS = [
  [76.5, 60.4],
  [63.8, 80.4],
  [40.6, 85.5],
  [20.6, 72.8],
  [15.5, 49.6],
  [28.2, 29.6],
  [51.4, 24.5],
  [71.4, 37.2],
] as const;

function Face({ variant }: { variant: LoopieVariant }) {
  if (variant === "happy") {
    return (
      <>
        <path d="M 34 51 Q 38 47, 42 51" stroke="#4A423B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 51 51 Q 55 47, 59 51" stroke="#4A423B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="31" cy="59" r="4.5" fill="#E0A63C" opacity="0.5" />
        <circle cx="62" cy="59" r="4.5" fill="#E0A63C" opacity="0.5" />
        <path d="M 40 59 Q 46.5 67, 53 59" stroke="#4A423B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </>
    );
  }

  if (variant === "worried") {
    return (
      <>
        <circle cx="38" cy="53" r="3.6" fill="#4A423B" />
        <circle cx="55" cy="53" r="3.6" fill="#4A423B" />
        <circle cx="31" cy="59" r="4.5" fill="#E06B3C" opacity="0.5" />
        <circle cx="62" cy="59" r="4.5" fill="#E06B3C" opacity="0.5" />
        <path d="M 41 65 Q 46.5 60, 52 65" stroke="#4A423B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </>
    );
  }

  // curious (empty state) and neutral share the same base face
  return (
    <>
      <circle cx="38" cy="52" r="3.6" fill="#4A423B" />
      <circle cx="55" cy="50" r="3.6" fill="#4A423B" />
      <circle cx="31" cy="59" r="4.5" fill="#E0A63C" opacity="0.5" />
      <circle cx="62" cy="59" r="4.5" fill="#E0A63C" opacity="0.5" />
      <ellipse cx="46.5" cy="62" rx="3" ry="3.6" fill="#4A423B" />
    </>
  );
}

export function Loopie({
  variant = "neutral",
  size = 130,
  animate = true,
  showSparkles = false,
  className,
}: {
  variant?: LoopieVariant;
  size?: number;
  animate?: boolean;
  showSparkles?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${animate ? "loopie-float" : ""} ${className ?? ""}`}
      style={{ width: size, margin: "0 auto" }}
    >
      <svg viewBox="0 0 110 100">
        {showSparkles && (
          <>
            <text className="loopie-sparkle" x="10" y="25" fontSize="14" fill="#E0A63C">✦</text>
            <text className="loopie-sparkle" x="95" y="20" fontSize="10" fill="#8FA888">✦</text>
            <text className="loopie-sparkle" x="95" y="85" fontSize="12" fill="#D97757">✦</text>
          </>
        )}

        {DOT_POSITIONS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="9" fill="#F1CBB8" opacity="0.7" />
        ))}
        <circle cx="46" cy="55" r="27" fill="#F1CBB8" />
        <ellipse cx="46" cy="60" rx="17" ry="14" fill="#FAF3E9" />

        <Face variant={variant} />

        {variant === "curious" && (
          <text x="66" y="20" fontFamily="Nunito" fontSize="16" fontWeight="800" fill="#D97757" opacity="0.7">
            ?
          </text>
        )}

        <path
          className="loopie-tail"
          d="M 78 66
             C 96 68, 104 54, 94 44
             C 86 37, 75 43, 78 51
             C 80 57, 89 57, 89 51"
          fill="none"
          stroke="#D97757"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
