import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, serial, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({ id: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  decisionsLed: text("decisions_led").notNull(),
  brands: text("brands").notNull(),
  brandsLabel: text("brands_label").notNull().default("Brands"),
  whatSheBrings: text("what_she_brings").array().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  serviceId: text("service_id").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  items: text("items").array().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  displayId: text("display_id").notNull(),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertProblemSchema = createInsertSchema(problems).omit({ id: true });
export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export const whatWeDoBlocks = pgTable("what_we_do_blocks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  teaser: text("teaser").notNull(),
  expanded: text("expanded").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertWhatWeDoBlockSchema = createInsertSchema(whatWeDoBlocks).omit({ id: true });
export type InsertWhatWeDoBlock = z.infer<typeof insertWhatWeDoBlockSchema>;
export type WhatWeDoBlock = typeof whatWeDoBlocks.$inferSelect;

export const pageSections = pgTable("page_sections", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull(),
  sectionKey: text("section_key").notNull(),
  content: jsonb("content").notNull(),
});

export const insertPageSectionSchema = createInsertSchema(pageSections).omit({ id: true });
export type InsertPageSection = z.infer<typeof insertPageSectionSchema>;
export type PageSection = typeof pageSections.$inferSelect;

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  data: jsonb("data").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({ id: true, createdAt: true, read: true });
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;

export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertBlogCategorySchema = createInsertSchema(blogCategories).omit({ id: true });
export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type BlogCategory = typeof blogCategories.$inferSelect;

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  photo: text("photo").notNull().default(""),
  bio: text("bio").notNull().default(""),
  twitter: text("twitter").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  website: text("website").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertAuthorSchema = createInsertSchema(authors).omit({ id: true });
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type Author = typeof authors.$inferSelect;

export const emailSubscriberStatusEnum = pgEnum("email_subscriber_status", ["active", "unsubscribed"]);

export const emailSubscribers = pgTable("email_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: emailSubscriberStatusEnum("status").notNull().default("active"),
  unsubscribeToken: text("unsubscribe_token").notNull().default(sql`gen_random_uuid()`),
  source: text("source").notNull().default("blog"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEmailSubscriberSchema = createInsertSchema(emailSubscribers).omit({ id: true, createdAt: true, unsubscribeToken: true });
export type InsertEmailSubscriber = z.infer<typeof insertEmailSubscriberSchema>;
export type EmailSubscriber = typeof emailSubscribers.$inferSelect;

export const blogPostStatusEnum = pgEnum("blog_post_status", ["draft", "published"]);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  featuredImage: text("featured_image").notNull().default(""),
  authorName: text("author_name").notNull().default("The Story Shapers"),
  authorId: integer("author_id").references(() => authors.id, { onDelete: "set null" }),
  categoryId: integer("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
  status: blogPostStatusEnum("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at"),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  ogImage: text("og_image").notNull().default(""),
  focusKeyword: text("focus_keyword").notNull().default(""),
  canonicalUrl: text("canonical_url").notNull().default(""),
  readingTime: integer("reading_time").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const imageUploads = pgTable("image_uploads", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ImageUpload = typeof imageUploads.$inferSelect;
