"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, MessageSquare, Sparkles, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant" | "ad";
  content: string;
  matches?: string[];
  confidence?: number;
}

interface Conversation {
  id: string;
  topic: string;
  context: string;
  messages: Message[];
  targetingScore: number;
}

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: "tech-support",
    topic: "Technical Support",
    context: "User seeking laptop recommendations",
    targetingScore: 95,
    messages: [
      {
        role: "user",
        content: "My laptop keeps freezing when I run multiple applications.",
        matches: ["performance issues", "technical support"]
      },
      {
        role: "assistant",
        content: "I understand how frustrating that can be. Could you tell me more about your usage patterns?",
        matches: ["user pain point", "diagnostic"]
      },
      {
        role: "ad",
        content: "Upgrade to our high-performance laptops with intelligent resource management. Get 20% off today!",
        confidence: 0.95
      },
      {
        role: "user",
        content: "I mainly use it for video editing and running multiple Chrome tabs.",
        matches: ["professional use", "resource-intensive"]
      }
    ]
  },
  {
    id: "product-research",
    topic: "Product Research",
    context: "User comparing software options",
    targetingScore: 88,
    messages: [
      {
        role: "user",
        content: "What's the best video editing software for beginners?",
        matches: ["purchase intent", "research phase"]
      },
      {
        role: "assistant",
        content: "There are several great options. What's your budget range and primary use case?",
        matches: ["budget discussion", "needs analysis"]
      },
      {
        role: "ad",
        content: "Try EditPro X - Rated #1 for beginners. Start your free trial now!",
        confidence: 0.88
      }
    ]
  }
];

export function InteractiveDemo() {
  const router = useRouter();
  const [activeConversation, setActiveConversation] = useState(DEMO_CONVERSATIONS[0]);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    setVisibleMessages([]);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < activeConversation.messages.length) {
        setVisibleMessages(prev => [...prev, activeConversation.messages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeConversation]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/30">
        <div className="absolute inset-0 bg-[radial-gradient(#FF5733_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">See AI Targeting in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our platform intelligently matches ads to relevant conversations in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">{activeConversation.topic}</h3>
              </div>
              <Badge variant="secondary">{activeConversation.context}</Badge>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-start gap-3 mb-4 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
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
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">Sponsored</Badge>
                          <Badge variant="outline" className="text-xs">
                            {(message.confidence! * 100).toFixed(0)}% Match
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      {showAnalysis && message.matches && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.matches.map((match, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {match}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <User className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalysis(!showAnalysis)}
              >
                {showAnalysis ? "Hide Analysis" : "Show Analysis"}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
              <div className="flex items-center gap-2">
                {DEMO_CONVERSATIONS.map((conv) => (
                  <Button
                    key={conv.id}
                    variant={conv === activeConversation ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveConversation(conv)}
                  >
                    Scenario {DEMO_CONVERSATIONS.indexOf(conv) + 1}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">Targeting Analysis</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Match Confidence</span>
                  <span className="font-medium">{activeConversation.targetingScore}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${activeConversation.targetingScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Key Targeting Signals</h4>
                <div className="grid grid-cols-2 gap-4">
                  {activeConversation.messages
                    .filter((m) => m.matches)
                    .map((message, idx) => (
                      <Card key={idx} className="p-3 bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-primary" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary" />
                          )}
                          <span className="text-sm font-medium">
                            {message.role === "user" ? "User Intent" : "Context"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {message.matches?.map((match, mIdx) => (
                            <Badge key={mIdx} variant="secondary" className="text-xs">
                              {match}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => router.push("/dashboard")}
                >
                  Try It Yourself
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}