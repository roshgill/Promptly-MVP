"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdGroup, DeviceType, OperatingSystem } from "@/types/ad-group";
import { Button } from "@/components/ui/button";

const DEVICE_TYPES: { value: DeviceType; label: string }[] = [
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
];

const OPERATING_SYSTEMS: { value: OperatingSystem; label: string }[] = [
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
  { value: "windows", label: "Windows" },
];

interface DeviceTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function DeviceTargeting({ adGroup, onChange }: DeviceTargetingProps) {
  const toggleDeviceType = (type: DeviceType) => {
    const types = adGroup.devices.types.includes(type)
      ? adGroup.devices.types.filter((t) => t !== type)
      : [...adGroup.devices.types, type];
    onChange({
      ...adGroup,
      devices: { ...adGroup.devices, types },
    });
  };

  const toggleOS = (os: OperatingSystem) => {
    const operatingSystems = adGroup.devices.operatingSystems.includes(os)
      ? adGroup.devices.operatingSystems.filter((o) => o !== os)
      : [...adGroup.devices.operatingSystems, os];
    onChange({
      ...adGroup,
      devices: { ...adGroup.devices, operatingSystems },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Device Targeting</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Device Types</Label>
          <div className="flex gap-2">
            {DEVICE_TYPES.map((device) => (
              <Button
                key={device.value}
                variant={adGroup.devices.types.includes(device.value) ? "default" : "outline"}
                onClick={() => toggleDeviceType(device.value)}
              >
                {device.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Operating Systems</Label>
          <div className="flex gap-2">
            {OPERATING_SYSTEMS.map((os) => (
              <Button
                key={os.value}
                variant={adGroup.devices.operatingSystems.includes(os.value) ? "default" : "outline"}
                onClick={() => toggleOS(os.value)}
              >
                {os.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}