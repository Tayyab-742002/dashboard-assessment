import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { AnalyticsData } from "../../types/analytics.types";

export const analyticsService = {
  getAnalyticsData: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get<AnalyticsData>(
      API_ENDPOINTS.ANALYTICS_DATA
    );
    return response.data;
  },
};
