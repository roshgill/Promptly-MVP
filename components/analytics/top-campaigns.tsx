"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const campaigns = [
  {
    name: "Summer AI Campaign",
    status: "active",
    impressions: 125000,
    clicks: 4800,
    ctr: 3.84,
    trend: "up",
    change: 12.5,
  },
  {
    name: "Product Launch",
    status: "active",
    impressions: 98000,
    clicks: 3600,
    ctr: 3.67,
    trend: "up",
    change: 8.2,
  },
  {
    name: "Brand Awareness",
    status: "paused",
    impressions: 75000,
    clicks: 2500,
    ctr: 3.33,
    trend: "down",
    change: -2.1,
  },
  {
    name: "Holiday Special",
    status: "draft",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    trend: "neutral",
    change: 0,
  },
];

export function TopCampaigns() {
  return (
    <Card className="p-6 h-[500px]">
      <h3 className="text-lg font-medium mb-6">Top Performing Campaigns</h3>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.name}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "default"
                        : campaign.status === "paused"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {campaign.impressions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.clicks.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{campaign.ctr}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span
                      className={
                        campaign.trend === "up"
                          ? "text-green-500"
                          : campaign.trend === "down"
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }
                    >
                      {campaign.change > 0 ? "+" : ""}
                      {campaign.change}%
                    </span>
                    {campaign.trend === "up" ? (
                      <ArrowUpIcon className="w-4 h-4 text-green-500" />
                    ) : campaign.trend === "down" ? (
                      <ArrowDownIcon className="w-4 h-4 text-red-500" />
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}