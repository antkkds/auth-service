import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60,       // 1 hour
    freshAge: 60 * 30,        // 30 min
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
});
