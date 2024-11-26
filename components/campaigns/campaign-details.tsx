"use client";

import { Campaign, CampaignObjective } from "@/types/campaign";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  MousePointerClick, 
  DollarSign,
  Info
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  objective: z.enum(['brand_awareness', 'traffic'] as const),
  budget: z.number().min(0, "Budget must be a positive number").optional(),
});

const objectives: Record<CampaignObjective, {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  pricingModel: string;
}> = {
  brand_awareness: {
    title: "Brand Awareness and Reach",
    icon: Megaphone,
    description: "Increase visibility and recognition of your brand",
    details: [
      "Pay per thousand impressions (CPM)",
      "Optimized for brand visibility",
      "Best for increasing brand recognition"
    ],
    pricingModel: "CPM (Cost per Mille)",
  },
  traffic: {
    title: "Traffic",
    icon: MousePointerClick,
    description: "Drive visitors to your website",
    details: [
      "Pay per click (CPC)",
      "Optimized for website visits",
      "Best for driving website engagement"
    ],
    pricingModel: "CPC (Cost per Click)",
  },
};

interface CampaignDetailsProps {
  campaign: Campaign;
  onChange: (campaign: Campaign) => void;
}

export function CampaignDetails({ campaign, onChange }: CampaignDetailsProps) {
  const form = useForm<Campaign>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign,
  });

  const onSubmit = (data: Campaign) => {
    onChange({ ...campaign, ...data });
  };

  const selectedObjective = form.watch("objective");

  const ObjectiveIcon = selectedObjective ? objectives[selectedObjective].icon : null;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Campaign Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter campaign name"
                      className="text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-lg">Campaign Objective</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(objectives).map(([key, objective]) => {
                  const Icon = objective.icon;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => form.setValue("objective", key as CampaignObjective)}
                      className={cn(
                        "p-4 rounded-lg border-2 text-left transition-all",
                        selectedObjective === key
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{objective.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {objective.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedObjective && ObjectiveIcon && (
                <Card className="p-4 bg-muted/50 mt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <ObjectiveIcon className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">
                      {objectives[selectedObjective].pricingModel}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {objectives[selectedObjective].details.map((detail, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormLabel className="text-lg">Campaign Spend Cap</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p className="text-sm">
                          Set an optional maximum amount to spend on this campaign.
                          Once reached, the campaign will automatically pause.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <FormDescription>
                    Optional: Set a maximum budget for this campaign
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        className="pl-10"
                        placeholder="Enter spend cap"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
}