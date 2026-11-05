# MARIS Residences · sample Dubai Islands off-plan landing

**Build status:** Phase 1 — full implementation, runtime verification pending.

**Business problem:** Answer factual purchase questions before asking for enquiry. Capture qualifying info without suggesting investment guarantees.

**Target audience:** Google Search users evaluating a named Dubai off-plan development

**Traffic source:** Paid Search / brand+development+payment-plan long tail

**Design references:** see [`references.md`](./references.md), containing six real site references, explicit components and copying restrictions.

**UX/CRO decisions:** Query match in hero, direct jump nav, PDF as optional CTA, lead form after facts, mobile bar for access, no fake stock/discount claims.

**Technical implementation:** Astro 5 + TypeScript + Tailwind 4 via Vite, CSS art direction unique to this app, static Cloudflare Pages output. Shared UI/SEO/forms/analytics packages. This app is phase 1 — full implementation, runtime verification pending.

**Analytics architecture:** page_view, view_development, view_floor_plan, download_brochure, click_whatsapp, start_form, form_error, generate_lead (only on real 2xx). Preserved UTMs and GCLID for lead payload, no third-party vendor by default.

**AI/coding agent role:** source layout, initial copy, schema decisions, prototypes, and deterministic checks prepared with AI assistance; no claim of real sales or measured impact.

**Demo/sample functionality:** Fictional brand, copy and all illustrative property/financial data. No real client work or actual inventory. The first app includes locally validated lead forms but sends no lead until an endpoint is configured.

**Remaining gates:** dependency install, Astro typecheck/build, touch/keyboard audits, asset licensing review, security/CORS and live conversion checks, Lighthouse on production URL.
