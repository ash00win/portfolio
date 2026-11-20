import { Check } from "lucide-react";
import type { CSSProperties } from "react";

/**
 * Hero illustration (no photos needed): a code editor types a component line by line while
 * the preview beside it, and a phone, build the same page in step. Loops every 10s.
 * Pure markup + CSS animations (see .type-line / .pop-in in globals.css). Decorative.
 */

type Token = [text: string, kind?: "tag" | "attr" | "str" | "txt"];
const code: Token[][] = [
  [["<"], ["section", "tag"], [" className", "attr"], ["="], ['"hero"', "str"], [">"]],
  [["  <"], ["h1", "tag"], [" className", "attr"], ["="], ['"text-7xl"', "str"], [">"]],
  [["    Sharp websites,", "txt"]],
  [["    <"], ["em", "tag"], [">"], ["built to perform.", "txt"], ["</"], ["em", "tag"], [">"]],
  [["  </"], ["h1", "tag"], [">"]],
  [["  <"], ["Button", "tag"], [" href", "attr"], ["="], ['"#contact"', "str"], [">"]],
  [["    Start a project", "txt"]],
  [["  </"], ["Button", "tag"], [">"]],
  [["  <"], ["Cards", "tag"], [" cols", "attr"], ["={"], ["3", "str"], ["}"], [" />"]],
  [["</"], ["section", "tag"], [">"]],
];
const color = { tag: "text-accent-2", attr: "text-accent", str: "text-amber-600", txt: "text-ink" };

/** Seconds after the cycle starts that line `i` begins typing. */
const at = (i: number) => 0.3 + i * 0.42;
const t = (s: number) => ({ "--t": s }) as CSSProperties;

function MiniSite({ phone = false }: { phone?: boolean }) {
  return (
    <div className={`flex h-full flex-col ${phone ? "gap-2 p-2" : "gap-2.5 p-3"}`}>
      <div className="pop-in flex items-center justify-between" style={t(at(0))}>
        <span className="size-2 rounded-full bg-gradient-to-br from-accent to-accent-2" />
        {!phone && (
          <span className="flex gap-1.5">
            <span className="h-1 w-5 rounded-full bg-ink/15" />
            <span className="h-1 w-5 rounded-full bg-ink/15" />
            <span className="h-1 w-5 rounded-full bg-ink/15" />
          </span>
        )}
        <span className="h-2 w-6 rounded-full bg-ink" />
      </div>
      <div className={`${phone ? "mt-2" : "mt-3"} space-y-1.5`}>
        <div className="pop-in h-2.5 w-4/5 rounded bg-ink" style={t(at(2))} />
        <div className="pop-in h-2.5 w-3/5 rounded bg-gradient-to-r from-accent to-accent-2" style={t(at(3))} />
        <div className="pop-in h-1 w-full rounded-full bg-ink/10" style={t(at(4))} />
        <div className="pop-in h-1 w-2/3 rounded-full bg-ink/10" style={t(at(4))} />
      </div>
      <div className="pop-in h-4 w-16 rounded-full bg-ink" style={t(at(6))} />
      <div className={`mt-auto grid gap-1.5 ${phone ? "grid-cols-1" : "grid-cols-3"}`}>
        {(phone ? [0, 1] : [0, 1, 2]).map((c) => (
          <div
            key={c}
            className="pop-in rounded-md border border-line bg-surface p-1.5 shadow-sm"
            style={t(at(8) + c * 0.12)}
          >
            <div className="mb-1 aspect-[5/3] rounded-sm bg-gradient-to-br from-accent/25 to-accent-2/25" />
            <div className="h-1 w-3/4 rounded-full bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div
      className="hero-previews pointer-events-none relative mx-auto mt-14 w-full max-w-5xl sm:mt-20"
      aria-hidden
    >
      {/* Editor + preview window, tilted back; it flattens as you scroll (see .hero-showcase). */}
      <div className="hero-showcase">
        <div className="float-in" style={{ "--d": 0 } as CSSProperties}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_60px_120px_-50px_rgb(12_12_13/0.45)] sm:rounded-3xl">
            <div className="flex items-center gap-1.5 border-b border-line bg-paper px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 hidden rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-ink shadow-sm md:inline">
                hero.tsx
              </span>
              <span className="hidden px-2 py-0.5 font-mono text-[11px] text-muted md:inline">preview</span>
              <span className="mx-auto rounded-md bg-surface px-3 py-0.5 font-mono text-[11px] text-muted shadow-sm md:mr-0 md:ml-auto">
                yourbusiness.com
              </span>
            </div>
            <div className="grid h-60 sm:h-80 md:grid-cols-[1.1fr_1fr]">
              <pre className="hidden overflow-hidden border-r border-line bg-paper/60 py-5 font-mono text-[12px] leading-[1.95] md:block">
                {code.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-10 shrink-0 pr-3 text-right text-muted/50 select-none">{i + 1}</span>
                    <span className="type-line whitespace-pre text-muted" style={t(at(i))}>
                      {line.map(([text, kind], j) => (
                        <span key={j} className={kind ? color[kind] : undefined}>
                          {text}
                        </span>
                      ))}
                      {i === code.length - 1 && (
                        <span className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />
                      )}
                    </span>
                  </div>
                ))}
              </pre>
              <div className="relative bg-surface [zoom:1.3] sm:[zoom:1.6] md:[zoom:1.55]">
                <MiniSite />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone showing the same page */}
      <div className="float-card -bottom-12 left-[2%] z-10 hidden md:block" style={{ "--depth": 24 } as CSSProperties}>
        <div className="float-in" style={{ "--d": 2 } as CSSProperties}>
          <div className="float-bob" style={{ "--bob": "6s" } as CSSProperties}>
            <div className="h-64 w-32 overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-surface shadow-[0_30px_60px_-20px_rgb(12_12_13/0.45)]">
              <div className="mx-auto mt-1 h-1 w-9 rounded-full bg-ink" />
              <MiniSite phone />
            </div>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="float-card -top-5 right-[6%] z-10" style={{ "--depth": 30 } as CSSProperties}>
        <div className="float-in" style={{ "--d": 3 } as CSSProperties}>
          <p
            className="float-bob flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary shadow-lg"
            style={{ "--bob": "5s" } as CSSProperties}
          >
            Figma <span className="text-accent">→</span> Code
          </p>
        </div>
      </div>
      <div className="float-card right-[8%] -bottom-5 z-10 hidden sm:block" style={{ "--depth": 18 } as CSSProperties}>
        <div className="float-in" style={{ "--d": 4 } as CSSProperties}>
          <p className="float-bob flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium shadow-lg">
            <Check className="size-4 text-accent" /> Mobile-first · SEO-ready
          </p>
        </div>
      </div>
    </div>
  );
}
