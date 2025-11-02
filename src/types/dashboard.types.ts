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
