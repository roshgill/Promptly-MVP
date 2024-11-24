"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Download, Copy } from "lucide-react";

export function IntegrationTools() {
  const sdks = [
    {
      language: "JavaScript",
      version: "1.2.0",
      icon: Code2,
    },
    {
      language: "Python",
      version: "1.1.0",
      icon: Code2,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Integration Tools</h3>
      <div className="space-y-6">
        {sdks.map((sdk, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <sdk.icon className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-medium">{sdk.language} SDK</h4>
                  <p className="text-sm text-muted-foreground">
                    Version {sdk.version}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}