"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Link to the home page. Already on the home page, a plain link to "/" does nothing,
 * so instead it scrolls smoothly back to the top (and clears any #section from the URL).
 */
export function HomeLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (pathname !== "/" || e.defaultPrevented) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        if (window.location.hash) history.replaceState(null, "", "/");
      }}
    />
  );
}
