"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignDetails } from "@/components/campaigns/campaign-details";
import { AdStudio } from "@/components/ad-studio/ad-editor";
import { AdGroupPanel } from "@/components/ad-group/ad-group-panel";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useState } from "react";
import { Campaign } from "@/types/campaign";
import { TextAd } from "@/types/ad";
import { AdGroup } from "@/types/ad-group";
import { useToast } from "@/components/ui/use-toast";

const defaultAdGroup: AdGroup = {
  id: "",
  campaignId: "",
  name: "Default Ad Group",
  targetingMode: "semantic",
  locations: {
    included: [],
    excluded: [],
  },
  demographics: {
    ageRanges: [],
    gender: "all",
  },
  semanticTargeting: {
    context: {
      themes: [],
      exclusions: [],
    },
    intent: [],
    tone: [],
  },
  keywordRules: {
    main: [],
    mustInclude: [],
    negative: [],
  },
  devices: {
    types: ["mobile", "desktop"],
    operatingSystems: ["ios", "android", "windows"],
  },
  budget: {
    daily: 0,
    total: 0,
  },
  schedule: {
    durationType: "continuous",
  },
};

const defaultAd: TextAd = {
  id: "",
  campaignId: "",
  format: "text",
  name: "",
  content: "",
  callToAction: "",
  previewUrl: "",
  status: "draft",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function CampaignManagementClient({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const isNew = id === "new";
  
  const [campaign, setCampaign] = useState<Campaign>({
    id,
    name: "Summer AI Campaign",
    status: "active",
    objective: "traffic",
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
  });

  const [adGroup, setAdGroup] = useState<AdGroup>(defaultAdGroup);
  const [currentAd, setCurrentAd] = useState<TextAd>(defaultAd);
  const [savedAds, setSavedAds] = useState<TextAd[]>([]);

  const handleSave = () => {
    toast({
      title: isNew ? "Campaign created" : "Campaign updated",
      description: isNew 
        ? "Your new campaign has been created successfully."
        : "Your campaign changes have been saved.",
    });
    router.push("/"); // Updated to redirect to dashboard
  };

  const handleSaveAd = (ad: Partial<TextAd>) => {
    const newAd: TextAd = {
      ...defaultAd,
      ...ad,
      id: ad.id || Date.now().toString(),
      campaignId: campaign.id,
      updatedAt: new Date(),
    };

    if (!ad.id) {
      setSavedAds([...savedAds, newAd]);
    } else {
      setSavedAds(savedAds.map((a) => (a.id === ad.id ? newAd : a)));
    }
    setCurrentAd(newAd);
  };

  const handleDeleteAd = (adId: string) => {
    setSavedAds(savedAds.filter((ad) => ad.id !== adId));
    if (currentAd.id === adId) {
      setCurrentAd(defaultAd);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>{campaign.name}</BreadcrumbItem>
          </Breadcrumb>
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90"
          onClick={handleSave}
        >
          {isNew ? "Create Campaign" : "Save Campaign"}
        </Button>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Campaign Details</TabsTrigger>
          <TabsTrigger value="ad-group">Ad Group</TabsTrigger>
          <TabsTrigger value="ad-studio">Ad Studio</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-0">
          <CampaignDetails campaign={campaign} onChange={setCampaign} />
        </TabsContent>

        <TabsContent value="ad-group" className="mt-0">
          <AdGroupPanel adGroup={adGroup} onChange={setAdGroup} />
        </TabsContent>

        <TabsContent value="ad-studio" className="mt-0">
          <AdStudio
            ad={currentAd}
            savedAds={savedAds}
            onChange={setCurrentAd}
            onSave={handleSaveAd}
            onDelete={handleDeleteAd}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}