# QA log — phase 1

**Truthful status:** Implementation source is provided; production QA requires package installation and a successful Astro build and deployed runtime checks. Do not interpret structure checks as proof of LCP, INP, CLS, Lighthouse or WCAG compliance.

## Automated gates

- Source audit: `npm run audit:static`
- Shared TypeScript semantics (can run with global TypeScript): `npm run check:source`
- Type/Astro components: `npm install && npm run check:offplan`
- Build: `npm run build:offplan`
- Unit: `npm test`
- Browser: `BASE_URL=http://localhost:4321 python scripts/browser-qa.py` (requires local Playwright and Chromium)
- Lighthouse: `npx lighthouse http://localhost:4321/ --chrome-flags='--headless --no-sandbox' --output html --output-path lighthouse.html` (requires dependency + Chrome and internet for first install)
- axe: run axe DevTools or `@axe-core/playwright` against 320/375/430/768/1024/1440 px, review manually.

## Manual blocking checklist

- 320 / 375 / 430 / 768 / 1024 / 1440 px: no overflow; usable header, forms, CTAs, tap targets
- Keyboard-only: skip link, menus, form errors, focus order, details and links
- Reduced-motion simulation, contrast audit and screen-reader labels
- Lighthouse mobile + desktop: LCP <=2.5s, INP <=200ms, CLS <=0.1 as **targets**, not measured results
- Validate all metadata against real domain; robots/sitemap on production only
- Security: enforce CSP and HSTS only on domains using HTTPS; test real endpoint CORS and rate limits
- Lead lifecycle: consent/no-consent, invalid inputs, disconnected, 4xx, 5xx, timeouts, slow requests, double submits, honeypot, UTM capture
- Human review of fictional branding and image licensing before live publication


See `apps/dubai-offplan/docs/qa-report.md` for the actual executed checks and known release blockers.
