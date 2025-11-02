export interface BarChartData {
  month: string;
  users: number;
  growth: number;
}

export interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: BarChartData[];
  className?: string;
}
