import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { ROUTES } from "../utils/constants";
import { ProtectedRoute } from "../components/ProtectedRoute.tsx";
import { lazy, Suspense } from "react";
import Spinner from "../components/common/Spinner/Spinner.tsx";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard.tsx"));
const Users = lazy(() => import("../pages/Users/Users.tsx"));
const Analytics = lazy(() => import("../pages/Analytics/Analytics.tsx"));
const Settings = lazy(() => import("../pages/Settings/Settings.tsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));

const suspense = (node: React.ReactNode) => (
  <Suspense fallback={<Spinner size="lg" label="Loading..." />}>
    {node}
  </Suspense>
);
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.DASHBOARD} replace />,
          },
          {
            path: ROUTES.DASHBOARD,
            element: suspense(<Dashboard />),
          },
          {
            path: ROUTES.USERS,
            element: suspense(<Users />),
          },
          {
            path: ROUTES.ANALYTICS,
            element: suspense(<Analytics />),
          },
          {
            path: ROUTES.SETTINGS,
            element: suspense(<Settings />),
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: suspense(<Login />),
  },
  {
    path: "*",
    element: suspense(<NotFound />),
  },
]);
