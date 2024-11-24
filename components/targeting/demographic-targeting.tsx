"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface DemographicTargetingProps {
  demographics: {
    locations: string[];
    ageRange: {
      min: number;
      max: number;
    };
    gender: "all" | "male" | "female";
  };
  onChange: (demographics: {
    locations: string[];
    ageRange: {
      min: number;
      max: number;
    };
    gender: "all" | "male" | "female";
  }) => void;
}

export function DemographicTargeting({
  demographics,
  onChange,
}: DemographicTargetingProps) {
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (newLocation.trim() && !demographics.locations.includes(newLocation.trim())) {
      onChange({
        ...demographics,
        locations: [...demographics.locations, newLocation.trim()],
      });
      setNewLocation("");
    }
  };

  const removeLocation = (location: string) => {
    onChange({
      ...demographics,
      locations: demographics.locations.filter((l) => l !== location),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Locations</Label>
        <div className="flex gap-4">
          <Input
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Add location"
            onKeyDown={(e) => e.key === "Enter" && addLocation()}
          />
          <Button onClick={addLocation}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {demographics.locations.map((location) => (
            <Badge key={location} variant="secondary">
              {location}
              <button
                onClick={() => removeLocation(location)}
                className="ml-2"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label>Age Range</Label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="number"
                min="13"
                max="100"
                value={demographics.ageRange.min}
                onChange={(e) =>
                  onChange({
                    ...demographics,
                    ageRange: {
                      ...demographics.ageRange,
                      min: parseInt(e.target.value),
                    },
                  })
                }
              />
            </div>
            <span>to</span>
            <div className="flex-1">
              <Input
                type="number"
                min="13"
                max="100"
                value={demographics.ageRange.max}
                onChange={(e) =>
                  onChange({
                    ...demographics,
                    ageRange: {
                      ...demographics.ageRange,
                      max: parseInt(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Gender</Label>
          <Select
            value={demographics.gender}
            onValueChange={(value: "all" | "male" | "female") =>
              onChange({ ...demographics, gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}