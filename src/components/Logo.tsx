export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <path d="M24 3 6 9.5v13C6 34 13.6 42 24 45c10.4-3 18-11 18-22.5v-13L24 3Z" className="fill-navy" />
      <path d="M24 7.5 10 12.6v10c0 9 5.8 15.6 14 18.2 8.2-2.6 14-9.2 14-18.2v-10L24 7.5Z" className="fill-primary" />
      <path d="M20.5 15h7v6.5H34v7h-6.5V35h-7v-6.5H14v-7h6.5V15Z" className="fill-primary-foreground" />
      <circle cx="36" cy="12" r="3" className="fill-accent" />
      <circle cx="40.5" cy="18.5" r="1.8" className="fill-accent" />
      <path d="M36 12l4.5 6.5" className="stroke-accent" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-tight">
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-tight ${light ? "text-navy-foreground" : "text-navy"}`}>MEDITRUST</span>
        <span className={`block text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${light ? "text-navy-foreground/70" : "text-primary"}`}>Life Science Pvt Ltd</span>
      </span>
    </span>
  );
}
