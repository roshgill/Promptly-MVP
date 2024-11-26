"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Zap, 
  PauseCircle, 
  PlayCircle,
  BarChart,
  Tag,
  Users
} from "lucide-react";

interface LivePlacement {
  id: string;
  timestamp: Date;
  contextType: string;
  matchScore: number;
  targetingSignals: {
    category: string;
    signals: string[];
  }[];
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  };
}

export function LiveMonitor() {
  const [placements, setPlacements] = useState<LivePlacement[]>([]);
  const [paused, setPaused] = useState(false);
  const [totalROI, setTotalROI] = useState({ spend: 0, revenue: 0 });

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const contextTypes = [
        "Product Research",
        "Technical Support",
        "Purchase Intent",
        "Feature Comparison",
        "Price Inquiry"
      ];

      const targetingCategories = [
        {
          category: "User Intent",
          signals: ["Research Phase", "High Intent", "Solution Seeking"]
        },
        {
          category: "Topic Context",
          signals: ["Software", "Technology", "Business Solutions"]
        },
        {
          category: "Engagement Level",
          signals: ["Active Discussion", "Information Gathering", "Decision Stage"]
        }
      ];

      const newPlacement: LivePlacement = {
        id: Date.now().toString(),
        timestamp: new Date(),
        contextType: contextTypes[Math.floor(Math.random() * contextTypes.length)],
        matchScore: 0.75 + Math.random() * 0.2,
        targetingSignals: targetingCategories.map(cat => ({
          category: cat.category,
          signals: [cat.signals[Math.floor(Math.random() * cat.signals.length)]]
        })),
        metrics: {
          impressions: Math.floor(Math.random() * 100),
          clicks: Math.floor(Math.random() * 20),
          conversions: Math.floor(Math.random() * 5),
          spend: Math.random() * 50,
          revenue: Math.random() * 200,
        },
      };

      setPlacements(prev => [newPlacement, ...prev].slice(0, 10));
      setTotalROI(prev => ({
        spend: prev.spend + newPlacement.metrics.spend,
        revenue: prev.revenue + newPlacement.metrics.revenue,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const roi = totalROI.revenue / totalROI.spend;
  const roiColor = roi >= 2 ? "text-green-500" : roi >= 1 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Live Ad Placements</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayCircle className="w-4 h-4 mr-2" />
            ) : (
              <PauseCircle className="w-4 h-4 mr-2" />
            )}
            {paused ? "Resume" : "Pause"}
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
          <AnimatePresence mode="popLayout">
            {placements.map((placement) => (
              <motion.div
                key={placement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-4"
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="font-medium">{placement.contextType}</span>
                      <Badge variant="outline">
                        {new Date(placement.timestamp).toLocaleTimeString()}
                      </Badge>
                    </div>
                    <Badge 
                      variant={placement.matchScore >= 0.9 ? "default" : "secondary"}
                    >
                      Match Score: {(placement.matchScore * 100).toFixed(0)}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {placement.targetingSignals.map((signal, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          {signal.category}
                        </div>
                        {signal.signals.map((s, sIdx) => (
                          <Badge key={sIdx} variant="outline">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-medium">{placement.metrics.impressions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-medium">{placement.metrics.clicks}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium">{placement.metrics.conversions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">${placement.metrics.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Live ROI Tracking
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Spend</span>
                <span className="font-medium">
                  ${totalROI.spend.toFixed(2)}
                </span>
              </div>
              <Progress value={(totalROI.spend / 1000) * 100} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">
                  ${totalROI.revenue.toFixed(2)}
                </span>
              </div>
              <Progress value={(totalROI.revenue / 2000) * 100} className="bg-primary/20" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">ROI</span>
                <span className={`text-2xl font-bold ${roiColor}`}>
                  {roi.toFixed(2)}x
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className={`w-4 h-4 ${roiColor}`} />
                <span className="text-sm text-muted-foreground">
                  Based on real-time performance
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Targeting Insights
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Top Context</span>
              </div>
              <Badge variant="secondary">Product Research</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Audience Match</span>
              </div>
              <Badge variant="secondary">92%</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Engagement Rate</span>
              </div>
              <Badge variant="secondary">4.8%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}