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
  className,
}: StatsCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card hover className={cn("p-3 xl:p-4 min-w-0", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mt-2 truncate leading-tight">
            {value}
          </p>

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
                  !isPositive && !isNegative && "text-muted-foreground"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>

        <div className={cn("p-3 rounded-lg shrink-0", iconColor)}>{icon}</div>
      </div>
    </Card>
  );
};

export default StatsCard;
