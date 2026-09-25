// JSON-LD structured data builders (brief Section 8). Every builder
// here reads only from config/business.ts and /data — nothing is
// invented. Fields we don't have real values for (geo coordinates for
// the business itself, price range, logo) are omitted rather than
// guessed, and AggregateRating/Review are never emitted since the
// brief forbids marking up fake review data.

import { business } from "@/config/business";
import { states } from "@/data/states";
import { cities } from "@/data/cities";
import type { Service, BlogPost } from "@/data/types";
import { SITE_URL } from "./site";

export function organizationSchema() {
  const sameAs = Object.values(business.socialProfiles).filter((url): url is string => Boolean(url));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: SITE_URL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  const areaServed = cities.map((city) => {
    const state = states.find((s) => s.slug === city.stateSlug);
    return { "@type": "City", name: `${city.name}, ${state?.abbr ?? city.stateSlug}` };
  });

  const is247 = business.hours.toLowerCase().includes("24/7");

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    areaServed,
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.city,
            addressRegion: business.address.state,
            postalCode: business.address.zip,
            addressCountry: "US",
          },
        }
      : {}),
    ...(is247
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        }
      : {}),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}/`,
    provider: {
      "@type": "Organization",
      name: business.name,
      url: SITE_URL,
    },
    areaServed: states.map((state) => ({ "@type": "State", name: state.name })),
  };
}

export function blogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${SITE_URL}/blog/${post.slug}/`,
    author: { "@type": "Organization", name: business.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: business.name, url: SITE_URL },
  };
}
