# kinomi-backend

REST API for **Kinomi** — a platform for people looking for platonic companionship and co-living (shared meals, watching TV together, splitting rent), without a romantic angle.

This repo is the supporting backend for [`kinomi-frontend`](../kinomi-frontend), built as a companion portfolio project. The two repos are kept in sync via an OpenAPI contract, not shared source code — mirroring how a frontend team connects to a separately-owned backend API.

## Tech stack

- **Express + TypeScript** (`strict` mode) — REST API
- **PostgreSQL + Prisma** — database and ORM
- **Docker Compose** — local Postgres instance
- `zod` + `@asteasolutions/zod-to-openapi` (planned) — request validation and OpenAPI generation from a single source of truth
- `jsonwebtoken` + `bcrypt` (planned) — auth

## Getting started

**Prerequisites:** Node.js, Docker Desktop running.

```bash
npm install

# start local Postgres (see docker-compose.yml)
docker compose up -d

# apply the schema and generate the Prisma client
npx prisma migrate dev

# start the dev server (hot-reload on save)
npm run dev
```

The server listens on `http://localhost:4000` by default (`PORT` env var to override).

- `GET /health` — confirms the server is up
- `GET /health/db` — confirms the server can reach Postgres

## Environment variables

Copy `.env` and adjust as needed. Currently used:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string used by Prisma (both the CLI and the running app) |
| `PORT` | Port the Express server listens on (default `4000`) |

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Run the server with hot-reload (`ts-node-dev`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build (`dist/server.js`) |

## Project status

Work in progress — built incrementally as part of interview prep. Currently implemented:

- [x] Express + TypeScript scaffold
- [x] Prisma + PostgreSQL, first migration (`User` model)
- [ ] Auth (signup/login/JWT)
- [ ] Profile CRUD + OpenAPI pipeline
- [ ] Browse/filter, matching, messaging endpoints
- [ ] Tests, CI, deployment
