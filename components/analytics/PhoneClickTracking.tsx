"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// One delegated click listener for the whole site instead of touching
// every tel: link individually — phone calls are the brief's #1
// conversion type (Section 1), so they're worth tracking even though
// there's no page load to hook into the way form submission has.
export function PhoneClickTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('a[href^="tel:"]')) {
        trackEvent("phone_click");
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
