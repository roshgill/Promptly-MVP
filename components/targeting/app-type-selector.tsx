"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AppType } from "@/types/ad-group";

interface AppTypeSelectorProps {
  selectedTypes: AppType[];
  onChange: (types: AppType[]) => void;
}

const APP_TYPES: { value: AppType; label: string; description: string }[] = [
  {
    value: "mobile_apps",
    label: "Mobile Apps",
    description: "Target users within mobile applications",
  },
  {
    value: "web_apps",
    label: "Web Apps",
    description: "Target users of browser-based applications",
  },
  {
    value: "ecommerce",
    label: "E-Commerce",
    description: "Target users on shopping platforms",
  },
  {
    value: "social_media",
    label: "Social Media",
    description: "Target users on social networking platforms",
  },
  {
    value: "gaming",
    label: "Gaming",
    description: "Target users in gaming environments",
  },
  {
    value: "all",
    label: "All App Types",
    description: "Target users across all platform types",
  },
];

export function AppTypeSelector({ selectedTypes, onChange }: AppTypeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAppType = (type: AppType) => {
    if (type === "all") {
      onChange(["all"]);
      return;
    }

    let newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes.filter((t) => t !== "all"), type];

    // If no types are selected, default to "all"
    if (newTypes.length === 0) {
      newTypes = ["all"];
    }

    onChange(newTypes);
  };

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">App Type Selection</h3>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Select the types of apps or platforms where your ads will appear.
                  This helps optimize targeting and performance estimates.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {APP_TYPES.slice(0, isExpanded ? undefined : 3).map((type) => (
            <Badge
              key={type.value}
              variant={selectedTypes.includes(type.value) ? "default" : "outline"}
              className="cursor-pointer hover:opacity-80 px-4 py-2"
              onClick={() => toggleAppType(type.value)}
            >
              {type.label}
              {selectedTypes.includes(type.value) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAppType(type.value);
                  }}
                  className="ml-2"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>

        {selectedTypes.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Selected Types:{" "}
              {selectedTypes
                .map(
                  (type) =>
                    APP_TYPES.find((t) => t.value === type)?.label || type
                )
                .join(", ")}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}