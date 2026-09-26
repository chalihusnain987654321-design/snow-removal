import Link from "next/link";
import { business } from "@/config/business";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/icons";
import { NavLink } from "@/components/layout/NavLink";
import { MobileNav } from "@/components/layout/MobileNav";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Locations", href: "/locations/" },
  { label: "Commercial", href: "/commercial/" },
  { label: "Residential", href: "/residential/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

// The mobile nav needs real open/close state (icon toggle, close-on-link-click),
// so it's a small client-component island (MobileNav) — the rest of the header
// stays a server component, matching the NavLink pattern used elsewhere.
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-200 bg-white/95 backdrop-blur">
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

          <MobileNav navLinks={navLinks} />
        </div>
      </Container>
    </header>
  );
}
