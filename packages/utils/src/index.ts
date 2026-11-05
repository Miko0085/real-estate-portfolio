export function formatAED(value: number): string {
  if (!Number.isFinite(value) || value < 0) return 'Price on request';
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(value);
}
export function safeHttpUrl(input: string): URL | null {
  try { const url = new URL(input); return ['https:', 'http:'].includes(url.protocol) ? url : null; }
  catch { return null; }
}
export function safeText(input: unknown, max = 200): string {
  return String(input ?? '').trim().slice(0, max);
}
export function slugify(input: string): string {
  return input.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
