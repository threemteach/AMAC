# AMAC

Next.js App Router project for AMAC Group’s public site. The current review covers the home page header, hero, crossed ribbons, “From our fields to your market” introduction, the Fruits and Vegetables collection cards, the featured harvest, Quality & Confidence, Our Story, the four journey stages, the factory process frames, shipping routes, the contact banner, and the footer.

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
| `src/components/site/site-footer.tsx` | Footer branding, contact placeholders, and design and development credit. |
| `src/content/site.ts` | Footer labels and 3mtechs credit shared with the mobile sidebar. |
| `src/app/page.tsx` | Home route and the entry point for adding the next home page section. |
| `src/components/site/site-header.tsx` | Announcement, navigation, logo, and quote action. |
| `src/components/home/home-hero.tsx` | Farm image, heading, description, and calls to action. |
| `src/components/home/hero-ribbons.tsx` | The two decorative strips and their repeating labels. CSS scrolls them in opposite directions and pauses movement when reduced motion is enabled. |
| `src/components/home/fields-intro.tsx` | Product introduction, decorative SVG, and Discover the range action. |
| `src/components/home/ingredient-collections.tsx` | Responsive Fruits and Vegetables cards and their collection copy. |
| `src/components/home/featured-harvest.tsx` | Four numbered featured products and the catalog action. |
| `src/components/home/quality-confidence.tsx` | Quality copy, scrolling reference marks, and documentation action. |
| `src/components/home/our-story.tsx` | Story image, numbered company overview, and About us action. |
| `src/components/home/considered-journey.tsx` | Four stages from sourcing to delivery and their supplied SVG icons. |
| `src/components/home/factory-process.tsx` | Four factory media frames and the supplied fruit cover. |
| `src/components/home/shipping-routes.tsx` | Road, air, and sea shipping cards with supplied SVGs. |
| `src/components/home/contact-banner.tsx` | Bottom contact banner and its brand watermark. |
| `src/content/home.ts` | Editable home page copy and asset references. |
| `public/images/` | The original farm image, AMAC SVG logo, and fields watermark SVG. |

The component CSS modules hold responsive sizing and positioning. `src/app/layout.tsx` loads Inter and DM Sans from local package assets. The fields introduction loads Bricolage Grotesque Bold and Myriad Pro Regular from local font files through next/font. On narrow screens, the header opens a left sidebar from the menu button and the farm image crops around its center.

When the dashboard is implemented, the home content module is the starting point for setting up fields for the announcement, hero text, image, action labels, ribbon labels, and product introduction copy, collection cards, featured products, quality standards, company story copy, and the journey stages. Home, the logo, and Discover the range are active for this review. Discover the range scrolls to the collection cards. The cards and featured harvest actions can be linked once the collection and product destinations are implemented. See our story can be linked once the About us page is implemented.

The factory process frames are a visual preview. Video playback can be added once the clips are available.

Discuss your shipment and Talk to our team can be linked when their contact destinations are available.
