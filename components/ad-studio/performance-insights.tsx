"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TextAd } from "@/types/ad";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PerformanceInsightsProps {
  ad: Partial<TextAd>;
}

interface Insight {
  type: "success" | "warning" | "info";
  message: string;
  score: number;
  details: string;
}

export function PerformanceInsights({ ad }: PerformanceInsightsProps) {
  const insights: Insight[] = [
    {
      type: "success",
      message: "Strong Call-to-Action",
      score: 95,
      details: "Clear and action-oriented CTA that creates urgency",
    },
    {
      type: "warning",
      message: "Content Length",
      score: 70,
      details: "Consider adding more specific benefits or features",
    },
    {
      type: "info",
      message: "Keyword Optimization",
      score: 85,
      details: "Good keyword usage, consider adding industry-specific terms",
    },
  ];

  const getIcon = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const overallScore = Math.round(
    insights.reduce((acc, insight) => acc + insight.score, 0) / insights.length
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Performance Insights</h3>
          <Badge variant={overallScore >= 90 ? "default" : "secondary"}>
            Score: {overallScore}%
          </Badge>
        </div>

        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(insight.type)}
                  <span className="font-medium">{insight.message}</span>
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Badge variant="outline">{insight.score}%</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">{insight.details}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Progress value={insight.score} />
            </div>
          ))}
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Optimization Tips</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Use power words to create emotional impact
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Include specific numbers or statistics
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Test different call-to-action variations
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}