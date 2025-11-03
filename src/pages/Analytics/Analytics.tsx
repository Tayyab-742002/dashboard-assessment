import { TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
// import { useFetch } from "../../hooks/useFetch";
// import { analyticsService } from "../../api/services/analytics.service";
import Spinner from "../../components/common/Spinner";
import StatsCard from "../../components/features/dashboard/StatsCard";
import PieChartCard from "../../components/features/analytics/PieChartCard";
import BarChartCard from "../../components/features/analytics/BarChartCard";
import MetricsCard from "../../components/features/analytics/MetricsCard";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import { useAnalyticsData } from "../../hooks/queries/useAnalytics";
import type {
  RevenueBreakdown,
  SalesByCategory,
  UserGrowth,
} from "../../types/analytics.types";
import { useMemo } from "react";

const Analytics = () => {
  // const { data: analyticsData, loading } = useFetch<AnalyticsData>(
  //   () => analyticsService.getAnalyticsData(),
  //   []
  // );
  const { data: analyticsData, isLoading: loading } = useAnalyticsData();
  const totalSales = useMemo(
    () =>
      (analyticsData?.salesByCategory ?? []).reduce(
        (sum: number, item: SalesByCategory) => sum + item.value,
        0
      ),
    [analyticsData?.salesByCategory]
  );
  const totalUsers = useMemo(
    () =>
      analyticsData?.userGrowth[analyticsData.userGrowth.length - 1]?.users ||
      0,
    [analyticsData?.userGrowth]
  );

  const totalRevenue = useMemo(
    () =>
      (analyticsData?.revenueBreakdown ?? []).reduce(
        (sum: number, item: RevenueBreakdown) => sum + item.value,
        0
      ),
    [analyticsData?.revenueBreakdown]
  );
  const avgGrowth = useMemo(
    () =>
      (analyticsData?.userGrowth ?? []).reduce(
        (sum: number, item: UserGrowth) => sum + item.growth,
        0
      ) / (analyticsData?.userGrowth?.length ?? 0),
    [analyticsData?.userGrowth]
  );

  const revenueMetrics = useMemo(
    () =>
      analyticsData?.revenueBreakdown.map((item: RevenueBreakdown) => ({
        label: item.source,
        value: formatCurrency(item.value),
        color: item.color,
      })) || [],
    [analyticsData?.revenueBreakdown]
  );
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" label="Loading analytics..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Deep dive into your analytics and insights.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sales"
          value={formatCurrency(totalSales)}
          change={15.3}
          icon={<ShoppingBag size={24} />}
          iconColor="bg-blue-500/80 text-blue-200"
          className="shadow-2xl"
        />
        <StatsCard
          title="Total Users"
          value={formatNumber(totalUsers)}
          change={24.5}
          icon={<Users size={24} />}
          iconColor="bg-green-500/80 text-green-700"
          className="shadow-2xl"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={18.7}
          icon={<DollarSign size={24} />}
          iconColor="bg-purple-500/80 text-purple-200"
          className="shadow-2xl"
        />
        <StatsCard
          title="Avg Growth"
          value={`${avgGrowth.toFixed(1)}%`}
          change={5.2}
          icon={<TrendingUp size={24} />}
          iconColor="bg-orange-500/80 text-orange-200"
          className="shadow-2xl"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-primary">
          <PieChartCard
            title="Sales by Category"
            subtitle="Distribution of sales across categories"
            data={analyticsData?.salesByCategory || []}
          />
        </div>

        <div className="shadow-primary">
          <MetricsCard title="Revenue Sources" metrics={revenueMetrics} />
        </div>
      </div>
      <div className="shadow-primary">
        <BarChartCard
          title="User Growth"
          subtitle="Monthly user acquisition and growth rate"
          data={analyticsData?.userGrowth || []}
        />
      </div>
    </div>
  );
};

export default Analytics;
