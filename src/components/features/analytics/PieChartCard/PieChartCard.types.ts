export interface PieChartData {
  name: string;
  value: number;
  percentage: number;
}

export interface PieChartCardProps {
  title: string;
  subtitle?: string;
  data: PieChartData[];
  className?: string;
}
