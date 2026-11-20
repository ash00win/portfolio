// Everything about you lives here. Every placeholder must be replaced before
// publishing; `npm run check:content` lists what is still missing.

export const profile = {
  name: "Ashwin Joy",
  role: "Web developer",
  location: "Thrissur, Kerala",

  // The small pill above the headline. Keep it current.
  status: "Available for new website projects",

  email: "ashwinjoy012@gmail.com",
  linkedin: "https://www.linkedin.com/in/iamashwinjoy/",
  github: "https://github.com/ash00win", // Optional. Leave empty to hide.
  // Optional WhatsApp number in international format, digits only, e.g. "919900000000".
  // Many small-business clients prefer it to email. Empty hides the button.
  whatsapp: "919995757922",

  // Web3Forms access key for the contact form (free: web3forms.com, sends to your Gmail).
  // It's designed to be public, so it's safe in the site's code.
  web3formsKey: "20125d2f-b130-4bdd-b453-acd5d46bd55d",

  // The production URL, used for SEO tags and the sitemap. Must match the
  // Cloudflare Pages project name (free *.pages.dev address, no custom domain yet).
  siteUrl: "https://ashwinjoy.pages.dev",

  // Search results and link previews.
  seo: {
    title: "Ashwin Joy | Freelance Web Developer in Kerala, India",
    description:
      "Fast, mobile-first websites for businesses, and pixel-accurate builds from your designs for agencies. React, Next.js and Tailwind CSS. Based in Kerala, working worldwide.",
    keywords: [
      "freelance web developer",
      "web developer Kerala",
      "website developer Thrissur",
      "React developer",
      "Next.js developer",
      "Figma to code",
      "small business website",
    ],
  },

  intro:
    "I'm Ashwin, a web developer in Kerala. I design and build fast, mobile-first websites for businesses, and turn agency designs into clean, production-ready code.",


  about: [
    "I'm a web developer from Thrissur, Kerala. I build fast, mobile-first websites for businesses, and turn agency designs into clean, working code.",
    "By day I'm a junior software developer on a live ERP used by a whole college, where I learned to own work end to end and test it properly. Alongside it I take on part-time website projects, like a website for a printing company in Muscat.",
  ],

  // Short facts shown beside the About text.
  facts: [
    { label: "Based in", value: "Thrissur, Kerala" },
    { label: "Currently", value: "Junior Software Developer" },
    { label: "Freelance", value: "Part-time website projects" },
    { label: "Education", value: "B.Tech, Computer Science (2025)" },
  ],

  // Scrolls along the bottom of the hero.
  stack: [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Vite",
    "Framer Motion",
    "Responsive design",
    "SEO",
    "Google Analytics 4",
    "Node.js",
    "Django",
    "PostgreSQL",
    "Cloudflare Pages",
  ],
} as const;

export const mailto = (subject = "Website enquiry") =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

export const whatsappUrl = (text = "Hi Ashwin, I'd like to talk about a website.") =>
  profile.whatsapp ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}` : "";
