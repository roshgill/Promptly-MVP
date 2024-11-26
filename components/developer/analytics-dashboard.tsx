"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AnalyticsDashboard() {
  const data = [
    { name: "Jan", requests: 4000, errors: 400 },
    { name: "Feb", requests: 3000, errors: 300 },
    { name: "Mar", requests: 2000, errors: 200 },
    { name: "Apr", requests: 2780, errors: 278 },
    { name: "May", requests: 1890, errors: 189 },
    { name: "Jun", requests: 2390, errors: 239 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">API Analytics</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#FF5733" />
            <Line type="monotone" dataKey="errors" stroke="#9B59B6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}