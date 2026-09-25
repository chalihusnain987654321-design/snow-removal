import Link from "next/link";
import { business } from "@/config/business";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/icons";
import { NavLink } from "@/components/layout/NavLink";

const navLinks = [
  { label: "Services", href: "/services/" },
  { label: "Locations", href: "/locations/" },
  { label: "Commercial", href: "/commercial/" },
  { label: "Residential", href: "/residential/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

// Zero-JS mobile nav via <details>/<summary>, matching the FAQ accordion
// pattern — keeps the header (present on every page) free of client JS.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-heading text-lg font-bold text-navy-950">
          {business.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-navy-900">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} className="hover:text-accent-700" activeClassName="font-semibold text-accent-700">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phoneHref}`}
            className="hidden items-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700 sm:flex"
          >
            <PhoneIcon className="size-4" />
            {business.phone}
          </a>

          <details className="relative lg:hidden">
            <summary
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-line-200 marker:content-none"
              aria-label="Open menu"
            >
              <span className="sr-only">Menu</span>
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Primary mobile"
              className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-line-200 bg-white p-2 shadow-lg"
            >
              <ul className="flex flex-col text-sm font-medium text-navy-900">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="block rounded-md px-3 py-2 hover:bg-fog-100"
                      activeClassName="block rounded-md bg-fog-100 px-3 py-2 font-semibold text-accent-700"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="mt-1 block rounded-md bg-accent-600 px-3 py-2 text-center font-semibold text-white"
                  >
                    Call {business.phone}
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
