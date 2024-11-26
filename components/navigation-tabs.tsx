"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard, Code2 } from "lucide-react";

export function NavigationTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(value === "home" ? "/" : `/${value}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-2">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Public View
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Advertiser Dashboard
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Developer Dashboard
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}