import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { createDashboardRouter } from "./dashboard-router.js";

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: frontendUrl, credentials: true, methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

// Admin dashboard
app.use("/dashboard", createDashboardRouter());

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", service: "auth-service", version: "1.0.0" }));

app.listen(port, "0.0.0.0", () => {
  console.log(`🔐 Auth service running at http://localhost:${port}`);
  console.log(`   📊 Dashboard at http://localhost:${port}/dashboard/`);
  console.log(`   🔌 API at http://localhost:${port}/api/auth/`);
});
