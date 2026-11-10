# ATELIER RESIDENCES · Portfolio demo

A fictional, original architectural editorial website for a sample Dubai real-estate developer. This is **not** a real property offer.

## Run locally

```bash
cd atelier-residences-site
python3 -m http.server 8080
```

Open http://localhost:8080/ — **do not** double-click `index.html` with `file://`, because routes and scripts use root-relative paths.

## Features

- Eleven working URLs: Home, Collection, 3 project pages, About, Communities, Design & Art, Contact, Privacy, Disclaimer
- Separate home + project responsive layouts; 320px–desktop CSS breakpoints
- Project filters and unit filters with shareable URL query parameters
- Sample 0–4 bedroom diagrammatic SVG floor plans, zoom + download
- Project galleries with keyboard controls, modal focus loop, swipe, Escape
- Accessible mobile navigation and reduced-motion support
- Local-only demo enquiry and newsletter forms. **No data is transmitted or stored.**
- 24 locally optimized WebP assets generated for the concept, plus source manifest.

## Development notes

Designed to be drop-in deployable on static hosts. Serve project URLs with directory-index support; for Cloudflare Pages, Netlify, or Vercel, static folders with `index.html` work. If moving into the original monorepo, this folder belongs under `apps/developer-project` after checking the repository structure.

## Design provenance

Inspired by restrained editorial/corporate layouts. All composition and markup are original; no Ellington logos or third-party website images are embedded. Media are AI-generated illustrative concept renders, not actual constructed properties.

## Known caveats

- Static demo frontend, not a Next.js app; npm installation could not be verified in the offline runtime.
- The conceptual map is deliberately not geolocated, to avoid inventing an exact address.
- No fake pricing, live availability or real contact channels.
- Sitemap and canonical URLs intentionally require the real deployment domain before publication.
- Fonts use optional Google Fonts import with Georgia/Arial fallbacks; the site works without a font network connection.
- The SVG floor plans are diagrammatic and should not be construed as architectural drawings.
