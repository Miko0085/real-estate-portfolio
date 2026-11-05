# FIELDNOTE Property — Website project

**Status:** Implemented portfolio demo. Fictional identity, sample prices, original concept imagery; no real clients, sales, inventory, returns or advisory licensing.

## Business problem
Collect context required for a seller valuation review while explaining that a valuation is never automatically produced.

## Target audience and traffic
Property owners researching a future sale; valuation-focused search and paid social.

## Design references
See [references.md](references.md) for 3 real information-architecture and 3 visual-design reference sites, referenced patterns and exclusions.

## UX and CRO
The design favours meaningful next actions, legible content, qualified enquiry forms and explicit sample disclosures over invented urgency or fake social proof.

## Pages
- `/`
- `/privacy/`


## Functional implementation
- Three-step seller form: property details → occupancy/value/timeline → contact/consent
- Accessible field validation with back/continue, progress and local-only demo status
- Seller process, marketing approach, qualitative market insight examples and FAQs
- Optional configured HTTPS webhook and attribution capture


## Technology
Astro static rendering, TypeScript and Tailwind CSS; JavaScript only for necessary form, filter or calculator interactivity. Shared SEO, analytics, structured data and form packages; GitHub Pages build with a path prefix.

## AI / coding assistance
Code and design drafts were AI-assisted and refined against reference patterns. This is development-process documentation, **not** a claim about client delivery or results.

## Still demonstration-only
Lead forms do not transmit by default. A real integration requires an HTTPS API, server-side validation, consent records, rate limiting and privacy notice. All calculations, development facts and offers are illustrative.

## QA
See `accessibility.md` and `performance.md`; final browser and Lighthouse checks are recorded in repository QA reports rather than asserted from source code alone.
