import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, serial, boolean } from "drizzle-orm/pg-core";
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
