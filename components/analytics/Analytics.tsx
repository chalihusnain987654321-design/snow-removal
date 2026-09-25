import Script from "next/script";
import { analyticsConfig } from "@/config/analytics";

// GA4 loaded via next/script with strategy="afterInteractive" (brief
// Section 2), with Google Consent Mode v2 defaulted to denied until
// the visitor accepts via ConsentBanner. Renders nothing if no
// measurement ID is configured.
export function Analytics() {
  const gaId = analyticsConfig.gaMeasurementId;
  if (!gaId) return null;

  return (
    <>
      {/*
        Consent default + gtag.js load + config all use afterInteractive
        and rely on script execution following document order, so
        consent is still set before the config call fires — no
        first-party ad pixels here that would need the stricter
        beforeInteractive guarantee (which Next only supports directly
        in the root layout, not a nested component).
      */}
      <Script id="consent-mode-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`gtag('js', new Date()); gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
