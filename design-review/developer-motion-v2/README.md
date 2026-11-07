# SERA / COAST — Architectural Light & Shadow V2

Original independent `Astro 5 + GSAP ScrollTrigger` visual review. Separate from both V1 and the actual `apps/developer-project` deployment.

Public URL after Pages deployment: `https://miko0085.github.io/real-estate-portfolio/design-review/developer-motion-v2/`.

## Art direction and honesty
The First The Last / Lenval case inspired the *principle* of sunlight/shadow as atmosphere, restrained composition, video on scroll, and continuous storytelling. Nothing has been lifted from their site — no photos, copy, trade dress, code, branded assets, testimonials, or results. SERA/COAST is a **fictional demo**, not a real project.

The moving-shadow Hero and scroll film are **original animation composites made from AI-generated still illustrations**. They are not physical camera footage or footage of actual buildings. Do not claim otherwise.

## Working effects
1. 7-second H.264 video background with independently moving, blurred leaf shadows on warm travertine; CSS poster for reduced motion / slow connections.
2. GSAP hero line reveals, editorial reveals, image slow expansion.
3. ScrollTrigger with a pinned full-screen sequence on desktop and scroll-scrubbed video on mobile. Actual `HTMLVideoElement.currentTime` responds to scroll and updates three chapter titles and progress.
4. Separate material-focused section with a time-varying shadow projection.
5. Image lightbox with five concept illustrations, next/previous, Escape and focus return.
6. A validation-only enquiry form that truthfully does **not** send personal data.
7. Motion pause and prefers-reduced-motion handling, no native browser video sound.

## Code and local development

```sh
npm install
npm run dev --workspace @estate/developer-motion-review-v2
```

The new app is registered as a workspace; CI builds it and copies its `dist` to Pages without changing the live developer microsite. The first variant remains available at `/design-review/developer-motion-v1/` for comparison.

## Media production and limitations
Generated stills: new `courtyard.webp` scene (original generated image, unique to V2), prior original fictional SERA shots and original external architectural scene supplied in the portfolio conversation. Two self-hosted MP4s were locally assembled using FFmpeg/OpenCV; true per-frame environmental shadow motion but static architecture remains composited, *not filmed camera motion*. A production flagship needs custom architecturally consistent 3D/Cinema4D/Blender renders and actual tracked footage. No audio and no copied Lenval media. See `public/asset-manifest.json`.

Test desktop and 375px mobile, motion-enabled and prefers-reduced-motion, on real iOS Safari separately. Scroll-scrub accuracy depends on codec keyframe frequency and native decode latency; avoid promises of perfect playback on every phone.