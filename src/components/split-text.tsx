import { Fragment, type CSSProperties } from "react";

/**
 * Splits text into words, each inside a clipping mask, so CSS can slide them up one by one.
 * Use inside an element with `data-reveal="split"` (plays on scroll) or class `split-load` (plays on load).
 * `start` offsets the stagger, e.g. for a second line that should follow the first.
 */
export function SplitText({
  text,
  start = 0,
  innerClassName = "",
}: {
  text: string;
  start?: number;
  innerClassName?: string;
}) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="mask">
        <span className={`mask-inner ${innerClassName}`} style={{ "--w": start + i } as CSSProperties}>
          {word}
        </span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
