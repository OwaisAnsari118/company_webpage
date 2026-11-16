# Pineapplix — Website

Marketing website for **Pineapplix**, a fabless semiconductor IP company.
Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS 3**. Every page is statically pre-rendered.

## Quick start

Requires Node.js 18.18+ (20 or 22 recommended).

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:3000
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run typecheck  # TypeScript only
```

## Project structure

```
app/
  layout.tsx                         Root layout: fonts, header, footer, global metadata
  page.tsx                           Home
  products/page.tsx                  Product catalog (grouped by category)
  products/[category]/[slug]/page.tsx  Product detail template (generated from data)
  about/page.tsx                     About
  contact/page.tsx                   Contact
  icon.svg                           Favicon (logo mark)
  opengraph-image.tsx                Social share image (generated at build)
  sitemap.ts / robots.ts             /sitemap.xml and /robots.txt
  not-found.tsx                      404 page
  globals.css                        Tailwind layers + reveal/circuit animations
components/
  Header.tsx, Footer.tsx, Logo.tsx   Global chrome
  Button.tsx, SectionHeading.tsx     UI primitives
  ProductCard.tsx, FeatureCard.tsx, CtaBanner.tsx
  CircuitBackground.tsx              Animated SVG hero background
  Reveal.tsx                         Scroll-in animation (+ inline observer script)
  ContactForm.tsx                    Contact form with client-side validation
  diagrams/                          Product block diagrams + registry
  icons.tsx                          Inline SVG icons
data/
  products.ts                        ⭐ Product catalog — edit this to add IP
  site.ts                            Site URL, contact email, navigation
lib/seo.ts                           Per-page metadata helper
legacy-static/                       Previous static HTML version (reference only, not deployed)
```

## Adding a new IP core

1. Open `data/products.ts` and add an entry to `products`:
   - `status: "coming-soon"` shows a placeholder card only.
   - `status: "available"` also generates a detail page at `/products/<categorySlug>/<slug>`,
     adds it to the sitemap, footer and contact-form dropdown.
2. New category? Add it to `categories`; it gets its own section on `/products`.
3. Optional block diagram: create `components/diagrams/MyDiagram.tsx`, register it in
   `components/diagrams/index.ts`, add the key to the `DiagramKey` type and set `diagram` on the product.

No page layouts need to change.

## Replacing placeholder content

All placeholder copy and specs are marked with `PLACEHOLDER`. List them with:

```bash
grep -rn "PLACEHOLDER" app components data
```

Notably: spec values marked `TBD`, the contact email in `data/site.ts`, About page text, and the
hero headline (only claim "silicon-proven" once that is true).

## Contact form → email

The form currently logs submissions to the browser console and shows a success message.
See the `TODO(email)` notes in `components/ContactForm.tsx`: add a route handler at
`app/api/contact/route.ts` that sends the email (for example Resend, Postmark or SendGrid), keep API keys in
environment variables, and POST to it from the form.

Pre-select a product or request type with URL params:
`/contact?product=uart-controller&type=evaluation` (`type` = `general` | `datasheet` | `evaluation`).

## Brand tokens

Defined in `tailwind.config.ts`:

| Token              | Value     | Use                                  |
| ------------------ | --------- | ------------------------------------ |
| `brand-yellow`     | `#F3D432` | Primary accents, CTAs                |
| `brand-black`      | `#000000` | Dark sections, text                  |
| `offwhite`         | `#FAFAFA` | Light sections                       |
| `ink-900` / `ink-800` | `#1A1A1A` / `#2B2B2B` | Cards on dark, body text on light |
| `ink-muted`        | `#888888` | Secondary text — **dark backgrounds only** (fails contrast on light) |

Fonts: Space Grotesk (headings) and Inter (body) via `next/font/google` (self-hosted at build time).

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project**, import the repo. The framework is auto-detected as Next.js; keep the
   default build (`next build`) and output settings.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` = your production URL
   (for example `https://www.pineapplix.com`). It is used for canonical URLs, Open Graph, sitemap and robots.
4. Deploy, then add your custom domain under **Settings → Domains**.

Alternatively, from the CLI: `npm i -g vercel && vercel` (preview) / `vercel --prod`.
