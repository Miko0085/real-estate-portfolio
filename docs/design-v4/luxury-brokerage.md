# ATELIER / Luxury Brokerage — Design reference board V4

**Status:** visual proposal for review; live production pages were not replaced in this phase.  
**Business job:** Show a sophisticated brokerage experience with an effective catalogue, unique galleries and crawlable detail pages.

## Specific live references

**Primary:** [Sotheby’s International Realty](https://www.sothebysrealty.com/eng)  
**Supporting:** [JamesEdition — real estate search](https://www.jamesedition.com/real_estate)  
**Supporting:** [SERHANT.](https://serhant.com/)  

The references were verified for information architecture and recognizable design patterns. Their live desktop/mobile screenshots, exact font family and pixel measurements have **not** been independently captured or authenticated in this review; do not treat proposed tokens as copied source styles.

## Patterns deliberately adapted
- Photography-led featured collection paired with direct search and navigation
- Listings with meaningful data and large imagery, not meaningless cards
- Dedicated property detail layout with primary photo, secondary material/media, specifications

## Do not copy
- Sotheby’s name/type identity or property data
- Real listing photographs or any sold/available claims
- One-to-one color, layout or search UI

## Prior defect → New composition

**Prior:** Nearly identical black title banners on all internal pages, single-image fake galleries, and repeated real-estate visuals shared with other projects.

**Proposed:** Monochrome high-contrast gallery with lime editorial accent; oversize heavy sans headline, minimal search strip and an entirely separate property detail mosaic with price/size/beds below.

**Distinct design system:** Black #101112; off-white #F1F0ED; neon-lime #CDE88E; very heavy Arial Black; squared edges and image mosaic.

**How this differs from other four websites:** The only intentionally monochrome, fashion-editorial site. No ivory serif hero, no blue SaaS form, no beige architecture journal.

## Prototypes

- [Home / first screen](../../design-review/v4/luxury-brokerage/index.html)
- [Critical inner page](../../design-review/v4/luxury-brokerage/detail.html)

## Acceptance before migrating to existing app

- [ ] Every actual property detail gets 4+ genuinely different media views before moving live
- [ ] Filters shareable and mobile-accessible
- [ ] Unique area/development/detail page anatomy
- [ ] No same photo as both main and secondary gallery view

- [x] Desktop and mobile static mockups exist at 1440px and 375px.
- [x] Image files are embedded locally, fictional and rights-clear as original generated concept assets.
- [ ] User approval of visual direction and UX emphasis.
- [ ] Full existing routes/forms migrated and browser E2E regression tested.
- [ ] Performance/Lighthouse and WCAG review after migration.
