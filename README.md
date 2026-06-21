# Better Auth Service — Self-Hosted Auth API

A production-ready, self-hosted authentication service built with [Better Auth](https://better-auth.com/).

## Features

- **Email & Password** — Sign up, sign in, email verification, password reset
- **Session Management** — Short-lived access tokens + rotating refresh tokens
- **Rate Limiting** — Built-in brute force protection
- **PostgreSQL** — Industry-standard database

### Optional Plugins (add as needed)

| Plugin | Install | What it adds |
|--------|---------|-------------|
| Social Login | `better-auth/plugins` | Google, GitHub, Apple, Discord, 34+ providers |
| 2FA | `better-auth/plugins` | TOTP authenticator codes |
| Magic Link | `better-auth/plugins` | Passwordless email login |
| API Keys | `better-auth/plugins` | Programmatic API key management |
| Organization | `better-auth/plugins` | Teams, roles, multi-tenancy |
| Admin | `better-auth/plugins` | User management admin panel |

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd auth-service
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3005) |
| `BETTER_AUTH_SECRET` | 32+ char random string (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Public URL of your auth service |
| `DATABASE_URL` | PostgreSQL connection string |
| `FRONTEND_URL` | Your frontend app URL (for CORS) |

### 3. Database

Requires PostgreSQL. Create a database and run:

```bash
npx better-auth migrate
```

### 4. Run

```bash
npm run dev    # Development with hot reload
npm run build  # Production build
npm start      # Production start
```

## API Endpoints

All endpoints at `/api/auth/*`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/sign-up/email` | Create account |
| POST | `/api/auth/sign-in/email` | Sign in |
| POST | `/api/auth/sign-out` | Sign out |
| GET | `/api/auth/get-session` | Get current session |
| POST | `/api/auth/request-password-reset` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/verify-email` | Verify email address |
| GET | `/api/auth/ok` | Health check |

## Deployment

Recommended: **Railway** (one-click Node + Postgres deploy)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/...)
