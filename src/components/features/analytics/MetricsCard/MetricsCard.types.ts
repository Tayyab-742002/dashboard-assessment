export interface MetricItem {
  label: string;
  value: string;
  color: string;
}

export interface MetricsCardProps {
  title: string;
  metrics: MetricItem[];
  className?: string;
}
