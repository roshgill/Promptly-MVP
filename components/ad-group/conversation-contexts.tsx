"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AdGroup } from "@/types/ad-group";

interface ConversationContextsProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function ConversationContexts({ adGroup, onChange }: ConversationContextsProps) {
  const [newContext, setNewContext] = useState("");
  const [newExcludedContext, setNewExcludedContext] = useState("");

  const addContext = () => {
    if (newContext.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          context: {
            ...adGroup.semanticTargeting.context,
            themes: [...adGroup.semanticTargeting.context.themes, { value: newContext.trim(), matchType: "exact" }],
          },
        },
      });
      setNewContext("");
    }
  };

  const removeContext = (context: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          themes: adGroup.semanticTargeting.context.themes.filter((c) => c.value !== context),
        },
      },
    });
  };

  const addExcludedContext = () => {
    if (newExcludedContext.trim()) {
      onChange({
        ...adGroup,
        semanticTargeting: {
          ...adGroup.semanticTargeting,
          context: {
            ...adGroup.semanticTargeting.context,
            exclusions: [...adGroup.semanticTargeting.context.exclusions, { value: newExcludedContext.trim(), matchType: "exact" }],
          },
        },
      });
      setNewExcludedContext("");
    }
  };

  const removeExcludedContext = (context: string) => {
    onChange({
      ...adGroup,
      semanticTargeting: {
        ...adGroup.semanticTargeting,
        context: {
          ...adGroup.semanticTargeting.context,
          exclusions: adGroup.semanticTargeting.context.exclusions.filter((c) => c.value !== context),
        },
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Conversation Contexts</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Target Contexts</Label>
          <div className="flex gap-2">
            <Input
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              placeholder="Enter conversation context (e.g., product recommendations)"
              onKeyDown={(e) => e.key === "Enter" && addContext()}
            />
            <Button onClick={addContext}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.context.themes.map((context) => (
              <Badge key={context.value} variant="secondary">
                {context.value}
                <button onClick={() => removeContext(context.value)} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Excluded Contexts</Label>
          <div className="flex gap-2">
            <Input
              value={newExcludedContext}
              onChange={(e) => setNewExcludedContext(e.target.value)}
              placeholder="Enter contexts to exclude (e.g., product complaints)"
              onKeyDown={(e) => e.key === "Enter" && addExcludedContext()}
            />
            <Button onClick={addExcludedContext}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {adGroup.semanticTargeting.context.exclusions.map((context) => (
              <Badge key={context.value} variant="destructive">
                {context.value}
                <button onClick={() => removeExcludedContext(context.value)} className="ml-2">
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