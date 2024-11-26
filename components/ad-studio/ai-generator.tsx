"use client";

import { useState } from "react";
import { TextAd } from "@/types/ad";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIGeneratorProps {
  onGenerate: (ad: Partial<TextAd>) => void;
  onClose: () => void;
}

// Simulated AI generation - In a real app, this would call an AI service
const generateAds = async (description: string, count: number): Promise<Partial<TextAd>[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return Array.from({ length: count }, (_, i) => ({
    name: `${description.slice(0, 30)}... - Version ${i + 1}`,
    content: `Experience the future of ${description}. Our innovative solution delivers exceptional results with cutting-edge technology.`,
    callToAction: "Get Started Today",
    previewUrl: "https://example.com",
  }));
};

export function AIGenerator({ onGenerate, onClose }: AIGeneratorProps) {
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<Partial<TextAd>[]>([]);

  const handleGenerate = async () => {
    if (!description) return;

    setIsGenerating(true);
    try {
      const ads = await generateAds(description, count);
      setGeneratedAds(ads);
    } catch (error) {
      console.error("Failed to generate ads:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Ad Generator</DialogTitle>
          <DialogDescription>
            Describe your product or service, and our AI will generate multiple ad variations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your product, service, or campaign objective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Number of Variations</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!description || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            Generate Ads
          </Button>

          {generatedAds.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Generated Variations</h4>
              <div className="space-y-4">
                {generatedAds.map((ad, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-accent/5 cursor-pointer"
                    onClick={() => onGenerate(ad)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{ad.name}</h5>
                      <Badge variant="outline">Variation {index + 1}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {ad.content}
                    </p>
                    <Button variant="secondary" size="sm">
                      {ad.callToAction}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}