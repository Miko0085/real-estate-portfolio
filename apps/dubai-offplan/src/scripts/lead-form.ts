import { readAttribution, track } from '@estate/analytics';
import { submitLead, validateOffplan, type FieldError } from '@estate/forms';

function getValues(form: HTMLFormElement): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  const data = new FormData(form);
  for (const [name, value] of data.entries()) values[name] = typeof value === 'string' ? value.trim() : '';
  values.consent = data.get('consent') === 'on';
  return values;
}
function showErrors(form: HTMLFormElement, errors: FieldError[]): void {
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  if (!summary) return;
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach(el => { el.textContent = ''; });
  form.querySelectorAll<HTMLElement>('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
  summary.replaceChildren();
  if (!errors.length) { summary.hidden = true; return; }
  summary.hidden = false;
  const heading = document.createElement('strong');
  heading.textContent = 'Please correct the highlighted fields.';
  summary.append(heading);
  const list = document.createElement('ul');
  for (const error of errors) {
    const field = form.elements.namedItem(error.field);
    if (!(field instanceof HTMLElement)) continue;
    field.setAttribute('aria-invalid','true');
    const inline = form.querySelector<HTMLElement>(`[data-error-for="${error.field}"]`);
    if (inline) inline.textContent = error.message;
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = `#${error.field}`;
    anchor.textContent = error.message;
    li.append(anchor);
    list.append(li);
  }
  summary.append(list);
  summary.focus();
}
export function enhanceLeadForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach(form => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (!status || !submit) return;
    let inFlight = false;
    let started = false;
    const endpoint = form.dataset.endpoint || '';
    const setStatus = (message: string, state: 'info'|'error'|'success') => {
      status.textContent = message;
      status.dataset.state = state;
    };
    form.addEventListener('focusin', event => {
      if (started || !(event.target instanceof HTMLElement) || event.target.getAttribute('name') === 'website') return;
      started = true;
      track('start_form',{ form_id:'maris_qualification' });
    });
    form.addEventListener('input', event => {
      const el = event.target;
      if (!(el instanceof HTMLElement) || !('name' in el)) return;
      const name = String(el.name);
      el.removeAttribute('aria-invalid');
      const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (error) error.textContent = '';
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (inFlight) return;
      showErrors(form, []);
      const values = getValues(form);
      const errors = validateOffplan(values);
      if (errors.length) {
        showErrors(form,errors);
        setStatus('Please correct the form errors and try again.','error');
        track('form_error',{form_id:'maris_qualification', count:errors.length});
        return;
      }
      if (values.website) { setStatus('Unable to process this request.','error'); return; }
      if (!endpoint) {
        setStatus('Demo form validated. No data was submitted or stored. A secure endpoint is required before live use.','info');
        return;
      }
      inFlight = true;
      submit.disabled = true;
      submit.textContent = 'Submitting…';
      setStatus('Sending your enquiry securely…','info');
      const controller = new AbortController();
      const timeout = window.setTimeout(()=>controller.abort(),12000);
      try {
        const { website, ...safeValues } = values;
        const result = await submitLead({ ...safeValues, form_id:'maris_qualification', development_id:'maris-demo', submitted_at:new Date().toISOString(), attribution:readAttribution() },endpoint,controller.signal);
        setStatus(result.message, result.ok ? 'success' : 'error');
        if (result.ok) { track('generate_lead',{form_id:'maris_qualification'}); form.reset(); }
      } finally {
        window.clearTimeout(timeout);
        inFlight = false;
        submit.disabled = false;
        submit.innerHTML = 'Submit enquiry <span aria-hidden="true">↗</span>';
      }
    });
  });
}
