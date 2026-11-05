# ATELIER Estates — Website project

**Status:** Implemented portfolio demo. Fictional identity, sample prices, original concept imagery; no real clients, sales, inventory, returns or advisory licensing.

## Business problem
Show how a premium brokerage can organize discovery across properties, neighbourhoods and new developments with real crawlable static URLs.

## Target audience and traffic
Buyers and sellers browsing sample high-end Dubai homes.

## Design references
See [references.md](references.md) for 3 real information-architecture and 3 visual-design reference sites, referenced patterns and exclusions.

## UX and CRO
The design favours meaningful next actions, legible content, qualified enquiry forms and explicit sample disclosures over invented urgency or fake social proof.

## Pages
- `/`
- `/properties/`
- `/properties/[slug]/`
- `/developments/`
- `/developments/[slug]/`
- `/areas/`
- `/areas/[slug]/`
- `/buy/`
- `/sell/`
- `/about/`
- `/insights/`
- `/contact/`
- `/privacy/`


## Functional implementation
- Six fictional property profiles with price, beds, area, type, status and property detail pages
- Filter by area, property type, minimum bedrooms, price ceiling and delivery status
- Two fictional developments, three editorial areas, buying, selling, about, insights, contact
- Configurable enquiry form with consent and anti-spam honeypot


## Technology
Astro static rendering, TypeScript and Tailwind CSS; JavaScript only for necessary form, filter or calculator interactivity. Shared SEO, analytics, structured data and form packages; GitHub Pages build with a path prefix.

## AI / coding assistance
Code and design drafts were AI-assisted and refined against reference patterns. This is development-process documentation, **not** a claim about client delivery or results.

## Still demonstration-only
Lead forms do not transmit by default. A real integration requires an HTTPS API, server-side validation, consent records, rate limiting and privacy notice. All calculations, development facts and offers are illustrative.

## QA
See `accessibility.md` and `performance.md`; final browser and Lighthouse checks are recorded in repository QA reports rather than asserted from source code alone.
