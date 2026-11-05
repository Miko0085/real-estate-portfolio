# Architecture — Real Estate Portfolio

- Five distinct static Astro applications inside an npm workspaces monorepo; each application has its own styling, pages and documentation.
- Tailwind CSS 4 / Vite, authored CSS and lightweight TypeScript enhancements instead of application-wide React hydration.
- Shared packages: UI/layout, typography, design tokens, analytics, form handling, SEO, structured data and utilities.
- Investor Advisory: interactive qualification steps, illustrative profiles, gross/net yield calculator.
- Luxury Brokerage: statically generated crawlable property, development and area routes; filtering with URL query parameters.
- Seller Leads: progressive three-step qualification form and seller education.
- Developer Project: architecture, residences, masterplan, floorplans, brochure, gallery and registration form.
- Dubai Off-Plan: retained original project-focused demo with sample brochure and qualification.
- Delivery: GitHub Actions builds each application with a site-specific BASE_URL and packages them into one GitHub Pages artifact.
- Campaign attribution captures UTM and GCLID in sessionStorage, with optional consented HTTPS submission. Demo forms never claim a lead was stored when there is no endpoint.
- Each site emits canonical, OG, robots and sitemap; sample projects are noindex by default; minimal WebPage/BreadcrumbList schema only.
- Security note: GitHub Pages hosts files only. It cannot act as a CRM receiver or apply Cloudflare _headers rules; a real backend requires server validation, privacy policy, consent records and anti-abuse controls.

## QA gates

Source unit tests and builds have passed. A generated-site link/asset audit has passed; browser visual, keyboard, accessibility and Lighthouse checks must be completed separately before claiming formal production certification.
