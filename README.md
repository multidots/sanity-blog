## Sanity Blog Theme (Next.js + Sanity v3)

Modern, editor-friendly starter that pairs Next.js (App Router) with Sanity Studio v3. It ships with a flexible Page Builder, a blog, SEO fields, and a curated Studio experience (Desk structure, grouped fields, icons, and collapsible inputs).

### Highlights
- Page Builder with reusable blocks (Hero, CTA, Image & Text, Client Logos, Services, Testimonials, Team, Address)
- Organized editor UX: field groups, collapsible sections, sensible defaults, previews
- Sanity Studio embedded at `/studio` with a custom content structure
- Blog with authors, categories, SEO, pagination-ready queries

## Create a new project

The easiest way to get started is using the CLI:

```bash
npx sanity-blog-theme my-blog-project
cd my-blog-project
```

Or using your preferred package manager:

```bash
# npm
npx sanity-blog-theme my-blog-project

# yarn
yarn create sanity-blog-theme my-blog-project

# pnpm
pnpm create sanity-blog-theme my-blog-project
```

This will:
- Create a new directory with your project name
- Copy all template files
- **Interactive Sanity setup** - Configure your project with guided prompts
- **Auto-generate .env.local** - No manual environment setup needed
- Install dependencies automatically
- Set up a proper `.gitignore` file
- Update `package.json` with your project name

### 🚀 Interactive Setup Process

The CLI will guide you through:

1. **Sanity Project Configuration** - Enter your project details:
   - Project ID
   - Dataset name (default: "production")
   - API version (auto-suggested with current date)

2. **Environment File Creation** - Choose to:
   - Create `.env.local` with your actual project details
   - Or get an `.env.example` template for manual setup

3. **Ready to Go** - Your project will be fully configured and ready to run!

## Project structure

### Folder Structure

```
sanity-blog-theme/
├── public/                         # Static assets
│   └── images/                    # Image assets
├── src/                           # Source code
│   ├── app/                       # Next.js App Router
│   │   ├── (frontend)/           # Frontend route group
│   │   │   ├── [slug]/           # Dynamic page routes
│   │   │   └── blog/             # Blog routes
│   │   │       └── [slug]/       # Individual blog post routes
│   │   ├── api/                  # API routes
│   │   │   └── submit-form/      # Form submission endpoint for contact form plugin integration
│   │   └── studio/               # Sanity Studio routes
│   │       └── [[...tool]]/      # Studio catch-all routes
│   ├── components/               # React components
│   │   └── blocks/               # Page Builder block components
│   └── sanity/                   # Sanity configuration and schemas
│       ├── lib/                  # Sanity utilities
│       └── schemaTypes/          # Content schemas
│           └── blocks/           # Block schemas for Page Builder
```

### Sanity Studio
- Config: `sanity.config.ts`
- Schemas: `src/sanity/schemaTypes/`
- Custom Desk structure: `src/sanity/structure.ts`
- Contact Form: `@multidots/sanity-plugin-contact-form` integration

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
  - `clientList`: Title, logos (image + url/new tab)
  - `services`: Title, services (title, text, background color)
  - `testimonialSlider`: Title, testimonials (quote, author)
  - `team`: Title, team (name, role, image, bg color)
  - `address`: Title, address, phone, email
- `blockContent`: Portable Text with basic marks, images, CTAs, etc.
- `seo`: Title override, description, image, noindex

Icons
- Blocks use icons from `@sanity/icons` for a clearer insert menu and arrays.
  - For example: `hero` (TextIcon), `ctaBlock` (BlockContentIcon), `team` (UsersIcon), `address` (PinIcon)
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

### Mobile Navigation
- Responsive hamburger menu with smooth slide animations
- Vertical mobile menu layout with professional styling
- Touch-friendly interactions and accessibility features
- Auto-close on navigation and click outside

### Contact Form System
- **Plugin**: `@multidots/sanity-plugin-contact-form` v1.0.5
- **Features**: Dynamic forms, file upload, reCAPTCHA, email notifications
- **Documentation**: [Plugin Documentation](https://www.npmjs.com/package/@multidots/sanity-plugin-contact-form)

### Queries
Queries live in `src/sanity/lib/queries.ts` and cover header/footer, sitemap, pages, posts, and settings.

- `PAGE_QUERY` loads page content + SEO
- `POSTS_QUERY`, `POSTS_COUNT_QUERY`, `SINGLE_POST_QUERY` power the blog
- `SITE_SETTINGS_QUERY`, `HEADER_QUERY`, `FOOTER_QUERY` load global UI config
- `SITEMAP_QUERY` returns URLs and update dates for pages and posts


## Using the Page Builder

1) Create a `Page` document in Studio
2) Add blocks to the `Content` group
3) Use the insert menu (grid view) to discover blocks; re-order via drag-and-drop
4) Most blocks have grouped fields (Content, Style, etc.) and collapsible sub-objects for a clean editing experience

## Contact Form Plugin

The project includes `@multidots/sanity-plugin-contact-form` for dynamic form creation and management. For detailed setup and usage instructions, visit the [plugin documentation](https://www.npmjs.com/package/@multidots/sanity-plugin-contact-form).

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

**Current Available Blocks**: `hero`, `ctaBlock`, `imageTextSection`, `clientList`, `services`, `testimonialSlider`, `team`, `address`

## Development

Common commands
```bash
npm run dev      # Start Next.js app + Studio (mounted at /studio)
npm run build    # Production build
npm run start    # Start production server
```

Sanity configuration
- Project/API vars are set via `src/sanity/env.ts`
- Studio plugins: Structure tool, Vision, Color input, Contact Form plugin


## Troubleshooting

- Missing env var error
  - The app throws a helpful error if `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is missing
- Studio not showing a type
  - Ensure the type is exported in `src/sanity/schemaTypes/index.ts`


## License

MIT — feel free to use, modify, and distribute. Attribution is appreciated.
