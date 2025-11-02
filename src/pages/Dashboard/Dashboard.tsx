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

const Dashboard = () => {
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
          value={formatCurrency(1000)}
          change={12.5}
          icon={<DollarSign size={24} />}
          iconColor="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Subscriptions"
          value={formatNumber(1000)}
          change={8.2}
          icon={<UsersIcon size={24} />}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Sales"
          value={formatNumber(1000)}
          change={-3.1}
          icon={<ShoppingCart size={24} />}
          iconColor="bg-purple-100 text-purple-600"
        />
        <StatsCard
          title="Active Users"
          value={formatNumber(1000)}
          change={15.8}
          icon={<Activity size={24} />}
          iconColor="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Chart & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={[]} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity activities={[]} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
