"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AdGroup } from "@/types/ad-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HybridTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
  strict: boolean;
}

export function HybridTargeting({ adGroup, onChange, strict }: HybridTargetingProps) {
  const handleWeightChange = (type: "semantic" | "keyword", value: number[]) => {
    onChange({
      ...adGroup,
      hybridWeights: {
        ...adGroup.hybridWeights,
        [type]: value[0],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Targeting Weights</Label>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Semantic Weight ({adGroup.hybridWeights?.semantic || 50}%)</span>
            </div>
            <Slider
              defaultValue={[adGroup.hybridWeights?.semantic || 50]}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange("semantic", value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Keyword Weight ({adGroup.hybridWeights?.keyword || 50}%)</span>
            </div>
            <Slider
              defaultValue={[adGroup.hybridWeights?.keyword || 50]}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange("keyword", value)}
            />
          </div>
        </div>
      </div>

      <Card className="p-4 bg-muted/50">
        <h4 className="font-medium mb-2">Active Targeting Criteria</h4>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Semantic Targeting</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {adGroup.semanticTargeting.context.themes.map((theme) => (
                  <Badge key={theme.value} variant="secondary">
                    {theme.value} ({theme.matchType})
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Keyword Targeting</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {adGroup.keywordRules.main.map((keyword) => (
                  <Badge key={keyword} variant="default">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-4">
        <h4 className="font-medium mb-2">Matching Strategy</h4>
        <p className="text-sm text-muted-foreground">
          {strict
            ? "Strict matching: All criteria must be met for both semantic and keyword targeting based on their weights."
            : "Flexible matching: Criteria are matched based on weighted scores from both targeting methods."}
        </p>
      </Card>
    </div>
  );
}