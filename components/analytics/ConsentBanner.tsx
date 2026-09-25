"use client";

import { useEffect, useSyncExternalStore } from "react";
import { analyticsConfig } from "@/config/analytics";
import { updateConsent } from "@/lib/gtag";

const STORAGE_KEY = "analytics-consent";
type Consent = "granted" | "denied" | "unset";

// localStorage is external mutable state, so it's read through
// useSyncExternalStore rather than effect+setState — that avoids an
// extra render pass and is hydration-safe (getServerSnapshot always
// returns "unset", matching the client's first paint before it can
// read localStorage).
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Consent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch {
    return "unset";
  }
}

function getServerSnapshot(): Consent {
  return "unset";
}

// Only rendered when GA4 is actually configured — no analytics, no banner.
export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (consent === "granted") updateConsent("granted");
  }, [consent]);

  function handleChoice(state: "granted" | "denied") {
    try {
      localStorage.setItem(STORAGE_KEY, state);
    } catch {
      // Choice just won't persist across visits — not worth failing the interaction over.
    }
    updateConsent(state);
    // localStorage writes don't fire "storage" in the same tab that wrote them.
    window.dispatchEvent(new Event("storage"));
  }

  if (!analyticsConfig.gaMeasurementId || consent !== "unset") return null;

  return (
    <div className="fixed inset-x-4 bottom-20 z-50 rounded-lg border border-line-200 bg-white p-4 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm">
      <p className="text-sm text-slate-700">
        We use analytics cookies to understand site traffic. You can accept or decline.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => handleChoice("granted")}
          className="rounded-md bg-accent-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent-700"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleChoice("denied")}
          className="rounded-md border border-line-200 px-3 py-1.5 text-sm font-semibold text-navy-900 hover:bg-fog-100"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
