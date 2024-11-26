"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextAd, AdTone } from "@/types/ad";
import { Sparkles, Wand2, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AISuggestionsProps {
  ad: Partial<TextAd>;
  onApplySuggestion: (field: keyof TextAd, value: string) => void;
}

const TONE_ANALYSIS = {
  professional: {
    keywords: ["efficient", "proven", "expert", "solution"],
    style: ["Clear", "Direct", "Authoritative"],
    score: 85,
  },
  casual: {
    keywords: ["hey", "amazing", "awesome", "great"],
    style: ["Friendly", "Relaxed", "Conversational"],
    score: 75,
  },
  persuasive: {
    keywords: ["transform", "discover", "exclusive", "limited"],
    style: ["Compelling", "Action-oriented", "Urgent"],
    score: 90,
  },
};

export function AISuggestions({ ad, onApplySuggestion }: AISuggestionsProps) {
  const currentTone = ad.tone || "professional";
  const analysis = TONE_ANALYSIS[currentTone as keyof typeof TONE_ANALYSIS];

  const suggestions = {
    name: [
      "Transform Your Business Today",
      "Unlock Premium Features Now",
      "Discover Limitless Possibilities",
    ],
    content: [
      "Experience enterprise-grade solutions designed for modern businesses. Boost efficiency by 50%.",
      "Join industry leaders who've transformed their operations with our cutting-edge platform.",
      "Streamline your workflow with AI-powered automation. Save time and reduce costs.",
    ],
    callToAction: [
      "Start Free Trial",
      "Book Demo Now",
      "Get Started",
    ],
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">AI Writing Assistant</h3>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tone Analysis</span>
              <span className="text-sm text-muted-foreground">{analysis.score}%</span>
            </div>
            <Progress value={analysis.score} />
            <div className="flex flex-wrap gap-2 mt-2">
              {analysis.style.map((style) => (
                <Badge key={style} variant="outline">
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Title Suggestions</h4>
              <div className="space-y-2">
                {suggestions.name.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => onApplySuggestion("name", suggestion)}
                  >
                    <span>{suggestion}</span>
                    <Wand2 className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Content Suggestions</h4>
              <div className="space-y-2">
                {suggestions.content.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => onApplySuggestion("content", suggestion)}
                  >
                    <span className="text-left">{suggestion}</span>
                    <Sparkles className="w-4 h-4 flex-shrink-0 ml-2" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Call-to-Action Suggestions</h4>
              <div className="grid grid-cols-3 gap-2">
                {suggestions.callToAction.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => onApplySuggestion("callToAction", suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}