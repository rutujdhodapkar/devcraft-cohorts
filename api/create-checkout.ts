import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // Intentionally fail closed until Firebase Admin token verification and Dodo API details are configured.
  // Never trust an applicationId, amount, or payment state supplied by the browser.
  if (!process.env.DODO_API_KEY || !process.env.DODO_PRODUCT_ID || !process.env.APP_BASE_URL || !process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return res.status(503).json({ error: 'Checkout is not configured yet. Application data is saved; contact the program team before retrying.' });
  }
  return res.status(501).json({ error: 'Checkout integration is scaffolded but not enabled. Configure Firebase Admin verification and implement the current Dodo API schema before accepting payments.' });
}
