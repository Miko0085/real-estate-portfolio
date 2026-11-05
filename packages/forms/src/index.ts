import type { CampaignAttribution } from '@estate/analytics';

export type FieldError = { field: string; message: string };
export type SubmissionResult = { ok: true; demo: boolean; message: string } | { ok: false; demo: boolean; message: string };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9 ()-]{7,22}$/;
export const allowedBudgets = ['under-1.5m','1.5-2.5m','2.5-4m','4m-plus','undecided'];
export const allowedTypes = ['1-bedroom','2-bedroom','3-bedroom','undecided'];
export const allowedPurposes = ['own-use','investment','both'];
export const allowedTimelines = ['now','1-3-months','3-6-months','exploring'];
export const allowedFinancing = ['cash','mortgage','undecided'];
export function validateOffplan(data: Record<string, unknown>): FieldError[] {
  const errors: FieldError[] = [];
  const requiredSelect = (field: string, choices: string[], title: string) => {
    if (!choices.includes(String(data[field] ?? ''))) errors.push({ field, message: `Select ${title.toLowerCase()}.` });
  };
  requiredSelect('budget', allowedBudgets, 'a budget');
  requiredSelect('property_type', allowedTypes, 'a residence type');
  requiredSelect('purpose', allowedPurposes, 'a purchase purpose');
  requiredSelect('timeline', allowedTimelines, 'a timeline');
  requiredSelect('financing', allowedFinancing, 'a financing method');
  if (String(data.name ?? '').trim().length < 2) errors.push({ field:'name', message:'Enter your name (at least 2 characters).' });
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  if (!email && !phone) {
    errors.push({field:'email', message:'Add your email or phone number.'});
    errors.push({field:'phone', message:'Add your phone number or email.'});
  } else {
    if (email && !emailPattern.test(email)) errors.push({field:'email', message:'Enter a valid email address.'});
    if (phone && !phonePattern.test(phone)) errors.push({field:'phone', message:'Enter a valid phone number with country code.'});
  }
  if (data.consent !== true && data.consent !== 'on') errors.push({field:'consent', message:'Consent is required to send this enquiry.'});
  return errors;
}
export async function submitLead(payload: Record<string, unknown> & { attribution: CampaignAttribution }, endpoint: string, signal?: AbortSignal): Promise<SubmissionResult> {
  if (!endpoint.trim()) return {ok:false, demo:true, message:'Demo form: your details were validated locally, but no lead was sent or stored. Connect a secure endpoint to enable submissions.'};
  let url: URL;
  try { url = new URL(endpoint, typeof window === 'undefined' ? 'https://example.com' : window.location.origin); }
  catch { return {ok:false,demo:false,message:'Submission endpoint is not configured correctly.'}; }
  if (!['https:','http:'].includes(url.protocol) || (url.protocol === 'http:' && url.hostname !== 'localhost')) return {ok:false,demo:false,message:'Only HTTPS submission endpoints are supported.'};
  try {
    const response = await fetch(url.toString(), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal,credentials:'omit',redirect:'error'});
    if (!response.ok) return {ok:false,demo:false,message:'The enquiry could not be sent. Please try again.'};
    const receipt: unknown = await response.json().catch(() => null);
    if (!receipt || typeof receipt !== 'object' || !('ok' in receipt) || (receipt as {ok:unknown}).ok !== true || !('lead_id' in receipt) || typeof (receipt as {lead_id:unknown}).lead_id !== 'string' || !(receipt as {lead_id:string}).lead_id) return {ok:false,demo:false,message:'The receiving service did not confirm delivery. Please contact the operator directly.'};
    return {ok:true,demo:false,message:'Your enquiry was received successfully.'};
  } catch { return {ok:false,demo:false,message:'Connection problem. Please try again later.'}; }
}
