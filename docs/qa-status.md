# Portfolio QA status — 2026-11-05

## Completed locally before GitHub publication

- Four additional Astro applications implemented with distinct design systems, content, accessible form flows and demo disclosures.
- Shared layout, form submission abstraction, campaign attribution and financial calculator module added.
- 17 unit/source tests pass; TypeScript source checking passes; source structure audit passes.
- PDF sample brochure rendered and visually inspected.

## Outstanding release validation

- Run Astro and TypeScript check plus build for all apps in GitHub Actions (npm registry unavailable in local environment).
- Validate generated routes, images, canonical URLs and links from the GitHub Actions build artifact.
- Run Chromium at 320, 375, 430, 768, 1024 and 1440 px; check overflow and interactive flows.
- Lighthouse and screen-reader verification are separate acceptance gates; no metrics claimed without measurements.
- GitHub Pages cannot process POST submissions; external HTTPS lead endpoint is deliberately not configured.

All inventory, prices, market scenarios, people, businesses and architectural imagery in these four apps are fictional examples.
