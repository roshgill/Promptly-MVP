"use client";

import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AdGroup } from "@/types/ad-group";

interface EstimatesPanelProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

interface MetricsProps {
  type: "daily" | "weekly";
}

function Metrics({ type }: MetricsProps) {
  const multiplier = type === "weekly" ? 7 : 1;
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Impressions</label>
        <p className="text-2xl font-semibold">
          {(57 * multiplier).toLocaleString()}K - {(110 * multiplier).toLocaleString()}K
        </p>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Clicks</label>
        <p className="text-2xl font-semibold">
          {(55 * multiplier).toLocaleString()} - {(110 * multiplier).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export function EstimatesPanel({ adGroup }: EstimatesPanelProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Estimates</h3>
      
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Narrow</span>
              <span>Broad</span>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <Slider
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="[&>[role=slider]]:bg-secondary [&>.slider-track]:bg-secondary"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Estimated Audience Size:</p>
                <p className="font-semibold">579M - 724M</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Based on your weekly budget of ${(adGroup.budget.daily * 7).toLocaleString()}
          </p>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="weekly" className="flex-1">Weekly Results</TabsTrigger>
              <TabsTrigger value="daily" className="flex-1">Daily Results</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="mt-4">
              <Metrics type="weekly" />
            </TabsContent>
            <TabsContent value="daily" className="mt-4">
              <Metrics type="daily" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}