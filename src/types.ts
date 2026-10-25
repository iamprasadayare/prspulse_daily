export type PersonaType =
  | 'Founder / Exec'
  | 'Software Engineer'
  | 'Product Manager';

export type RoleLensType = PersonaType;

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  persona: PersonaType;
  isSignedIn: boolean;
}

export interface RoleInsight {
  role: PersonaType;
  label: string;
  leadImpact: string;
  description: string;
  icon: string;
}

export interface CoverageItem {
  id: string;
  source: string;
  sourceType: 'Official' | 'Paper' | 'Community' | 'Industry' | 'Benchmark';
  title: string;
  url?: string;
  timeAgo: string;
  keyTakeaway: string;
  sentiment: 'Bullish' | 'Neutral' | 'Critical';
}

export interface Story {
  id: string;
  category: 'for-you' | 'following' | 'agentic-ai' | 'cloud-and-infra' | 'product-and-strategy';
  source: string;
  sourceIcon: string;
  timeAgo: string;
  groundedSourcesCount: number;
  title: string;
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
  badgeOverlay?: string;
  highlightsTitle?: string;
  highlights?: string[];
  roleInsights: Record<PersonaType, {
    leadImpact: string;
    description: string;
    icon: string;
  }>;
  coverageCount: number;
  coverageItems?: CoverageItem[];
  fullContent?: {
    overview: string;
    architectureDetails: string[];
    codeSnippet?: string;
    benchmarks?: { label: string; value: string; delta: string }[];
  };
  tags: string[];
}

export interface RadarTopic {
  id: string;
  icon: string;
  name: string;
  frequency: string;
  enabled: boolean;
  category: string;
}

export interface SavedArticle {
  id: string;
  title: string;
  source: string;
  readTime: string;
  url?: string;
  savedAt: string;
  category: string;
}

export interface AudioEpisode {
  id: string;
  number: number;
  title: string;
  duration: string;
  durationSeconds: number;
  summary: string;
  script: string;
}

export interface BreakingAlert {
  id: string;
  title: string;
  summary: string;
  sourcesVerifiedCount: number;
  timestamp: string;
  leadImpact: string;
  roleAnalysis: string;
  bullets: string[];
  isCustom?: boolean;
}
