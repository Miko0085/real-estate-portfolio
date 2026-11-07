# NORTHLINE V5.3 — Production Astro migration

Scope: integrate the approved V5.2 SERHANT.-informed original design into **only** `apps/investor-advisory`, preserving the shared production functional infrastructure. This is NOT a copy of SERHANT. branding or properties.

- `src/layouts/NorthlineShell.astro`: unique header/footer, native Seo.astro, structured-data and analytics/forms imports.
- `src/pages/index.astro`: original V5.2 section structure plus production forms, dynamic matched shortlist and working calculator.
- `src/pages/brief/index.astro`: separate dedicated seven-step investor brief, same state/matching engine as main.
- `src/scripts/northline-ui.ts`: only visual UI (navigation, market filter, developments scroll, search prefill); seven-step matching and actual net/gross calculation **remain in existing** `src/scripts/investor.ts`.
- `src/styles/v5.css`: approved V5.2 styles + widget interaction bridge; old CSS still provides existing .nl-* production form styles where needed.

Safe submission requires configured `PUBLIC_LEAD_ENDPOINT` secure HTTPS. Without it, validated forms show no data transmitted; marketing consent and honeypot are required. Contact optional for viewing results; required for submitting a lead.

## Media status — partially complete

The live migration initially retains existing original conceptual NORTHLINE photographs, each with truthful fictional disclosures. The user-approved plan requested original destination, property and development images; the image generator did not produce production-ready standalone media in this session (it produced page mockups). **Do not claim the new 6-property gallery is complete.** Original art-directed visual series should be created in a separate media acceptance pass and then substituted, with a no-cross-brand-reuse check.

## QA targets

Six widths 320/375/430/768/1024/1440; verify initial and completed quiz states, alternate answers and no-match, back/next, real contact endpoint fallback, keyboard navigation, calculator baseline ($450k/$31.5k/$3.6k/$2.4k/90% -> 7% gross, 4.97% net, $22,350/year), UTM/GCLID persistence and SEO/sitemap.