"use client";

import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header with Date Range and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Your advertising performance at a glance
          </p>
        </div>
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

      {/* Main Content Grid */}
      <div className="grid gap-6 grid-cols-12">
        {/* Performance Chart */}
        <Card className="col-span-12 lg:col-span-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium">Performance Trends</h3>
              <p className="text-sm text-muted-foreground">
                Campaign metrics over time
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              15.8% vs last period
            </Badge>
          </div>
          <PerformanceChart />
        </Card>

        {/* Quick Actions and Alerts */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => router.push("/campaigns")}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">View All Campaigns</div>
                  <div className="text-sm text-muted-foreground">
                    Manage your active campaigns
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => router.push("/ad-studio")}
              >
                <Plus className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Create New Ad</div>
                  <div className="text-sm text-muted-foreground">
                    Design and launch new ads
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-medium">Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <div className="font-medium">Budget Alert</div>
                <p className="text-sm text-muted-foreground">
                  "Summer Campaign" is at 85% of budget
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <div className="font-medium">Performance Update</div>
                <p className="text-sm text-muted-foreground">
                  CTR increased by 12% this week
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Campaign Table */}
        <div className="col-span-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Active Campaigns</h3>
              <Button 
                variant="outline"
                onClick={() => router.push("/campaigns")}
              >
                View All
              </Button>
            </div>
            <CampaignTable />
          </Card>
        </div>
      </div>
    </div>
  );
}