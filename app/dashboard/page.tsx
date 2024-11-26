"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { LiveMonitor } from "@/components/dashboard/live-monitor";
import { Button } from "@/components/ui/button";
import { Plus, Activity, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"overview" | "live">("overview");

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <DateRangePicker />
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => router.push("/campaigns/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "overview" | "live")}>
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Live Monitor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-12">
            <div className="col-span-12 lg:col-span-8">
              <PerformanceChart />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <QuickActions />
            </div>
          </div>

          <CampaignTable />
        </TabsContent>

        <TabsContent value="live">
          <LiveMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
}