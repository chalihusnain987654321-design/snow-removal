import Link from "next/link";
import { business } from "@/config/business";
import { Container } from "@/components/ui/Container";
import { states } from "@/data/states";
import { PhoneIcon } from "@/components/icons";

const companyLinks = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];

export function Footer() {
  return (
    <footer className="border-t border-line-200 bg-navy-950 text-slate-300">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="font-heading text-lg font-bold text-white">{business.name}</div>
          <p className="mt-2 text-sm">{business.hours}</p>
          <p className="mt-4 text-sm">
            <a href={`tel:${business.phoneHref}`} className="text-white hover:underline">
              {business.phone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${business.email}`} className="hover:underline">
              {business.email}
            </a>
          </p>
          {business.licenseText && <p className="mt-3 text-xs text-slate-400">{business.licenseText}</p>}
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Get service</div>
          <p className="mt-3 text-sm text-slate-400">24/7 dispatch during active snow events.</p>
          <a
            href={`tel:${business.phoneHref}`}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            <PhoneIcon className="size-4" />
            Call {business.phone}
          </a>
          <Link href="/free-estimate/" className="mt-3 block text-sm font-medium text-white hover:underline">
            Get a free estimate →
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-8">
          <div className="text-sm font-semibold text-white">States we serve</div>
          {/* Full-width wrapped list rather than a single tall column — scales to
              all 40 states without dominating the footer's vertical space. */}
          <nav aria-label="States we serve" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {states.map((state) => (
              <Link key={state.slug} href={`/locations/${state.slug}/`} className="hover:text-white hover:underline">
                {state.name}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
