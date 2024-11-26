"use client";

import { Card } from "@/components/ui/card";
import { KeywordManager } from "./keyword-manager";
import { DemographicTargeting } from "./demographic-targeting";
import { Campaign } from "@/types/campaign";

interface TargetingPanelProps {
  targeting: Campaign["targeting"];
  onChange: (targeting: Campaign["targeting"]) => void;
}

export function TargetingPanel({ targeting, onChange }: TargetingPanelProps) {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Keyword Targeting</h3>
        <KeywordManager
          keywords={{
            required: targeting.keywords,
            optional: [],
            negative: [],
          }}
          onChange={(keywords) =>
            onChange({
              ...targeting,
              keywords: keywords.required,
            })
          }
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Demographic Targeting</h3>
        <DemographicTargeting
          demographics={{
            locations: targeting.locations,
            ageRange: targeting.ageRange,
            gender: targeting.gender,
          }}
          onChange={(demographics) =>
            onChange({
              ...targeting,
              ...demographics,
            })
          }
        />
      </Card>
    </div>
  );
}