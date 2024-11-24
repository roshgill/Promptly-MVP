"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  metric?: string;
  sparkline?: number[];
}

export function KPICard({ title, value, change, trend, metric, sparkline }: KPICardProps) {
  const data = sparkline?.map((value) => ({ value })) || [];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {trend === "up" ? (
          <ArrowUpIcon className="w-4 h-4 text-green-500" />
        ) : trend === "down" ? (
          <ArrowDownIcon className="w-4 h-4 text-red-500" />
        ) : null}
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold">{value}</p>
        {metric && <span className="ml-1 text-sm text-muted-foreground">{metric}</span>}
      </div>
      <div className="mt-2">
        <span
          className={cn(
            "text-sm",
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
          )}
        >
          {change > 0 ? "+" : ""}
          {change}% from last period
        </span>
      </div>
      {sparkline && (
        <div className="h-10 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#6b7280"}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}