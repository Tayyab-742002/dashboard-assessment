import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../api/services/dashboard.service";
import { queryKeys } from "../queryKeys";
import type {
  DashboardStats,
  RecentActivity,
  ChartDataPoint,
} from "../../types/dashboard.types";

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: queryKeys.dashboard.stats,
    queryFn: () => dashboardService.getStats(),
    staleTime: 60_000,
  });
}

export function useRecentActivity() {
  return useQuery<RecentActivity[]>({
    queryKey: queryKeys.dashboard.activity,
    queryFn: () => dashboardService.getRecentActivity(),
    staleTime: 60_000,
  });
}

export function useChartData() {
  return useQuery<ChartDataPoint[]>({
    queryKey: queryKeys.dashboard.chart,
    queryFn: () => dashboardService.getChartData(),
    staleTime: 60_000,
  });
}
