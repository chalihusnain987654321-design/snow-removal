import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-white hover:bg-accent-700 focus-visible:outline-accent-700",
  secondary:
    "bg-white text-navy-900 border border-line-200 hover:bg-fog-100 focus-visible:outline-navy-900",
  // For use on dark (navy) backgrounds — transparent fill, white text.
  outline:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 focus-visible:outline-white",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
