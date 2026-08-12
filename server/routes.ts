import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import path from "path";
import express from "express";
import multer from "multer";
import { randomBytes, randomUUID } from "crypto";
import fs from "fs";
import { z } from "zod";
import { insertBlogCategorySchema, insertBlogPostSchema, insertAuthorSchema, insertTeamMemberPortfolioSchema } from "@shared/schema";
import { sendWelcomeEmail, sendNewPostNotification, sendFormNotification } from "./email";

function coerceBlogPostBody(body: Record<string, unknown>): Record<string, unknown> {
  const coerced = { ...body };
  if (typeof coerced.publishedAt === "string") coerced.publishedAt = new Date(coerced.publishedAt as string);
  if (typeof coerced.readingTime === "string") coerced.readingTime = parseInt(coerced.readingTime as string, 10) || 0;
  if (typeof coerced.sortOrder === "string") coerced.sortOrder = parseInt(coerced.sortOrder as string, 10) || 0;
  if (typeof coerced.categoryId === "string") coerced.categoryId = coerced.categoryId ? parseInt(coerced.categoryId as string, 10) : null;
  if (typeof coerced.authorId === "string") coerced.authorId = coerced.authorId ? parseInt(coerced.authorId as string, 10) : null;
  if (typeof coerced.featured === "string") coerced.featured = coerced.featured === "true";
  return coerced;
}

function coerceBlogCategoryBody(body: Record<string, unknown>): Record<string, unknown> {
  const coerced = { ...body };
  if (typeof coerced.sortOrder === "string") coerced.sortOrder = parseInt(coerced.sortOrder as string, 10) || 0;
  return coerced;
}

const PgSession = ConnectPgSimple(session);

const uploadsDir = path.join(process.cwd(), "uploads");
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
} catch (_) {
  // read-only filesystem (e.g. Vercel) — uploads dir not needed since multer uses memoryStorage
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    cb(null, allowed.test(path.extname(file.originalname)));
  },
});

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // A literal fallback here would make admin sessions forgeable from the public
  // repo, so production refuses to boot without a real secret. Development
  // still gets an ephemeral one so `npm run dev` works with no setup.
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production");
  }

  app.use(
    session({
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: sessionSecret || randomBytes(32).toString("hex"),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" },
    })
  );

  app.use("/assets", express.static(path.join(process.cwd(), "attached_assets")));
  app.use("/uploads", express.static(uploadsDir));

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });
    const user = await storage.getUserByUsername(username);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
    (req.session as any).userId = user.id;
    res.json({ user: { id: user.id, username: user.username } });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => res.json({ message: "Logged out" }));
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!(req.session as any)?.userId) return res.status(401).json({ message: "Not authenticated" });
    const user = await storage.getUser((req.session as any).userId);
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    res.json({ user: { id: user.id, username: user.username } });
  });

  app.post("/api/upload", requireAuth, upload.single("file"), async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const base64 = req.file.buffer.toString("base64");
    const image = await storage.saveImageUpload(req.file.originalname, req.file.mimetype, base64);
    res.json({ url: `/api/images/${image.id}` });
  });

  app.get("/api/images/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const image = await storage.getImageUpload(id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    const buffer = Buffer.from(image.data, "base64");
    res.set("Content-Type", image.mimeType);
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  });

  app.get("/api/cms/settings", async (_req: Request, res: Response) => {
    const all = await storage.getAllSettings();
    const settingsMap: Record<string, any> = {};
    for (const s of all) settingsMap[s.key] = s.value;
    res.json(settingsMap);
  });

  app.get("/api/cms/settings/:key", async (req: Request, res: Response) => {
    const value = await storage.getSetting(req.params.key);
    if (value === undefined) return res.status(404).json({ message: "Setting not found" });
    res.json(value);
  });

  app.put("/api/cms/settings/:key", requireAuth, async (req: Request, res: Response) => {
    const result = await storage.upsertSetting(req.params.key, req.body);
    res.json(result);
  });

  app.get("/api/cms/team", async (_req: Request, res: Response) => {
    res.json(await storage.getTeamMembers());
  });

  app.post("/api/cms/team", requireAuth, async (req: Request, res: Response) => {
    res.json(await storage.createTeamMember(req.body));
  });

  app.put("/api/cms/team/:id", requireAuth, async (req: Request, res: Response) => {
    const member = await storage.updateTeamMember(parseInt(req.params.id), req.body);
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  });

  app.delete("/api/cms/team/:id", requireAuth, async (req: Request, res: Response) => {
    const deleted = await storage.deleteTeamMember(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/services", async (_req: Request, res: Response) => {
    res.json(await storage.getServices());
  });

  app.post("/api/cms/services", requireAuth, async (req: Request, res: Response) => {
    res.json(await storage.createService(req.body));
  });

  app.put("/api/cms/services/:id", requireAuth, async (req: Request, res: Response) => {
    const service = await storage.updateService(parseInt(req.params.id), req.body);
    if (!service) return res.status(404).json({ message: "Not found" });
    res.json(service);
  });

  app.delete("/api/cms/services/:id", requireAuth, async (req: Request, res: Response) => {
    const deleted = await storage.deleteService(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/problems", async (_req: Request, res: Response) => {
    res.json(await storage.getProblems());
  });

  app.post("/api/cms/problems", requireAuth, async (req: Request, res: Response) => {
    res.json(await storage.createProblem(req.body));
  });

  app.put("/api/cms/problems/:id", requireAuth, async (req: Request, res: Response) => {
    const problem = await storage.updateProblem(parseInt(req.params.id), req.body);
    if (!problem) return res.status(404).json({ message: "Not found" });
    res.json(problem);
  });

  app.delete("/api/cms/problems/:id", requireAuth, async (req: Request, res: Response) => {
    const deleted = await storage.deleteProblem(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/whatwedo", async (_req: Request, res: Response) => {
    res.json(await storage.getWhatWeDoBlocks());
  });

  app.post("/api/cms/whatwedo", requireAuth, async (req: Request, res: Response) => {
    res.json(await storage.createWhatWeDoBlock(req.body));
  });

  app.put("/api/cms/whatwedo/:id", requireAuth, async (req: Request, res: Response) => {
    const block = await storage.updateWhatWeDoBlock(parseInt(req.params.id), req.body);
    if (!block) return res.status(404).json({ message: "Not found" });
    res.json(block);
  });

  app.delete("/api/cms/whatwedo/:id", requireAuth, async (req: Request, res: Response) => {
    const deleted = await storage.deleteWhatWeDoBlock(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/pages/:pageKey", async (req: Request, res: Response) => {
    res.json(await storage.getPageSections(req.params.pageKey));
  });

  app.put("/api/cms/pages/:pageKey/:sectionKey", requireAuth, async (req: Request, res: Response) => {
    res.json(await storage.upsertPageSection(req.params.pageKey, req.params.sectionKey, req.body));
  });

  const formSubmissionBody = z.object({
    formType: z.enum(["join", "talk", "offer"]),
    data: z.record(z.string(), z.string()).refine((d) => Object.keys(d).length <= 20, { message: "Too many fields" }),
  });

  app.post("/api/forms/submit", async (req: Request, res: Response) => {
    const parsed = formSubmissionBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid submission", errors: parsed.error.flatten() });
    const submission = await storage.createFormSubmission(parsed.data);
    // Fire-and-forget: the submission is already saved, so an email failure
    // must never fail the request or lose the lead.
    void sendFormNotification(parsed.data.formType, parsed.data.data).catch((error) => {
      console.error("[forms] notification failed:", error);
    });
    res.json(submission);
  });

  app.get("/api/cms/submissions", requireAuth, async (_req: Request, res: Response) => {
    res.json(await storage.getFormSubmissions());
  });

  app.put("/api/cms/submissions/:id/read", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const readVal = z.object({ read: z.boolean().optional().default(true) }).safeParse(req.body);
    if (!readVal.success) return res.status(400).json({ message: "Invalid body" });
    const submission = await storage.markFormSubmissionRead(id, readVal.data.read);
    if (!submission) return res.status(404).json({ message: "Not found" });
    res.json(submission);
  });

  app.delete("/api/cms/submissions/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteFormSubmission(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  // Public portfolio summaries — for the /team page (only exposes non-sensitive public fields)
  app.get("/api/portfolios/summaries", async (_req: Request, res: Response) => {
    const all = await storage.getTeamMemberPortfolios();
    res.json(all.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      hero: p.hero,
      stats: p.stats,
      about: p.about,
    })));
  });

  // Team member portfolios — admin list (auth required)
  app.get("/api/cms/portfolios", requireAuth, async (_req: Request, res: Response) => {
    res.json(await storage.getTeamMemberPortfolios());
  });

  // Public single-portfolio fetch by slug (used by /:slug pages)
  app.get("/api/cms/portfolios/:slug", async (req: Request, res: Response) => {
    const portfolio = await storage.getTeamMemberPortfolioBySlug(req.params.slug);
    if (!portfolio) return res.status(404).json({ message: "Not found" });
    res.json(portfolio);
  });

  app.put("/api/cms/portfolios/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const { id: _ignore, ...rest } = req.body || {};
    const parsed = insertTeamMemberPortfolioSchema.partial().safeParse(rest);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid portfolio data", errors: parsed.error.flatten() });
    }
    const updated = await storage.updateTeamMemberPortfolio(id, parsed.data);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });

  function generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function calculateReadingTime(html: string): number {
    const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const wordCount = text.split(" ").filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  // Public blog endpoints
  app.get("/api/blog/categories", async (_req: Request, res: Response) => {
    res.json(await storage.getBlogCategories());
  });

  app.get("/api/blog/authors", async (_req: Request, res: Response) => {
    res.json(await storage.getAuthors());
  });

  app.get("/api/blog/posts", async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 9));
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const offset = (page - 1) * limit;
    const { posts, total } = await storage.getBlogPosts({ status: "published", categoryId, limit, offset });
    res.json({ posts, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) });
  });

  app.get("/api/blog/featured", async (_req: Request, res: Response) => {
    const post = await storage.getFeaturedPost();
    if (!post) return res.status(404).json({ message: "No featured post" });
    res.json(post);
  });

  app.get("/api/blog/posts/:slug/related", async (req: Request, res: Response) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || post.status !== "published") return res.status(404).json({ message: "Post not found" });
    const related = await storage.getRelatedPosts(post.id, post.categoryId, 3);
    res.json(related);
  });

  app.get("/api/blog/posts/:slug", async (req: Request, res: Response) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || post.status !== "published") return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  // Public subscriber endpoints
  const subscribeSchema = z.object({ email: z.string().email(), source: z.string().optional() });

  app.post("/api/subscribers", async (req: Request, res: Response) => {
    const parsed = subscribeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid email address" });
    try {
      const subscriber = await storage.createEmailSubscriber(parsed.data.email, parsed.data.source);
      res.json({ message: "Subscribed successfully", id: subscriber.id });
      // Send welcome email after responding (non-blocking)
      sendWelcomeEmail(subscriber.email, subscriber.unsubscribeToken).catch((err) =>
        console.error("[email] Welcome email error:", err)
      );
    } catch (err: any) {
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "Already subscribed" });
      throw err;
    }
  });

  app.get("/api/subscribers/unsubscribe", async (req: Request, res: Response) => {
    const token = req.query.token as string;
    if (!token) return res.status(400).json({ message: "Token required" });
    const ok = await storage.unsubscribeByToken(token);
    if (!ok) return res.status(404).json({ message: "Subscription not found" });
    res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:4rem;background:#0C0A3E;color:#fff"><h2>You've been unsubscribed.</h2><p>You won't receive further emails from The Story Shapers blog.</p><a href="/" style="color:#a78bfa">← Back to site</a></body></html>`);
  });

  // Admin subscriber endpoints
  app.get("/api/cms/subscribers", requireAuth, async (_req: Request, res: Response) => {
    res.json(await storage.getEmailSubscribers());
  });

  app.put("/api/cms/subscribers/:id/unsubscribe", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const ok = await storage.unsubscribeById(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Unsubscribed" });
  });

  app.delete("/api/cms/subscribers/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const ok = await storage.deleteEmailSubscriber(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/subscribers/export", requireAuth, async (_req: Request, res: Response) => {
    const subs = await storage.getEmailSubscribers();
    const rows = ["email,status,source,created_at"];
    for (const s of subs) rows.push(`${s.email},${s.status},${s.source},${s.createdAt.toISOString()}`);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=subscribers.csv");
    res.send(rows.join("\n"));
  });

  // Admin author endpoints
  app.get("/api/cms/authors", requireAuth, async (_req: Request, res: Response) => {
    res.json(await storage.getAuthors());
  });

  app.post("/api/cms/authors", requireAuth, async (req: Request, res: Response) => {
    try {
      const data = insertAuthorSchema.partial().parse(req.body);
      const slug = data.slug || generateSlug(data.name || "author");
      const author = await storage.createAuthor({ name: data.name || "Author", slug, ...data });
      res.json(author);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "An author with this slug already exists" });
      throw err;
    }
  });

  app.put("/api/cms/authors/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
      const data = insertAuthorSchema.partial().parse(req.body);
      const author = await storage.updateAuthor(id, data);
      if (!author) return res.status(404).json({ message: "Not found" });
      res.json(author);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "An author with this slug already exists" });
      throw err;
    }
  });

  app.delete("/api/cms/authors/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteAuthor(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  // Admin blog endpoints
  app.get("/api/cms/blog/categories", requireAuth, async (_req: Request, res: Response) => {
    res.json(await storage.getBlogCategories());
  });

  app.post("/api/cms/blog/categories", requireAuth, async (req: Request, res: Response) => {
    try {
      const parsed = insertBlogCategorySchema.partial().parse(coerceBlogCategoryBody(req.body));
      const slug = generateSlug(parsed.name || "category");
      const category = await storage.createBlogCategory({ name: parsed.name || "Untitled", slug, description: parsed.description || "", sortOrder: parsed.sortOrder || 0 });
      res.json(category);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "A category with this slug already exists" });
      throw err;
    }
  });

  app.put("/api/cms/blog/categories/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
      const updates = insertBlogCategorySchema.partial().parse(coerceBlogCategoryBody(req.body));
      if (updates.name && !updates.slug) updates.slug = generateSlug(updates.name);
      const category = await storage.updateBlogCategory(id, updates);
      if (!category) return res.status(404).json({ message: "Not found" });
      res.json(category);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "A category with this slug already exists" });
      throw err;
    }
  });

  app.delete("/api/cms/blog/categories/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const { posts } = await storage.getBlogPosts({ categoryId: id, limit: 1, offset: 0 });
    if (posts.length > 0) return res.status(409).json({ message: "Cannot delete category that has posts assigned to it." });
    const deleted = await storage.deleteBlogCategory(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  app.get("/api/cms/blog/posts", requireAuth, async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
    const status = req.query.status as "draft" | "published" | undefined;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const offset = (page - 1) * limit;
    const { posts, total } = await storage.getBlogPosts({ status, categoryId, limit, offset });
    res.json({ posts, total, page, totalPages: Math.max(1, Math.ceil(total / limit)) });
  });

  app.get("/api/cms/blog/posts/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const post = await storage.getBlogPost(id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  });

  app.post("/api/cms/blog/posts", requireAuth, async (req: Request, res: Response) => {
    try {
      const data = insertBlogPostSchema.partial().parse(coerceBlogPostBody(req.body));
      if (!data.slug && data.title) data.slug = generateSlug(data.title);
      data.readingTime = data.content ? calculateReadingTime(data.content) : 1;
      if (data.status === "published" && !data.publishedAt) data.publishedAt = new Date();
      const post = await storage.createBlogPost({ title: data.title || "Untitled", slug: data.slug || `untitled-${Date.now()}`, ...data });
      if (data.featured) await storage.setFeaturedPost(post.id);
      res.json(post);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "A post with this slug already exists" });
      throw err;
    }
  });

  app.put("/api/cms/blog/posts/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
      const data = insertBlogPostSchema.partial().parse(coerceBlogPostBody(req.body));
      if (data.slug !== undefined && !data.slug.trim() && data.title) data.slug = generateSlug(data.title);
      if (data.content !== undefined) data.readingTime = data.content ? calculateReadingTime(data.content) : 1;

      // Capture existing post before update to detect draft→published transition
      const existing = await storage.getBlogPost(id);
      const isPublishing = data.status === "published" && existing?.status !== "published";

      if (data.status === "published") {
        if (existing && !existing.publishedAt && !data.publishedAt) data.publishedAt = new Date();
      }
      if (data.featured === true) {
        await storage.setFeaturedPost(id);
        delete data.featured;
      }
      const post = await storage.updateBlogPost(id, data);
      if (!post) return res.status(404).json({ message: "Not found" });
      res.json(post);

      // Send new post notifications after responding (non-blocking)
      if (isPublishing) {
        storage.getActiveEmailSubscribers().then((subs) => {
          if (subs.length === 0) return;
          return sendNewPostNotification(
            subs.map((s) => ({ email: s.email, unsubscribeToken: s.unsubscribeToken })),
            {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt ?? null,
              authorName: post.authorName,
            }
          );
        }).catch((err) => console.error("[email] New post notification error:", err));
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      if (err?.message?.includes("unique")) return res.status(409).json({ message: "A post with this slug already exists" });
      throw err;
    }
  });

  app.post("/api/cms/blog/posts/:id/feature", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const post = await storage.setFeaturedPost(id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  });

  app.delete("/api/cms/blog/posts/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteBlogPost(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  return httpServer;
}
