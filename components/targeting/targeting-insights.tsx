"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Lightbulb, Target } from "lucide-react";

interface TargetingInsight {
  type: "warning" | "suggestion" | "success";
  message: string;
}

interface TargetingInsightsProps {
  insights: TargetingInsight[];
  score: number;
}

export function TargetingInsights({ insights, score }: TargetingInsightsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Targeting Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Effectiveness</span>
              <span className="font-medium">{score}%</span>
            </div>
            <Progress value={score} />
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted"
            >
              {insight.type === "warning" && (
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              )}
              {insight.type === "suggestion" && (
                <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
              )}
              {insight.type === "success" && (
                <Target className="w-5 h-5 text-green-500 mt-0.5" />
              )}
              <p className="text-sm">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}