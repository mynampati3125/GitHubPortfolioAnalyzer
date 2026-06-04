import { GitHubData, PortfolioData, AnalysisScore } from '../types';
import { Sparkles, AlertCircle, CheckCircle2, Target } from 'lucide-react';

interface AIInsightsProps {
  data: GitHubData | null;
  portfolioData: PortfolioData | null;
  scores: AnalysisScore;
}

export function AIInsights({ data, portfolioData, scores }: AIInsightsProps) {
  const insights = generateInsights(data, portfolioData, scores);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">AI-Powered Insights & Recommendations</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <InsightSection
          title="Strengths"
          icon={<CheckCircle2 className="w-5 h-5" />}
          items={insights.strengths}
          bgColor="bg-green-500/20"
        />
        <InsightSection
          title="Areas for Improvement"
          icon={<AlertCircle className="w-5 h-5" />}
          items={insights.improvements}
          bgColor="bg-yellow-500/20"
        />
      </div>

      <div className="bg-white/10 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Placement Readiness Assessment</h3>
        </div>
        <p className="text-white/90 mb-4">{insights.readinessMessage}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-400 h-full rounded-full transition-all"
              style={{ width: `${scores.overall}%` }}
            ></div>
          </div>
          <span className="font-semibold">{Math.round(scores.overall)}%</span>
        </div>
      </div>
    </div>
  );
}

function InsightSection({
  title,
  icon,
  items,
  bgColor,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-white/90 flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function generateInsights(data: GitHubData | null, portfolioData: PortfolioData | null, scores: AnalysisScore) {
  const strengths: string[] = [];
  const improvements: string[] = [];

  // GitHub insights
  if (data) {
    if (data.publicRepos >= 10) {
      strengths.push(`Strong portfolio with ${data.publicRepos} public repositories`);
    } else {
      improvements.push('Create more public repositories to showcase your skills');
    }

    if (scores.consistency >= 70) {
      strengths.push('Excellent coding consistency and regular activity');
    } else if (scores.consistency >= 50) {
      improvements.push('Try to maintain more consistent coding activity');
    } else if (scores.consistency > 0) {
      improvements.push('Significantly improve your coding consistency with daily commits');
    }

    if (scores.diversity >= 70) {
      strengths.push('Great diversity in tech stack and languages');
    } else if (data.repos.length > 0) {
      improvements.push('Explore more programming languages and technologies');
    }

    const hasDocumentation = data.repos.some(r => r.description);
    if (hasDocumentation) {
      strengths.push('Good documentation practices with repository descriptions');
    } else if (data.repos.length > 0) {
      improvements.push('Add meaningful descriptions to your repositories');
    }

    if (data.followers >= 10) {
      strengths.push('Growing community presence with engaged followers');
    }

    const hasStarredRepos = data.repos.some(r => r.stargazers_count > 0);
    if (hasStarredRepos) {
      strengths.push('Projects receiving community recognition');
    } else if (data.repos.length > 0) {
      improvements.push('Share your projects on social media to gain visibility');
    }
  }

  // Portfolio insights
  if (portfolioData) {
    if (portfolioData.hasCustomDomain) {
      strengths.push('Professional custom domain for portfolio website');
    } else {
      improvements.push('Consider getting a custom domain for your portfolio');
    }

    if (portfolioData.designQuality >= 80) {
      strengths.push('Excellent portfolio design and user experience');
    } else if (portfolioData.designQuality < 60) {
      improvements.push('Improve your portfolio design and visual appeal');
    }

    if (portfolioData.loadTime > 3) {
      improvements.push('Optimize portfolio loading speed for better performance');
    }

    if (!portfolioData.hasBlog) {
      improvements.push('Add a blog section to showcase your knowledge and writing skills');
    }
  } else if (!data) {
    improvements.push('Create a GitHub account to showcase your coding projects and skills');
  } else {
    improvements.push('Create a portfolio website to showcase your projects professionally');
  }

  let readinessMessage = '';

  if (!data && !portfolioData) {
    readinessMessage = 'Start building your professional presence! Create both a GitHub profile to showcase your code and a portfolio website to present your projects professionally.';
  } else if (!data) {
    readinessMessage = 'Your portfolio website is a good start! Consider creating a GitHub account to demonstrate your coding skills and contribute to open-source projects.';
  } else if (!portfolioData) {
    if (scores.overall >= 80) {
      readinessMessage = 'Excellent GitHub profile! Consider creating a portfolio website to showcase your projects in a more professional format for recruiters.';
    } else if (scores.overall >= 60) {
      readinessMessage = 'Good GitHub progress! Focus on the improvement areas and create a portfolio website to boost your placement readiness.';
    } else {
      readinessMessage = 'Keep improving your GitHub profile with consistent coding habits. Also consider creating a portfolio website to present your work professionally.';
    }
  } else {
    if (scores.overall >= 75) {
      readinessMessage = 'Excellent! Your GitHub profile and portfolio demonstrate strong technical skills and professionalism. You are well-prepared for internships and placement opportunities at top companies.';
    } else if (scores.overall >= 55) {
      readinessMessage = 'Good progress! Your profile shows solid foundation and promise. Focusing on the improvement areas will significantly boost your placement readiness to top-tier level.';
    } else if (scores.overall >= 35) {
      readinessMessage = 'Your profile has good potential. With consistent effort in the suggested areas, you can significantly enhance your placement prospects within a few months.';
    } else {
      readinessMessage = 'Your profile is in early stages. Focus on the improvement areas listed above - building consistent coding habits and creating quality projects will make a big difference.';
    }
  }

  return { strengths, improvements, readinessMessage };
}
