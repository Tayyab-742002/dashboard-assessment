export const APP_NAME = import.meta.env.VITE_APP_NAME || "Analytics Dashboard";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
  NOT_FOUND: "/404",
} as const;
