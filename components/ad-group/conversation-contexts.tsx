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
        targeting: {
          ...adGroup.targeting,
          contexts: [...adGroup.targeting.contexts, newContext.trim()],
        },
      });
      setNewContext("");
    }
  };

  const removeContext = (context: string) => {
    onChange({
      ...adGroup,
      targeting: {
        ...adGroup.targeting,
        contexts: adGroup.targeting.contexts.filter((c) => c !== context),
      },
    });
  };

  const addExcludedContext = () => {
    if (newExcludedContext.trim()) {
      onChange({
        ...adGroup,
        targeting: {
          ...adGroup.targeting,
          excludedContexts: [...adGroup.targeting.excludedContexts, newExcludedContext.trim()],
        },
      });
      setNewExcludedContext("");
    }
  };

  const removeExcludedContext = (context: string) => {
    onChange({
      ...adGroup,
      targeting: {
        ...adGroup.targeting,
        excludedContexts: adGroup.targeting.excludedContexts.filter((c) => c !== context),
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
            {adGroup.targeting.contexts.map((context) => (
              <Badge key={context} variant="secondary">
                {context}
                <button onClick={() => removeContext(context)} className="ml-2">
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
            {adGroup.targeting.excludedContexts.map((context) => (
              <Badge key={context} variant="destructive">
                {context}
                <button onClick={() => removeExcludedContext(context)} className="ml-2">
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