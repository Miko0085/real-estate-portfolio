# NORTHLINE Investor Advisory — Editorial and functional redesign V4.2

**Status:** Implemented portfolio demo (fictional). Live forms require an explicit configured HTTPS endpoint and consent.

## Why this redesign

- Previous NORTHLINE hero used a full-bleed dark promotional banner and blue/teal sections resembling other portfolio sites.
- Market cards and editorial examples were mostly atmosphere without a meaningful interaction path.
- The seven-step investor quiz originally returned the same three text-only profiles regardless of selected budget, geography, or delivery stage.
- The primary design reference is Christie’s international real estate editorial/portfolio format, with Engel & Völkers and SERHANT as secondary inspiration. No Savills reference, copied layout, brand or photography.

## What changed

1. **Distinct editorial design system:** warm paper `#F7F4ED`, dark forest `#1B393C`, muted copper `#A57850`, Georgia serif with disciplined sans-serif labels. Hero is a 53/47 magazine spread; photo on the right and information on the left. Unlike MARIS, this is not a developer product landing.
2. **Destinations:** Dubai, Lisbon and London have separate image panels, ownership questions, and click-through preselection in the qualification flow.
3. **Example property stories:** three independent editorial concept studies. The image assets remain clearly fictional and cannot be construed as genuine offers.
4. **Approach:** a restrained two-column editorial discussion, not a row of three generic feature cards.
5. **Seven-step quiz preserved:** Budget → Objective → Market → Delivery → Timeline → Financing → Optional Contact; contact information is not needed to view the results. Steps now have focused legends, accessible error messages and progress.
6. **Dynamic fictional example options:** a curated, static sample data set with explicit numeric *planning envelopes* in USD, filtered by the budget, market and property stage selections. Objective and timing influence ranking. Results cannot be presented as live listings or advice. If no fictional example matches all constraints, an honest no-match state is shown with a suggestion to revise filters. Markets are diversified when the user is open to them.
7. **Calculator preserved:** input fields for price, annual rent, annual service and management fees, occupancy, gross and estimated net yields, annual net income. Same shared, tested calculation function; no projected returns or investment guarantees.
8. **Lead submission:** Existing shared secure HTTPS submission abstraction, consent, honeypot, UTM/GCLID attribution and `generate_lead` only on successful receipt remain intact. Without an endpoint, locally validated inputs are not transmitted or stored.
9. **Clarity:** every concept, price, image, shortlist and return calculation contains sample/demo disclosures; no actual clients, licensing, awards or investment outcomes are claimed.

## Explicit non-goals

- Does not copy photography from Christie’s, SERHANT, Engel & Völkers or any other reference site.
- Existing 7 legacy AI-generated WEBP concept images are **not final art-directed international photo sets**; separate image-production pass is still required to make market geography and individual sample properties fully convincing and remove cross-brand reuse.
- No new real estate, rental, tax or financing market data is asserted.
- No actual finance, lead endpoint or real client inventory is added.

## Acceptance / regression checklist

- [ ] CI `astro check`, build, Pages assembly and deployment green.
- [ ] Desktop/mobile screenshots at 320/375/430/768/1024/1440 px; no overflow or broken images.
- [ ] Quiz enforces required answers for preference steps and keeps user-selected values across Back/Next.
- [ ] 7th step allows *viewing examples* without name, email or consent, but these are required to transmit an enquiry.
- [ ] Dubai + under $300k + ready shows a matching fictional Dubai concept; London + under $300k shows no-match state (not an invented listing).
- [ ] With Open market, variety in country selection and 3 or fewer examples.
- [ ] Calculator sample with $450k, $31.5k rent, $3.6k charges, $2.4k management, 90% occupancy returns gross 7%, net 4.97%, annual net income $22,350.
- [ ] Contact form with missing endpoint shows truthful demo-state; consent and honeypot retained.
- [ ] Privacy/canonical/meta and GitHub Pages base path preserved.
- [ ] Lighthouse performance and keyboard focus order measured after release; no unverified scores claimed.