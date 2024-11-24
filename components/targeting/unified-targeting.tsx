"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SemanticTargeting } from "@/components/targeting/semantic-targeting";
import { KeywordTargeting } from "@/components/targeting/keyword-targeting";
import { TargetingOverview } from "@/components/targeting/targeting-overview";
import { AppTypeSelector } from "@/components/targeting/app-type-selector";
import { TargetingModeLabel } from "@/components/targeting/targeting-mode-label";
import { AdGroup } from "@/types/ad-group";

interface UnifiedTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function UnifiedTargeting({ adGroup, onChange }: UnifiedTargetingProps) {
  const handleAppTypesChange = (appTypes: AdGroup["appTypes"]) => {
    onChange({
      ...adGroup,
      appTypes,
    });
  };

  return (
    <div className="space-y-6">
      <AppTypeSelector
        selectedTypes={adGroup.appTypes || ["all"]}
        onChange={handleAppTypesChange}
      />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Unified Targeting</h3>
          <TargetingModeLabel mode={adGroup.targetingMode} />
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
            <TabsTrigger value="keyword">Keyword</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TargetingOverview adGroup={adGroup} />
          </TabsContent>

          <TabsContent value="semantic">
            <SemanticTargeting
              adGroup={adGroup}
              onChange={onChange}
            />
          </TabsContent>

          <TabsContent value="keyword">
            <KeywordTargeting
              adGroup={adGroup}
              onChange={onChange}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}