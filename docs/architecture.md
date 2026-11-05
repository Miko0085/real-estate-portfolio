# Architecture decisions — ADR 001

- **Static Astro (all five apps).** Avoid client-side hydration unless an interaction materially requires it; first app uses browser-native `<details>`, form enhancement and a few lines of vanilla TypeScript.
- **npm workspaces** keep Cloudflare deployment configuration simple without mandatory pnpm.
- **Tailwind 4 via `@tailwindcss/vite`**, with site-specific authored CSS for designed components. Shared tokens are defaults, not a mandate to homogenize the five sites.
- **Shared packages** are compiled from `src/index.ts` by Astro/Vite; no runtime service or database dependency.
- **Per-app SEO/site URLs** with noindex as the safe demo default; sitemap and robots generated at build time.
- **Forms** validate client-side, never fabricate submission; opt-in endpoint and server responsibility for validation, consent logging, DNC and rate limits.
- **Attribution** captures UTM + gclid from the landing URL in sessionStorage (tab scope; best effort), persists to lead payload, no third-party analytics loaded by default.
- **No schema spam**: static sample landing uses WebPage and BreadcrumbList only. No made-up offers/ratings/business identity schema.
- **Progressive enhancement**: legal link, navigation, information and FAQ work without JS; form requires JS to connect a configured endpoint and transparently states demo mode.
- **Gates:** (1) source review + references; (2) local build/types + unit tests; (3) visual and responsive QA; (4) axe/Lighthouse + manual screen-reader/keyboard; (5) independent apps only after phase 1 passes.

Sources: https://docs.astro.build/en/guides/styling/ ; https://tailwindcss.com/docs/installation/framework-guides/astro ; https://developers.cloudflare.com/pages/configuration/monorepos/
