import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../../common/Card";
import type { PieChartCardProps } from "./PieChartCard.types";
import { formatCurrency } from "../../../../utils/formatters";
import { memo } from "react";
const COLORS = ["#0ea5e9", "#a855f7", "#22c55e", "#f59e0b", "#ef4444"];

const PieChartCard = ({
  title,
  subtitle,
  data,
  className = "",
}: PieChartCardProps) => {
  return (
    <Card className={className}>
      <Card.Header title={title} subtitle={subtitle} />
      <Card.Content>
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  // Recharts expects a broad indexable data type; cast is safe because we control the shape via PieChartData
                  data={data as unknown as Record<string, unknown>[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(item.value)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default memo(PieChartCard);
