"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const metrics = [
  {
    title: "Amount Spent",
    value: "$12,543",
    change: 15.8,
    trend: "up",
    sparkline: [30, 45, 38, 52, 48, 58, 62],
  },
  {
    title: "Impressions",
    value: "1.2M",
    change: 12.3,
    trend: "up",
    sparkline: [25, 30, 28, 35, 32, 38, 42],
  },
  {
    title: "Clicks",
    value: "45.2K",
    change: 8.2,
    trend: "up",
    sparkline: [320, 380, 350, 420, 400, 450, 480],
  },
  {
    title: "CTR",
    value: "3.8%",
    change: -0.5,
    trend: "down",
    sparkline: [4.2, 4.0, 3.9, 3.7, 3.8, 3.6, 3.8],
  },
];

export function KPIMetrics() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </h3>
            {metric.trend === "up" ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">{metric.value}</p>
            <span
              className={`text-sm ${
                metric.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {metric.change > 0 ? "+" : ""}
              {metric.change}%
            </span>
          </div>
          <div className="h-10 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.sparkline.map((value) => ({ value }))}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={metric.trend === "up" ? "#22c55e" : "#ef4444"}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ))}
    </div>
  );
}