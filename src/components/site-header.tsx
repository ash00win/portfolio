"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { mailto, profile } from "@/content/profile";
import { ButtonLink } from "./ui";

const nav = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
];

const initials = profile.name
  .split(" ")
  .map((part) => part.charAt(0))
  .join("");

/**
 * Floating pill navigation.
 * - a highlight slides to the hovered link, and rests on the section you're reading (scroll spy)
 * - the pill gets slimmer once you scroll; it slides away while scrolling down (see Effects)
 * - phones get a full-screen menu with large staggered links
 */
export function SiteHeader() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Close the menu when the route changes (adjusting state during render, as React recommends).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  // Only the home page has these sections.
  const current = pathname === "/" ? active : null;

  // Scroll spy: which section is in the middle of the screen.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  // Slimmer pill once you've scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move the highlight to the hovered link, else the active one.
  const target = hovered ?? current;
  useEffect(() => {
    const link = target ? listRef.current?.querySelector<HTMLElement>(`[data-id="${target}"]`) : null;
    setPill(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
  }, [target, scrolled]);

  // Mobile menu: lock scrolling, close on Escape and on route change.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.dispatchEvent(new Event("modal:open"));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.dispatchEvent(new Event("modal:close"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="scroll-progress fixed! inset-x-0 top-0 bottom-auto! z-50" aria-hidden />
      <header
        id="site-header"
        data-menu={open ? "" : undefined}
        className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-4"
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full border bg-surface/80 py-2 pr-2 pl-2.5 backdrop-blur-md transition-[max-width,height,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "h-14 max-w-4xl border-line shadow-[0_12px_40px_-12px_rgb(12_12_13/0.25)]"
              : "h-16 max-w-6xl border-line/70 shadow-[0_8px_32px_-16px_rgb(12_12_13/0.15)]"
          } ${open ? "border-line! shadow-none!" : ""}`}
        >
          <Link href="/" className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight">
            <span className="relative">
              <span
                className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-on-primary transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_20px_-6px_rgb(12_12_13/0.45)]"
                aria-hidden
              >
                {initials}
              </span>
              <span className="absolute -right-0.5 -bottom-0.5 grid size-3 place-items-center rounded-full bg-surface" aria-hidden>
                <span className="pulse block size-2 rounded-full bg-accent" />
              </span>
            </span>
            <span className="leading-tight">
              {profile.name}
              <span className="block text-xs font-normal text-muted">{profile.role}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul ref={listRef} className="relative flex items-center text-sm" onMouseLeave={() => setHovered(null)}>
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-full bg-tint transition-[left,width,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 } as CSSProperties}
              />
              {nav.map((item) => {
                const isActive = current === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      data-id={item.id}
                      onMouseEnter={() => setHovered(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
                        isActive || hovered === item.id ? "text-ink" : "text-muted"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[scale,opacity] duration-300 ${
                          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href={mailto("Website project")} className="magnetic">
                Start a project
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full bg-primary text-on-primary md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        data-open={open ? "" : undefined}
        className="mobile-menu fixed inset-0 z-30 flex flex-col bg-paper px-6 pt-28 pb-10 md:hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <p className="font-mono text-xs tracking-wider text-muted uppercase">Menu</p>
        <ul className="mt-6 space-y-1">
          {[...nav, { id: "faq", label: "FAQ" }, { id: "contact", label: "Contact" }].map((item, i) => (
            <li key={item.id} className="mask block">
              <Link
                href={`/#${item.id}`}
                onClick={() => setOpen(false)}
                className="mask-inner flex items-baseline gap-4 py-1 text-5xl font-semibold tracking-tighter"
                style={{ "--w": i } as CSSProperties}
              >
                <span className="font-mono text-xs font-normal tracking-normal text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot mt-auto border-t border-line pt-6">
          <a href={mailto()} onClick={() => setOpen(false)} className="text-lg font-medium">
            {profile.email}
          </a>
          <div className="mt-4 flex gap-5 text-sm text-muted">
            <a href={profile.linkedin} className="inline-flex items-center gap-1">
              LinkedIn <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
            {profile.github && (
              <a href={profile.github} className="inline-flex items-center gap-1">
                GitHub <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
