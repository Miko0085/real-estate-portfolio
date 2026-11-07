# ATELIER ESTATES — V5 reference audit and approval brief

**Date:** 2026-11-07
**Status:** REFERENCE + STRUCTURE PROPOSAL / NEEDS VISUAL APPROVAL.
**Current deployment:** `/real-estate-portfolio/luxury-brokerage/`
**Scope:** The third of five portfolio apps. **MARIS** and **NORTHLINE** remain untouched during the design-approval stage.
**Truth-in-advertising:** all inventory, prices, developers and the brokerage brand are fictional demo material. No actual clients, transactions, sale statuses or awards are implied.

## 1. Real reference websites and transferable patterns

| Role | Actual website | Relevant sections/UI | Pattern to reinterpret, not copy | Avoid |
|---|---|---|---|---|
| **PRIMARY for catalogue + property detail** | [JamesEdition / Real Estate](https://www.jamesedition.com/real_estate), [its official listing-page guide](https://help.jamesedition.com/en/what-does-the-listing-page-look-like) | Filterable search, large image-first listings, quick filters, price and technical facts, detailed photo/video/floor-plan viewer, nearby content | Clear inventory utility, serious detail pages, media-first inspection, visible save/share request actions | Their logos, actual photos, true listings, offer badges, counts, agent profiles, or exact visual layout |
| **PRIMARY for premium image direction and hierarchy** | [Sotheby's International Realty](https://www.sothebysrealty.com/eng) | Lifestyle property image hero, global buy/rent/developments search, editorial writing | Large imagery, minimal sharp typography, emotionally appealing but clear search | Sotheby's identifiable fonts/trade dress, trademark, brand copy, networks, credentials |
| **SUPPORT for area/development storytelling** | [The Agency](https://www.theagencyre.com/) | Global regions and related property search, featured developments, photo-led editorial sections | Give area guides and developments their own composition rather than reusing the property catalogue | Team portraits, offices, branded magazine covers, real press and performance claims |

References reviewed against official publicly accessible pages and JamesEdition help documents on 2026-11-07; no pixel measurements, exact DOM/color extraction or full screenshot comparison of original live pages is claimed. Before final design acceptance, capture same-viewport screenshots and compare structure, not trademarks.

## 2. Current ATELIER: actual audit from source code

**Already present (must preserve)**
- Full route set: Home, Properties, Property Detail, Developments, Development Detail, Areas, Area Detail, Buy, Sell, About, Insights, Contact, Privacy.
- Six fictional properties, two developments, three areas; static crawlable slug URLs.
- Five catalogue filters: area, property type, minimum bedrooms, maximum price, ready/off-plan. Query string hydration, reset and live result count.
- Contact form with `PUBLIC_LEAD_ENDPOINT`, honeypot, consent, loading/errors, no false success without a real endpoint, analytics and GitHub Pages static deployment.
- Page SEO and internal links via the shared layout.

**Confirmed design/UX deficiencies**
1. All 6 fictional properties have **one WebP image each**. In property detail, that identical image is used for both the main photo and the “alternative crop”; no real gallery exists.
2. Two development records reuse the same property images rather than development-specific scene sets.
3. Area guides reuse property images; the three areas are not visually distinct from property detail.
4. Most internal pages have near-identical large title+copy patterns and little specific visual hierarchy; current CSS is beige/green/Georgia while proposed V4 monochrome-gallery direction never reached the app.
5. Clicking an enquiry CTA passes `?property=slug` or `?development=slug` but contact form does not yet show the selected property in its visible state; add secure prefill / hidden provenance without pretending an agent is assigned.
6. `view_property` currently tracks link clicks; verify meaningful view events and stable UTM attribution in final QA.
7. No genuine media set or video/virtual tour per property; do **not** add empty play/tour buttons.

**Design risk:** if ATELIER adopts MARIS's light marine page anatomy or NORTHLINE's blue rounded cards, five independent sites will again look like recolors.

## 3. Distinct ATELIER visual system — proposed

**Creative position:** _Private gallery / luxury property archive_. A high-contrast, image-led **modern monochrome** showcase with a deliberately functional catalogue; unlike MARIS (white/turquoise off-plan page) and NORTHLINE (navy/cobalt international advisory).

- **Palette**: carbon `#111313`, bone `#F3F1EB`, silver `#D8DBD7`, white `#FFFFFF`; editorial acid-lime `#CBE987` only on 1–2 focused CTAs, tags or editorial numbering (not every button). Accent is a proposal, not copied source color.
- **Typography**: very heavy geometric sans display (sharp, short headlines), neutral sans body, small spaced-out metadata; no large Georgia headlines or decorative cursive.
- **Grid**: strong rectangular frames, asymmetric 2:1 and 3:2 image mosaics; generous gutters, thin rules, real whitespace; mostly square corners.
- **Photography**: architectural textures, rich natural light, full-building and true interior sequences; never the same hero photo in every block. Use original licensed imagery, never lift from references.
- **Motion**: restrained reveal/hover only; gallery keyboard/lightbox; `prefers-reduced-motion` respected.
- **Mobile**: 375/320 first viewport prioritizes property image, name/search and CTA, not oversized artwork or a maze of cards.
- **Copy character**: economical and specific, e.g. “A private view of distinctive homes.”, “Explore the collection.”, “Inside this residence.” Avoid “curated excellence”, imagined accolades and unverifiable testimonials.
- **No SERHANT-looking floating navy pill navbar**: distinct from NORTHLINE.

## 4. Home page — block-by-block (approval table)

| # | Block | What should be visible / format | Suggested English copy | Interaction |
|---|---|---|---|---|
| 01 | **Image-led hero / find a residence** | Nearly full-width architectural photograph, one strong short headline, separate 3-field slim search (area/type/budget). Mobile search collapses to one clear entry and filters. | **Exceptional spaces. A different perspective.** / *Explore fictional Dubai residences across distinctive neighbourhoods.* | **Explore Properties** → filtered catalogue; independent **View Featured Home** |
| 02 | **Featured collection** | Asymmetric grid: one cinematic feature image ~60% plus two smaller genuinely different houses; visible price/beds/size below, not copy-heavy cards. | **Selected residences.** / *Three different ways to live.* | Open property detail; view all |
| 03 | **Property search / quick filters** | Compact horizontal filters and result count strip, not another hero. Link to catalog view with URL params. | **Find your place.** | Area, type, beds and budget prefill catalogue |
| 04 | **Neighbourhoods** | Full-bleed three-panel neighbourhood photography: Palm Jumeirah, Dubai Hills, Dubai Marina; each shows an identifiable **area context** not a random house. | **Places shape the way we live.** | Click an area guide |
| 05 | **Signature property story** | One editorial two-column image + architectural detail: spacious, not another set of cards. | **More than an address.** / *Space, material and setting.* | **Explore the residence** |
| 06 | **New developments** | Two distinctive project-specific exterior renders with stage/factual demo context; visual treatment different from property cards. | **Architecture ahead.** | View developments |
| 07 | **Buy / Sell** | Dual minimal split with different imagery or editorial title treatments; no fake agent photos. | **Buying with clarity. Selling with intention.** | Buyer/Seller guides and enquiry |
| 08 | **Insights** | Three typography-led educational notes with genuine internal destinations; no invented market statistics or press logos. | **A closer look.** | Insights / guides |
| 09 | **Final enquiry CTA** | Near-black full-width band with one concise action, not a duplicate MARIS form. | **Start with a conversation.** | Contact page, preserved consent/honeypot |

## 5. Properties catalogue — UX and visual requirements

- Unique page anatomy: **not** black hero repeated from Home.
- Top heading and concise disclosure, sticky or well-placed responsive filtering region.
- Desktop: 3-up large image cards (more space for image than text); mobile 1-up. Show type, status **CONCEPT**, area, sample price, beds, size.
- Filters: Area / Property Type / Beds / Max Price / Ready-Off-plan; preserve existing query-string filters and blank state, reset and count. Add sort only if reliable; no fake “Recently listed” values.
- Image should be 4:3 or 3:2 crop with hover only on capable pointers; no image stretch.
- Card click opens crawlable /properties/[slug]/ and tracking event fires appropriately.

## 6. Property detail — critically important

- Dedicated magazine-level layout distinct from Home/Catalogue: breadcrumbs, strong name, location and **sample** price; full-width **true media mosaic**.
- Minimum **5 distinct images per property** in production: (1) recognizable exterior/whole residence, (2) main living, (3) kitchen/dining, (4) bedroom or suite, (5) terrace, garden or view; for villas include facade and garden, for penthouses terrace and skyline.
- Each property must have coherent architecture across its own five frames; six properties must look like six different residences. No mirrored/cropped same source presented as different rooms.
- An accessible expandable photo gallery: keyboard escape, next/previous, focus return, alt text, real image loading. No video/tour buttons until playable assets exist.
- Specs alongside or below photo: price, neighbourhood, type, bedrooms, bathrooms only if grounded in sample data, interior size, stage. Unique description and features.
- Inquiry CTA carries selected `property_slug` and title through to Contact form. With no endpoint: truthful demo feedback, no phantom booking/agent.
- Related properties from same area/type with no duplicate current property.
- Sample numbers and status explicit; never “For Sale”, “Sold”, “Exclusive” as actual status.

## 7. Other page types must be distinct

| Pages | Design/IA direction | Functional preservation |
|---|---|---|
| Developments listing | Architectural feature grid with project status and concept preview | Routes /developments/ + clear links |
| Development Detail | Project-scale hero; overview, conceptual residences, stage, example floor plan only if real file, gallery, location context, enquiry | Preserve unique slug/SEO and sample status |
| Areas listing | Three clear district thumbnails and descriptors, not property cards | Links to /areas/[slug]/ |
| Area Detail | Place-first location gallery, district overview, practical buyer considerations, area-filtered property collection | Deep link to /properties/?area=slug |
| Buy and Sell | Two separate editorial guides with strong but distinct compositions | Existing processes and contact CTA |
| About | Fictional studio concept, no fake agents/awards/licensing | Real disclosure |
| Insights | Useful published-on-site articles/sections, not fabricated third-party press | Internal linking |
| Contact | High-contrast split and accessible real form, selected listing context, privacy consent, error/valid/success states | Shared safe endpoint, UTM/GCLID, no false success |

## 8. Unique media production contract — gate before claiming production quality

- **Property gallery**: 6 × 5 minimum = **30 unique, coherent concept frames**, each grouping one consistent residence; no reuse between the six property identities or across the other four websites.
- **Development**: 2 × 4 = **8 unique** project renders (different from property gallery), one recognizable project identity per development.
- **Area guides**: 3 location-context photographs with truthful geographic characterization, not presented as listings (licensed editorial if real area imagery used).
- **Home/editorial**: 2–3 separate hero/story frames that belong to ATELIER only; one may deliberately reuse a gallery image **within** the same ATELIER property if labelled consistently (not cross-brand reuse).
- **Asset manifest**: filename, related property/development, image role, original/generated/licensed source, photographer/license where relevant, scene notes, orientation, alt text, responsive crop and SHA-256 to identify exact duplicates.
- **Stop rule**: if image generation returns full website mockups, mislabeled or architecturally inconsistent scenes, reject them; don't crop screenshots and call them original property photos.

## 9. Implementation and objective QA acceptance

- Existing Astro/TypeScript monorepo; static GitHub Pages / Cloudflare Pages deploy; don't change other four apps or shared conventions without compatibility tests.
- Core invariants: six properties, two developments, three areas, all crawlable route types, five catalogue filters, URL query persistence/reset/empty, selected-property enquiry context, form privacy/consent and safe HTTPS configurable endpoint, UTM/GCLID, required analytics, noindex demo, canonical/OG/sitemap.
- Mobile widths: **320, 375, 430, 768, 1024, 1440**; check entire pages **and** open gallery/filters/contact states for overflow.
- Accessibility: WCAG 2.2 AA target where practical, labeled selectors, keyboard-accessible gallery, focus return, readable overlay contrast, reduced-motion.
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 as measured field/lab goals; avoid excessive animations, eager-load only above-the-fold media.
- End-to-end: filter by area/beds/status, Reset/URL reload; property detail all 5 distinct frames, keyboard lightbox, enquiry prefill; development and area routes, form validation and no-endpoint outcome, mobile nav and SEO.
- Compare final desktop 1440/mobile 375 screenshots against approved **ATELIER** proposals and reference structure, not pixel-copy original brands.

## 10. Stages, same as MARIS / NORTHLINE

**Stage A — NOW: reference research + approval brief.** This document: approve distinct creative direction, nine home blocks and strongly differentiated catalogue/detail pages. Do not change live ATELIER in this stage.

**Stage B: visual master-reference and interactive preview.** Original 1440+375 hero, catalogue and full property detail screens. Use design-review path; ask approval before migration.

**Stage C: original coherent media.** First lock 1 exemplar property identity; then create full 30+8+3+ series and manifest; reject image repetition.

**Stage D: integrate into Astro.** Keep filters, query URLs, routes, analytics, forms and source sample data; verify forms are not mock success.

**Stage E: screenshot/behavior/Lighthouse QA, fix and deploy.** Only call complete when images, galleries and functionality satisfy the quality gate.

**Approval checkpoint:** choose the **black / bone / restrained lime** ATELIER private-gallery design system; accept the **nine sections** and **detail-first media production** before implementation.
