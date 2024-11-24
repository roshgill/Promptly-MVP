"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AdGroup } from "@/types/ad-group";

interface KeywordsProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function Keywords({ adGroup, onChange }: KeywordsProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"required" | "optional" | "negative">("required");

  const addKeyword = () => {
    if (newKeyword.trim()) {
      onChange({
        ...adGroup,
        targeting: {
          ...adGroup.targeting,
          keywords: {
            ...adGroup.targeting.keywords,
            [selectedType]: [...adGroup.targeting.keywords[selectedType], newKeyword.trim()],
          },
        },
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (type: keyof typeof adGroup.targeting.keywords, keyword: string) => {
    onChange({
      ...adGroup,
      targeting: {
        ...adGroup.targeting,
        keywords: {
          ...adGroup.targeting.keywords,
          [type]: adGroup.targeting.keywords[type].filter((k) => k !== keyword),
        },
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Keywords</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Enter a keyword"
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
            />
            <div className="flex gap-2">
              <Button
                variant={selectedType === "required" ? "default" : "outline"}
                onClick={() => setSelectedType("required")}
              >
                Required
              </Button>
              <Button
                variant={selectedType === "optional" ? "default" : "outline"}
                onClick={() => setSelectedType("optional")}
              >
                Optional
              </Button>
              <Button
                variant={selectedType === "negative" ? "default" : "outline"}
                onClick={() => setSelectedType("negative")}
              >
                Negative
              </Button>
            </div>
            <Button onClick={addKeyword}>Add</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Required Keywords</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.targeting.keywords.required.map((keyword) => (
                <Badge key={keyword} variant="default">
                  {keyword}
                  <button
                    onClick={() => removeKeyword("required", keyword)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Optional Keywords</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.targeting.keywords.optional.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                  <button
                    onClick={() => removeKeyword("optional", keyword)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Negative Keywords</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.targeting.keywords.negative.map((keyword) => (
                <Badge key={keyword} variant="destructive">
                  {keyword}
                  <button
                    onClick={() => removeKeyword("negative", keyword)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}