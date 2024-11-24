"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function APIDocumentation() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/campaigns",
      description: "List all campaigns",
      auth: true,
    },
    {
      method: "POST",
      path: "/api/v1/campaigns",
      description: "Create a new campaign",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/v1/campaigns/:id",
      description: "Get campaign details",
      auth: true,
    },
    {
      method: "PUT",
      path: "/api/v1/campaigns/:id",
      description: "Update campaign",
      auth: true,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">API Documentation</h3>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                    {endpoint.method}
                  </Badge>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    {endpoint.path}
                  </code>
                </div>
                {endpoint.auth && (
                  <Badge variant="outline">Requires Authentication</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{endpoint.description}</p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}