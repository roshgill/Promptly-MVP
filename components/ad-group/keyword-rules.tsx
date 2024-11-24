"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AdGroup } from "@/types/ad-group";

interface KeywordRulesProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function KeywordRules({ adGroup, onChange }: KeywordRulesProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"main" | "mustInclude" | "boost" | "blocked">("main");

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
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Keyword Rules</h3>
      <div className="space-y-6">
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
                variant={selectedType === "boost" ? "default" : "outline"}
                onClick={() => setSelectedType("boost")}
              >
                Boost
              </Button>
              <Button
                variant={selectedType === "blocked" ? "default" : "outline"}
                onClick={() => setSelectedType("blocked")}
              >
                Blocked
              </Button>
            </div>
            <Button onClick={addKeyword}>Add</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label>Main Keywords (Required)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
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
          </div>

          <div>
            <Label>Must-Include Terms</Label>
            <div className="flex flex-wrap gap-2 mt-2">
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
          </div>

          <div>
            <Label>Boost Terms (Optional)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.keywordRules.boost.map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                  <button
                    onClick={() => removeKeyword("boost", keyword)}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Blocked Terms</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {adGroup.keywordRules.blocked.map((keyword) => (
                <Badge key={keyword} variant="destructive">
                  {keyword}
                  <button
                    onClick={() => removeKeyword("blocked", keyword)}
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