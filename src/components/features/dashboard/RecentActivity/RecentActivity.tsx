import { Clock, DollarSign, User, Activity } from "lucide-react";
import { formatDateTime, formatCurrency } from "../../../../utils/formatters";
import Card from "../../../common/Card";
import type { RecentActivityProps } from "./RecentActivity.types";

const RecentActivityComponent = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (action: string) => {
    if (action.toLowerCase().includes("purchase")) {
      return <DollarSign size={16} className="text-green-600" />;
    }
    if (action.toLowerCase().includes("profile")) {
      return <User size={16} className="text-blue-600" />;
    }
    return <Activity size={16} className="text-gray-600" />;
  };

  return (
    <Card>
      <Card.Header title="Recent Activity" subtitle="Latest user actions" />
      <Card.Content>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.action)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {activity.action}
                      </p>
                    </div>

                    {activity.amount && (
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(activity.amount)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
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

export default RecentActivityComponent;
