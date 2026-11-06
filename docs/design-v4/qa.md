# Design Review V4 — QA snapshot

Generated from deterministic browser rendering of the same HTML/CSS proposals (via Chromium `set_content`, with local photos inlined to work around a browser-environment file navigation restriction).

- Screenshots captured: **20**, split into 1440px desktop and 375px mobile for ten unique prototype views.
- Horizontal overflows at those widths: **0**.
- Broken media: **0**.
- Chrome navigation to external reference sites not verified. Screenshot outputs therefore represent *original proposals*, **not** captured live original websites.
- Responsive six-width test is tracked separately below. These prototypes are not validated production apps.

A static prototype does not certify WCAG 2.2 AA, performance, network routing, form submission or actual sales workflows. Those are later implementation acceptance gates.

## Responsive structural sweep

- Six widths tested: 320, 375, 430, 768, 1024, 1440 px.
- Ten prototype pages × six widths = **60 checks**.
- Horizontal overflows / missing images / incorrect h1 count: **0**.
- Test uses headless Chromium with local data-URI photos; this is not a full Lighthouse, live network or screen-reader certification.
