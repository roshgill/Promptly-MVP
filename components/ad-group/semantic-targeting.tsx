"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdGroup, MatchType } from "@/types/ad-group";

interface SemanticTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function SemanticTargeting({ adGroup, onChange }: SemanticTargetingProps) {
  const [newTheme, setNewTheme] = useState("");
  const [themeMatchType, setThemeMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");
  const [newExclusion, setNewExclusion] = useState("");
  const [newIntent, setNewIntent] = useState("");
  const [intentMatchType, setIntentMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");
  const [newTone, setNewTone] = useState("");
  const [toneMatchType, setToneMatchType] = useState<Extract<MatchType, "exact" | "broad">>("exact");

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

  const removeTheme = (themeValue: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          themes: adGroup.semanticTargeting.context.themes.filter(
            (theme) => theme.value !== themeValue
          ),
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
              { value: newExclusion.trim(), matchType: "exact" }
            ],
          },
        },
      });
      setNewExclusion("");
    }
  };

  const removeExclusion = (exclusionValue: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          exclusions: adGroup.semanticTargeting.context.exclusions.filter(
            (exclusion) => exclusion.value !== exclusionValue
          ),
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

  const removeIntent = (intentValue: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        intent: adGroup.semanticTargeting.intent.filter((i) => i.value !== intentValue),
      },
    });
  };

  const addTone = () => {
    if (newTone.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          tone: [
            ...adGroup.semanticTargeting.tone,
            { value: newTone.trim(), matchType: toneMatchType },
          ],
        },
      });
      setNewTone("");
    }
  };

  const removeTone = (toneValue: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        tone: adGroup.semanticTargeting.tone.filter((t) => t.value !== toneValue),
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Semantic Targeting</h3>
      <div className="space-y-8">
        {/* Conversation Context */}
        <div className="space-y-4">
          <Label>Conversation Context</Label>
          <div className="flex gap-2">
            <Input
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              placeholder="Enter context theme (e.g., dairy products discussion)"
              className="flex-1"
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
            {adGroup.semanticTargeting.context.themes.map((theme) => (
              <Badge key={theme.value} variant="secondary">
                {theme.value} ({theme.matchType})
                <button onClick={() => removeTheme(theme.value)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="mt-4">
            <Label>Context Exclusions</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Enter context to exclude (e.g., allergy discussions)"
                className="flex-1"
              />
              <Button onClick={addExclusion}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.semanticTargeting.context.exclusions.map((exclusion) => (
                <Badge key={exclusion.value} variant="destructive">
                  {exclusion.value} ({exclusion.matchType})
                  <button onClick={() => removeExclusion(exclusion.value)} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* User Intent */}
        <div className="space-y-4">
          <Label>User Intent</Label>
          <div className="flex gap-2">
            <Input
              value={newIntent}
              onChange={(e) => setNewIntent(e.target.value)}
              placeholder="Enter user intent (e.g., product comparison)"
              className="flex-1"
            />
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
            {adGroup.semanticTargeting.intent.map((intent) => (
              <Badge key={intent.value} variant="secondary">
                {intent.value} ({intent.matchType})
                <button onClick={() => removeIntent(intent.value)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Conversation Tone */}
        <div className="space-y-4">
          <Label>Conversation Tone</Label>
          <div className="flex gap-2">
            <Input
              value={newTone}
              onChange={(e) => setNewTone(e.target.value)}
              placeholder="Enter conversation tone (e.g., enthusiastic)"
              className="flex-1"
            />
            <Select
              value={toneMatchType}
              onValueChange={(value: "exact" | "broad") => setToneMatchType(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exact</SelectItem>
                <SelectItem value="broad">Broad</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTone}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.tone.map((tone) => (
              <Badge key={tone.value} variant="secondary">
                {tone.value} ({tone.matchType})
                <button onClick={() => removeTone(tone.value)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}