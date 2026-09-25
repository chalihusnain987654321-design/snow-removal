// Shared gtag helpers. Every call is a no-op if GA4 isn't configured
// (no NEXT_PUBLIC_GA_MEASUREMENT_ID) or gtag hasn't loaded yet.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", name, params);
  }
}

export function updateConsent(state: "granted" | "denied") {
  if (typeof window !== "undefined") {
    window.gtag?.("consent", "update", {
      ad_storage: state,
      analytics_storage: state,
    });
  }
}
