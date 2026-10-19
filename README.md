# PAWHOME — Pet Adoption Frontend

PAWHOME is a React single-page application for browsing pets and viewing adopters and adoption requests. The frontend uses React Router for navigation, TanStack Query for data loading, Zustand for session and UI state, and Tailwind CSS for styling.

## Features

- Home and login pages
- Protected pet list, pet detail, adopter, and adoption request pages
- Search and compact view on the pet list
- Adoption request submission
- Optional built-in mock data for development or demos; no `db.json` or JSON Server is required

The login is currently mock authentication: any non-empty username and password will sign in. It does not authenticate against the backend.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- The Cacao backend running locally, or a deployed backend URL

## Local development

```bash
npm install
npm run dev
```

By default, Vite proxies `/api` requests to `http://127.0.0.1:4000`. Start the backend separately on port 4000 to use MongoDB data.

To run the frontend with sample data instead, create `.env.local` in the project root:

```env
VITE_USE_MOCK_DATA=true
```

Restart the Vite dev server after changing environment variables. Mock adoption requests are saved in the current browser's local storage; they are not sent to MongoDB or shared with other browsers.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides.

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_API_URL` | Backend origin, with no `/api` suffix. Leave blank locally to use the Vite proxy. | blank |
| `VITE_USE_MOCK_DATA` | Set to `true` to use the bundled sample pets, adopters, and requests instead of the API. | `false` |

For Vercel, set `VITE_API_URL` to the deployed backend origin and `VITE_USE_MOCK_DATA` to `false` to use the API. Set `VITE_USE_MOCK_DATA` to `true` only when intentionally demonstrating sample data. Vite embeds these values during the build, so redeploy after changing them.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and build the production frontend. |
| `npm run lint` | Run ESLint. |
| `npm run preview` | Serve the production build locally. |

## Deployment

Import this repository into Vercel as a Vite project. Use `npm run build` as the build command and `dist` as the output directory. Set the required Vite environment variables in the Vercel project and redeploy after changing them.
