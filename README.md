Dashboard Assessment – React + TypeScript + Tailwind + Mock API

Overview
This project is a responsive admin dashboard built with React, TypeScript, Tailwind CSS, TanStack Query, and a JSON Server–powered mock API. It demonstrates client‑side data patterns (caching, invalidation, optimistic mutations), a modular UI component system, protected routing, and a clean path to migrate from mock APIs to a real backend.

Tech Stack

- React + TypeScript: Functional components.
- Vite: Fast dev server.
- Tailwind CSS: Utility-first styling for consistent, responsive UI.
- TanStack Query: Server state management with caching, retries, and mutations.
- Zustand: Lightweight client state (auth).
- Recharts: Composable charts for dashboard visualizations.
- json-server: Rapid mock API with custom routes and auth simulation.

Architecture

- App shell: RouterProvider with protected routes.
- State
  - Server state: Query hooks in `src/hooks/queries/*` and mutations in `src/hooks/mutations/*` (fetching via `src/api/services/*`).
  - Client state: `src/store/*` (auth).
- UI components: `src/components/common/*` (Card, Button, Table, Modal, Spinner) and feature components under `src/components/features/*`.
- Routing: `src/routes/AppRoutes.tsx` with `ProtectedRoute` guarding private screens (dashboard).
- Mock API: `mock-api/server.js` serves `mock-api/db.json` at `/api/*`, with custom auth and protected routes.

Project Structure (selected)

```
dashboard-assessment/
├─ README.md
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ eslint.config.js
├─ index.html
├─ public/
│  └─ vite.svg
├─ mock-api/
│  ├─ db.json
│  └─ server.js
├─ scripts/
│  └─ create-admin.js
├─ req.http
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ index.css
│  ├─ assets/
│  │  ├─ react.svg
│  │  ├─ images/
│  │  │  └─ logo.png
│  │  └─ Icons/   (icon assets if any)
│  ├─ api/
│  │  ├─ client.ts
│  │  ├─ endpoints.ts
│  │  └─ services/
│  │     ├─ analytics.service.ts
│  │     ├─ auth.service.ts
│  │     ├─ dashboard.service.ts
│  │     └─ user.service.ts
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ ErrorBoundary.tsx
│  │  │  ├─ Badge/
│  │  │  │  ├─ Badge.tsx
│  │  │  │  ├─ Badge.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Button/
│  │  │  │  ├─ Button.tsx
│  │  │  │  ├─ Button.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Card/
│  │  │  │  ├─ Card.tsx
│  │  │  │  ├─ Card.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Input/
│  │  │  │  ├─ Input.tsx
│  │  │  │  ├─ Input.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Modal/
│  │  │  │  ├─ Modal.tsx
│  │  │  │  ├─ Modal.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Spinner/
│  │  │  │  ├─ Spinner.tsx
│  │  │  │  ├─ Spinner.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Table/
│  │  │  │  ├─ Table.tsx
│  │  │  │  ├─ Table.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ Tabs/
│  │  │  │  ├─ Tabs.tsx
│  │  │  │  ├─ Tabs.types.ts
│  │  │  │  └─ index.ts
│  │  │  └─ Toggle/
│  │  │     ├─ Toggle.tsx
│  │  │     ├─ Toggle.types.ts
│  │  │     └─ index.ts
│  │  ├─ features/
│  │  │  ├─ analytics/
│  │  │  │  ├─ BarChartCard/
│  │  │  │  │  ├─ BarChartCard.tsx
│  │  │  │  │  ├─ BarChartCard.types.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ MetricsCard/
│  │  │  │  │  ├─ MetricsCard.tsx
│  │  │  │  │  ├─ MetricsCard.types.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ PieChartCard/
│  │  │  │     ├─ PieChartCard.tsx
│  │  │  │     ├─ PieChartCard.types.ts
│  │  │  │     └─ index.ts
│  │  │  ├─ dashboard/
│  │  │  │  ├─ RecentActivity/
│  │  │  │  │  ├─ RecentActivity.tsx
│  │  │  │  │  ├─ RecentActivity.types.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ RevenueChart/
│  │  │  │  │  ├─ RevenueChart.tsx
│  │  │  │  │  ├─ RevenueChart.types.ts
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ StatsCard/
│  │  │  │     ├─ StatsCard.tsx
│  │  │  │     ├─ StatsCard.types.ts
│  │  │  │     └─ index.ts
│  │  │  ├─ login/
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  ├─ LoginForm.types.ts
│  │  │  │  └─ index.ts
│  │  │  └─ users/
│  │  │     └─ UserForm/
│  │  │        ├─ UserForm.tsx
│  │  │        └─ UserForm.types.ts
│  │  ├─ layout/
│  │  │  ├─ Header/
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ Header.types.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ MainLayout/
│  │  │  │  ├─ MainLayout.tsx
│  │  │  │  └─ index.ts
│  │  │  └─ Sidebar/
│  │  │     ├─ Sidebar.tsx
│  │  │     └─ index.ts
│  │  └─ ProtectedRoute.tsx
│  ├─ hooks/
│  │  ├─ useDebounce.ts
│  │  ├─ queries/
│  │  │  ├─ useDashboard.ts
│  │  │  ├─ useAnalytics.ts
│  │  │  └─ useUsers.ts
│  │  ├─ mutations/
│  │  │  └─ useUserMutations.ts
│  │  ├─ queryKeys.ts
│  │  └─ useFetch.ts   (legacy; replaced by query hooks)
│  ├─ config/
│  │  └─ queryClient.ts
│  ├─ pages/
│  │  ├─ Dashboard/
│  │  │  └─ Dashboard.tsx
│  │  ├─ Analytics/
│  │  │  └─ Analytics.tsx
│  │  ├─ Users/
│  │  │  └─ Users.tsx
│  │  ├─ Settings/
│  │  │  └─ Settings.tsx
│  │  ├─ Login/
│  │  │  └─ Login.tsx
│  │  └─ NotFound/
│  │     └─ NotFound.tsx
│  ├─ routes/
│  │  └─ AppRoutes.tsx
│  ├─ store/
│  │  ├─ useAuthStore.ts
│  │  └─ usePreferencesStore.ts
│  ├─ types/
│  │  ├─ analytics.types.ts
│  │  ├─ api.types.ts
│  │  ├─ common.types.ts
│  │  ├─ dashboard.types.ts
│  │  └─ user.types.ts
│  └─ utils/
│     ├─ cn.ts
│     ├─ constants.ts
│     └─ formatters.ts
```

Setup
Prerequisites

- Node.js
- npm

Install

```bash
npm install
```

Environment
Create `.env` at the repo root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Analytics Dashboard
JWT_SECRET=jwt-secret
```

Scripts

```bash
# start frontend
npm run dev

# start mock API server (json-server)
npm run api

# build
npm run build

# preview production build
npm run preview
```

Mock API Documentation
Base URL

- `http://localhost:3000/api`

Authentication

- POST `/auth/login`
- Auth middleware (server‑side) protects all non‑auth routes by verifying the token from either `Authorization: Bearer <token>` or cookie `token`.

Core Endpoints

- GET `/api/dashboardStats` → `{ totalRevenue, subscriptions, sales, activeUsers }`
- GET `/api/recentActivity` → `RecentActivity[]`
- GET `/api/chartData` → `ChartDataPoint[]`
- GET `/api/analyticsData` → analytics dataset for charts
- Users
  - GET `/api/users` → `User[]`
  - GET `/api/users/:id` → `User`
  - POST `/api/users` → create user
  - PUT `/api/users/:id` → update user
  - DELETE `/api/users/:id` → delete user

Notes

Client Data Layer
Location of hooks

- Queries: `src/hooks/queries/*` (`useDashboard.ts`, `useAnalytics.ts`, `useUsers.ts`).
- Mutations: `src/hooks/mutations/*` (`useUserMutations.ts`).

Performance and UX

- Route‑based code splitting with `lazy` + `Suspense` for pages and heavy chart cards.
- Memoization:
  - `React.memo` for presentational components (Card, Spinner, StatsCard, charts, RecentActivity).
  - `useMemo` for derived arrays/metrics and chart series.
- Images: `loading="lazy"`.

Author
Muhammad Tayyab – Portfolio: https://eviorcode.online
