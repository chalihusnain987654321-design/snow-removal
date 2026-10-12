import Script from "next/script";
import { analyticsConfig } from "@/config/analytics";

// Google Tag Manager loaded via next/script with strategy="afterInteractive",
// with Google Consent Mode v2 defaulted to denied until the visitor
// accepts via ConsentBanner — the consent default is pushed to
// dataLayer before the GTM container script loads, so any
// Consent-Mode-aware tag configured inside that container (GA4, Ads,
// etc.) stays gated until acceptance. GA4 and other tags are
// configured in the GTM container itself (tagmanager.google.com), not
// in this codebase. Renders nothing if no container ID is configured.
export function Analytics() {
  const gtmId = analyticsConfig.gtmContainerId;
  if (!gtmId) return null;

  return (
    <>
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
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
    </>
  );
}
