"use client";

import { Card } from "@/components/ui/card";
import { TextAd } from "@/types/ad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface PreviewGeneratorProps {
  ad: Partial<TextAd>;
}

const SAMPLE_CONVERSATIONS = [
  {
    topic: "Product Research",
    context: "high-intent",
    messages: [
      { role: "user", content: "I need recommendations for a good laptop for video editing" },
      { role: "assistant", content: "I can help you find the right laptop. What's your budget range?" },
      { role: "user", content: "Around $2000, I want something powerful and reliable" },
      { role: "ad", content: null }, // Ad placement opportunity
      { role: "assistant", content: "Before I suggest specific models, let me share some key features to look for in a video editing laptop..." },
    ],
  },
  {
    topic: "Technical Support",
    context: "problem-solving",
    messages: [
      { role: "user", content: "My laptop keeps freezing when I run multiple applications" },
      { role: "assistant", content: "Let's troubleshoot this issue. When did you first notice the problem?" },
      { role: "user", content: "It started about a week ago, especially when using Chrome" },
      { role: "ad", content: null }, // Ad placement opportunity
      { role: "assistant", content: "I understand how frustrating this can be. Let's check a few things..." },
    ],
  },
  {
    topic: "Software Comparison",
    context: "research",
    messages: [
      { role: "user", content: "What's better for video editing, Premiere Pro or Final Cut?" },
      { role: "assistant", content: "Both have their strengths. Final Cut is Mac-only but generally faster, while Premiere..." },
      { role: "ad", content: null }, // Ad placement opportunity
      { role: "user", content: "I mainly work with 4K footage, if that helps" },
    ],
  },
];

export function PreviewGenerator({ ad }: PreviewGeneratorProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Live Preview</h3>
        <Select defaultValue="mobile">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile">Mobile View</SelectItem>
            <SelectItem value="desktop">Desktop View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {SAMPLE_CONVERSATIONS.map((conversation, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="font-medium">{conversation.topic}</span>
                </div>
                <Badge variant="secondary">{conversation.context}</Badge>
              </div>

              <div className="space-y-4">
                {conversation.messages.map((message, index) => {
                  if (message.role === "ad") {
                    return (
                      <div key={index} className="border-l-2 border-primary pl-4 py-2 space-y-2">
                        <p className="text-xs text-muted-foreground">Sponsored</p>
                        <div className="bg-muted rounded-lg p-4">
                          <h4 className="font-medium text-primary hover:underline cursor-pointer">
                            {ad.name || "Your ad title will appear here"}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {ad.content || "Your ad content will appear here"}
                          </p>
                          {ad.callToAction && (
                            <button className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                              {ad.callToAction}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
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
                      </div>
                      {message.role === "user" && (
                        <User className="w-6 h-6 text-primary mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}