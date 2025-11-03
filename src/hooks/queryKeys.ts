export const queryKeys = {
  dashboard: {
    stats: ["dashboard", "stats"] as const,
    activity: ["dashboard", "recent-activity"] as const,
    chart: ["dashboard", "chart-data"] as const,
  },
  users: {
    all: ["users", "list"] as const,
    detail: (id: number | string) => ["users", "detail", id] as const,
    // paginated: (page: number, pageSize: number) =>
    //   ["users", "paginated", { page, pageSize }] as const,
    // search: (term: string) => ["users", "search", term] as const,
  },
  analytics: {
    data: ["analytics", "data"] as const,
  },
};
