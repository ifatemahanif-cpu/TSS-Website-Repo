# Overview

The Story Shapers is a marketing agency website built as a full-stack TypeScript application. It's a multi-page marketing site showcasing the agency's team, services, problem-framing narrative, and case studies. The site features a clean editorial aesthetic with subtle animations (Framer Motion), custom typography (Libre Baskerville, Inter, JetBrains Mono), and a distinctive pink/purple/deep-blue color palette. The homepage tells a progressive story: Hero (with scrolling brand marquee) > The Problem > What We Do (with expandable case studies) > Team > Services > CTA > Footer.

The project follows a monorepo structure with a React frontend (Vite), an Express backend, and a PostgreSQL database via Drizzle ORM — though the database is minimally used (only a users table exists, with in-memory storage as the current default).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Directory Structure

- `client/` — React frontend (Vite-based SPA)
  - `client/src/pages/` — Page components (Home, NotFound)
  - `client/src/components/home/` — Homepage sections (Hero, Origin/WhatWeDo, ProblemFraming, Team, Services, CTA)
  - `client/src/components/layout/` — Layout components (Navbar)
  - `client/src/components/ui/` — Shadcn/ui component library (extensive set)
  - `client/src/hooks/` — Custom React hooks
  - `client/src/lib/` — Utilities (query client, cn helper)
- `server/` — Express backend
  - `server/index.ts` — Entry point, HTTP server setup
  - `server/routes.ts` — API route registration (currently empty, placeholder)
  - `server/storage.ts` — Storage interface with in-memory implementation
  - `server/static.ts` — Static file serving for production builds
  - `server/vite.ts` — Vite dev server middleware integration
- `shared/` — Shared code between client and server
  - `shared/schema.ts` — Drizzle ORM schema and Zod validation schemas
- `migrations/` — Drizzle migration output directory
- `attached_assets/` — Reference content/copy documents
- `script/build.ts` — Production build script (Vite + esbuild)

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
- **API Pattern**: REST API with `/api` prefix (routes are currently placeholder stubs)
- **Dev Server**: Vite middleware integrated into Express for development; static file serving in production
- **Build**: esbuild bundles server code to `dist/index.cjs`; Vite builds client to `dist/public/`

## Data Storage

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Single `users` table (id, username, password) defined in `shared/schema.ts`
- **Validation**: drizzle-zod generates Zod schemas from Drizzle table definitions
- **Current Runtime Storage**: `MemStorage` class (in-memory Map) — the `IStorage` interface is designed to be swapped for a database-backed implementation
- **Database Config**: `drizzle.config.ts` expects `DATABASE_URL` environment variable pointing to PostgreSQL
- **Migrations**: Run via `drizzle-kit push` (`npm run db:push`)

## Key Design Decisions

1. **In-memory storage as default**: The storage layer uses an interface pattern (`IStorage`) with `MemStorage` as the default. This can be swapped to a Drizzle/PostgreSQL implementation when the database is provisioned. The schema is ready in `shared/schema.ts`.

2. **Shared schema**: Database types and validation schemas live in `shared/` so both client and server can import them.

3. **Monorepo with path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`. Configured in both `tsconfig.json` and `vite.config.ts`.

4. **Single-page marketing site**: Currently only has a home page with sections. The routing infrastructure (wouter) is in place for adding more pages.

5. **Production build**: Uses a custom build script that runs Vite for client and esbuild for server, bundling select dependencies to reduce cold start time.

# External Dependencies

## Database
- **PostgreSQL** — Required for persistent storage. Connection via `DATABASE_URL` environment variable. Currently the app runs with in-memory storage if no database is available.

## Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and migration tooling for PostgreSQL
- **express** v5 — HTTP server framework
- **@tanstack/react-query** — Async state management
- **framer-motion** — Animation library used extensively in Hero and other sections
- **wouter** — Lightweight client-side routing
- **connect-pg-simple** — PostgreSQL session store (available but not yet wired up)
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