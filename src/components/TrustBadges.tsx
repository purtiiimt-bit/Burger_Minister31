export default function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "100% Pure Veg",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      label: "Fresh Daily",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M9 12.75L11.25 15 15 9.75m-3-9l3.75 1.5v4.5c0 4.556-3.03 8.25-7.5 9.75-4.47-1.5-7.5-5.194-7.5-9.75v-4.5L12 3.75z" />
        </svg>
      ),
      label: "Hygiene First",
      color: "text-tertiary",
      bg: "bg-tertiary-container/20",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "15-20 min Prep",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-2 rounded-xl bg-surface-container p-3"
        >
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${b.bg} ${b.color}`}>
            {b.icon}
          </div>
          <span className="text-xs font-semibold text-on-surface/80 sm:text-sm">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
