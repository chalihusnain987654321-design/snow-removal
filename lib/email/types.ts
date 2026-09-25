// Swappable email-provider interface (brief Section 2: "make the
// provider swappable behind one adapter file"). Every provider
// implementation lives in this folder; lib/email/index.ts is the only
// file that decides which one is active — swap providers there.

export type QuoteEmailPayload = {
  name: string;
  phone: string;
  address: string;
  propertyType: string;
  message: string;
  sourcePage: string;
};

export type EmailAdapter = {
  sendQuoteRequest: (payload: QuoteEmailPayload) => Promise<{ ok: true } | { ok: false; error: string }>;
};
