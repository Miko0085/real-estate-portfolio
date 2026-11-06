# MARIS V4.3 — visual and usability fixes

**Status:** implemented against approved V4.2 architecture. Navigation/header unchanged.

## Delivered
- Redrew three **separate, furnished concept floor plans** (SVG, PNG preview, matching PDF downloads). Each displays a different fictional zoning, furniture references, areas and a conspicuous not-to-scale / not-approved disclaimer. Rooms are indicative, not measurements.
- Enriched the residence selection cards with genuine layout distinctions (single suite / separate two-bedroom zones / family-size corner configuration) and key facts. Existing three artwork files remain concept illustrations pending a dedicated, coherence-checked interior shoot; no claim that new photography was produced.
- Fixed gallery CSS `hidden` being overridden by `display:flex`. Category filtering now changes visible images, and the grid explicitly resets its lead tile when filtered. Improved caption layout; preserved lightbox keyboard navigation.
- Replaced the informal island drawing with a more restrained **non-geographic context infographic**; it explicitly disclaims a real MARIS plot or distances.
- Reworked Investments into two-column contextual due-diligence information with costs, verification steps and market risks instead of three identical marketing cards.
- Reworked the developer disclosure into a compact concept-status feature with explicit fictional availability.
- Reduced payment section vertical padding; hero, original 20/50/30 data and all CTAs remain.

## Preserved
- No edits to header, nav links, menu controls, CSS navigation selectors or base routes.
- `development.ts` sample prices, areas, 20/50/30 schedule and Q4 2029.
- Buyer qualification, validation/consent/honeypot, endpoint security, UTM/GCLID, analytics, FAQ and direct brochure download.
- Existing public filenames and URLs for floor-plan PDF/SVG/PNG files remain unchanged.

## Remaining visual work / acceptance
- Separate genuinely different interior image compositions for 1BR / 2BR / 3BR; current source photographs are too alike. Generate from a single master architectural brief before replacing.
- Cross-device browser QA, category filter and lightbox keyboard/touch E2E, form error/success conditions, PDF downloads and Lighthouse.
- Static portfolio only: no real inventory, developers or commercial results are represented.
