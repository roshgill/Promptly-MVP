"use client";

import { TextAd } from "@/types/ad";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface AdPreviewProps {
  ad: Partial<TextAd>;
}

export function AdPreview({ ad }: AdPreviewProps) {
  return (
    <Card className="p-6 bg-card">
      <h2 className="text-lg font-semibold mb-6">Ad Preview</h2>
      <div className="space-y-6">
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

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Character Count</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ad Name</span>
              <span className="text-muted-foreground">
                {ad.name?.length || 0} characters
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Ad Content</span>
              <span className="text-muted-foreground">
                {ad.content?.length || 0} characters
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Call to Action</span>
              <span className="text-muted-foreground">
                {ad.callToAction?.length || 0} characters
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}