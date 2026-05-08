# React + Vite Starter

A production-ready starter with Tailwind CSS v4, Redux Toolkit, RTK Query, Redux Persist, React Router, and React Hot Toast.

## Stack

- **Vite** — fast dev server and build
- **React 18**
- **Tailwind CSS v4** — using the new `@tailwindcss/vite` plugin (no config files needed)
- **Redux Toolkit + RTK Query** — state and data fetching
- **Redux Persist** — persists `auth` slice to localStorage
- **React Router v6** — with protected routes
- **React Hot Toast** — notifications
- **React Hook Form + Zod** — forms with validation
- **Axios** — for non-RTK requests
- **Lucide React** — icons
- **clsx + tailwind-merge** — `cn()` helper for conditional classes

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The dev server runs on http://localhost:5173

## Project Structure

```
src/
├── app/
│   ├── store.js           # Redux store + persist config
│   └── hooks.js           # useAppDispatch / useAppSelector
├── features/
│   └── auth/
│       ├── authSlice.js   # auth state
│       └── authApi.js     # auth endpoints (RTK Query)
├── services/
│   └── api.js             # base RTK Query API
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
├── routes/
│   ├── AppRoutes.jsx      # route definitions
│   └── ProtectedRoute.jsx # auth guard
├── lib/
│   └── utils.js           # cn() helper
├── App.jsx
├── main.jsx
└── index.css
```

## Key Concepts

### Adding a new RTK Query endpoint

Create a feature file (e.g. `src/features/posts/postsApi.js`) and inject endpoints:

```js
import { api } from "../../services/api";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
```

No need to touch `store.js` — endpoints inject automatically.

### Adding a new Redux slice

1. Create `src/features/myFeature/myFeatureSlice.js`
2. Import the reducer in `src/app/store.js` and add it to `combineReducers`
3. To persist it, add the slice key to `persistConfig.whitelist`

### Path alias

Use `@/` instead of relative paths:

```js
import Button from "@/components/ui/Button";
```

### Environment variables

Add to `.env` with `VITE_` prefix:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Access via `import.meta.env.VITE_API_BASE_URL`.

## Notes

- **RTK Query cache is intentionally NOT persisted.** Only `auth` is whitelisted in `persistConfig`. Persisting the cache leads to stale data bugs — let RTK Query refetch on app load.
- **Tailwind v4** doesn't need `tailwind.config.js` or `postcss.config.js`. Theme tokens go in `index.css` via `@theme {}`.
