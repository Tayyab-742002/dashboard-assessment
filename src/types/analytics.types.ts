export interface SalesByCategory {
  name: string;
  value: number;
  percentage: number;
}

export interface UserGrowth {
  month: string;
  users: number;
  growth: number;
}

export interface RevenueBreakdown {
  source: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  salesByCategory: SalesByCategory[];
  userGrowth: UserGrowth[];
  revenueBreakdown: RevenueBreakdown[];
}
