"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";

export function SystemMonitoring() {
  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.99%",
      latency: 45,
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: "99.95%",
      latency: 65,
    },
    {
      name: "Campaign Service",
      status: "degraded",
      uptime: "99.50%",
      latency: 120,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">System Status</h3>
      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.name} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {service.status === "operational" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                <h4 className="font-medium">{service.name}</h4>
              </div>
              <Badge
                variant={service.status === "operational" ? "default" : "secondary"}
              >
                {service.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span>{service.uptime}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latency</span>
                  <span>{service.latency}ms</span>
                </div>
                <Progress
                  value={Math.min((service.latency / 200) * 100, 100)}
                  className="h-1"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}