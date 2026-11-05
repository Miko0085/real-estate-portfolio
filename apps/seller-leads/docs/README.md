# FIELDNOTE Property · fictional brand

**Build status:** Reference-led scaffold only.

**Business problem:** Turn seller valuation interest into a qualified, consented consultation request.

**Target audience:** Dubai property owners considering a sale

**Traffic source:** High-intent Search / remarketing / referrals

**Design references:** see [`references.md`](./references.md), containing six real site references, explicit components and copying restrictions.

**UX/CRO decisions:** CTA anchored to progressive form; explain next step, avoid claiming instant market value without validated comparables.

**Technical implementation:** Astro 5 + TypeScript + Tailwind 4 via Vite, CSS art direction unique to this app, static Cloudflare Pages output. Shared UI/SEO/forms/analytics packages. This app is reference-led scaffold only.

**Analytics architecture:** start_form, form_error, generate_lead, conversion-step and CTA events. Preserved UTMs and GCLID for lead payload, no third-party vendor by default.

**AI/coding agent role:** source layout, initial copy, schema decisions, prototypes, and deterministic checks prepared with AI assistance; no claim of real sales or measured impact.

**Demo/sample functionality:** Fictional brand, copy and all illustrative property/financial data. No real client work or actual inventory. This app is a scaffold, not a finished site. Its planned quiz/catalogue/funnel/microsite is NOT implemented.

**Remaining gates:** dependency install, Astro typecheck/build, touch/keyboard audits, asset licensing review, security/CORS and live conversion checks, Lighthouse on production URL.
