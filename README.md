# DevCraft Cohorts

A fixed-batch virtual internship enrollment platform. Custom React + Vite UI, Firebase Authentication/Firestore, Vercel serverless API routes, and Dodo Payments integration points.

## Stack
- React + TypeScript + Vite
- Neon-brutalist custom UI (no builder branding)
- Firebase Google sign-in and Firestore
- Vercel Functions for checkout and webhook endpoints
- Dodo Payments API (credentials intentionally blank)

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in Firebase and Dodo values.
3. `npm run dev`

## Required environment variables
See `.env.example`. Keep server secrets only in Vercel Environment Variables. Never put `DODO_API_KEY` or webhook secrets in `VITE_*` variables.

## Firebase setup
1. Create a Firebase project and enable Google under Authentication > Sign-in method.
2. Create Firestore and deploy the rules in `firestore.rules`.
3. Add the Firebase web app config to the Vercel `VITE_FIREBASE_*` variables.
4. Assign the admin custom claim `admin: true` to approved admin users from a trusted Admin SDK script. Never trust a client-side email check alone.

## Dodo setup
Configure `DODO_API_KEY`, `DODO_PRODUCT_ID`, `DODO_WEBHOOK_SECRET`, and `APP_BASE_URL` in Vercel. The checkout endpoint is a guarded integration scaffold: verify the current Dodo API version and request schema in your Dodo dashboard/docs before enabling live payments. Never mark an application paid from a browser redirect; only a verified webhook should do that.

## Deploy to Vercel
Import `rutujdhodapkar/devcraft-cohorts` into Vercel, use the default Vite build (`npm run build`) and output directory `dist`. Add the environment variables, then connect your domain in Vercel project settings.

## Current status
The public UI, application flow, Google auth wiring, admin interface shell, Firestore persistence hooks, analytics event capture, and server-side payment/webhook scaffolds are included. Live payment and production Firebase behavior require your project credentials and a real webhook test before accepting money.
