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

const values = ["Pixel-accurate", "Mobile-first", "Clear updates", "Tested before handover"];
const toolbox = ["React", "Next.js", "Tailwind CSS", "JavaScript", "Node.js", "Django", "PostgreSQL", "Git"];

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

        {/* Two columns on wide screens: copy on the left, the animated build on the right. */}
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-36 pb-16 sm:px-6 sm:pt-48 sm:pb-24 lg:px-8 xl:grid-cols-[1.1fr_1fr] xl:pt-44">
          <div className="hero-exit relative z-10">
            <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-sm text-muted">
              <span className="pulse size-2 rounded-full bg-accent" aria-hidden />
              {profile.status}
            </p>
            <h1 className="split-load mt-8 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tighter sm:text-7xl lg:text-8xl xl:text-[4.75rem]">
              <span className="sr-only">{profile.name}, freelance web developer. </span>
              <SplitText text="Sharp websites," />
              <br />
              <SplitText text="built to perform." start={2} innerClassName="text-gradient pr-1" />
            </h1>
            <p className="rise rise-2 mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl xl:max-w-xl">{profile.intro}</p>
            <div className="rise rise-3 mt-10 flex flex-wrap gap-3">
              <ButtonLink href={mailto("Website project")} className="magnetic">
                Start a project <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary" className="magnetic">
                See my work <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            <dl className="rise rise-4 mt-16 inline-grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/85">
              {profile.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse px-3.5 py-4 sm:px-7 sm:py-5">
                  <dt className="mt-1 max-w-32 text-xs leading-snug text-muted sm:text-sm">{s.label}</dt>
                  <dd data-count className="text-xl font-semibold tracking-tight whitespace-nowrap tabular-nums sm:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
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
            <li key={title} data-reveal style={d(i % 3)} className="group tilt glow-card flex flex-col rounded-2xl p-7">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-tint text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
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
                className={`spotlight relative flex flex-col overflow-hidden rounded-3xl border p-8 sm:p-10 ${
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
              <li key={step.title} data-reveal style={d(i)} className="tilt glow-card flex flex-col rounded-3xl p-8">
                <span className="text-gradient text-7xl font-semibold tracking-tighter">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">{step.title}</h3>
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
          <div data-reveal="left" className="tilt glow-card rounded-2xl p-7 sm:p-9">
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
          <div data-reveal="right" className="tilt glow-card rounded-2xl p-7 sm:p-9">
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

      {/* About: an image-free bento of cards. */}
      <section id="about" className="border-t border-line bg-surface py-16 sm:py-24">
        <Container>
          <ul className="grid gap-4 lg:grid-cols-3">
            <li
              data-reveal="left"
              className="spotlight relative overflow-hidden rounded-3xl border border-line bg-paper p-8 sm:p-10 lg:col-span-2"
            >
              <div className="aurora opacity-50" aria-hidden />
              <div className="spotlight-layer" aria-hidden />
              <div className="relative">
                <Eyebrow>About</Eyebrow>
                <h2
                  data-reveal="split"
                  className="mt-4 text-4xl leading-tight font-semibold tracking-tighter sm:text-6xl"
                >
                  <SplitText text="Hi, I'm" />{" "}
                  <SplitText text={`${profile.name.split(" ")[0]}.`} start={2} innerClassName="text-gradient pr-1" />
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                  {profile.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium"
                    >
                      <Check className="size-3.5 text-accent" aria-hidden /> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li data-reveal="right" className="tilt glow-card flex flex-col rounded-3xl p-7">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">Currently</p>
              <p className="mt-4 text-xl font-semibold tracking-tight">{timeline[0].title}</p>
              <p className="mt-2 leading-relaxed text-muted">
                Shipping features for a live college ERP by day, and building websites for clients alongside.
              </p>
              <div className="group mt-6">
                <ProjectArt kind="erp" />
              </div>
              <p className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-accent">
                <span className="pulse size-2 rounded-full bg-accent" aria-hidden /> Open to new projects
              </p>
            </li>

            <li data-reveal style={d(1)} className="glow-card rounded-3xl p-7 sm:p-9 lg:col-span-2">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">Experience</p>
              <ol className="mt-4">
                {timeline.map((t, i) => (
                  <li
                    key={t.title}
                    className={`group grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <span className="font-mono text-xs leading-6 text-muted">{t.when}</span>
                    <div>
                      <p className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                        {t.title} <span className="font-normal text-muted">· {t.org}</span>
                      </p>
                      {t.description && <p className="mt-1 text-sm text-muted">{t.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </li>

            <li data-reveal style={d(2)} className="tilt glow-card flex flex-col rounded-3xl p-7">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">Toolbox</p>
              <ul className="mt-5 grid flex-1 auto-rows-fr grid-cols-2 gap-2">
                {toolbox.map((tool, i) => (
                  <li
                    key={tool}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-line bg-paper p-3 text-sm font-medium transition-[translate,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    {tool}
                    <span className="self-end font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
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
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight transition-colors hover:text-accent">
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
            <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-14">
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
                  Tell me about your business or send the designs, and I&apos;ll come back with a fixed quote. I take on
                  a small number of part-time projects at a time.
                </p>

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
                    {profile.github && (
                      <ButtonLink href={profile.github} variant="secondary" className="magnetic">
                        GitHub <ArrowUpRight className="size-4" aria-hidden />
                      </ButtonLink>
                    )}
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
