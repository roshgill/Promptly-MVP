"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { AdGroup } from "@/types/ad-group";

interface BasicDetailsProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function BasicDetails({ adGroup, onChange }: BasicDetailsProps) {
  const [newLocation, setNewLocation] = useState("");
  const [newExcludedLocation, setNewExcludedLocation] = useState("");

  const addLocation = (type: 'included' | 'excluded') => {
    const value = type === 'included' ? newLocation : newExcludedLocation;
    if (value.trim()) {
      onChange({
        ...adGroup,
        locations: {
          ...adGroup.locations,
          [type]: [...adGroup.locations[type], value.trim()],
        },
      });
      if (type === 'included') {
        setNewLocation("");
      } else {
        setNewExcludedLocation("");
      }
    }
  };

  const removeLocation = (type: 'included' | 'excluded', location: string) => {
    onChange({
      ...adGroup,
      locations: {
        ...adGroup.locations,
        [type]: adGroup.locations[type].filter((l) => l !== location),
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Basic Details</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Ad Group Name</Label>
          <Input
            value={adGroup.name}
            onChange={(e) => onChange({ ...adGroup, name: e.target.value })}
            placeholder="Enter ad group name"
          />
        </div>

        <div className="space-y-4">
          <Label>Target Locations</Label>
          <div className="flex gap-2">
            <Input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Add location to target"
              onKeyDown={(e) => e.key === "Enter" && addLocation('included')}
            />
            <Button onClick={() => addLocation('included')}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {adGroup.locations.included.map((location) => (
              <Badge key={location} variant="secondary">
                {location}
                <button
                  onClick={() => removeLocation('included', location)}
                  className="ml-2"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Excluded Locations</Label>
          <div className="flex gap-2">
            <Input
              value={newExcludedLocation}
              onChange={(e) => setNewExcludedLocation(e.target.value)}
              placeholder="Add location to exclude"
              onKeyDown={(e) => e.key === "Enter" && addLocation('excluded')}
            />
            <Button onClick={() => addLocation('excluded')}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {adGroup.locations.excluded.map((location) => (
              <Badge key={location} variant="destructive">
                {location}
                <button
                  onClick={() => removeLocation('excluded', location)}
                  className="ml-2"
                >
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