import type { LucideIcon } from "lucide-react";
import { Code2, Gauge, Languages, LayoutTemplate, Rocket, Wrench } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Only list what you can deliver today. Add Webflow / WordPress once you've built with them.
export const services: Service[] = [
  {
    title: "Business websites",
    description:
      "Designed and built from scratch: a fast, mobile-first site that explains what you do and makes it easy to contact you, with WhatsApp, quote forms and maps where they help.",
    icon: LayoutTemplate,
  },
  {
    title: "Design to code",
    description:
      "Send me the Figma file. I build it in React or Next.js with Tailwind CSS, matching the design at every screen size.",
    icon: Code2,
  },
  {
    title: "Landing pages",
    description: "Campaign, launch and product pages, built to the design and tested before you see them.",
    icon: Rocket,
  },
  {
    title: "Bilingual & RTL sites",
    description:
      "English with Arabic (right to left) or other languages, with fonts that load only the characters each page uses.",
    icon: Languages,
  },
  {
    title: "Speed & SEO basics",
    description:
      "Lighthouse audits, image and font optimisation, titles, descriptions, social previews, sitemap and Google Analytics 4.",
    icon: Gauge,
  },
  {
    title: "Updates & web apps",
    description:
      "Changes to existing sites, plus the parts that need a backend: dashboards, logins and APIs in Node.js or Django.",
    icon: Wrench,
  },
];

// The two kinds of people the site is for.
export const audiences = [
  {
    eyebrow: "For businesses",
    title: "You need a website that brings in enquiries",
    points: [
      "Designed and built for you, from first sketch to launch",
      "Looks right and loads fast on phones, where most visitors are",
      "WhatsApp, quote forms and Google reviews wired in",
      "Your domain, your hosting, your code: nothing locked to me",
      "A fixed quote agreed before any work starts",
    ],
    cta: { label: "Start a project", subject: "Website project" },
  },
  {
    eyebrow: "For agencies & studios",
    title: "You have the designs and need them built well",
    points: [
      "Pixel-accurate builds from Figma in React, Next.js and Tailwind",
      "Clean, readable code in your repo, following your conventions",
      "A short written update every working day",
      "White-label: your client never hears from me",
      "Available part-time for ongoing or one-off projects",
    ],
    cta: { label: "Talk about a project", subject: "Agency project" },
  },
];
