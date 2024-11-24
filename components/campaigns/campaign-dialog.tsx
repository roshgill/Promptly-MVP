"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Campaign } from "@/types/campaign";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "paused", "draft"]),
  budget: z.number().min(1, "Budget must be greater than 0"),
  startDate: z.date(),
  endDate: z.date(),
  goals: z.object({
    impressions: z.number().min(0),
    clicks: z.number().min(0),
    conversions: z.number().min(0),
  }),
  targeting: z.object({
    keywords: z.array(z.string()),
    locations: z.array(z.string()),
    ageRange: z.object({
      min: z.number().min(13),
      max: z.number().max(100),
    }),
    gender: z.enum(["all", "male", "female"]),
  }),
});

interface CampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onSubmit: (campaign: Campaign) => void;
}

export function CampaignDialog({
  open,
  onOpenChange,
  campaign,
  onSubmit,
}: CampaignDialogProps) {
  const form = useForm<Campaign>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign || {
      name: "",
      status: "draft",
      budget: 0,
      startDate: new Date(),
      endDate: new Date(),
      goals: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
      },
      targeting: {
        keywords: [],
        locations: [],
        ageRange: { min: 18, max: 65 },
        gender: "all",
      },
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {campaign ? "Edit Campaign" : "Create Campaign"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {campaign ? "Update Campaign" : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}