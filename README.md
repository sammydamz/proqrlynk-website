# ProQRlynk website

Public marketing landing page for ProQRlynk by Kasalite Technologies.

## Local development

Use Node 22.16 or newer. Run `npm ci` then `npm run dev`.

## GitHub and Cloudflare Pages

1. Create a private GitHub repository named `proqrlynk-website` and push this project.
2. In Cloudflare Pages, connect that repository. Build command: `npm run build`. Output directory: `dist`. Use Node 22.16 or newer.
3. Create a D1 database named `proqrlynk-enquiries`. Execute `migrations/0001_enquiries.sql` against it.
4. Add a Pages D1 binding named `ENQUIRIES_DB`, pointing to that database. Add the real database ID to the commented binding in `wrangler.toml` and uncomment it when using Wrangler deployments.
5. Attach the public website domain in Pages.

The `/api/enquiries` Pages Function validates submissions and stores them in D1. Without a D1 binding it returns 503 and the form displays an error, rather than reporting a successful submission. Enquiries can be viewed through the D1 console. No email notifications are configured. The rate limit is a basic global hourly cap; add Cloudflare abuse protection before a public campaign.

Stock photographs use external Unsplash URLs with local color fallbacks. Those URLs were blocked in the build environment and need visual verification before publishing.

This repository contains the marketing page and its contact form only.
