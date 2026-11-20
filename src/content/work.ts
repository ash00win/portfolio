// Real projects only. Get the client's permission before publishing each one.

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  location: string;
  year: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  /** Short, verifiable facts shown as chips. No invented metrics. */
  highlights: string[];
  cover: { src: string; alt: string };
  brief: string;
  built: string[];
  gallery: { src: string; alt: string; caption: string }[];
  /** The client's own words, copied exactly, with their permission. Never write one for them. */
  testimonial?: { quote: string; name: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ss-llc-muscat",
    client: "S&S LLC",
    title: "A bilingual website for a printing company in Muscat",
    summary:
      "English and Arabic site for a printing, customisation and corporate-gifts company, built around how their customers actually enquire: WhatsApp and quote requests with design files attached.",
    location: "Muscat, Oman",
    year: "2026",
    role: "Design & development",
    stack: ["React", "Vite", "React Router", "Tailwind CSS", "Google Analytics 4"],
    liveUrl: "https://www.ssprint.design",
    highlights: ["English + Arabic", "7 pages", "WhatsApp on every product", "Quotes with file upload"],
    cover: {
      src: "/work/ss-llc-muscat/home.webp",
      alt: "S&S LLC homepage with bilingual English and Arabic headline next to a photo of a large-format printer",
    },
    brief:
      "S&S needed one website that works for both English- and Arabic-speaking customers, presents a wide range of printing services and promotional products, and turns visitors into quote requests, mostly over WhatsApp, which is how their customers already prefer to talk.",
    built: [
      "English and Arabic content throughout, with right-to-left support and an Arabic typeface that only downloads the characters each page actually uses.",
      "Service and product pages where every item has its own WhatsApp button with a pre-filled enquiry naming that product.",
      "A quote form that accepts design files (JPG, PNG, PDF, AI or EPS, up to 10 MB) and asks how the customer prefers to be contacted.",
      "A product range filterable by category, plus the full corporate-gifts catalogue online.",
      "A Google review prompt with a QR code, to collect genuine reviews instead of showing invented testimonials.",
      "Search and sharing basics (meta description, social preview tags, sitemap, robots.txt) and Google Analytics 4.",
    ],
    gallery: [
      {
        src: "/work/ss-llc-muscat/products.webp",
        alt: "Products page with category filters labelled in English and Arabic",
        caption: "Products, filterable by category, labelled in both languages.",
      },
      {
        src: "/work/ss-llc-muscat/quote.webp",
        alt: "Request a Quote page with bilingual form labels",
        caption: "Quote requests with design-file upload and a preferred contact method.",
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
