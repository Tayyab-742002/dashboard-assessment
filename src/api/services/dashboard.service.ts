import type {
  ChartDataPoint,
  DashboardStats,
  RecentActivity,
} from "../../types/dashboard.types";
import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>(
      API_ENDPOINTS.DASHBOARD_STATS
    );
    return response.data;
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await apiClient.get<RecentActivity[]>(
      API_ENDPOINTS.RECENT_ACTIVITY
    );
    return response.data;
  },
  getChartData: async (): Promise<ChartDataPoint[]> => {
    const response = await apiClient.get<ChartDataPoint[]>(
      API_ENDPOINTS.CHART_DATA
    );
    return response.data;
  },
};
