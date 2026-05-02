export default function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
      <span className="h-px w-8 bg-primary/40" />
      <span>{children}</span>
      <span className="h-px w-8 bg-primary/40" />
    </div>
  );
}
