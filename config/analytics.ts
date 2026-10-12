// Search Console verification is opt-in via an env var (see
// .env.example). The GTM container ID is a real, already-created
// container (tagmanager.google.com) rather than a per-environment
// value, so it's a plain constant here — GA4 and any other tags are
// configured inside that GTM container, not in this codebase.
export const analyticsConfig = {
  gtmContainerId: "GTM-KG6TNKJC",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? null,
};
