import Card from "../../../common/Card";
import type { MetricsCardProps } from "./MetricsCard.types";

const MetricsCard = ({ title, metrics, className = "" }: MetricsCardProps) => {
  return (
    <Card className={className}>
      <Card.Header title={title} />
      <Card.Content>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 rounded-lg border border-primary/30 hover:scale-101 shadow-2xl transition-all duration-300"
            >
              <div
                className="w-2 h-12 rounded-full mb-2"
                style={{ backgroundColor: metric.color }}
              />
              <p className="text-sm text-muted-foreground mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default MetricsCard;
