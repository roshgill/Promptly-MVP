"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    name: "Summer Sale AI",
    status: "active",
    budget: "$5,000",
    ctr: "5.2%",
  },
  {
    name: "Product Launch",
    status: "active",
    budget: "$3,500",
    ctr: "4.8%",
  },
  {
    name: "Brand Awareness",
    status: "paused",
    budget: "$2,800",
    ctr: "3.9%",
  },
  {
    name: "Holiday Special",
    status: "draft",
    budget: "$4,200",
    ctr: "0%",
  },
];

export function RecentCampaigns() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>CTR</TableHead>
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
            <TableCell>{campaign.budget}</TableCell>
            <TableCell>{campaign.ctr}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}