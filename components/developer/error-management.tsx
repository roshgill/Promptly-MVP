"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, XCircle, Clock } from "lucide-react";

export function ErrorManagement() {
  const errors = [
    {
      id: "err_1",
      type: "API Error",
      message: "Rate limit exceeded",
      timestamp: "2 minutes ago",
      status: "active",
      count: 23,
    },
    {
      id: "err_2",
      type: "Authentication",
      message: "Invalid API key",
      timestamp: "15 minutes ago",
      status: "resolved",
      count: 5,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Error Management</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {errors.map((error) => (
            <Card key={error.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {error.status === "active" ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <h4 className="font-medium">{error.type}</h4>
                </div>
                <Badge
                  variant={error.status === "active" ? "destructive" : "secondary"}
                >
                  {error.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{error.message}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {error.timestamp}
                </div>
                <Badge variant="outline">{error.count} occurrences</Badge>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}