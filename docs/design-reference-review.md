# Real Estate Portfolio — design-reference review / pre-redesign

**Date:** 2026-11-05  
**Scope:** five portfolio applications. This is a reference study, **not** an approval to copy visual assets, logos, templates or code. No redesign was performed in this phase.

## Method / what counts as evidence

- References below are **specific live pages**, not loose brand names. We separately identify patterns visible in page layout/content, suggested original design choices, and conversion requirements.
- Proposed typography and hex palettes are **our intended new design tokens**, not claims about the original sites' exact CSS or fonts. Exact screen measurements, custom fonts and interactions must be checked in browser screenshots before pixel-level implementation.
- For each app select one *primary visual reference*, two supporting references for content/UX, and explicitly list elements to adapt and elements not to reproduce.
- The four post-Dubai sites already have working demo source, but design sign-off is **not** done. Do not extrapolate commercial effectiveness from visual quality.

## 1. Dubai Off-Plan / Google Search — factual sales landing

**Primary visual reference:** [Ellington — Eltiera Views, project-specific page](https://ellingtonproperties.ae/en/property-for-sale/eltiera-views-jumeirah-islands) (a deliberate project composition with **Enquire**, **Download Brochure**, amenity and location sections).

**Supporting references:** [Six Senses Residences Dubai Marina](https://www.sixsensesdubaimarina.com/) (unit types, wellness amenities and project information); [ORLA by OMNIYAT](https://orla.omniyat.com/) (prominent Download / Call / WhatsApp, quick project facts, individual residences and floor-area hierarchy).

**Style to study:** editorial luxury, restrained header, very large project imagery, generous white space, typography in a clear 2-level hierarchy (expressive display for identity, disciplined sans for specifications), warm neutral background with one subtle brand accent, sparse rules rather than many generic cards. Visual rhythm: full-width architecture → concise facts strip → detailed project content → strong plans and enquiry.

**What to adapt:**
1. Hero with project name, location and clearly marked fictional visualization, followed **immediately** by starting price, bedrooms, handover and payment plan — Search intent outranks spectacle.
2. Compact anchored navigation for Overview / Units / Payment / Plans / Location; unobtrusive but persistent CTA on mobile.
3. Unit-type rows, floor-plan previews, brochure download and short qualification form; trust through factual specificity, not testimonials.
4. Location map (if grounded), amenities and an honest risks/considerations section.

**Do not copy:** original renders, names, UI code, brand storytelling, real inventory, verified facts, animation timing. No fake urgency or fabricated ROI.

**Proposed distinctive system:** deep mineral teal + ivory + restrained copper; 12-column large-screen layout, simple sans labels and a characterful display serif. Not a pixel copy of Ellington.

## 2. International Investor Advisory — data-first advisory

**Primary visual/IA reference:** [Knight Frank — global property services](https://www.knightfrank.com/services) (international service hierarchy, trustworthy editorial content, access to research and consultation).

**Supporting references:** [Savills — Global Research](https://www.savills.com/insight-and-opinion/research.aspx?page=1&rc=World) (structured research/publication surfaces); [Global Property Guide — rental yield comparisons](https://www.globalpropertyguide.com/rental-yields) (numeric scannability, market comparison tables and clearly described methodology).

**Style to study:** financial-publishing aesthetic rather than glossy property-advertising hero: compact typography scale for controls, bold editorial headings, light background, disciplined grids, ample contrast, restrained charts with visible units and explanatory labels. The calculator should visually resemble an analytical workspace, not a marketing widget.

**What to adapt:**
1. Intro explaining who the advisory flow serves + one primary **Explore options** CTA; no decorative giant shape that says nothing.
2. One-question-per-step qualification with step count, Back, Save progress when reasonable, explicit results labeled “illustrative scenarios”.
3. Calculator with input and result panes, formula/methodology, assumptions, currency, occupancy, expenses and gross vs estimated net yield.
4. Structured market/strategy cards with risk flags and “why this is shown” explanations; CTA for a consultation without suggesting regulated financial advice.

**Do not copy:** firm credentials, charts/data, logos, forecasts, yield guarantees or recommendation logic. Avoid presenting illustrative model outputs as real opportunities.

**Proposed distinctive system:** warm white + midnight navy + muted bronze; dense but readable tables, monospace numeric accents, sober editorial sans headlines. Keep this site distinct from premium cinematic developer projects.

## 3. Luxury Brokerage — searchable catalogue

**Primary visual/UX reference:** [Sotheby’s International Realty](https://www.sothebysrealty.com/eng) (search-first home, clear Buy / Rent / Developments / Sell journeys, luxury editorial tone, locations and lifestyles).

**Supporting references:** [JamesEdition real-estate search](https://www.jamesedition.com/real_estate) (location, price and bedrooms controls); [JamesEdition listing results](https://www.jamesedition.com/real_estate/house) (image, area, beds, baths, price, listing detail density); [SERHANT.](https://serhant.com/) (bold property-feature storytelling and dedicated New Developments).

**Style to study:** photographic luxury with strong utility. Photography dominates but property search must remain obvious. Cards are built around the real information density (price, area, beds, type), not arbitrary icon and marketing-card patterns. Use generous image aspect ratios and restrained borders.

**What to adapt:**
1. One visually distinctive full-width hero with immediate property search and featured listings below.
2. Responsive listing filters with active chips, reset, count, shareable URL/query and keyboard access. Desktop sidebar or toolbar; collapsible mobile filter sheet.
3. Crawlable Property Detail / Development Detail / Area Detail pages with breadcrumb, photography, facts, map, enquire/showing CTA and related links.
4. Editorial area guides and development collections with consistent content rhythm.

**Do not copy:** listing photographs, agent identities, brand marks, IDX feeds or actual sale/availability claims. No inflated portfolio statistics.

**Proposed distinctive system:** white gallery space + charcoal typography + sage micro-accents, sophisticated yet readable serif for editorial titles; large authentic-looking **licensed or clearly generated fictional** architecture photography. Do not reuse the same image repeatedly.

## 4. Seller Lead Generation — conversion, not spectacle

**Primary UX/IA reference:** [betterhomes — property valuation](https://www.bhomes.com/en/sales/property-valuation) (explainable 3-step process: details → expert consultation → report; visible FAQs and valuation CTA).

**Supporting references:** [Redfin — What is my home worth?](https://www.redfin.com/what-is-my-home-worth) (prominent single address entry); [Savills — selling a residential property](https://www.savills.co.uk/services/buying-or-selling/selling-a-residential-property.aspx) (strong customer reassurance and clear valuation route).

**Style to study:** a high-contrast, low-friction utility page: generous white space, one strong headline, visually simple form, numbered process and a few substantive credibility explanations. Use photography as context, never let it compete with the first form interaction.

**What to adapt:**
1. **Get a property valuation** as the dominant first action, with area/building first (not ten fields above the fold).
2. Progressive 3-step form; progress, back, persistence/validation, consent, and explicit description of what the user receives.
3. “How it works” and “Marketing approach” sections plus concise FAQs; mobile touch targets and useful error messages.
4. Honest sample-market observations with clear “demo / no live valuation” disclosure instead of generating a fabricated estimate.

**Do not copy:** betterhomes/Savills trust statistics, success rate, testimonials, agents, logo or inaccurate valuation guarantee. Do not display a real-looking AI-generated value without a valid data methodology.

**Proposed distinctive system:** warm off-white + forest ink + clay accent; large confident sans headings, restrained imagery, prominent form surface. Different UX from Investor quiz by reducing distractions.

## 5. Developer Project Microsite — architecture-led immersive story

**Primary visual reference:** [ORLA, Dorchester Collection by OMNIYAT](https://orla.omniyat.com/) (full-screen architectural experience, highly curated residences/amenities/location/payment plan and persistent contact/download routes).

**Supporting references:** [OMNIYAT — The Art of Elevation](https://omniyat.com/) (immersive brand and architecture storytelling); [Ellington — The Meriva Collection microsite](https://the-meriva-collection.ellingtonproperties.ae/) (coastal place-making, driving distances and real payment-plan content structure).

**Style to study:** editorial architecture-magazine direction: asymmetrical scale, full-bleed photography, large expressive but restrained display titles, strongly art-directed image sequence, alternating quiet negative-space sections and immersive imagery. Minimal navigation; details remain accessible through structured sections, not motion-only navigation.

**What to adapt:**
1. Statement hero with original, high-quality fictional development imagery (not simple geometric placeholder SVG).
2. Architecture statement, material/space details, large masterplan with labels, residence typologies, amenities and composed galleries.
3. Floor plans presented as downloadable meaningful artifacts; payment milestones and location information in legible, honest tables.
4. Sticky but unobtrusive **Register interest / Download brochure**; first-party form in accessible HTML.

**Do not copy:** OMNIYAT or Ellington renders, cinematic videos, slogans, exact layouts, architectural credits and luxury brand partnerships. Avoid autoplay and costly oversized video.

**Proposed distinctive system:** limestone + black-brown + subtle oxblood; editorial display serif, restrained compact sans, image-led grid with strong asymmetry and carefully paced whitespace.

## Cross-site design approval gate

Before further visual implementation, prepare for **each site**:

- Direct **desktop + mobile screenshots** of the exact 3 references, annotated by section; note the capture date, source URL, and copyright/licensing.
- Page anatomy: exact hero arrangement, nav behavior, sections, photographic ratios, form/filter placement, footer.
- Measured/estimated design tokens (font families **verified** if possible, color swatches, spacing scale, max-width, heading scale, radii, borders, button variants). Estimates must be labeled.
- A wholly original **Figma or HTML visual proposal** for the first viewport + one critical inner-page/functional view at 1440px and 375px.
- Comparison matrix: what the inspiration offers, what the current demo lacks, what is proposed to change, user-approved target and acceptance criteria.
- Check demo disclosures, accessible forms, reduced motion, image rights, actual responsive and Lighthouse numbers once built.

**Do not start another whole-site visual rebuild before these references and first-screen treatments are reviewed.** Functional code and existing routes remain unchanged by this research phase.