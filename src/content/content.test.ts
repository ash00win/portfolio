import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { caseStudies } from "./work";

const publicFile = (src: string) => join(process.cwd(), "public", src);

describe("profile", () => {
  it("has a valid site URL and LinkedIn URL", () => {
    expect(() => new URL(profile.siteUrl)).not.toThrow();
    expect(() => new URL(profile.linkedin)).not.toThrow();
  });

  it("has an email address shaped like one", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

describe("case studies", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("only reference images that exist, each with alt text", () => {
    for (const c of caseStudies) {
      for (const img of [c.cover, ...c.gallery]) {
        expect(existsSync(publicFile(img.src)), `${img.src} is missing`).toBe(true);
        expect(img.alt.length, `${img.src} needs alt text`).toBeGreaterThan(10);
      }
    }
  });

  it("have valid live URLs", () => {
    for (const c of caseStudies) if (c.liveUrl) expect(() => new URL(c.liveUrl!)).not.toThrow();
  });
});
