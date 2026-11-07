# NORTHLINE V5.2 — SERHANT.-informed design review

**Status:** Visual review. This does **not** replace the live NORTHLINE Astro website.

Preview routes:

- `index.html`: a complete scrollable design proposal (all ten major blocks).
- `brief.html`: dedicated Investor Brief page layout (seven-step sample qualification flow).

## User-provided references

Based on the ten screenshots of the SERHANT. website supplied by the portfolio owner on 2026-11-07, restored to homepage order:

1. 10:47:23 — cinematic hero and search.
2. 10:47:35 — large rounded Regions section.
3. 10:47:43 — Featured Properties.
4. 10:48:33 — New Developments horizontal image strip.
5. 10:48:55 — global referral-network illustration, used here only as an information-design inspiration.
6. 10:49:10 — strong blue technology interface, reinterpreted as a functional yield calculator.
7. 10:49:18 — agent recruitment asymmetric typographic layout, reinterpreted as investor brief UI.
8. 10:49:30 — minimal editorial press feed, reinterpreted as actual educational questions.
9. 10:49:44 — full-blue contact section, reinterpreted as a non-submitting demo form.
10. 10:49:55 — newsletter and sitemap footer, reinterpreted as direct CTA + simple footer; no fake subscription.

Sources (original brands, not copied media/code): https://serhant.com/.

## What is intentionally different

NORTHLINE is a fictional international **investment advisory experience** rather than a US brokerage. The brand, copy, hero search fields, sample home data, layout proportions, type hierarchy, visual treatment, functional content and imagery are authored independently. No SERHANT. logos, photos, video, press, achievements, client data, agent names or company claims are used.

Design choices for NORTHLINE: navy `#0b2065`, royal blue `#315de8`, ink `#121d31`, light grey `#f4f6fa`, bold system/Inter typography. No fabricated performance numbers, return guarantees or listings.

## Functional mockups

- Hero market/budget/objective search prefills the investor brief.
- Market pills filter visible destination cards. Destination and sample property links prefill selected market.
- New developments carousel supports button and keyboard/scroll navigation.
- Investor brief supports six required preference questions and optional contact, back/next, a truthful no-match state and result cards with sample data. This is isolated frontend state; nothing is transmitted.
- Calculator computes *gross yield = rent / purchase price*, *annual net income = rent × occupancy − service charges − management*, and *net yield = net income / price*. Inputs are adjustable.
- Contact is validation-only. An explicit notice states that no message is sent. There is no CRM endpoint.

## Media limitations / next stage

All property concept imagery is sourced from **existing original generated NORTHLINE assets**, reused within this single preview. Photographs are **not** borrowed from SERHANT. This is a UI-direction prototype rather than the final independent 6-property media library. The final implementation stage requires unique photos for each fictitious property, distinct market geographies, and coherent original development series; no cross-site duplication.

## QA performed

- 2 standalone HTML pages × 6 widths = **12 static responsive render tests** at 320 / 375 / 430 / 768 / 1024 / 1440 px.
- All test states: no horizontal overflow, 1 H1 per page, all included images decode, no browser JS page errors.
- Sample calculator baseline: `$450k` purchase / `$31.5k` rent / `$3.6k` service / `$2.4k` management / `90%` occupancy = **7.00% gross**, **4.97% net**, **$22,350 income**.
- Quiz: 7 steps and sample results verified, with results rechecked at all six widths.
- Search-to-quiz market / budget / objective prefill verified.

**Not yet done:** live Astro integration, CRM/analytics regression, screen reader manual audit, Lighthouse measurement, production image set, true external network/form delivery.

## Review gate

Approve the visual direction and section structure before moving this layout into `apps/investor-advisory`. Do not remove the working existing quiz, calculator, SEO, analytics or forms during migration.