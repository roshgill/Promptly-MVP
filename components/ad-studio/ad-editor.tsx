"use client";

import { useState } from "react";
import { TextAd, AD_LIMITS, AdTemplate } from "@/types/ad";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Save, Sparkles, Wand2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdPreviewVariants } from "./ad-preview-variants";
import { AISuggestions } from "./ai-suggestions";
import { TemplateLibrary } from "./template-library";
import { ABTesting } from "./ab-testing";
import { PerformanceInsights } from "./performance-insights";
import { AIGenerator } from "./ai-generator";

const adSchema = z.object({
  name: z
    .string()
    .min(1, "Ad name is required")
    .max(AD_LIMITS.name, `Maximum ${AD_LIMITS.name} characters`),
  content: z
    .string()
    .min(1, "Ad content is required")
    .max(AD_LIMITS.content, `Maximum ${AD_LIMITS.content} characters`),
  callToAction: z
    .string()
    .min(1, "Call to action is required")
    .max(AD_LIMITS.callToAction, `Maximum ${AD_LIMITS.callToAction} characters`),
  previewUrl: z.string().url().optional(),
});

interface AdEditorProps {
  ad: Partial<TextAd>;
  savedAds: TextAd[];
  onChange: (ad: Partial<TextAd>) => void;
  onSave: (ad: Partial<TextAd>) => void;
  onDelete: (id: string) => void;
}

export function AdEditor({ ad, savedAds, onChange, onSave, onDelete }: AdEditorProps) {
  const { toast } = useToast();
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  
  const form = useForm<Partial<TextAd>>({
    resolver: zodResolver(adSchema),
    defaultValues: ad,
  });

  const onSubmit = (data: Partial<TextAd>) => {
    onSave(data);
    toast({
      title: "Ad saved",
      description: "Your ad has been saved successfully.",
    });
  };

  const handleAdSelect = (selectedAd: TextAd) => {
    form.reset(selectedAd);
    onChange(selectedAd);
  };

  const handleAISuggestion = (field: keyof TextAd, value: string) => {
    form.setValue(field, value);
    onChange({ ...ad, [field]: value });
    toast({
      title: "AI Suggestion Applied",
      description: "The suggested copy has been applied to your ad.",
    });
  };

  const handleTemplateApply = (template: AdTemplate) => {
    const newAd = {
      ...ad,
      name: template.name,
      content: template.content,
      callToAction: template.callToAction,
      industry: template.industry,
    };
    form.reset(newAd);
    onChange(newAd);
    toast({
      title: "Template Applied",
      description: "The template has been applied to your ad.",
    });
  };

  const handleGeneratedAd = (generatedAd: Partial<TextAd>) => {
    form.reset(generatedAd);
    onChange(generatedAd);
    setShowAIGenerator(false);
    toast({
      title: "AI-Generated Ad Applied",
      description: "The generated ad has been applied to the editor.",
    });
  };

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium">Ad Editor</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create and customize your ad content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAIGenerator(true)}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Generate New Ad
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAISuggestion("content", "")}>
                <Sparkles className="w-4 h-4 mr-2" />
                Enhance
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} />
                        <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                          {field.value?.length || 0}/{AD_LIMITS.name}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad Content</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          {...field}
                          className="min-h-[100px] resize-none"
                        />
                        <span className="absolute right-3 bottom-3 text-sm text-muted-foreground">
                          {field.value?.length || 0}/{AD_LIMITS.content}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="callToAction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call to Action</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} />
                        <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                          {field.value?.length || 0}/{AD_LIMITS.callToAction}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previewUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Ad
              </Button>
            </form>
          </Form>
        </Card>

        <ABTesting
          adA={ad}
          adB={{ ...ad, id: "variant-b" }}
          onToggleABTesting={() => {}}
          enabled={false}
        />
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="ai">AI Tools</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <AdPreviewVariants ad={ad} />
          </TabsContent>

          <TabsContent value="ai">
            <AISuggestions ad={ad} onApplySuggestion={handleAISuggestion} />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateLibrary onApplyTemplate={handleTemplateApply} />
          </TabsContent>

          <TabsContent value="insights">
            <PerformanceInsights ad={ad} />
          </TabsContent>
        </Tabs>
      </div>

      {showAIGenerator && (
        <AIGenerator
          onGenerate={handleGeneratedAd}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
}

// Export the component as AdStudio for backward compatibility
export { AdEditor as AdStudio };