"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code2,
  Key,
  LineChart,
  RefreshCw,
  Shield,
  Terminal,
  Webhook,
  BookOpen,
  AlertTriangle,
  Activity,
  Database,
  Cpu,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APIDocumentation } from "@/components/developer/api-documentation";
import { IntegrationTools } from "@/components/developer/integration-tools";
import { ErrorManagement } from "@/components/developer/error-management";
import { AnalyticsDashboard } from "@/components/developer/analytics-dashboard";
import { SystemMonitoring } from "@/components/developer/system-monitoring";

const sections = [
  { id: "docs", label: "Documentation", icon: BookOpen },
  { id: "tools", label: "Integration Tools", icon: Code2 },
  { id: "errors", label: "Error Management", icon: AlertTriangle },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "monitoring", label: "System Status", icon: Cpu },
];

export default function DeveloperDashboard() {
  const [apiKey, setApiKey] = useState("sk_test_••••••••••••••••");
  const [showKey, setShowKey] = useState(false);
  const [activeSection, setActiveSection] = useState("docs");

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Developer Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            API integration tools and platform insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            All Systems Operational
          </Badge>
          <Button variant="outline" className="gap-2">
            <Terminal className="w-4 h-4" />
            API Console
          </Button>
        </div>
      </div>

      {/* API Keys Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">API Keys</h3>
          </div>
          <Badge variant="outline">Test Mode</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type={showKey ? "text" : "password"}
              value={apiKey}
              className="font-mono"
              readOnly
            />
            <Button
              variant="outline"
              onClick={() => setShowKey(!showKey)}
              className="flex-shrink-0"
            >
              {showKey ? "Hide" : "Show"}
            </Button>
            <Button variant="default" className="flex-shrink-0">
              <RefreshCw className="w-4 h-4 mr-2" />
              Rotate Key
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>API Requests (This Month): 45,321 / 100,000</span>
            <span>45.3%</span>
          </div>
          <Progress value={45.3} className="h-2" />
        </div>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="w-full justify-start mb-6">
          {sections.map(({ id, label, icon: Icon }) => (
            <TabsTrigger key={id} value={id} className="gap-2">
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="docs">
          <APIDocumentation />
        </TabsContent>

        <TabsContent value="tools">
          <IntegrationTools />
        </TabsContent>

        <TabsContent value="errors">
          <ErrorManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="monitoring">
          <SystemMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}