"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Page-wide motion, mounted once in the layout. CSS does the animating; this only feeds it values:
 * - smooth, inertia scrolling (Lenis) for mouse and trackpad users
 * - `[data-reveal]`   gets `data-shown` when it scrolls into view
 * - `[data-scroll]`   gets --p / --enter / --exit / --in (scroll progress, 0→1)
 * - `[data-hscroll]`  gets --ph / --hx for the pinned horizontal-scroll section
 * - `[data-count]`    counts up from 0 when it comes into view
 * - `.glow-card`, `.spotlight` get the cursor position (--mx / --my); `.tilt` cards lean (--rx / --ry)
 * - `.magnetic` elements drift towards the cursor
 * - `.hero-previews` gets --cx / --cy (pointer position, -1→1) for its parallax layers
 * - `#site-header` hides while scrolling down
 *
 * Performance rules: element positions are measured once (and again on resize), never
 * inside the scroll loop; each frame only does arithmetic and writes values that changed;
 * scroll-linked values update in the same frame Lenis moves the page.
 */
export function Effects() {
  const pathname = usePathname();
  // False until the first page has loaded; afterwards every pathname change is an in-app navigation.
  const navigated = useRef(false);

  // Scroll reveals. Also picks up elements added later (content edits, swapped components),
  // so nothing can get stuck invisible.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-shown])")) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  // Numbers that count up when they first come into view; the real value is in the HTML.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>("[data-count]");
    const delay = document.documentElement.hasAttribute("data-intro") ? 2300 : 400;
    const timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const match = (el.textContent ?? "").match(/^([\d,]+)(.*)$/);
        if (!match) continue;
        const target = Number(match[1].replace(/,/g, ""));
        const suffix = match[2];
        el.textContent = `0${suffix}`;
        timers.push(
          window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / 1600);
              const eased = 1 - Math.pow(1 - t, 4);
              el.textContent = `${Math.round(target * eased).toLocaleString("en-US")}${suffix}`;
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, delay),
        );
      }
    });
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  // Smooth scrolling + scroll-linked values + the hiding header.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const header = document.getElementById("site-header");

    // Touch devices keep native scrolling, which already feels right there.
    const lenis = window.matchMedia("(pointer: fine)").matches
      ? new Lenis({ autoRaf: true, lerp: 0.12, anchors: { offset: -96 } })
      : null;

    // A new page (in-app navigation, not a #section link) always starts at the top, so no stale
    // scroll position carries over from the page you came from.
    if (navigated.current && !window.location.hash) {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    }
    navigated.current = true;

    // Elements that read the scroll values. Each belongs to its nearest [data-scroll] ancestor.
    const CONSUMERS =
      ".hero-exit, .hero-aurora, .hero-previews, .hero-showcase, .grow-in, .parallax-img, .big-row-left, .big-row-right, .scrub-word, .footer-name";
    type Tracked = { el: HTMLElement; targets: HTMLElement[]; top: number; height: number; last: string };
    type Pinned = { el: HTMLElement; targets: HTMLElement[]; top: number; height: number; last: string };
    let tracked: Tracked[] = [];
    let pinned: Pinned[] = [];
    let vh = window.innerHeight;
    let lastY = window.scrollY;

    // Reads only. Positions are stored relative to the document, so scrolling needs no re-measure.
    const measure = () => {
      vh = window.innerHeight;
      const y = window.scrollY;
      const vw = document.documentElement.clientWidth;
      const widths: number[] = [];
      pinned = [...document.querySelectorAll<HTMLElement>("[data-hscroll]")].map((el) => {
        const track = el.querySelector<HTMLElement>("[data-hscroll-track]");
        widths.push(track ? Math.max(0, track.scrollWidth - vw) : 0);
        const r = el.getBoundingClientRect();
        const targets = [...el.querySelectorAll<HTMLElement>("[data-hscroll-track], .hscroll-bar")];
        return { el, targets, top: r.top + y, height: r.height, last: "" };
      });
      tracked = [...document.querySelectorAll<HTMLElement>("[data-scroll]")].map((el) => {
        const r = el.getBoundingClientRect();
        const targets = [el, ...el.querySelectorAll<HTMLElement>(CONSUMERS)].filter(
          (c) => c.matches(CONSUMERS) && (c === el || c.parentElement?.closest("[data-scroll]") === el),
        );
        return { el, targets, top: r.top + y, height: r.height || 1, last: "" };
      });
      // Writes after all reads. --hx only changes on resize, so it can stay inherited.
      pinned.forEach((p, i) => p.el.style.setProperty("--hx", `${widths[i]}px`));
      tracked = tracked.filter((t) => t.targets.length > 0);
    };

    // Arithmetic + writes only; no layout reads.
    const update = () => {
      const y = window.scrollY;
      for (const t of tracked) {
        const top = t.top - y;
        if (top + t.height < -vh || top > vh * 2) continue;
        const p = clamp((vh - top) / (vh + t.height)).toFixed(3);
        const enter = clamp((vh - top) / vh).toFixed(3);
        const exit = clamp(-top / t.height).toFixed(3);
        const inn = clamp((vh - top) / t.height).toFixed(3);
        const key = p + enter + exit + inn;
        if (key === t.last) continue;
        t.last = key;
        for (const target of t.targets) {
          const s = target.style;
          s.setProperty("--p", p);
          s.setProperty("--enter", enter);
          s.setProperty("--exit", exit);
          s.setProperty("--in", inn);
        }
      }
      for (const pin of pinned) {
        const travel = pin.height - vh;
        const ph = travel > 0 ? clamp((y - pin.top) / travel).toFixed(4) : "0";
        if (ph === pin.last) continue;
        pin.last = ph;
        for (const target of pin.targets) target.style.setProperty("--ph", ph);
      }
      if (header) {
        if (y > 240 && y > lastY + 4) header.setAttribute("data-hidden", "");
        else if (y < lastY - 4 || y <= 240) header.removeAttribute("data-hidden");
      }
      lastY = y;
    };

    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const remeasure = () => {
      measure();
      // The pinned section's height depends on --hx, so measure once more after it applies.
      requestAnimationFrame(() => {
        measure();
        update();
      });
    };

    remeasure();
    // With Lenis, update inside its frame (a window scroll listener would lag one frame behind).
    if (lenis) lenis.on("scroll", update);
    else window.addEventListener("scroll", schedule, { passive: true });
    // Freeze the page behind dialogs (e.g. the contact menu).
    const stop = () => lenis?.stop();
    const start = () => lenis?.start();
    window.addEventListener("modal:open", stop);
    window.addEventListener("modal:close", start);
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);
    // Images loading or content reflowing changes the page height: re-measure.
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) > 2) {
        lastHeight = h;
        remeasure();
      }
    });
    ro.observe(document.body);

    return () => {
      lenis?.destroy();
      window.removeEventListener("modal:open", stop);
      window.removeEventListener("modal:close", start);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Pointer effects: spotlight, tilt, magnetic buttons, hero parallax.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let x = -9999;
    let y = -9999;
    let target: Element | null = null;
    let glow: HTMLElement | null = null;
    let spot: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    // Only the element under the pointer is touched; the previous one is reset.
    const follow = (el: HTMLElement | null, prev: HTMLElement | null) => {
      if (prev && prev !== el) {
        prev.style.removeProperty("--mx");
        prev.style.removeProperty("--my");
      }
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
      }
      return el;
    };

    const update = () => {
      frame = 0;
      glow = follow(target?.closest<HTMLElement>(".glow-card") ?? null, glow);
      spot = follow(target?.closest<HTMLElement>(".spotlight") ?? null, spot);
      if (reduce) return;

      const previews = document.querySelector<HTMLElement>(".hero-previews");
      if (previews && previews.offsetParent) {
        previews.style.setProperty("--cx", ((x / window.innerWidth) * 2 - 1).toFixed(3));
        previews.style.setProperty("--cy", ((y / window.innerHeight) * 2 - 1).toFixed(3));
      }

      const nextMagnet = target?.closest<HTMLElement>(".magnetic") ?? null;
      if (magnet && magnet !== nextMagnet) magnet.style.translate = "";
      magnet = nextMagnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnet.style.translate = `${(x - r.left - r.width / 2) * 0.3}px ${(y - r.top - r.height / 2) * 0.4}px`;
      }

      const nextTilt = target?.closest<HTMLElement>(".tilt") ?? null;
      if (tilt && tilt !== nextTilt) {
        tilt.style.removeProperty("--rx");
        tilt.style.removeProperty("--ry");
      }
      tilt = nextTilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        tilt.style.setProperty("--rx", `${((y - r.top) / r.height - 0.5) * -8}deg`);
        tilt.style.setProperty("--ry", `${((x - r.left) / r.width - 0.5) * 8}deg`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      target = e.target instanceof Element ? e.target : null;
      schedule();
    };
    const onLeave = () => {
      target = null;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
