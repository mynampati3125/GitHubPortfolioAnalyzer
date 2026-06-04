import { GitHubData, PortfolioData, AnalysisScore } from '../types';

export function calculateScores(data: GitHubData | null, portfolioData?: PortfolioData | null): AnalysisScore {
  // Calculate GitHub scores only if data exists
  const consistency = data ? calculateConsistencyScore(data) : 0;
  const quality = data ? calculateQualityScore(data) : 0;
  const diversity = data ? calculateDiversityScore(data) : 0;
  const activity = data ? calculateActivityScore(data) : 0;
  const portfolio = portfolioData ? calculatePortfolioScore(portfolioData) : undefined;

  const scores: number[] = [];

  // Only include GitHub scores if we have GitHub data
  if (data) {
    scores.push(consistency, quality, diversity, activity);
  }

  // Add portfolio score if available
  if (portfolio !== undefined) {
    scores.push(portfolio);
  }

  const overall = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  return {
    overall,
    consistency,
    quality,
    diversity,
    activity,
    portfolio,
  };
}

function calculateConsistencyScore(data: GitHubData): number {
  if (data.publicRepos === 0) return 0;

  const accountAge = (Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const reposPerDay = data.publicRepos / Math.max(accountAge, 1);

  const recentRepos = data.repos.filter((repo) => {
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate <= 90;
  });

  // More generous scoring
  const recentActivityScore = Math.min((recentRepos.length / Math.max(data.publicRepos * 0.3, 1)) * 100, 100);
  const consistencyScore = Math.min(reposPerDay * 2000, 100); // Increased multiplier

  // Bonus for having repos
  const baseBonus = data.publicRepos >= 5 ? 20 : data.publicRepos >= 3 ? 10 : 0;

  return Math.min((recentActivityScore * 0.5 + consistencyScore * 0.5) + baseBonus, 100);
}

function calculateQualityScore(data: GitHubData): number {
  if (data.repos.length === 0) return 0;

  const avgStars = data.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) / data.repos.length;
  const avgForks = data.repos.reduce((sum, repo) => sum + repo.forks_count, 0) / data.repos.length;
  const reposWithDescription = data.repos.filter((r) => r.description).length;
  const descriptionScore = (reposWithDescription / data.repos.length) * 100;

  // More generous scoring
  const starScore = Math.min(avgStars * 15 + 20, 60); // Added base score
  const forkScore = Math.min(avgForks * 20 + 10, 40); // Added base score
  const docScore = descriptionScore * 0.5; // Increased weight

  // Bonus for having any repos
  const baseBonus = data.publicRepos >= 5 ? 15 : 10;

  return Math.min(starScore + forkScore + docScore + baseBonus, 100);
}

function calculateDiversityScore(data: GitHubData): number {
  const languages = new Set(data.repos.filter((r) => r.language).map((r) => r.language));
  const topics = new Set(data.repos.flatMap((r) => r.topics || []));

  // More generous scoring - 3+ languages is good
  const languageScore = Math.min((languages.size / 3) * 65 + 20, 85);
  const topicScore = Math.min((topics.size / 8) * 40 + 10, 50);

  return Math.min(languageScore * 0.6 + topicScore * 0.4, 100);
}

function calculateActivityScore(data: GitHubData): number {
  const threeMonthsAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const recentRepos = data.repos.filter(
    (repo) => new Date(repo.updated_at).getTime() > threeMonthsAgo
  );

  // More generous - 5+ recent repos is good
  const activityScore = Math.min((recentRepos.length / 5) * 80 + 20, 100);

  // Bonus for having any recent activity
  const bonus = recentRepos.length > 0 ? 10 : 0;

  return Math.min(activityScore + bonus, 100);
}

function calculatePortfolioScore(data: PortfolioData): number {
  let score = 0;

  // Design quality (30%)
  score += data.designQuality * 0.3;

  // Performance (20%)
  const performanceScore = data.loadTime < 2 ? 100 : data.loadTime < 3 ? 70 : data.loadTime < 4 ? 50 : 30;
  score += performanceScore * 0.2;

  // Features (50%)
  const features = [
    data.hasCustomDomain,
    data.isResponsive,
    data.hasContact,
    data.hasProjects,
    data.hasBlog,
    data.hasTestimonials,
  ];
  const featureScore = (features.filter(Boolean).length / features.length) * 100;
  score += featureScore * 0.5;

  return score;
}
