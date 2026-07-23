# kinomi-backend

REST API for **Kinomi** — a platform for people looking for platonic companionship and co-living (shared meals, watching TV together, splitting rent), without a romantic angle.

This repo is the supporting backend for [`kinomi-frontend`](../kinomi-frontend), built as a companion portfolio project. The two repos are kept in sync via an OpenAPI contract, not shared source code — mirroring how a frontend team connects to a separately-owned backend API.

## Tech stack

- **Express + TypeScript** (`strict` mode) — REST API
- **PostgreSQL + Prisma** — database and ORM
- **Docker Compose** — local Postgres instance
- `zod` + `@asteasolutions/zod-to-openapi` — request validation and OpenAPI generation from a single source of truth
- `swagger-ui-express` — interactive API docs at `/api/docs`, generated from the same schemas that validate requests
- `jsonwebtoken` + `bcrypt` — JWT auth (short-lived access token + `httpOnly` refresh cookie)

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
- `GET /api/docs` — interactive API documentation (Swagger UI)
- `GET /api/openapi.json` — the raw OpenAPI contract, consumed by `kinomi-frontend`'s codegen script

## Environment variables

Copy `.env` and adjust as needed. Currently used:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string used by Prisma (both the CLI and the running app) |
| `PORT` | Port the Express server listens on (default `4000`) |
| `JWT_SECRET` | Signs/verifies short-lived access tokens |
| `JWT_REFRESH_SECRET` | Signs/verifies the longer-lived refresh token (stored in an `httpOnly` cookie) |

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
- [x] Auth (signup/login/JWT, `requireAuth` middleware)
- [x] Profile CRUD + OpenAPI pipeline (`/api/docs`)
- [ ] Browse/filter, matching, messaging endpoints
- [ ] Tests, CI, deployment


my notes, will be deleted later:
The project follows a layered architecture. Routes define endpoints, middleware handles cross-cutting concerns like validation and authentication, controllers handle HTTP-specific logic, services contain the business logic, and Prisma is the data access layer.
