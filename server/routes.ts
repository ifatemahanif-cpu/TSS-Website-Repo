import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import path from "path";
import express from "express";
import multer from "multer";
import { randomUUID } from "crypto";
import fs from "fs";
import { z } from "zod";
import { insertBlogCategorySchema, insertBlogPostSchema } from "@shared/schema";

function coerceBlogPostBody(body: Record<string, unknown>): Record<string, unknown> {
  const coerced = { ...body };
  if (typeof coerced.publishedAt === "string") {
    coerced.publishedAt = new Date(coerced.publishedAt as string);
  }
  if (typeof coerced.readingTime === "string") {
    coerced.readingTime = parseInt(coerced.readingTime as string, 10) || 0;
  }
  if (typeof coerced.sortOrder === "string") {
    coerced.sortOrder = parseInt(coerced.sortOrder as string, 10) || 0;
  }
  if (typeof coerced.categoryId === "string") {
    coerced.categoryId = coerced.categoryId ? parseInt(coerced.categoryId as string, 10) : null;
  }
  return coerced;
}

function coerceBlogCategoryBody(body: Record<string, unknown>): Record<string, unknown> {
  const coerced = { ...body };
  if (typeof coerced.sortOrder === "string") {
    coerced.sortOrder = parseInt(coerced.sortOrder as string, 10) || 0;
  }
  return coerced;
}

const PgSession = ConnectPgSimple(session);

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(
    session({
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "story-shapers-cms-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  app.use("/assets", express.static(path.join(process.cwd(), "attached_assets")));
  app.use("/uploads", express.static(uploadsDir));

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    (req.session as any).userId = user.id;
    res.json({ user: { id: user.id, username: user.username } });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!(req.session as any)?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser((req.session as any).userId);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ user: { id: user.id, username: user.username } });
  });

  app.post("/api/upload", requireAuth, upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  app.get("/api/cms/settings", async (_req: Request, res: Response) => {
    const all = await storage.getAllSettings();
    const settingsMap: Record<string, any> = {};
    for (const s of all) {
      settingsMap[s.key] = s.value;
    }
    res.json(settingsMap);
  });

  app.get("/api/cms/settings/:key", async (req: Request, res: Response) => {
    const value = await storage.getSetting(req.params.key);
    if (value === undefined) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.json(value);
  });

  app.put("/api/cms/settings/:key", requireAuth, async (req: Request, res: Response) => {
    const result = await storage.upsertSetting(req.params.key, req.body);
    res.json(result);
  });

  app.get("/api/cms/team", async (_req: Request, res: Response) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.post("/api/cms/team", requireAuth, async (req: Request, res: Response) => {
    const member = await storage.createTeamMember(req.body);
    res.json(member);
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
    const all = await storage.getServices();
    res.json(all);
  });

  app.post("/api/cms/services", requireAuth, async (req: Request, res: Response) => {
    const service = await storage.createService(req.body);
    res.json(service);
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
    const all = await storage.getProblems();
    res.json(all);
  });

  app.post("/api/cms/problems", requireAuth, async (req: Request, res: Response) => {
    const problem = await storage.createProblem(req.body);
    res.json(problem);
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
    const all = await storage.getWhatWeDoBlocks();
    res.json(all);
  });

  app.post("/api/cms/whatwedo", requireAuth, async (req: Request, res: Response) => {
    const block = await storage.createWhatWeDoBlock(req.body);
    res.json(block);
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
    const sections = await storage.getPageSections(req.params.pageKey);
    res.json(sections);
  });

  app.put("/api/cms/pages/:pageKey/:sectionKey", requireAuth, async (req: Request, res: Response) => {
    const section = await storage.upsertPageSection(req.params.pageKey, req.params.sectionKey, req.body);
    res.json(section);
  });

  const formSubmissionBody = z.object({
    formType: z.enum(["join", "talk"]),
    data: z.record(z.string(), z.string()).refine(
      (d) => Object.keys(d).length <= 20,
      { message: "Too many fields" }
    ),
  });

  app.post("/api/forms/submit", async (req: Request, res: Response) => {
    const parsed = formSubmissionBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid submission", errors: parsed.error.flatten() });
    }
    const submission = await storage.createFormSubmission(parsed.data);
    res.json(submission);
  });

  app.get("/api/cms/submissions", requireAuth, async (_req: Request, res: Response) => {
    const submissions = await storage.getFormSubmissions();
    res.json(submissions);
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

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function calculateReadingTime(html: string): number {
    const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const wordCount = text.split(" ").filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  app.get("/api/blog/categories", async (_req: Request, res: Response) => {
    const categories = await storage.getBlogCategories();
    res.json(categories);
  });

  app.get("/api/blog/posts", async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 9));
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const offset = (page - 1) * limit;

    const { posts, total } = await storage.getBlogPosts({
      status: "published",
      categoryId,
      limit,
      offset,
    });

    res.json({
      posts,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  });

  app.get("/api/blog/posts/:slug", async (req: Request, res: Response) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || post.status !== "published") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.get("/api/cms/blog/categories", requireAuth, async (_req: Request, res: Response) => {
    const categories = await storage.getBlogCategories();
    res.json(categories);
  });

  app.post("/api/cms/blog/categories", requireAuth, async (req: Request, res: Response) => {
    try {
      const parsed = insertBlogCategorySchema.partial().parse(coerceBlogCategoryBody(req.body));
      const slug = generateSlug(parsed.name || "category");
      const category = await storage.createBlogCategory({
        name: parsed.name || "Untitled",
        slug,
        description: parsed.description || "",
        sortOrder: parsed.sortOrder || 0,
      });
      res.json(category);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: err.errors });
      }
      if (err instanceof Error && err.message?.includes("unique")) {
        return res.status(409).json({ message: "A category with this slug already exists" });
      }
      throw err;
    }
  });

  app.put("/api/cms/blog/categories/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
      const updates = insertBlogCategorySchema.partial().parse(coerceBlogCategoryBody(req.body));
      if (updates.name && !updates.slug) {
        updates.slug = generateSlug(updates.name);
      }
      const category = await storage.updateBlogCategory(id, updates);
      if (!category) return res.status(404).json({ message: "Not found" });
      res.json(category);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: err.errors });
      }
      if (err instanceof Error && err.message?.includes("unique")) {
        return res.status(409).json({ message: "A category with this slug already exists" });
      }
      throw err;
    }
  });

  app.delete("/api/cms/blog/categories/:id", requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const { posts } = await storage.getBlogPosts({ categoryId: id, limit: 1, offset: 0 });
    if (posts.length > 0) {
      return res.status(409).json({ message: "Cannot delete category that has posts assigned to it. Reassign or delete those posts first." });
    }
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
      if (!data.slug && data.title) {
        data.slug = generateSlug(data.title);
      }
      data.readingTime = data.content ? calculateReadingTime(data.content) : 1;
      if (data.status === "published" && !data.publishedAt) {
        data.publishedAt = new Date();
      }
      const post = await storage.createBlogPost({
        title: data.title || "Untitled",
        slug: data.slug || `untitled-${Date.now()}`,
        ...data,
      });
      res.json(post);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: err.errors });
      }
      if (err instanceof Error && err.message?.includes("unique")) {
        return res.status(409).json({ message: "A post with this slug already exists" });
      }
      throw err;
    }
  });

  app.put("/api/cms/blog/posts/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
      const data = insertBlogPostSchema.partial().parse(coerceBlogPostBody(req.body));
      if (data.slug !== undefined && !data.slug.trim() && data.title) {
        data.slug = generateSlug(data.title);
      }
      if (data.content !== undefined) {
        data.readingTime = data.content ? calculateReadingTime(data.content) : 1;
      }
      if (data.status === "published") {
        const existing = await storage.getBlogPost(id);
        if (existing && !existing.publishedAt && !data.publishedAt) {
          data.publishedAt = new Date();
        }
      }
      const post = await storage.updateBlogPost(id, data);
      if (!post) return res.status(404).json({ message: "Not found" });
      res.json(post);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: err.errors });
      }
      if (err instanceof Error && err.message?.includes("unique")) {
        return res.status(409).json({ message: "A post with this slug already exists" });
      }
      throw err;
    }
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
