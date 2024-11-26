"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Sparkles, RefreshCw } from "lucide-react";
import { TextAd } from "@/types/ad";

interface AICopyToolsProps {
  ad: Partial<TextAd>;
  onApplySuggestion: (field: keyof TextAd, value: string) => void;
}

const TONE_PRESETS = [
  { name: "Professional", color: "default" },
  { name: "Casual", color: "secondary" },
  { name: "Urgent", color: "destructive" },
  { name: "Friendly", color: "default" },
  { name: "Technical", color: "secondary" },
  { name: "Persuasive", color: "default" },
] as const;

const HEADLINE_SUGGESTIONS = {
  professional: [
    "Maximize Your Laptop's Performance",
    "Enterprise-Grade Computing Solutions",
    "Professional-Grade Hardware Upgrades",
  ],
  casual: [
    "Ready for a Faster Laptop?",
    "Say Goodbye to Slow Computing",
    "Level Up Your Tech Game",
  ],
  urgent: [
    "Don't Wait - Upgrade Today!",
    "Limited Time Performance Boost",
    "Act Now: Speed Upgrade Available",
  ],
  friendly: [
    "Let's Make Your Laptop Faster",
    "Your Perfect Tech Companion",
    "Discover Better Computing",
  ],
  technical: [
    "Optimize CPU & RAM Performance",
    "Advanced Hardware Solutions",
    "Technical Performance Boost",
  ],
  persuasive: [
    "Experience the Speed Difference",
    "Transform Your Computing Today",
    "Unlock Premium Performance",
  ],
};

const CONTENT_VARIATIONS = {
  professional: [
    "Enhance your computing experience with our professional-grade performance solutions. Designed for optimal efficiency and reliability.",
    "Industry-leading technology optimized for professional workflows. Experience superior performance and productivity.",
  ],
  casual: [
    "Looking for a faster laptop? We've got you covered! Quick and easy upgrades that make a real difference.",
    "No more waiting around for your computer to catch up. Get the speed you need without the hassle.",
  ],
  urgent: [
    "Limited time offer: Transform your laptop's performance today. Don't miss out on this exclusive upgrade opportunity!",
    "Immediate performance boost available now. Take advantage of this special offer while supplies last!",
  ],
  friendly: [
    "We know how frustrating a slow computer can be. Let's work together to find the perfect solution for you.",
    "Ready to enjoy a smoother computing experience? We're here to help you every step of the way.",
  ],
  technical: [
    "Utilizing advanced algorithms and hardware optimization, our solution delivers up to 200% performance improvement.",
    "Comprehensive system analysis and targeted upgrades provide measurable performance enhancements across all metrics.",
  ],
  persuasive: [
    "Join thousands of satisfied users who've transformed their computing experience. See the difference for yourself.",
    "Don't settle for mediocre performance when excellence is within reach. Upgrade to the solution professionals trust.",
  ],
};

export function AICopyTools({ ad, onApplySuggestion }: AICopyToolsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">AI Copy Generation</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate All
        </Button>
      </div>

      <Tabs defaultValue="headlines">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="headlines">Headlines</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Select Tone</h4>
          <div className="flex flex-wrap gap-2">
            {TONE_PRESETS.map((tone) => (
              <Badge
                key={tone.name}
                variant={tone.color}
                className="cursor-pointer hover:opacity-80"
              >
                {tone.name}
              </Badge>
            ))}
          </div>
        </div>

        <TabsContent value="headlines">
          <div className="space-y-4">
            {Object.entries(HEADLINE_SUGGESTIONS).map(([tone, suggestions]) => (
              <div key={tone} className="space-y-2">
                <p className="text-sm text-muted-foreground capitalize">{tone} Tone</p>
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onApplySuggestion("name", suggestion)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{suggestion}</p>
                      <Button variant="ghost" size="sm">
                        <Wand2 className="w-4 h-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-4">
            {Object.entries(CONTENT_VARIATIONS).map(([tone, variations]) => (
              <div key={tone} className="space-y-2">
                <p className="text-sm text-muted-foreground capitalize">{tone} Tone</p>
                {variations.map((variation, index) => (
                  <Card
                    key={index}
                    className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onApplySuggestion("content", variation)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{variation}</p>
                      <Button variant="ghost" size="sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}