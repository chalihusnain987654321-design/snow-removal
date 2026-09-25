import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { business } from "@/config/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { analyticsConfig } from "@/config/analytics";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { PhoneClickTracking } from "@/components/analytics/PhoneClickTracking";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | Snow Removal & Ice Management`,
    template: `%s | ${business.name}`,
  },
  description:
    "Residential and commercial snow removal, plowing, and ice management with 24/7 storm dispatch.",
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  ...(analyticsConfig.googleSiteVerification
    ? { verification: { google: analyticsConfig.googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 sm:pb-0">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-950 focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <Analytics />
        <ConsentBanner />
        <PhoneClickTracking />
      </body>
    </html>
  );
}
