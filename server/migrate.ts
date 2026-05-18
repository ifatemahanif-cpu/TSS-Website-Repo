import { db } from "./db";
import { sql } from "drizzle-orm";

export async function runMigrations() {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE blog_post_status AS ENUM ('draft', 'published');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE email_subscriber_status AS ENUM ('active', 'unsubscribed');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS authors (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      photo TEXT NOT NULL DEFAULT '',
      bio TEXT NOT NULL DEFAULT '',
      twitter TEXT NOT NULL DEFAULT '',
      linkedin TEXT NOT NULL DEFAULT '',
      website TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      featured_image TEXT NOT NULL DEFAULT '',
      author_name TEXT NOT NULL DEFAULT 'The Story Shapers',
      author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
      category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
      status blog_post_status NOT NULL DEFAULT 'draft',
      featured BOOLEAN NOT NULL DEFAULT false,
      published_at TIMESTAMP,
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      focus_keyword TEXT NOT NULL DEFAULT '',
      canonical_url TEXT NOT NULL DEFAULT '',
      reading_time INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS email_subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      status email_subscriber_status NOT NULL DEFAULT 'active',
      unsubscribe_token TEXT NOT NULL DEFAULT gen_random_uuid()::text,
      source TEXT NOT NULL DEFAULT 'blog',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await db.execute(sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL;`);
  await db.execute(sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;`);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS team_member_portfolios (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      hero JSONB NOT NULL DEFAULT '{}'::jsonb,
      brands JSONB NOT NULL DEFAULT '{}'::jsonb,
      stats JSONB NOT NULL DEFAULT '{}'::jsonb,
      case_studies JSONB NOT NULL DEFAULT '{}'::jsonb,
      testimonials JSONB NOT NULL DEFAULT '[]'::jsonb,
      about JSONB NOT NULL DEFAULT '{}'::jsonb,
      work_with_me JSONB NOT NULL DEFAULT '{}'::jsonb,
      footer JSONB NOT NULL DEFAULT '{}'::jsonb
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS image_uploads (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  console.log("Migrations applied successfully.");
}
