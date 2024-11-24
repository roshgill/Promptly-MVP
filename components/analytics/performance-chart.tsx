"use client";

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
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const data = [
  { date: "2024-01", impressions: 120000, clicks: 3600, ctr: 3.0, conversions: 360 },
  { date: "2024-02", impressions: 150000, clicks: 4800, ctr: 3.2, conversions: 480 },
  { date: "2024-03", impressions: 180000, clicks: 6300, ctr: 3.5, conversions: 630 },
  { date: "2024-04", impressions: 210000, clicks: 7700, ctr: 3.7, conversions: 770 },
  { date: "2024-05", impressions: 250000, clicks: 9500, ctr: 3.8, conversions: 950 },
  { date: "2024-06", impressions: 300000, clicks: 12000, ctr: 4.0, conversions: 1200 },
];

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const metrics = [
  { value: "impressions", label: "Impressions", color: "#FF5733" },
  { value: "clicks", label: "Clicks", color: "#9B59B6" },
  { value: "ctr", label: "CTR", color: "#3498DB" },
  { value: "conversions", label: "Conversions", color: "#2ECC71" },
];

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetrics, setSelectedMetrics] = useState(["clicks", "ctr"]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
              {entry.name === "ctr" ? "%" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Performance Trends</h3>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#374151"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#374151"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {metrics
              .filter((metric) => selectedMetrics.includes(metric.value))
              .map((metric) => (
                <Line
                  key={metric.value}
                  type="monotone"
                  dataKey={metric.value}
                  name={metric.label}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{ fill: metric.color }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}