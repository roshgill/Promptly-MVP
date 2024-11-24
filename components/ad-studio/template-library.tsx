"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AD_TEMPLATES, AdTemplate, AdIndustry, TextAd } from "@/types/ad";

interface TemplateLibraryProps {
  onApplyTemplate: (template: AdTemplate) => void;
}

export function TemplateLibrary({ onApplyTemplate }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<AdIndustry | "all">("all");

  const filteredTemplates = AD_TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || template.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Template Library</h3>
          <Select
            value={selectedIndustry}
            onValueChange={(value) => setSelectedIndustry(value as AdIndustry | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{template.name}</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{template.industry}</Badge>
                      <Badge variant="outline">{template.tone}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{template.callToAction}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onApplyTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}