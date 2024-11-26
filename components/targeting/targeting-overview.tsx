"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AdGroup } from "@/types/ad-group";
import { calculateTargetingScores } from "@/lib/targeting-utils";
import { ExampleMatches } from "@/components/targeting/example-matches";
import { TargetingInsights } from "@/components/targeting/targeting-insights";
import { useEffect, useState } from "react";

export function TargetingOverview({ adGroup }: { adGroup: AdGroup }) {
  const [scores, setScores] = useState(() => calculateTargetingScores(adGroup));

  useEffect(() => {
    setScores(calculateTargetingScores(adGroup));
  }, [adGroup]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Semantic Targeting Summary</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Context Themes</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.context.themes.map((theme, index) => (
                  <Badge key={index} variant="secondary">
                    {theme.value} ({theme.matchType})
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">User Intent</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.intent.map((intent, index) => (
                  <Badge key={index} variant="secondary">
                    {intent.value} ({intent.matchType})
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Context Exclusions</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.context.exclusions.map((exclusion, index) => (
                  <Badge key={index} variant="destructive">
                    {exclusion}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">Keyword Targeting Summary</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Main Keywords</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.keywordRules.main.map((keyword, index) => (
                  <Badge key={index} variant="default">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Must Include</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.keywordRules.mustInclude.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Negative Keywords</p>
              <div className="flex flex-wrap gap-2">
                {adGroup.keywordRules.negative.map((keyword, index) => (
                  <Badge key={index} variant="destructive">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <TargetingInsights 
        insights={scores.suggestions.map(suggestion => ({
          type: "suggestion",
          message: suggestion
        }))}
        score={scores.overall}
      />

      <ExampleMatches />
    </div>
  );
}