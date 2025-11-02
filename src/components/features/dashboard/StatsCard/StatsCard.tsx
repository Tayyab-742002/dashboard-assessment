import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../../../utils/cn";
import Card from "../../../common/Card";
import type { StatsCardProps } from "./StatsCard.types";

const StatsCard = ({
  title,
  value,
  change,
  icon,
  iconColor = "bg-primary-100 text-primary-600",
}: StatsCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>

          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive && (
                <TrendingUp size={16} className="text-green-600" />
              )}
              {isNegative && (
                <TrendingDown size={16} className="text-red-600" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive && "text-green-600",
                  isNegative && "text-red-600",
                  !isPositive && !isNegative && "text-gray-600"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div className={cn("p-3 rounded-lg", iconColor)}>{icon}</div>
      </div>
    </Card>
  );
};

export default StatsCard;
