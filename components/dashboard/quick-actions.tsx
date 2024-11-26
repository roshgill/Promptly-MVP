"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy, PauseCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const actions = [
  {
    title: "Create Campaign",
    description: "Start a new advertising campaign",
    icon: Plus,
    variant: "default" as const,
    action: "/campaigns/new",
  },
  {
    title: "Duplicate Selected",
    description: "Copy selected campaigns",
    icon: Copy,
    variant: "outline" as const,
  },
  {
    title: "Pause Selected",
    description: "Pause selected campaigns",
    icon: PauseCircle,
    variant: "outline" as const,
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Quick Actions</h3>
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant}
              className="w-full justify-start"
              onClick={() => action.action && router.push(action.action)}
            >
              <Icon className="mr-2 h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}