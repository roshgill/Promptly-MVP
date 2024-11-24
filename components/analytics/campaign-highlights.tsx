"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    title: "Top Performing Campaign",
    description: "Summer AI Campaign",
    metric: "4.8% CTR",
    trend: "+0.6%",
    status: "Trending Up",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Best ROI Campaign",
    description: "Product Launch",
    metric: "385% ROI",
    trend: "+12%",
    status: "High Performance",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    title: "Most Targeted",
    description: "Brand Awareness",
    metric: "12 Segments",
    trend: "+3",
    status: "Optimized",
    icon: Target,
    color: "text-blue-500",
  },
];

export function CampaignHighlights() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Campaign Highlights</h3>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-6">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className={cn("mt-0.5", highlight.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{highlight.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{highlight.metric}</Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        highlight.trend.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {highlight.trend}
                    </Badge>
                  </div>
                </div>
              </div>
              <Badge>{highlight.status}</Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}