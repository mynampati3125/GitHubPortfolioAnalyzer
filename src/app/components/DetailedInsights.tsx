import { GitHubData, AnalysisScore } from '../types';
import { TrendingUp, Target, Award, AlertTriangle } from 'lucide-react';

interface DetailedInsightsProps {
  data: GitHubData | null;
  scores: AnalysisScore;
}

export function DetailedInsights({ data, scores }: DetailedInsightsProps) {
  if (!data) return null;

  const comparisons = generateComparisons(data, scores);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Detailed Analysis & Comparisons</h2>

      <div className="space-y-6">
        {/* Coding Consistency Comparison */}
        <ComparisonSection
          title="Coding Consistency"
          score={scores.consistency}
          icon={<TrendingUp className="w-5 h-5" />}
          color="green"
          details={comparisons.consistency}
        />

        {/* Code Quality Comparison */}
        <ComparisonSection
          title="Code Quality"
          score={scores.quality}
          icon={<Award className="w-5 h-5" />}
          color="purple"
          details={comparisons.quality}
        />

        {/* Tech Stack Diversity */}
        <ComparisonSection
          title="Tech Stack Diversity"
          score={scores.diversity}
          icon={<Target className="w-5 h-5" />}
          color="orange"
          details={comparisons.diversity}
        />

        {/* Recent Activity */}
        <ComparisonSection
          title="Recent Activity"
          score={scores.activity}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="pink"
          details={comparisons.activity}
        />
      </div>
    </div>
  );
}

interface ComparisonSectionProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: 'green' | 'purple' | 'orange' | 'pink';
  details: {
    status: 'excellent' | 'good' | 'average' | 'needs-improvement';
    comparison: string;
    yourStats: string;
    industryBenchmark: string;
    strengths: string[];
    improvements: string[];
  };
}

function ComparisonSection({ title, score, icon, color, details }: ComparisonSectionProps) {
  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: 'text-purple-600',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      icon: 'text-orange-600',
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-700',
      icon: 'text-pink-600',
    },
  };

  const statusColors = {
    'excellent': 'bg-green-100 text-green-800 border-green-300',
    'good': 'bg-blue-100 text-blue-800 border-blue-300',
    'average': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'needs-improvement': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className={`border-2 ${colorClasses[color].border} ${colorClasses[color].bg} rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={colorClasses[color].icon}>{icon}</div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[details.status]}`}>
            {details.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className="text-3xl font-bold text-slate-900">{Math.round(score)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Your Stats</p>
          <p className="font-semibold text-slate-900">{details.yourStats}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Industry Benchmark</p>
          <p className="font-semibold text-slate-900">{details.industryBenchmark}</p>
        </div>
      </div>

      <p className="text-slate-700 mb-4 italic">{details.comparison}</p>

      {details.strengths.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-800 mb-2">✓ What You're Doing Well:</h4>
          <ul className="list-disc list-inside space-y-1">
            {details.strengths.map((strength, idx) => (
              <li key={idx} className="text-slate-700">{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {details.improvements.length > 0 && (
        <div>
          <h4 className="font-semibold text-orange-800 mb-2">→ Specific Areas to Improve:</h4>
          <ul className="list-disc list-inside space-y-1">
            {details.improvements.map((improvement, idx) => (
              <li key={idx} className="text-slate-700">{improvement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function generateComparisons(data: GitHubData, scores: AnalysisScore) {
  // Consistency Analysis
  const recentRepos = data.repos.filter(repo => {
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate <= 90;
  });

  const accountAgeInDays = (Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const reposPerMonth = (data.publicRepos / accountAgeInDays) * 30;

  const consistency = {
    status: scores.consistency >= 75 ? 'excellent' : scores.consistency >= 60 ? 'good' : scores.consistency >= 40 ? 'average' : 'needs-improvement',
    comparison: scores.consistency >= 75
      ? 'You are in the top 20% of developers! Your coding consistency is exceptional and shows strong commitment.'
      : scores.consistency >= 60
      ? 'You are above average! Your consistency is good, but there\'s room to reach the top tier.'
      : scores.consistency >= 40
      ? 'You are at the average level. Regular coding habits will help you stand out to recruiters.'
      : 'Your consistency needs improvement. Top candidates code regularly and maintain active profiles.',
    yourStats: `${recentRepos.length} repos updated in last 90 days, ${reposPerMonth.toFixed(1)} repos/month`,
    industryBenchmark: 'Top performers: 5+ repos/month, 10+ recent updates',
    strengths: [
      ...(recentRepos.length >= 5 ? ['Active recent development with ' + recentRepos.length + ' updated repositories'] : []),
      ...(reposPerMonth >= 2 ? ['Good repository creation rate'] : []),
      ...(accountAgeInDays > 365 ? ['Established GitHub presence (' + Math.floor(accountAgeInDays / 365) + ' years)'] : []),
    ],
    improvements: [
      ...(recentRepos.length < 5 ? ['Aim to update at least 5 repositories in the last 90 days'] : []),
      ...(reposPerMonth < 2 ? ['Increase your repo creation rate to 2+ per month'] : []),
      ...(scores.consistency < 75 ? ['Commit code more regularly - aim for daily or weekly commits'] : []),
    ],
  } as const;

  // Quality Analysis
  const avgStars = data.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) / Math.max(data.repos.length, 1);
  const reposWithDesc = data.repos.filter(r => r.description).length;
  const descPercentage = (reposWithDesc / Math.max(data.repos.length, 1)) * 100;

  const quality = {
    status: scores.quality >= 75 ? 'excellent' : scores.quality >= 60 ? 'good' : scores.quality >= 40 ? 'average' : 'needs-improvement',
    comparison: scores.quality >= 75
      ? 'Outstanding code quality! Your repositories show professionalism and attract community attention.'
      : scores.quality >= 60
      ? 'Good quality work! Adding more documentation and polish will make your repos stand out more.'
      : scores.quality >= 40
      ? 'Your repos have potential. Focus on documentation, README files, and project presentation.'
      : 'Quality needs significant improvement. Well-documented, polished projects make a strong impression.',
    yourStats: `${avgStars.toFixed(1)} avg stars, ${descPercentage.toFixed(0)}% repos with descriptions`,
    industryBenchmark: 'Top performers: 5+ avg stars, 90%+ documented repos',
    strengths: [
      ...(avgStars >= 3 ? ['Good community engagement with ' + avgStars.toFixed(1) + ' average stars'] : []),
      ...(descPercentage >= 70 ? ['Strong documentation practices (' + descPercentage.toFixed(0) + '% described)'] : []),
      ...(data.repos.some(r => r.stargazers_count >= 10) ? ['Have popular projects that attracted significant attention'] : []),
    ],
    improvements: [
      ...(avgStars < 3 ? ['Improve project quality to attract more stars and recognition'] : []),
      ...(descPercentage < 70 ? ['Add meaningful descriptions to all repositories (currently only ' + descPercentage.toFixed(0) + '%)'] : []),
      ...(scores.quality < 75 ? ['Create README files with setup instructions, screenshots, and use cases'] : []),
      ...(!data.repos.some(r => r.stargazers_count >= 5) ? ['Build showcase projects that demonstrate your best work'] : []),
    ],
  } as const;

  // Diversity Analysis
  const languages = new Set(data.repos.filter(r => r.language).map(r => r.language));
  const topics = new Set(data.repos.flatMap(r => r.topics || []));

  const diversity = {
    status: scores.diversity >= 75 ? 'excellent' : scores.diversity >= 60 ? 'good' : scores.diversity >= 40 ? 'average' : 'needs-improvement',
    comparison: scores.diversity >= 75
      ? 'Excellent tech diversity! You demonstrate versatility across multiple technologies and domains.'
      : scores.diversity >= 60
      ? 'Good variety in your tech stack. Exploring a few more technologies will showcase broader expertise.'
      : scores.diversity >= 40
      ? 'Average diversity. Learning new languages and frameworks will make you more competitive.'
      : 'Limited tech diversity. Modern developers need experience across multiple technologies.',
    yourStats: `${languages.size} programming languages, ${topics.size} topic tags`,
    industryBenchmark: 'Top performers: 5+ languages, 15+ topic tags',
    strengths: [
      ...(languages.size >= 4 ? ['Strong multilingual skills with ' + languages.size + ' languages: ' + Array.from(languages).slice(0, 5).join(', ')] : []),
      ...(topics.size >= 10 ? ['Diverse project topics showing broad interests'] : []),
      ...(data.repos.some(r => r.language === 'TypeScript') ? ['Modern JavaScript ecosystem experience'] : []),
    ],
    improvements: [
      ...(languages.size < 4 ? ['Learn ' + (4 - languages.size) + ' more programming languages to show versatility'] : []),
      ...(topics.size < 10 ? ['Add more topic tags to your repositories for better discoverability'] : []),
      ...(!languages.has('Python') && !languages.has('JavaScript') && !languages.has('TypeScript') ? ['Consider learning in-demand languages like Python or JavaScript'] : []),
      ...(scores.diversity < 75 ? ['Explore different domains: web, mobile, data science, DevOps, etc.'] : []),
    ],
  } as const;

  // Activity Analysis
  const activity = {
    status: scores.activity >= 75 ? 'excellent' : scores.activity >= 60 ? 'good' : scores.activity >= 40 ? 'average' : 'needs-improvement',
    comparison: scores.activity >= 75
      ? 'Highly active developer! Your recent activity shows you\'re continuously learning and building.'
      : scores.activity >= 60
      ? 'Good recent activity. Maintaining this momentum will keep your profile fresh and attractive.'
      : scores.activity >= 40
      ? 'Moderate activity. More frequent contributions will demonstrate ongoing commitment to coding.'
      : 'Low recent activity. Recruiters look for developers who code regularly and stay current.',
    yourStats: `${recentRepos.length} repositories active in last 3 months`,
    industryBenchmark: 'Top performers: 10+ active repos in last 3 months',
    strengths: [
      ...(recentRepos.length >= 7 ? ['Very active with ' + recentRepos.length + ' repositories updated recently'] : []),
      ...(recentRepos.length >= 3 ? ['Consistent recent activity showing ongoing development'] : []),
      ...(data.repos.filter(r => {
        const daysOld = (Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60 * 24);
        return daysOld <= 30;
      }).length > 0 ? ['Created new repositories in the last month'] : []),
    ],
    improvements: [
      ...(recentRepos.length < 5 ? ['Increase activity - aim for 5+ repositories updated in last 3 months'] : []),
      ...(recentRepos.length === 0 ? ['URGENT: No recent activity! Start coding and pushing changes immediately'] : []),
      ...(scores.activity < 75 ? ['Set a goal to commit code at least 3-4 times per week'] : []),
      ...(data.publicRepos < 15 ? ['Build more projects to create a substantial portfolio'] : []),
    ],
  } as const;

  return { consistency, quality, diversity, activity };
}
