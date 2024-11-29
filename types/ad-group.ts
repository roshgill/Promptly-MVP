export type DeviceType = 'mobile' | 'desktop';
export type OperatingSystem = 'ios' | 'android' | 'windows';
export type AgeRange = '13-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55+';
export type Gender = 'all' | 'male' | 'female';
export type Duration = 'continuous' | 'fixed';
export type MatchType = 'exact' | 'broad' | 'similar' | 'strict' | 'flexible';
export type TargetingMode = 'semantic' | 'keyword' | 'hybrid';
export type AppType = 'mobile_apps' | 'web_apps' | 'ecommerce' | 'social_media' | 'gaming' | 'all';

export interface SemanticTargeting {
  context: {
    themes: Array<{
      value: string;
      matchType: Extract<MatchType, 'exact' | 'broad'>;
    }>;
    exclusions: Array<{
      value: string;
      matchType: Extract<MatchType, 'exact' | 'broad'>;
    }>;
  };
  intent: Array<{
    value: string;
    matchType: Extract<MatchType, 'exact' | 'broad'>;
  }>;
  tone: Array<{
    value: string;
    matchType: Extract<MatchType, 'exact' | 'broad'>;
  }>;
}

export interface KeywordRules {
  main: string[];
  mustInclude: string[];
  negative: string[];
}

export interface AdGroup {
  id: string;
  campaignId: string;
  name: string;
  targetingMode: TargetingMode;
  appTypes: AppType[];
  locations: {
    included: string[];
    excluded: string[];
  };
  demographics: {
    ageRanges: AgeRange[];
    gender: Gender;
  };
  semanticTargeting: SemanticTargeting;
  keywordRules: KeywordRules;
  devices: {
    types: DeviceType[];
    operatingSystems: OperatingSystem[];
  };
  budget: {
    daily: number;
    total: number;
  };
  schedule: {
    durationType: Duration;
    startDate?: Date;
    endDate?: Date;
  };
}