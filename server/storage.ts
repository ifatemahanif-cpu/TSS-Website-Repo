import {
  type User, type InsertUser,
  type SiteSettings, type InsertSiteSettings,
  type TeamMember, type InsertTeamMember,
  type Service, type InsertService,
  type Problem, type InsertProblem,
  type WhatWeDoBlock, type InsertWhatWeDoBlock,
  type PageSection, type InsertPageSection,
  type FormSubmission, type InsertFormSubmission,
  users, siteSettings, teamMembers, services, problems, whatWeDoBlocks, pageSections, formSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, and, desc } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
