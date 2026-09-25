import { Resend } from "resend";
import { business } from "@/config/business";
import type { EmailAdapter, QuoteEmailPayload } from "./types";

// RESEND_API_KEY is read lazily (not at module load) so the app can
// still build and run — the quote form just reports a clear error —
// before a real key is configured.
function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function renderText(payload: QuoteEmailPayload): string {
  return [
    `New quote request from ${payload.sourcePage}`,
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Address: ${payload.address}`,
    `Property type: ${payload.propertyType}`,
    payload.message ? `Message: ${payload.message}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export const resendAdapter: EmailAdapter = {
  async sendQuoteRequest(payload) {
    const client = getClient();
    if (!client) {
      return { ok: false, error: "RESEND_API_KEY is not configured." };
    }

    const toAddress = business.bookingEmail;
    if (!toAddress || toAddress.startsWith("{{")) {
      return { ok: false, error: "config/business.ts bookingEmail is still a placeholder." };
    }

    const result = await client.emails.send({
      from: `${business.name} Website <quotes@${extractDomain(business.siteUrl)}>`,
      to: toAddress,
      subject: `Quote request: ${payload.name} (${payload.propertyType})`,
      text: renderText(payload),
    });

    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true };
  },
};

function extractDomain(siteUrl: string): string {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return "example.com";
  }
}
