# AMAC

Next.js App Router project for AMAC Group’s public site. The current review covers the home page header, hero, crossed ribbons, “From our fields to your market” introduction, the Fruits and Vegetables collection cards, the featured harvest, Quality & Confidence, Our Story, the four journey stages, the factory process frames, shipping routes, the contact banner, and the footer.

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/` for English. The language picker also links to Arabic (`/ar`), French (`/fr`), German (`/de`), Italian (`/it`), Russian (`/ru`), and Spanish (`/es`). Use `npm run build` for the production build and `npm run typecheck` for TypeScript checks.

## End-to-end tests

```sh
npm ci
npx playwright install chromium
npm run test:e2e
```

Playwright builds the site in `.next-e2e` and starts its own server at `http://127.0.0.1:3217`. Keep that port free. The tests use fresh test data and a test admin password, so the live content and local login settings are unaffected. They cover admin login and logout, image upload validation and WebP previews, article publishing, multilingual catalog search and category changes, language switching, and country search.

Use `npm run test:e2e -- --headed` to watch in Chromium or `npx playwright show-report` to open the last report. On Linux, use `npx playwright install --with-deps chromium` if browser system dependencies are missing.

## Where to make changes

`src/app` owns URLs and HTTP entry points. Section UI stays in `src/components`, and UI reused across sections lives in `src/components/shared`. The admin dashboard and its editors are in `src/components/admin`. Login, publishing, and image-upload handlers are in `src/server/admin`. The CMS store, schema, defaults, and image storage are in `src/server/cms`.

Page components assemble their sections in display order. About and Contact sections live in `src/components/about` and `src/components/contact`. Journal listing and article sections live in `src/components/journal`. In `src/components/catalog`, `catalog-browser.tsx` keeps search and filter state shared across the hero, category cards, and results. `product-details.tsx` keeps the selected cut and size shared across the gallery, enquiry dialog, and specifications.

| File | Purpose |
| --- | --- |
| `src/components/site/site-footer.tsx` | Footer branding, contact placeholders, and design and development credit. |
| `src/content/site.ts` | Footer labels and 3mtechs credit shared with the mobile sidebar. |
| `src/components/home/home-page.tsx` | Shared section order for the English and Arabic home pages. |
| `src/components/site/site-header.tsx` | Announcement, navigation, logo, and quote action. |
| `src/components/home/home-hero.tsx` | Farm image, heading, description, and calls to action. |
| `src/components/home/hero-ribbons.tsx` | The two decorative strips and their repeating labels. CSS scrolls them in opposite directions and pauses movement when reduced motion is enabled. |
| `src/components/home/fields-intro.tsx` | Product introduction, decorative SVG, and Discover the range action. |
| `src/components/home/ingredient-collections.tsx` | Responsive Fruits and Vegetables cards and their collection copy. |
| `src/components/home/featured-harvest.tsx` | Four numbered featured products and the catalog action. |
| `src/components/shared/quality-confidence.tsx` | Quality copy, scrolling reference marks, and documentation action. |
| `src/components/shared/our-story.tsx` | Story image, numbered company overview, and About us action. |
| `src/components/home/considered-journey.tsx` | Four stages from sourcing to delivery and their supplied SVG icons. |
| `src/components/home/factory-process.tsx` | Four factory media frames and the supplied fruit cover. |
| `src/components/home/shipping-routes.tsx` | Road, air, and sea shipping cards with supplied SVGs. |
| `src/components/shared/contact-banner.tsx` | Bottom contact banner and its brand watermark. |
| `src/content/home-localized.ts` | Locale selection and published CMS overrides for the home page. |
| `src/content/translations/` | Default copy grouped by section and then by language. |
| `src/content/locale.ts` | Language routes and shared accessibility labels. |
| `public/images/` | The original farm image, AMAC SVG logo, and fields watermark SVG. |

To edit default text, open `src/content/translations/<section>/<language>.ts`. For example, edit `contact/ar.ts` for Arabic contact copy, `home/fr.ts` for French home and header copy, or `site/fr.ts` for French footer and accessibility labels. Each section has an `index.ts` that maps locale codes to its dictionaries. The language URLs and route helpers live in `src/content/locale.ts` and the section route modules. When content has been published in the dashboard, the published values still take precedence.

The component CSS modules hold responsive sizing and positioning. `src/app/document.tsx` sets the document language and direction and loads Inter and DM Sans from local package assets. The Latin locales share the English type stack. Arabic uses Readex Pro Variable. Russian uses Onest Variable for display type and Inter for body and interface text. The fields introduction loads Bricolage Grotesque Bold and Myriad Pro Regular from local font files through next/font. On narrow screens, the header opens a left sidebar from the menu button and the farm image crops around its center.

When the dashboard is implemented, the home content module is the starting point for setting up fields for the announcement, hero text, image, action labels, ribbon labels, and product introduction copy, collection cards, featured products, quality standards, company story copy, and the journey stages. Home, the logo, and Discover the range are active for this review. Discover the range scrolls to the collection cards. The cards and featured harvest actions can be linked once the collection and product destinations are implemented. See our story can be linked once the About us page is implemented.

The factory process frames are a visual preview. Video playback can be added once the clips are available.

Discuss your shipment and Talk to our team can be linked when their contact destinations are available.

## Product catalog

The catalog at `/products` and its localized equivalents uses `src/content/catalog/catalog.ts` for categories and products, and `src/content/translations/catalog/` for localized labels. Category links can preselect a filter with `?category=fruits` or `?category=vegetables`.

The catalog vegetable photographs are illustrative CC0 assets. [Cut Broccoli](https://commons.wikimedia.org/wiki/File:Cut_Broccoli.jpg) is credited to Alabama Extension / Margaret Barse, and [Green beans in a pile](https://commons.wikimedia.org/wiki/File:Green_beans_in_a_pile.JPG) is by Jeffery Martin. Local copies were resized and converted to WebP.

## Product details

All catalog items use the shared details template under `/products/[product]` and its localized equivalents. Translated product labels and enquiry text live in `src/content/translations/product/`. The default strawberry sizes and cut images live in `src/content/catalog/strawberry.ts`. The enquiry button prepares a message that visitors can edit and copy. The whole and halved examples are illustrative CC0 photos from Wikimedia Commons. [RedStrawberries](https://commons.wikimedia.org/wiki/File:RedStrawberries.jpg) is by Hastibozorgi, and [Strawberry Half](https://commons.wikimedia.org/wiki/File:Strawberry_Half.jpg) is by 5snake5. Local copies were resized and converted to WebP. The halved strawberry image was cropped.

## About Us

The About page at `/about` and its localized equivalents uses `src/content/translations/about/` for the page copy, core values, and export steps. The core-value icons traced as vector paths from the supplied masks are in `public/images/about/`.

## Contact

The Contact page at `/contact` and its localized equivalents offers general, export, and product enquiries. The form previews and copies the completed message in the browser. Set the official addresses in the admin dashboard to show prefilled email links. Product enquiries use the export address. `AMAC_GENERAL_EMAIL` and `AMAC_EXPORT_EMAIL` are used before the first dashboard publish. The country picker searches ISO 3166-1 country names and aliases across all supported languages, with Kosovo added.

## Journal

The localized journal and article pages use `src/content/translations/journal/` for editorials, titles, and labels. Each article is pre-rendered at its own `/journal/[article]` URL in each language. Set `AMAC_SITE_URL` to the published site origin to generate absolute canonical and language alternate URLs. The three covers come from the supplied journal layouts. The IQF article uses the supplied copy, and the farm and export-partner articles are starter drafts.

## Administration

Open `/admin`. Set a strong `AMAC_ADMIN_PASSWORD` of at least 16 characters in `.env.local` for development or as a server secret in production. Protect the production deployment with HTTPS. The password is for one shared administrator account. Editing and uploads require a signed administration session.

For loopback-only development, a shorter password can be used with a separate random `AMAC_ADMIN_DEV_SESSION_SECRET` of at least 32 characters. This option is enabled only by the development server.

The first visit loads the existing catalog, journal posts, translations, and image references. Edits stay in the editor until **Publish changes**. Unpublished products and articles stay in the dashboard. An article requires its English title, text, and a cover to publish. Each additional translation appears once that language has both a title and text. Product and article slugs become their stable URLs.

Use a persistent directory as `AMAC_CONTENT_DIR` for a single Node.js server. Development defaults to the ignored `.amac-content` directory. Back up the directory with its `content.json` and `media` folder together. A deployment with ephemeral or read-only storage needs a durable storage integration. Set `AMAC_SITE_URL` to the published origin for absolute SEO links and the generated `/sitemap.xml`.

The upload fields show their recommended and minimum dimensions. They accept JPEG, PNG, and WebP files up to 8 MB, and store optimized WebP versions. The recommended sizes are 1920 × 1080 for the hero, 1600 × 1000 for article covers, 1200 × 900 for product and cut images, 900 × 600 for certificates, and 1440 × 1000 for section images.
