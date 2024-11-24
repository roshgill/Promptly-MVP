"use client";

import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TargetingMode } from "@/types/ad-group";

interface TargetingModeLabelProps {
  mode: TargetingMode;
}

const TARGETING_INFO = {
  semantic: {
    label: "Semantic Targeting Active",
    description: "Using AI-powered contextual understanding for precise targeting",
    color: "bg-primary",
  },
  keyword: {
    label: "Keyword Targeting Active",
    description: "Using traditional keyword-based targeting approach",
    color: "bg-secondary",
  },
  hybrid: {
    label: "Hybrid Targeting Active",
    description: "Combining both semantic and keyword-based targeting for optimal results",
    color: "bg-accent",
  },
};

export function TargetingModeLabel({ mode }: TargetingModeLabelProps) {
  const info = TARGETING_INFO[mode];

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="default"
        className={`${info.color} px-3 py-1 text-sm font-medium`}
      >
        {info.label}
      </Badge>
      <HoverCard>
        <HoverCardTrigger>
          <Info className="w-4 h-4 text-muted-foreground" />
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">{info.label}</p>
            <p className="text-sm text-muted-foreground">
              {info.description}
            </p>
            <p className="text-xs text-muted-foreground">
              You can freely switch between Semantic, Keyword, or Hybrid targeting
              to best suit your campaign needs.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}