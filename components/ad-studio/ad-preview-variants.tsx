"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAd } from "@/types/ad";
import { ExternalLink, MessageSquare, User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdPreviewVariantsProps {
  ad: Partial<TextAd>;
  showContextual?: boolean;
}

const PREVIEW_CONTEXTS = [
  {
    type: "chat",
    messages: [
      { role: "user", content: "I need help finding a solution for my business." },
      { role: "assistant", content: "I'd be happy to help. What specific challenges are you facing?" },
    ],
  },
  {
    type: "search",
    query: "best business automation tools",
    relatedSearches: ["productivity software", "workflow automation", "business tools"],
  },
];

export function AdPreviewVariants({ ad, showContextual = true }: AdPreviewVariantsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Live Preview</h3>
          <Badge variant="outline">
            {ad.tone || "Default"} Tone
          </Badge>
        </div>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Standard Ad Preview */}
            <Card className="p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Standard Display</h4>
              <div className="p-4 rounded-lg bg-background border">
                <div className="space-y-2">
                  {ad.previewUrl && (
                    <div className="text-xs text-muted-foreground flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {new URL(ad.previewUrl).hostname}
                    </div>
                  )}
                  <h3 className="text-primary font-medium line-clamp-2 hover:underline cursor-pointer">
                    {ad.name || "Your ad name will appear here"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {ad.content || "Your ad content will appear here"}
                  </p>
                  {ad.callToAction && (
                    <button className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                      {ad.callToAction}
                    </button>
                  )}
                </div>
              </div>
            </Card>

            {/* Contextual Previews */}
            {showContextual && PREVIEW_CONTEXTS.map((context, idx) => (
              <Card key={idx} className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {context.type === "chat" ? "Chat Context" : "Search Context"}
                </h4>
                {context.type === "chat" ? (
                  <div className="space-y-4">
                    {context.messages.map((message, mIdx) => (
                      <div
                        key={mIdx}
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
                    ))}
                    <div className="border-l-2 border-primary pl-4 py-2">
                      <p className="text-xs text-muted-foreground">Sponsored</p>
                      <div className="bg-muted rounded-lg p-4 mt-2">
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
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Search: {context.query}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {context.relatedSearches.map((search, sIdx) => (
                          <Badge key={sIdx} variant="outline">
                            {search}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="border-l-2 border-primary pl-4">
                      <p className="text-xs text-muted-foreground">Ad</p>
                      <div className="mt-2">
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
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}