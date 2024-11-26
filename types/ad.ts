export type AdFormat = 'text';
export type AdTone = 'professional' | 'casual' | 'persuasive' | 'urgent' | 'friendly' | 'technical';
export type AdStatus = 'draft' | 'active' | 'paused';
export type AdIndustry = 'ecommerce' | 'saas' | 'brand_awareness' | 'b2b' | 'b2c';

export interface TextAd {
  id: string;
  campaignId: string;
  format: 'text';
  name: string;
  content: string;
  callToAction: string;
  previewUrl: string;
  tone?: AdTone;
  industry?: AdIndustry;
  status: AdStatus;
  createdAt: Date;
  updatedAt: Date;
  abTest?: boolean;
  abVariant?: 'A' | 'B';
}

export const AD_LIMITS = {
  name: 90,
  content: 180,
  callToAction: 30,
} as const;

export interface AdTemplate {
  id: string;
  name: string;
  industry: AdIndustry;
  tone: AdTone;
  content: string;
  callToAction: string;
}

export interface AdSimulationMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
}

export const AD_TEMPLATES: AdTemplate[] = [
  {
    id: 'ecom-1',
    name: 'Flash Sale Template',
    industry: 'ecommerce',
    tone: 'urgent',
    content: 'Limited time offer! Save up to 50% on [product]. Premium quality, unbeatable prices.',
    callToAction: 'Shop Now',
  },
  {
    id: 'saas-1',
    name: 'SaaS Solution Template',
    industry: 'saas',
    tone: 'professional',
    content: 'Streamline your workflow with [product]. Boost productivity by 30%.',
    callToAction: 'Start Free Trial',
  },
  {
    id: 'brand-1',
    name: 'Brand Story Template',
    industry: 'brand_awareness',
    tone: 'friendly',
    content: 'Discover why millions trust [brand] for their [need]. Join our community today.',
    callToAction: 'Learn More',
  },
  {
    id: 'b2b-1',
    name: 'B2B Solution Template',
    industry: 'b2b',
    tone: 'technical',
    content: 'Enterprise-grade [solution] for growing businesses. Scale with confidence.',
    callToAction: 'Book Demo',
  },
];