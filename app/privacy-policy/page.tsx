import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${business.name}.`,
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Privacy Policy</h1>

      <div className="mt-4 max-w-3xl rounded-lg border border-dashed border-accent-600 bg-white p-4 text-sm text-slate-700">
        <strong>Template: not legal advice.</strong> This is a generic starting point. Have an
        attorney review it before publishing, and update it to match what the site actually
        collects (form fields, analytics, cookies) before launch.
      </div>

      <div className="prose prose-slate mt-8 max-w-3xl space-y-6 text-slate-700">
        <p>Last updated: {"{{LAST_UPDATED_DATE}}"}</p>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Information we collect</h2>
          <p className="mt-2">
            When you submit a quote request or contact form, we collect the information you
            provide, typically your name, phone number, email address, and property address. We
            may also collect standard analytics data (pages visited, device type, approximate
            location) via tools like Google Analytics.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">How we use it</h2>
          <p className="mt-2">
            We use the information you submit to respond to quote requests, schedule service, and
            communicate about your account. We do not sell your personal information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Cookies & analytics</h2>
          <p className="mt-2">
            This site may use cookies and similar technologies for analytics and to remember your
            preferences. You can disable cookies in your browser settings; some site features may
            not work as intended without them.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Data retention</h2>
          <p className="mt-2">
            We retain quote request and contact information for as long as needed to provide
            service and for reasonable business record-keeping purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Your choices</h2>
          <p className="mt-2">
            To request that we delete your information or stop contacting you, email{" "}
            <a href={`mailto:${business.email}`} className="text-accent-700 underline hover:text-accent-600">
              {business.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${business.email}`} className="text-accent-700 underline hover:text-accent-600">
              {business.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}
