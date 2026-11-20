import type { CSSProperties } from "react";

/**
 * Small illustrated UI mockups for project cards that have no public screenshots.
 * Pure markup and CSS: crisp at any size, no image downloads, and they animate when the
 * parent card (which has the `group` class) is hovered. Decorative, so hidden from screen readers.
 */
export type ArtKind = "erp" | "kanban" | "movies";

export function ProjectArt({ kind }: { kind: ArtKind }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-paper [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative h-full">{kind === "erp" ? <Erp /> : kind === "kanban" ? <Kanban /> : <Movies />}</div>
    </div>
  );
}

const bar = "rounded-full bg-ink/10";
const ease = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

/** Attendance register with a weekly chart. */
function Erp() {
  const marks = ["PPPAP", "PPPPP", "PAPPP", "PPPPL", "PPAPP"];
  const bars = [62, 80, 74, 92, 86];
  return (
    <div className="flex h-full gap-2.5 p-3">
      <div className="flex flex-[1.6] flex-col gap-1.5 rounded-lg border border-line bg-surface p-2.5 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <div className="h-1.5 w-14 rounded-full bg-ink/70" />
          <div className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[7px] font-semibold text-accent">LIVE</div>
        </div>
        {marks.map((row, r) => (
          <div key={r} className="flex items-center gap-1.5">
            <span className="size-2.5 shrink-0 rounded-full bg-gradient-to-br from-accent/60 to-accent-2/60" />
            <span className={`h-1 flex-1 ${bar}`} />
            {row.split("").map((m, c) => (
              <span
                key={c}
                className={`grid size-2.5 place-items-center rounded-[3px] ${ease} ${
                  m === "P" ? "bg-accent/80" : m === "A" ? "bg-rose-400" : "bg-amber-300"
                } group-hover:scale-110`}
                style={{ transitionDelay: `${(r * 5 + c) * 15}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="rounded-lg border border-line bg-surface p-2 shadow-sm">
          <div className="text-[7px] font-medium text-muted">Present today</div>
          <div className="text-gradient text-base leading-tight font-semibold">94%</div>
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-lg border border-line bg-surface p-2 shadow-sm">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent to-accent-2 ${ease} scale-y-75 group-hover:scale-y-100`}
              style={{ height: `${h}%`, transitionDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Task board; one card gets "picked up" on hover. */
function Kanban() {
  const columns = [
    { title: "To do", dot: "bg-ink/30", cards: [2, 3] },
    { title: "Doing", dot: "bg-accent-2", cards: [3, 2] },
    { title: "Done", dot: "bg-accent", cards: [2, 2, 1] },
  ];
  return (
    <div className="flex h-full gap-2 p-3">
      {columns.map((col, c) => (
        <div key={col.title} className="flex flex-1 flex-col gap-1.5 rounded-lg bg-tint/80 p-1.5">
          <div className="flex items-center gap-1 px-0.5 text-[7px] font-semibold text-ink/70">
            <span className={`size-1.5 rounded-full ${col.dot}`} />
            {col.title}
          </div>
          {col.cards.map((lines, i) => {
            const picked = c === 1 && i === 0;
            return (
              <div
                key={i}
                className={`rounded-md border border-line bg-surface p-1.5 shadow-sm ${ease} ${
                  picked ? "group-hover:translate-x-3 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:shadow-lg" : ""
                }`}
              >
                {Array.from({ length: lines }, (_, l) => (
                  <div key={l} className={`mb-1 h-1 ${bar}`} style={{ width: `${90 - l * 22}%` }} />
                ))}
                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`h-1.5 w-5 rounded-full ${picked ? "bg-accent-2/40" : c === 2 ? "bg-accent/30" : "bg-ink/10"}`}
                  />
                  <span className="size-2.5 rounded-full bg-gradient-to-br from-accent/70 to-accent-2/70" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Movie poster grid with a search bar; posters lift in sequence on hover. */
function Movies() {
  const posters = [
    "from-rose-400 to-orange-300",
    "from-indigo-500 to-sky-400",
    "from-emerald-500 to-teal-300",
    "from-amber-400 to-rose-400",
    "from-violet-500 to-fuchsia-400",
    "from-slate-700 to-slate-500",
    "from-cyan-500 to-blue-500",
    "from-lime-400 to-emerald-500",
  ];
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 shadow-sm">
        <span className="size-2 rounded-full border border-ink/40" />
        <span className={`h-1 w-16 ${bar}`} />
        <span className="ml-auto rounded-full bg-ink px-1.5 py-0.5 text-[6px] font-semibold text-white">Sci-fi</span>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-1.5">
        {posters.map((g, i) => (
          <div
            key={g}
            className={`relative overflow-hidden rounded-md bg-gradient-to-br ${g} shadow-sm ${ease} group-hover:-translate-y-1`}
            style={{ transitionDelay: `${i * 40}ms` } as CSSProperties}
          >
            <span className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-white/70" />
            {i === 1 && (
              <span className="absolute top-1 right-1 rounded-full bg-white/90 px-1 text-[6px] font-bold text-ink">★ 8.7</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
