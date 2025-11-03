import { Clock, DollarSign, User, Activity } from "lucide-react";
import { formatDateTime, formatCurrency } from "../../../../utils/formatters";
import Card from "../../../common/Card";
import type { RecentActivityProps } from "./RecentActivity.types";
import { cn } from "../../../../utils/cn";
import { memo } from "react";
const RecentActivityComponent = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (action: string) => {
    if (action.toLowerCase().includes("purchase")) {
      return <DollarSign size={16} />;
    }
    if (action.toLowerCase().includes("profile")) {
      return <User size={16} />;
    }
    return <Activity size={16} />;
  };
  const getActivityBgColor = (action: string) => {
    if (action.toLowerCase().includes("purchase")) {
      return "bg-green-600";
    }
    if (action.toLowerCase().includes("profile")) {
      return "bg-blue-400";
    }
    return "bg-gray-400 border border-gray-500";
  };
  const getActivityIconColor = (action: string) => {
    if (action.toLowerCase().includes("purchase")) {
      return "text-green-500 bg-green-700";
    }
    if (action.toLowerCase().includes("profile")) {
      return "text-blue-400 bg-blue-600 ";
    }
    return "text-gray-400 bg-gray-600 ";
  };
  return (
    <Card>
      <Card.Header title="Recent Activity" subtitle="Latest user actions" />
      <Card.Content>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No recent activity
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start bg-primary text-white gap-3 p-3 rounded-lg hover:scale-101 transition-all duration-300",
                  getActivityBgColor(activity.action)
                )}
              >
                <div
                  className={cn(
                    "shrink-0 p-2 rounded-lg",
                    getActivityIconColor(activity.action)
                  )}
                >
                  {getActivityIcon(activity.action)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {activity.user}
                      </p>
                      <p className="text-sm text-neutral-700 mt-0.5 truncate">
                        {activity.action}
                      </p>
                    </div>

                    {activity.amount && (
                      <span className="text-sm font-semibold text-green-800 shrink-0 ml-2">
                        {formatCurrency(activity.amount)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-neutral-600">
                    <Clock size={12} />
                    {formatDateTime(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default memo(RecentActivityComponent);
