# NORTHLINE Advisory — Website project

**Status:** Implemented portfolio demo. Fictional identity, sample prices, original concept imagery; no real clients, sales, inventory, returns or advisory licensing.

## Business problem
Help international buyers explore suitability, compare markets and understand illustrative rental income before requesting an introduction.

## Target audience and traffic
Cross-border property investors and second-home buyers; research-led traffic.

## Design references
See [references.md](references.md) for 3 real information-architecture and 3 visual-design reference sites, referenced patterns and exclusions.

## UX and CRO
The design favours meaningful next actions, legible content, qualified enquiry forms and explicit sample disclosures over invented urgency or fake social proof.

## Pages
- `/`
- `/privacy/`


## Functional implementation
- Seven-step budget → objective → market → ready/off-plan → timeline → financing → contact quiz
- Illustrative recommendations with explicit financial disclaimer
- Reactive rental calculator: price, rent, charges, management, occupancy, gross and net yield
- Optional configured HTTPS lead endpoint with consent and campaign attribution


## Technology
Astro static rendering, TypeScript and Tailwind CSS; JavaScript only for necessary form, filter or calculator interactivity. Shared SEO, analytics, structured data and form packages; GitHub Pages build with a path prefix.

## AI / coding assistance
Code and design drafts were AI-assisted and refined against reference patterns. This is development-process documentation, **not** a claim about client delivery or results.

## Still demonstration-only
Lead forms do not transmit by default. A real integration requires an HTTPS API, server-side validation, consent records, rate limiting and privacy notice. All calculations, development facts and offers are illustrative.

## QA
See `accessibility.md` and `performance.md`; final browser and Lighthouse checks are recorded in repository QA reports rather than asserted from source code alone.
