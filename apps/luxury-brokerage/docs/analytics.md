# Analytics

Supported shared events: `page_view`, `view_property`, `view_development`, `view_floor_plan`, `download_brochure`, `click_whatsapp`, `click_phone`, `start_form`, `form_error`, `generate_lead`, `quiz_complete`.

This app's main events: view_property, view_development, contact and qualified enquiry events.

Attribution fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`. Landing URL stored in tab-scoped sessionStorage for up to 30 days and copied to consented lead payload. No third-party tracking loads by default. `generate_lead` only on confirmed successful endpoint response; never for local demo validation.

Avoid sending personal contact fields to analytics. Validate consent and the local rules of any real audience before integrating a vendor.
