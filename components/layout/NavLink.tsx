"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Nav items link to section roots (e.g. "/locations/"), so a link is
// "active" for its whole subtree (e.g. /locations/michigan/detroit/),
// not just an exact path match.
function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

export function NavLink({
  href,
  className,
  activeClassName,
  children,
  onClick,
}: {
  href: string;
  className: string;
  activeClassName: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? activeClassName : className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
