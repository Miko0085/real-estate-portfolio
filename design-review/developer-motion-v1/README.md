# SERA / COAST · Motion Lab V1 (Astro + GSAP)

An **independent interactive review** for the fifth website in the real estate demo portfolio. This is **not** the primary deployed Developer Microsite app and makes no production changes to `apps/developer-project`. The fictional brand, images, floor plan context and assets are for design demonstration only; no real property, developer, prices, availability or client is implied.

## Live GitHub Pages path

`https://miko0085.github.io/real-estate-portfolio/design-review/developer-motion-v1/`

## Technical system

- Astro 5 static build, bundled local `gsap` npm dependency + `gsap/ScrollTrigger` (no remote JS CDN, no React).
- Autoplay hero `<video muted loop playsinline>` with original existing 8.2-second **animated concept still** MP4 and an actual static `poster` as an independent media fallback. No audio. Playback pause/resume control.
- Leaf and branch-shadow SVG layers animated with independent continuous GSAP tweens (`yoyo/repeat`) above the hero/video and a 2nd stone material study. Separate pause/resume for the material study.
- ScrollTrigger `pin` + `scrub` to seek an **8-second MP4** (not just animate a fake progress indicator). Three real chapter changes and progress track driven by ScrollTrigger progress. Async decoder seek backpressure + final target retries. The file is a lightweight animated architectural concept still, **not filmed location footage**.
- Scroll-triggered typographic/editorial reveals, responsive cards, working anchor/navigation, link back to the original SERA / COAST demo.
- `prefers-reduced-motion: reduce` disables hero/autoplay, SVG shadow motion, reveal tweening, and pinning; original still images remain readable and all sections remain navigable.
- Mobile layout works down to 320px without forced landscape orientation. The scroll pin still works on mobile unless the user requests reduced motion.

## Source media

All `public/assets/*.webp` and `public/media/*.mp4` are exact copies of **this same project's existing original fictitious media** from `apps/developer-project/public/...` for isolated/stable review assets. This is intentional same-project reuse, not use of any Lenval website footage, branding, assets, CSS or markup. Motion-film provenance follows the source app's `src/pages/index.astro`: animated AI architectural stills, not recordings.

## Build locally

From repo root:

```bash
npm install
npm run dev --workspace @estate/developer-motion-review
npm run build --workspace @estate/developer-motion-review
node scripts/check-developer-motion-review.mjs
```

Github Pages workflow includes this review as an npm workspace build and copies its `dist` into `pages-dist/design-review/developer-motion-v1/`.

## Acceptance and limitations

- Test widths: 320, 375, 430, 768, 1024, 1440 and 1920 px; responsive hero, no overflow, visible poster if video fails.
- Hero video autoplay and scroll-video time-seeking in actual Chromium with MP4 metadata; shadow-pause/hero-pause interactions, chapter changes and reduced motion.
- Mobile real-device Safari seeking is recommended **before** production adoption; on very low-end phones HTML5 currentTime seeks may stutter. Production alternative is an optimized all-I-frame, low-res scroll video or image-sequence canvas with explicit bandwidth/adaptive loading.
- No actual quote request form, backend, lead endpoint, commerce, analytics, remote pages or synthetic proof claims in this prototype. The primary demo site already has a functioning consent-based demo contact form.
- This is inspired by cinematic/residential motion patterns observed on Lenval Properties, but does not copy any source assets or code.