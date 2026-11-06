# HomeValue / Seller Leads — Design reference board V4

**Status:** visual proposal for review; live production pages were not replaced in this phase.  
**Business job:** Reduce effort for owners wanting to explore a valuation, rather than sell them an atmospheric property lifestyle.

## Specific live references

**Primary:** [Redfin — What is my home worth?](https://www.redfin.com/what-is-my-home-worth)  
**Supporting:** [betterhomes — valuation](https://www.bhomes.com/en/sales/property-valuation)  
**Supporting:** [The Agency — sell](https://www.theagencyre.com/)  

The references were verified for information architecture and recognizable design patterns. Their live desktop/mobile screenshots, exact font family and pixel measurements have **not** been independently captured or authenticated in this review; do not treat proposed tokens as copied source styles.

## Patterns deliberately adapted
- One simple property area/address input is visible immediately
- Value proposition and validation are approachable, not intimidating
- Progressive property facts follow after the first question

## Do not copy
- Redfin valuation algorithm or live estimates
- Client reviews or trust badges with invented numbers
- Exact color palette and brand structure

## Prior defect → New composition

**Prior:** Large lifestyle image took attention from the form, CTA led to a form below the fold; same serif headline conventions as other sites.

**Proposed:** Distinct blue-and-white consumer service look; a practical address/building input visible before scroll on desktop and mobile; form-focused inner page with labelled fields, progress and no fake automated valuation result.

**Distinct design system:** Soft blue #EDF5FF; royal blue #1E5CE6; ink #102E54; white #FFFFFF; bold friendly sans with rounded inputs.

**How this differs from other four websites:** Product-led light service UX. Only the Seller site presents a form in the first viewport.

## Prototypes

- [Home / first screen](../../design-review/v4/seller-leads/index.html)
- [Critical inner page](../../design-review/v4/seller-leads/detail.html)

## Acceptance before migrating to existing app

- [ ] At 375px: primary field and CTA visible near top
- [ ] Accessible validation, no unverified price outputs
- [ ] Step progress and back action correctly connected when integrated
- [ ] No false instant estimate or real client proof

- [x] Desktop and mobile static mockups exist at 1440px and 375px.
- [x] Image files are embedded locally, fictional and rights-clear as original generated concept assets.
- [ ] User approval of visual direction and UX emphasis.
- [ ] Full existing routes/forms migrated and browser E2E regression tested.
- [ ] Performance/Lighthouse and WCAG review after migration.
