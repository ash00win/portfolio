import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContactMenu } from "@/components/contact-menu";
import { Effects } from "@/components/effects";
import { Intro } from "@/components/intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, whatsappUrl } from "@/content/profile";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const defaultTitle = profile.seo.title;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: defaultTitle, template: `%s | ${profile.name}, web developer` },
  description: profile.seo.description,
  keywords: [...profile.seo.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: profile.name,
    title: defaultTitle,
    description: profile.seo.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: profile.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the Intro script marks <html> with data-intro before React hydrates.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Intro name={profile.name} role="Freelance web developer" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* overflow-x-clip: off-screen reveal start positions must never widen the page on phones.
            Unlike overflow-hidden it doesn't create a scroll container, so sticky sections still work. */}
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        <Effects />
        <ContactMenu whatsappUrl={whatsappUrl()} />
      </body>
    </html>
  );
}
