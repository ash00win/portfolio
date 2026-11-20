import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { SplitText } from "./split-text";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Small monospace label used above headings and for metadata. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-xs tracking-wider text-muted uppercase ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        id={id}
        data-reveal="split"
        className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl"
      >
        <SplitText text={title} />
      </h2>
      {intro && (
        <p data-reveal style={{ "--d": 3 } as CSSProperties} className="mt-5 text-lg leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </div>
  );
}

const buttonBase =
  "btn inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,translate] duration-300";
const buttonVariants = {
  primary:
    "btn-fill bg-primary text-on-primary hover:shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_60%,transparent)]",
  // Hover colours live here (not in globals.css) so they beat the base text-ink utility.
  secondary: "btn-fill btn-fill-ink border border-line bg-surface text-ink hover:border-ink hover:text-paper",
  ghost: "btn-fill btn-fill-ink text-ink hover:text-paper",
};

type ButtonLinkProps = ComponentProps<"a"> & { variant?: keyof typeof buttonVariants };

/**
 * Pill button. On hover the label rolls up (a hidden copy slides in from below) and a fill rises.
 * External links and mailto: use a plain anchor. Internal routes use next/link.
 */
export function ButtonLink({ variant = "primary", className = "", href = "", children, ...props }: ButtonLinkProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  const label = (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={classes} {...props}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {label}
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{children}</span>;
}
