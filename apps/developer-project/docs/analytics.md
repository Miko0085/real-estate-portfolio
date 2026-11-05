# Analytics — SERA / COAST

Supported events: page_view, view_floor_plan, download_brochure, start_form, form_error, generate_lead.

The shared client-side abstraction captures UTM source, medium, campaign, content, term and GCLID (when present); browser session storage is used and the campaign payload can accompany a consented HTTPS enquiry. No external analytics provider is turned on by default.

Do not send personal data to analytics events.
