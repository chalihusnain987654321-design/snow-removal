// GA4 and Search Console are opt-in via env vars — the site works
// fully without them configured (Analytics/ConsentBanner render
// nothing until a measurement ID is set). See .env.example.
export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? null,
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? null,
};
