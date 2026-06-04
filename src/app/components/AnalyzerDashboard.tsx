import { GitHubData, PortfolioData } from '../types';
import { ProfileHeader } from './ProfileHeader';
import { ScoreOverview } from './ScoreOverview';
import { ActivityChart } from './ActivityChart';
import { TechStackAnalysis } from './TechStackAnalysis';
import { RepoQualityList } from './RepoQualityList';
import { PortfolioAnalysis } from './PortfolioAnalysis';
import { DetailedInsights } from './DetailedInsights';
import { AIInsights } from './AIInsights';
import { calculateScores } from '../utils/analysisUtils';
import { ArrowLeft } from 'lucide-react';

interface AnalyzerDashboardProps {
  data: GitHubData | null;
  portfolioData: PortfolioData | null;
  onReset: () => void;
}

export function AnalyzerDashboard({ data, portfolioData, onReset }: AnalyzerDashboardProps) {
  const scores = calculateScores(data, portfolioData);

  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg transition-all shadow-md hover:shadow-lg font-medium border-2 border-slate-200 hover:border-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back / Analyze Another Profile</span>
          </button>
          <p className="text-sm text-slate-600 hidden sm:block">Start a new analysis</p>
        </div>

        {data && <ProfileHeader data={data} />}

        <ScoreOverview scores={scores} hasGithub={!!data} hasPortfolio={!!portfolioData} />

        {data && (
          <div className="grid lg:grid-cols-2 gap-8">
            <ActivityChart repos={data.repos} />
            <TechStackAnalysis repos={data.repos} />
          </div>
        )}

        {data && <RepoQualityList repos={data.repos} />}

        {portfolioData && <PortfolioAnalysis data={portfolioData} />}

        {data && <DetailedInsights data={data} scores={scores} />}

        <AIInsights data={data} portfolioData={portfolioData} scores={scores} />

        <div className="h-16"></div>
      </div>
    </div>
  );
}
