"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AdGroup } from "@/types/ad-group";

interface KeywordTargetingProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function KeywordTargeting({ adGroup, onChange }: KeywordTargetingProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"main" | "mustInclude" | "negative">("main");

  const addKeyword = () => {
    if (newKeyword.trim()) {
      onChange({
        ...adGroup,
        keywordRules: {
          ...adGroup.keywordRules,
          [selectedType]: [...adGroup.keywordRules[selectedType], newKeyword.trim()],
        },
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (type: keyof typeof adGroup.keywordRules, keyword: string) => {
    onChange({
      ...adGroup,
      keywordRules: {
        ...adGroup.keywordRules,
        [type]: adGroup.keywordRules[type].filter((k) => k !== keyword),
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Enter a keyword"
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant={selectedType === "main" ? "default" : "outline"}
                onClick={() => setSelectedType("main")}
              >
                Main
              </Button>
              <Button
                variant={selectedType === "mustInclude" ? "default" : "outline"}
                onClick={() => setSelectedType("mustInclude")}
              >
                Must Include
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
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <Label className="mb-4 block">Main Keywords</Label>
          <div className="flex flex-wrap gap-2">
            {adGroup.keywordRules.main.map((keyword) => (
              <Badge key={keyword} variant="default">
                {keyword}
                <button
                  onClick={() => removeKeyword("main", keyword)}
                  className="ml-2"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <Label className="mb-4 block">Must Include</Label>
          <div className="flex flex-wrap gap-2">
            {adGroup.keywordRules.mustInclude.map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
                <button
                  onClick={() => removeKeyword("mustInclude", keyword)}
                  className="ml-2"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <Label className="mb-4 block">Negative Keywords</Label>
          <div className="flex flex-wrap gap-2">
            {adGroup.keywordRules.negative.map((keyword) => (
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
        </Card>
      </div>
    </div>
  );
}