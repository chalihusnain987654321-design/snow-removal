"use client";

import { useEffect, useState } from "react";
import { business } from "@/config/business";
import { NavLink } from "@/components/layout/NavLink";

type NavItem = { label: string; href: string };

export function MobileNav({ navLinks }: { navLinks: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock body scroll while the dropdown is open so the page behind it
  // doesn't scroll along with it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-md border border-line-200"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          aria-label="Primary mobile"
          className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-line-200 bg-white p-3 shadow-lg"
        >
          <ul className="flex flex-col gap-1 text-base font-medium text-navy-900">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  className="block rounded-md px-4 py-3 hover:bg-fog-100"
                  activeClassName="block rounded-md bg-fog-100 px-4 py-3 font-semibold text-accent-700"
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={`tel:${business.phoneHref}`}
                onClick={close}
                className="mt-1 block rounded-md bg-accent-600 px-4 py-3 text-center font-semibold text-white"
              >
                Call {business.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
