import { readAttribution, track, allowedEvents } from '@estate/analytics';
import { enhanceLeadForms } from './lead-form';

readAttribution();
track('page_view', { path: window.location.pathname, page_type: 'offplan_landing_demo' });
if (document.querySelector('.hero')) track('view_development',{ development: 'maris-demo' });

document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const element = target.closest<HTMLElement>('[data-track]');
  if (!element) return;
  const eventName = element.dataset.track;
  if (eventName && allowedEvents.some(name => name === eventName)) {
    track(eventName as (typeof allowedEvents)[number], { origin: element.getAttribute('href') || '', unit: element.dataset.unit || '' });
  }
  if (element.dataset.preferWhatsapp === 'true') {
    const contact = document.querySelector<HTMLSelectElement>('#form-contact-preference');
    if (contact) contact.value = 'whatsapp';
  }
});

enhanceLeadForms();
