# rugged.

A playful custom-rug enquiry website for Esh, built with Next.js.

## Develop locally
1. Install Node.js 20.9+.
2. Run `npm install` and `npm run dev`.
3. Copy `.env.example` to `.env.local` and set Supabase secrets to enable form submissions.

## Enable custom-order requests
1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel Environment Variables.
3. Deploy and test an enquiry. Requests appear in Supabase's `rug_requests` table. Uploads go into a private Storage bucket named `rug-references`.
4. Ask Esh to review requests directly in the protected Supabase dashboard until a dedicated admin dashboard is implemented.

This is a request-for-quote site, not a payment storefront. No money is collected. Esh must confirm designs and prices.

## Pre-launch checklist
Replace example gallery artwork with Esh's own rug photography. Set real business email and social handles. Configure rate limiting/bot protection and an email notification service before public promotion. Set legal privacy and policies appropriate to the business. Never expose the service-role key to the client or commit it to git.
