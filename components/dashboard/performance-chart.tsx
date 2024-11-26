"use client";

import { Card } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { date: "Jan 1", impressions: 4000, clicks: 2400, ctr: 3.6 },
  { date: "Jan 8", impressions: 3000, clicks: 1398, ctr: 4.2 },
  { date: "Jan 15", impressions: 2000, clicks: 9800, ctr: 3.8 },
  { date: "Jan 22", impressions: 2780, clicks: 3908, ctr: 3.7 },
  { date: "Jan 29", impressions: 1890, clicks: 4800, ctr: 3.9 },
  { date: "Feb 5", impressions: 2390, clicks: 3800, ctr: 4.1 },
  { date: "Feb 12", impressions: 3490, clicks: 4300, ctr: 4.3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
            {entry.name === "CTR" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs text-muted-foreground"
      >
        {payload.value}
      </text>
    </g>
  );
};

export function PerformanceChart() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Performance Trends</h3>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={<CustomAxisTick />}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={<CustomAxisTick />}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#FF5733"
              strokeWidth={2}
              dot={{ fill: "#FF5733" }}
              name="Impressions"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#9B59B6"
              strokeWidth={2}
              dot={{ fill: "#9B59B6" }}
              name="Clicks"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="ctr"
              stroke="#3498DB"
              strokeWidth={2}
              dot={{ fill: "#3498DB" }}
              name="CTR"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}