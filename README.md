# PAWHOME — Pet Adoption Frontend

PAWHOME is a React and TypeScript web app for browsing pets, viewing adopters, and managing adoption requests.

## Live frontend

- Frontend: https://itelect4-project-cacao-it-4-b.vercel.app/

## Live backend

- Backend website/API root: https://itelect4-backend-cacao.vercel.app/
- Health check: https://itelect4-backend-cacao.vercel.app/api/health
- Pets: https://itelect4-backend-cacao.vercel.app/api/pets
- Adopters: https://itelect4-backend-cacao.vercel.app/api/adopters
- Adoption requests: https://itelect4-backend-cacao.vercel.app/api/requests

The API root may show a small status message. Use the `/api/...` endpoints to access data.

## Current frontend data behavior

The current frontend pages use built-in sample data from `src/data/mockData.ts`. They do not yet fetch their pets, adopters, or requests from the deployed backend. The API links above let you check the backend separately.

## Features

- Home, login, pets, pet details, adopters, and adoption requests pages
- Protected routes for the app pages
- Sample login for demonstration; the login page accepts mock credentials
- Vite development server and production build

## Requirements

- Node.js 20 or later
- npm

## Run locally

From the frontend repository root:

```bash
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Available scripts

```bash
npm run dev      # Start the local Vite server
npm run build    # Type-check and build the production site
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
npm run api      # Run the local JSON Server using db.json on port 3001
```

## Deploy to Vercel

Import the frontend GitHub repository as a separate Vercel project. The project root should be the folder containing this `package.json`; select the Vite preset if Vercel does not detect it automatically.

The build command is `npm run build`, and the output directory is `dist`. Redeploy after pushing frontend changes.

## Project structure

- `src/pages/` — application pages
- `src/components/` — shared UI and layout components
- `src/data/mockData.ts` — sample frontend data
- `src/store/` — authentication and request state
- `db.json` — local JSON Server data file

Do not commit passwords, database connection strings, or other secrets.
