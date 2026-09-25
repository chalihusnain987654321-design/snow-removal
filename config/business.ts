// Single source of truth for business data. Every component reads from
// here — never hardcode business info anywhere else in the app.
//
// Values below are placeholders in {{DOUBLE_BRACE}} form. Fill them in
// with real, verifiable information before launch. Do not fabricate
// reviews, ratings, license numbers, or awards — leave the placeholder
// (or set to null) until you have the real value.

export type BusinessConfig = {
  name: string;
  legalName: string;
  phone: string; // display format, e.g. "(555) 123-4567"
  phoneHref: string; // tel: format, e.g. "+15551234567"
  email: string;
  bookingEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null; // null if operating as a service-area business with no public address
  hours: string;
  foundingYear: number | null;
  licenseText: string | null; // e.g. "Licensed & insured — License #{{NUMBER}}"
  responseTimePromise: string; // e.g. "Response within 2 hours during an active storm"
  socialProfiles: {
    facebook: string | null;
    instagram: string | null;
    google: string | null; // Google Business Profile URL
  };
  siteUrl: string;
};

export const business: BusinessConfig = {
  name: "{{BUSINESS_NAME}}",
  legalName: "{{BUSINESS_LEGAL_NAME}}",
  phone: "{{BUSINESS_PHONE}}",
  phoneHref: "{{BUSINESS_PHONE_HREF}}",
  email: "{{BUSINESS_EMAIL}}",
  bookingEmail: "{{BUSINESS_BOOKING_EMAIL}}",
  address: null,
  hours: "24/7 dispatch during active snow events",
  foundingYear: null,
  licenseText: null,
  responseTimePromise: "Response within {{RESPONSE_HOURS}} hours during a storm",
  socialProfiles: {
    facebook: null,
    instagram: null,
    google: null,
  },
  siteUrl: "{{SITE_URL}}",
};
