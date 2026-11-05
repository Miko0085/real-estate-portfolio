# Phase 1 QA — factual execution record

**Executed locally on 2026-11-05.** This is an AI-generated code portfolio, not a real construction or brokerage offering.

| Check | Result | Scope / limits |
| --- | --- | --- |
| Shared validation/attribution/endpoint unit tests | 11 passed, 0 failed | Node test runner; includes consent, enum, invalid contact, demo mode, receipt acknowledgement |
| Monorepo static source checks | 95 passed, 0 failed | File paths, documentation, app architecture, page sections, CTA/form fields, assets |
| TypeScript shared/source semantic check | 0 errors | `tsc -p tsconfig.source-check.json` on shared `.ts` and first-site scripts; does not replace Astro component checking |
| Astro frontmatter parse syntax | 0 parser diagnostics | Syntax only, **not** `astro check` |
| Browser responsive simulation | 6/6 passed | Chromium 320, 375, 430, 768, 1024 and 1440 px; generated offline visual QA preview; no horizontal overflow, broken images, missing labels or browser errors |
| Sample brochure PDF render | 3 pages rendered | Visual cover and content inspected; original demo content |
| Actual Astro build | **Blocked / not verified** | npm registry unavailable to this execution environment; `astro: not found` (dependencies not installed) |
| Lighthouse / field Core Web Vitals | **Not measured** | Only meaningful after Astro production build and URL deployment; no LCP/INP/CLS claim |
| Formal automated axe / manual SR WCAG audit | **Not performed** | Browser checks limited to basic labels/focusability; WCAG 2.2 AA is a target |
| Real endpoint success/failure integration | **Not performed** | No real CRM endpoint configured; tests mock explicit accepted receipt; no user data sent |
| GitHub repo publication | **Not performed** | GitHub connector can inspect/update existing repositories but cannot create a new repository; user must supply/create an empty target |

## Changes after self-audit

1. Corrected an incorrect unit-test assertion when validating missing contact methods (two distinct contact field errors are returned).
2. Replaced third-party stock references with original SVG concept drawings and repeated visible disclaimers.
3. Added an actual sample PDF brochure rather than a non-working button.
4. Defined a real opt-in WhatsApp URL only when a public business number is explicitly configured; otherwise CTA selects the WhatsApp contact preference in the demo form.
5. Changed unenhanced browser form fallback to POST, preventing contact data from being exposed in query parameters when JavaScript is unavailable. The fallback route must be implemented by the eventual Cloudflare Pages Function.
6. Hardened success attribution so a bare HTTP 2xx does **not** imply lead delivery: endpoint response must include `{ "ok": true, "lead_id": "..." }`.

## Blocking release gates

Install npm packages with a network-enabled development environment, generate and commit a lockfile, run `npm run check:offplan` and `npm run build:offplan`; resolve any compiler errors. Run browser QA against the **actual local Astro site** (not the markup preview), perform Lighthouse mobile/desktop and axe, keyboard and real-device checks, and verify CSP/CRM webhook with a real test endpoint. Only then label Phase 1 release-ready or start implementing the remaining four sites.
