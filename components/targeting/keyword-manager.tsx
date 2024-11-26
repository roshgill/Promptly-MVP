"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KeywordManagerProps {
  keywords: {
    required: string[];
    optional: string[];
    negative: string[];
  };
  onChange: (keywords: {
    required: string[];
    optional: string[];
    negative: string[];
  }) => void;
}

export function KeywordManager({ keywords, onChange }: KeywordManagerProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"required" | "optional" | "negative">("required");

  const addKeyword = () => {
    if (newKeyword.trim()) {
      onChange({
        ...keywords,
        [selectedType]: [...keywords[selectedType], newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (type: keyof typeof keywords, keyword: string) => {
    onChange({
      ...keywords,
      [type]: keywords[type].filter((k) => k !== keyword),
    });
  };

  return (
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
          <Button onClick={addKeyword}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Required Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.required.map((keyword) => (
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
          <h3 className="text-sm font-medium mb-2">Optional Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.optional.map((keyword) => (
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
          <h3 className="text-sm font-medium mb-2">Negative Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.negative.map((keyword) => (
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
  );
}