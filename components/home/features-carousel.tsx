"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Target, LineChart, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    id: "ai-targeting",
    title: "AI Semantic Targeting",
    description: "Understand context and user intent in real-time for precise ad placement",
    icon: Brain,
    preview: (
      <div className="bg-card/50 p-6 rounded-lg border">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Context Match: 98%</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-primary/20 rounded-full w-3/4" />
            <div className="h-2 bg-primary/30 rounded-full w-1/2" />
            <div className="h-2 bg-primary/40 rounded-full w-2/3" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "targeting",
    title: "Hybrid Targeting System",
    description: "Combine semantic understanding with traditional keyword targeting",
    icon: Target,
    preview: (
      <div className="bg-card/50 p-6 rounded-lg border">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Keywords</div>
            <div className="flex flex-wrap gap-2">
              {["AI", "Tech", "Innovation"].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Context</div>
            <div className="h-2 bg-secondary/20 rounded-full" />
            <div className="h-2 bg-secondary/30 rounded-full w-3/4" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    title: "Real-Time Analytics",
    description: "Monitor and optimize campaign performance with detailed insights",
    icon: LineChart,
    preview: (
      <div className="bg-card/50 p-6 rounded-lg border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm font-medium">CTR</div>
              <div className="text-2xl font-bold text-primary">4.8%</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Conversions</div>
              <div className="text-2xl font-bold text-secondary">2.3K</div>
            </div>
          </div>
          <div className="relative h-20">
            <div className="absolute bottom-0 left-0 right-0 h-full flex items-end">
              {[40, 65, 45, 70, 85, 60, 75].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 mx-0.5 bg-primary/20 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % features.length);
  }, []);

  const previous = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + features.length) % features.length);
  }, []);

  const Feature = features[currentIndex];
  const Icon = Feature.icon;

  return (
    <motion.section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to create successful ad campaigns
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{Feature.title}</h3>
                  <p className="text-lg text-muted-foreground">
                    {Feature.description}
                  </p>
                </div>
                <Card className="p-6">
                  {Feature.preview}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={previous}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-primary/20"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}