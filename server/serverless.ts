import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { runMigrations } from "./migrate";
import { seedDatabase } from "./seed";
import { seedPortfolios } from "./seedPortfolios";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.set("trust proxy", 1);

app.use(
  express.json({
    limit: "10mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

const initPromise = (async () => {
  try {
    await runMigrations();
  } catch (e) {
    console.error("Migration error:", e);
  }
  try {
    await seedDatabase();
  } catch (e) {
    console.error("Seed error:", e);
  }
  try {
    await seedPortfolios();
  } catch (e) {
    console.error("Portfolio seed error:", e);
  }

  const httpServer = createServer(app);
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });
})();

export default async function handler(req: any, res: any) {
  await initPromise;
  return app(req, res);
}
