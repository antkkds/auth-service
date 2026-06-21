import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve the dashboard directory — works both in src/ (tsx dev) and dist/ (production)
function resolveDashboardDir(): string {
  // Try src/dashboard first (development via tsx)
  const srcDir = path.resolve(__dirname, "dashboard");
  if (fs.existsSync(srcDir)) return srcDir;

  // Try ../src/dashboard (if running from dist/)
  const distDir = path.resolve(__dirname, "..", "src", "dashboard");
  if (fs.existsSync(distDir)) return distDir;

  // Fallback to src/dashboard relative to project root
  return path.resolve(process.cwd(), "src", "dashboard");
}

export function createDashboardRouter() {
  const dashboardDir = resolveDashboardDir();
  console.log(`📊 Dashboard files served from: ${dashboardDir}`);

  const router = Router();

  // Serve static files (HTML, CSS, JS)
  router.get("/", (_req, res) => {
    res.sendFile(path.join(dashboardDir, "index.html"));
  });

  router.get("/setup", (_req, res) => {
    res.sendFile(path.join(dashboardDir, "setup.html"));
  });

  router.get("/config", (_req, res) => {
    res.sendFile(path.join(dashboardDir, "config.html"));
  });

  router.get("/api", (_req, res) => {
    res.sendFile(path.join(dashboardDir, "api.html"));
  });

  router.get("/styles.css", (_req, res) => {
    res.sendFile(path.join(dashboardDir, "styles.css"));
  });

  // API to expose non-sensitive env info to the dashboard
  router.get("/env", (_req, res) => {
    res.json({
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "not set",
      FRONTEND_URL: process.env.FRONTEND_URL || "not set",
      PORT: process.env.PORT || "3005",
      DATABASE_URL: process.env.DATABASE_URL ? "✅ Connected" : "❌ Not set",
      NODE_ENV: process.env.NODE_ENV || "development",
    });
  });

  return router;
}
