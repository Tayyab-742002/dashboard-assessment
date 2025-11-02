export const API_ENDPOINTS: Record<string, string> = {
  DASHBOARD_STATS: "/dashboardStats",
  RECENT_ACTIVITY: "/recentActivity",
  CHART_DATA: "/chartData",
  USERS: "/users",
  USER: "/users/:id",
  CREATE_USER: "/users",
  UPDATE_USER: "/users/:id",
  DELETE_USER: "/users/:id",
} as const;
