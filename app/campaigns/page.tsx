"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignList } from "@/components/campaigns/campaign-list";
import { Campaign } from "@/types/campaign";
import { useRouter } from "next/navigation";

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer AI Campaign",
    status: "active",
    budget: 5000,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    goals: {
      impressions: 100000,
      clicks: 5000,
      conversions: 500,
    },
    targeting: {
      keywords: ["ai", "machine learning", "automation"],
      locations: ["United States", "Canada"],
      ageRange: { min: 25, max: 54 },
      gender: "all",
    },
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button
          onClick={() => router.push(`/campaigns/new`)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <CampaignList
        campaigns={campaigns}
        onEdit={(campaign) => router.push(`/campaigns/${campaign.id}`)}
        onDelete={handleDeleteCampaign}
      />
    </div>
  );
}