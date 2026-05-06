import {
  type User, type InsertUser,
  type SiteSettings, type InsertSiteSettings,
  type TeamMember, type InsertTeamMember,
  type Service, type InsertService,
  type Problem, type InsertProblem,
  type WhatWeDoBlock, type InsertWhatWeDoBlock,
  type PageSection, type InsertPageSection,
  type FormSubmission, type InsertFormSubmission,
  type BlogCategory, type InsertBlogCategory,
  type BlogPost, type InsertBlogPost,
  type Author, type InsertAuthor,
  type EmailSubscriber, type InsertEmailSubscriber,
  users, siteSettings, teamMembers, services, problems, whatWeDoBlocks, pageSections, formSubmissions,
  blogCategories, blogPosts, authors, emailSubscribers,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, and, desc, sql, count, ne } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getSetting(key: string): Promise<any | undefined>;
  upsertSetting(key: string, value: any): Promise<SiteSettings>;
  getAllSettings(): Promise<SiteSettings[]>;

  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;

  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  getProblems(): Promise<Problem[]>;
  getProblem(id: number): Promise<Problem | undefined>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  updateProblem(id: number, problem: Partial<InsertProblem>): Promise<Problem | undefined>;
  deleteProblem(id: number): Promise<boolean>;

  getWhatWeDoBlocks(): Promise<WhatWeDoBlock[]>;
  getWhatWeDoBlock(id: number): Promise<WhatWeDoBlock | undefined>;
  createWhatWeDoBlock(block: InsertWhatWeDoBlock): Promise<WhatWeDoBlock>;
  updateWhatWeDoBlock(id: number, block: Partial<InsertWhatWeDoBlock>): Promise<WhatWeDoBlock | undefined>;
  deleteWhatWeDoBlock(id: number): Promise<boolean>;

  getPageSections(pageKey: string): Promise<PageSection[]>;
  getPageSection(pageKey: string, sectionKey: string): Promise<PageSection | undefined>;
  upsertPageSection(pageKey: string, sectionKey: string, content: any): Promise<PageSection>;
  deletePageSection(id: number): Promise<boolean>;

  createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  getFormSubmissions(): Promise<FormSubmission[]>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
  markFormSubmissionRead(id: number, read: boolean): Promise<FormSubmission | undefined>;
  deleteFormSubmission(id: number): Promise<boolean>;

  getBlogCategories(): Promise<BlogCategory[]>;
  getBlogCategory(id: number): Promise<BlogCategory | undefined>;
  createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  updateBlogCategory(id: number, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined>;
  deleteBlogCategory(id: number): Promise<boolean>;

  getBlogPosts(options: { status?: "draft" | "published"; categoryId?: number; limit?: number; offset?: number; excludeId?: number }): Promise<{ posts: BlogPost[]; total: number }>;
  getFeaturedPost(): Promise<BlogPost | undefined>;
  getRelatedPosts(postId: number, categoryId: number | null, limit: number): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  setFeaturedPost(id: number): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  getAuthors(): Promise<Author[]>;
  getAuthor(id: number): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  updateAuthor(id: number, author: Partial<InsertAuthor>): Promise<Author | undefined>;
  deleteAuthor(id: number): Promise<boolean>;

  getEmailSubscribers(): Promise<EmailSubscriber[]>;
  getActiveEmailSubscribers(): Promise<EmailSubscriber[]>;
  createEmailSubscriber(email: string, source?: string): Promise<EmailSubscriber>;
  getEmailSubscriberByToken(token: string): Promise<EmailSubscriber | undefined>;
  unsubscribeByToken(token: string): Promise<boolean>;
  unsubscribeById(id: number): Promise<boolean>;
  deleteEmailSubscriber(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSetting(key: string): Promise<any | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting?.value;
  }

  async upsertSetting(key: string, value: any): Promise<SiteSettings> {
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    if (existing.length > 0) {
      const [updated] = await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key)).returning();
      return updated;
    }
    const [created] = await db.insert(siteSettings).values({ key, value }).returning();
    return created;
  }

  async getAllSettings(): Promise<SiteSettings[]> {
    return db.select().from(siteSettings);
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [updated] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return updated;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning();
    return result.length > 0;
  }

  async getServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(asc(services.sortOrder));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  async getProblems(): Promise<Problem[]> {
    return db.select().from(problems).orderBy(asc(problems.sortOrder));
  }

  async getProblem(id: number): Promise<Problem | undefined> {
    const [problem] = await db.select().from(problems).where(eq(problems.id, id));
    return problem;
  }

  async createProblem(problem: InsertProblem): Promise<Problem> {
    const [created] = await db.insert(problems).values(problem).returning();
    return created;
  }

  async updateProblem(id: number, problem: Partial<InsertProblem>): Promise<Problem | undefined> {
    const [updated] = await db.update(problems).set(problem).where(eq(problems.id, id)).returning();
    return updated;
  }

  async deleteProblem(id: number): Promise<boolean> {
    const result = await db.delete(problems).where(eq(problems.id, id)).returning();
    return result.length > 0;
  }

  async getWhatWeDoBlocks(): Promise<WhatWeDoBlock[]> {
    return db.select().from(whatWeDoBlocks).orderBy(asc(whatWeDoBlocks.sortOrder));
  }

  async getWhatWeDoBlock(id: number): Promise<WhatWeDoBlock | undefined> {
    const [block] = await db.select().from(whatWeDoBlocks).where(eq(whatWeDoBlocks.id, id));
    return block;
  }

  async createWhatWeDoBlock(block: InsertWhatWeDoBlock): Promise<WhatWeDoBlock> {
    const [created] = await db.insert(whatWeDoBlocks).values(block).returning();
    return created;
  }

  async updateWhatWeDoBlock(id: number, block: Partial<InsertWhatWeDoBlock>): Promise<WhatWeDoBlock | undefined> {
    const [updated] = await db.update(whatWeDoBlocks).set(block).where(eq(whatWeDoBlocks.id, id)).returning();
    return updated;
  }

  async deleteWhatWeDoBlock(id: number): Promise<boolean> {
    const result = await db.delete(whatWeDoBlocks).where(eq(whatWeDoBlocks.id, id)).returning();
    return result.length > 0;
  }

  async getPageSections(pageKey: string): Promise<PageSection[]> {
    return db.select().from(pageSections).where(eq(pageSections.pageKey, pageKey));
  }

  async getPageSection(pageKey: string, sectionKey: string): Promise<PageSection | undefined> {
    const [section] = await db.select().from(pageSections)
      .where(and(eq(pageSections.pageKey, pageKey), eq(pageSections.sectionKey, sectionKey)));
    return section;
  }

  async upsertPageSection(pageKey: string, sectionKey: string, content: any): Promise<PageSection> {
    const existing = await this.getPageSection(pageKey, sectionKey);
    if (existing) {
      const [updated] = await db.update(pageSections).set({ content })
        .where(and(eq(pageSections.pageKey, pageKey), eq(pageSections.sectionKey, sectionKey)))
        .returning();
      return updated;
    }
    const [created] = await db.insert(pageSections).values({ pageKey, sectionKey, content }).returning();
    return created;
  }

  async deletePageSection(id: number): Promise<boolean> {
    const result = await db.delete(pageSections).where(eq(pageSections.id, id)).returning();
    return result.length > 0;
  }

  async createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const [created] = await db.insert(formSubmissions).values(submission).returning();
    return created;
  }

  async getFormSubmissions(): Promise<FormSubmission[]> {
    return db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    const [sub] = await db.select().from(formSubmissions).where(eq(formSubmissions.id, id));
    return sub;
  }

  async markFormSubmissionRead(id: number, read: boolean): Promise<FormSubmission | undefined> {
    const [updated] = await db.update(formSubmissions).set({ read }).where(eq(formSubmissions.id, id)).returning();
    return updated;
  }

  async deleteFormSubmission(id: number): Promise<boolean> {
    const result = await db.delete(formSubmissions).where(eq(formSubmissions.id, id)).returning();
    return result.length > 0;
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    return db.select().from(blogCategories).orderBy(asc(blogCategories.sortOrder));
  }

  async getBlogCategory(id: number): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.id, id));
    return category;
  }

  async createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const [created] = await db.insert(blogCategories).values(category).returning();
    return created;
  }

  async updateBlogCategory(id: number, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined> {
    const [updated] = await db.update(blogCategories).set(category).where(eq(blogCategories.id, id)).returning();
    return updated;
  }

  async deleteBlogCategory(id: number): Promise<boolean> {
    const result = await db.delete(blogCategories).where(eq(blogCategories.id, id)).returning();
    return result.length > 0;
  }

  async getBlogPosts(options: { status?: "draft" | "published"; categoryId?: number; limit?: number; offset?: number; excludeId?: number }): Promise<{ posts: BlogPost[]; total: number }> {
    const conditions = [];
    if (options.status) conditions.push(eq(blogPosts.status, options.status));
    if (options.categoryId) conditions.push(eq(blogPosts.categoryId, options.categoryId));
    if (options.excludeId) conditions.push(ne(blogPosts.id, options.excludeId));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const [totalResult] = await db.select({ value: count() }).from(blogPosts).where(whereClause);
    const total = totalResult?.value || 0;

    let query = db.select().from(blogPosts).where(whereClause).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

    if (options.limit) query = query.limit(options.limit) as typeof query;
    if (options.offset) query = query.offset(options.offset) as typeof query;

    const posts = await query;
    return { posts, total };
  }

  async getFeaturedPost(): Promise<BlogPost | undefined> {
    const [featured] = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.featured, true), eq(blogPosts.status, "published")));
    if (featured) return featured;
    const [latest] = await db.select().from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt))
      .limit(1);
    return latest;
  }

  async getRelatedPosts(postId: number, categoryId: number | null, limit: number): Promise<BlogPost[]> {
    if (categoryId) {
      const sameCat = await db.select().from(blogPosts)
        .where(and(eq(blogPosts.status, "published"), eq(blogPosts.categoryId, categoryId), ne(blogPosts.id, postId)))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit);
      if (sameCat.length >= limit) return sameCat;
      const needed = limit - sameCat.length;
      const excludeIds = [postId, ...sameCat.map((p) => p.id)];
      const recent = await db.select().from(blogPosts)
        .where(and(eq(blogPosts.status, "published"), ne(blogPosts.id, postId)))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(needed + excludeIds.length);
      const filtered = recent.filter((p) => !excludeIds.includes(p.id)).slice(0, needed);
      return [...sameCat, ...filtered];
    }
    return db.select().from(blogPosts)
      .where(and(eq(blogPosts.status, "published"), ne(blogPosts.id, postId)))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set({ ...post, updatedAt: new Date() }).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async setFeaturedPost(id: number): Promise<BlogPost | undefined> {
    return db.transaction(async (tx) => {
      await tx.update(blogPosts).set({ featured: false }).where(eq(blogPosts.featured, true));
      const [updated] = await tx.update(blogPosts).set({ featured: true }).where(eq(blogPosts.id, id)).returning();
      return updated;
    });
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getAuthors(): Promise<Author[]> {
    return db.select().from(authors).orderBy(asc(authors.sortOrder));
  }

  async getAuthor(id: number): Promise<Author | undefined> {
    const [author] = await db.select().from(authors).where(eq(authors.id, id));
    return author;
  }

  async createAuthor(author: InsertAuthor): Promise<Author> {
    const [created] = await db.insert(authors).values(author).returning();
    return created;
  }

  async updateAuthor(id: number, author: Partial<InsertAuthor>): Promise<Author | undefined> {
    const [updated] = await db.update(authors).set(author).where(eq(authors.id, id)).returning();
    return updated;
  }

  async deleteAuthor(id: number): Promise<boolean> {
    const result = await db.delete(authors).where(eq(authors.id, id)).returning();
    return result.length > 0;
  }

  async getEmailSubscribers(): Promise<EmailSubscriber[]> {
    return db.select().from(emailSubscribers).orderBy(desc(emailSubscribers.createdAt));
  }

  async getActiveEmailSubscribers(): Promise<EmailSubscriber[]> {
    return db.select().from(emailSubscribers)
      .where(eq(emailSubscribers.status, "active"))
      .orderBy(desc(emailSubscribers.createdAt));
  }

  async createEmailSubscriber(email: string, source = "blog"): Promise<EmailSubscriber> {
    const [created] = await db.insert(emailSubscribers).values({ email, source }).returning();
    return created;
  }

  async getEmailSubscriberByToken(token: string): Promise<EmailSubscriber | undefined> {
    const [sub] = await db.select().from(emailSubscribers).where(eq(emailSubscribers.unsubscribeToken, token));
    return sub;
  }

  async unsubscribeByToken(token: string): Promise<boolean> {
    const result = await db.update(emailSubscribers)
      .set({ status: "unsubscribed" })
      .where(eq(emailSubscribers.unsubscribeToken, token))
      .returning();
    return result.length > 0;
  }

  async unsubscribeById(id: number): Promise<boolean> {
    const result = await db.update(emailSubscribers)
      .set({ status: "unsubscribed" })
      .where(eq(emailSubscribers.id, id))
      .returning();
    return result.length > 0;
  }

  async deleteEmailSubscriber(id: number): Promise<boolean> {
    const result = await db.delete(emailSubscribers).where(eq(emailSubscribers.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
