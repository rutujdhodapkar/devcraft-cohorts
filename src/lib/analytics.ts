declare global { interface Window { gtag?: (...args: unknown[]) => void } }
export function track(eventName: string, params: Record<string, string | number | boolean> = {}) {
  const payload = { ...params, page_path: window.location.pathname, page_title: document.title };
  try {
    const key = 'dc_visitor_id';
    let visitor = sessionStorage.getItem(key);
    if (!visitor) { visitor = crypto.randomUUID(); sessionStorage.setItem(key, visitor); }
    const source = new URLSearchParams(window.location.search).get('utm_source') || document.referrer || 'direct';
    if (window.gtag) window.gtag('event', eventName, payload);
    // Aggregate only non-sensitive navigation metadata. Never send names, emails, DOB, or application answers to analytics.
    const record = { eventName, source: source.slice(0, 180), path: window.location.pathname, visitor, at: new Date().toISOString() };
    const key2 = 'dc_analytics_queue';
    const queue = JSON.parse(sessionStorage.getItem(key2) || '[]') as unknown[];
    queue.push(record); sessionStorage.setItem(key2, JSON.stringify(queue.slice(-50)));
  } catch { /* analytics must never block the product */ }
}
