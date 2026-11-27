# AMAC

Next.js App Router project for AMAC Group’s public site. The current review covers the home page header, hero, crossed ribbons, “From our fields to your market” introduction, the Fruits and Vegetables collection cards, the featured harvest, Quality & Confidence, and Our Story.

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run build` for the production build and `npm run typecheck` for TypeScript checks.

## Where to make changes

| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Home route and the entry point for adding the next home page section. |
| `src/components/site/site-header.tsx` | Announcement, navigation, logo, and quote action. |
| `src/components/home/home-hero.tsx` | Farm image, heading, description, and calls to action. |
| `src/components/home/hero-ribbons.tsx` | The two decorative strips and their repeating labels. CSS scrolls them in opposite directions and pauses movement when reduced motion is enabled. |
| `src/components/home/fields-intro.tsx` | Product introduction, decorative SVG, and Discover the range action. |
| `src/components/home/ingredient-collections.tsx` | Responsive Fruits and Vegetables cards and their collection copy. |
| `src/components/home/featured-harvest.tsx` | Four numbered featured products and the catalog action. |
| `src/components/home/quality-confidence.tsx` | Quality copy, scrolling reference marks, and documentation action. |
| `src/components/home/our-story.tsx` | Story image, numbered company overview, and About us action. |
| `src/content/home.ts` | Editable home page copy and asset references. |
| `public/images/` | The original farm image, AMAC SVG logo, and fields watermark SVG. |

The component CSS modules hold responsive sizing and positioning. `src/app/layout.tsx` loads Inter and DM Sans from local package assets. The fields introduction loads Bricolage Grotesque Bold and Myriad Pro Regular from local font files through next/font. On narrow screens, the header uses a menu button and the farm image crops around its center.

When the dashboard is implemented, the home content module is the starting point for setting up fields for the announcement, hero text, image, action labels, ribbon labels, and product introduction copy, collection cards, featured products, quality standards, and company story copy. Home, the logo, and Discover the range are active for this review. Discover the range scrolls to the collection cards. The cards and featured harvest actions can be linked once the collection and product destinations are implemented. See our story can be linked once the About us page is implemented.
