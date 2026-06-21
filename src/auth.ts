import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Session follows the video's principles:
  // - Short-lived sessions (expire after inactivity)
  // - Automatic rotation when active
  session: {
    expiresIn: 60 * 60 * 24, // 24 hours — session dies after inactivity
    updateAge: 60 * 60,       // 1 hour — refresh if user is active
    freshAge: 60 * 30,        // 30 min — no DB writes during this window
  },
  // Rate limiting — enabled for both dev and prod
  rateLimit: {
    enabled: true,
    window: 60,   // 1 minute window
    max: 100,     // max 100 requests per window
  },
});
