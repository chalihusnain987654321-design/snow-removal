// Shared gtag helpers. Every call is a no-op if GTM isn't configured
// (no container ID in config/analytics.ts) or gtag hasn't loaded yet.

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
