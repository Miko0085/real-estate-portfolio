# MARIS Residences V4.2 — implementation

**Status:** Finalized portfolio website (fictional concept, not a sale offer). This project is deliberately independent of the four other real-estate examples in the monorepo.

## Visual language

- A sales-oriented Dubai off-plan landing, not an editorial brochure template.
- Geometric sans type, structured 42/58 hero, marine blue `#073c50`, bright white and light turquoise accents.
- Original MARIS architectural concept media: one rounded-balcony development, waterside podium, planted terraces, consistent neutral interior materials.
- Final hero sources `assets/maris/hero-desktop.webp` and `assets/maris/hero-mobile.webp`, with responsive picture source.
- 15 local WebP files (including mobile hero and 6 material/architectural detail crops); images show AI-generated fictional concept architecture, NOT photography of real units.

## Full-page structure

1. Hero: concept identity, AED 1.85M *sample*, floor plan CTA, direct sample brochure download.
2. Key facts: 1–3 bedroom types, illustrative 20/50/30, fictional handover Q4 2029.
3. Development overview: separate original coastal building perspective.
4. Residence comparisons: distinct 1, 2 and 3 bedroom interior concept images; uses `development.ts` for sizes/prices.
5. Floor plans: 3 keyboard-accessible tabs with descriptive labeled concept diagrams, downloadable PDFs and enquiry preselect.
6. Payment plan: 20% booking / 50% construction / 30% handover, always 100% total and clearly invented.
7. Amenities: editorial image grid with landscaping, pool, entrance, lounge and facade; no fake operating status.
8. Gallery: original concept images, category filters, dialog lightbox, close and keyboard arrow navigation.
9. Location: illustrative Dubai Islands *area-level* diagram, not a real plot pin or travel time.
10. Investment considerations: service charges, contractual completion risk, exit uncertainty; never a promised return.
11. Fictional developer declaration and FAQ.
12. Full buyer enquiry with existing local validation, honeypot, privacy consent, UTM/GCLID capture, loading/error states and configurable HTTPS lead receiver.

## Downloads

- `brochure/maris-concept-brochure.pdf`: six original pages, reviewed through PDF renderer.
- `floorplans/{1,2,3}-bedroom-concept.svg`: original schematic concepts (not to scale).
- `floorplans/{1,2,3}-bedroom-concept.pdf`: downloadable plan sheets with the same disclaimer.

## Demo safety

- All prices, dates, property dimensions, imagery, developer details, schedules and imagery are fictional.
- Direct brochure download has no hidden form gate.
- No lead is submitted if `PUBLIC_LEAD_ENDPOINT` is absent. Never report generated_lead without confirmed backend success.
- WhatsApp link is only live when `PUBLIC_WHATSAPP_NUMBER` is configured; otherwise it selects the WhatsApp contact preference in the enquiry form.
- Hosting via GitHub Pages is static; to accept real enquiries a secure consent-aware backend with anti-abuse controls is required.

## Regression and QA checklist

- 320, 375, 430, 768, 1024, 1440 pixel widths, no horizontal overflow.
- Correct 1/2/3 bedroom tab states and preselected type on enquiry CTA.
- Gallery category filter, dialog focus return, Escape, keyboard arrows, no broken images.
- Non-empty accessible form error summary, logical labels, consent and endpoint failure state.
- Canonical/OG correct under `/real-estate-portfolio/dubai-offplan/`, `noindex` in demo mode, live file URLs.
- Lighthouse targets remain aspirational until measured, not a claimed score.
