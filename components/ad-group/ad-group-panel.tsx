"use client";

import { AdGroup } from "@/types/ad-group";
import { UnifiedTargeting } from "@/components/targeting/unified-targeting";
import { Demographics } from "@/components/ad-group/demographics";
import { DeviceTargeting } from "@/components/ad-group/device-targeting";
import { BudgetSchedule } from "@/components/ad-group/budget-schedule";
import { PerformanceEstimates } from "@/components/targeting/performance-estimates";

interface AdGroupPanelProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function AdGroupPanel({ adGroup, onChange }: AdGroupPanelProps) {
  return (
    <div className="grid grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-6">
        <UnifiedTargeting adGroup={adGroup} onChange={onChange} />
        <Demographics adGroup={adGroup} onChange={onChange} />
        <DeviceTargeting adGroup={adGroup} onChange={onChange} />
        <BudgetSchedule adGroup={adGroup} onChange={onChange} />
      </div>
      
      <div className="relative">
        <div className="sticky top-6">
          <PerformanceEstimates adGroup={adGroup} />
        </div>
      </div>
    </div>
  );
}