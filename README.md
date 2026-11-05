# Volunteers

A small full-stack app: a list of volunteers and their shift dates, with a form to add one.

- **Backend** (`backend/`): Node, TypeScript, Express, Sequelize on Postgres, zod for request validation. Tests use vitest and supertest.
- **Frontend** (`frontend/`): Vite, React, TypeScript, MUI, TanStack Query, axios. Tests use Jest and Testing Library.
- **Database**: Postgres 16 in Docker.

## Prerequisites

- [Node.js 24](https://nodejs.org/) (`nvm use` picks it up from `.nvmrc`)
- [Docker](https://www.docker.com/) with Docker Compose

On Windows, run everything from WSL: the npm scripts use Unix-style environment variables.

## Setup

```sh
cp .env.example .env     # if port 5432 is already taken on your machine, change DB_PORT in .env
docker compose up -d     # starts Postgres and creates the volunteers and volunteers_test databases
npm install              # installs the root, backend and frontend packages
npm run migrate          # creates the tables in both databases
npm run seed             # adds five sample volunteers to the development database
```

## Run

```sh
npm start
```

This starts the backend and the frontend together.

- App: http://localhost:5173
- API: http://localhost:4000/api/volunteers

The Vite dev server proxies `/api` to the backend, so the frontend calls `/api/...` directly.

## Test

```sh
npm test            # backend tests (against the volunteers_test database), then frontend tests
npm run typecheck   # tsc --noEmit for the backend and the frontend
```

## API

| Method | Path              | Body                                                       |
| ------ | ----------------- | ---------------------------------------------------------- |
| GET    | `/api/volunteers` |                                                            |
| POST   | `/api/volunteers` | `{ "name": "...", "email": "...", "shiftDate": "YYYY-MM-DD" }` |

## Layout

```
backend/
  src/
    index.ts                 starts the server
    app.ts                   the Express app
    db.ts                    the Sequelize connection
    models/volunteer.ts
    routes/volunteers.ts     the routes, and their tests beside them
    database/
      config.cjs             database settings (reads the root .env)
      migrations/
      seeders/
frontend/
  src/
    main.tsx                 React root and providers
    App.tsx                  routes
    api.ts                   axios client and API calls
    VolunteersPage.tsx       the page, and its test beside it
    AddVolunteerForm.tsx
```

## Resetting the database

```sh
docker compose down -v   # stops Postgres and deletes its data
docker compose up -d
npm run migrate
npm run seed
```
