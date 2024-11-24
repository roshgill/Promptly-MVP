"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdGroup } from "@/types/ad-group";
import { MessageCircle, Bot, User, AlertCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Message {
  role: "user" | "assistant";
  content: string;
  matchedCriteria?: string[];
}

interface Conversation {
  id: string;
  topic: string;
  messages: Message[];
  matchScore: number;
}

interface ConversationPreviewProps {
  adGroup: AdGroup;
  strict: boolean;
}

const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    topic: "Product Recommendation",
    matchScore: 0.95,
    messages: [
      {
        role: "user",
        content: "I need help finding a good laptop for video editing.",
        matchedCriteria: ["purchase intent", "product research"],
      },
      {
        role: "assistant",
        content: "I'd be happy to help you find a suitable laptop for video editing. What's your budget range?",
        matchedCriteria: ["budget discussion", "professional tools"],
      },
      {
        role: "user",
        content: "Around $2000, I want something powerful and reliable.",
        matchedCriteria: ["high-end", "quality focus"],
      },
    ],
  },
  {
    id: "2",
    topic: "Technical Support",
    matchScore: 0.75,
    messages: [
      {
        role: "user",
        content: "My laptop is running really slow lately.",
        matchedCriteria: ["tech support", "performance issues"],
      },
      {
        role: "assistant",
        content: "Let's troubleshoot this together. When did you first notice the slowdown?",
        matchedCriteria: ["problem solving", "technical discussion"],
      },
    ],
  },
  {
    id: "3",
    topic: "Software Comparison",
    matchScore: 0.85,
    messages: [
      {
        role: "user",
        content: "What's better for video editing, Premiere Pro or Final Cut?",
        matchedCriteria: ["comparison", "software discussion"],
      },
      {
        role: "assistant",
        content: "Both have their strengths. Final Cut is Mac-only but generally faster, while Premiere Pro offers more flexibility...",
        matchedCriteria: ["product comparison", "professional tools"],
      },
    ],
  },
];

export function ConversationPreview({ adGroup, strict }: ConversationPreviewProps) {
  const getMatchIndicator = (score: number) => {
    if (score >= 0.9) return "Excellent";
    if (score >= 0.7) return "Good";
    return "Fair";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Live Preview</h3>
        <Badge variant={strict ? "default" : "secondary"}>
          {strict ? "Strict" : "Flexible"} Matching
        </Badge>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {SAMPLE_CONVERSATIONS.map((conversation) => (
            <Card key={conversation.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="font-medium">{conversation.topic}</span>
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Badge variant={conversation.matchScore >= 0.9 ? "default" : "secondary"}>
                      {getMatchIndicator(conversation.matchScore)} Match
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Match Score: {(conversation.matchScore * 100).toFixed(0)}%</p>
                      <p className="text-sm text-muted-foreground">
                        Based on semantic relevance and keyword matches
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              <div className="space-y-4">
                {conversation.messages.map((message, index) => (
                  <div
                    key={index}
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
                      {message.matchedCriteria && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.matchedCriteria.map((criteria) => (
                            <Badge
                              key={criteria}
                              variant="outline"
                              className="text-xs"
                            >
                              {criteria}
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

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Ad placement opportunity detected</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}