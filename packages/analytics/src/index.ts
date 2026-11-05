export const allowedEvents = [
  'page_view', 'view_property', 'view_development', 'view_floor_plan',
  'download_brochure', 'click_whatsapp', 'click_phone', 'start_form',
  'form_error', 'generate_lead', 'quiz_complete',
] as const;
export type AnalyticsEvent = typeof allowedEvents[number];
export type CampaignAttribution = Partial<Record<'utm_source'|'utm_medium'|'utm_campaign'|'utm_content'|'utm_term'|'gclid', string>>;
const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid'] as const;
const storageKey = 'estate_campaign_attribution_v1';
const ttl = 30 * 24 * 60 * 60 * 1000;
export function captureAttribution(query: string, prior: CampaignAttribution = {}): CampaignAttribution {
  const params = new URLSearchParams(query);
  const next = { ...prior };
  for (const key of keys) {
    const value = params.get(key)?.trim();
    if (value) next[key] = value.slice(0, 200);
  }
  return next;
}
export function readAttribution(): CampaignAttribution {
  if (typeof window === 'undefined') return {};
  let previous: CampaignAttribution = {};
  try {
    const item = window.sessionStorage.getItem(storageKey);
    if (item) {
      const parsed: unknown = JSON.parse(item);
      if (parsed && typeof parsed === 'object' && 'savedAt' in parsed && 'values' in parsed) {
        const data = parsed as { savedAt: number; values: CampaignAttribution };
        if (Date.now() - data.savedAt < ttl && Date.now() >= data.savedAt) previous = data.values;
      }
    }
  } catch { /* private mode / restricted storage */ }
  const next = captureAttribution(window.location.search, previous);
  try { window.sessionStorage.setItem(storageKey, JSON.stringify({ savedAt: Date.now(), values: next })); }
  catch { /* still include current query params */ }
  return next;
}
export function track(event: AnalyticsEvent, properties: Record<string, string | number | boolean> = {}): void {
  if (typeof window === 'undefined') return;
  // No third-party connection by default. A first-party adapter may subscribe to this event.
  window.dispatchEvent(new CustomEvent('estate:analytics', { detail: { event, properties } }));
  if (document.documentElement.dataset.analyticsEnabled === 'true') {
    const host = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
    host.dataLayer ??= [];
    host.dataLayer.push({ event, ...properties });
  }
}
