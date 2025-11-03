import {
  DollarSign,
  Users as UsersIcon,
  ShoppingCart,
  Activity,
} from "lucide-react";
import {
  useDashboardStats,
  useRecentActivity,
  useChartData,
} from "../../hooks/queries/useDashboard";
import StatsCard from "../../components/features/dashboard/StatsCard";
import RevenueChart from "../../components/features/dashboard/RevenueChart";
import RecentActivityComponent from "../../components/features/dashboard/RecentActivity";
import { formatCurrency, formatNumber } from "../../utils/formatters";
// import { useFetch } from "../../hooks/useFetch";
// import { dashboardService } from "../../api/services/dashboard.service";
import Spinner from "../../components/common/Spinner";
// import type {
//   ChartDataPoint,
//   DashboardStats,
//   RecentActivity,
// } from "../../types/dashboard.types";
const Dashboard = () => {
  // useFetch hook for fetching data
  // const { data: stats, loading: statsLoading } = useFetch<DashboardStats>(
  //   () => dashboardService.getStats(),
  //   []
  // );
  // const { data: recentActivity, loading: recentActivityLoading } = useFetch<
  //   RecentActivity[]
  // >(() => dashboardService.getRecentActivity(), []);

  // // fetching chart's data
  // const { data: chartData, loading: chartDataLoading } = useFetch<
  //   ChartDataPoint[]
  // >(() => dashboardService.getChartData(), []);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const { data: recentActivity, isLoading: recentActivityLoading } =
    useRecentActivity();
  const { data: chartData, isLoading: chartLoading } = useChartData();
  // fetching recent activities

  if (statsLoading || recentActivityLoading || chartLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={stats ? formatCurrency(stats.totalRevenue) : "$0"}
          change={12.5}
          icon={<DollarSign size={24} />}
          iconColor="text-white bg-green-500/80"
          className="shadow-2xl"
        />
        <StatsCard
          title="Subscriptions"
          value={stats ? formatNumber(stats.subscriptions) : "0"}
          change={8.2}
          icon={<UsersIcon size={24} />}
          iconColor="text-white bg-blue-500/80"
          className="shadow-2xl"
        />
        <StatsCard
          title="Sales"
          value={stats ? formatNumber(stats.sales) : "0"}
          change={-3.1}
          icon={<ShoppingCart size={24} />}
          iconColor="text-white bg-purple-500/80"
          className="shadow-2xl"
        />
        <StatsCard
          title="Active Users"
          value={stats ? formatNumber(stats.activeUsers) : "0"}
          change={15.8}
          icon={<Activity size={24} />}
          iconColor="text-white bg-orange-500/80"
          className="shadow-2xl"
        />
      </div>

      {/* Chart and Activity  */}
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
        <div className="lg:col-span-2 p-4 shadow-primary">
          <RevenueChart data={chartData || []} />
        </div>
        <div className="lg:col-span-1 p-4 shadow-primary">
          <RecentActivityComponent activities={recentActivity || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
