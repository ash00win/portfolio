"use client";

import { Check, Copy, Mail, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Draft = { to: string; subject: string; href: string };

/**
 * Every `mailto:` link on the site opens this menu instead of relying on a desktop email app
 * (many people, especially on Windows, have none set up, so mailto links silently do nothing).
 * It offers Gmail, Outlook, the default email app, copying the address, and WhatsApp.
 * Without JavaScript the plain mailto links still work.
 */
export function ContactMenu({ whatsappUrl }: { whatsappUrl: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="mailto:"]') : null;
      if (!link || link.hasAttribute("data-direct")) return;
      e.preventDefault();
      const url = new URL(link.href);
      setDraft({ to: decodeURIComponent(url.pathname), subject: url.searchParams.get("subject") ?? "", href: link.href });
      setCopied(false);
      dialogRef.current?.showModal();
      window.dispatchEvent(new Event("modal:open"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialogRef.current?.close();

  const copy = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.to);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address is shown in the dialog, so it can still be selected.
    }
  };

  const to = encodeURIComponent(draft?.to ?? "");
  const subject = encodeURIComponent(draft?.subject ?? "");
  const options = [
    { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`, external: true },
    { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}`, external: true },
    { label: "Email app", href: draft?.href ?? "", external: false },
  ];
  const optionClass =
    "group flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5 font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper";

  return (
    <dialog
      ref={dialogRef}
      onClose={() => window.dispatchEvent(new Event("modal:close"))}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // click on the backdrop
      }}
      className="contact-menu m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-line bg-paper p-0 text-ink shadow-2xl"
      aria-labelledby="contact-menu-title"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wider text-muted uppercase">Get in touch</p>
            <h2 id="contact-menu-title" className="mt-2 text-2xl font-semibold tracking-tight">
              How would you like to write?
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-tint"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <ul className="mt-6 grid gap-2">
          {options.map((o) => (
            <li key={o.label}>
              <a
                href={o.href}
                data-direct
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={close}
                className={optionClass}
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-4 text-accent group-hover:text-paper" aria-hidden />
                  {o.label === "Email app" ? "Use my email app" : `Open in ${o.label}`}
                </span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </li>
          ))}
          {whatsappUrl && (
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={close} className={optionClass}>
                <span className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-accent group-hover:text-paper" aria-hidden />
                  Message on WhatsApp
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
          )}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-tint px-4 py-3">
          <span className="truncate font-mono text-sm select-all">{draft?.to}</span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:text-accent"
          >
            {copied ? <Check className="size-4 text-accent" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
