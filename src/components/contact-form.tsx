"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

/**
 * Project enquiry form. Sends straight from the browser to Web3Forms, which emails it to you;
 * no server needed. Spam: a hidden "botcheck" box that bots tick and Web3Forms rejects.
 */
const KINDS = ["Business", "Agency", "Other"];
const TYPES = ["New website", "Landing page", "Design to code", "Something else"];
const TIMELINES = ["As soon as possible", "In 1–2 months", "Just exploring"];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] outline-none focus:border-accent focus:ring-4 focus:ring-accent/10";

function Pills({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label
            key={o}
            className="cursor-pointer rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm transition-colors select-none hover:border-ink/40 has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:ring-4 has-focus-visible:ring-accent/20"
          >
            <input type="radio" name={name} value={o} defaultChecked={i === 0} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}

export function ContactForm({ accessKey, email }: { accessKey: string; email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [sender, setSender] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!accessKey || accessKey.startsWith("TODO")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry: ${data.type} (${data.kind}) from ${data.name}`,
          from_name: "Portfolio contact form",
          name: data.name,
          email: data.email,
          "I'm a": data.kind,
          Project: data.type,
          Timeline: data.timeline,
          message: data.message,
          botcheck: data.botcheck ?? "",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Not sent");
      setSender(data.name.split(" ")[0]);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-sent flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center shadow-sm">
        <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-lg">
          <Check className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Thanks{sender ? `, ${sender}` : ""}!</h3>
        <p className="mt-2 max-w-xs text-muted" role="status">
          Your message is on its way. I&apos;ll reply within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-2xl border border-line bg-surface p-6 text-left shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="cf-name">Your name</Label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Jane Smith" className={field} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cf-email">Email</Label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={field}
          />
        </div>
      </div>

      <Pills name="kind" legend="I'm a" options={KINDS} />
      <Pills name="type" legend="Project" options={TYPES} />
      <Pills name="timeline" legend="Timeline" options={TIMELINES} />

      <div className="grid gap-2">
        <Label htmlFor="cf-message">Tell me about it</Label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="What does your business do, what should the site include, any links or designs…"
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-fill inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-shadow hover:shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_60%,transparent)] disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              Sending <LoaderCircle className="size-4 animate-spin" aria-hidden />
            </>
          ) : (
            <>
              Send message <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
        <p className="text-xs text-muted">Replies within one working day.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Sorry, that didn&apos;t send. Please email me directly at{" "}
          <a href={`mailto:${email}`} className="font-medium underline">
            {email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
