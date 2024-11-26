"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AdGroup, MatchType } from "@/types/ad-group";

interface SemanticTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

const INTENT_SUGGESTIONS = [
  "researching",
  "comparing",
  "inquiring",
  "purchasing",
  "troubleshooting",
  "learning",
  "evaluating",
  "planning",
];

export function SemanticTargeting({ adGroup, onChange }: SemanticTargetingProps) {
  const [newTheme, setNewTheme] = useState("");
  const [themeMatchType, setThemeMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");
  const [newExclusion, setNewExclusion] = useState("");
  const [exclusionMatchType, setExclusionMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");
  const [newIntent, setNewIntent] = useState("");
  const [intentMatchType, setIntentMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");

  const addTheme = () => {
    if (newTheme.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          context: {
            ...adGroup.semanticTargeting.context,
            themes: [
              ...adGroup.semanticTargeting.context.themes,
              { value: newTheme.trim(), matchType: themeMatchType },
            ],
          },
        },
      });
      setNewTheme("");
    }
  };

  const removeTheme = (index: number) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          themes: adGroup.semanticTargeting.context.themes.filter((_, i) => i !== index),
        },
      },
    });
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          context: {
            ...adGroup.semanticTargeting.context,
            exclusions: [
              ...adGroup.semanticTargeting.context.exclusions,
              { value: newExclusion.trim(), matchType: exclusionMatchType },
            ],
          },
        },
      });
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          exclusions: adGroup.semanticTargeting.context.exclusions.filter((_, i) => i !== index),
        },
      },
    });
  };

  const addIntent = () => {
    if (newIntent.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          intent: [
            ...adGroup.semanticTargeting.intent,
            { value: newIntent.trim(), matchType: intentMatchType },
          ],
        },
      });
      setNewIntent("");
    }
  };

  const removeIntent = (index: number) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        intent: adGroup.semanticTargeting.intent.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Context Themes</h3>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Define the contextual themes where your ads should appear. Use exact matching for precise targeting or broad matching for wider reach.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              placeholder="e.g., tech discussion, product reviews"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addTheme()}
            />
            <Select
              value={themeMatchType}
              onValueChange={(value: "exact" | "broad") => setThemeMatchType(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exact</SelectItem>
                <SelectItem value="broad">Broad</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTheme}>Add</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.context.themes.map((theme, index) => (
              <Badge key={index} variant="secondary">
                {theme.value} ({theme.matchType})
                <button onClick={() => removeTheme(index)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">User Intent</h3>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Specify user intentions that indicate interest in your product or service. This helps target users at different stages of their journey.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={newIntent}
              onChange={(e) => setNewIntent(e.target.value)}
              placeholder="e.g., researching, comparing, purchasing"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addIntent()}
              list="intent-suggestions"
            />
            <datalist id="intent-suggestions">
              {INTENT_SUGGESTIONS.map((intent) => (
                <option key={intent} value={intent} />
              ))}
            </datalist>
            <Select
              value={intentMatchType}
              onValueChange={(value: "exact" | "broad") => setIntentMatchType(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exact</SelectItem>
                <SelectItem value="broad">Broad</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addIntent}>Add</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.intent.map((intent, index) => (
              <Badge key={index} variant="secondary">
                {intent.value} ({intent.matchType})
                <button onClick={() => removeIntent(index)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Context Exclusions</h3>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Define contexts where you don't want your ads to appear. This helps ensure brand safety and relevance.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={newExclusion}
              onChange={(e) => setNewExclusion(e.target.value)}
              placeholder="e.g., negative reviews, technical issues"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addExclusion()}
            />
            <Select
              value={exclusionMatchType}
              onValueChange={(value: "exact" | "broad") => setExclusionMatchType(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exact</SelectItem>
                <SelectItem value="broad">Broad</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addExclusion}>Add</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.context.exclusions.map((exclusion, index) => (
              <Badge key={index} variant="destructive">
                {exclusion.value} ({exclusion.matchType})
                <button onClick={() => removeExclusion(index)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}