"use client";

interface TargetingScores {
  semantic: number;
  keyword: number;
  overall: number;
  suggestions: string[];
}

export function calculateTargetingScores(adGroup: any): TargetingScores {
  // Calculate semantic targeting score
  const semanticScore = calculateSemanticScore(adGroup);
  
  // Calculate keyword targeting score
  const keywordScore = calculateKeywordScore(adGroup);
  
  // Calculate overall score (weighted average)
  const overall = Math.round((semanticScore * 0.6 + keywordScore * 0.4));
  
  // Generate suggestions based on scores
  const suggestions = generateSuggestions(adGroup, semanticScore, keywordScore);

  return {
    semantic: semanticScore,
    keyword: keywordScore,
    overall,
    suggestions,
  };
}

function calculateSemanticScore(adGroup: any): number {
  let score = 0;
  
  // Context themes score
  if (adGroup.semanticTargeting?.context?.themes.length > 0) {
    score += 30;
    if (adGroup.semanticTargeting.context.themes.length >= 3) score += 10;
  }
  
  // Intent score
  if (adGroup.semanticTargeting?.intent.length > 0) {
    score += 20;
    if (adGroup.semanticTargeting.intent.length >= 2) score += 10;
  }
  
  // Exclusions score
  if (adGroup.semanticTargeting?.context?.exclusions.length > 0) {
    score += 20;
  }
  
  return Math.min(score, 100);
}

function calculateKeywordScore(adGroup: any): number {
  let score = 0;
  
  // Main keywords score
  if (adGroup.keywordRules?.main.length > 0) {
    score += 40;
    if (adGroup.keywordRules.main.length >= 3) score += 10;
  }
  
  // Must include keywords score
  if (adGroup.keywordRules?.mustInclude.length > 0) {
    score += 25;
  }
  
  // Negative keywords score
  if (adGroup.keywordRules?.negative.length > 0) {
    score += 25;
  }
  
  return Math.min(score, 100);
}

function generateSuggestions(adGroup: any, semanticScore: number, keywordScore: number): string[] {
  const suggestions: string[] = [];
  
  // Semantic targeting suggestions
  if (semanticScore < 70) {
    if (!adGroup.semanticTargeting?.context?.themes.length) {
      suggestions.push("Add context themes to improve targeting precision");
    }
    if (!adGroup.semanticTargeting?.intent.length) {
      suggestions.push("Define user intent to better match conversations");
    }
    if (!adGroup.semanticTargeting?.context?.exclusions.length) {
      suggestions.push("Consider adding context exclusions to avoid irrelevant matches");
    }
  }
  
  // Keyword targeting suggestions
  if (keywordScore < 70) {
    if (!adGroup.keywordRules?.main.length) {
      suggestions.push("Add main keywords to establish core targeting");
    }
    if (!adGroup.keywordRules?.mustInclude.length) {
      suggestions.push("Consider adding must-include terms for precision");
    }
    if (!adGroup.keywordRules?.negative.length) {
      suggestions.push("Add negative keywords to prevent unwanted matches");
    }
  }
  
  return suggestions;
}