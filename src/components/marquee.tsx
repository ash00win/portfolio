export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 pr-10 text-lg font-medium whitespace-nowrap text-muted">
          {item}
          <span className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden />
        </li>
      ))}
    </ul>
  );

  // Two copies scroll as one strip; the second is hidden from screen readers.
  return (
    <div className="marquee overflow-hidden py-6">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
