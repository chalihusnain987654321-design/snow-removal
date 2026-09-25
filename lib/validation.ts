import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[\d()+\-.\s]+$/, "Enter a valid phone number"),
  address: z.string().trim().min(1, "Property address is required").max(200),
  propertyType: z.enum(["residential", "commercial"]).default("residential"),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot — real visitors never fill this in. Must arrive empty.
  company: z.string().max(0, "Spam check failed").optional().default(""),
  // Where the form was submitted from, for the email and for
  // redirecting back after a plain (no-JS) form submission.
  sourcePage: z.string().trim().min(1).max(300).default("/"),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
