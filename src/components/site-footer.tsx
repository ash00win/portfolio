import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { mailto, profile } from "@/content/profile";
import { HomeLink } from "./home-link";
import { ButtonLink, Container } from "./ui";

const sitemap = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

const initials = profile.name
  .split(" ")
  .map((part) => part.charAt(0))
  .join("");

/** Dark footer: brand, sitemap, contact links, and a faint wordmark cropped by the page edge. */
export function SiteFooter() {
  const connect = [
    { href: mailto(), label: "Email" },
    { href: profile.linkedin, label: "LinkedIn" },
    ...(profile.github ? [{ href: profile.github, label: "GitHub" }] : []),
  ];
  const linkClass = "inline-block py-1.5 text-on-primary/70 transition-colors hover:text-on-primary";

  return (
    <footer className="relative overflow-hidden bg-primary text-sm text-on-primary">
      <div className="aurora opacity-30" aria-hidden />
      <Container className="relative pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <HomeLink className="inline-flex items-center gap-3 text-base font-semibold tracking-tight">
              <span
                className="grid size-10 place-items-center rounded-full bg-on-primary text-xs font-bold text-ink"
                aria-hidden
              >
                {initials}
              </span>
              {profile.name}
            </HomeLink>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-on-primary/70">
              Fast, mobile-first websites for businesses and agencies. Based in {profile.location}, working worldwide.
            </p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-on-primary/15 px-3 py-1.5 text-on-primary/80">
              <span className="pulse size-2 rounded-full bg-accent" aria-hidden />
              Available for new projects
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="font-mono text-xs tracking-wider text-on-primary/50 uppercase">Sitemap</p>
            <ul className="mt-3 space-y-1">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-wider text-on-primary/50 uppercase">Connect</p>
            <ul className="mt-3 space-y-1">
              {connect.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={mailto("Website project")}
              className="magnetic mt-8 bg-on-primary! text-ink! hover:text-white!"
            >
              Start a project <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        {/* Bottom bar: copyright and a round back-to-top button, small uppercase mono. */}
        <div className="mt-14 grid items-center gap-4 border-t border-on-primary/10 py-6 font-mono text-xs tracking-[0.14em] text-on-primary/50 uppercase sm:grid-cols-2">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a
            href="#main"
            className="group inline-flex items-center gap-3 transition-colors hover:text-on-primary sm:justify-self-end"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-on-primary/20 transition-colors duration-300 group-hover:border-on-primary group-hover:bg-on-primary group-hover:text-ink">
              <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </a>
        </div>
      </Container>

      {/* Faint wordmark, cropped by the bottom of the page; it rises into place as you arrive. */}
      <div data-scroll className="footer-mark-wrap relative select-none" aria-hidden>
        <p className="footer-name text-center">{profile.name}</p>
      </div>
    </footer>
  );
}
