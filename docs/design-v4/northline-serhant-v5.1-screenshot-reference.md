# NORTHLINE V5.1 — SERHANT. Screenshot-Based Design Reference

**Status:** Visual and structural specification awaiting approval. **Do not deploy or change live NORTHLINE until approved.**
**Source:** Ten user-supplied desktop screenshots of the SERHANT. home page, 7 November 2026, sent in reverse scroll order (10:49:55 down to 10:47:23).
**Source screenshots:** user-provided visual references; use for qualitative layout comparison, not to redistribute or copy branded site assets.
**Brand goal:** Investor Advisory — regional discovery, fictional sample opportunity matching, seven-step quiz, illustrative yield calculator, lead forms. This is **not** a general brokerage clone.

## Source screenshots restored to top-to-bottom order

| Order | User screenshot | Real SERHANT. section | Observable UI pattern | Original NORTHLINE section |
| --- | --- | --- | --- | --- |
| 01 | 10:47:23 | Hero + search | Video/photographic fullscreen hero, dark readable overlay, white very bold headline, pill-shaped navigation and segmented search interface | **Hero + Discover Opportunities:** original skyline/architecture visual, Market/Budget/Goal selectors prefill investor brief |
| 02 | 10:47:35 | Our Regions | Big off-white container with prominently rounded upper corners, dense rectangular white region pills, bold navy heading | **Markets:** Dubai/Lisbon/London/Open; emphasize 3 markets instead of inventing 20 regions; buttons preselect quiz. Add recognizable geographic photography elsewhere |
| 03 | 10:47:43 | Featured Properties | Three-column image-led property catalogue, price, city/address, tight property metadata, top-corner listing status | **Featured Example Opportunities:** 3 strong studies above the fold, 3 optional more, separate real-estate photos, sample price, market, stage, use, area; status **SAMPLE CONCEPT**, not FOR SALE or SOLD |
| 04 | 10:48:33 | The Boldest New Developments | White heading, edge-to-edge horizontal sequence of narrow tall building shots with text overlay at bottom | **Off-plan Concepts:** vertical architectural image carousel, each concept with one coherent building, market and fictional stage; a focus-managed interactive carousel |
| 05 | 10:48:55 | SellIt global referral network | White two-column composition; huge dotted globe on right, title, strong metrics on left | **Across Markets:** stylish original map/globe diagram emphasizing 3 compared locations and selection criteria; **no invented countries served, transactions or referrals** |
| 06 | 10:49:10 | S.MPLE AI technology | Blue/purple technological background; two large phone mockups left and text CTA right | **Investment Calculator:** a real interactive calculator displayed as a deliberate product UI (optionally surrounded by a simple own-device frame) on rich navy/blue background; no fake app, claims of proprietary AI or invented results |
| 07 | 10:49:18 | Agent recruitment | Very large low-opacity decorative letterform left; asymmetrical text and CTA right; lots of whitespace | **Investor Brief:** distinctive own-brand typographic graphic or abstract composition left; active 7-step qualification UI right, real progress and validation, not a recruiting CTA |
| 08 | 10:49:30 | In the Press | White page, bold headline, 3 editorial text columns, minimal divider rules, small prev/next controls | **Insights / Questions:** 3 concise actual educational guides or questions, with links to real local content / FAQ; **do not invent press coverage or published external stories** |
| 09 | 10:49:44 | Get in Touch | Full navy panel; large white brand typography/graphic left and tall white form panel right; visible consent | **Request an Investor Discussion:** distinct section with real Northline inquiry form, consent/error/success, URL/quiz attribution |
| 10 | 10:49:55 | Newsletter + Footer | Light grey newsletter strip with large text on left/email+consent right; spacious white multi-column sitemap footer | **Optional updates and Footer:** only offer email newsletter if there is an actual opt-in delivery endpoint; otherwise use a concise FAQ/guide CTA and simple multi-column internal navigation |

## Design principles grounded in the 10 screenshots

1. **Navbar:** large-radius navy floating capsule on desktop with white type, small action chips, and minimal icon controls. NORTHLINE nav links should be Markets, Opportunity Studies, Investor Brief, Calculator, Contact, not Buy/Rent/Sell/Agents. Mobile uses a properly labelled accessible menu; do not clone SERHANT. branding.
2. **Section choreography:** cinematic/dark → large off-white rounded region slab → clean white 3-col listings → horizontal tall dev carousel → infographic split → deep blue product UI → bright graphic/form split → white editorial list → solid-navy contact → pale footer. This is more specific than the initial NORTHLINE V5 list and materially differs from the current Christie’s editorial layout.
3. **Typographic hierarchy:** heavy geometric sans throughout, blue/ink headings and white hero/tech/contact type. Avoid the former cream/copper Georgia editorial identity.
4. **Colour system (proposed, not sampled source tokens):** #0D226A deep brand navy, #2C428F slate-blue nav, #2D57DD interaction accent, #FFFFFF white, #F6F6F7 quiet off-white, #101622 ink; selected tech panel may use restrained dark cobalt gradients only where useful.
5. **Image treatment:** crisp real-estate visual studies and deliberately varied crop formats (wide 16:9 hero, three 4:3 property cards, narrow 3:4 project carousel). Each market must be geographically distinct; concept photos and video must be original or licensed.
6. **Interactivity:** sticky nav, search preselection, region pills, property/detail interactions, one true carousel, 7-step quiz and dynamic recommendations, functional yield calculator, validated form. No decorative controls that do nothing.
7. **Accessible responsiveness:** desktop at 1440; breakpoints 1024, 768, 430, 375, 320. No overflow after quiz results. Accessible labels, keyboard/focus navigation, reduced-motion video option.

## Preservation of NORTHLINE functionality

- Existing 7-step quiz: Budget → Objective → Market → Ready/Off-plan → Timeline → Financing → Optional Contact. Users see illustrative matches without mandatory lead form completion.
- Existing matching filters and ranking: budget, geography, delivery stage, objective and timing; honest no-match state.
- Calculator: purchase price, expected rent, service charges, management costs, occupancy → gross yield, estimated net yield and annual net income. Keep existing calculation tests.
- Existing analytics: page_view, start_form, form_error, quiz_complete, generate_lead (only on verified success), and event data attribution including UTM source/medium/campaign/content/term and GCLID.
- No fake backend integration, fake testimonial, sales results, actual inventory or investment guarantee. SEO, canonical base path, site map, robots and schema preserved.
- HTML labels, consent, honeypot, proper success/error/loading, configurable HTTPS backend unchanged.
- Do not touch MARIS or other existing portfolio apps in this design phase.

## Outstanding decisions, before implementation

1. **Hero** — photo-first still or original short motion film? Default: an original high-quality 16:9 image with a video-ready architecture and properly visible search.
2. **Number of sample opportunities** — default 6 concepts (3 prominent, 3 secondary) with distinct places and layouts; no real offers.
3. **Newsletter** — default omit, unless there is a real consent-compatible subscriber endpoint.
4. **Contact** — one visible enquiry form, while the investor quiz keeps optional contact and recommendations ungated.
5. **Global section** — infographic for comparative markets and objectives, with no made-up business operating metrics.
6. **Technology section** — present the existing calculator, not a fictional AI assistant application.
7. **Exact implementation style** — adapt the section logic and visual impact but do not reproduce copyrighted SERHANT. website layouts/media or its trade dress one-to-one.

## Next gates — same as MARIS

A. **Screenshot-grounded reference (this document)** → user approves block mapping.
B. Create *original* NORTHLINE reference board and first hero + one representative inner UI (Investor Brief).
C. Produce geographical media manifest (Dubai/Lisbon/London), fictional property shots, project carousel and optional original video.
D. Build Astro branch and preserve all functioning quiz/calculator/filter/SEO/forms logic; review desktop/mobile.
E. End-to-end regression, visual audit against approved screenshots, Lighthouse and deploy.

**Earlier document:** [NORTHLINE V5 structure](northline-serhant-v5-approval-spec.md) remains background. For the screenshot-backed page sequence, **this V5.1 specification supersedes the earlier approximate block list**.
