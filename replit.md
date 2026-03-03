# Overview

The Story Shapers is a marketing agency website built as a full-stack TypeScript application. It's a multi-page marketing site showcasing the agency's team, services, problem-framing narrative, and case studies. The site features a clean editorial aesthetic with subtle animations (Framer Motion), custom typography (Libre Baskerville, Inter, JetBrains Mono), and a distinctive pink/purple/deep-blue color palette. The homepage tells a progressive story: Hero (with scrolling brand marquee) > The Problem > What We Do (with expandable case studies) > Team > Services > CTA > Footer.

The project follows a monorepo structure with a React frontend (Vite), an Express backend, and a PostgreSQL database via Drizzle ORM. All website content is managed through a CMS admin dashboard and stored in the database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Directory Structure

- `client/` — React frontend (Vite-based SPA)
  - `client/src/pages/` — Page components (Home, NotFound)
  - `client/src/pages/admin/` — Admin dashboard (login.tsx, dashboard.tsx)
  - `client/src/components/home/` — Homepage sections (Hero, Origin/WhatWeDo, ProblemFraming, Team, Services, CTA)
  - `client/src/components/layout/` — Layout components (Navbar)
  - `client/src/components/ui/` — Shadcn/ui component library (extensive set)
  - `client/src/hooks/` — Custom React hooks (use-cms.ts for CMS data fetching)
  - `client/src/lib/` — Utilities (query client, cn helper)
- `server/` — Express backend
  - `server/index.ts` — Entry point, HTTP server setup, runs seed on startup
  - `server/routes.ts` — API route registration (CMS CRUD + auth endpoints)
  - `server/storage.ts` — DatabaseStorage implementation using Drizzle ORM
  - `server/seed.ts` — Seeds database with initial hardcoded content (idempotent)
  - `server/db.ts` — Database connection pool
  - `server/static.ts` — Static file serving for production builds
  - `server/vite.ts` — Vite dev server middleware integration
- `shared/` — Shared code between client and server
  - `shared/schema.ts` — Drizzle ORM schema and Zod validation schemas
- `migrations/` — Drizzle migration output directory
- `attached_assets/` — Reference content/copy documents and team images
- `uploads/` — User-uploaded files from admin dashboard
- `script/build.ts` — Production build script (Vite + esbuild)

## CMS Architecture

### Content Models (Database Tables)
- **site_settings** — Global key-value store for all page section text (hero, problem, origin, team, services, cta settings as JSON)
- **team_members** — Name, image path, decisionsLed, brands, whatSheBrings (text array), sort order
- **services** — serviceId, title, subtitle, items (text array), sort order
- **problems** — displayId, text, sort order
- **what_we_do_blocks** — title, description, teaser, expanded text, sort order
- **page_sections** — Flexible key-value store for arbitrary page copy

### API Endpoints
- Public read: `GET /api/cms/settings`, `/api/cms/team`, `/api/cms/services`, `/api/cms/problems`, `/api/cms/whatwedo`
- Admin write (auth required): `PUT /api/cms/settings`, `POST/PUT/DELETE` for team/services/problems/whatwedo
- Auth: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- File upload: `POST /api/upload` (multer, saves to uploads/)

### Admin Dashboard
- Located at `/admin` (login at `/admin/login`)
- Default credentials: admin / storyshapers2024 (bcrypt hashed)
- Tabs: Site Settings, Problems, What We Do, Team, Services
- Inline editing with save buttons, image upload for team members

### Frontend CMS Integration
- Custom hooks in `client/src/hooks/use-cms.ts`: useCmsSettings, useCmsProblems, useCmsWhatWeDo, useCmsTeam, useCmsServices
- All homepage components fetch from API with hardcoded fallback values
- Hero and Problem headings use dangerouslySetInnerHTML for HTML formatting (admin-only content)
- React Query with 60s staleTime for CMS data

## Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite with HMR
- **Routing**: Wouter (lightweight client-side router)
- **State/Data**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui (new-york style) with Radix UI primitives
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin) with CSS custom properties for theming
- **Animations**: Framer Motion for scroll-based and entrance animations
- **Fonts**: Google Fonts — Libre Baskerville (serif headings), Inter (sans body), JetBrains Mono (mono)
- **Color Scheme**: Dark theme — deep indigo background (#0C0A3E), white text (#FFFFFF), accent labels (#2A2870), buttons (#7B1E7A with #9B3E9A hover), muted (#1A1852), card (#151340), borders rgba(255,255,255,0.12)

## Backend Architecture

- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, executed via `tsx`
- **API Pattern**: REST API with `/api` prefix; CMS endpoints under `/api/cms/`
- **Auth**: Session-based with bcryptjs password hashing
- **File Uploads**: Multer middleware, files stored in `uploads/` directory
- **Static Assets**: `attached_assets/` served at `/assets`, `uploads/` served at `/uploads`
- **Dev Server**: Vite middleware integrated into Express for development; static file serving in production
- **Build**: esbuild bundles server code to `dist/index.cjs`; Vite builds client to `dist/public/`

## Data Storage

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: CMS tables (site_settings, team_members, services, problems, what_we_do_blocks, page_sections) + users table
- **Validation**: drizzle-zod generates Zod schemas from Drizzle table definitions
- **Runtime Storage**: `DatabaseStorage` class using Drizzle queries against PostgreSQL
- **Database Config**: `drizzle.config.ts` expects `DATABASE_URL` environment variable pointing to PostgreSQL
- **Migrations**: Run via `drizzle-kit push` (`npm run db:push`)
- **Seeding**: `server/seed.ts` runs on startup, checks if siteSettings is empty before inserting

## Key Design Decisions

1. **CMS-driven content**: All website copy comes from the database via API. Frontend components use React Query hooks with hardcoded fallback values so the site never breaks if the API is unavailable.

2. **Shared schema**: Database types and validation schemas live in `shared/` so both client and server can import them.

3. **Monorepo with path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`. Configured in both `tsconfig.json` and `vite.config.ts`.

4. **Team images**: Stored in DB as "/assets/filename.jpg" paths. Server serves attached_assets/ at /assets and uploads/ at /uploads. Frontend has a defaultImageMap for known team members to use Vite-imported images as fallback.

5. **Production build**: Uses a custom build script that runs Vite for client and esbuild for server, bundling select dependencies to reduce cold start time.

# External Dependencies

## Database
- **PostgreSQL** — Required for persistent storage and CMS. Connection via `DATABASE_URL` environment variable.

## Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and migration tooling for PostgreSQL
- **express** v5 — HTTP server framework
- **bcryptjs** — Password hashing for admin auth
- **multer** — File upload middleware
- **@tanstack/react-query** — Async state management
- **framer-motion** — Animation library used extensively in Hero and other sections
- **wouter** — Lightweight client-side routing
- **zod** + **drizzle-zod** — Schema validation
- **Radix UI** — Full suite of accessible UI primitives (dialog, accordion, tabs, popover, etc.)
- **Shadcn/ui** — Pre-built component library built on Radix + Tailwind

## Fonts (External CDN)
- Google Fonts: Libre Baskerville, Inter, JetBrains Mono, Press Start 2P

## Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)
- `vite-plugin-meta-images` — Custom plugin to set OpenGraph image URLs based on Replit deployment domain
