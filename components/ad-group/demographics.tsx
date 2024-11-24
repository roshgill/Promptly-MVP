"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdGroup, AgeRange, Gender } from "@/types/ad-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: "13-17", label: "13-17" },
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55+", label: "55+" },
];

const GENDERS: { value: Gender; label: string }[] = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface DemographicsProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function Demographics({ adGroup, onChange }: DemographicsProps) {
  const toggleAgeRange = (range: AgeRange) => {
    const ageRanges = adGroup.demographics.ageRanges.includes(range)
      ? adGroup.demographics.ageRanges.filter((r) => r !== range)
      : [...adGroup.demographics.ageRanges, range];

    onChange({
      ...adGroup,
      demographics: {
        ...adGroup.demographics,
        ageRanges,
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Demographics</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Age Ranges</Label>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGES.map((range) => (
              <Button
                key={range.value}
                variant={adGroup.demographics.ageRanges.includes(range.value) ? "default" : "outline"}
                onClick={() => toggleAgeRange(range.value)}
                className="flex-1 sm:flex-none"
              >
                {range.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {adGroup.demographics.ageRanges.length === 0
              ? "Select one or more age ranges"
              : `Selected: ${adGroup.demographics.ageRanges.length} ranges`}
          </p>
        </div>

        <div className="space-y-4">
          <Label>Gender</Label>
          <Select
            value={adGroup.demographics.gender}
            onValueChange={(value: Gender) =>
              onChange({
                ...adGroup,
                demographics: { ...adGroup.demographics, gender: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((gender) => (
                <SelectItem key={gender.value} value={gender.value}>
                  {gender.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}