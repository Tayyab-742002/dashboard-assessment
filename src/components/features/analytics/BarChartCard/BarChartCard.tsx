import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../../../common/Card";
import type { BarChartCardProps } from "./BarChartCard.types";

const BarChartCard = ({ title, subtitle, data }: BarChartCardProps) => {
  return (
    <Card>
      <Card.Header title={title} subtitle={subtitle} />
      <Card.Content>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
            <Bar
              dataKey="users"
              fill="#0ea5e9"
              radius={[8, 8, 0, 0]}
              name="Total Users"
            />
            <Bar
              dataKey="growth"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              name="Growth %"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
};

export default BarChartCard;
