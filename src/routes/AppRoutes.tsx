import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Users from "../pages/Users/Users.tsx";
import Analytics from "../pages/Analytics/Analytics.tsx";
import Settings from "../pages/Settings/Settings.tsx";
import NotFound from "../pages/NotFound/NotFound.tsx";
import { ROUTES } from "../utils/constants";
import Login from "../pages/Login/Login.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute.tsx";

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
            element: <Dashboard />,
          },
          {
            path: ROUTES.USERS,
            element: <Users />,
          },
          {
            path: ROUTES.ANALYTICS,
            element: <Analytics />,
          },
          {
            path: ROUTES.SETTINGS,
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
