# Five independent art directions — V3

**Decision:** The first media refresh reused similar sunset photographs, Georgia headings and beige backgrounds. It did not meet the requirement for five visibly distinct design systems. Each app must have its own typographic language, palette, section anatomy and media direction; shared packages provide semantics and infrastructure, **not a shared visual template**.

| Site | Identity | Primary page anatomy | Type & colors | Art direction | UI conversion |
| --- | --- | --- | --- | --- | --- |
| Dubai Off-Plan | Crisp development campaign / Search landing | Informational **left-copy / right-render** hero; pricing, property types, floor plans and payment milestones | Strong geometric sans headline; white, navy `#07334A`, aqua `#00788D` | High-key daylight, waterfront architecture and clean architectural graphics | Direct enquiry, brochure, floor-plan and WhatsApp actions |
| Investor Advisory | International destination journal | **Panoramic image-led** hero, destination gallery, story-style examples and optional quiz/calculator below | Display serif plus legible travel-publication sans; marine navy `#122F49`, powder blue `#E5EBEF`, warm copper `#AD723E` | Unique market imagery with destination context, not duplicated properties | Build your brief; calculator lower on page and clearly illustrative |
| Luxury Brokerage | High-contrast editorial catalogue | **Split-screen black gallery** with image left and oversized typographic right panel, followed by filterable property catalogue | Heavy uppercase sans; graphite `#131416`, chalk `#F4F5F1`, citron `#D0E8A4` | Monochrome contemporary interiors, graphic grid, strong image hierarchy | Search/filter and property details dominate |
| Seller Leads | Friendly digital valuation service | **Photo / conversion message** reversal, strong task CTA, blue-accented multi-step form and short process education | Bold sans, soft blue `#F7FAFF`, royal blue `#2456D3`, orange `#E76837` | Realistic daylight homes, accessible forms, no lifestyle luxury theatricality | Property valuation wizard with no fabricated estimate |
| Developer Project | Architectural exhibition / concept film | **Full-bleed immersive** opening, overlaid transparent nav, monumental serif display, architectural detail story and manual video | Delicate serif display with quiet sans; mineral stone `#E8E4DB`, carbon `#211E1C`, oxblood `#8F3C33` | Monolithic materials, desert or coastal studies, close-ups, restrained color | Residence types, masterplan, film, brochure and register interest |

## Verified reference patterns (not one-to-one copies)

- [Ellington Eltiera Views](https://eltiera-views.ellingtonproperties.ae/): project sections and property-type discoverability — information architecture for Dubai.
- [Christie's International Real Estate Dubai](https://www.christiesrealestatedubai.com/): visual property editorial — Investor Advisory, not banking dashboards.
- [SERHANT.](https://serhant.com/) and [Sotheby's International Realty](https://www.sothebysrealty.com/eng): property gallery, filterable listings and storytelling — Luxury Brokerage.
- [Redfin home-value flow](https://www.redfin.com/what-is-my-home-worth): single-task conversion without decorative detours — Seller.
- [ORLA by OMNIYAT](https://orla.omniyat.com/): visual architecture / residences / offer structure and deliberate video — Developer.

**No Savills reference.** Brand logos, photographs, copyrighted footage, whole layouts, performance claims and listings are not copied.

## Editorial rules and acceptance

1. No repeat hero composition between two apps. Dubai split copy-image; Investor panorama; Brokerage split gallery with black type panel; Seller reversed task-led split; Developer full-bleed architectural film.
2. Each app's headings, CTA shapes, background sequence and cards are independently defined in that app's CSS. Do not unify them through a shared Tailwind component.
3. Each app needs its own **licensed/original** hero and supporting images, with visual provenance and explicit demo labeling for fictional property renderings. A generated 4-scene concept board exists as a production reference; it is not published to the websites yet.
4. Preserve forms and working calculator/catalogue routes during visual refactors.
5. Check at 320/375/430/768/1024/1440px, including menu, forms, no overflows, alt, LCP, CLS, reduced motion and keyboard navigation.
6. Claim production-ready visual QA only after screenshots and functional browser tests succeed, not merely a successful Astro compile.
