// Load .env before any other imports
import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { createDashboardRouter } from "./dashboard-router.js";

const app = express();
const port = parseInt(process.env.PORT || "3005", 10);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// CORS — allow your frontend to connect
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Mount Better Auth BEFORE express.json()
// Express v5 uses *splat for catch-all routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Regular JSON middleware for other routes
app.use(express.json());

// Dashboard UI — available at /dashboard/
app.use("/dashboard", createDashboardRouter());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "auth-service", version: "1.0.0" });
});

app.listen(port, () => {
  console.log(`🔐 Auth service running at http://localhost:${port}`);
  console.log(`   📊 Dashboard at http://localhost:${port}/dashboard/`);
  console.log(`   🔌 Auth API at http://localhost:${port}/api/auth/ok`);
});
