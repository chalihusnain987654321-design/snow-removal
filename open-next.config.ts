// Config for the Cloudflare Workers adapter (@opennextjs/cloudflare).
// No R2 incremental cache or images binding wired up yet — this project
// has no next/image usage and hasn't set up an R2 bucket, so both are
// left as defaults. See https://opennext.js.org/cloudflare for adding
// either later.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
