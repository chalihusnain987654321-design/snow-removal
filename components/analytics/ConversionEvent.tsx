"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// Fires a GA4 event once when the page it's placed on loads — used on
// /thank-you/ to record a completed quote request without any
// client-side form interception (the form itself is a plain POST).
export function ConversionEvent({ event }: { event: string }) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);

  return null;
}
