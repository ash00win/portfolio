import { ArrowRight, ArrowUpRight, Check, MessageCircle, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { HeroVisual } from "@/components/hero-visual";
import { Marquee } from "@/components/marquee";
import { ProjectArt } from "@/components/project-art";
import { ScrubText } from "@/components/scrub-text";
import { SplitText } from "@/components/split-text";
import { ButtonLink, Container, Eyebrow, Section, SectionHeading, Tag } from "@/components/ui";
import { skillGroups, timeline } from "@/content/experience";
import { faq } from "@/content/faq";
import { qaChecklist, steps } from "@/content/process";
import { mailto, profile, whatsappUrl } from "@/content/profile";
import { projects } from "@/content/projects";
import { audiences, services } from "@/content/services";
import { caseStudies } from "@/content/work";

/** Stagger step for `[data-reveal]` animations. */
const d = (i: number) => ({ "--d": i }) as CSSProperties;

const bigWords = ["Mobile-first", "Pixel-accurate", "Fast by default", "Search-ready", "Built to convert"];
const bigRow = (words: string[]) => [...words, ...words].join("  ·  ");

const toolbox = ["React", "Next.js", "Tailwind CSS", "JavaScript", "Node.js", "Django", "PostgreSQL", "Git"];

const heroPoints = ["Fixed quotes", "Replies within a day", "Mobile-first and search-ready"];

const nextSteps = [
  { title: "I reply within one working day", text: "With a few questions, or a quick call if it's easier." },
  { title: "You get a fixed quote", text: "A clear price and timeline, agreed before any work starts." },
  { title: "We start building", text: "You'll see a live preview link early and get regular updates." },
];

const checkIcon = (
  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15">
    <Check className="size-3.5 text-accent" aria-hidden />
  </span>
);

export default function Home() {
  const address = { "@type": "PostalAddress", addressLocality: "Thrissur", addressRegion: "Kerala", addressCountry: "IN" };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        url: profile.siteUrl,
        email: `mailto:${profile.email}`,
        address,
        sameAs: [profile.linkedin, profile.github].filter(Boolean),
        knowsAbout: ["Web development", "React", "Next.js", "Tailwind CSS", "Responsive design", "SEO"],
      },
      {
        "@type": "ProfessionalService",
        name: `${profile.name}, web developer`,
        url: profile.siteUrl,
        email: profile.email,
        description: profile.seo.description,
        founder: { "@id": `${profile.siteUrl}/#person` },
        address,
        areaServed: "Worldwide",
        serviceType: services.map((s) => s.title),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  const whatsapp = whatsappUrl();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero: words rise on load; the whole block drifts back and fades as you scroll past. */}
      <section data-scroll className="spotlight relative overflow-hidden">
        <div className="aurora hero-aurora" aria-hidden />
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="spotlight-layer" aria-hidden />

        {/* Centred hero: status, headline, intro, actions and trust points; the showcase below tilts into place. */}
        <div className="relative mx-auto w-full max-w-6xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24 lg:px-8">
          <div className="hero-exit relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-sm text-muted shadow-sm">
              <span className="pulse size-2 rounded-full bg-accent" aria-hidden />
              {profile.status}
            </p>
            <h1 className="split-load mt-8 text-5xl leading-[1.02] font-semibold tracking-tighter sm:text-7xl lg:text-[5.5rem]">
              <span className="sr-only">{profile.name}, freelance web developer. </span>
              <SplitText text="Sharp websites," />
              <br />
              <SplitText text="built to perform." start={2} innerClassName="text-gradient pr-1" />
            </h1>
            <p className="rise rise-2 mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{profile.intro}</p>
            <div className="rise rise-3 mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={mailto("Website project")} className="magnetic">
                Start a project <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary" className="magnetic">
                See my work <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              {whatsapp && (
                <ButtonLink href={whatsapp} variant="ghost" className="magnetic">
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp me
                </ButtonLink>
              )}
            </div>
            <ul className="rise rise-4 mt-8 flex flex-col items-center gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
              {heroPoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-accent" aria-hidden /> {point}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual />
        </div>

        <div className="relative border-y border-line bg-surface/70">
          <Marquee items={profile.stack} />
        </div>
      </section>

      {/* Statement: the words light up one by one as it scrolls past. */}
      <section data-scroll className="pt-16 pb-6 sm:pt-24 sm:pb-10">
        <Container>
          <div data-reveal>
            <Eyebrow>What I do</Eyebrow>
          </div>
          <p className="mt-6 text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
            <ScrubText text="I design and build websites that *load* *fast,* look sharp on every screen and turn visitors into *customers.* For businesses that need one, and agencies that need a hand." />
          </p>
        </Container>
      </section>

      {/* Work: the screenshot wipes in, grows to full size and parallaxes inside its frame. */}
      <Section id="work">
        <SectionHeading
          eyebrow="Selected work"
          title="Client websites"
          intro="Designed and built from the first sketch to launch, for a real business."
        />
        <div className="mt-10 grid gap-16 sm:mt-12">
          {caseStudies.map((study) => (
            <div key={study.slug} data-scroll className="grow-in origin-top">
              <article className="group glow-card rounded-3xl p-3 sm:p-4">
                <Link href={`/work/${study.slug}/`} className="block" tabIndex={-1} aria-hidden>
                  <div className="overflow-hidden rounded-2xl border border-line bg-paper">
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                      {study.liveUrl && (
                        <span className="mx-auto truncate rounded-md bg-tint px-3 py-1 font-mono text-xs text-muted">
                          {new URL(study.liveUrl).hostname.replace(/^www\./, "")}
                        </span>
                      )}
                    </div>
                    <div data-reveal="image" data-scroll className="overflow-hidden">
                      <div>
                        <Image
                          src={study.cover.src}
                          alt=""
                          width={1440}
                          height={900}
                          sizes="(min-width: 1152px) 72rem, 100vw"
                          className="parallax-img h-auto w-full"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="grid gap-6 p-4 pt-8 sm:p-6 sm:pt-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div data-reveal>
                      <Eyebrow>
                        {study.client} · {study.location} · {study.year}
                      </Eyebrow>
                    </div>
                    <h3
                      data-reveal="split"
                      className="mt-3 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl"
                    >
                      <SplitText text={study.title} />
                    </h3>
                    <div data-reveal style={d(3)} className="mt-6 flex flex-wrap gap-3">
                      <ButtonLink href={`/work/${study.slug}/`} variant="secondary" className="magnetic">
                        Read the case study <ArrowRight className="size-4" aria-hidden />
                        <span className="sr-only">: {study.client}</span>
                      </ButtonLink>
                      {study.liveUrl && (
                        <ButtonLink href={study.liveUrl} variant="ghost" className="magnetic">
                          Visit the site <ArrowUpRight className="size-4" aria-hidden />
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-5" data-reveal="right" style={d(2)}>
                    <p className="leading-relaxed text-muted">{study.summary}</p>
                    {study.testimonial && (
                      <blockquote className="mt-5 border-l-2 border-accent pl-4">
                        <p className="leading-relaxed">&ldquo;{study.testimonial.quote}&rdquo;</p>
                        <footer className="mt-2 text-sm text-muted">
                          {study.testimonial.name}, {study.testimonial.role}
                        </footer>
                      </blockquote>
                    )}
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {study.highlights.map((h) => (
                        <li key={h}>
                          <Tag>{h}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Section>

      {/* Big scroll-driven words: one row slides left, the outlined one slides right. */}
      <section data-scroll className="overflow-hidden border-y border-line py-10 sm:py-14" aria-hidden>
        <p className="big-row big-row-left">{bigRow(bigWords)}</p>
        <p className="big-row big-row-outline big-row-right mt-2">{bigRow([...bigWords].reverse())}</p>
      </section>

      {/* Services */}
      <Section id="services">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="What I can build for you"
            intro="From a first website for your business to extra development hands for your agency."
          />
          <div data-reveal="right">
            <ButtonLink href={mailto("Is this a fit?")} variant="secondary" className="magnetic shrink-0">
              Not sure? Ask me <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon }, i) => (
            <li key={title} data-reveal style={d(i % 3)} className="group tilt glow-card flex flex-col rounded-2xl p-5 sm:p-7">
              <div className="flex items-center gap-3 sm:items-start sm:justify-between">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-tint text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 sm:size-11">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold tracking-tight sm:hidden">{title}</h3>
                <span className="ml-auto font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 hidden text-lg font-semibold tracking-tight sm:block">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted sm:mt-2">{description}</p>
              <span
                className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Two audiences: businesses (light card) and agencies (dark card). */}
      <section id="who" className="pb-16 sm:pb-24">
        <Container className="grid gap-4 lg:grid-cols-2">
          {audiences.map((a, i) => {
            const dark = i === 1;
            return (
              <div
                key={a.eyebrow}
                data-reveal={dark ? "right" : "left"}
                className={`spotlight relative flex flex-col overflow-hidden rounded-3xl border p-6 sm:p-10 ${
                  dark ? "border-transparent bg-primary text-on-primary" : "border-line bg-surface"
                }`}
              >
                {dark ? <div className="aurora opacity-40" aria-hidden /> : <div className="spotlight-layer" aria-hidden />}
                <div className="relative flex flex-1 flex-col">
                  <p
                    className={`font-mono text-xs tracking-wider uppercase ${dark ? "text-on-primary/60" : "text-muted"}`}
                  >
                    {a.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
                    {a.title}
                  </h3>
                  <ul className="mt-8 space-y-3">
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        {dark ? (
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-on-primary/15">
                            <Check className="size-3.5 text-on-primary" aria-hidden />
                          </span>
                        ) : (
                          checkIcon
                        )}
                        <span className={dark ? "text-on-primary/85" : ""}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <ButtonLink
                      href={mailto(a.cta.subject)}
                      className={`magnetic ${dark ? "bg-surface! text-ink! hover:text-white!" : ""}`}
                    >
                      {a.cta.label} <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Process: on desktop the section pins and the steps scroll sideways. */}
      <section id="process" data-hscroll className="hscroll border-t border-line bg-surface">
        <div className="hscroll-sticky py-16 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Process"
                title="Simple, from first chat to launch"
                intro="No jargon and no surprises. This is how every website project runs."
              />
              <p className="hidden shrink-0 font-mono text-xs tracking-wider text-muted uppercase lg:block">Scroll →</p>
            </div>
          </Container>
          <ol
            data-hscroll-track
            className="hscroll-track mx-auto mt-12 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8"
          >
            {steps.map((step, i) => (
              <li key={step.title} data-reveal style={d(i)} className="tilt glow-card flex flex-col rounded-3xl p-6 sm:p-8">
                <span className="text-gradient text-5xl font-semibold tracking-tighter sm:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight sm:mt-10 sm:text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
          <Container className="mt-12">
            <div className="h-px bg-line">
              <div className="hscroll-bar h-px bg-gradient-to-r from-accent to-accent-2" />
            </div>
          </Container>
        </div>
      </section>

      {/* QA checklist + skills */}
      <section className="bg-surface pb-16 sm:pb-24 lg:pt-4">
        <Container className="grid gap-4 lg:grid-cols-2">
          <div data-reveal="left" className="tilt glow-card rounded-2xl p-6 sm:p-9">
            <h3 className="text-xl font-semibold tracking-tight">Every site ships with</h3>
            <p className="mt-1 text-muted">The checklist I run before you see anything.</p>
            <ul className="mt-6 space-y-3">
              {qaChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  {checkIcon}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right" className="tilt glow-card rounded-2xl p-6 sm:p-9">
            <h3 className="text-xl font-semibold tracking-tight">Skills & tools</h3>
            <p className="mt-1 text-muted">What I&apos;ve used in real, shipped projects.</p>
            <dl className="mt-6 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.title} className="border-l-2 border-accent/40 pl-4">
                  <dt className="font-medium">{group.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{group.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Beyond websites: the web apps, as three equal overview cards. */}
      <Section id="projects">
        <SectionHeading
          eyebrow="Beyond websites"
          title="I build web apps too"
          intro="When a site needs logins, dashboards or a database, I can build that part as well."
        />
        <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.name} data-reveal style={d(i)} className="group tilt glow-card flex flex-col rounded-2xl p-3">
              <ProjectArt kind={p.art} />
              <div className="flex flex-1 flex-col p-3 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <Eyebrow>{p.kind}</Eyebrow>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {p.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* About: minimal two columns. Left: who + key facts (sticky on desktop). Right: story, experience, tools. */}
      <section id="about" className="border-t border-line bg-surface py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-reveal>
                <Eyebrow>About</Eyebrow>
              </div>
              <h2
                data-reveal="split"
                className="mt-4 text-4xl leading-tight font-semibold tracking-tighter sm:text-6xl"
              >
                <SplitText text="Hi, I'm" />{" "}
                <SplitText text={`${profile.name.split(" ")[0]}.`} start={2} innerClassName="text-gradient pr-1" />
              </h2>
              <dl data-reveal style={d(1)} className="mt-10 border-t border-line">
                {profile.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                    <dt className="font-mono text-xs tracking-wider text-muted uppercase">{f.label}</dt>
                    <dd className="text-right font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((p, i) => (
                <p key={p} data-reveal style={d(i)} className={i === 0 ? "text-xl text-ink sm:text-2xl sm:leading-snug" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-14">
              <Eyebrow>Experience</Eyebrow>
              <ol className="mt-4 border-t border-line">
                {timeline.map((t) => (
                  <li
                    key={t.title}
                    className="group grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-xs leading-6 text-muted">{t.when}</span>
                    <div>
                      <p className="font-semibold tracking-tight transition-colors group-hover:text-accent">{t.title}</p>
                      <p className="text-sm text-muted">{t.org}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal className="mt-12">
              <Eyebrow>Tools I use</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2">
                {toolbox.map((tool) => (
                  <li key={tool}>
                    <Tag>{tool}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="FAQ" title="Questions people ask" />
          </div>
          <div className="lg:col-span-7">
            {faq.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                style={d(i)}
                className="group border-b border-line py-5 first:border-t [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="-my-2 flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-2 text-base font-medium tracking-tight transition-colors hover:text-accent sm:text-lg">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="faq-answer mt-3 max-w-xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="pb-16 sm:pb-24">
        <Container>
          <div
            data-reveal="scale"
            className="spotlight relative overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <div className="aurora" aria-hidden />
            <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
            <div className="spotlight-layer" aria-hidden />
            <div className="relative grid gap-10 px-4 py-10 sm:px-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-14">
              <div className="flex flex-col">
                <Eyebrow>Contact</Eyebrow>
                <h2
                  data-reveal="split"
                  className="mt-4 text-4xl leading-tight font-semibold tracking-tighter text-balance sm:text-5xl"
                >
                  <SplitText text="Got a website in mind?" />{" "}
                  <SplitText text="Let's build it." start={5} innerClassName="text-gradient" />
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                  Share a few details about your business or send over your designs. I&apos;ll reply within one working
                  day with a clear, fixed quote and timeline. I take on a limited number of projects at a time, so
                  yours gets my full attention.
                </p>

                {/* What happens after sending: fills the column and answers "then what?". */}
                <div className="mt-10">
                  <p className="font-mono text-xs tracking-wider text-muted uppercase">What happens next</p>
                  <ol className="mt-5 space-y-5">
                    {nextSteps.map((step, i) => (
                      <li
                        key={step.title}
                        className="relative flex gap-4 not-last:after:absolute not-last:after:top-9 not-last:after:-bottom-4 not-last:after:left-3.75 not-last:after:w-px not-last:after:bg-line"
                      >
                        <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-xs font-medium shadow-sm">
                          {i + 1}
                        </span>
                        <div className="pt-1">
                          <p className="font-medium tracking-tight">{step.title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-10 lg:mt-auto lg:pt-10">
                  <p className="font-mono text-xs tracking-wider text-muted uppercase">Prefer email?</p>
                  <p className="mt-2 text-xl font-medium tracking-tight break-all sm:text-2xl">
                    <a
                      href={mailto()}
                      className="bg-gradient-to-r from-accent to-accent-2 bg-[length:0%_2px] bg-[position:left_bottom] bg-no-repeat pb-1 transition-[background-size] duration-500 hover:bg-[length:100%_2px]"
                    >
                      {profile.email}
                    </a>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <CopyEmail email={profile.email} />
                    {whatsapp && (
                      <ButtonLink href={whatsapp} variant="secondary" className="magnetic">
                        <MessageCircle className="size-4" aria-hidden /> WhatsApp
                      </ButtonLink>
                    )}
                    <ButtonLink href={profile.linkedin} variant="secondary" className="magnetic">
                      LinkedIn <ArrowUpRight className="size-4" aria-hidden />
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <ContactForm accessKey={profile.web3formsKey} email={profile.email} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
