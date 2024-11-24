"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, Pause, Play, Copy, Trash2 } from "lucide-react";

const campaigns = [
  {
    id: "1",
    name: "Summer AI Campaign",
    status: "active",
    budget: "$5,000",
    spent: "$2,340",
    impressions: "125K",
    clicks: "4.8K",
    ctr: "3.84%",
  },
  {
    id: "2",
    name: "Product Launch",
    status: "active",
    budget: "$3,500",
    spent: "$1,200",
    impressions: "98K",
    clicks: "3.6K",
    ctr: "3.67%",
  },
  {
    id: "3",
    name: "Brand Awareness",
    status: "paused",
    budget: "$2,800",
    spent: "$1,850",
    impressions: "75K",
    clicks: "2.5K",
    ctr: "3.33%",
  },
];

export function CampaignCards() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Active Campaigns</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <Badge
                    variant={campaign.status === "active" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    {campaign.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-medium">{campaign.budget}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spent</p>
                  <p className="font-medium">{campaign.spent}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Impressions</p>
                  <p className="font-medium">{campaign.impressions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CTR</p>
                  <p className="font-medium">{campaign.ctr}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}