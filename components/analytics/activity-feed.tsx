"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Circle, Target, Zap, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "campaign",
    title: "Summer Campaign Updated",
    description: "Budget increased by $500",
    time: "2 hours ago",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "performance",
    title: "Performance Alert",
    description: "CTR increased by 25%",
    time: "5 hours ago",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    id: 3,
    type: "targeting",
    title: "Targeting Optimized",
    description: "Added 3 new keywords",
    time: "1 day ago",
    icon: Target,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "status",
    title: "Campaign Status",
    description: "Brand campaign paused",
    time: "2 days ago",
    icon: Circle,
    color: "text-red-500",
  },
];

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Recent Activity</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-4">
                <div className={cn("mt-0.5", activity.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}