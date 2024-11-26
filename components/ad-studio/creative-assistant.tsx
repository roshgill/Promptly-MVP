"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextAd } from "@/types/ad";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useState } from "react";

interface CreativeAssistantProps {
  ad: Partial<TextAd>;
  onApplySuggestion: (field: keyof TextAd, value: string) => void;
}

interface Message {
  role: "assistant" | "user";
  content: string;
  suggestions?: {
    field: keyof TextAd;
    value: string;
  }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hi! I'm your creative assistant. I can help you write more engaging ad copy. What would you like help with?",
  },
];

const SAMPLE_RESPONSES: Message[] = [
  {
    role: "assistant",
    content: "Here's a more engaging headline that emphasizes the value proposition:",
    suggestions: [
      {
        field: "name",
        value: "Transform Your Computing Experience Today",
      },
    ],
  },
  {
    role: "assistant",
    content: "I've crafted a compelling call-to-action that creates urgency:",
    suggestions: [
      {
        field: "callToAction",
        value: "Upgrade Now & Save 25%",
      },
    ],
  },
];

export function CreativeAssistant({ ad, onApplySuggestion }: CreativeAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      setMessages((prev) => [...prev, randomResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Creative Assistant</h3>
        </div>
      </div>

      <div className="space-y-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0" />
                  ) : (
                    <User className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0" />
                  )}
                  <div className="space-y-2">
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.suggestions && (
                      <div className="space-y-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() =>
                              onApplySuggestion(suggestion.field, suggestion.value)
                            }
                          >
                            <span className="truncate">{suggestion.value}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bot className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary" />
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for suggestions..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}