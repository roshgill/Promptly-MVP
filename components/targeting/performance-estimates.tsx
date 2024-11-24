"use client";

import { Card } from "@/components/ui/card";
import { AdGroup } from "@/types/ad-group";
import { Slider } from "@/components/ui/slider";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PerformanceEstimatesProps {
  adGroup: AdGroup;
}

interface MetricsProps {
  type: "daily" | "weekly" | "monthly";
}

function Metrics({ type }: MetricsProps) {
  const multiplier = type === "monthly" ? 30 : type === "weekly" ? 7 : 1;
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Impressions</span>
          <span className="font-medium text-foreground">
            {(57 * multiplier).toLocaleString()}K - {(110 * multiplier).toLocaleString()}K
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary/50 w-3/4" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Clicks</span>
          <span className="font-medium text-foreground">
            {(2.1 * multiplier).toLocaleString()}K - {(4.8 * multiplier).toLocaleString()}K
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-secondary/50 w-2/3" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>CTR</span>
          <span className="font-medium text-foreground">3.2% - 4.8%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500/50 w-1/2" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Avg. CPC</span>
          <span className="font-medium text-foreground">$0.45 - $0.75</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-orange-500/50 w-3/5" />
        </div>
      </div>
    </div>
  );
}

export function PerformanceEstimates({ adGroup }: PerformanceEstimatesProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Performance Estimates</h3>
          <HoverCard>
            <HoverCardTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">
                Estimates are based on historical data and current targeting settings.
                Actual results may vary.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Audience Reach</span>
              <span>Broad</span>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Slider
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="[&>[role=slider]]:bg-primary [&>.slider-track]:bg-primary"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Estimated Audience Size:</p>
                <p className="font-semibold">2.1M - 2.8M users</p>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on your daily budget of ${adGroup.budget.daily.toLocaleString()}
            </p>

            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-4">
                <Metrics type="daily" />
              </TabsContent>
              <TabsContent value="weekly" className="mt-4">
                <Metrics type="weekly" />
              </TabsContent>
              <TabsContent value="monthly" className="mt-4">
                <Metrics type="monthly" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Card>
  );
}