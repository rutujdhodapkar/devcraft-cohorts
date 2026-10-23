import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.DODO_WEBHOOK_SECRET || !process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return res.status(503).json({ error: 'Webhook is not configured.' });
  }
  // Fail closed: do not acknowledge events or mark records paid until signature verification,
  // idempotency, event-to-application mapping, and the current Dodo event schema are implemented.
  return res.status(501).json({ error: 'Webhook verification is not enabled yet. Do not use live payments until this endpoint is completed and tested.' });
}
