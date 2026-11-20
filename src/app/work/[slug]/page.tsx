import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container, Tag } from "@/components/ui";
import { mailto } from "@/content/profile";
import { caseStudies, getCaseStudy } from "@/content/work";

// Only the case studies listed in content/work.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.client}: ${study.title}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      title: `${study.client}: ${study.title}`,
      description: study.summary,
      // The site-wide PNG preview; LinkedIn doesn't reliably show WebP previews.
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const facts = [
    { label: "Client", value: study.client },
    { label: "Location", value: study.location },
    { label: "Year", value: study.year },
    { label: "Role", value: study.role },
  ];

  return (
    <article>
      <div className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative pt-32 pb-12 sm:pt-40">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden /> All work
          </Link>
          <h1 className="rise mt-8 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tighter text-balance sm:text-6xl">
            {study.title}
          </h1>
          <p className="rise rise-2 mt-6 max-w-2xl text-lg leading-relaxed text-muted">{study.summary}</p>

          <dl className="rise rise-3 mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      <Container>
        <div className="rise rise-4 overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            width={1440}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>
      </Container>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section aria-labelledby="brief" data-reveal>
            <h2 id="brief" className="text-xl font-semibold tracking-tight">
              The brief
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{study.brief}</p>
          </section>
          <section aria-labelledby="built" data-reveal>
            <h2 id="built" className="text-xl font-semibold tracking-tight">
              What I built
            </h2>
            <ul className="mt-5 space-y-4">
              {study.built.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15">
                    <Check className="size-3.5 text-accent" aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside data-reveal className="space-y-8 lg:border-l lg:border-line lg:pl-10">
          <div>
            <h2 className="font-mono text-xs tracking-wider text-muted uppercase">Built with</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
          </div>
          {study.liveUrl && (
            <ButtonLink href={study.liveUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              Visit the live site <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          )}
        </aside>
      </Container>

      {study.testimonial && (
        <Container className="pb-16">
          <figure data-reveal className="mx-auto max-w-3xl text-center">
            <blockquote className="text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-muted">
              {study.testimonial.name}, {study.testimonial.role}
            </figcaption>
          </figure>
        </Container>
      )}

      {study.gallery.length > 0 && (
        <Container className="pb-20">
          <div className="grid gap-8 md:grid-cols-2">
            {study.gallery.map((img) => (
              <figure key={img.src} data-reveal>
                <div className="overflow-hidden rounded-xl border border-line bg-surface">
                  <Image src={img.src} alt={img.alt} width={1440} height={900} className="h-auto w-full" />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      )}

      <section className="border-t border-line py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-xl font-semibold tracking-tight">Want a website like this for your business?</p>
          <ButtonLink href={mailto(`Website like ${study.client}`)}>Start a project</ButtonLink>
        </Container>
      </section>
    </article>
  );
}
