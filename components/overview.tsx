"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", impressions: 4000, clicks: 2400, ctr: 60 },
  { name: "Feb", impressions: 3000, clicks: 1398, ctr: 46.6 },
  { name: "Mar", impressions: 2000, clicks: 980, ctr: 49 },
  { name: "Apr", impressions: 2780, clicks: 1308, ctr: 47.1 },
  { name: "May", impressions: 1890, clicks: 980, ctr: 51.9 },
  { name: "Jun", impressions: 2390, clicks: 1140, ctr: 47.7 },
];

const CustomTick = (props: { x?: number; y?: number; payload?: { value: string } }) => {
  const { x = 0, y = 0, payload = { value: "" } } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#6B7280"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

export function Overview() {
  return (
    <div className="h-[300px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="name"
            stroke="#374151"
            tick={<CustomTick />}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#374151"
            tick={<CustomTick />}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#E5E7EB",
            }}
            itemStyle={{ color: "#E5E7EB" }}
            labelStyle={{ color: "#E5E7EB" }}
            formatter={(value: number, name: string) => [
              name === "ctr" ? `${value}%` : value,
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#FF5733"
            strokeWidth={2}
            dot={{ fill: "#FF5733" }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#9B59B6"
            strokeWidth={2}
            dot={{ fill: "#9B59B6" }}
          />
          <Line
            type="monotone"
            dataKey="ctr"
            stroke="#3498DB"
            strokeWidth={2}
            dot={{ fill: "#3498DB" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}