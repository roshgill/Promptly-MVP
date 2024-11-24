"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MessageCircle,
  Bot,
  User,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";

interface ExampleMatch {
  id: string;
  topic: string;
  matchScore: number;
  matchedCriteria: string[];
  conversation: {
    role: "user" | "assistant";
    content: string;
    matches?: string[];
  }[];
}

const EXAMPLE_MATCHES: ExampleMatch[] = [
  {
    id: "1",
    topic: "Product Research",
    matchScore: 92,
    matchedCriteria: ["research", "product inquiry", "high intent"],
    conversation: [
      {
        role: "user",
        content: "I need help finding a good laptop for video editing.",
        matches: ["purchase intent", "product research"],
      },
      {
        role: "assistant",
        content: "I'd be happy to help you find a suitable laptop for video editing. What's your budget range?",
        matches: ["budget discussion", "professional tools"],
      },
    ],
  },
  // Add more examples...
];

export function ExampleMatches() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const toggleExpanded = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Example Matches</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={showDetails}
              onCheckedChange={setShowDetails}
            />
            <span className="text-sm">Show Details</span>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Examples
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {EXAMPLE_MATCHES.map((match) => (
            <Collapsible
              key={match.id}
              open={expanded.includes(match.id)}
              onOpenChange={() => toggleExpanded(match.id)}
            >
              <Card className="p-4">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="font-medium">{match.topic}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        Match Score: {match.matchScore}%
                      </Badge>
                      {expanded.includes(match.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4 space-y-4">
                  {showDetails && (
                    <div className="bg-muted p-3 rounded-lg space-y-2">
                      <h4 className="font-medium">Matched Criteria</h4>
                      <div className="flex flex-wrap gap-2">
                        {match.matchedCriteria.map((criteria, idx) => (
                          <Badge key={idx} variant="outline">
                            {criteria}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {match.conversation.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 ${
                          message.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Bot className="w-6 h-6 text-primary mt-1" />
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {showDetails && message.matches && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.matches.map((match, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {match}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.role === "user" && (
                          <User className="w-6 h-6 text-primary mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}