// The single switch point for email providers (brief Section 2). To
// change providers, write a new file in this folder implementing
// EmailAdapter and swap the import below — nothing else in the app
// references a specific provider.
import { resendAdapter } from "./resend";
import type { EmailAdapter } from "./types";

export const emailAdapter: EmailAdapter = resendAdapter;
export type { QuoteEmailPayload } from "./types";
