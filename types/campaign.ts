export type CampaignObjective = 'brand_awareness' | 'traffic';

export type Campaign = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  objective: CampaignObjective;
  budget: number;
  startDate: Date;
  endDate: Date;
  goals: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  targeting: {
    keywords: string[];
    locations: string[];
    ageRange: {
      min: number;
      max: number;
    };
    gender: 'all' | 'male' | 'female';
  };
};