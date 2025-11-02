import {
  DollarSign,
  Users as UsersIcon,
  ShoppingCart,
  Activity,
} from "lucide-react";

import StatsCard from "../../components/features/dashboard/StatsCard";
import RevenueChart from "../../components/features/dashboard/RevenueChart";
import RecentActivity from "../../components/features/dashboard/RecentActivity";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import { useFetch } from "../../hooks/useFetch";
import { dashboardService } from "../../api/services/dashboard.service";
import Spinner from "../../components/common/Spinner";

const Dashboard = () => {
  // fetching dashboard stats

  const { data: stats, loading: statsLoading } = useFetch(
    () => dashboardService.getStats(),
    []
  );

  // fetching recent activity

  const { data: recentActivity, loading: recentActivityLoading } = useFetch(
    () => dashboardService.getRecentActivity(),
    []
  );

  // fetching chart data
  const { data: chartData, loading: chartDataLoading } = useFetch(
    () => dashboardService.getChartData(),
    []
  );
  if (statsLoading || recentActivityLoading || chartDataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={stats ? formatCurrency(stats.totalRevenue) : "$0"}
          change={12.5}
          icon={<DollarSign size={24} />}
          iconColor="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Subscriptions"
          value={stats ? formatNumber(stats.subscriptions) : "0"}
          change={8.2}
          icon={<UsersIcon size={24} />}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Sales"
          value={stats ? formatNumber(stats.sales) : "0"}
          change={-3.1}
          icon={<ShoppingCart size={24} />}
          iconColor="bg-purple-100 text-purple-600"
        />
        <StatsCard
          title="Active Users"
          value={stats ? formatNumber(stats.activeUsers) : "0"}
          change={15.8}
          icon={<Activity size={24} />}
          iconColor="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Chart & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData || []} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity activities={recentActivity || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
