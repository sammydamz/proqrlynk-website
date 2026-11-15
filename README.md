# ProQRlynk website

Standalone public website by Kasalite Technologies. The staff inventory app remains in sammydamz/bioqrlink.

## Local development

Use Node 22.16 or newer. Run `npm ci` then `npm run dev`.
Copy `.env.example` to `.env` and set `VITE_STAFF_APP_URL` to the real staff application URL to enable sign in.

## GitHub and Cloudflare Pages

1. Create a private GitHub repository named `proqrlynk-website` and push this project.
2. In Cloudflare Pages, connect that repository. Build command: `npm run build`. Output directory: `dist`. Use Node 22.16 or newer.
3. Create a D1 database named `proqrlynk-enquiries`. Execute `migrations/0001_enquiries.sql` against it.
4. Add a Pages D1 binding named `ENQUIRIES_DB`, pointing to that database. Add the real database ID to the commented binding in `wrangler.toml` and uncomment it when using Wrangler deployments.
5. Set `VITE_STAFF_APP_URL` in the Pages build variables. Redeploy after changing variables or bindings.
6. Attach the public website domain in Pages. Keep the staff app on its own domain.

The `/api/enquiries` Pages Function validates submissions and stores them in D1. Without a D1 binding it returns 503 and the form displays an error, rather than reporting a successful submission. Enquiries can be viewed through the D1 console. No email notifications are configured. The rate limit is a basic global hourly cap; add Cloudflare abuse protection before a public campaign.

Stock photographs use external Unsplash URLs with local color fallbacks. Those URLs were blocked in the build environment and need visual verification before publishing.

The website contains no hospital inventory database, staff accounts, device QR tokens or patient data.
