import type { BaseEntity } from "./commmon.types";

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface RecentActivity extends BaseEntity {
  user: string;
  action: string;
  timestamp: string;
  amount?: number;
}

export interface DashboardStats extends BaseEntity {
  totalRevenue: number;
  subscriptions: number;
  sales: number;
  activeUsers: number;
}
