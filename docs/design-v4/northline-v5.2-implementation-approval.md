# NORTHLINE V5.2 — visual approval and implementation handoff

**Stage:** B — original design preview, **not deployed to the live investor-advisory site**.

The user provided 10 SERHANT. homepage screenshots; we used the observed section hierarchy and UX components as references, creating a distinct original implementation without reproducing SERHANT. brand/media/copy.

## Exact reference-to-NORTHLINE structure

| SERHANT. screenshot section | NORTHLINE V5.2 preview | Status |
| --- | --- | --- |
| Hero video + search | Full-image hero with destination, budget, objective search | Built visual + frontend prefill |
| Our Regions | Large rounded light panel with three markets and real filtering | Built |
| Featured Properties | Three image-led fictional opportunity studies with sample data | Built, media finalization pending |
| New Developments | Horizontal tall architectural image carousel | Built |
| Referral Network globe | Three-market comparison diagram, no invented coverage metrics | Built |
| S.MPLE technology product | Actual adjustable illustrative rental-yield calculator on deep blue | Built frontend logic |
| Join SERHANT. | Original typographic investor brief + functional 7-step form | Built frontend logic |
| In the Press | Three editorial educational questions, no fabricated publications | Built |
| Get in Touch | Bold navy contact + light form, explicit non-submission | Built frontend validation |
| Newsletter + Footer | Simple guided CTA and footer, no fake email subscription | Built |

## Visual design tokens

Navy #0b2065 · Blue #315de8 · Ink #121d31 · Mist #f4f6fa · White #ffffff. Contrast, sizeable geometric bold headings, a rounded main navigation capsule, off-white rounded regions block, 3-column photographic cards, tall development carousel, blue calculator and contact modules.

## Data and behavior on existing live site to preserve later

- Existing seven-step NORTHLINE quiz, answer persistence, optional contact and matching algorithm / no-match state.
- Existing investment calculator and standard return formula / disclaimers.
- Existing lead form anti-spam, valid consent and configurable secure endpoint, no fake success.
- Existing traffic attribution (UTM / GCLID), event names and SEO / canonical URLs / noindex portfolio status.
- Current working published page stays intact until the owner approves V5.2 and full regression passes.

## Media storyboard for Stage C

- Hero H01: original urban international residential scene, landscape 16:9 + mobile 4:5, no borrowed brand footage.
- Markets M01–M03: clearly distinct Dubai/Lisbon/London geography.
- Properties P01–P06: six distinct imaginary concept properties with unique hero images and coherent supplementary views.
- New builds D01–D04: four coherent and separate residential architecture concepts, not identical facades.
- Product is a genuine calculator, not an invented AI phone app. No video is required unless quality/originality is assured.

All photography is illustrative; the present preview uses existing generated NORTHLINE assets pending final media approval.

## QA status

| Gate | Result |
| --- | --- |
| 320 / 375 / 430 / 768 / 1024 / 1440 px desktop/mobile responsive | Passed 12/12 page-width checks |
| No horizontal overflow including after quiz results | Passed |
| Hero filter → quiz prefill | Passed |
| Seven-step quiz and sample results | Passed |
| Calculator baseline and modified input calculation | Passed |
| Live app forms, endpoints, analytics and SEO regression | Not yet executed; next phase |
| Lighthouse and manual WCAG audit | Not yet executed; next phase |
| Full unique media library | Not yet produced; next phase |

## Review links

- [Main design preview](../../design-review/northline-v5/index.html)
- [Separate investor brief](../../design-review/northline-v5/brief.html)
- [SERHANT. screenshot mapping from user](northline-serhant-v5.1-screenshot-reference.md)