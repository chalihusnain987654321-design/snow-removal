import { NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validation";
import { emailAdapter } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

// Backs the plain <form method="post"> in components/ui/QuoteForm.tsx —
// works with JavaScript disabled. The browser HTML5 `required`
// attributes handle everyday UX validation before submission; the Zod
// check here is a server-side integrity/security backstop, so a real
// validation failure should be rare and just needs a clear landing
// page, not per-field error plumbing back into every page that embeds
// the form.
export async function POST(request: Request) {
  // Redirects are built from the request's own origin, not the
  // config/business.ts siteUrl — that value is a `{{SITE_URL}}`
  // placeholder until filled in, and resolving redirects against it
  // would send every local/staging submission off to a real external
  // domain instead of back to the site that sent the request.
  const origin = new URL(request.url).origin;

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.redirect(new URL("/quote-error/", origin), { status: 303 });
  }

  const parsed = quoteRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.redirect(new URL("/quote-error/", origin), { status: 303 });
  }

  const { name, phone, address, propertyType, message, sourcePage } = parsed.data;
  const result = await emailAdapter.sendQuoteRequest({ name, phone, address, propertyType, message, sourcePage });

  if (!result.ok) {
    console.error("Quote request email failed:", result.error);
    return NextResponse.redirect(new URL("/quote-error/", origin), { status: 303 });
  }

  return NextResponse.redirect(new URL("/thank-you/", origin), { status: 303 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
