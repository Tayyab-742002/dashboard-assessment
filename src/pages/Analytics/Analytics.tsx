import { TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { analyticsService } from "../../api/services/analytics.service";
import Spinner from "../../components/common/Spinner";
import StatsCard from "../../components/features/dashboard/StatsCard";
import PieChartCard from "../../components/features/analytics/PieChartCard";
import BarChartCard from "../../components/features/analytics/BarChartCard";
import MetricsCard from "../../components/features/analytics/MetricsCard";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import type {
  RevenueBreakdown,
  SalesByCategory,
  UserGrowth,
} from "../../types/analytics.types";

const Analytics = () => {
  const { data: analyticsData, loading } = useFetch(
    () => analyticsService.getAnalyticsData(),
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" label="Loading analytics..." />
      </div>
    );
  }

  const totalSales =
    analyticsData?.salesByCategory.reduce(
      (sum: number, item: SalesByCategory) => sum + item.value,
      0
    ) || 0;

  const totalUsers =
    analyticsData?.userGrowth[analyticsData.userGrowth.length - 1]?.users || 0;

  const totalRevenue =
    analyticsData?.revenueBreakdown.reduce(
      (sum: number, item: RevenueBreakdown) => sum + item.value,
      0
    ) || 0;

  const avgGrowth =
    analyticsData?.userGrowth.reduce(
      (sum: number, item: UserGrowth) => sum + item.growth,
      0
    ) / (analyticsData?.userGrowth.length || 1) || 0;

  const revenueMetrics =
    analyticsData?.revenueBreakdown.map((item: RevenueBreakdown) => ({
      label: item.source,
      value: formatCurrency(item.value),
      color: item.color,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Deep dive into your analytics and insights.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sales"
          value={formatCurrency(totalSales)}
          change={15.3}
          icon={<ShoppingBag size={24} />}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Total Users"
          value={formatNumber(totalUsers)}
          change={24.5}
          icon={<Users size={24} />}
          iconColor="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={18.7}
          icon={<DollarSign size={24} />}
          iconColor="bg-purple-100 text-purple-600"
        />
        <StatsCard
          title="Avg Growth"
          value={`${avgGrowth.toFixed(1)}%`}
          change={5.2}
          icon={<TrendingUp size={24} />}
          iconColor="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard
          title="Sales by Category"
          subtitle="Distribution of sales across categories"
          data={analyticsData?.salesByCategory || []}
        />

        <MetricsCard title="Revenue Sources" metrics={revenueMetrics} />
      </div>

      {/* Full Width Chart */}
      <BarChartCard
        title="User Growth"
        subtitle="Monthly user acquisition and growth rate"
        data={analyticsData?.userGrowth || []}
      />
    </div>
  );
};

export default Analytics;
