# Portfolio

Portfolio for a freelance web developer: wins website clients and supports agency job applications. Static Next.js site, deployed to Cloudflare Pages.

## Edit content

All text lives in `src/content/`. You shouldn't need to touch components to change wording.

| File | What's in it |
|---|---|
| `profile.ts` | Name, status line, contact links (incl. optional WhatsApp), SEO title/description/keywords, intro, hero stats, about, tech marquee |
| `work.ts` | Client case studies with screenshots (real projects only, with client permission) |
| `services.ts` | Services, plus the "for businesses" / "for agencies" cards |
| `process.ts` | Process steps and the QA checklist |
| `projects.ts` | Web-app cards ("Beyond websites") |
| `experience.ts` | Experience timeline and skills |
| `faq.ts` | FAQ (also published as structured data for Google) |

Case-study images go in `public/work/<slug>/` as WebP (around 1440×900, under 150 KB).

## Commands

```bash
npm run dev            # local preview at http://localhost:3000
npm test               # content checks (slugs, images, URLs)
npm run check:content  # fails while any "TODO" placeholder is left
npm run release        # check:content + lint + test + build → out/
```

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command: `npm run release` · Output directory: `out` · Environment variable `NODE_VERSION` = `24`.
4. After the first deploy, put the real URL into `siteUrl` in `src/content/profile.ts` and push again.

`public/_headers` sets security headers and the content type of the social preview image.
