# Visual Redesign V4 — Five independent design concepts

This is **Phase A: design approval**, not a claim that all existing websites were rebuilt. Ten standalone responsive HTML prototypes have been prepared (five first screens + five key inner-page views), retaining the existing five apps unchanged. Each is intentionally more distinct than merely reskinning a common template.

## Design matrix

| Project | One-sentence feel | Typography | Layout | Main UX | Reference family |
|---|---|---|---|---|---|
| Dubai Off-Plan | Search-intent real estate product page | Heavy geometric sans | Architecture 58% / project facts 42% | Price + units + plans + enquiry | Ellington / ORLA |
| Investor Advisory | International property journal | Expansive serif editorial | Typography 53% / destination media 47% | Destinations → investor brief | Christie's / Engel & Völkers |
| Luxury Brokerage | Monochrome fashion-catalogue | Ultra-heavy sans | Black editorial/black-white imagery with search | Search → property detail | Sotheby's / JamesEdition |
| Seller Leads | Consumer valuation service | Clear rounded heavy sans | Form-led 57% / home photo 43% | Address-first valuation | Redfin / betterhomes |
| Developer Project | Architectural monograph | Expressive modern classic serif | Single full-bleed architecture → dark masterplan | Project story → masterplan | ORLA / OMNIYAT |

## Design prototypes

[Open the standalone review index](../../design-review/v4/index.html). Each card links to first screen and critical inner page; assets are local and contain no third-party real estate photography.

## Boundary of this phase

- No changes to the production five apps or root portfolio homepage in this stage; the Pages assembly script only publishes this separate review directory.
- Imagery is deliberately fictitious. The 5 projects have separate hero assets in the review output (no photo is reused between different brand prototypes). The architecture concept has a single coherent coastal villa identity.
- The mini quiz, valuation form, and filters on these mockups are **visual prototypes only**. The existing sites have working example implementations; reconnect/test their functions on actual redesign migration.
- Do not claim live listing availability, investment returns, developer partnerships or valuations.
- Reference-site screenshots are not hosted or copied into this repository. Links document patterns rather than copying source designs; this stage does not supply a pixel-perfect side-by-side original website capture.

## Next implementation phase

1. Approve / refine each visual direction with desktop and mobile screenshots from this proposal.
2. Create unique media sets (4–8 distinct images **per property**, no intersite re-use); concept media here are for review only.
3. Migrate the proposed design to each existing Astro app one by one. Keep routes, SEO, analytics, forms, filters, calculator and lead flows intact.
4. Audit six viewport widths, keyboard and screen reader behaviors, visual diffs, E2E interactions and Lighthouse. Fix before publishing each site.
5. Update each application's own docs/references.md and README to describe the final design and media provenance.
