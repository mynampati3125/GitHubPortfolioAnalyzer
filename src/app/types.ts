export interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  html_url: string;
  topics: string[];
  size: number;
}

export interface GitHubData {
  username: string;
  name: string | null;
  avatar: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  repos: Repository[];
}

export interface PortfolioData {
  url: string;
  hasCustomDomain: boolean;
  isResponsive: boolean;
  hasContact: boolean;
  hasProjects: boolean;
  designQuality: number;
  loadTime: number;
  hasBlog: boolean;
  hasTestimonials: boolean;
}

export interface AnalysisScore {
  overall: number;
  consistency: number;
  quality: number;
  diversity: number;
  activity: number;
  portfolio?: number;
}
