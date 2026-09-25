import type { Metadata } from "next";
import { business } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement for ${business.name}.`,
  alternates: { canonical: "/accessibility/" },
};

export default function AccessibilityPage() {
  return (
    <Section tone="white" className="pb-16 pt-8 sm:pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility" }]} />
      <h1 className="mt-4 font-heading text-4xl font-extrabold text-navy-950">Accessibility Statement</h1>

      <div className="prose prose-slate mt-8 max-w-3xl space-y-6 text-slate-700">
        <p>
          {business.name} is committed to making this website usable for as many people as
          possible, including people using assistive technology. The site is built with semantic
          HTML, keyboard navigation, visible focus states, labeled form fields, and respects your
          device&apos;s reduced-motion preference.
        </p>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">What we&apos;ve built in</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Semantic headings and landmarks, with a skip-to-content link on every page</li>
            <li>Keyboard-navigable menus and forms, with visible focus rings</li>
            <li>Labeled form fields and error messaging</li>
            <li>Color contrast checked against WCAG AA for text and interactive elements</li>
            <li>Reduced-motion support for visitors who prefer less animation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Ongoing work</h2>
          <p className="mt-2">
            Accessibility is an ongoing effort, not a one-time fix. If you encounter a barrier
            using this site, please let us know so we can address it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-navy-950">Contact</h2>
          <p className="mt-2">
            Report an accessibility issue at{" "}
            <a href={`mailto:${business.email}`} className="text-accent-700 underline hover:text-accent-600">
              {business.email}
            </a>{" "}
            or by phone at {business.phone}.
          </p>
        </section>
      </div>
    </Section>
  );
}
