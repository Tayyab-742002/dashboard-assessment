import Card from "../../../common/Card";
import type { MetricsCardProps } from "./MetricsCard.types";

const MetricsCard = ({ title, metrics }: MetricsCardProps) => {
  return (
    <Card>
      <Card.Header title={title} />
      <Card.Content>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div
                className="w-2 h-12 rounded-full mb-2"
                style={{ backgroundColor: metric.color }}
              />
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default MetricsCard;
