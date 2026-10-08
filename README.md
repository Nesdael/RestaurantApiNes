# Restaurant API · learning project

A restaurant management API built with **NestJS**, **TypeORM** and **PostgreSQL**.

I am rebuilding it **from scratch and on my own**, step by step, to understand
every piece of a real NestJS project: configuration, validation, database,
modules, security and tests. Every file is written by hand and commented with
what I learned.

> 🚧 Work in progress. See [Progress](#progress).

## Tech stack

| Area          | Tool                                          |
| ------------- | --------------------------------------------- |
| Runtime       | Node.js 24, ES Modules (`"type": "module"`)   |
| Framework     | NestJS 12                                     |
| Language      | TypeScript 6                                  |
| Database      | PostgreSQL 16 + TypeORM                       |
| Validation    | class-validator / class-transformer (DTOs)    |
| Env variables | Zod                                           |
| Docs          | Swagger (`@nestjs/swagger`)                   |
| Security      | helmet, CORS                                  |
| Tests         | Vitest + Supertest                            |
| Code quality  | oxlint + Prettier                             |

## Project structure

```
src/
├── main.ts                     Creates the app, applies the setup and starts listening
├── app.module.ts               Root module: config, database and feature modules
├── config/
│   ├── env.config.ts           Groups the .env variables (app, database, jwt, observe)
│   ├── env.validations.schema.ts  Zod schema: the app does not start with a bad .env
│   ├── database.config.ts      TypeORM connection to PostgreSQL
│   ├── app.setup.ts            helmet, CORS, /api/v1 prefix, ValidationPipe, shutdown hooks
│   ├── swagger.config.ts       Swagger docs at /api/docs
│   └── index.ts
└── modules/
    └── tables/                 Restaurant tables (in progress)
        ├── dto/                create, update, update status, filters
        ├── entities/           Table entity
        └── enums/              TableStatus
```

## What I have learned so far

**Configuration**

- `ConfigModule` loads the `.env` and makes it available everywhere with `ConfigService`.
- The `.env` is validated with **Zod** when the app starts. A missing or wrong
  variable stops the app with a clear list of errors.
- `z.coerce.number()` turns the `.env` text into a number before validating it.
- `getOrThrow()` fails loudly when a key does not exist; `get()` returns `undefined`.

**Database**

- `TypeOrmModule.forRootAsync()` waits for the config before connecting.
- `autoLoadEntities`: each module registers its own entities with `forFeature()`.
- `synchronize: false`: schema changes go through **migrations**, never automatically.

**App setup (`app.setup.ts`)**

- `helmet()` adds security headers; CORS allows the frontend origins.
- Every route is served under `/api/v1`.
- Global `ValidationPipe`:
  - `whitelist` removes properties that are not in the DTO,
  - `forbidNonWhitelisted` answers 400 when they are sent,
  - `transform` turns the body and query into DTO instances.
- `enableShutdownHooks()` closes the app cleanly (database connections included)
  on Ctrl+C or `docker stop`.

**DTOs**

- Decorators from class-validator (`@IsInt`, `@IsEnum`...) validate each field.
- `@Type(() => Number)` is needed in **query** DTOs, because everything in the URL
  arrives as text.
- The table `status` is **not** in the create DTO: a new table is always
  `AVAILABLE` (database default), and it changes through its own endpoint.

## Getting started

Requirements: Node.js 24, PostgreSQL 16 (or Docker).

```bash
npm install
cp .env.example .env      # then fill in the values
npm run start:dev
```

- API: `http://localhost:3000/api/v1`
- Swagger: `http://localhost:3000/api/docs`

## Environment variables

| Variable             | Required | Description                         | Example                 |
| -------------------- | -------- | ----------------------------------- | ----------------------- |
| `APP_PORT`           | yes      | Port of the API                     | `3000`                  |
| `APP_NODE`           | yes      | `development`, `test`, `production` | `development`           |
| `CORS_ORIGIN`        | yes      | Allowed origins, comma separated    | `http://localhost:5173` |
| `DB_HOST`            | yes      | PostgreSQL host                     | `localhost`             |
| `DB_PORT`            | yes      | PostgreSQL port                     | `5432`                  |
| `DB_USER`            | yes      | Database user                       | `postgres`              |
| `DB_PASSWORD`        | yes      | Database password                   | `postgres`              |
| `DB_NAME`            | yes      | Database name                       | `restaurant`            |
| `JWT_SECRET`         | yes      | 32+ characters                      | `openssl rand -hex 32`  |
| `JWT_EXPIRES_IN`     | no       | Token lifetime (`15m`, `1h`, `7d`)  | `1h`                    |
| `OBSERVE_APP_KEY`    | no       | NestJS Observe                      |                         |
| `OBSERVE_APP_SECRET` | no       | NestJS Observe                      |                         |
| `OBSERVE_SERVICE_ID` | no       | NestJS Observe                      |                         |

## Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `npm run start:dev`  | Development with hot reload  |
| `npm run build`      | Compile to `dist/`           |
| `npm run lint`       | oxlint                       |
| `npm run format`     | Prettier                     |
| `npm test`           | Unit tests (Vitest)          |
| `npm run test:cov`   | Unit tests with coverage     |
| `npm run test:e2e`   | End-to-end tests             |

## Progress

- [x] Project setup (NestJS 12, ESM, TypeScript 6, Vitest, oxlint, Prettier)
- [x] Environment variables with validation (Zod)
- [x] PostgreSQL connection with TypeORM
- [x] App setup: helmet, CORS, `/api/v1`, ValidationPipe, shutdown hooks
- [x] Swagger
- [ ] Tables module (entity and DTOs done; service and controller next)
- [ ] Migrations (`data-source.ts` and migration scripts)
- [ ] Categories, products and public menu
- [ ] Reservations
- [ ] Users, login with JWT (Passport) and roles
- [ ] Orders
- [ ] Custom decorators (`@Auth()`, `@CurrentUser()`), exception filters, middleware
- [ ] E2E tests and CI with GitHub Actions

## Author

**Nestor Duran** · Backend developer (TypeScript, Node.js, NestJS)