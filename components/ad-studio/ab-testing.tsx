"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TextAd, AdSimulationMetrics } from "@/types/ad";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ABTestingProps {
  adA: Partial<TextAd>;
  adB: Partial<TextAd>;
  onToggleABTesting: (enabled: boolean) => void;
  enabled: boolean;
}

function generateSimulatedMetrics(): AdSimulationMetrics {
  return {
    impressions: Math.floor(Math.random() * 10000) + 5000,
    clicks: Math.floor(Math.random() * 500) + 100,
    ctr: Number((Math.random() * 3 + 2).toFixed(2)),
    conversions: Math.floor(Math.random() * 50) + 10,
    conversionRate: Number((Math.random() * 2 + 1).toFixed(2)),
  };
}

const simulatedTimeData = Array.from({ length: 7 }, (_, i) => ({
  day: `Day ${i + 1}`,
  variantA: Math.random() * 5 + 2,
  variantB: Math.random() * 5 + 2,
}));

export function ABTesting({ adA, adB, onToggleABTesting, enabled }: ABTestingProps) {
  const [metricsA] = useState<AdSimulationMetrics>(generateSimulatedMetrics());
  const [metricsB] = useState<AdSimulationMetrics>(generateSimulatedMetrics());

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">A/B Testing Simulation</h3>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Compare two ad variants with simulated performance metrics.
                  All metrics shown are simulated and for demonstration purposes only.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggleABTesting}
          />
        </div>

        {enabled && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Variant A</h4>
                    <Badge variant="secondary">Control</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Impressions: {metricsA.impressions.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Clicks: {metricsA.clicks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">CTR: {metricsA.ctr}%</p>
                    <p className="text-sm text-muted-foreground">Conversions: {metricsA.conversions}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Variant B</h4>
                    <Badge variant="secondary">Test</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Impressions: {metricsB.impressions.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Clicks: {metricsB.clicks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">CTR: {metricsB.ctr}%</p>
                    <p className="text-sm text-muted-foreground">Conversions: {metricsB.conversions}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="font-medium mb-4">Performance Trend (Simulated)</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulatedTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="variantA"
                      name="Variant A"
                      stroke="#FF5733"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="variantB"
                      name="Variant B"
                      stroke="#9B59B6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline" className="text-xs">
                <Badge className="mr-2" variant="secondary">Simulated Data</Badge>
                Results are for demonstration only
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}