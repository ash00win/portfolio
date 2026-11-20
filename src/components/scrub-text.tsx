import type { LucideIcon } from "lucide-react";
import { MessageCircle, Monitor, Smartphone, TrendingUp, Zap } from "lucide-react";
import type { CSSProperties } from "react";

/** Icons that can sit inline in the statement, written as [name] in the text. */
const chips: Record<string, { icon: LucideIcon; className: string }> = {
  monitor: { icon: Monitor, className: "bg-tint text-ink" },
  zap: { icon: Zap, className: "bg-gradient-to-br from-accent to-accent-2 text-white" },
  phone: { icon: Smartphone, className: "bg-ink text-white" },
  growth: { icon: TrendingUp, className: "bg-accent/15 text-accent" },
  chat: { icon: MessageCircle, className: "bg-accent-2/15 text-accent-2" },
};

/**
 * A statement whose words light up one after another as it scrolls through the screen.
 * Wrap words in *asterisks* to give them the gradient, and write [zap], [phone] etc. to drop
 * a small icon chip into the line. Needs a `data-scroll` ancestor (Effects feeds it --p);
 * without JavaScript every word is simply fully visible.
 */
export function ScrubText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((raw, i) => {
    const style = { "--i": i, "--n": words.length } as CSSProperties;
    const space = i < words.length - 1 ? " " : null;

    const chip = raw.match(/^\[(\w+)\]$/);
    if (chip && chips[chip[1]]) {
      const { icon: Icon, className } = chips[chip[1]];
      return (
        <span key={`${raw}-${i}`}>
          <span
            aria-hidden
            className={`scrub-word inline-grid h-[0.82em] w-[1.5em] -translate-y-[0.06em] place-items-center rounded-full align-middle ${className}`}
            style={style}
          >
            <Icon className="size-[0.48em]" strokeWidth={2.5} />
          </span>
          {space}
        </span>
      );
    }

    const marked = raw.startsWith("*");
    const word = raw.replace(/\*/g, "");
    return (
      <span key={`${word}-${i}`}>
        <span className={`scrub-word ${marked ? "text-gradient" : ""}`} style={style}>
          {word}
        </span>
        {space}
      </span>
    );
  });
}
