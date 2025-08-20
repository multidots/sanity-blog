## Sanity Blog Theme (Next.js + Sanity v3)

Modern, editor-friendly starter that pairs Next.js (App Router) with Sanity Studio v3. It ships with a flexible Page Builder, a blog, SEO fields, and a curated Studio experience (Desk structure, grouped fields, icons, and collapsible inputs).

### Highlights
- Page Builder with reusable blocks (Hero, CTA, Image & Text, List, Client Logos, Services, Testimonials, Team, Address, Table)
- Organized editor UX: field groups, collapsible sections, sensible defaults, previews
- Sanity Studio embedded at `/studio` with a custom content structure
- Blog with authors, categories, SEO, pagination-ready queries
- Ready for Vercel deployment; environment-driven Sanity configuration

## Quick start

### Prerequisites
- Node.js LTS (v18+)
- npm, pnpm, or yarn
- A Sanity project (create one at `https://www.sanity.io/`)

### 1) Configure environment
Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-10
```

Values are read from `src/sanity/env.ts`. If any are missing, the app will throw a clear error.

### 2) Install and run

```bash
npm install
npm run dev
# or: pnpm install && pnpm dev
```

- App: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Project structure

### Sanity Studio
- Config: `sanity.config.ts`
- Schemas: `src/sanity/schemaTypes/`
- Custom Desk structure: `src/sanity/structure.ts`

Studio is mounted at `/studio` via the Next.js App Router integration.

### Content model (schemas)

Documents
- `page`: Title, Slug, Content (Page Builder), SEO
- `post`: Title, Slug, Author, Main Image, Categories, Published At, Body, SEO
- `author`: Name, Slug, Image, Bio
- `category`: Title, Slug, Description
- `siteSettings` (singleton): General, Header (Logo, Menu), Footer (menus, social), Blog settings, Home page reference

Objects and blocks
- `pageBuilder`: Array composing these blocks:
  - `hero`: Headline/subtitle, background (image/color), alignment, colors
  - `ctaBlock`: Heading, Subheading, Button (text/link/new tab), background (image/color), text color
  - `imageTextSection`: Title, portable description, main image (+alt/size), image position, button
  - `List`: Title/description, items (icon + text)
  - `clientList`: Title, logos (image + url/new tab)
  - `services`: Title, services (title, text, background color)
  - `testimonialSlider`: Title, testimonials (quote, author)
  - `team`: Title, team (name, role, image, bg color)
  - `address`: Title, address, phone, email
  - `table`: Rich-content cells and caption
- `blockContent`: Portable Text with basic marks, images, CTAs, table, highlight, etc.
- `seo`: Title override, description, image, noindex

Icons
- Blocks use icons from `@sanity/icons` for a clearer insert menu and arrays.
  - For example: `hero` (TextIcon), `ctaBlock` (BlockContentIcon), `table` (TabletDeviceIcon), `team` (UsersIcon), `address` (PinIcon)
  - Change icons in each block schema under `src/sanity/schemaTypes/blocks/*Type.ts`.

### Desk structure
Defined in `src/sanity/structure.ts`:
- Site Settings singleton pinned at the top
- Pages
- Blog → Posts, Categories, Authors
- Any other types appear in a fallback list

## Frontend implementation

### Rendering content
- Page Builder component: `src/components/PageBuilder.tsx`
  - Maps each `_type` in the `pageBuilder` array to a React component in `src/components/blocks/*`
  - Includes in-place editing data attributes via `next-sanity` for a smoother authoring workflow

### Queries
Queries live in `src/sanity/lib/queries.ts` and cover header/footer, sitemap, pages, posts, and settings.

- `PAGE_QUERY` loads page content + SEO
- `POSTS_QUERY`, `POSTS_COUNT_QUERY`, `SINGLE_POST_QUERY` power the blog
- `SITE_SETTINGS_QUERY`, `HEADER_QUERY`, `FOOTER_QUERY` load global UI config
- `SITEMAP_QUERY` returns URLs and update dates for pages and posts

Note: Some optional fields appear in queries (e.g., `scheduleCallTitle`, `scheduleCallUrl`, `hideHeader`, `hideFooter`). If you want to use them, add those fields to `siteSettings` or `page` schemas accordingly.

## Using the Page Builder

1) Create a `Page` document in Studio
2) Add blocks to the `Content` group
3) Use the insert menu (grid view) to discover blocks; re-order via drag-and-drop
4) Most blocks have grouped fields (Content, Style, etc.) and collapsible sub-objects for a clean editing experience

Insert menu previews
- `pageBuilder` is configured to show grid previews if you add optional images at: `/public/block-previews/{schemaType}.png`
  - Example: `/public/block-previews/hero.png`

## Blog

Content modeling
- `post` documents reference `author` and `category`
- `seo` embedded per post

Frontend
- Blog listing and post page live under `src/app/(frontend)/blog`
- Pagination logic can use `POSTS_QUERY` + `POSTS_COUNT_QUERY`
- Posts per page driven by `siteSettings.blogPostsPerPage`

## Global settings

Singleton: `siteSettings` (enforced via Desk structure and restricted actions in `sanity.config.ts`).

Key fields
- General: `siteTitle`
- Header: `logo`, `menuItems` (title, url, openInNewTab)
- Footer: `footerTitle`, `footerDescription`, `footermenuItems`, `copyrightText`, `socialLinks`
- Pages: `homePage` reference (used as the site’s homepage source)
- Blog: `blogPostsPerPage`, `blogPageCTA`

## SEO

Each `page` and `post` has an `seo` object. Queries coalesce page/post title/description when SEO fields are left empty. `noIndex` can be toggled per document.

## Add a new block

1) Create the schema
- Add a new file under `src/sanity/schemaTypes/blocks/YourBlockType.ts`
- Follow the pattern in existing blocks: groups, fields, preview, icon

2) Register the type
- Export it from `src/sanity/schemaTypes/index.ts`
- Add it to the `of` list in `src/sanity/schemaTypes/pageBuilderType.ts`

3) Build the React component
- Create `src/components/blocks/YourBlock.tsx`
- Match props to your schema fields

4) Map it in the Page Builder
- Update the switch in `src/components/PageBuilder.tsx` to render your component when `_type === 'yourBlock'`

5) (Optional) Insert menu preview
- Add `/public/block-previews/yourBlock.png` to visualize the block in the Studio insert grid

## Development

Common commands
```bash
npm run dev      # Start Next.js app + Studio (mounted at /studio)
npm run build    # Production build
npm run start    # Start production server
```

Sanity configuration
- Project/API vars are set via `src/sanity/env.ts`
- Studio plugins: Structure tool, Vision, Color input

## Deployment

### Vercel (recommended)
1) Push your repo to GitHub/GitLab/Bitbucket
2) Import the project in Vercel
3) Set environment variables in Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4) Deploy

Sanity CORS
- Add your production domain to the Sanity project CORS origins in the Sanity manage dashboard, so frontend queries can resolve in production.

## Troubleshooting

- Missing env var error
  - The app throws a helpful error if `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is missing
- Studio not showing a type
  - Ensure the type is exported in `src/sanity/schemaTypes/index.ts`
- Insert menu previews not visible
  - Ensure `/public/block-previews/{schemaType}.png` exists and is correctly named
- Optional fields in queries
  - If you see references to `scheduleCallTitle`, `scheduleCallUrl`, `hideHeader`, `hideFooter`, you can add those fields to schemas to enable them

## License

MIT — feel free to use, modify, and distribute. Attribution is appreciated.
