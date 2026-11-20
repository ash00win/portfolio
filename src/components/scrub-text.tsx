import type { CSSProperties } from "react";

/**
 * A statement whose words light up one after another as it scrolls through the screen.
 * Wrap words in *asterisks* to give them the gradient. Needs a `data-scroll` ancestor
 * (Effects feeds it --p); without JavaScript every word is simply fully visible.
 */
export function ScrubText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((raw, i) => {
    const marked = raw.startsWith("*");
    const word = raw.replace(/\*/g, "");
    return (
      <span key={`${word}-${i}`}>
        <span
          className={`scrub-word ${marked ? "text-gradient" : ""}`}
          style={{ "--i": i, "--n": words.length } as CSSProperties}
        >
          {word}
        </span>
        {i < words.length - 1 ? " " : null}
      </span>
    );
  });
}
