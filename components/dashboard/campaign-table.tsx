"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused";
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  ctr: string;
  ads: Array<{
    id: string;
    name: string;
    status: "active" | "paused";
    impressions: string;
    clicks: string;
    ctr: string;
  }>;
}

const SAMPLE_DATA: Campaign[] = [
  {
    id: "1",
    name: "Summer AI Campaign",
    status: "active",
    budget: "$5,000",
    spent: "$2,340",
    impressions: "125K",
    clicks: "4.8K",
    ctr: "3.84%",
    ads: [
      { id: "1a", name: "Ad 1", status: "active", impressions: "45K", clicks: "2.1K", ctr: "4.67%" },
      { id: "1b", name: "Ad 2", status: "paused", impressions: "80K", clicks: "2.7K", ctr: "3.38%" },
    ],
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
    ads: [
      { id: "2a", name: "Ad 1", status: "active", impressions: "58K", clicks: "2.2K", ctr: "3.79%" },
      { id: "2b", name: "Ad 2", status: "active", impressions: "40K", clicks: "1.4K", ctr: "3.50%" },
    ],
  },
];

export function CampaignTable() {
  const router = useRouter();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = React.useState<Campaign[]>(SAMPLE_DATA);
  const [selectedCampaigns, setSelectedCampaigns] = React.useState<string[]>([]);
  const [expandedCampaigns, setExpandedCampaigns] = React.useState<string[]>([]);

  const toggleCampaignSelection = (id: string) => {
    setSelectedCampaigns(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleCampaignExpansion = (id: string) => {
    setExpandedCampaigns(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleAdStatus = (campaignId: string, adId: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          ads: campaign.ads.map(ad => {
            if (ad.id === adId) {
              const newStatus = ad.status === "active" ? "paused" : "active";
              toast({
                title: `Ad ${newStatus === "active" ? "Activated" : "Paused"}`,
                description: `${ad.name} has been ${newStatus === "active" ? "activated" : "paused"}.`,
              });
              return { ...ad, status: newStatus };
            }
            return ad;
          }),
        };
      }
      return campaign;
    }));
  };

  const handleBulkAction = (action: "delete" | "pause" | "activate") => {
    if (selectedCampaigns.length === 0) return;

    let message = "";
    switch (action) {
      case "delete":
        setCampaigns(prev => prev.filter(c => !selectedCampaigns.includes(c.id)));
        message = "Selected campaigns have been deleted";
        break;
      case "pause":
      case "activate":
        setCampaigns(prev => prev.map(campaign => {
          if (selectedCampaigns.includes(campaign.id)) {
            return { ...campaign, status: action === "activate" ? "active" : "paused" };
          }
          return campaign;
        }));
        message = `Selected campaigns have been ${action === "activate" ? "activated" : "paused"}`;
        break;
    }

    toast({
      title: "Bulk Action Completed",
      description: message,
    });
    setSelectedCampaigns([]);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Campaigns</h3>
        {selectedCampaigns.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleBulkAction("activate")}>
              Activate Selected
            </Button>
            <Button variant="outline" onClick={() => handleBulkAction("pause")}>
              Pause Selected
            </Button>
            <Button variant="destructive" onClick={() => handleBulkAction("delete")}>
              Delete Selected
            </Button>
          </div>
        )}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCampaigns.length === campaigns.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCampaigns(campaigns.map(c => c.id));
                  } else {
                    setSelectedCampaigns([]);
                  }
                }}
              />
            </TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>CTR</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <React.Fragment key={campaign.id}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedCampaigns.includes(campaign.id)}
                    onCheckedChange={() => toggleCampaignSelection(campaign.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCampaignExpansion(campaign.id)}
                  >
                    {expandedCampaigns.includes(campaign.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.budget}</TableCell>
                <TableCell>{campaign.spent}</TableCell>
                <TableCell>{campaign.impressions}</TableCell>
                <TableCell>{campaign.clicks}</TableCell>
                <TableCell>{campaign.ctr}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/campaigns/${campaign.id}`)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Campaign</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              {expandedCampaigns.includes(campaign.id) && campaign.ads.map((ad) => (
                <TableRow key={`${campaign.id}-${ad.id}`} className="bg-muted/50">
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="font-medium pl-8">{ad.name}</TableCell>
                  <TableCell>
                    <Switch
                      checked={ad.status === "active"}
                      onCheckedChange={() => toggleAdStatus(campaign.id, ad.id)}
                    />
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{ad.impressions}</TableCell>
                  <TableCell>{ad.clicks}</TableCell>
                  <TableCell>{ad.ctr}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/campaigns/${campaign.id}`)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}