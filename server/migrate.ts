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
    CREATE TABLE IF NOT EXISTS blog_categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
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
      category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
      status blog_post_status NOT NULL DEFAULT 'draft',
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

  console.log("Migrations applied successfully.");
}
