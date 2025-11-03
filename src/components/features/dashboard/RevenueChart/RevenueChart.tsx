import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../../../common/Card";
import type { RevenueChartProps } from "./RevenueChart.types";
import { memo } from "react";
const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card>
      <Card.Header
        title="Revenue Overview"
        subtitle="Monthly revenue and expenses comparison"
      />
      <Card.Content>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6e56cf"
              strokeWidth={2}
              name="Revenue"
              dot={{ fill: "#6e56cf", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#9AA6B2"
              strokeWidth={2}
              name="Expenses"
              dot={{ fill: "#9AA6B2", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
};

export default memo(RevenueChart);
