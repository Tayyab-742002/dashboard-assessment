import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../../api/services/analytics.service";
import { queryKeys } from "../queryKeys";
import type { AnalyticsData } from "../../types/analytics.types";

export function useAnalyticsData() {
  return useQuery<AnalyticsData>({
    queryKey: queryKeys.analytics.data,
    queryFn: () => analyticsService.getAnalyticsData(),
    staleTime: 60_000,
  });
}
