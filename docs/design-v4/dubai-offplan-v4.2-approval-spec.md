# MARIS Residences — design and implementation approval spec V4.2

**Status:** PROPOSED / NOT APPROVED / DO NOT MERGE INTO LIVE APP
**Product:** Single-project, high-intent Dubai off-plan landing.
**Traffic:** Google Search (project-aware visitors); first 5 seconds must answer What, Where, From how much, Payment, Handover, Next action.
**Brand:** MARIS Residences / Maris Development Studio (both fictional). All project figures, floor plans, architecture, availability, location concepts are portfolio DEMO content.

## Decisions to approve before implementation

1. **Hero arrangement**: desktop copy, project identity, price and CTA on the **LEFT 42%**; original MARIS architecture on the **RIGHT 58%**. This follows the edited brief and **supersedes** the earlier V4 prototype (which had the image on the left).
2. **Original data source**: use existing `apps/dubai-offplan/src/data/development.ts` as the sole sample data source: 1BR **72–88 m² / from AED 1.85M**; 2BR **112–145 m² / from AED 2.75M**; 3BR **175–210 m² / from AED 4.3M**. Payment plan **20 / 50 / 30**; illustrative handover **Q4 2029**. **Reject the inconsistent 60/40 plan in the previous visual mockup.**
3. **Primary CTA**: **Get Floor Plans** → floor-plan selector. **Secondary**: **Download Sample Brochure** → actual PDF without a mandatory lead gate. Supporting **Enquire** CTA → qualification form. No fictional stock urgency, invented developer credentials or return promises.
4. **Visual brand**: white #FFFFFF, warm-white #F6FAFB, marine #073E56, turquoise #00809C, charcoal text #153340, understated rules/borders, functional geometric sans. Avoid oversized marketing cards and cinematic clutter.
5. **Architecture**: one fictional development in **Dubai Islands (area-level only)**. Consistent building geometry, facade bands, coastline, podium and landscape across exterior, interiors, amenities, floor plans and brochure. No invented plot pin, travel time, local planning approval or actual availability.
6. **Scope**: one high-performing static Astro landing page with anchor navigation and a downloadable PDF, not a second template for the other four sites.

## Page structure — block by block

| # | Section/anchor | Desktop and mobile composition, imagery | Sample English copy | CTA / behavior |
| --- | --- | --- | --- | --- |
| 01 | Header & Hero | White slim header (logo, Overview, Residences, Payment, Floor Plans, Location, Enquire). Desktop left 42% brand copy + price, right 58% unique 16:9 original coastal development render. Mobile: compact header, project name + starting price and primary CTA before/adjacent to image; no overflow or giant empty hero. | **MARIS Residences** / **Waterfront living, clearly considered.** / *A fictional residential concept on Dubai Islands.* / **From AED 1.85M · sample** | **Get Floor Plans** (scroll); **Download Sample Brochure** (direct PDF); short demo badge visibly attached to prices/images. |
| 02 | Key facts | Narrow, horizontally aligned 4-item facts row desktop; two-by-two or stacked facts mobile. No generic cards. | **From AED 1.85M · sample / 1–3 Bedrooms / 20–50–30 payment illustration / Q4 2029 · sample** | Anchor jump to Payment and Residences; all four facts declared hypothetical. |
| 03 | Development overview | 35% concise editorial text + 65% separate photographic exterior/podium angle. No repetition of hero image. | **One address. Room for a different pace.** / *A concept collection exploring calm materials, waterside spaces and day-to-day convenience.* | **Explore residences** → #residences |
| 04 | Residences | Three large photo-led residence options, different interiors for 1BR/2BR/3BR, never a floorplan screenshot as the only image. Include size and sample prices, selected-state styling and compact details. | **Find a space that fits.** / 1BR 72–88 m² from AED 1.85M; 2BR 112–145 m² from AED 2.75M; 3BR 175–210 m² from AED 4.3M (all sample). | **Explore Floor Plan** selects corresponding tab in #floorplans and scrolls into view. |
| 05 | Floor plans | Central information-led floor plan viewer (actual drawn diagrams/PDF, NOT decorative wire rectangles); tabs for 1BR/2BR/3BR. Desktop graphic 60%, specifications 40%. Mobile full-width plan followed by details. | **Know the layout before the next step.** / *Illustrative plans, not approved construction drawings.* | Keyboard-accessible tabs with correct active state, area, conceptual room labels, **Open / Download plan PDF**, **Ask about this residence** preselects type in form. |
| 06 | Payment plan | Wide simple horizontal 20/50/30 timeline; on mobile three vertically stacked milestones. Clear total = 100%. No fake time-left countdown. | **A sample payment schedule.** / *20% booking, 50% during construction, 30% at handover.* | **Discuss your budget** → form. Explain fees excluded; all figures hypothetical. |
| 07 | Amenities | Alternating editorial images, 4–6 distinct frames of pool, fitness, shaded garden, lobby, lounge, promenade. Avoid six identical boxes. | **Everyday, more considered.** / Each amenity gets a factual 4–9-word descriptive caption. | Photo open view; no false completion promises. |
| 08 | Gallery | Mixed-ratio mosaic with 10–12 **different frames** from the same fictional project (including assets already shown elsewhere within MARIS; no unrelated projects). Exterior / Interior / Amenities segmented selector. | **See the concept from every angle.** / *Original concept visualizations, not existing property photography.* | Real lightbox: previous/next, close, focus return, Esc, touch-friendly controls, no fake video play. |
| 09 | Location | Location *concept*, not counterfeit map pin. Area-level Dubai Islands context supported by real geography; standalone branded diagram with a prominent **approximate / no plot selected** disclosure. | **A Dubai Islands concept.** / *A real area used for a fictional portfolio project; an exact plot and travel times are not provided.* | No invented distances; accessible diagram text. |
| 10 | Investment considerations | Practical two-column text: considerations vs costs/risks, simple dividers, no ROI chart. | **Consider the full picture.** / *Service charges, registration and financing costs, delivery risk, resale liquidity and rental variability.* | **Ask a question** → form with purpose "investment" optionally selected. |
| 11 | Developer and FAQ | Minimal fictional developer declaration, not fake company bio or awards. FAQ <details> accordion: sample price, payment schedule, plans, mortgage, reservations, whether project is real. | **About the concept.** / *MARIS Development Studio is a fictional brand created for this website demonstration.* | FAQs keyboard accessible, links to relevant sections. |
| 12 | Buyer enquiry and footer | Desktop two columns: explanatory copy/CTA and real form; mobile one column, fixed slim **Floor Plans / Enquire** bottom bar not covering controls. | **Request the details that matter.** / *Explore the sample purchase journey. No details are sent unless a valid secure endpoint is configured.* | Budget, unit type, purpose, timing, cash/mortgage, name, email OR phone, contact preference, consent, honeypot. Loading, error, successful 2xx states; accessible errors and no fabricated success. |

## Exact content/data contract (demo; do not claim live availability)

| Unit | Bedroom count | Illustrative area | Illustrative price | Deliverable |
| --- | ---: | --- | --- | --- |
| One bedroom | 1 | 72–88 m² | From AED 1.85M | Original interior + informative floor-plan PDF |
| Two bedroom | 2 | 112–145 m² | From AED 2.75M | Original interior + informative floor-plan PDF |
| Three bedroom | 3 | 175–210 m² | From AED 4.3M | Original interior + informative floor-plan PDF |

Payment total must always be **20+50+30=100%**; Q4 2029 is a fictional timeline, not a delivery forecast. Preserve `development.ts` as single source and remove hardcoded divergent samples from templates, brochure and visual boards.

## Media storyboard — produce only after approval

All media original or verifiably licensed. Same fictional building/materials/location in every frame. Avoid reuse across the other four portfolio brands.

| ID | Asset / shot | Format / crop | Placement |
| --- | --- | --- | --- |
| M01 | Recognizable MARIS building, daytime waterfront hero; right-side building composition with open sky/negative space | WebP/AVIF landscape 16:9 desktop; separately art-directed 4:5 mobile | Hero |
| M02 | Second aerial/oblique angle on MARIS podium and promenade | 3:2 | Development overview |
| M03 | One bedroom: living and kitchen, consistent finishes | 4:3 | Residences 1BR |
| M04 | Two bedroom: larger living/dining, same finishes | 4:3 | Residences 2BR |
| M05 | Three bedroom: family living plus waterfront terrace | 4:3 | Residences 3BR |
| M06 | Exterior detail: facade/terraces showing same geometry | 3:2 | Gallery |
| M07 | Entry and reception lobby | 4:3 | Amenities |
| M08 | Pool area attached to the same podium | 16:9 | Amenities |
| M09 | Fitness/wellness room | 4:3 | Amenities |
| M10 | Garden courtyard, physically consistent | 4:3 | Amenities |
| M11 | Residents lounge / shared interior | 4:3 | Amenities |
| M12 | Waterfront walking promenade at building | 16:9 | Amenities |
| M13 | Primary bedroom detail | 4:3 | Gallery |
| M14 | Bathroom / finishes detail | 4:3 | Gallery |
| M15 | Balcony view from MARIS tower | 16:9 | Gallery |
| M16 | Dusk exterior from the same MARIS development | 16:9 | Gallery |
| P01–P03 | Three useful schematic floor plans with rooms, conceptual labels, scale disclaimer | SVG/PNG preview + downloadable PDF each | Floor plan viewer |
| D01 | Area-level *non-navigation* location concept diagram | SVG with text alternative | Location |
| B01 | Original 6–10-page brochure with exact sample values, plans and fictional disclosure | PDF | Download |

**Do not start a video unless a genuinely useful, consistent original MARIS sequence is produced.** Otherwise keep image gallery. Each unique frame must have approved art direction and media provenance; responsive source and explicit width/height to prevent CLS.

## Functional / preservation matrix

- Existing Astro, TypeScript, Tailwind and shared packages stay in place. Do not replace working lead-form service with a non-functional design demo.
- Existing `apps/dubai-offplan/src/scripts/lead-form.ts`: keep validation, required consent, field-level errors, status announcements, honeypot, 12-second timeout, endpoint-configurable submission.
- Existing `apps/dubai-offplan/src/scripts/site.ts`: retain UTM source/medium/campaign/content/term and GCLID attribution, events `page_view`, `view_development`, `view_floor_plan`, `download_brochure`, `click_whatsapp` only for configured links, `start_form`, `form_error`, `generate_lead` only on a confirmed successful 2xx response.
- WhatsApp and phone are conditional on configured legitimate destination; when missing, reveal contact preference rather than sending to a fictitious destination.
- Brochure and floorplans are **available for download without fake gates**. Demo forms must say nothing was submitted or stored if the endpoint isn't configured.
- On GitHub Pages no local backend/secret handling. Integrate CRM through a secure HTTPS endpoint only when configured.
- SEO: correct GitHub Pages subpath canonical, OG, title/description, sitemap, robots (demo noindex), appropriate breadcrumb only if page structure supports it.
- Semantics / A11y: meaningful h1–h3 order, keyboard tabs, visible focus, aria-live error messages, active button states, lightbox focus containment and return, reduced-motion support.

## Responsive & QA acceptance

- Verify 320 / 375 / 430 / 768 / 1024 / 1440 px, no horizontal scrolling.
- At 375 px the initial visible portion includes the actual project name, *illustrative* price, and floor-plan CTA; project image must not push all practical content several screens down.
- Floor-plan tabs and gallery controls must be usable by touch and keyboard. Test selecting 2BR prepopulates the enquiry selector; form validation/consent/failure statuses remain correct.
- Lighthouse targets LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on representative devices/network, measured rather than asserted. Image compression and art-direction come before animation.
- Verify all 16 hero/scene images, 3 plan PDFs, brochure PDF and sitemap links resolve with GitHub Pages base path. No cross-site reused photos.
- Regression: demo disclosures, SEO, UTM/GCLID persistence, WhatsApp fallback, all existing tested form fields, native PDF downloads.
- Do not deploy over the primary project until media, functionality and visual comparisons are approved and automated tests pass.

## Stage gate — sequential

**A. Now: APPROVE THIS DOCUMENT.** Resolve desktop hero arrangement, copy, sample commercial values and presence of all 12 blocks.

**B. Media creation:** produce architectural identity sheet (one building, material/color rules) before generating M01–M16; generate plan previews and PDFs, brochure. Review contact sheet and reject inconsistent architecture.

**C. Implementation:** build redesign in an isolated preview branch/path without changing production; keep existing functions wired. Show 1440 + 375 screens and functional interactions.

**D. QA / release:** run CI, browser forms/navigation/analytics/SEO tests, Lighthouse and manual accessibility QA; then ship Dubai Off-Plan, preserve other four apps.

**Explicitly excluded:** real listings, construction status, invented developer credentials/awards, promised ROI, actual inventory and third-party copyrighted reference photos or footage.
