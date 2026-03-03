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

  return httpServer;
}
