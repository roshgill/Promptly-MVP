"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FeaturesCarousel } from "@/components/home/features-carousel";
import { InteractiveDemo } from "@/components/home/interactive-demo";

const CHAT_SCENARIOS = [
  {
    id: 1,
    messages: [
      { role: "user", content: "I need help finding a solution for my business." },
      { role: "assistant", content: "I'd be happy to help. What specific challenges are you facing?" },
      { role: "ad", content: "Transform your business with our AI-powered platform. Start free trial today!" },
    ],
  },
  {
    id: 2,
    messages: [
      { role: "user", content: "Looking for ways to improve our marketing ROI." },
      { role: "assistant", content: "There are several strategies we could explore. What's your current approach?" },
      { role: "ad", content: "Boost your marketing ROI by 50% with our AI targeting system." },
    ],
  },
  {
    id: 3,
    messages: [
      { role: "user", content: "Need to reach more potential customers effectively." },
      { role: "assistant", content: "Let's analyze your target audience. What industry are you in?" },
      { role: "ad", content: "Reach your ideal customers with precision using our platform." },
    ],
  },
];

function ChatAnimation({ scenario, isVisible }: { scenario: typeof CHAT_SCENARIOS[0]; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-card rounded-lg shadow-lg p-6"
    >
      <div className="space-y-4">
        {scenario.messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}
          >
            {message.role === "assistant" && (
              <Bot className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0" />
            )}
            <div
              className={`rounded-lg p-4 max-w-[80%] ${
                message.role === "ad"
                  ? "border-l-2 border-primary bg-card"
                  : message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.role === "ad" && (
                <Badge variant="secondary" className="mb-2">
                  Sponsored
                </Badge>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
            {message.role === "user" && (
              <User className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario((current) => (current + 1) % CHAT_SCENARIOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(#FF5733_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Revolutionize Your Advertising with Precision and AI-Powered Impact
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Transform your campaigns with intelligent targeting and seamless integration
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => router.push("/dashboard")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See It In Action
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHAT_SCENARIOS.map((scenario, index) => (
              <ChatAnimation
                key={scenario.id}
                scenario={scenario}
                isVisible={currentScenario === index}
              />
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection />
      <InteractiveDemo />
      <FeaturesCarousel />

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "5,000+", label: "Active Advertisers" },
              { value: "1.2B+", label: "Monthly Impressions" },
              { value: "45%", label: "Average CTR Increase" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-lg border bg-card"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Advertising?
            </h2>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push("/dashboard")}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}