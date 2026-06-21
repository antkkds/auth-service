import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Security settings (matches the best practices from the video)
  session: {
    expiresIn: 60 * 15, // 15 minutes (access token)
    updateAge: 60 * 60 * 24 * 7, // Refresh every 7 days
    freshAge: 60 * 5, // Fresh session age: 5 minutes
  },
  // Rate limiting to prevent brute force
  rateLimit: {
    window: 60, // 1 minute window
    max: 10, // max 10 requests per window
  },
});
